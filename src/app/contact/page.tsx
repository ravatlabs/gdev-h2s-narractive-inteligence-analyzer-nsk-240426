"use client";

import {
  ArrowRight,
  GitBranch,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Share2,
} from "lucide-react";
import Link from "next/link";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@narrative-ai.in",
    href: "mailto:contact@narrative-ai.in",
    color: "from-indigo-600 to-violet-700",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 91XXX XXXXX",
    href: "#",
    color: "from-emerald-600 to-teal-700",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nashik, Maharashtra, India",
    href: "#",
    color: "from-rose-600 to-pink-700",
  },
  {
    icon: Globe,
    label: "Website",
    value: "narrative-ai.in",
    href: "https://narrative-ai.in",
    color: "from-sky-600 to-blue-700",
  },
];

const socials = [
  {
    name: "Twitter / X",
    handle: "@NarrativeAI",
    href: "https://twitter.com",
    icon: Share2,
    color: "hover:border-sky-500/40 hover:bg-sky-500/5",
  },
  {
    name: "GitHub",
    handle: "github.com/narrative-ai",
    href: "https://github.com",
    icon: GitBranch,
    color: "hover:border-slate-500/40 hover:bg-slate-500/5",
  },
  {
    name: "Discord Community",
    handle: "discord.gg/narrativeai",
    href: "https://discord.com",
    icon: MessageSquare,
    color: "hover:border-indigo-500/40 hover:bg-indigo-500/5",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center border-b border-border bg-gradient-to-br from-muted/60 to-transparent">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary mb-6">
          <Mail className="h-4 w-4" />
          Get in Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight uppercase">
          Connect with the Team
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg font-medium">
          Questions about Narractive Inteligence Analyzer? Reach out to us — we respond within 24 hours.
        </p>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* ── Contact Info ─────────────────────────────────────────── */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 underline decoration-primary/30 underline-offset-8">Contact Details</h2>
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 hover:border-primary transition-all group shadow-sm hover:shadow-md"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}
                  >
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground mb-0.5 uppercase tracking-wider">{item.label}</div>
                    <div className="text-foreground font-semibold group-hover:text-primary transition-colors">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Find Us Online</h2>
            <div className="space-y-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all group ${s.color}`}
                >
                  <s.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div>
                    <div className="text-sm font-bold text-foreground">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Location map-ish card */}
          <div className="rounded-xl border border-border bg-card p-6 relative overflow-hidden shadow-inner bg-muted/20">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.4) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <div className="relative">
              <MapPin className="h-6 w-6 text-indigo-500 mb-3" />
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-foreground font-bold">Sandip Foundation</h3>
                <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20 font-bold uppercase tracking-wider">Project Venue</span>
              </div>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                Trimbak Road, Mahiravani<br />
                Nashik, Maharashtra 422213<br />
                India
              </p>
            </div>
          </div>
        </div>

        {/* ── Contact Form ─────────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>
          <form
            id="contact-form"
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-bold text-muted-foreground mb-1.5 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Aditya Sharma"
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-bold text-muted-foreground mb-1.5 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="aditya.sharma@example.in"
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition shadow-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-sm font-bold text-muted-foreground mb-1.5 uppercase tracking-wide">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                placeholder="Collaboration / Feedback / Question"
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="contact-type" className="block text-sm font-bold text-muted-foreground mb-1.5 uppercase tracking-wide">
                Inquiry Type
              </label>
              <select
                id="contact-type"
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition appearance-none font-medium"
              >
                <option value="">Select an option…</option>
                <option value="collaboration">Collaboration</option>
                <option value="feedback">Feedback</option>
                <option value="bug">Bug Report</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-bold text-muted-foreground mb-1.5 uppercase tracking-wide">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={6}
                placeholder="How can we help you?"
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none shadow-sm"
              />
            </div>

            <button
              id="contact-submit"
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-violet-600 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 dark:hover:from-indigo-500 dark:hover:to-violet-500 transition-all duration-300"
            >
              Send Message
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-center mt-4">
              Note: Demonstration environment only.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
