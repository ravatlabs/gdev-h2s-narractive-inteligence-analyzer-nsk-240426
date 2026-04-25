import Link from "next/link";
import { ArrowLeft, Map, ArrowRight } from "lucide-react";

export default function FutureRoadmapPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/docs" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="h-4 w-4" /> Back to Documentation
        </Link>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
            <Map className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Future Roadmap</h1>
        </div>
        
        <p className="text-xl text-muted-foreground leading-relaxed mb-12">
          The Narractive Intelligence Analyzer MVP is just the foundation. Explore our architectural roadmap as we transition toward real-time LLM integration and vector databases.
        </p>

        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2 flex items-center gap-2">
              Phase 6: Live RSS & Vector DB
            </h2>
            <div className="bg-muted/30 p-6 rounded-2xl border border-border">
              <h3 className="font-semibold text-lg mb-3">Goal: Replace Static Data with Live Streaming</h3>
              <p className="text-muted-foreground mb-4">
                We will integrate <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">rss-parser</code> into a serverless cron job that ingests news articles every 5 minutes from 50+ global publishers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center text-sm font-medium">
                <div className="bg-card px-4 py-2 border border-border rounded-lg">Raw Text</div>
                <ArrowRight className="h-4 w-4 text-orange-500 rotate-90 sm:rotate-0" />
                <div className="bg-card px-4 py-2 border border-orange-500/30 rounded-lg text-orange-500">OpenAI Embeddings API</div>
                <ArrowRight className="h-4 w-4 text-orange-500 rotate-90 sm:rotate-0" />
                <div className="bg-card px-4 py-2 border border-border rounded-lg">Pinecone Vector DB</div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2 flex items-center gap-2">
              Phase 7: Enterprise LLM Integration
            </h2>
            <div className="bg-muted/30 p-6 rounded-2xl border border-border">
              <h3 className="font-semibold text-lg mb-3">Goal: Advanced Narrative Reasoning</h3>
              <p className="text-muted-foreground">
                The current heuristic credibility model (<code className="bg-muted px-1.5 py-0.5 rounded text-foreground">src/lib/ai.ts</code>) will be replaced with dynamic SDK calls to the Gemini 1.5 Pro or GPT-4o models. These models will perform advanced semantic clustering, detect subtle bias, and generate real-time "Legitimacy Explanations" based purely on the structured context provided by the Vector DB.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2 flex items-center gap-2">
              Phase 8: B2B API Monetization
            </h2>
            <div className="bg-muted/30 p-6 rounded-2xl border border-border">
              <p className="text-muted-foreground leading-relaxed">
                With a robust vector database and live LLM analysis, the platform's core engine will be exposed via a REST API. This will allow financial institutions and social media platforms to integrate our "Credibility Scoring Engine" directly into their own systems, establishing a clear B2B revenue stream.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
