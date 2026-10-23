import OpenAI from "openai";

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function generateStoryboardFromPrompt(prompt: string) {
  if (!client) {
    return mockStoryboard(prompt);
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.8,
      messages: [
        {
          role: "system",
          content: "You are a creative AI motion presentation designer."
        },
        {
          role: "user",
          content: `${prompt}\n\nReturn valid JSON only.`
        }
      ]
    });

    const text = response.choices[0]?.message?.content ?? "{}";
    return JSON.parse(text);
  } catch {
    return mockStoryboard(prompt);
  }
}

function mockStoryboard(prompt: string) {
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
        subtitle: "Customers are overwhelmed by fragmented workflows.",
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
        subtitle: "One AI system automates the work across every touchpoint.",
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
        title: "Evidence",
        subtitle: "Results show meaningful gains in speed and revenue.",
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
        subtitle: "Built for scaling from pilot to global launch.",
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
