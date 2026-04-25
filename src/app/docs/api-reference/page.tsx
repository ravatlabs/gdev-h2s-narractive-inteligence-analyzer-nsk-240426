import Link from "next/link";
import { ArrowLeft, Braces, Terminal } from "lucide-react";

export default function ApiReferencePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-pink-500/30">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/docs" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="h-4 w-4" /> Back to Documentation
        </Link>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-500">
            <Braces className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">API Reference</h1>
        </div>
        
        <p className="text-xl text-muted-foreground leading-relaxed mb-12">
          Complete documentation for the Narractive Intelligence REST endpoints. Learn how to programmatically analyze text and access narrative clusters.
        </p>

        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2">POST /api/analyze</h2>
            <p className="text-muted-foreground">
              Submit custom text for legitimacy analysis. The endpoint returns a detailed report including a credibility score, verified context evidence, and an AI-generated explanation.
            </p>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2 font-mono text-sm">
                <Terminal className="h-4 w-4 text-muted-foreground" /> Request Body (JSON)
              </div>
              <pre className="p-4 text-sm text-pink-400 overflow-x-auto">
{`{
  "text": "Your claim or news excerpt here..."
}`}
              </pre>
            </div>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2 font-mono text-sm">
                <Terminal className="h-4 w-4 text-muted-foreground" /> Response (200 OK)
              </div>
              <pre className="p-4 text-sm text-emerald-400 overflow-x-auto">
{`{
  "legitimacyScore": 85,
  "verdict": "Likely True",
  "verdictLevel": "LEGITIMATE",
  "explanation": "This aligns with known verified events...",
  "topic": "Technology",
  "topicStrength": "High",
  "contextEvidence": [
    {
      "headline": "Example Headline",
      "source": "Reuters",
      "relevance": 92
    }
  ]
}`}
              </pre>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2">Rate Limits & Authentication</h2>
            <p className="text-muted-foreground leading-relaxed">
              Currently, the API is available without authentication for demo purposes. In a production environment, all endpoints will require a valid <code className="text-pink-500 bg-pink-500/10 px-1.5 py-0.5 rounded">Bearer</code> token in the <code className="text-pink-500 bg-pink-500/10 px-1.5 py-0.5 rounded">Authorization</code> header.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
