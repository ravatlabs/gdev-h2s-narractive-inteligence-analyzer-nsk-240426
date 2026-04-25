// src/lib/mockData.ts

export type Article = {
  id: number;
  title: string;
  source: string;
  url: string;
  published_at: string;
};

export type Narrative = {
  id: number;
  summary: string;
  topics: string[];
  credibility_score: number;
  created_at: string;
  category: string;
  isTrending: boolean;
  articles: Article[];
};

const CATEGORIES = ["Technology", "Politics", "Climate", "Economy", "Health", "Science"];

const TEMPLATES = {
  Technology: [
    "AI startup announces breakthrough in {topic}.",
    "Major tech firm releases new {topic} framework.",
    "Cybersecurity breach exposes {topic} data.",
    "Regulators investigate {topic} monopoly.",
  ],
  Politics: [
    "New legislation proposed regarding {topic}.",
    "Global summit addresses escalating {topic} concerns.",
    "Elections impact future of {topic} policies.",
    "Diplomatic tensions rise over {topic}.",
  ],
  Climate: [
    "Recent study shows alarming rate of {topic}.",
    "Global leaders pledge to reduce {topic}.",
    "Renewable energy investments boost {topic} initiatives.",
    "Extreme weather events linked to {topic}.",
  ],
  Economy: [
    "Central banks announce new {topic} measures.",
    "Stock markets react to {topic} volatility.",
    "Inflation drives changes in {topic} spending.",
    "Global trade policies disrupt {topic} supply chains.",
  ],
  Health: [
    "Breakthrough treatment discovered for {topic}.",
    "Global health organization warns about {topic} outbreak.",
    "New regulations passed for {topic} distribution.",
    "Study links lifestyle changes to {topic} prevention.",
  ],
  Science: [
    "Researchers discover new {topic} phenomenon.",
    "Space agency announces {topic} mission.",
    "Quantum computing leap accelerates {topic} research.",
    "Deep sea expedition reveals {topic} ecosystem.",
  ],
};

const TOPICS = {
  Technology: ["Quantum Computing", "Generative AI", "Semiconductors", "Cloud Infrastructure", "Blockchain"],
  Politics: ["Trade Tariffs", "Immigration Reform", "Tax Policy", "Foreign Aid", "Voting Rights"],
  Climate: ["Ocean Acidification", "Carbon Capture", "Deforestation", "Glacial Melt", "Solar Subsidies"],
  Economy: ["Interest Rates", "Cryptocurrency", "Housing Market", "Unemployment", "Supply Chain"],
  Health: ["Vaccine Distribution", "Mental Health", "Telemedicine", "Nutrition", "Epidemiology"],
  Science: ["Dark Matter", "CRISPR", "Exoplanets", "Neuroplasticity", "Fusion Energy"],
};

const SOURCES = ["Reuters", "Associated Press", "Bloomberg", "BBC News", "Financial Times", "Al Jazeera", "NPR", "The Guardian"];

// Deterministic PRNG to avoid hydration errors
let seed = 42;
function seededRandom() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(seededRandom() * arr.length)];
}

function generateArticles(count: number, topic: string, dateOffsetDays: number): Article[] {
  const articles: Article[] = [];
  const baseDate = new Date("2026-04-25T12:00:00Z"); // Fix base date for deterministic results
  baseDate.setDate(baseDate.getDate() - dateOffsetDays);

  for (let i = 0; i < count; i++) {
    const pubDate = new Date(baseDate);
    pubDate.setHours(pubDate.getHours() - Math.floor(seededRandom() * 48)); // Scatter over 48 hours
    
    articles.push({
      id: Math.floor(seededRandom() * 1000000),
      title: `Report: Developments in ${topic} announced by key figures`,
      source: getRandomItem(SOURCES),
      url: `https://example.com/news/${Math.floor(seededRandom() * 100000)}`,
      published_at: pubDate.toISOString(),
    });
  }
  
  return articles;
}

export function generateMockData(count = 500): Narrative[] {
  // Reset seed so every generation call produces the exact same array
  seed = 42;
  const narratives: Narrative[] = [];
  
  for (let i = 0; i < count; i++) {
    const category = CATEGORIES[i % CATEGORIES.length] as keyof typeof TEMPLATES;
    const topic = getRandomItem(TOPICS[category]);
    const template = getRandomItem(TEMPLATES[category]);
    const summary = template.replace("{topic}", topic.toLowerCase());
    
    const articleCount = Math.floor(seededRandom() * 5) + 2; // 2 to 6 articles
    const dateOffsetDays = Math.floor(seededRandom() * 60); // Spread over last 60 days
    
    const baseDate = new Date("2026-04-25T12:00:00Z"); // Fix base date for deterministic results
    baseDate.setDate(baseDate.getDate() - dateOffsetDays);

    // Trending logic: high credibility, recent (last 3 days), and a random chance
    const credibility_score = Math.floor(seededRandom() * 40) + 60; // 60-99
    const isTrending = dateOffsetDays <= 3 && credibility_score > 85 && seededRandom() > 0.5;

    narratives.push({
      id: i + 1,
      summary,
      topics: [topic, category],
      credibility_score,
      created_at: baseDate.toISOString(),
      category,
      isTrending,
      articles: generateArticles(articleCount, topic, dateOffsetDays),
    });
  }

  // Sort by date descending
  return narratives.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

// Generate the static instance to be used across the app
export const mockNarratives = generateMockData(520);

// Helper for categories
export const getCategories = () => CATEGORIES;
