"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Book, Cloud, Code, Cpu, Database, GraduationCap, LifeBuoy, Rocket, Search, Shield, Terminal } from "lucide-react";

const documentationHub = [
  {
    title: "Getting Started",
    description: "New to the platform? Learn the basics and set up your local environment in minutes.",
    href: "/docs/getting-started",
    icon: Rocket,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "User Guide",
    description: "Detailed instructions on how to use the analyzer, dashboard, and narrative tools.",
    href: "/docs/user-guide",
    icon: Book,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10"
  },
  {
    title: "Technical Deep-Dive",
    description: "Microsoft-grade documentation of our Tech Stack, Heuristics, and Architecture.",
    href: "/docs/technical-deep-dive",
    icon: Cpu,
    color: "text-violet-500",
    bg: "bg-violet-500/10"
  },
  {
    title: "Development SOP",
    description: "The Step-by-Step Standard Operating Procedure followed by the engineering team.",
    href: "/docs/development-sop",
    icon: Terminal,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Build Ledger",
    description: "A chronological tree of the project's evolution from Phase 1 to completion.",
    href: "/docs/build-ledger",
    icon: Code,
    color: "text-sky-500",
    bg: "bg-sky-500/10"
  },
  {
    title: "Project Disclosure",
    description: "Full architectural disclosure of the project's folder structure and module importance.",
    href: "/docs/project-architecture",
    icon: Shield,
    color: "text-rose-500",
    bg: "bg-rose-500/10"
  },
  {
    title: "Deployment Guide",
    description: "Step-by-step manual for deploying to GitHub and Google Cloud (Always Free Tier).",
    href: "/docs/deployment-guide",
    icon: Cloud,
    color: "text-sky-500",
    bg: "bg-sky-500/10"
  },
  {
    title: "Database Strategy",
    description: "Deep-dive into our local-first SQLite architecture and Cloud persistence layer.",
    href: "/docs/database-strategy",
    icon: Database,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Study Guide",
    description: "A non-technical conceptual guide for stakeholders and new learners.",
    href: "/docs/study-guide",
    icon: GraduationCap,
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  }
];

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = documentationHub.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30">
      {/* ── Header Section (Smooth & Premium) ─────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden border-b border-border">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] dark:opacity-[0.12] mix-blend-overlay pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-500 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Platform Documentation v1.0.4
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/40 bg-clip-text text-transparent">
            Learn & Explore.
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed mx-auto">
            Welcome to the central documentation hub for the <span className="text-foreground font-semibold">Narractive Inteligence Analyzer</span>. 
            From architectural deep-dives to simplified study guides, explore every bit and byte of our platform.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-20">
        {/* ── Search Mock ────────────────────────────────────────────── */}
        <div className="relative mb-20 animate-in fade-in zoom-in-95 duration-700">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search documentation, APIs, and tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-xl shadow-indigo-500/5"
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded border border-border bg-muted text-[10px] font-mono text-muted-foreground uppercase">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        {/* ── Documentation Grid ────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc, i) => (
              <Link 
                key={doc.title}
                href={doc.href} 
                className="group p-8 rounded-3xl border border-border bg-card hover:bg-muted/50 hover:border-indigo-500/30 transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-indigo-500/5"
              >
                <div className={`p-4 rounded-2xl ${doc.bg} ${doc.color} w-fit mb-6 group-hover:scale-110 transition-transform`}>
                  <doc.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-indigo-500 transition-colors">
                  {doc.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                  {doc.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                  Explore Module <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-border rounded-3xl bg-muted/20">
              <div className="text-muted-foreground font-bold mb-2">No results found for "{searchQuery}"</div>
              <p className="text-muted-foreground/60 text-sm">Try searching for keywords like "API", "Setup", or "Logic".</p>
            </div>
          )}
        </div>

        {/* ── Help & Support ────────────────────────────────────────────── */}
        <div className="mt-32 p-12 rounded-[2.5rem] bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 relative overflow-hidden text-center md:text-left">
          <div className="absolute -bottom-10 -right-10 opacity-5 dark:opacity-10 blur-2xl">
            <LifeBuoy className="h-64 w-64 text-indigo-500" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Can't find what you're looking for?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our support team and technical architects are available for deep-dive consultations. 
                Whether it's custom API integration or deployment troubleshooting, we're here to help.
              </p>
            </div>
            <div className="flex shrink-0 gap-4">
              <Link href="/contact" className="px-8 py-4 rounded-2xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20">
                Contact Support
              </Link>
              <Link href="/about" className="px-8 py-4 rounded-2xl bg-card border border-border text-foreground font-bold hover:bg-muted transition-all backdrop-blur-sm">
                About Platform
              </Link>
            </div>
          </div>
        </div>

        {/* ── Footer Link ────────────────────────────────────────────── */}
        <div className="mt-20 border-t border-border pt-10 text-center">
          <p className="text-muted-foreground/60 text-sm font-medium">
            © 2026 Narractive Inteligence Analyzer. All rights reserved. Professional Grade Documentation.
          </p>
        </div>
      </div>
    </div>
  );
}
