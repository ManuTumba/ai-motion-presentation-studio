import { NextResponse } from "next/server";
import { generateStoryboardFromPrompt } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const result = await generateStoryboardFromPrompt(prompt);

    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate storyboard" },
      { status: 500 }
    );
  }
}
