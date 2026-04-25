import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Globe,
  Lightbulb,
  Rocket,
  Shield,
  Target,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About – Narractive Inteligence Analyzer",
  description:
    "Learn about the Narractive Inteligence Analyzer project — its mission, agenda, and the team behind it.",
};

const agenda = [
  {
    phase: "Phase 1",
    title: "Data Ingestion & Parsing",
    status: "complete",
    desc: "Ingest 50+ news articles from diverse global sources, parse metadata, extract text content, and store in SQLite.",
  },
  {
    phase: "Phase 2",
    title: "AI Content Analysis",
    status: "complete",
    desc: "Use heuristic AI layer to generate topic labels, summaries, and source reliability ratings per article.",
  },
  {
    phase: "Phase 3",
    title: "Narrative Clustering Engine",
    status: "complete",
    desc: "Group semantically related articles into narrative clusters using topic overlap and content similarity.",
  },
  {
    phase: "Phase 4",
    title: "Credibility Scoring Model",
    status: "complete",
    desc: "Score each cluster 0–100 based on source diversity, publisher reputation, and corroboration depth.",
  },
  {
    phase: "Phase 5",
    title: "Legitimacy Analyzer Interface",
    status: "complete",
    desc: "Interactive UI for users to submit custom text and receive a full legitimacy report with transparent reasoning.",
  },
  {
    phase: "Phase 6",
    title: "Live RSS & Vector DB",
    status: "upcoming",
    desc: "Connect rss-parser to a live pipeline and migrate to Pinecone/pgvector for real-time semantic clustering.",
  },
  {
    phase: "Phase 7",
    title: "LLM Integration",
    status: "upcoming",
    desc: "Replace heuristic mock layer with OpenAI or Gemini SDK endpoints for dynamic content extraction at scale.",
  },
];

const values = [
  {
    icon: Shield,
    title: "Transparency First",
    desc: "Every credibility score comes with clear, human-readable reasoning. No black-box decisions.",
  },
  {
    icon: BookOpen,
    title: "Open Documentation",
    desc: "All algorithms, models, and data schemas are publicly documented for academic and public review.",
  },
  {
    icon: Globe,
    title: "Source Diversity",
    desc: "We actively counter echo chambers by aggregating from publishers across political and geographical spectrums.",
  },
  {
    icon: Lightbulb,
    title: "Education Over Gatekeeping",
    desc: "We surface signals and context — not verdicts. Readers retain the power to think for themselves.",
  },
];

const teamMembers = [
  { 
    name: "S. Ravat", 
    role: "Lead Developer", 
    desc: "BCA Final Year Student. Mastermind behind the engine, architecture, and premium user experience.",
    avatar: "SR"
  },
  { 
    name: "Mohit Bhimrajka", 
    role: "Mentor", 
    desc: "The visionary who introduced the team to Antigravity AI, steering the project's strategy and AI focus.",
    avatar: "MB"
  },
  { 
    name: "Pranav Walia", 
    role: "Core Lead", 
    desc: "The primary engine behind the project; led the event and defined the core project objectives.",
    avatar: "PW"
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Hero (Smooth & Technical) ─────────────────────────────────── */}
      <section className="relative py-32 px-6 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] pointer-events-none" />
        </div>

        <div className="mx-auto max-w-5xl text-center relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Users className="h-3.5 w-3.5" />
            Project Heritage & Mission
          </span>
          <h1 className="text-6xl md:text-[5.5rem] font-black mb-10 leading-[0.9] tracking-tighter text-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Clarity in a <br />
            <span className="bg-gradient-to-r from-indigo-500 via-violet-400 to-sky-400 bg-clip-text text-transparent">
              Noisy World.
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-150">
            The Narractive Inteligence Analyzer is a high-fidelity AI platform 
            engineered to help readers navigate fragmented media landscapes through 
            transparent signals and architectural honesty.
          </p>
        </div>
      </section>

      {/* ── Mission ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-indigo-400 text-sm font-semibold tracking-widest uppercase">Our Mission</span>
            <h2 className="text-3xl font-bold text-foreground mt-3 mb-5">
              AI as a Tool for Human Understanding
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We believe artificial intelligence should increase human understanding,
              not replace it. Narractive Inteligence Analyzer was built to prototype what &quot;responsible
              AI in journalism&quot; could look like: a system that explains itself, shows
              its sources, and admits the limits of its analysis.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This platform does not tell you what is true or false. It provides
              structured signals — source diversity, timeline consistency, credibility
              scores — so you can reason for yourself. That is the only kind of AI
              system we are interested in building.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors"
              >
                <v.icon className="h-6 w-6 text-indigo-500 dark:text-indigo-400 mb-3" />
                <div className="text-sm font-bold text-foreground mb-1">{v.title}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agenda / Roadmap ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-indigo-400 text-sm font-semibold tracking-widest uppercase">Project Agenda</span>
            <h2 className="text-3xl font-bold text-foreground mt-3">
              From MVP to Production Platform
            </h2>
          </div>
          <div className="relative">
            {/* timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border group-hover:bg-primary transition-colors" />
            <div className="space-y-6">
              {agenda.map((item, i) => (
                <div key={i} className="relative flex gap-6 pl-14 group">
                  {/* dot */}
                  <div
                    className={`absolute left-3 top-1 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 transition-all duration-300 ${item.status === "complete"
                        ? "border-emerald-500 bg-emerald-500/20 group-hover:scale-110"
                        : "border-border bg-muted group-hover:border-primary/50"
                      }`}
                  >
                    {item.status === "complete" && (
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    )}
                    {item.status === "upcoming" && (
                      <Rocket className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </div>
                  <div className="rounded-xl border border-border bg-card p-5 flex-1 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-wider">{item.phase}</span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-tight ${item.status === "complete"
                            ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground"
                          }`}
                      >
                        {item.status === "complete" ? "Complete" : "Upcoming"}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ────────────────────────────────────────────────────── */}
      <section id="team" className="py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">The Building Team</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="group rounded-2xl border border-border bg-card p-6 hover:border-primary transition-all duration-300">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-xl mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-primary text-sm font-bold uppercase tracking-wide mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-10 rounded-[2.5rem] bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-center backdrop-blur-sm shadow-sm">
            <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-4">Capstone Excellence</div>
            <h3 className="text-3xl font-black text-foreground mb-3">Narractive Inteligence Analyzer</h3>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
              Engineered exclusively for the <span className="text-foreground font-black">H2S Bootcamp</span> — Nashik Series, 
              supported by <span className="text-foreground font-black">Google for Developers</span>. 
              A showcase of AI-driven media literacy and architectural transparency.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-t border-border bg-muted/10">
        <div className="mx-auto max-w-2xl text-center">
          <Target className="h-10 w-10 text-indigo-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Explore the Platform</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Dive into the dashboard, run the analyzer, or browse our full technical documentation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3.5 text-base font-bold text-white hover:from-indigo-500 hover:to-violet-500 transition-all shadow-xl shadow-indigo-500/20"
            >
              <BookOpen className="h-4 w-4" />
              Read the Docs
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-3.5 text-base font-bold text-foreground hover:border-primary hover:bg-muted transition-all"
            >
              Contact the Team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
