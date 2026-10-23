import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import type { PresentationPlan } from "@/lib/types";

export type AIProvider = "auto" | "openai" | "claude";

const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) : null;

export async function generateStoryboardFromPrompt(prompt: string, provider: AIProvider = "auto") {
  const selectedProvider = resolveProvider(provider);

  if (selectedProvider === "openai" && client) {
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.8,
        messages: [
          { role: "system", content: "You are a creative AI motion presentation designer." },
          { role: "user", content: `${prompt}\n\nReturn valid JSON only.` }
        ]
      });

      const text = response.choices[0]?.message?.content ?? "{}";
      return parseStoryboardResponse(text);
    } catch {
      // fallback to mock strategy below
    }
  }

  if (selectedProvider === "claude" && anthropic) {
    try {
      const response = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1200,
        messages: [{ role: "user", content: `${prompt}\n\nReturn valid JSON only.` }]
      });

      const content = response.content[0]?.type === "text" ? response.content[0].text : "{}";
      return parseStoryboardResponse(content);
    } catch {
      // fallback to mock strategy below
    }
  }

  return mockStoryboard(prompt);
}

function resolveProvider(provider: AIProvider) {
  if (provider === "openai" && process.env.OPENAI_API_KEY) return "openai";
  if (provider === "claude" && process.env.ANTHROPIC_API_KEY) return "claude";

  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.ANTHROPIC_API_KEY) return "claude";
  return "mock";
}

function parseStoryboardResponse(raw: string): PresentationPlan {
  const parsed = JSON.parse(raw);

  if (!parsed || typeof parsed !== "object") {
    return mockStoryboard("");
  }

  return {
    title: parsed.title || "AI Storyboard",
    audience: parsed.audience || "General audience",
    tone: parsed.tone || "Modern",
    duration: Number(parsed.duration) || 45,
    scenes: Array.isArray(parsed.scenes) && parsed.scenes.length > 0 ? parsed.scenes.map((scene: any, index: number) => ({
      id: scene.id || `scene-${index + 1}`,
      title: scene.title || `Scene ${index + 1}`,
      subtitle: scene.subtitle || "Dynamic slide composition",
      duration: Number(scene.duration) || 10,
      style: scene.style || "cinematic",
      animation: scene.animation || "fade",
      colors: {
        primary: scene.colors?.primary || "#8B5CF6",
        secondary: scene.colors?.secondary || "#22D3EE",
        background: scene.colors?.background || "#0F172A"
      }
    })) : mockStoryboard("").scenes
  };
}

function mockStoryboard(prompt: string): PresentationPlan {
  const normalized = prompt.toLowerCase();
  const audience = normalized.includes("investor") ? "Investors" : normalized.includes("founder") ? "Founders" : "General audience";
  const tone = normalized.includes("confident") ? "Confident" : normalized.includes("playful") ? "Playful" : "Modern";

  return {
    title: "AI Launch Story",
    audience,
    tone,
    duration: 45,
    scenes: [
      {
        id: "scene-1",
        title: "Problem",
        subtitle: "Customers are overloaded by disconnected workflows and repetitive tasks.",
        duration: 8,
        style: "cinematic",
        animation: "fade",
        colors: {
          primary: "#8B5CF6",
          secondary: "#22D3EE",
          background: "#0F172A"
        }
      },
      {
        id: "scene-2",
        title: "Solution",
        subtitle: "One AI operating layer turns fragmented actions into a cohesive experience.",
        duration: 10,
        style: "futuristic",
        animation: "slide",
        colors: {
          primary: "#22D3EE",
          secondary: "#7C3AED",
          background: "#111827"
        }
      },
      {
        id: "scene-3",
        title: "Proof",
        subtitle: "Early traction shows measurable revenue, speed, and retention gains.",
        duration: 12,
        style: "minimal",
        animation: "zoom",
        colors: {
          primary: "#F59E0B",
          secondary: "#EC4899",
          background: "#111827"
        }
      },
      {
        id: "scene-4",
        title: "Momentum",
        subtitle: "The platform is built for scale, partnership, and sustainable product velocity.",
        duration: 15,
        style: "cinematic",
        animation: "pulse",
        colors: {
          primary: "#10B981",
          secondary: "#3B82F6",
          background: "#0B1120"
        }
      }
    ]
  };
}
