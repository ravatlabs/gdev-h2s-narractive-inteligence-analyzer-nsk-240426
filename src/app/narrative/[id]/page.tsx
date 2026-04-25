"use client";

import { mockNarratives } from "@/lib/mockData";
import { formatDistanceToNow, format } from "date-fns";
import {
  ArrowLeft, Clock, Info, ExternalLink, CheckCircle,
  AlertTriangle, TrendingUp, Flame, Globe, Calendar
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

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
function scoreBg(score: number) {
  if (score >= 75) return "bg-emerald-500/10 border-emerald-500/20";
  if (score >= 45) return "bg-amber-500/10 border-amber-500/20";
  return "bg-red-500/10 border-red-500/20";
}
function ScoreIcon({ score }: { score: number }) {
  if (score >= 75) return <CheckCircle className="h-5 w-5 text-emerald-500" />;
  if (score >= 45) return <TrendingUp className="h-5 w-5 text-amber-500" />;
  return <AlertTriangle className="h-5 w-5 text-red-500" />;
}
function scoreVerdict(score: number) {
  if (score >= 80) return "Highly Credible";
  if (score >= 65) return "Credible";
  if (score >= 45) return "Moderate";
  return "Low Trust";
}

export default function NarrativeDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const narrative = mockNarratives.find((n) => n.id === id);

  if (!narrative) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="text-6xl mb-6">📡</div>
        <h1 className="text-3xl font-black text-foreground mb-3">Narrative Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          This narrative stream may have expired or the ID is invalid.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  const score = narrative.credibility_score;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* ── Back + Header ─────────────────────────────────────────── */}
        <div className="flex items-start gap-4">
          <Link
            href="/dashboard"
            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:border-indigo-500/50 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 px-3 py-1 rounded-full">
                {narrative.category}
              </span>
              {narrative.isTrending && (
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-full">
                  <Flame className="h-3 w-3" /> Trending
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-snug text-foreground">
              {narrative.summary}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {format(new Date(narrative.created_at), "MMMM d, yyyy · h:mm a")}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                {narrative.articles.length} sources corroborated
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {formatDistanceToNow(new Date(narrative.created_at), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Source Timeline ────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-base font-bold flex items-center gap-2 border-b border-border pb-4 text-foreground">
              <Clock className="h-4 w-4 text-indigo-500" /> Source Timeline
              <span className="ml-auto text-xs font-medium text-muted-foreground">{narrative.articles.length} articles</span>
            </h2>

            <div className="space-y-4">
              {narrative.articles.map((article, idx) => (
                <div
                  key={article.id}
                  className="relative rounded-2xl border border-border bg-card shadow-sm overflow-hidden hover:border-indigo-500/40 hover:shadow-md transition-all group"
                >
                  {/* Left accent stripe */}
                  <div className={`absolute inset-y-0 left-0 w-1 ${scoreBarColor(score)}`} />

                  <div className="pl-6 pr-5 pt-5 pb-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-muted border border-border text-muted-foreground px-2.5 py-0.5 rounded-md">
                          {article.source}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                          {narrative.category}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {format(new Date(article.published_at), "MMM d, yyyy · h:mm a")}
                      </span>
                    </div>

                    <h3 className="font-semibold text-foreground text-base mb-3 group-hover:text-indigo-500 transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-500 hover:text-indigo-400 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Read on {article.source}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── AI Intelligence Report Sidebar ──────────────────────── */}
          <div className="space-y-5">

            {/* Score Card */}
            <div className={`rounded-2xl border-2 p-6 shadow-lg ${scoreBg(score)}`}>
              <div className="flex items-center gap-2 mb-5">
                <Info className="h-4 w-4 text-indigo-500" />
                <h3 className="font-bold text-sm tracking-wide uppercase text-foreground">AI Intelligence Report</h3>
              </div>

              {/* Score Ring */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-20 h-20 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/30" />
                    <circle
                      cx="40" cy="40" r="32" fill="none" strokeWidth="6"
                      className={scoreColor(score).replace("text-", "stroke-")}
                      strokeDasharray={2 * Math.PI * 32}
                      strokeDashoffset={2 * Math.PI * 32 * (1 - score / 100)}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 1s ease" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className={`text-xl font-black ${scoreColor(score)}`}>{score}</span>
                    <span className="text-[9px] text-muted-foreground font-semibold">/ 100</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ScoreIcon score={score} />
                    <span className={`font-black text-lg ${scoreColor(score)}`}>{scoreVerdict(score)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Based on source diversity, publisher credibility, and corroboration analysis.
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2.5">
                {[
                  { label: "Sources corroborated", value: `${narrative.articles.length}` },
                  { label: "Category", value: narrative.category },
                  { label: "Topics", value: narrative.topics.slice(0, 2).join(", ") },
                  { label: "Cluster age", value: formatDistanceToNow(new Date(narrative.created_at), { addSuffix: true }) },
                  { label: "Signal verdict", value: scoreVerdict(score) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center text-sm border-b border-border/50 pb-2 last:border-0">
                    <span className="text-muted-foreground font-medium">{label}</span>
                    <span className="font-semibold text-foreground text-right max-w-[60%] truncate">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
              <strong>⚠️ Heuristic Signal Only:</strong> Credibility scores reflect source activity patterns and publisher reliability — not verified facts. Always consult primary sources for editorial decisions.
            </div>

            {/* Back CTA */}
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-border bg-card hover:bg-muted font-semibold text-sm transition-all text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
