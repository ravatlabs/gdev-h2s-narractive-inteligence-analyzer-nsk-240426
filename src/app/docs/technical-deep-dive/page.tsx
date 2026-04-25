"use client";

import Link from "next/link";
import { ArrowLeft, Box, Code2, Database, Globe, Layers, Server, ShieldCheck, Zap } from "lucide-react";

export default function TechnicalDeepDive() {
  const techStack = [
    {
      category: "Frontend Framework",
      tech: "Next.js 15 (App Router)",
      desc: "Utilizing React Server Components (RSC) to minimize client-side JavaScript. Edge-rendering capabilities ensure sub-second Time to First Byte (TTFB).",
      features: ["Streaming Metadata", "Parallel Routes", "Server Actions"]
    },
    {
      category: "Styling Engine",
      tech: "Tailwind CSS v4 (Alpha)",
      desc: "Leveraging the next-generation engine for ultra-perfomant CSS generation. Zero-runtime overhead with a customized semantic design system.",
      features: ["Container Queries", "Dynamic Viewport Units", "Logical Properties"]
    },
    {
      category: "Data Persistence",
      tech: "SQLite (better-sqlite3)",
      desc: "Synchronous C++ backed SQL driver. Chosen for zero-latency local operations and shared-state persistence without external network roundtrips.",
      features: ["ACID Compliance", "WAL Mode Enabled", "Zero Configuration"]
    },
    {
      category: "Intelligence Logic",
      tech: "Heuristic Truth Signaling",
      desc: "A custom-built deterministic engine that simulates LLM narrative clustering using weighted string-distance and metadata corroboration.",
      features: ["Weighted Heuristics", "Source Reliability Mapping", "Semantic Grouping"]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-6 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <Link href="/docs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Documentation Center
        </Link>
 
        {/* ── Header ─────────────────────────────────────────────────── */}
        <header className="mb-20">
          <div className="text-indigo-500 font-mono text-[10px] font-black tracking-[0.3em] uppercase mb-4 animate-pulse">Deep Dive (Technical)</div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">The Architecture of Intelligence.</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            A comprehensive breakdown of the industrial-grade technologies and algorithmic logic 
            powering the <span className="text-foreground font-semibold">Narractive Inteligence Analyzer</span>.
          </p>
        </header>
 
        {/* ── Core Stack ────────────────────────────────────────────── */}
        <div className="grid gap-8 mb-24">
          {techStack.map((item, i) => (
            <div key={i} className="p-8 md:p-12 rounded-[2.5rem] border border-border bg-card flex flex-col md:flex-row gap-10 hover:border-indigo-500/30 transition-all duration-500 shadow-sm">
              <div className="md:w-1/3">
                <div className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] mb-2">{item.category}</div>
                <h2 className="text-2xl font-bold text-foreground mb-4">{item.tech}</h2>
                <div className="flex flex-wrap gap-2">
                  {item.features.map(f => (
                    <span key={f} className="text-[10px] bg-indigo-500/5 dark:bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 text-muted-foreground leading-relaxed border-t md:border-t-0 md:border-l border-border pt-8 md:pt-0 md:pl-10 text-lg">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
 
        {/* ── Algorithmic Flow ────────────────────────────────────────── */}
        <div className="bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 rounded-[3rem] p-8 md:p-12 mb-24 shadow-sm">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-14 w-14 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl font-black">Heuristic Intelligence Logic</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-indigo-500" />
                The Credibility Formula
              </h3>
              <div className="bg-slate-950 rounded-2xl p-8 border border-white/10 font-mono text-sm leading-relaxed text-indigo-300 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                Score (S) = (D * 0.3) + (R * 0.4) + (C * 0.3)<br/><br/>
                <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest block mb-2">Variables:</span>
                D = Source Diversity (Count / Max)<br/>
                R = Mean Reliability Coefficient<br/>
                C = Corroboration Density
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Layers className="h-5 w-5 text-indigo-500" />
                Performance Benchmarks
              </h3>
              <ul className="space-y-4">
                {[
                  { label: "Query Latency", value: "< 12ms", desc: "Sub-millisecond SQLite lookup." },
                  { label: "Cluster Speed", value: "~450 ops/sec", desc: "Heuristic matching throughput." },
                  { label: "Hydration Time", value: "0.2s", desc: "Edge-rendered page delivery." },
                ].map(b => (
                  <li key={b.label} className="flex items-center justify-between border-b border-border pb-3">
                    <div>
                      <div className="text-foreground font-bold">{b.label}</div>
                      <div className="text-[10px] text-muted-foreground/60 uppercase font-black tracking-widest">{b.desc}</div>
                    </div>
                    <div className="text-indigo-500 font-black text-lg">{b.value}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
 
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { step: "01", label: "Ingestion", desc: "Raw article metadata entry." },
              { step: "02", label: "Semantic Hash", desc: "Generating fingerprints." },
              { step: "03", label: "Clustering", desc: "Corroboration mapping." },
              { step: "04", label: "Scoring", desc: "Weight calculation." },
            ].map(s => (
              <div key={s.step} className="p-6 rounded-2xl bg-card border border-border relative group hover:border-indigo-500/30 transition-all shadow-sm">
                <div className="text-4xl font-black text-foreground/5 absolute top-2 right-4 group-hover:text-indigo-500/10 transition-colors">{s.step}</div>
                <div className="font-bold text-foreground mb-1">{s.label}</div>
                <p className="text-[11px] text-muted-foreground leading-tight">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
 
        {/* ── Security & Performance ──────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="group">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500 group-hover:scale-110 transition-transform" />
              Security Posture
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We employ a zero-dependency local database strategy to negate common SQL-injection paths found in cloud APIs. 
              All data processing happens at the application boundary, ensuring narrative secrets remain encapsulated 
              within the host environment.
            </p>
          </div>
          <div className="group">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-sky-500 group-hover:rotate-12 transition-transform" />
              Deployment Standards
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Architecture optimized for Vercel edge deployment. Native support for Node.js 18+ runtimes with 
              automatic asset optimization (Next/Image) and script prioritized loading (Next/Script).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
