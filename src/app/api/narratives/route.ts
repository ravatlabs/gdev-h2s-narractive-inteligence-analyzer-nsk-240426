import { NextResponse } from "next/server";
import { db, NarrativeRow, Article } from "@/lib/db";
import "@/lib/seed"; // Ensures seeding before API calls

export async function GET() {
  try {
    const narratives = db.prepare('SELECT * FROM narratives ORDER BY score DESC').all() as NarrativeRow[];
    
    // Attach articles to each narrative
    const narrativesWithArticles = narratives.map(n => {
      const articles = db.prepare('SELECT * FROM articles WHERE narrativeId = ?').all(n.id) as Article[];
      return {
        ...n,
        tags: JSON.parse(n.tags), // Parse JSON
        articles
      };
    });

    return NextResponse.json(narrativesWithArticles);
  } catch (error) {
    console.error("Error fetching narratives:", error);
    return NextResponse.json({ error: "Failed to fetch narratives" }, { status: 500 });
  }
}
