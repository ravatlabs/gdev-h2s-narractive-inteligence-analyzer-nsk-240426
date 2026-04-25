import type { Metadata } from "next";
import { ShieldAlert, FileText, Scale, Book } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service – Narrative Intelligence Analyzer",
  description: "Official legal terms governing the use of the Narrative Intelligence Analyzer platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-b border-border bg-muted/20">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-6 uppercase tracking-widest">
            Legal Framework
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl">
            Last Updated: April 2026. These terms govern all access to and use of the 
            Narrative Intelligence Analyzer platform.
          </p>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl space-y-12">
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <Scale className="h-6 w-6 text-indigo-500 mb-4" />
              <h3 className="font-bold text-foreground mb-2">Strict Governance</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This platform is governed by strict industrial-grade protocols to prevent 
                misuse, automated scraping, or commercial exploitation without 
                explicit authorization.
              </p>
            </div>
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 shadow-sm">
              <Book className="h-6 w-6 text-indigo-500 mb-4" />
              <h3 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Academic Freedom</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Exceptions are granted for legitimate research and educational purposes, 
                provided that the source (Narrative AI) is appropriately credited.
              </p>
            </div>
          </div>

          <div className="space-y-8 prose prose-slate dark:prose-invert max-w-none">
            <section>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-indigo-500">01.</span> Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing this platform, users agree to be bound by these Terms of Service 
                and all applicable laws and regulations in the jurisdiction of Nashik, India. 
                If you do not agree with any of these terms, you are prohibited from using or 
                accessing this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-indigo-500">02.</span> Use License (Educational Exception)
              </h2>
              <ul className="list-disc pl-5 space-y-3 text-muted-foreground">
                <li>
                  <strong>Industrial Use:</strong> Permission is granted only for private review. 
                  This is a license, not a transfer of title, and under this license you may not 
                  modify or copy the materials for commercial purposes.
                </li>
                <li>
                  <strong>Educational & Research Clause:</strong> Explicit permission is granted 
                  for academic research, educational demonstrations, and non-commercial study. 
                  Researchers may use the platform&apos;s output for publication provided 
                  acknowledgment is given to the H2S Bootcamp project.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-indigo-500">03.</span> AI Output Disclaimer
              </h2>
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 flex gap-4 items-start">
                <ShieldAlert className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Narrative AI provides heuristic-based analysis for informational purposes. 
                  The platform does not provide legal, financial, or direct truth-claims. 
                  Users are solely responsible for verifying analysis results before use.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-indigo-500">04.</span> Prohibited Activities
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Scraping, automated querying, deep-linking, or using the platform to train 
                competitive machine learning models without express written consent from the 
                Lead Developers is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-indigo-500">05.</span> Jurisdiction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Any claim relating to Narrative Intelligence Analyzer shall be governed by the 
                laws of Maharashtra, India, without regard to its conflict of law provisions.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
