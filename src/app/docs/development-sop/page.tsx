"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, ClipboardList, Code2, Database, Layout, Rocket, Settings, ShieldCheck } from "lucide-react";

const sopSteps = [
  {
    step: "01",
    title: "Environment Initialization",
    icon: Settings,
    details: [
      "Confirm Node.js v18+ and NPM v9+ environment.",
      "Initialize Next.js 15 using the App Router architecture.",
      "Configure Tailwind CSS v4 with a custom refined design system.",
      "Set up strict TypeScript configurations for type safety."
    ]
  },
  {
    step: "02",
    title: "Database Strategy (Local-First)",
    icon: Database,
    details: [
      "Select 'better-sqlite3' for high-concurrency local data management.",
      "Design relational schema for 'Narratives' and 'Articles'.",
      "Implement a robust Seeding Engine (lib/seed.ts) for consistent MVP data.",
      "Ensure auto-migration on server startup to prevent manual DB overhead."
    ]
  },
  {
    step: "03",
    title: "Intelligence Engine (Heuristics)",
    icon: Code2,
    details: [
      "Drafted lib/ai.ts to handle 'Clustering' and 'Credibility Scoring'.",
      "Defined mathematical weights: Source Diversity (30%), Reliability (40%), Corroboration (30%).",
      "Ensured deterministic output for auditability and transparency.",
      "Created drop-in points for future GPT-4/Gemini LLM integrations."
    ]
  },
  {
    step: "04",
    title: "Premium Component Development",
    icon: Layout,
    details: [
      "Built 'Navbar' and 'Footer' with unified branding and mobile scaling.",
      "Assembled the 'Analyzer Card' with real-time scoring visualizations.",
      "Optimized the 'Legitimacy Analyzer' for broken/informal text inputs.",
      "Integrated Dark Mode priorities to ensure a professional aesthetic."
    ]
  },
  {
    step: "05",
    title: "Quality Assurance & Deployment",
    icon: Rocket,
    details: [
      "Performed multi-device testing (Laptop, PC, Smartphone via Local IP).",
      "Resolved critical mobile interaction bugs (NavBar clickability, hydration).",
      "Validated all 50+ database entries against the clustering logic.",
      "Documented every process byte-by-byte for stakeholder review."
    ]
  },
  {
    step: "06",
    title: "Architectural Transparency",
    icon: ShieldCheck,
    details: [
      "Maintained 100% theme-interoperability through system-wide audit.",
      "Established the 'Full Project Disclosure' manifest for every file.",
      "Ensured Build Ledger reflects the latest development phase (Phase 7).",
      "Verified H2S Bootcamp and Google branding requirements."
    ]
  }
];

export default function DevelopmentSOP() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/docs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Documentation
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 shadow-lg shadow-emerald-500/20">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Development SOP</h1>
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs mt-1">Standard Operating Procedure & Engineering Ledger</p>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed max-w-2xl text-lg mb-12">
          This document outlines the strict engineering standards and sequential steps 
          followed to build the <strong className="text-foreground">Narractive Inteligence Analyzer</strong> from the ground up.
        </p>

        <div className="space-y-8">
          {sopSteps.map((item, i) => (
            <div key={i} className="relative group p-8 rounded-3xl border border-border bg-card/40 hover:bg-card transition-all">
              <div className="absolute -top-4 -right-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted border border-border text-lg font-black text-muted-foreground">
                {item.step}
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{item.title}</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {item.details.map((detail, di) => (
                  <div key={di} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Engineering Footer ────────────────────────────────────────── */}
        <div className="mt-16 p-8 rounded-3xl border border-border bg-muted/30 flex items-center justify-between gap-8 flex-col md:flex-row">
          <div className="flex items-center gap-4">
            <ShieldCheck className="h-10 w-10 text-emerald-500 opacity-50" />
            <div>
              <div className="text-sm font-bold text-foreground">SOP Version 1.0.4</div>
              <p className="text-xs text-muted-foreground italic">Standardized for Industrial-Grade News Analytics</p>
            </div>
          </div>
          <Link href="/docs/build-ledger" className="text-sm font-bold text-indigo-500 hover:underline">
            View Chronological Build Tree →
          </Link>
        </div>
      </div>
    </div>
  );
}
