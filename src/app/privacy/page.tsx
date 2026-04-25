import type { Metadata } from "next";
import { Lock, Eye, Fingerprint, DatabaseZap } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy – Narrative Intelligence Analyzer",
  description: "Data protection and privacy protocols for the Narrative Intelligence Analyzer platform.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-b border-border bg-gradient-to-br from-indigo-900/10 to-transparent">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-6 uppercase tracking-widest">
            Data Protection
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl">
            Established for the H2S Bootcamp series. We prioritize zero-data persistence 
            for non-authorized users.
          </p>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl space-y-12">
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <Lock className="h-6 w-6 text-emerald-500 mb-4" />
              <h3 className="font-bold text-foreground mb-2">Zero Tracking</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We do not sell, trade, or otherwise transfer your personally identifiable 
                information to outside parties for commercial marketing purposes.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <DatabaseZap className="h-6 w-6 text-amber-500 mb-4" />
              <h3 className="font-bold text-foreground mb-2">Academic Use Only</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Aggregated, non-identifiable usage data may be analyzed for academic 
                and research improvement within the Sandip Foundation environment.
              </p>
            </div>
          </div>

          <div className="space-y-8 prose prose-slate dark:prose-invert max-w-none">
            <section>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-emerald-500">01.</span> Information Collection
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information only when provided explicitly through the Login, 
                Signup, or Contact forms. This includes names, emails, and submitted 
                narrative queries.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-emerald-500">02.</span> Encryption & Security
              </h2>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex gap-4 items-start">
                <Fingerprint className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Our industrial-grade protocols ensure that all database interactions 
                  are secured using standard hashing and salting methods. No raw 
                  passwords are ever stored in the platform architecture.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-emerald-500">03.</span> AI Analysis Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Text submitted to the Legitimacy Analyzer is processed on-the-fly. 
                While for this MVP version, data may be logged for research refinement purposes, 
                it is never associated with a permanent user profile without consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-emerald-500">04.</span> Data Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                User accounts and associated data are retained for the duration of the 
                Capstone evaluation cycle. Users may request full data deletion by 
                contacting the development team via the Contact page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-emerald-500">05.</span> Research Transparency
              </h2>
              <div className="p-5 rounded-2xl bg-muted border border-border flex gap-4 items-center">
                <Eye className="h-6 w-6 text-indigo-500" />
                <p className="text-sm font-medium text-foreground">
                  As part of the H2S Bootcamp & Google for Developers series, certain 
                  anonymous feedback may be shared for educational insights and 
                  AI methodology improvement.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
