"use client";

import Link from "next/link";
import { Activity, ArrowLeft, CheckCircle2, Circle, GitBranch, GitCommit, GitMerge, Milestone, Package, Palette, Search, ShieldCheck } from "lucide-react";

const developmentTree = [
  {
    phase: "Phase 1: The Sprint",
    title: "Initial Architecture & Foundation",
    date: "April 24, 2026 (12:30 - 13:00)",
    icon: Circle,
    status: "completed",
    details: [
      "Rapid initialization of the Next.js 15 full-stack framework.",
      "Established the 'Narractive' brand identity and core visual design language.",
      "Provisioning of the local-first SQLite database architecture.",
    ]
  },
  {
    phase: "Phase 2: Core Logic",
    title: "Database Integration & Seeding",
    date: "April 24, 2026",
    icon: GitBranch,
    status: "completed",
    details: [
      "Engineering the 'Better-SQLite3' persistence layer for zero-latency operations.",
      "Deployment of the automated Seeding Engine with 50+ diverse news articles.",
      "First successful clustering of cross-platform narrative data.",
    ]
  },
  {
    phase: "Phase 3: Intelligence Layer",
    title: "Heuristic AI & Legitimacy Engine",
    date: "April 24, 2026",
    icon: Package,
    status: "completed",
    details: [
      "Development of the weighted scoring system for news credibility.",
      "Implementation of the Legitimacy Analyzer for real-time claim verification.",
      "Constructing the 'AI Reasoning' pipeline to provide transparent user feedback.",
    ]
  },
  {
    phase: "Phase 4: Interface & UX",
    title: "Dashboard & Analysis Platform",
    date: "April 24, 2026",
    icon: Search,
    status: "completed",
    details: [
      "Finalized the Narrative Dashboard with dynamic clustering visualizations.",
      "Implemented full-stack routes for real-time narrative detail exploration.",
      "Established the premium Dark Mode aesthetic across all application islands.",
    ]
  },
  {
    phase: "Phase 5: Mobile & Stability",
    title: "Mobile Optimization & Verification",
    date: "April 25, 2026",
    icon: Palette,
    status: "completed",
    details: [
      "Resolved critical cross-device hydration and interactive navbar issues.",
      "Optimized the counting animations and touch-targets for smartphone access.",
      "Verified local IP networking stability for shared community environments.",
    ]
  },
  {
    phase: "Phase 6: Documentation",
    title: "Engineering SOPs & Resource Mapping",
    date: "April 25, 2026",
    icon: ShieldCheck,
    status: "completed",
    details: [
      "Creation of the 'Bit-and-Byte' Master Technical Reference.",
      "Developed the non-technical 'Study Guide' for stakeholder transparency.",
      "Finalized the Step-by-Step Standard Operating Procedure (SOP).",
    ]
  },
  {
    phase: "Phase 7: Refinement",
    title: "Theme Interop & Full Disclosure",
    date: "April 25, 2026",
    icon: GitMerge,
    status: "completed",
    details: [
      "System-wide theme audit for perfect Light/Dark mode interoperability.",
      "Integration of the 'Full Project Disclosure' folder manifest.",
      "Final branding standardizations for H2S Bootcamp & Google for Developers.",
    ]
  }
];

export default function BuildLedger() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/docs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Technical Reference
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 shadow-lg shadow-indigo-500/20">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">The Build Ledger</h1>
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs mt-1">Tracing the evolution of Narractive Inteligence Analyzer</p>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed max-w-2xl text-lg mb-12">
          From the first line of code to a professional intelligence platform, this is the 
          chronological "Tree" of how we engineered the Narrractive Inteligence Analyzer.
        </p>

        {/* ── Vertical Timeline (The Tree) ────────────────────────────────── */}
        <div className="relative border-l-2 border-indigo-500/20 ml-4 space-y-16 py-4">
          {developmentTree.map((node, i) => (
            <div key={i} className="relative pl-10 group">
              {/* Timeline Dot */}
              <div className={node.status === "completed" 
                ? "absolute -left-[11px] top-1 h-5 w-5 rounded-full border-2 border-background bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10 transition-transform group-hover:scale-125"
                : "absolute -left-[11px] top-1 h-5 w-5 rounded-full border-2 border-border bg-muted z-10"
              } />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-indigo-500 uppercase tracking-[0.2em]">{node.phase}</span>
                  <div className="h-px w-8 bg-indigo-500/30 hidden md:block" />
                  <h2 className="text-2xl font-bold text-foreground">{node.title}</h2>
                </div>
                <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded border border-border">{node.date}</span>
              </div>

              <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
                <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm group-hover:border-indigo-500/30 transition-colors">
                  <ul className="space-y-3">
                    {node.details.map((detail, di) => (
                      <li key={di} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/10 bg-indigo-500/5 text-indigo-500/40">
                  <node.icon className="h-8 w-8" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Summary Footer ────────────────────────────────────────────── */}
        <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Activity className="h-32 w-32" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Build Finalized</h3>
            <p className="text-indigo-100 max-w-xl leading-relaxed mb-6">
              The project is now a stable, self-contained intelligence tool. 
              The Next.js architecture combined with the SQLite local-first approach creates a robust 
              foundation for future LLM integration.
            </p>
            <Link href="/landing" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-bold hover:bg-opacity-90 transition-all text-sm">
              Explore Live Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
