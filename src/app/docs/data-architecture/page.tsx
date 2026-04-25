import Link from "next/link";
import { ArrowLeft, Network } from "lucide-react";

export default function DataArchitecturePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/docs" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="h-4 w-4" /> Back to Documentation
        </Link>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500">
            <Network className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Static Data Architecture</h1>
        </div>
        
        <p className="text-xl text-muted-foreground leading-relaxed mb-12">
          How we transitioned from a persistent local SQLite database to a highly scalable, zero-latency static generation model for Vercel edge deployment.
        </p>

        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2">The Problem with Serverless SQLite</h2>
            <p className="text-muted-foreground leading-relaxed">
              Initially, the Narractive Intelligence Analyzer used a local <code className="bg-muted px-1.5 py-0.5 rounded">narrative_intelligence.db</code> SQLite file. While perfect for local development, serverless platforms like Vercel and Google Cloud Run treat local file systems as ephemeral. Every time the serverless function spun down, the database changes were lost, leading to unpredictable dashboard states.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2">The Static Generation Solution</h2>
            <p className="text-muted-foreground leading-relaxed">
              To guarantee 100% uptime, zero latency, and infinite scalability without relying on external managed databases (like Supabase or PlanetScale) during the MVP phase, we migrated to a procedural static data architecture.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li><strong>Procedural Generation:</strong> We utilize a robust <code className="bg-muted px-1.5 py-0.5 rounded">mockData.ts</code> script that dynamically generates over 500+ realistic, categorized narrative items at build time.</li>
              <li><strong>Edge Delivery:</strong> Because the data is static and bundled with the React client components, filtering and searching (using Framer Motion for UI) happens entirely on the user's device, resulting in zero network latency.</li>
              <li><strong>Categorization:</strong> Data is split across domains like Technology, Politics, and Climate, mimicking real-world AI clustering.</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2">Why This Matters for Investors</h2>
            <p className="text-muted-foreground leading-relaxed">
              This architecture proves that the UI and UX are completely decoupled from the data layer. When we transition to a live streaming vector database in Phase 7, the frontend requires zero modifications to handle the scale.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
