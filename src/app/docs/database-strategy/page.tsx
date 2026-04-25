"use client";

import Link from "next/link";
import { ArrowLeft, Database, HardDrive, Zap, Cloud, ShieldCheck, Cpu, Code2, AlertCircle } from "lucide-react";

export default function DatabaseStrategy() {
  const features = [
    {
      title: "The Engine: better-sqlite3",
      icon: Database,
      desc: "We chose SQLite for its zero-configuration, local-first performance. It is a C-based library that offers ultra-low latency.",
      benefit: "Zero-latency database queries directly on the server filesystem."
    },
    {
      title: "Schema Design",
      icon: Code2,
      desc: "Our schema is optimized for narrative clustering, linking global 'Narratives' to individual 'Articles' with relational integrity.",
      benefit: "Strict foreign key constraints ensure clustering accuracy."
    },
    {
      title: "Cloud Persistence",
      icon: HardDrive,
      desc: "On Google Cloud, we use a Persistent Disk attached to a VM, ensuring your SQLite file is never lost during server restarts.",
      benefit: "Reliable data storage within the GCP Always Free tier."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-6 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <Link href="/docs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Knowledge Base
        </Link>
 
        <header className="mb-16">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 mb-6 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
            <Database className="h-6 w-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Database Strategy.</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            A deep-dive into the local-first persistence layer and the strategic reasoning 
            behind our <span className="text-foreground font-bold">Heuristic SQLite Ingestion</span>.
          </p>
        </header>

        <div className="grid gap-8 mb-20">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-3xl border border-border bg-card hover:border-emerald-500/30 transition-all shadow-sm">
              <div className="flex items-start gap-6">
                <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <f.icon className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{f.title}</h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{f.desc}</p>
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-500 uppercase tracking-widest">
                    <Zap className="h-3 w-3" />
                    Key Benefit: {f.benefit}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Implementation Logic ──────────────────────────────────────── */}
        <section className="mb-20 space-y-8">
          <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
             <Cpu className="h-8 w-8 text-indigo-500" />
             The logic Layer.
          </h2>
          <div className="rounded-3xl border border-border bg-muted/30 p-8 space-y-6">
             <div className="space-y-2">
                <h3 className="font-bold text-foreground">1. Seeding Engine (src/lib/seed.ts)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                   Upon the first server initialization, the platform detects an empty database and automatically 
                   injects 50+ hand-curated news articles across 5 distinct narrative clusters.
                </p>
             </div>
             <div className="space-y-2">
                <h3 className="font-bold text-foreground">2. Connection Pooling (src/lib/db.ts)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                   We utilize a singleton connection pattern to avoid database file locks, ensuring that 
                   multiple concurrent analysis requests are handled gracefully.
                </p>
             </div>
          </div>
        </section>

        {/* ── Cloud Free Tier Optimization ─────────────────────────────── */}
        <div className="p-10 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/20 relative overflow-hidden group">
          <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
             <Cloud className="h-64 w-64 text-indigo-500" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tighter">Running on Cloud for $0</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              To maintain the SQLite database for free on Google Cloud, you must deploy on a 
              <span className="text-indigo-500 font-bold"> Compute Engine e2-micro instance</span> with a 
              standard persistent disk. This falls within the GCP &quot;Always Free&quot; tier.
            </p>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
               <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
               <p className="text-xs font-bold text-amber-700 dark:text-amber-500 tracking-tight">
                  Avoid Cloud Run for SQLite as it uses an ephemeral filesystem which will delete your data on every restart.
               </p>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-border text-center">
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">
             Database Manifest v1.0.4 · Narractive Inteligence Analyzer
          </p>
        </div>
      </div>
    </div>
  );
}
