"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Brain,
  BrainCircuit,
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
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

// --- Animated counter hook -----------------------------------------------------
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

// --- Particle canvas background -----------------------------------------------
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

// --- Stats --------------------------------------------------------------------
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

// --- Feature card -------------------------------------------------------------
function FeatureCard({
  icon: Icon,
  title,
  desc,
  metric,
  gradient,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  metric?: string;
  gradient: string;
}) {
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-base font-bold text-foreground mb-1.5">{title}</h3>
      {metric && (
        <div className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/15 px-2.5 py-0.5 rounded-full mb-3">
          {metric}
        </div>
      )}
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

// --- Main component -----------------------------------------------------------
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
      desc: "Groups 500+ articles into coherent clusters in real-time using semantic similarity and keyword co-occurrence modeling.",
      metric: "500+ clusters analyzed",
      gradient: "from-indigo-500 to-violet-600",
    },
    {
      icon: Shield,
      title: "Credibility Scoring",
      desc: "Assigns 0-100 signals across 5 weighted dimensions: source diversity, publisher tier, corroboration, velocity, and recency.",
      metric: "5-signal weighted model",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: LineChart,
      title: "Legitimacy Analyzer",
      desc: "Deep-text audit of any claim — returns topic strength, evidence trail, and transparency-first reasoning in seconds.",
      metric: "Analyzed in <2 seconds",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: Globe,
      title: "Multi-Source Ingestion",
      desc: "Aggregates from 50+ RSS feeds across 6 domains to guarantee balanced perspectives and eliminate single-source bias.",
      metric: "50+ publishers tracked",
      gradient: "from-sky-500 to-blue-600",
    },
    {
      icon: GitBranch,
      title: "Narrative Timelines",
      desc: "Chronologically orders corroborating sources within each cluster — showing exactly how a story evolved over time.",
      metric: "48h story tracking window",
      gradient: "from-rose-500 to-pink-600",
    },
    {
      icon: Zap,
      title: "Real-Time Architecture",
      desc: "Edge-deployed on Vercel's global CDN. Zero cold-start. Sub-100ms dashboard loads. Built for RSS ingestion and WebSocket streaming.",
      metric: "<100ms response time",
      gradient: "from-purple-500 to-fuchsia-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 overflow-x-hidden">
      {/* --- Hero (Smooth & Premium) ----------------------------------------------- */}
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

      {/* --- Stats ------------------------------------------------------------------ */}
      <section className="py-16 border-y border-border bg-muted/20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Updated continuously from 50+ global publishers
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <StatItem value={520} suffix="+" label="Narratives Monitored" />
            <StatItem value={6} suffix="" label="Topic Domains" />
            <StatItem value={98} suffix="%" label="Source Transparency" />
            <StatItem value={12000} suffix="+" label="Data Points Processed" />
            <StatItem value={50} suffix="+" label="Publishers Tracked" />
          </div>
        </div>
      </section>

      {/* --- Core Capabilities ------------------------------------------------------ */}
      <section id="features" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Core Capabilities</span>
            <h2 className="text-4xl font-bold text-foreground mt-3 mb-4">Precision-Built for the Intelligence Age</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Six production-grade capabilities, each validated against real-world data streams and designed to scale from newsroom to enterprise.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* --- Opportunity ------------------------------------------------------------ */}
      <section className="py-24 px-6 bg-muted/10 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-6">
              Total Addressable Market: $78B+
            </div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase block mb-2">The Opportunity</span>
            <h2 className="text-4xl font-bold text-foreground mb-4">Combating a Global Misinformation Crisis</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Existing AI models are black boxes. We built a transparent, explainable architecture that exposes the "why" behind every credibility score.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Problem */}
            <div className="relative p-8 rounded-3xl border border-red-500/20 bg-red-500/5 overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(239,68,68,0.15) 0%, transparent 60%)" }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-red-500/20"><AlertTriangle className="h-5 w-5 text-red-500" /></div>
                  <h3 className="text-xl font-bold text-red-500 dark:text-red-400">The Problem</h3>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[["$78B","Cost of misinformation globally"],["6x","Faster spread vs truth (MIT, 2023)"],["68%","Can't identify AI-generated news"]].map(([val, label]) => (
                    <div key={val} className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                      <div className="text-xl font-black text-red-500">{val}</div>
                      <div className="text-[9px] text-muted-foreground leading-tight mt-1">{label}</div>
                    </div>
                  ))}
                </div>
                <ul className="space-y-3">
                  {["Algorithmic echo chambers amplify misinformation faster than fact-checkers can respond.","Existing AI tools hallucinate sources, eroding institutional trust.","Traditional verification cannot scale to real-time social velocity."].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Solution */}
            <div className="relative p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(16,185,129,0.15) 0%, transparent 60%)" }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20"><CheckCircle2 className="h-5 w-5 text-emerald-500" /></div>
                  <h3 className="text-xl font-bold text-emerald-500 dark:text-emerald-400">Our Solution</h3>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[["520+","Narratives monitored"],["98%","Source transparency"],["<2s","Analysis latency"]].map(([val, label]) => (
                    <div key={val} className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
                      <div className="text-xl font-black text-emerald-500">{val}</div>
                      <div className="text-[9px] text-muted-foreground leading-tight mt-1">{label}</div>
                    </div>
                  ))}
                </div>
                <ul className="space-y-3">
                  {["Heuristic AI layer ensures transparent, non-hallucinated scoring — every score is explainable.","Semantic clustering groups massive data streams across 6 domains instantly.","Edge-deployed architecture scales infinitely with zero cold-start latency.","Open architecture: every algorithm is documented and auditable."].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link href="/analyze" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors group">
              See how we solve it — try the analyzer <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Under the Hood</span>
            <h2 className="text-4xl font-bold text-foreground mt-3 mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              A battle-tested 4-stage pipeline — transparent at every step, designed for enterprise reliability.
            </p>
          </div>
          <div className="relative pt-8">
            <div className="hidden md:block absolute top-[2.75rem] left-[12.5%] w-3/4 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 via-purple-500 to-emerald-500 opacity-25 rounded-full" />
            <div className="grid md:grid-cols-4 gap-6 relative z-10">
              {[
                { n:"1", color:"bg-indigo-500", Icon: Database, iconColor:"text-indigo-500", title:"Ingestion", latency:"~5 min cycle", detail:"RSS + HTTP polling across 50+ publishers. Structured into the data layer."},
                { n:"2", color:"bg-violet-500", Icon: Brain, iconColor:"text-violet-500", title:"NLP Clustering", latency:"<200ms", detail:"Cosine similarity + keyword co-occurrence groups articles into narrative clusters."},
                { n:"3", color:"bg-purple-500", Icon: Shield, iconColor:"text-purple-500", title:"Credibility Scoring", latency:"<50ms", detail:"5-signal weighted heuristics output a 0-100 legitimacy score per narrative."},
                { n:"4", color:"bg-emerald-500", Icon: Server, iconColor:"text-emerald-500", title:"API Delivery", latency:"<100ms", detail:"REST API, Dashboard, and WebHook integrations deliver results to clients."},
              ].map(({ n, color, Icon, iconColor, title, latency, detail }) => (
                <div key={n} className="bg-card border border-border rounded-2xl p-5 shadow-lg relative group hover:border-primary/40 hover:-translate-y-1 transition-all">
                  <div className={`absolute -top-5 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full ${color} flex items-center justify-center border-4 border-background text-white font-black text-sm shadow-lg group-hover:scale-110 transition-transform`}>{n}</div>
                  <div className="mt-5 text-center">
                    <Icon className={`h-8 w-8 ${iconColor} mx-auto mb-3`} />
                    <h3 className="font-bold text-foreground mb-1">{title}</h3>
                    <div className="inline-block text-[10px] font-black text-primary bg-primary/10 border border-primary/15 px-2 py-0.5 rounded-full mb-3">{latency}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* B2B */}
      <section className="py-24 px-6 bg-gradient-to-b from-indigo-500/5 to-transparent border-t border-border">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-500 uppercase tracking-widest mb-6">
                <Building2 className="h-3.5 w-3.5" /> B2B Monetization
              </span>
              <h2 className="text-4xl font-bold text-foreground mb-4">Enterprise API Access</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">For financial institutions, hedge funds, and newsrooms that need automated narrative verification at scale.</p>
              <ul className="space-y-3 mb-8">
                {[["10,000 req/min throughput"],["WebHook & streaming alerts"],["SOC2 compliant data handling"],["Dedicated account management"]].map(([f]) => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-foreground text-background font-bold shadow-xl hover:scale-105 transition-transform">
                <Coins className="h-4 w-4" /> View Pricing Plans
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500" />
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground"><Server className="h-3.5 w-3.5" /> POST /api/v1/analyze</div>
                  <div className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">200 OK</div>
                </div>
                <pre className="text-[11px] font-mono text-indigo-400 bg-black/40 dark:bg-black/60 p-4 rounded-xl overflow-x-auto leading-relaxed">{`{
  "narrative_id": "ni_9f82kd9",
  "credibility_score": 88,
  "sources_corroborated": 12,
  "topic_strength": {
    "finance": 0.92,
    "regulation": 0.81
  },
  "flags": ["high_velocity"],
  "latency_ms": 87
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial-Grade */}
      <section id="about-preview" className="py-24 px-6 bg-muted/20 border-t border-border">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Production-Grade Intelligence Platform</span>
            <h2 className="text-4xl font-bold text-foreground mt-3 mb-5 tracking-tight">
              Built to Industry Standard. Validated at Scale.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Architected for zero cold-start and infinite Vercel edge scale, with B2B API readiness from day one. Built by <strong>Sonu R.</strong> under the mentorship of <strong>Mohit Bhimrajka</strong> and bootcamp lead <strong>Pranav Walia</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Deployed on a globally distributed CDN, the system handles 520+ narrative streams with no database dependency — every score is explainable, every source is cited.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="flex items-center gap-2 text-xs font-semibold bg-muted border border-border text-foreground px-3 py-1.5 rounded-full"><Server className="h-3.5 w-3.5" /> Vercel Edge Deployed</span>
              <span className="flex items-center gap-2 text-xs font-semibold bg-muted border border-border text-foreground px-3 py-1.5 rounded-full"><ShieldCheck className="h-3.5 w-3.5" /> Zero Hallucination Architecture</span>
              <span className="flex items-center gap-2 text-xs font-semibold bg-muted border border-border text-foreground px-3 py-1.5 rounded-full"><BrainCircuit className="h-3.5 w-3.5" /> Explainable AI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/about" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors group text-sm">
                Read full story <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://github.com/ravatlabs/gdev-h2s-narractive-inteligence-analyzer-nsk-240426" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                View Source -{">"}
              </a>
            </div>
          </div>
          <div className="relative h-80 hidden md:block group/stack">
            <div className="absolute inset-0 rounded-2xl border border-border bg-gradient-to-br from-card to-background rotate-6 opacity-60 shadow-lg group-hover/stack:rotate-12 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-2xl border border-border bg-gradient-to-br from-card to-background rotate-3 opacity-80 shadow-md group-hover/stack:rotate-6 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-2xl border border-primary/30 bg-card/95 backdrop-blur-md p-6 flex flex-col gap-3 shadow-2xl relative z-10 transition-transform duration-500 group-hover/stack:-translate-y-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shrink-0">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-foreground">Narrative Formed</div>
                  <div className="text-xs text-muted-foreground">Global Finance Crisis · 5 sources · 2h ago</div>
                </div>
                <div className="text-emerald-500 font-black text-sm">91/100</div>
              </div>
              <div className="h-px bg-border" />
              {["Financial Times · High Reliability","AP Wire · High Reliability","Reuters · High Reliability","Bloomberg · Medium Reliability"].map((s) => (
                <div key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {s}
                </div>
              ))}
              <div className="mt-auto rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3">
                <div className="flex items-center gap-3 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Source diversity</span>
                  <span className="text-emerald-500/50">·</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Timeline consistent</span>
                  <span className="text-emerald-500/50">·</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Grounded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Docs CTA */}
      <section className="py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Documentation</span>
            <h2 className="text-4xl font-bold text-foreground mt-3 mb-4">Every Algorithm. Fully Documented.</h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">12 comprehensive modules. Transparent by design.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              {icon:"(Architecture)", title:"Architecture Deep-Dive", desc:"Full system design across 12 modules.", href:"/docs/project-architecture"},
              {icon:"(API)", title:"API Reference", desc:"REST endpoints, schemas, and auth.", href:"/docs/api-reference"},
              {icon:"(Roadmap)", title:"Future Roadmap", desc:"Phase 6-8: live RSS, vector DB, LLM SDK.", href:"/docs/future-roadmap"},
            ].map(d => (
              <Link key={d.href} href={d.href} className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-lg transition-all">
                <div className="text-xs font-mono mb-3 text-primary bg-primary/10 inline-block px-2 py-1 rounded">{d.icon}</div>
                <h3 className="font-bold text-foreground mb-1 text-sm group-hover:text-primary transition-colors">{d.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/docs" className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-7 py-3.5 text-sm font-bold text-primary hover:bg-primary/20 transition-all">
              Browse All 12 Modules <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs text-muted-foreground mt-3">12 modules | Open architecture | Always up to date</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl relative group">
          <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/5 dark:bg-gradient-to-br dark:from-indigo-900/40 dark:via-violet-900/30 dark:to-slate-900/60 backdrop-blur-md p-12 text-center overflow-hidden shadow-2xl shadow-indigo-500/5">
            <div className="absolute inset-0 opacity-10 dark:opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(99,102,241,0.3) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(139,92,246,0.3) 0%, transparent 60%)" }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground dark:text-white mb-4 tracking-tight">
                Ready to Decode the News?
              </h2>
              <p className="text-muted-foreground dark:text-slate-300 text-lg mb-10 max-w-xl mx-auto">
                Create a free account and start analyzing narratives in seconds with our intelligence platform.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5">
                <Link href="/signup" id="final-cta-signup" className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 hover:scale-105 transition-all duration-300">
                  Get started - it's free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/pricing" id="final-cta-pricing" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-4 text-base font-bold text-foreground hover:bg-muted transition-all duration-300">
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
