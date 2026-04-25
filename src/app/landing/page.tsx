"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Brain,
  Building2,
  CheckCircle2,
  ChevronDown,
  Coins,
  Database,
  GitBranch,
  Globe,
  LineChart,
  Lock,
  Search,
  Server,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let startTimestamp: number | null = null;
    let animFrame: number;

    const step = (now: number) => {
      if (!startTimestamp) startTimestamp = now;
      const progress = Math.min((now - startTimestamp) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      }
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [target, duration, mounted]);

  return value;
}

// ─── Particle canvas background ──────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129,140,248,${p.alpha})`;
        ctx.fill();
      });

      // draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(129,140,248,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
    />
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const count = useCountUp(value);
  return (
    <div className="text-center group">
      <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent transition-transform group-hover:scale-105 duration-300">
        {count}{suffix}
      </div>
      <div className="text-sm font-semibold text-muted-foreground mt-2 uppercase tracking-wide">{label}</div>
    </div>
  );
}

// ─── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({
  icon: Icon,
  title,
  desc,
  gradient,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  gradient: string;
}) {
  return (
    <div className="group relative rounded-2xl border border-border bg-card backdrop-blur-sm p-6 hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground/80 leading-relaxed">{desc}</p>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI Narrative Clustering",
      desc: "Automatically groups related news articles into cohesive narrative clusters using semantic similarity and topic modeling.",
      gradient: "from-indigo-500 to-violet-600",
    },
    {
      icon: Shield,
      title: "Credibility Scoring",
      desc: "Assigns 0–100 credibility signals based on source diversity, publisher reliability, and corroborating evidence.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: LineChart,
      title: "Legitimacy Analyzer",
      desc: "Deep-dive into any text input and receive topic strength, source corroboration, and transparency-first reasoning.",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: Globe,
      title: "Multi-Source Ingestion",
      desc: "Aggregates news from diverse global sources to ensure balanced perspectives and reduce single-source bias.",
      gradient: "from-sky-500 to-blue-600",
    },
    {
      icon: GitBranch,
      title: "Narrative Timelines",
      desc: "Track how a story evolves over time by viewing chronologically ordered source articles within each cluster.",
      gradient: "from-rose-500 to-pink-600",
    },
    {
      icon: Zap,
      title: "Real-Time Ready",
      desc: "Architecture built for live RSS ingestion, WebSocket streaming, and dynamic narrative formation without page reloads.",
      gradient: "from-purple-500 to-fuchsia-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 overflow-x-hidden">
      {/* ── Hero (Smooth & Premium) ────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[100px] [animation-delay:1s]" />
          <ParticleCanvas />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          {/* Elite Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-10 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Narrative Platform Alpha v1.0.4
          </div>

          {/* High-Fidelity Typography */}
          <h1 className="text-6xl md:text-[7.5rem] font-black leading-[0.85] mb-10 tracking-tighter text-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Understand. <br />
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
              Every Story.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-xl text-muted-foreground leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-150">
            The first industrial-grade AI platform for decoding global news narratives. 
            Clusters raw data, scores credibility, and provides transparent signals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
            <Link
              href="/analyze"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-indigo-500 text-white font-black hover:scale-105 transition-all shadow-[0_20px_50px_rgba(79,70,229,0.15)] flex items-center justify-center gap-2 group"
            >
              Try Analyzer
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/docs"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-card border border-border text-foreground font-bold hover:bg-muted transition-all backdrop-blur-2xl flex items-center justify-center gap-2 group"
            >
              View Documentation
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex justify-center animate-bounce">
            <ChevronDown className="h-6 w-6 text-slate-500" />
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value={50} suffix="+" label="News Articles Analyzed" />
            <StatItem value={12} suffix="" label="Narrative Clusters" />
            <StatItem value={98} suffix="%" label="Source Transparency" />
            <StatItem value={8} suffix="" label="Topic Categories" />
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Core Capabilities</span>
            <h2 className="text-4xl font-bold text-foreground mt-3 mb-4">Built for Clarity in Chaos</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every feature is designed around one principle: give readers the tools to
              think critically about information.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem vs Solution (Investor Vision) ─────────────────────── */}
      <section className="py-24 px-6 bg-muted/10 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">The Opportunity</span>
            <h2 className="text-4xl font-bold text-foreground mt-3 mb-4">Combating a $78B Misinformation Crisis</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Current AI models are black boxes. We built a transparent architecture that exposes the "why" behind every credibility score.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl border border-red-500/20 bg-red-500/5 dark:bg-red-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-red-500/20">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-red-500 dark:text-red-400">The Problem</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Algorithmic echo chambers amplify fake news faster than truth.",
                  "Traditional fact-checking cannot scale to meet real-time social velocity.",
                  "Existing AI tools hallucinate sources, damaging institutional trust."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-emerald-500/20">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-500 dark:text-emerald-400">Our Solution</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Heuristic AI layer ensures transparent, non-hallucinated scoring.",
                  "Semantic clustering groups massive data streams instantly.",
                  "Zero-latency static architecture scales infinitely on edge networks."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Pipeline Visual ───────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Under the Hood</span>
            <h2 className="text-4xl font-bold text-foreground mt-3 mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A robust 3-step pipeline designed for maximum transparency and speed.
            </p>
          </div>
          
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 -translate-y-1/2 rounded-full opacity-20" />
            
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-xl relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center border-4 border-background text-white font-bold shadow-lg group-hover:scale-110 transition-transform">1</div>
                <div className="mt-6 text-center">
                  <Database className="h-10 w-10 text-indigo-500 mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-foreground mb-2">Ingestion</h3>
                  <p className="text-sm text-muted-foreground">Aggregates high-velocity RSS feeds from 50+ global publishers into our secure data layer.</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-xl relative group mt-12 md:mt-0">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-violet-500 flex items-center justify-center border-4 border-background text-white font-bold shadow-lg group-hover:scale-110 transition-transform">2</div>
                <div className="mt-6 text-center">
                  <Brain className="h-10 w-10 text-violet-500 mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-foreground mb-2">Semantic Clustering</h3>
                  <p className="text-sm text-muted-foreground">Natural Language Processing (NLP) identifies topic overlap to build narrative timelines.</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-xl relative group mt-12 md:mt-0">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center border-4 border-background text-white font-bold shadow-lg group-hover:scale-110 transition-transform">3</div>
                <div className="mt-6 text-center">
                  <Shield className="h-10 w-10 text-emerald-500 mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-foreground mb-2">Credibility Output</h3>
                  <p className="text-sm text-muted-foreground">Heuristics calculate 0-100 legitimacy scores based on source diversity and corroboration.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Enterprise API Mock ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-indigo-500/5 to-transparent border-t border-border">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-500 uppercase tracking-widest mb-6">
                <Building2 className="h-3.5 w-3.5" /> B2B Monetization
              </span>
              <h2 className="text-4xl font-bold text-foreground mb-6">Enterprise API Access</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Designed for financial institutions, hedge funds, and newsrooms to automatically verify market rumors against global data streams.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm font-semibold text-foreground"><CheckCircle2 className="h-5 w-5 text-indigo-500" /> 10,000 requests per minute</li>
                <li className="flex items-center gap-3 text-sm font-semibold text-foreground"><CheckCircle2 className="h-5 w-5 text-indigo-500" /> WebHook alert integration</li>
                <li className="flex items-center gap-3 text-sm font-semibold text-foreground"><CheckCircle2 className="h-5 w-5 text-indigo-500" /> SOC2 Compliant Data Privacy</li>
              </ul>
              <button className="px-8 py-3.5 rounded-xl bg-foreground text-background font-bold shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                <Coins className="h-4 w-4" /> View Enterprise Pricing
              </button>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                    <Server className="h-4 w-4" /> POST /api/v1/analyze
                  </div>
                  <div className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">200 OK</div>
                </div>
                <pre className="text-[11px] font-mono text-indigo-400 bg-black/40 p-4 rounded-xl overflow-x-auto">
{`{
  "narrative_id": "ni_9f82kd9",
  "credibility_score": 88,
  "sources_corroborated": 12,
  "topic_strength": {
    "finance": 0.92,
    "regulation": 0.81
  },
  "flags": ["high_velocity"]
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Preview ────────────────────────────────────────────────── */}
      <section id="about-preview" className="py-24 px-6 bg-muted/20">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Capstone Project</span>
            <h2 className="text-4xl font-bold text-foreground mt-3 mb-5 uppercase tracking-tighter">
              Narractive Inteligence Analyzer
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Built by <strong>Sonu R.</strong> (BCA Final Year Student) with the guidance of 
              <strong> Mohit Bhimrajka</strong>, who introduced the team to Antigravity AI, and 
              bootcamp lead <strong>Pranav Walia</strong>, this project represents the edge of media transparency.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We developed this platform as the Narractive Inteligence Analyzer to demonstrate how heuristic 
              models can empower readers by surfacing source corroboration and credibility 
              signals in real-time.
            </p>
            <Link
              href="/about"
              id="about-read-more"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors group"
            >
              Read our full agenda
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Decorative card stack */}
          <div className="relative h-80 hidden md:block group/stack">
            <div className="absolute inset-0 rounded-2xl border border-border bg-gradient-to-br from-card to-background rotate-6 opacity-60 shadow-lg group-hover/stack:rotate-12 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-2xl border border-border bg-gradient-to-br from-card to-background rotate-3 opacity-80 shadow-md group-hover/stack:rotate-6 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-2xl border border-primary/30 bg-card/95 backdrop-blur-md p-6 flex flex-col gap-4 shadow-2xl relative z-10 transition-transform duration-500 group-hover/stack:-translate-y-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shrink-0 shadow-md">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Narrative Formed</div>
                  <div className="text-xs text-muted-foreground">Climate Policy Crisis · 4 sources</div>
                </div>
                <div className="ml-auto text-emerald-500 font-bold text-sm">82/100</div>
              </div>
              <div className="h-px bg-border" />
              {["Reuters · High Reliability", "BBC News · High Reliability", "Bloomberg · Medium Reliability"].map((s) => (
                <div key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {s}
                </div>
              ))}
              <div className="mt-auto rounded-lg bg-primary/10 border border-primary/20 p-3">
                <div className="text-xs text-primary">
                  ✓ Source diversity confirmed &nbsp;·&nbsp; ✓ Timeline consistent
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Docs CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Documentation</span>
          <h2 className="text-4xl font-bold text-foreground mt-3 mb-5">
            Every Algorithm. Fully Documented.
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            From the credibility scoring model to the narrative clustering logic, our
            technical docs explain every decision. Transparency is the product.
          </p>
          <Link
            href="/docs"
            id="docs-cta"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-7 py-3.5 text-base font-semibold text-primary hover:bg-primary/20 transition-all duration-200"
          >
            Browse Documentation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl relative group">
          <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/5 dark:bg-gradient-to-br dark:from-indigo-900/40 dark:via-violet-900/30 dark:to-slate-900/60 backdrop-blur-md p-12 text-center overflow-hidden shadow-2xl shadow-indigo-500/5">
            <div className="absolute inset-0 opacity-10 dark:opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(99,102,241,0.3) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(139,92,246,0.3) 0%, transparent 60%)" }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground dark:text-white mb-4 tracking-tight">
                Ready to Decode the News?
              </h2>
              <p className="text-muted-foreground dark:text-slate-300 text-lg mb-10 max-w-xl mx-auto">
                Create a free account and start analyzing narratives in seconds with our elite intelligence platform.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5">
                <Link
                  href="/signup"
                  id="final-cta-signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 hover:scale-105 transition-all duration-300"
                >
                  Get started — it&apos;s free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  id="final-cta-login"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-4 text-base font-bold text-foreground hover:bg-muted transition-all duration-300"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-12 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Link href="/landing" className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-lg text-foreground tracking-tight">Narractive Inteligence Analyzer</span>
              </Link>
              <p className="text-xs text-muted-foreground text-center md:text-left max-w-xs leading-relaxed">
                Empowering readers through transparent AI analysis by 
                <strong> Narractive Inteligence Analyzer</strong>.
              </p>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground">
              {[
                { href: "/about", label: "About" },
                { href: "/docs", label: "Docs" },
                { href: "/contact", label: "Contact" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/analyze", label: "Analyzer" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© 2026 Narractive Inteligence Analyzer. Free for Educational Use Only.</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
              Narractive Inteligence Analyzer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
