import { Card, CardContent, CardHeader, CardTitle, Badge, Progress } from "@/components/ui";
import { db, NarrativeRow, Article } from "@/lib/db";
import "@/lib/seed";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { TrendingUp, AlertTriangle, CheckCircle, Clock, ExternalLink } from "lucide-react";

async function getNarratives() {
  const narratives = db.prepare('SELECT * FROM narratives ORDER BY score DESC').all() as NarrativeRow[];
  return narratives.map(n => {
    const articles = db.prepare('SELECT * FROM articles WHERE narrativeId = ?').all(n.id) as Article[];
    return { ...n, tags: JSON.parse(n.tags) as string[], articles };
  });
}

function ScoreIcon({ score }: { score: number }) {
  if (score >= 75) return <CheckCircle className="h-5 w-5 text-emerald-500" />;
  if (score >= 45) return <TrendingUp className="h-5 w-5 text-amber-500" />;
  return <AlertTriangle className="h-5 w-5 text-red-500" />;
}

function scoreColor(score: number) {
  if (score >= 75) return "text-emerald-500";
  if (score >= 45) return "text-amber-500";
  return "text-red-500";
}

function scoreBarColor(score: number) {
  if (score >= 75) return "bg-emerald-500";
  if (score >= 45) return "bg-amber-500";
  return "bg-red-500";
}

export default async function DashboardPage() {
  const narratives = await getNarratives();

  const avgScore = narratives.length
    ? Math.round(narratives.reduce((sum, n) => sum + n.score, 0) / narratives.length)
    : 0;
  const highCount = narratives.filter(n => n.score >= 75).length;
  const lowCount = narratives.filter(n => n.score < 45).length;

  return (
    <div className="container mx-auto px-4 py-4 space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative">
          <div className="flex items-center gap-2 text-indigo-100/70 text-sm font-medium mb-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE ANALYSIS FEED
          </div>
          <h1 className="text-4xl font-bold mb-2">Narrative Intelligence Dashboard</h1>
          <p className="opacity-90 max-w-xl">
            AI-powered clustering and credibility scoring of global news narratives. Signals reflect source diversity and agreement — not absolute truth.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Narratives", value: narratives.length, icon: "📰" },
          { label: "Avg. Credibility", value: `${avgScore}/100`, icon: "📊" },
          { label: "High-Confidence", value: highCount, icon: "✅" },
          { label: "Low-Credibility", value: lowCount, icon: "⚠️" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Narrative Cards Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" /> Active Narratives
        </h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {narratives.map((narrative) => (
            <Link href={`/narrative/${narrative.id}`} key={narrative.id}>
              <div className="group h-full rounded-xl border bg-card shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-200 cursor-pointer flex flex-col overflow-hidden">
                {/* Score bar accent at top */}
                <div className={`h-1 w-full ${scoreBarColor(narrative.score)}`} style={{ width: `${narrative.score}%` }} />

                <div className="p-5 flex flex-col flex-1">
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors">{narrative.title}</h3>
                    <ScoreIcon score={narrative.score} />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {narrative.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>

                  {/* Score */}
                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Credibility Signal</span>
                      <span className={`font-bold ${scoreColor(narrative.score)}`}>{narrative.score}/100</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${scoreBarColor(narrative.score)}`} style={{ width: `${narrative.score}%` }} />
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        {narrative.articles?.length || 0} sources
                      </span>
                      <span>
                        <Badge variant={narrative.confidence === "High" ? "default" : narrative.confidence === "Medium" ? "secondary" : "outline"} className="text-[10px] py-0">
                          {narrative.confidence} Confidence
                        </Badge>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {narratives.length === 0 && (
        <div className="col-span-full py-16 text-center text-muted-foreground border border-dashed rounded-xl">
          <div className="text-4xl mb-3">📡</div>
          <p>No narratives found. Waiting for data pipeline...</p>
        </div>
      )}
    </div>
  );
}
