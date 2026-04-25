"use client";

import { useState } from "react";
import { Badge } from "@/components/ui";
import { mockNarratives, getCategories } from "@/lib/mockData";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { TrendingUp, AlertTriangle, CheckCircle, Clock, ExternalLink, Search, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ScoreIcon({ score }: { score: number }) {
  if (score >= 75) return <CheckCircle className="h-5 w-5 text-emerald-500" />;
  if (score >= 45) return <TrendingUp className="h-5 w-5 text-amber-500" />;
  return <AlertTriangle className="h-5 w-5 text-red-500" />;
}

function scoreColor(score: number) {
  if (score >= 75) return "text-emerald-500";
  if (score >= 45) return "text-amber-500";
  return "text-red-500";
}

function scoreBarColor(score: number) {
  if (score >= 75) return "bg-emerald-500";
  if (score >= 45) return "bg-amber-500";
  return "bg-red-500";
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  const categories = ["All", ...getCategories()];

  // Filter logic
  const filteredNarratives = mockNarratives.filter(n => {
    const matchesSearch = 
      n.summary.toLowerCase().includes(searchQuery.toLowerCase()) || 
      n.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = activeCategory === "All" || n.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const avgScore = mockNarratives.length
    ? Math.round(mockNarratives.reduce((sum, n) => sum + n.credibility_score, 0) / mockNarratives.length)
    : 0;
  const highCount = mockNarratives.filter(n => n.credibility_score >= 75).length;
  const lowCount = mockNarratives.filter(n => n.credibility_score < 45).length;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 min-h-screen">
      {/* ── Hero Header ────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-100/90 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Enterprise Intelligence Feed
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Narrative Dashboard</h1>
            <p className="opacity-90 max-w-2xl text-lg font-medium leading-relaxed">
              Monitoring 500+ live narrative streams. Signals reflect source diversity and global consensus — built for scale.
            </p>
          </div>
          <div className="shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex gap-6">
            <div>
              <div className="text-3xl font-black">{mockNarratives.length}</div>
              <div className="text-xs uppercase font-bold text-indigo-200">Active Streams</div>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <div className="text-3xl font-black">{avgScore}</div>
              <div className="text-xs uppercase font-bold text-indigo-200">Avg Credibility</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Controls (Search & Categories) ──────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl py-4 border-b border-border -mx-4 px-4 sm:mx-0 sm:px-0 sm:border-none sm:bg-transparent sm:backdrop-blur-none sm:py-0 sm:static">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeCategory === category 
                    ? "bg-foreground text-background shadow-md" 
                    : "bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:max-w-xs shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search narratives..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* ── Narrative Grid (Animated) ───────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-500" /> 
            {activeCategory === "All" ? "Global Feed" : `${activeCategory} Feed`}
            <span className="text-sm font-medium text-muted-foreground ml-2">({filteredNarratives.length} results)</span>
          </h2>
        </div>

        <motion.div 
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence>
            {filteredNarratives.slice(0, 40).map((narrative) => ( // limit to 40 for DOM performance in demo
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={narrative.id}
              >
                <Link href={`/narrative/${narrative.id}`} className="block h-full">
                  <div className={`group relative h-full rounded-2xl border ${narrative.isTrending ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-border'} bg-card hover:border-indigo-500/50 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10`}>
                    
                    {/* Score Bar Accent */}
                    <div className={`h-1 w-full ${scoreBarColor(narrative.credibility_score)}`} style={{ width: `${narrative.credibility_score}%` }} />
                    
                    {narrative.isTrending && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full z-10">
                        <Flame className="h-3 w-3" /> Trending
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-1 relative z-0">
                      {/* Topics/Category */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 border-transparent text-xs font-semibold">
                          {narrative.category}
                        </Badge>
                      </div>

                      {/* Summary (Title) */}
                      <h3 className="font-bold text-foreground text-lg leading-snug mb-6 group-hover:text-indigo-500 transition-colors line-clamp-3">
                        {narrative.summary}
                      </h3>

                      {/* Footer Metrics */}
                      <div className="mt-auto pt-4 border-t border-border space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground font-medium">Credibility Signal</span>
                          <span className={`font-black text-lg ${scoreColor(narrative.credibility_score)}`}>{narrative.credibility_score}<span className="text-xs opacity-60">/100</span></span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${scoreBarColor(narrative.credibility_score)}`} style={{ width: `${narrative.credibility_score}%` }} />
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground font-medium pt-1">
                          <span className="flex items-center gap-1.5">
                            <ExternalLink className="h-3.5 w-3.5" />
                            {narrative.articles.length} sources
                          </span>
                          <span>{formatDistanceToNow(new Date(narrative.created_at), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredNarratives.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="py-24 text-center text-muted-foreground border border-dashed border-border rounded-3xl bg-muted/10"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-foreground mb-2">No narratives found</h3>
            <p>Try adjusting your search query or category filter.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
