import { NextResponse } from "next/server";
import { analyzeCustomText } from "@/lib/ai";
import "@/lib/seed";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Invalid or missing text input." }, { status: 400 });
    }
    const result = await analyzeCustomText(text);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Analyze error:", error);
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}
