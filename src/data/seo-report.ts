import { seoMetricsModel } from "@/lib/demoMetrics";

export interface KeywordOpportunity {
  keyword: string;
  currentRank: number | null;
  searchVolume: number;
  difficulty: number;
  potentialTraffic: number;
  status: "Ranking" | "Opportunity" | "Missing";
  category: "Product" | "Informational" | "Local" | "Brand";
}

export interface CompetitorSEO {
  name: string;
  domainAuthority: number;
  organicKeywords: number;
  estimatedTraffic: number;
  topCategory: string;
  trend: "up" | "down" | "stable";
}

export interface ContentGap {
  topic: string;
  estimatedTraffic: number;
  difficulty: "Easy" | "Medium" | "Hard";
  priority: "High" | "Medium" | "Low";
  type: "Blog Post" | "Product Page" | "Guide" | "Landing Page" | "FAQ";
}

export interface TechnicalIssue {
  issue: string;
  severity: "Critical" | "Warning" | "Info";
  pages: number;
  impact: string;
}

export const keywordOpportunities: KeywordOpportunity[] = [
  // Currently ranking
  {
    keyword: "piece of mind guns",
    currentRank: 1,
    searchVolume: 320,
    difficulty: 8,
    potentialTraffic: 280,
    status: "Ranking",
    category: "Brand",
  },
  {
    keyword: "pomg utah",
    currentRank: 1,
    searchVolume: 110,
    difficulty: 5,
    potentialTraffic: 95,
    status: "Ranking",
    category: "Brand",
  },
  {
    keyword: "gun store salt lake city",
    currentRank: 7,
    searchVolume: 880,
    difficulty: 42,
    potentialTraffic: 120,
    status: "Ranking",
    category: "Local",
  },
  {
    keyword: "silencer dealer utah",
    currentRank: 4,
    searchVolume: 390,
    difficulty: 35,
    potentialTraffic: 140,
    status: "Ranking",
    category: "Local",
  },

  // Opportunities
  {
    keyword: "buy noveske rifle",
    currentRank: 18,
    searchVolume: 720,
    difficulty: 38,
    potentialTraffic: 310,
    status: "Opportunity",
    category: "Product",
  },
  {
    keyword: "dead air sandman s review",
    currentRank: 24,
    searchVolume: 1200,
    difficulty: 45,
    potentialTraffic: 480,
    status: "Opportunity",
    category: "Informational",
  },
  {
    keyword: "nfa trust utah",
    currentRank: 15,
    searchVolume: 480,
    difficulty: 28,
    potentialTraffic: 210,
    status: "Opportunity",
    category: "Informational",
  },
  {
    keyword: "best suppressor for ar15",
    currentRank: null,
    searchVolume: 2400,
    difficulty: 52,
    potentialTraffic: 720,
    status: "Opportunity",
    category: "Informational",
  },
  {
    keyword: "hk sp5 for sale",
    currentRank: 32,
    searchVolume: 1600,
    difficulty: 48,
    potentialTraffic: 480,
    status: "Opportunity",
    category: "Product",
  },
  {
    keyword: "ffl transfer salt lake city",
    currentRank: 11,
    searchVolume: 320,
    difficulty: 22,
    potentialTraffic: 180,
    status: "Opportunity",
    category: "Local",
  },

  // Missing
  {
    keyword: "how to buy a silencer",
    currentRank: null,
    searchVolume: 3200,
    difficulty: 42,
    potentialTraffic: 960,
    status: "Missing",
    category: "Informational",
  },
  {
    keyword: "daniel defense ddm4 v7 review",
    currentRank: null,
    searchVolume: 1800,
    difficulty: 55,
    potentialTraffic: 540,
    status: "Missing",
    category: "Informational",
  },
  {
    keyword: "best gun store in utah",
    currentRank: null,
    searchVolume: 1200,
    difficulty: 38,
    potentialTraffic: 420,
    status: "Missing",
    category: "Local",
  },
  {
    keyword: "sig mcx spear lt for sale",
    currentRank: null,
    searchVolume: 980,
    difficulty: 44,
    potentialTraffic: 294,
    status: "Missing",
    category: "Product",
  },
  {
    keyword: "class 3 dealer utah",
    currentRank: null,
    searchVolume: 560,
    difficulty: 25,
    potentialTraffic: 280,
    status: "Missing",
    category: "Local",
  },
  {
    keyword: "eform 4 wait time 2026",
    currentRank: null,
    searchVolume: 4800,
    difficulty: 35,
    potentialTraffic: 1440,
    status: "Missing",
    category: "Informational",
  },
  {
    keyword: "noveske gen 4 review",
    currentRank: null,
    searchVolume: 890,
    difficulty: 40,
    potentialTraffic: 267,
    status: "Missing",
    category: "Informational",
  },
  {
    keyword: "eotech exps3 vs aimpoint t2",
    currentRank: null,
    searchVolume: 1400,
    difficulty: 48,
    potentialTraffic: 420,
    status: "Missing",
    category: "Informational",
  },
];

export const competitors: CompetitorSEO[] = [
  {
    name: "Silencer Shop",
    domainAuthority: 62,
    organicKeywords: seoMetricsModel.competitorKeywords,
    estimatedTraffic: 89000,
    topCategory: "NFA/Suppressors",
    trend: "up",
  },
  {
    name: "Capitol Armory",
    domainAuthority: 48,
    organicKeywords: 5800,
    estimatedTraffic: 32000,
    topCategory: "Suppressors",
    trend: "stable",
  },
  {
    name: "Noveske (Direct)",
    domainAuthority: 55,
    organicKeywords: 8400,
    estimatedTraffic: 45000,
    topCategory: "Rifles",
    trend: "up",
  },
  {
    name: "Sportsman's Warehouse",
    domainAuthority: 67,
    organicKeywords: 42000,
    estimatedTraffic: 210000,
    topCategory: "General Firearms",
    trend: "stable",
  },
  {
    name: "Gallenson's Gun Shop (UT)",
    domainAuthority: 28,
    organicKeywords: 890,
    estimatedTraffic: 4200,
    topCategory: "Local Sales",
    trend: "down",
  },
  {
    name: "POMG (Example Baseline)",
    domainAuthority: seoMetricsModel.authorityScore,
    organicKeywords: seoMetricsModel.rankingKeywords,
    estimatedTraffic: seoMetricsModel.currentOrganicTraffic,
    topCategory: "Brand Terms",
    trend: "stable",
  },
];

export const contentGaps: ContentGap[] = [
  {
    topic: "Complete Guide to Buying a Silencer in Utah (2026)",
    estimatedTraffic: 2400,
    difficulty: "Easy",
    priority: "High",
    type: "Guide",
  },
  {
    topic: "eForm 4 Wait Times: What to Expect in 2026",
    estimatedTraffic: 1800,
    difficulty: "Easy",
    priority: "High",
    type: "Blog Post",
  },
  {
    topic: "Best AR-15 Suppressors Ranked & Reviewed",
    estimatedTraffic: 1400,
    difficulty: "Medium",
    priority: "High",
    type: "Guide",
  },
  {
    topic: "NFA Trust vs Individual: Which is Right for You?",
    estimatedTraffic: 960,
    difficulty: "Easy",
    priority: "High",
    type: "Guide",
  },
  {
    topic: "Noveske Gen 4 PDW — Full Review & Range Test",
    estimatedTraffic: 680,
    difficulty: "Medium",
    priority: "Medium",
    type: "Blog Post",
  },
  {
    topic: "HK SP5 vs B&T APC9: Swiss vs German Engineering",
    estimatedTraffic: 520,
    difficulty: "Medium",
    priority: "Medium",
    type: "Blog Post",
  },
  {
    topic: "Dead Air Sandman-S vs Wolfman: Which to Buy First",
    estimatedTraffic: 780,
    difficulty: "Easy",
    priority: "High",
    type: "Blog Post",
  },
  {
    topic: "FFL Transfers in Salt Lake City — POMG Guide",
    estimatedTraffic: 320,
    difficulty: "Easy",
    priority: "Medium",
    type: "Landing Page",
  },
  {
    topic: "Building a Suppressed 300 BLK SBR — Complete Guide",
    estimatedTraffic: 1100,
    difficulty: "Hard",
    priority: "Medium",
    type: "Guide",
  },
  {
    topic: "EOTech EXPS3 vs Aimpoint T-2: Detailed Comparison",
    estimatedTraffic: 1400,
    difficulty: "Medium",
    priority: "Medium",
    type: "Blog Post",
  },
];

export const technicalIssues: TechnicalIssue[] = [
  {
    issue: "No structured data (Schema.org) on product pages",
    severity: "Critical",
    pages: 23,
    impact: "Missing rich snippets in Google results",
  },
  {
    issue: "Missing meta descriptions on category pages",
    severity: "Critical",
    pages: 6,
    impact: "Google generates random snippets",
  },
  {
    issue: "No XML sitemap submitted to Google",
    severity: "Critical",
    pages: 0,
    impact: "Slower indexing of new products",
  },
  {
    issue: "Images missing alt text attributes",
    severity: "Warning",
    pages: 14,
    impact: "Lost image search traffic",
  },
  {
    issue: "No canonical URLs defined",
    severity: "Warning",
    pages: 8,
    impact: "Potential duplicate content issues",
  },
  {
    issue: "Page speed: LCP > 4s on mobile",
    severity: "Warning",
    pages: 3,
    impact: "Core Web Vitals failing",
  },
  {
    issue: "No internal linking strategy",
    severity: "Info",
    pages: 0,
    impact: "Link equity not distributed",
  },
  {
    issue: "No blog or content hub",
    severity: "Info",
    pages: 0,
    impact: "Missing informational keyword coverage",
  },
];

export const seoStats = {
  currentOrganicTraffic: seoMetricsModel.currentOrganicTraffic,
  projectedOrganicTraffic: seoMetricsModel.projectedOrganicTraffic,
  currentKeywords: seoMetricsModel.rankingKeywords,
  projectedKeywords: seoMetricsModel.projectedKeywords,
  domainAuthority: seoMetricsModel.authorityScore,
  projectedDA: seoMetricsModel.projectedAuthorityScore,
  localSEOScore: seoMetricsModel.localSeoScore,
  projectedLocalScore: seoMetricsModel.projectedLocalSeoScore,
  technicalScore: seoMetricsModel.technicalScore,
  projectedTechnicalScore: seoMetricsModel.projectedTechnicalScore,
  contentScore: seoMetricsModel.contentScore,
  projectedContentScore: seoMetricsModel.projectedContentScore,
  missingTrafficValue: seoMetricsModel.missingTrafficValue,
};
