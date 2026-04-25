"use client";

import Link from "next/link";
import { 
  ArrowLeft, FolderTree, FileCode, Database, Layout, ShieldCheck, 
  Cpu, FileJson, Layers, Settings, Terminal, Globe, User, 
  BookOpen, ChevronRight, Info
} from "lucide-react";

export default function ProjectArchitecture() {
  const manifest = [
    {
      category: "The Intelligence Core (Logic)",
      path: "src/lib",
      files: [
        { name: "ai.ts", type: "Logic Engine", prop: "Deterministic Heuristics", imp: "Highest: Handles the 'Truth Signal v1.4' scoring, narrative clustering, and mock LLM reasoning." },
        { name: "db.ts", type: "Persistence", prop: "better-sqlite3", imp: "Critical: Defines the SQL schema and handles all CRUD operations for Narratives and Articles." },
        { name: "seed.ts", type: "Data Pipeline", prop: "Automated Seeding", imp: "High: Injects the 50+ verified sample news articles into the database on initialization." },
        { name: "utils.ts", type: "Helper", prop: "clsx & tailwind-merge", imp: "Utility: Manages dynamic CSS class merging for the premium design system." }
      ]
    },
    {
      category: "Platform Interfaces (Routes)",
      path: "src/app",
      files: [
        { name: "/landing", type: "Page", prop: "Premium Hero", imp: "Commercial: The first point of contact. Hosts the high-fidelity particle field and brand story." },
        { name: "/analyze", type: "Feature", prop: "Real-time Lab", imp: "Operational: The primary user tool for legitimacy analysis and context matching." },
        { name: "/dashboard", type: "Dashboard", prop: "Cluster Grid", imp: "Strategic: Visualizes the global news landscape through categorized narrative clusters." },
        { name: "/about", type: "Information", prop: "Team & Mission", imp: "Branding: Documents the H2S Bootcamp journey and Google for Developers support." },
        { name: "/docs", type: "Knowledge Base", prop: "Technical Hub", imp: "Educational: Comprehensive repository of all operational and technical SOPs." },
        { name: "layout.tsx", type: "Framework", prop: "Root Layout", imp: "Foundational: Manages fonts, metadata, and the global ThemeProvider wrapper." },
        { name: "globals.css", type: "Styles", prop: "Tailwind v4", imp: "Aesthetic: Defines the semantic color tokens for Light/Dark mode consistency." }
      ]
    },
    {
      category: "Visual Architecture (Components)",
      path: "src/components",
      files: [
        { name: "navbar.tsx", type: "UI Module", prop: "Adaptive Navigation", imp: "Navigational: Contains the theme toggle and mobile-responsive menu logic." },
        { name: "footer.tsx", type: "UI Module", prop: "Global Footer", imp: "Attribution: Standardizes project branding and legal disclosures across all pages." },
        { name: "ui.tsx", type: "UI Library", prop: "Atomic Components", imp: "Consistent: Shared primitives like Cards, Badges, and Progress bars." },
        { name: "theme-provider.tsx", type: "Theme Engine", prop: "Next-Themes", imp: "Systemic: Enables the seamless transition between Light and Dark modes." }
      ]
    },
    {
      category: "Backend Services (API)",
      path: "src/app/api",
      files: [
        { name: "analyze/route.ts", type: "Endpoint", prop: "POST Request", imp: "Logic Bridge: Connects the analyzer frontend to the heuristic intelligence engine." },
        { name: "narratives/route.ts", type: "Endpoint", prop: "GET/POST Request", imp: "Data Bridge: Handles retrieval and creation of narrative clusters." }
      ]
    },
    {
      category: "Root Configuration",
      path: "./",
      files: [
        { name: "README.md", type: "Documentation", prop: "Project Manifest", imp: "Central: The 0-to-100% technical guide for developers and stakeholders." },
        { name: "package.json", type: "Dependency Management", prop: "NPM Manifest", imp: "Critical: Defines the project's build scripts and all external libraries." },
        { name: "tailwind.config.ts", type: "Styling Config", prop: "Design Tokens", imp: "High: Defines the custom typography, glass-morphism, and semantic theme tokens." },
        { name: "next.config.mjs", type: "App Config", prop: "Next.js Engine", imp: "Systemic: Configures the React framework behavior and optimized asset handling." }
      ]
    },
    {
      category: "Static Assets & Metadata",
      path: "public",
      files: [
        { name: "favicon.ico", type: "Identity", prop: "Brand Icon", imp: "Browser visibility and tab identity." },
        { name: "robots.txt", type: "SEO", prop: "Search Logic", imp: "Regulates search engine crawler access." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-6 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <Link href="/docs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Central Hub
        </Link>
 
        <header className="mb-20">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-indigo-500/10 text-indigo-500 mb-8 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
            <FolderTree className="h-7 w-7" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Full Project Disclosure.</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            A granular technical manifest of every file, function, and module within the 
            <span className="text-foreground font-black"> Narractive Inteligence Analyzer</span> repository.
          </p>
        </header>
 
        <div className="space-y-24">
          {manifest.map((section, si) => (
            <section key={section.category} className="relative">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-card border border-border shadow-sm">
                  <Layers className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{section.category}</h2>
                  <p className="text-sm font-mono text-indigo-500 tracking-wider">DIRECTORY: /{section.path}</p>
                </div>
              </div>
 
              <div className="grid gap-4">
                {section.files.map((file, fi) => (
                  <div key={file.name} className="group p-6 rounded-2xl border border-border bg-card hover:border-indigo-500/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5">
                    <div className="grid md:grid-cols-[1fr_1.5fr] gap-8">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <FileCode className="h-5 w-5 text-muted-foreground group-hover:text-indigo-500 transition-colors" />
                          <h3 className="text-lg font-black font-mono text-foreground">{file.name}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded font-black uppercase tracking-widest">{file.type}</span>
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded font-black uppercase tracking-widest">{file.prop}</span>
                        </div>
                      </div>
                      <div className="relative pl-6 md:border-l border-border italic text-muted-foreground leading-relaxed">
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/20 group-hover:bg-indigo-500 transition-colors md:hidden" />
                        <span className="text-xs font-black text-indigo-500 uppercase tracking-widest block mb-1 not-italic">Strategic Importance:</span>
                        {file.imp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
 
        <div className="mt-32 p-12 rounded-[3.5rem] bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
             <ShieldCheck className="h-48 w-48 text-indigo-500" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
               <Info className="h-6 w-6 text-indigo-500" />
               Transparency Commitment
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg italic">
              &quot;In an era of opacity, we choose full disclosure. Every line of code in this platform 
              is designed to be audited, understood, and improved by the community.&quot;
            </p>
            <div className="mt-8 flex gap-3 text-xs font-black text-indigo-500 uppercase tracking-[0.2em]">
              <span>S. Ravat</span>
              <span>·</span>
              <span>Narractive Inteligence Analyzer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
