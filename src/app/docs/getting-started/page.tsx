"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, Copy, Terminal } from "lucide-react";

export default function GettingStarted() {
  const requirements = [
    { label: "Node.js", version: "18.17.0 or later" },
    { label: "NPM", version: "9.6.0 or later" },
    { label: "Disk Space", version: "~500MB (for assets & SQLite database)" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/docs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Central Hub
        </Link>
 
        {/* ── Header ─────────────────────────────────────────────────── */}
        <header className="mb-20">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Getting Started.</h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Follow this guide to get the <span className="text-foreground font-semibold">Narractive Inteligence Analyzer</span> running 
            on your local development environment in under 5 minutes.
          </p>
        </header>
 
        {/* ── Requirements ───────────────────────────────────────────── */}
        <div className="p-8 rounded-3xl border border-border bg-card mb-12 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Prerequisites</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {requirements.map(req => (
              <div key={req.label}>
                <div className="text-[10px] text-muted-foreground/60 uppercase font-black tracking-[0.2em] mb-1">{req.label}</div>
                <div className="text-indigo-500 font-mono font-bold">{req.version}</div>
              </div>
            ))}
          </div>
        </div>
 
        {/* ── Installation Steps ─────────────────────────────────────── */}
        <div className="space-y-16">
          {/* Step 1 */}
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border font-black text-indigo-500 shadow-sm">01</span>
              <h3 className="text-2xl font-bold">Clone the Repository</h3>
            </div>
            <div className="bg-black dark:bg-slate-900 rounded-2xl border border-white/10 p-5 flex items-center justify-between font-mono text-sm text-slate-400 shadow-xl">
              <code>git clone [repository-url]</code>
              <Copy className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
 
          {/* Step 2 */}
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border font-black text-indigo-500 shadow-sm">02</span>
              <h3 className="text-2xl font-bold">Install Dependencies</h3>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">Navigate to the project directory and run the installation command.</p>
            <div className="bg-black dark:bg-slate-900 rounded-2xl border border-white/10 p-5 flex items-center justify-between font-mono text-sm text-slate-400 shadow-xl">
              <code>npm install</code>
              <Copy className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
 
          {/* Step 3 */}
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border font-black text-indigo-500 shadow-sm">03</span>
              <h3 className="text-2xl font-bold">Launch the Laboratory</h3>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              The start command will automatically initialize the <strong>SQLite database</strong> and seed 
              the initial 50+ news articles.
            </p>
            <div className="bg-black dark:bg-slate-900 rounded-2xl border border-white/10 p-5 flex items-center justify-between font-mono text-sm text-slate-400 shadow-xl">
              <code>npm run dev</code>
              <Copy className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
 
        {/* ── Success Card ───────────────────────────────────────────── */}
        <div className="mt-20 p-10 rounded-3xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="h-16 w-16 rounded-2xl bg-indigo-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
            <Terminal className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Installation Successful?</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Open <Link href="http://localhost:3000" className="text-indigo-500 hover:underline font-bold">http://localhost:3000</Link> in your browser 
              to verify the deployment. You are now ready to explore the dashboard.
            </p>
          </div>
          <Link href="/docs/user-guide" className="ml-auto px-6 py-3 rounded-xl bg-indigo-500 text-white font-bold flex items-center gap-2 text-sm shrink-0 hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20">
            Next: User Guide <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
