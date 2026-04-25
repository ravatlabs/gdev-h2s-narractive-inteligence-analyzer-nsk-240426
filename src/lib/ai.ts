import { db } from "./db";
import type { Article } from "./db";

// ─── Text Normalizer ──────────────────────────────────────────────────────────
// Handles poor grammar/spelling by extracting meaningful keywords
function normalizeAndExtractKeywords(rawText: string): string[] {
  const text = rawText.toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const stopWords = new Set([
    "the","a","an","is","are","was","were","be","been","being",
    "have","has","had","do","does","did","will","would","could","should",
    "may","might","must","shall","can","need","dare","to","of","in","on",
    "at","by","for","with","about","against","between","into","through",
    "during","before","after","above","below","from","up","down","out",
    "off","over","under","that","this","these","those","it","its",
    "they","them","their","i","we","you","he","she","his","her","our",
    "and","or","but","if","then","so","yet","nor","since","because","as",
    "what","which","who","whom","when","where","how","not","no","there",
  ]);

  return text.split(" ")
    .filter(w => w.length > 3 && !stopWords.has(w))
    .slice(0, 40);
}

// ─── Local Context Search ─────────────────────────────────────────────────────
interface ContextMatch {
  article: Article;
  score: number;
  matchedTerms: string[];
}

function searchLocalContext(keywords: string[]): ContextMatch[] {
  const articles = db.prepare('SELECT * FROM articles').all() as Article[];
  const matches: ContextMatch[] = [];

  for (const article of articles) {
    const haystack = `${article.title} ${article.summary} ${article.content} ${article.topic} ${article.source}`.toLowerCase();
    const matchedTerms = keywords.filter(kw => haystack.includes(kw));
    const score = matchedTerms.length / Math.max(keywords.length, 1);

    if (matchedTerms.length >= 2) {
      matches.push({ article, score, matchedTerms });
    }
  }

  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

// ─── Source Reputation Map ────────────────────────────────────────────────────
const SOURCE_SCORES: Record<string, number> = {
  "reuters": 95, "associated press": 95, "ap news": 95,
  "bbc": 90, "bloomberg": 90, "financial times": 90,
  "the guardian": 85, "new york times": 85, "washington post": 85,
  "npr": 85, "cnn": 80, "cnbc": 80, "wsj": 85, "wall street journal": 85,
  "the economist": 90, "wired": 78, "ars technica": 76, "the verge": 75,
  "techcrunch": 72, "nasa": 92, "who": 93, "cdc": 93, "mit": 90,
  "stanford": 90, "nature": 95, "science": 95, "lancet": 95, "nejm": 98,
  "harvard business review": 88, "espn": 75, "nielsen": 82,
  "coindesk": 60, "south china morning post": 68, "al jazeera": 72,
  "xinhua": 50, "meta newsroom": 60, "techrumo": 20, "blog": 15,
};

function getSourceScore(source: string): number {
  const lower = source.toLowerCase();
  for (const [key, val] of Object.entries(SOURCE_SCORES)) {
    if (lower.includes(key)) return val;
  }
  return 40; // unknown source
}

// ─── Topic Detector ───────────────────────────────────────────────────────────
function detectTopic(text: string): string {
  const t = text.toLowerCase();
  if (t.match(/bitcoin|crypto|blockchain|ethereum|nft|defi/)) return "Cryptocurrency";
  if (t.match(/election|vote|democrat|republican|president|parliament|senator|congress/)) return "Politics";
  if (t.match(/stock|market|economy|inflation|gdp|fed|rate|interest rate|trade|tariff/)) return "Finance & Economy";
  if (t.match(/war|military|conflict|ceasefire|troops|nato|weapons|sanctions/)) return "Geopolitics";
  if (t.match(/climate|carbon|emissions|green|renewable|fossil|temperature|glacier/)) return "Climate & Environment";
  if (t.match(/ai|artificial intelligence|machine learning|chatgpt|llm|openai|neural|deepmind/)) return "Artificial Intelligence";
  if (t.match(/health|vaccine|covid|pandemic|disease|hospital|drug|cancer|virus/)) return "Health & Medicine";
  if (t.match(/space|nasa|rocket|satellite|moon|mars|orbit|astronaut|iss/)) return "Space & Science";
  if (t.match(/football|soccer|cricket|tennis|basketball|olympic|sports|championship/)) return "Sports";
  if (t.match(/apple|google|microsoft|meta|amazon|iphone|android|software|chip|semiconductor/)) return "Technology";
  return "General News";
}

// ─── Legitimacy Engine ────────────────────────────────────────────────────────
export interface AnalysisResult {
  legitimacyScore: number;
  topicStrength: "Weak" | "Moderate" | "Strong" | "Very Strong";
  verdict: string;
  verdictLevel: "LEGITIMATE" | "PLAUSIBLE" | "UNCERTAIN" | "SUSPICIOUS" | "INSUFFICIENT";
  topic: string;
  summary: string;
  explanation: string;
  contextEvidence: ContextEvidence[];
  needsMoreContext: boolean;
  promptForContext?: string;
  claimSpecificity: number;   // 0-100
  sourceCoverage:   number;   // 0-100
  claimCoherence:   number;   // 0-100
}

interface ContextEvidence {
  headline: string;
  source: string;
  url: string;
  relevance: number;  // 0-100
  matchedTerms: string[];
}

export async function analyzeCustomText(text: string): Promise<AnalysisResult> {
  await new Promise(r => setTimeout(r, 1400 + Math.random() * 600));

  const trimmed = text.trim();
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  const keywords = normalizeAndExtractKeywords(trimmed);
  const topic = detectTopic(trimmed);

  // ── Insufficient Context Check ──────────────────────────────────────────────
  if (wordCount < 10 || keywords.length < 2) {
    return {
      legitimacyScore: 0,
      topicStrength: "Weak",
      verdict: "Insufficient Input",
      verdictLevel: "INSUFFICIENT",
      topic,
      summary: trimmed.slice(0, 60),
      explanation: "The provided text is too short or too vague to perform a meaningful analysis.",
      contextEvidence: [],
      needsMoreContext: true,
      promptForContext: buildContextPrompt(trimmed, topic, "too_short"),
      claimSpecificity: 0,
      sourceCoverage: 0,
      claimCoherence: 0,
    };
  }

  // ── Context Matching ────────────────────────────────────────────────────────
  const matches = searchLocalContext(keywords);
  const hasContext = matches.length > 0;

  if (!hasContext && wordCount < 30) {
    return {
      legitimacyScore: 0,
      topicStrength: "Weak",
      verdict: "No Context Found",
      verdictLevel: "INSUFFICIENT",
      topic,
      summary: trimmed.slice(0, 80) + (wordCount > 10 ? "..." : ""),
      explanation: "No matching events found in our knowledge base for this claim. The topic may be obscure, highly niche, or the claim may be fabricated.",
      contextEvidence: [],
      needsMoreContext: true,
      promptForContext: buildContextPrompt(trimmed, topic, "no_match"),
      claimSpecificity: 0,
      sourceCoverage: 0,
      claimCoherence: 0,
    };
  }

  // ── Claim Specificity Score ─────────────────────────────────────────────────
  const hasNumbers = /\d/.test(trimmed);
  const hasProperNouns = keywords.filter(k => k.length > 5).length >= 3;
  const hasTimeRef = /\b(2025|2026|today|yesterday|this week|last week|recent|latest|annual|quarter)\b/i.test(trimmed);
  const hasQuotes = /["']/.test(trimmed);
  const hasLocation = /\b(US|UK|EU|china|russia|india|europe|asia|africa|global|international|national)\b/i.test(trimmed);
  
  const claimSpecificity = Math.min(100,
    (hasNumbers ? 20 : 0) +
    (hasProperNouns ? 20 : 0) +
    (hasTimeRef ? 15 : 0) +
    (hasQuotes ? 15 : 0) +
    (hasLocation ? 15 : 0) +
    Math.min(wordCount, 200) * 0.075
  );

  // ── Source Coverage Score ───────────────────────────────────────────────────
  const topMatchScores = matches.map(m => getSourceScore(m.article.source));
  const avgSourceScore = topMatchScores.length
    ? topMatchScores.reduce((s, v) => s + v, 0) / topMatchScores.length
    : 0;
  const matchDepth = Math.min(matches.length / 3, 1);
  const sourceCoverage = Math.round(avgSourceScore * matchDepth);

  // ── Claim Coherence Score ───────────────────────────────────────────────────
  const topMatchKeyFreq = matches[0]?.score ?? 0;
  const claimCoherence = Math.min(100, Math.round(topMatchKeyFreq * 100) + (wordCount > 50 ? 20 : 0));

  // ── Suspicion Signals ───────────────────────────────────────────────────────
  const suspicionWords = ["allegedly", "rumored", "anonymous", "insider claims", "exclusive leak", "no one is talking about", "they don't want you to know", "cover up", "hidden truth", "secret plan"];
  const suspicionHits = suspicionWords.filter(w => trimmed.toLowerCase().includes(w)).length;
  const suspicionPenalty = suspicionHits * 12;

  // ── Final Legitimacy Score ──────────────────────────────────────────────────
  let legitimacyScore = Math.round(
    claimSpecificity * 0.30 +
    sourceCoverage   * 0.40 +
    claimCoherence   * 0.30
  ) - suspicionPenalty;
  legitimacyScore = Math.max(5, Math.min(97, legitimacyScore));

  // ── Verdict ─────────────────────────────────────────────────────────────────
  let verdictLevel: AnalysisResult["verdictLevel"];
  let verdict: string;
  if (legitimacyScore >= 80) {
    verdictLevel = "LEGITIMATE"; verdict = "Highly Legitimate — Well Corroborated";
  } else if (legitimacyScore >= 60) {
    verdictLevel = "PLAUSIBLE"; verdict = "Plausible — Partially Corroborated";
  } else if (legitimacyScore >= 40) {
    verdictLevel = "UNCERTAIN"; verdict = "Uncertain — Weak Evidence";
  } else if (suspicionHits > 0) {
    verdictLevel = "SUSPICIOUS"; verdict = "Suspicious — Conspiracy Language Detected";
  } else {
    verdictLevel = "UNCERTAIN"; verdict = "Low Legitimacy — Little to No Corroboration";
  }

  // ── Topic Strength ──────────────────────────────────────────────────────────
  let topicStrength: AnalysisResult["topicStrength"] = "Weak";
  if (matches.length >= 4) topicStrength = "Very Strong";
  else if (matches.length >= 3) topicStrength = "Strong";
  else if (matches.length >= 1) topicStrength = "Moderate";

  // ── Context Evidence List ───────────────────────────────────────────────────
  const contextEvidence: ContextEvidence[] = matches.map(m => ({
    headline: m.article.title,
    source: m.article.source,
    url: m.article.url,
    relevance: Math.round(m.score * 100),
    matchedTerms: m.matchedTerms.slice(0, 4),
  }));

  // ── Explanation ─────────────────────────────────────────────────────────────
  const parts: string[] = [];
  if (matches.length > 0) parts.push(`Found ${matches.length} related article${matches.length > 1 ? "s" : ""} in our knowledge base that match${matches.length === 1 ? "es" : ""} your claim.`);
  if (avgSourceScore > 80) parts.push(`The matching sources include high-reputation outlets (avg. source trustworthiness: ${Math.round(avgSourceScore)}/100).`);
  else if (avgSourceScore > 50) parts.push(`Matching sources are of moderate reputation (avg. ${Math.round(avgSourceScore)}/100).`);
  else if (matches.length > 0) parts.push(`Matching sources have low credibility scores, which reduces the overall legitimacy signal.`);
  if (!hasContext) parts.push("No related articles were found in our current knowledge base for this specific claim.");
  if (suspicionHits > 0) parts.push(`Detected ${suspicionHits} conspiracy-pattern phrase(s) which significantly reduces the legitimacy score.`);
  if (claimSpecificity > 60) parts.push(`The claim is specific and well-structured (specificity: ${Math.round(claimSpecificity)}/100), which increases confidence in assessment.`);
  else parts.push(`The claim lacks specificity (score: ${Math.round(claimSpecificity)}/100) — adding dates, names, or numbers would strengthen the assessment.`);

  const needsMoreContext = !hasContext || wordCount < 25 || claimSpecificity < 30;

  return {
    legitimacyScore,
    topicStrength,
    verdict,
    verdictLevel,
    topic,
    summary: trimmed.slice(0, 90) + (trimmed.length > 90 ? "..." : ""),
    explanation: parts.join(" "),
    contextEvidence,
    needsMoreContext,
    promptForContext: needsMoreContext ? buildContextPrompt(trimmed, topic, "vague") : undefined,
    claimSpecificity: Math.round(claimSpecificity),
    sourceCoverage,
    claimCoherence,
  };
}

function buildContextPrompt(text: string, topic: string, reason: "too_short" | "no_match" | "vague"): string {
  if (reason === "too_short") {
    return `Your input is too brief to analyze. To get a meaningful legitimacy score, please provide:\n• The full claim or statement\n• Who made this claim (person, organization, or source)\n• When this was reported or happened\n• Any specific numbers, locations or names mentioned`;
  }
  if (reason === "no_match") {
    return `We couldn't find related events in our database for this ${topic} claim. To improve the analysis:\n• Add the name of the source where you read this\n• Include the date or timeframe of the event\n• Specify the country or organization involved\n• Provide a direct quote if available`;
  }
  return `Your claim could benefit from more context:\n• Can you name the specific source or outlet?\n• Is there a date or timeframe you can add?\n• Are there any specific figures, percentages or statistics in the original claim?`;
}
