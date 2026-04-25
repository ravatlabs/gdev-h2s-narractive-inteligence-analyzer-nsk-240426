/**
 * MOCKED DATABASE LAYER - ZERO DEPENDENCY
 * 
 * Replaces better-sqlite3 to bypass Windows Application Control policies.
 * Data is seeded in-memory.
 */

export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  source: string;
  url: string;
  timestamp: string;
  topic: string;
  narrativeId?: string | null;
}

export interface NarrativeRow {
  id: string;
  title: string;
  score: number;
  confidence: string;
  explanation: string;
  createdAt: string;
  tags: string; // JSON string
}

// ── In-Memory Storage ────────────────────────────────────────────────────────
const _NARRATIVES: NarrativeRow[] = [];
const _ARTICLES: Article[] = [];

// ── Mock DB API ─────────────────────────────────────────────────────────────
export const db = {
  prepare: (query: string) => {
    const q = query.toLowerCase();
    return {
      all: (...args: any[]) => {
        if (q.includes('from narratives')) {
          return [..._NARRATIVES].sort((a, b) => b.score - a.score);
        }
        if (q.includes('from articles where narrativeid = ?')) {
          return _ARTICLES.filter(a => a.narrativeId === args[0]);
        }
        if (q.includes('from articles')) {
          return [..._ARTICLES];
        }
        return [];
      },
      get: (...args: any[]) => {
        if (q.includes('select count(*)')) return { c: _NARRATIVES.length };
        if (q.includes('from narratives where id = ?')) {
          return _NARRATIVES.find(n => n.id === args[0]?.toString()) || null;
        }
        return null;
      },
      run: (...args: any[]) => {
        if (q.includes('insert into narratives')) {
          const [id, title, score, confidence, explanation, tags] = args;
          _NARRATIVES.push({ id, title, score, confidence, explanation, tags, createdAt: new Date().toISOString() });
        }
        if (q.includes('insert into articles')) {
          const [id, title, content, summary, source, url, timestamp, topic, narrativeId] = args;
          _ARTICLES.push({ id, title, content, summary, source, url, timestamp, topic, narrativeId });
        }
        return { changes: 1 };
      }
    };
  },
  exec: () => {}
};

export function initDB() {}

// ── SEEDING DATA (100+ Samples) ────────────────────────────────────────────────
const topics = ["Technology", "Geopolitics", "Finance", "AI", "Climate", "Health", "Space", "Policy"];
const sources = [
  { n: "Reuters", u: "https://reuters.com" },
  { n: "Bloomberg", u: "https://bloomberg.com" },
  { n: "BBC News", u: "https://bbc.com" },
  { n: "Wall Street Journal", u: "https://wsj.com" },
  { n: "Financial Times", u: "https://ft.com" },
  { n: "AP News", u: "https://apnews.com" },
  { n: "Nikkei Asia", u: "https://nikkei.com" },
];

const narrativeTitles = [
  "Supply Chain Shift to SEA", "Quantum Cryptography Standards", "Arctic Mineral Rights Dispute",
  "LLM Energy Consumption Crisis", "New EV Battery Solid-State Era", "Mars Colony Habitat Testing",
  "Digital Rupee Cross-Border Pilots", "Global Fusion Energy Milestone", "Privacy Law Overhauls in Asia",
  "Submarine Cable Security Pact", "Semiconductor Talent Shortage", "Central Bank Digital Currencies",
  "Rare Earth Extraction Sovereignty", "6G Telecom Standardization", "AI Copyright Supreme Court Case",
  "Blue Hydrogen Infrastructure Growth", "Space Debris Cleanup Initiative", "Modular Nuclear Reactor Pilots",
  "Metaverse Workplace Adoption", "Gene Editing Ethics Framework", "Autonomous Drone Delivery Net",
  "Grid Resiliency vs Climate Events", "Vertical Farming Commercial Scale", "Deep Sea Mining Moratorium",
  "Hydrogen Aircraft Early Tests", "Carbon Capture Tax Credit Surge", "Cybersecurity Mesh Architecture",
  "Web3 Identity Verification", "Smart City Traffic AI", "Digital Twin Healthcare",
  "Remote Work Tax Reciprocity", "Microsatellite Mega-Constellations", "Bio-degradable Plastic Mandates",
  "Universal Basic Income Pilots", "Personalized Medicine AI", "Sustainable Aviation Fuel",
  "Direct Air Capture Stations", "Next-Gen Lunar Gateway", "Ocean Plastic Recovery Tech",
  "Soil Health Monitoring Sensors", "Waste-to-Energy City Plants", "Water Desalination Innovation",
  "Wildfire Prediction AI", "Flood Defense Smart Barriers", "Renewable Energy Certificates",
  "Green Finance Taxonomy", "Sustainable Supply Chain Logs", "Ethical AI Certification",
  "Open Source Security Standard", "Quantum Computing Early Advantage", "Low-Earth Orbit Logistics",
  "Space-Based Solar Power", "Biodiversity Credits Market", "Regenerative Agriculture Ops",
  "Climate Migration Policy", "Urban Heat Island Mitigation", "Circular Economy Logistics",
  "Product Life Extension Law", "Right to Repair Electronics", "Data Sovereignty Clouds",
  "Algorithmic Transparency Laws", "Digital Platform Regulation", "Online Safety Act Compliance",
  "Streaming Content Consolidation", "Indie Creator Economy Growth", "VR Education Curriculum",
  "Skill-Based Hiring AI", "Personalized Career Coaching", "Micro-Credential Standards",
  "Blockchain Land Registry", "Electronic Healthcare Records", "Tele-health Quality Standards",
  "Personal Data Trusts", "Community Mesh Networks", "Public Wi-fi Security",
  "Critical Mineral Diplomacy", "Strategic Petroleum Reserve", "Energy Export Controls",
  "Grain Security Corridors", "Fishery Management Tech", "Forest Restoration Tracking",
  "Plastic Waste Export Ban", "Green Hydrogen Steel", "Zero-Emission Shipping Lanes",
  "Electric Trucking Corridor", "Battery Recycling Hubs", "Metal Recovery from E-waste",
  "Carbon Accounting SaaS", "ESG Reporting Frameworks", "Responsible Mineral Sourcing",
  "Transparency in AI Training", "Copyright Protection for Artists", "Digital Content Provenance",
  "Deepfake Detection Scaling", "Online Identity Verification", "Cyber Warfare Deterrence",
  "Bilateral Cybersecurity Pacts"
];

// Generate 100 Narratives
narrativeTitles.forEach((title, i) => {
  const topic = topics[i % topics.length];
  const score = 40 + Math.floor(Math.random() * 55); // 40-95
  const confidence = score > 80 ? "High" : score > 60 ? "Medium" : "Low";
  const id = `narr-${i}`;
  
  _NARRATIVES.push({
    id,
    title,
    score,
    confidence,
    explanation: `Multi-source analysis shows ${confidence.toLowerCase()} consensus on ${topic.toLowerCase()} shifts. Trends monitored across ${3 + (i%4)} key sources.`,
    tags: JSON.stringify([topic, score > 75 ? "Trending" : "Stable", i % 3 === 0 ? "Global" : "Regional"]),
    createdAt: new Date(Date.now() - (i * 3600000)).toISOString()
  });

  // Add 1-3 articles per narrative
  const articleCount = 1 + (i % 3);
  for(let j = 0; j < articleCount; j++) {
    const src = sources[(i + j) % sources.length];
    _ARTICLES.push({
      id: `art-${i}-${j}`,
      title: `${title}: New Developments`,
      content: `In-depth reporting from ${src.n} regarding the latest shifts in ${title.toLowerCase()}...`,
      summary: `Recent report covering the core developments in ${title.toLowerCase()}.`,
      source: src.n,
      url: src.u,
      timestamp: new Date(Date.now() - (i * 3600000 + j * 600000)).toISOString(),
      topic,
      narrativeId: id
    });
  }
});
