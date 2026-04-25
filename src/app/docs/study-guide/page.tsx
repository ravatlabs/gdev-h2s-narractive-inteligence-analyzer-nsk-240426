"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Brain, CheckCircle2, Globe, HelpCircle, Lightbulb, MessageSquare, Target, Zap } from "lucide-react";

export default function StudyGuide() {
  const guideSections = [
    {
      title: "What is this project?",
      icon: Lightbulb,
      content: "Imagine you're reading a story and wonder if it's true, or what other people are saying about it. The Narractive Inteligence Analyzer is a digital tools that groups thousands of spread-out news articles into clear, understandable 'Narratives' so you can see the whole picture at once."
    },
    {
      title: "What is a 'Narrative'?",
      icon: MessageSquare,
      content: "Instead of just looking at one headline, our system finds all the articles that are talking about the same event. We call this group of related stories a 'Narrative'. It helps you see how different outlets cover the same news differently."
    },
    {
      title: "How does the 'AI' think?",
      icon: Brain,
      content: "The AI acts like a super-fast speed reader. It looks at the words, the source (who wrote it), and whether other reliable people are saying the same thing. It doesn't tell you 'this is the absolute truth,' but it gives you a 'Legitimacy Score' based on how much the evidence lines up."
    },
    {
      title: "Understanding the 'Legitimacy Score'",
      icon: Target,
      content: "A score of 90 isn't just a random number. It means the story is coming from many different reliable sources who all agree on the core facts. A lower score might mean only one person is saying it, or the details are very fuzzy."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/docs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Help Center
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 shadow-lg shadow-amber-500/20">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Project Study Guide</h1>
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs mt-1">For everyone who wants to understand our mission</p>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed max-w-2xl text-lg mb-12">
          You don't need to be a software engineer to understand the Narractive Inteligence Analyzer. 
          This guide explains our platform in simple terms.
        </p>

        <div className="grid gap-6">
          {guideSections.map((section, i) => (
            <div key={i} className="group p-8 rounded-3xl border border-border bg-card/50 hover:border-amber-500/30 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 group-hover:scale-110 transition-transform">
                  <section.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* ── Key Concepts ────────────────────────────────────────────── */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold px-2">Key Concepts to Remember</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { term: "Clustering", def: "Putting similar stories in a single box so they're easier to find." },
              { term: "Heuristics", def: "A fancy word for 'smart rules' the AI uses to guess if something is legit." },
              { term: "Source Diversity", def: "Checking if stories are coming from different places, not just one person." },
              { term: "Transparency", def: "Showing you exactly 'why' we gave a certain score." },
            ].map(item => (
              <div key={item.term} className="p-5 rounded-2xl border border-border bg-muted/30">
                <div className="font-bold text-amber-600 mb-1">{item.term}</div>
                <div className="text-sm text-muted-foreground">{item.def}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Call to Action ────────────────────────────────────────────── */}
        <div className="mt-16 text-center py-12 rounded-3xl border border-dashed border-border">
          <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
            Our mission is to make the news clear for everyone. Check out our about page to learn more.
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 text-amber-600 font-bold hover:underline">
            Visit the About Page <Zap className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
