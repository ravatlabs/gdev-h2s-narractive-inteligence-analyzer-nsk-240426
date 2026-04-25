import { db, NarrativeRow, Article } from "@/lib/db";
import "@/lib/seed";
import { Card, CardContent, CardHeader, CardTitle, Badge, Progress } from "@/components/ui";
import { formatDistanceToNow, format } from "date-fns";
import { ArrowLeft, Clock, Info, ExternalLink, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

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
function ScoreIcon({ score }: { score: number }) {
  if (score >= 75) return <CheckCircle className="h-5 w-5 text-emerald-500" />;
  if (score >= 45) return <TrendingUp className="h-5 w-5 text-amber-500" />;
  return <AlertTriangle className="h-5 w-5 text-red-500" />;
}

export default async function NarrativeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const narrativeRow = db.prepare('SELECT * FROM narratives WHERE id = ?').get(id) as NarrativeRow | undefined;
  if (!narrativeRow) notFound();

  const articles = db.prepare(
    'SELECT * FROM articles WHERE narrativeId = ? ORDER BY timestamp DESC'
  ).all(id) as Article[];

  const tags: string[] = JSON.parse(narrativeRow.tags);

  return (
    <div className="container mx-auto px-4 py-4 space-y-8">
      {/* Back + Title */}
      <div className="flex items-start gap-4">
        <Link href="/" className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-card text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-snug">{narrativeRow.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-5">
          <h2 className="text-lg font-semibold flex items-center gap-2 border-b pb-3">
            <Clock className="h-5 w-5 text-primary" /> Source Timeline
          </h2>

          <div className="space-y-4">
            {articles.map((article, idx) => (
              <div key={article.id} className="relative rounded-xl border bg-card shadow-sm overflow-hidden">
                {/* Left accent stripe */}
                <div className={`absolute inset-y-0 left-0 w-1 ${scoreBarColor(narrativeRow.score)}`} />

                <div className="pl-5 pr-5 pt-4 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{article.source}</Badge>
                      <Badge variant="secondary" className="text-xs">{article.topic}</Badge>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {format(new Date(article.timestamp), "MMM d, yyyy · h:mm a")}
                    </span>
                  </div>

                  <h3 className="font-semibold text-base mb-2">{article.title}</h3>

                  <p className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3 italic mb-3">
                    "{article.summary}"
                  </p>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Read full article on {article.source}
                  </a>
                </div>
              </div>
            ))}

            {articles.length === 0 && (
              <div className="text-center py-12 text-muted-foreground border border-dashed rounded-xl">
                No articles clustered yet.
              </div>
            )}
          </div>
        </div>

        {/* AI Report Sidebar */}
        <div className="space-y-4">
          {/* Score Card */}
          <Card className="border-2 border-primary/20 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Info className="h-5 w-5 text-primary" /> AI Intelligence Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Score */}
              <div>
                <div className="flex items-end gap-2 mb-2">
                  <ScoreIcon score={narrativeRow.score} />
                  <span className={`text-4xl font-extrabold leading-none ${scoreColor(narrativeRow.score)}`}>
                    {narrativeRow.score}
                  </span>
                  <span className="text-muted-foreground pb-0.5 text-sm">/ 100</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full ${scoreBarColor(narrativeRow.score)} transition-all`}
                    style={{ width: `${narrativeRow.score}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Confidence:{" "}
                  <Badge variant={narrativeRow.confidence === "High" ? "default" : "secondary"} className="text-xs">
                    {narrativeRow.confidence}
                  </Badge>
                </div>
              </div>

              {/* Explanation */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Why this score?</h4>
                <p className="text-sm text-foreground/80 leading-relaxed bg-muted/50 rounded-lg p-3 border">
                  {narrativeRow.explanation}
                </p>
              </div>

              {/* Details */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Cluster Details</h4>
                <ul className="text-sm space-y-1.5">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Sources found</span>
                    <span className="font-medium">{articles.length}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Cluster age</span>
                    <span className="font-medium">{formatDistanceToNow(new Date(narrativeRow.createdAt))} ago</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Signal verdict</span>
                    <span className={`font-medium ${scoreColor(narrativeRow.score)}`}>
                      {narrativeRow.score >= 75 ? "Credible" : narrativeRow.score >= 45 ? "Moderate" : "Low Trust"}
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20 p-4 text-xs text-amber-700 dark:text-amber-400">
            <strong>⚠️ Disclaimer:</strong> Credibility scores are heuristic signals only — they reflect source activity patterns, not verified facts. Always consult primary sources.
          </div>
        </div>
      </div>
    </div>
  );
}
