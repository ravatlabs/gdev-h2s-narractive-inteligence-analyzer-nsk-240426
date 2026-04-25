"use client";

import Link from "next/link";
import { ArrowLeft, Cloud, Server, CreditCard, Clock, Terminal, CheckCircle2, AlertTriangle, Info } from "lucide-react";
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function DeploymentGuide() {
  const steps = [
    {
      title: "1. Artifact Export & GitHub Push",
      icon: GithubIcon,
      desc: "Moving from the Antigravity local environment to a central repository.",
      actions: [
        "Create a new repository on GitHub (public or private).",
        "Initialize git: `git init`",
        "Add all files: `git add .`",
        "Commit: `git commit -m 'Initial release: Narractive Alpha'`",
        "Push: `git remote add origin YOUR_URL` followed by `git push -u origin main`"
      ]
    },
    {
      title: "2. Google Cloud Setup (GCE)",
      icon: Cloud,
      desc: "Provisioning a persistent server to host the Next.js app and SQLite DB.",
      actions: [
        "Go to GCP Console (console.cloud.google.com).",
        "Create a new Project: 'narractive-production'.",
        "Navigate to Compute Engine > VM Instances.",
        "Enable the Compute Engine API (this may take a minute)."
      ]
    },
    {
      title: "3. Provisioning the 'Always Free' Instance",
      icon: Server,
      desc: "Deploying a cost-effective server that fits within the GCP free tier.",
      actions: [
        "Click 'Create Instance'.",
        "Region: Select `us-west1`, `us-central1`, or `us-east1` (Free Tier regions).",
        "Machine Type: Select `e2-micro` (2 vCPUs, 1GB RAM) — This is the 'Always Free' machine.",
        "Boot Disk: Public Image > Debian or Ubuntu.",
        "Firewall: Allow HTTP and HTTPS traffic."
      ]
    },
    {
      title: "4. Deployment & Execution",
      icon: Terminal,
      desc: "Installing dependencies and running the production server.",
      actions: [
        "SSH into your instance from the GCP dashboard.",
        "Install Node.js: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs`",
        "Clone repo: `git clone YOUR_GITHUB_URL`.",
        "Install and Build: `npm install && npm run build`.",
        "Run with PM2: `sudo npm install -g pm2 && pm2 start npm --name 'analyzer' -- start`."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-6 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <Link href="/docs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Documentation
        </Link>
 
        <header className="mb-16">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500 mb-6 border border-sky-500/20 shadow-lg shadow-sky-500/5">
            <Cloud className="h-6 w-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Cloud Deployment Guide.</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A comprehensive manual for moving the <span className="text-foreground font-bold">Narractive Inteligence Analyzer</span> 
             from Antigravity to GitHub, and finally to Google Cloud Platform.
          </p>
        </header>

        {/* ── Financial & Duration Overview ──────────────────────────────── */}
        <section className="grid sm:grid-cols-2 gap-6 mb-16">
          <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 shadow-sm relative overflow-hidden group">
            <CreditCard className="h-6 w-6 text-emerald-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Cost Analysis</h3>
            <p className="text-2xl font-black text-foreground mb-2">$0.00 <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest px-2">/ Month</span></p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By utilizing the GCP <span className="text-emerald-600 font-bold">e2-micro Always Free tier</span>, 
              hosting cost is effectively zero.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/20 shadow-sm relative overflow-hidden group">
            <Clock className="h-6 w-6 text-indigo-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Estimated Running Period</h3>
            <p className="text-2xl font-black text-foreground mb-2">Indefinite <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest px-2">/ Free Tier</span></p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              With your <span className="text-indigo-600 font-bold">$5.00 credit</span> as a buffer for overages, this 
              platform can run for <span className="text-indigo-600 font-bold">months/years</span> on the free tier.
            </p>
          </div>
        </section>

        {/* ── Steps ────────────────────────────────────────────────────── */}
        <div className="space-y-12 mb-20">
          {steps.map((step, i) => (
            <div key={i} className="relative pl-12">
              <div className="absolute left-0 top-0 h-full w-px bg-border ml-[23px]" />
              <div className="absolute left-0 top-0 h-12 w-12 rounded-2xl bg-card border border-border flex items-center justify-center shadow-md z-10">
                <step.icon className="h-5 w-5 text-indigo-500" />
              </div>
              
              <div className="pt-2">
                <h2 className="text-2xl font-bold text-foreground mb-2">{step.title}</h2>
                <p className="text-muted-foreground mb-6">{step.desc}</p>
                <div className="bg-muted/50 rounded-2xl p-6 space-y-4 border border-border">
                  {step.actions.map((action, ai) => (
                    <div key={ai} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      </div>
                      <p className="text-sm font-medium text-foreground leading-relaxed font-mono">{action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Persistence Alert ─────────────────────────────────────────── */}
        <div className="p-8 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/20 mb-16">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-10 w-10 text-amber-500 shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">Database Transparency Note</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">
                Since this project uses <span className="text-foreground font-black">SQLite</span>, your data is stored in the 
                `local.db` file. We recommend using a VM (Google Compute Engine) as described above to ensure your 
                narrative clusters and analysis history persist across server restarts. 
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-600">
                <Info className="h-3 w-3" />
                Persistent Disk is required for production scaling.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center border-t border-border pt-10">
          <p className="text-muted-foreground text-sm font-medium">
            Project Overview: Industrial-Grade News Intelligence Platform (Build v1.0.4)
          </p>
        </div>
      </div>
    </div>
  );
}
