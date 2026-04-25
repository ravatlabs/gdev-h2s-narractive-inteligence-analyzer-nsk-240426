import { NextResponse } from "next/server";
import { db, NarrativeRow, Article } from "@/lib/db";
import "@/lib/seed";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const narrativeRow = db.prepare('SELECT * FROM narratives WHERE id = ?').get(id) as NarrativeRow | undefined;
    
    if (!narrativeRow) {
      return NextResponse.json({ error: "Narrative not found" }, { status: 404 });
    }

    const articles = db.prepare('SELECT * FROM articles WHERE narrativeId = ?').all(id) as Article[];

    const narrative = {
      ...narrativeRow,
      tags: JSON.parse(narrativeRow.tags),
      articles
    };

    return NextResponse.json(narrative);
  } catch (error) {
    console.error("Error fetching narrative:", error);
    return NextResponse.json({ error: "Failed to fetch narrative" }, { status: 500 });
  }
}
