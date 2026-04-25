"use client";

import { useState, useMemo } from "react";
import { mockNarratives, getCategories } from "@/lib/mockData";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  TrendingUp, AlertTriangle, CheckCircle, Clock,
  ExternalLink, Search, Flame, BarChart3, Globe,
  Cpu, Leaf, HeartPulse, FlaskConical, Landmark, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Helpers ──────────────────────────────────────────────────────────
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
function ScoreIcon({ score }: { score: number }) {
  if (score >= 75) return <CheckCircle className="h-4 w-4 text-emerald-500" />;
  if (score >= 45) return <TrendingUp className="h-4 w-4 text-amber-500" />;
  return <AlertTriangle className="h-4 w-4 text-red-500" />;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Technology: Cpu,
  Politics: Landmark,
  Climate: Leaf,
  Economy: BarChart3,
  Health: HeartPulse,
  Science: FlaskConical,
};
const CATEGORY_COLORS: Record<string, string> = {
  Technology: "from-indigo-500 to-violet-600",
  Politics: "from-rose-500 to-pink-600",
  Climate: "from-emerald-500 to-teal-600",
  Economy: "from-amber-500 to-orange-600",
  Health: "from-sky-500 to-blue-600",
  Science: "from-purple-500 to-fuchsia-600",
};
const CATEGORY_ACCENT: Record<string, string> = {
  Technology: "border-indigo-500/30 bg-indigo-500/5",
  Politics: "border-rose-500/30 bg-rose-500/5",
  Climate: "border-emerald-500/30 bg-emerald-500/5",
  Economy: "border-amber-500/30 bg-amber-500/5",
  Health: "border-sky-500/30 bg-sky-500/5",
  Science: "border-purple-500/30 bg-purple-500/5",
};

// ── Narrative Card ─────────────────────────────────────────────────
function NarrativeCard({ narrative }: { narrative: (typeof mockNarratives)[0] }) {
  return (
    <Link href={`/narrative/${narrative.id}`} className="block h-full">
      <div className={`group relative h-full rounded-2xl border ${narrative.isTrending ? "border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.07)]" : "border-border"} bg-card hover:border-indigo-500/50 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/5`}>

        {/* Score accent bar at top */}
        <div className={`h-0.5 w-full ${scoreBarColor(narrative.credibility_score)}`} style={{ width: `${narrative.credibility_score}%` }} />

        {narrative.isTrending && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full z-10">
            <Flame className="h-2.5 w-2.5" /> Trending
          </div>
        )}

        <div className="p-5 flex flex-col flex-1">
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-500 border border-indigo-500/15 px-2.5 py-0.5 rounded-full">
              {narrative.category}
            </span>
          </div>

          <h3 className="font-semibold text-sm text-foreground leading-snug mb-4 group-hover:text-indigo-500 transition-colors line-clamp-3 flex-1">
            {narrative.summary}
          </h3>

          <div className="mt-auto pt-3 border-t border-border space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-medium">Credibility</span>
              <div className="flex items-center gap-1.5">
                <ScoreIcon score={narrative.credibility_score} />
                <span className={`font-black text-base ${scoreColor(narrative.credibility_score)}`}>
                  {narrative.credibility_score}<span className="text-[10px] opacity-60 font-semibold">/100</span>
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className={`h-full rounded-full transition-all ${scoreBarColor(narrative.credibility_score)}`} style={{ width: `${narrative.credibility_score}%` }} />
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground font-medium">
              <span className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                {narrative.articles.length} sources
              </span>
              <span>{formatDistanceToNow(new Date(narrative.created_at), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Overview Tab ────────────────────────────────────────────────────
function OverviewTab({ onCategorySelect }: { onCategorySelect: (cat: string) => void }) {
  const categories = getCategories();
  const trendingNarratives = mockNarratives.filter((n) => n.isTrending).slice(0, 6);
  const recentNarratives = mockNarratives.slice(0, 6);
  const avgScore = Math.round(mockNarratives.reduce((s, n) => s + n.credibility_score, 0) / mockNarratives.length);
  const highCount = mockNarratives.filter((n) => n.credibility_score >= 75).length;

  return (
    <div className="space-y-10">
      {/* Live Feed Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Streams", value: mockNarratives.length, icon: Globe, color: "text-indigo-500", bg: "bg-indigo-500/10" },
          { label: "Avg Credibility", value: `${avgScore}/100`, icon: BarChart3, color: "text-violet-500", bg: "bg-violet-500/10" },
          { label: "High Confidence", value: highCount, icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Trending Now", value: trendingNarratives.length, icon: Flame, color: "text-amber-500", bg: "bg-amber-500/10" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className={`inline-flex p-2.5 rounded-xl ${stat.bg} mb-3`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground font-medium mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Category Quick-Access Grid */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
          Browse by Category
          <span className="text-xs font-medium text-muted-foreground">{categories.length} domains</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category] || Globe;
            const count = mockNarratives.filter((n) => n.category === category).length;
            const trending = mockNarratives.filter((n) => n.category === category && n.isTrending).length;
            return (
              <button
                key={category}
                onClick={() => onCategorySelect(category)}
                className={`group text-left rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg ${CATEGORY_ACCENT[category] || "border-border bg-card"}`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${CATEGORY_COLORS[category] || "from-indigo-500 to-violet-600"} mb-4 shadow-md group-hover:scale-105 transition-transform`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="font-bold text-foreground mb-1">{category}</div>
                <div className="text-xs text-muted-foreground">{count} narratives · {trending} trending</div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-indigo-500 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="h-3 w-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Trending Now */}
      {trendingNarratives.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
            <Flame className="h-5 w-5 text-amber-500" /> Trending Now
            <span className="text-xs font-medium text-muted-foreground">{trendingNarratives.length} active</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trendingNarratives.map((n) => <NarrativeCard key={n.id} narrative={n} />)}
          </div>
        </div>
      )}

      {/* Recently Added */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
          <Clock className="h-5 w-5 text-indigo-500" /> Recently Added
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentNarratives.map((n) => <NarrativeCard key={n.id} narrative={n} />)}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────
export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Overview");
  const categories = ["Overview", ...getCategories()];

  const filteredNarratives = useMemo(() => {
    if (activeCategory === "Overview") return [];
    return mockNarratives.filter((n) => {
      const matchesSearch =
        n.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = n.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-8">

        {/* ── Hero Header ─────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 md:p-10 text-white shadow-2xl">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-100/90 text-xs font-black uppercase tracking-widest mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Enterprise Intelligence Feed · Live
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Narrative Dashboard</h1>
              <p className="text-indigo-100/80 max-w-xl text-sm leading-relaxed">
                {mockNarratives.length}+ narrative streams monitored across 6 domains. Credibility signals updated continuously.
              </p>
            </div>
            <div className="shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 flex gap-6 text-center">
              <div>
                <div className="text-3xl font-black">{mockNarratives.length}</div>
                <div className="text-[10px] uppercase font-bold text-indigo-200 mt-0.5">Streams</div>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <div className="text-3xl font-black">{mockNarratives.filter(n => n.isTrending).length}</div>
                <div className="text-[10px] uppercase font-bold text-indigo-200 mt-0.5">Trending</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Navigation + Search ──────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => { setActiveCategory(category); setSearchQuery(""); }}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${activeCategory === category
                  ? "bg-foreground text-background shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search (only when in a category view) */}
          {activeCategory !== "Overview" && (
            <div className="relative w-full md:max-w-xs shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search narratives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-full py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-sm"
              />
            </div>
          )}
        </div>

        {/* ── Content Area ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {activeCategory === "Overview" ? (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <OverviewTab onCategorySelect={(cat) => setActiveCategory(cat)} />
            </motion.div>
          ) : (
            <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <span className="font-bold text-foreground">{activeCategory}</span>
                <span>·</span>
                <span>{filteredNarratives.length} narratives</span>
              </div>

              {filteredNarratives.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredNarratives.slice(0, 40).map((narrative) => (
                    <NarrativeCard key={narrative.id} narrative={narrative} />
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center border border-dashed border-border rounded-3xl bg-muted/10">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">No narratives found</h3>
                  <p className="text-muted-foreground text-sm">Try adjusting your search query.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
