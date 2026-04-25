"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/ai";
import { Search, Loader2, FileText, AlertTriangle, CheckCircle, ShieldAlert, HelpCircle, ExternalLink, BarChart3, Sparkles } from "lucide-react";

const VERDICT_CONFIG = {
  LEGITIMATE:  { color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800", icon: CheckCircle,  bar: "bg-emerald-500" },
  PLAUSIBLE:   { color: "text-blue-500",    bg: "bg-blue-50 dark:bg-blue-950/30",       border: "border-blue-200 dark:border-blue-800",       icon: CheckCircle,  bar: "bg-blue-500"    },
  UNCERTAIN:   { color: "text-amber-500",   bg: "bg-amber-50 dark:bg-amber-950/30",     border: "border-amber-200 dark:border-amber-800",     icon: AlertTriangle, bar: "bg-amber-500"  },
  SUSPICIOUS:  { color: "text-red-500",     bg: "bg-red-50 dark:bg-red-950/30",         border: "border-red-200 dark:border-red-800",         icon: ShieldAlert,  bar: "bg-red-500"     },
  INSUFFICIENT:{ color: "text-slate-500",   bg: "bg-slate-50 dark:bg-slate-950/30",     border: "border-slate-200 dark:border-slate-800",     icon: HelpCircle,   bar: "bg-slate-400"   },
} as const;

function ScoreRing({ score, color }: { score: number; color: string }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="10" className="text-muted/30" />
        <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10"
          className={color.replace("text-", "stroke-")}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className={`text-3xl font-extrabold ${color}`}>{score}</div>
        <div className="text-xs text-muted-foreground">/ 100</div>
      </div>
    </div>
  );
}

function MiniBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function AnalyzePage() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!text.trim()) { setError("Please enter some text to analyze."); return; }
    setIsLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const cfg = result ? VERDICT_CONFIG[result.verdictLevel] : null;
  const VerdictIcon = cfg?.icon;

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-8 py-4">
      {/* Header (Premium & Smooth) */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-10 md:p-14 text-foreground shadow-2xl shadow-indigo-500/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[400px] h-full bg-indigo-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-full bg-violet-600/5 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-indigo-500 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Sparkles className="h-4 w-4" /> 
            Intelligence Engine · v1.0.4
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Content <br className="md:hidden" />
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
              Legitimacy Lab.
            </span>
          </h1>
          <p className="text-muted-foreground dark:text-slate-400 max-w-2xl text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-150">
            Audit any news claim or viral statement. Our AI cross-references input 
            against verified narratives to provide architectural transparency and 
            weighted credibility signals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="rounded-xl border bg-card shadow-sm flex flex-col">
          <div className="flex items-center gap-3 px-5 pt-5 pb-3 border-b">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">Your Input</h2>
              <p className="text-xs text-muted-foreground">Paste news, claims, or write in your own words</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col p-5 gap-4">
            <textarea
              className="flex-1 min-h-[280px] w-full p-4 rounded-lg border bg-muted/30 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={`Examples:\n• "Apple said they investing 500 billion in america"\n• "Global temprature is rising by record in 2026"\n• "WHO says new flu virus spreading human to human"\n\nPoor English is fine — we'll understand it.`}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            
            {/* Example Queries */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Try these examples</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Apple CEO Tim Cook announced today that Apple will commit $500B to US manufacturing jobs over the next five years, focusing on semiconductor chip factories in Ohio and Arizona to secure the domestic supply chain.",
                  "A massive breakthrough in global fusion energy has been reached by an international team of scientists in 2026, marking a significant milestone towards clean and limitless commercial power generation within the decade.",
                  "Recent reports from top sources like Reuters suggest that Nvidia is planning to build a large-scale AI chip factory in Delhi, India, following a strategic meeting with the local technology minister to bolster Asian semiconductor sovereignty.",
                  "The 2026 Climate Consensus report shows that global average temperatures have risen by record levels this year, leading to a new international pact for sub-sea flood barriers and urban heat island mitigation in coastal cities.",
                  "Niche reports discuss a growing dispute over Arctic mineral rights as melting ice surfaces rich rare earth deposits, leading to a multi-national standoff between Arctic Council members over extraction sovereignty in 2026.",
                  "Secret sources claim that technology giants are allegedly using an exclusive leak to cover up a hidden truth about autonomous drone delivery safety risks that no one is talking about or wants the public to know.",
                  "SpaceX has successfully completed the first major habitation test for its Mars Colony project in early 2026, with astronauts spending 90 days in a modular habitat to prove long-term survival capabilities in high-radiation environments.",
                  "The Central Bank has launched a new cross-border pilot program for the Digital Rupee in collaboration with several Asian nations, aiming to standardize digital currency transactions and reduce global reliance on traditional banking rails.",
                  "New quantum cryptography standards for 2026 have been officially proposed by a coalition of open-source security experts to protect international financial data against the threat of early-stage quantum computing decryption.",
                  "The World Health Organization (WHO) is currently monitoring reports of a potential new flu virus strain in Asia that may have shown early signs of human-to-human transmission in small rural communities near major travel hubs."
                ].map(example => (
                  <button
                    key={example}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setText(example);
                    }}
                    className="text-[10px] text-left leading-relaxed px-3 py-2 rounded-lg border bg-muted/50 hover:bg-muted hover:border-primary/30 transition-all w-full relative z-10 pointer-events-auto active:scale-[0.98]"
                  >
                    "{example.slice(0, 80)}..."
                  </button>
                ))}
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-900">
                <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
              </div>
            )}
            <button
              onClick={handleAnalyze}
              disabled={isLoading || !text.trim()}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              {isLoading ? "Analyzing legitimacy..." : "Analyze Legitimacy"}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Matches against 50+ verified news events from 9 topic domains (April 2026)
            </p>
          </div>
        </div>

        {/* Output Panel */}
        <div className={`rounded-xl border shadow-sm flex flex-col transition-colors ${cfg ? `${cfg.bg} ${cfg.border}` : "bg-card"}`}>
          <div className="flex items-center gap-3 px-5 pt-5 pb-3 border-b border-inherit">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">Intelligence Output</h2>
              <p className="text-xs text-muted-foreground">Legitimacy score + evidence breakdown</p>
            </div>
          </div>

          <div className="flex-1 p-5">
            {/* Idle */}
            {!result && !isLoading && (
              <div className="h-full min-h-[280px] flex flex-col items-center justify-center gap-3 text-muted-foreground">
                <Search className="h-10 w-10 opacity-20" />
                <p className="text-sm">Awaiting input...</p>
              </div>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="h-full min-h-[280px] flex flex-col items-center justify-center gap-4 text-primary">
                <Loader2 className="h-10 w-10 animate-spin" />
                <div className="text-center">
                  <p className="font-semibold text-sm animate-pulse">Running legitimacy engine...</p>
                  <p className="text-xs text-muted-foreground mt-1">Searching 50+ verified sources</p>
                </div>
              </div>
            )}

            {/* Needs more context */}
            {result && result.needsMoreContext && result.verdictLevel === "INSUFFICIENT" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {VerdictIcon && <VerdictIcon className={`h-7 w-7 ${cfg?.color}`} />}
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${cfg?.color}`}>{result.verdictLevel}</span>
                    <p className="font-semibold">{result.verdict}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground bg-background/50 rounded-lg p-3 border">{result.explanation}</p>
                {result.promptForContext && (
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" /> To get a better analysis, provide:
                    </p>
                    <pre className="text-xs text-amber-700 dark:text-amber-300 whitespace-pre-wrap font-sans">{result.promptForContext}</pre>
                  </div>
                )}
              </div>
            )}

            {/* Full Result */}
            {result && result.verdictLevel !== "INSUFFICIENT" && !isLoading && (
              <div className="space-y-5">
                {/* Score + Verdict */}
                <div className="flex items-center gap-5">
                  <ScoreRing score={result.legitimacyScore} color={cfg!.color} />
                  <div className="space-y-2 flex-1">
                    <div className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${cfg!.bg} ${cfg!.color} border ${cfg!.border}`}>
                      {VerdictIcon && <VerdictIcon className="h-3.5 w-3.5" />} {result.verdictLevel}
                    </div>
                    <p className="font-semibold text-sm leading-snug">{result.verdict}</p>
                    <span className="inline-block text-xs bg-background border rounded-full px-2.5 py-0.5 text-muted-foreground">
                      Topic: {result.topic} · Strength: {result.topicStrength}
                    </span>
                  </div>
                </div>

                {/* Sub Scores */}
                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Score Breakdown</p>
                  <MiniBar label="Claim Specificity" value={result.claimSpecificity} color={cfg!.bar} />
                  <MiniBar label="Source Coverage" value={result.sourceCoverage} color={cfg!.bar} />
                  <MiniBar label="Context Coherence" value={result.claimCoherence} color={cfg!.bar} />
                </div>

                {/* Explanation */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">AI Explanation</p>
                  <p className="text-sm text-foreground/80 bg-background/50 rounded-lg p-3 border leading-relaxed">{result.explanation}</p>
                </div>

                {/* Context Evidence */}
                {result.contextEvidence.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Context Evidence ({result.contextEvidence.length} related sources)
                    </p>
                    <div className="space-y-2">
                      {result.contextEvidence.map((ev, i) => (
                        <div key={i} className="rounded-lg border bg-background/50 p-3 text-xs">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span className="font-medium line-clamp-2">{ev.headline}</span>
                            <span className={`shrink-0 font-bold ${cfg!.color}`}>{ev.relevance}%</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="font-medium">{ev.source}</span>
                            <span>·</span>
                            <span className="text-xs">Matched: {ev.matchedTerms.join(", ")}</span>
                          </div>
                          <a href={ev.url} target="_blank" rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1 text-primary hover:underline">
                            <ExternalLink className="h-3 w-3" /> View source
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Needs more context callout */}
                {result.needsMoreContext && result.promptForContext && (
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1.5 flex items-center gap-1.5">
                      <HelpCircle className="h-3.5 w-3.5" /> Improve this analysis:
                    </p>
                    <pre className="text-xs text-amber-700 dark:text-amber-300 whitespace-pre-wrap font-sans">{result.promptForContext}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="rounded-xl border bg-card p-5">
        <h3 className="font-semibold mb-3 text-sm">How the Legitimacy Engine Works</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
          {[
            { icon: "🔍", label: "Input Normalization", desc: "Handles typos, poor grammar, and informal language" },
            { icon: "📰", label: "Context Matching", desc: "Searches 50+ verified April 2026 news events for related evidence" },
            { icon: "🏛️", label: "Source Reputation", desc: "Weights evidence by outlet credibility (Reuters=95, blog=15)" },
            { icon: "📊", label: "Legitimacy Score", desc: "Combines specificity, coverage, and coherence into 0–100 score" },
          ].map(item => (
            <div key={item.label} className="space-y-1">
              <div className="text-xl">{item.icon}</div>
              <p className="font-semibold text-foreground">{item.label}</p>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
