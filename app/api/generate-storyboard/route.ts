import { NextResponse } from "next/server";
import { generateStoryboardFromPrompt } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, provider } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const result = await generateStoryboardFromPrompt(prompt, provider || "auto");

    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate storyboard" }, { status: 500 });
  }
}
