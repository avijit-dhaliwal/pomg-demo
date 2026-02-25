export type DataMode = "demo" | "live";

const configuredMode = (process.env.DATA_MODE ?? "demo").toLowerCase();

export interface DemoMetrics {
  visitors: number;
  conversionRate: number;
  averageOrderValue: number;
  monthlyRevenue: number;
  currentOrganicTraffic: number;
  projectedOrganicTraffic: number;
  authorityScore: number;
  projectedAuthorityScore: number;
  rankingKeywords: number;
  projectedKeywords: number;
  competitorKeywords: number;
  localSeoScore: number;
  projectedLocalSeoScore: number;
  technicalScore: number;
  projectedTechnicalScore: number;
  contentScore: number;
  projectedContentScore: number;
  subscriberOpportunity: number;
  organicTrafficValue: number;
  productViewDropoffRate: number;
  industryDropoffRangeLow: number;
  industryDropoffRangeHigh: number;
}

// Canonical demo metrics used by pitch/dashboard and related panels.
const fallbackDemoMetrics: DemoMetrics = {
  visitors: 25000,
  conversionRate: 0.028,
  averageOrderValue: 718,
  monthlyRevenue: 502600,
  currentOrganicTraffic: 890,
  projectedOrganicTraffic: 8200,
  authorityScore: 18,
  projectedAuthorityScore: 35,
  rankingKeywords: 120,
  projectedKeywords: 1800,
  competitorKeywords: 14000,
  localSeoScore: 42,
  projectedLocalSeoScore: 88,
  technicalScore: 34,
  projectedTechnicalScore: 92,
  contentScore: 15,
  projectedContentScore: 78,
  subscriberOpportunity: 2847,
  organicTrafficValue: 48600,
  productViewDropoffRate: 0.91,
  industryDropoffRangeLow: 0.7,
  industryDropoffRangeHigh: 0.8,
};

function parseLiveMetrics(rawValue: string | undefined): Partial<DemoMetrics> | null {
  if (!rawValue) return null;

  try {
    const parsed = JSON.parse(rawValue);
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

const liveMetricOverrides = parseLiveMetrics(process.env.LIVE_METRICS_JSON);
const hasLiveMetrics = Boolean(liveMetricOverrides);

export const dataMode: DataMode =
  configuredMode === "live" && hasLiveMetrics ? "live" : "demo";
export const isDemoMode = dataMode === "demo";

export const demoMetrics: DemoMetrics =
  dataMode === "live" && liveMetricOverrides
    ? { ...fallbackDemoMetrics, ...liveMetricOverrides }
    : fallbackDemoMetrics;

const growthAssumptions = {
  trafficMultiplier: 1.5,
  projectedConversionRate: 0.034,
  projectedAverageOrderValue: 843,
} as const;

export function deriveMonthlyRevenue(
  visitors: number,
  conversionRate: number,
  averageOrderValue: number,
): number {
  return Math.round(visitors * conversionRate * averageOrderValue);
}

export const derivedCurrentMonthlyRevenue = deriveMonthlyRevenue(
  demoMetrics.visitors,
  demoMetrics.conversionRate,
  demoMetrics.averageOrderValue,
);

const projectedVisitors = Math.round(
  demoMetrics.visitors * growthAssumptions.trafficMultiplier,
);
const projectedMonthlyRevenue = deriveMonthlyRevenue(
  projectedVisitors,
  growthAssumptions.projectedConversionRate,
  growthAssumptions.projectedAverageOrderValue,
);
const trafficOnlyRevenue = deriveMonthlyRevenue(
  projectedVisitors,
  demoMetrics.conversionRate,
  demoMetrics.averageOrderValue,
);
const conversionOnlyRevenue = deriveMonthlyRevenue(
  projectedVisitors,
  growthAssumptions.projectedConversionRate,
  demoMetrics.averageOrderValue,
);

export const revenueModel = {
  current: {
    monthlyVisitors: demoMetrics.visitors,
    conversionRate: Number((demoMetrics.conversionRate * 100).toFixed(1)),
    aov: demoMetrics.averageOrderValue,
    monthlyRevenue: derivedCurrentMonthlyRevenue,
    annualRevenue: derivedCurrentMonthlyRevenue * 12,
  },
  projected: {
    monthlyVisitors: projectedVisitors,
    conversionRate: Number(
      (growthAssumptions.projectedConversionRate * 100).toFixed(1),
    ),
    aov: growthAssumptions.projectedAverageOrderValue,
    monthlyRevenue: projectedMonthlyRevenue,
    annualRevenue: projectedMonthlyRevenue * 12,
  },
  improvements: [
    {
      area: "SEO & Content",
      impact: "+50% qualified traffic",
      revenue: trafficOnlyRevenue - derivedCurrentMonthlyRevenue,
    },
    {
      area: "Conversion Optimization",
      impact: "+0.6pp conversion rate",
      revenue: conversionOnlyRevenue - trafficOnlyRevenue,
    },
    {
      area: "AOV Increase (Bundling)",
      impact: "+$125 average order",
      revenue: projectedMonthlyRevenue - conversionOnlyRevenue,
    },
  ],
} as const;

export const summaryMetricsModel = {
  totalRevenue: derivedCurrentMonthlyRevenue,
  totalOrders: Math.round(demoMetrics.visitors * demoMetrics.conversionRate),
  averageOrderValue: demoMetrics.averageOrderValue,
  conversionRate: Number((demoMetrics.conversionRate * 100).toFixed(1)),
  totalVisitors: demoMetrics.visitors,
  returningVisitorRate: 34.2,
  cartAbandonmentRate: 55.0,
  emailSubscribers: demoMetrics.subscriberOpportunity,
  monthOverMonthGrowth: 18.4,
  topManufacturerRevenue: { name: "Noveske", revenue: 67200 },
  nfaItemsInProcess: 24,
  averageNfaWaitDays: 24,
} as const;

export const seoMetricsModel = {
  currentOrganicTraffic: demoMetrics.currentOrganicTraffic,
  projectedOrganicTraffic: demoMetrics.projectedOrganicTraffic,
  projectedKeywords: demoMetrics.projectedKeywords,
  authorityScore: demoMetrics.authorityScore,
  projectedAuthorityScore: demoMetrics.projectedAuthorityScore,
  rankingKeywords: demoMetrics.rankingKeywords,
  competitorKeywords: demoMetrics.competitorKeywords,
  localSeoScore: demoMetrics.localSeoScore,
  projectedLocalSeoScore: demoMetrics.projectedLocalSeoScore,
  technicalScore: demoMetrics.technicalScore,
  projectedTechnicalScore: demoMetrics.projectedTechnicalScore,
  contentScore: demoMetrics.contentScore,
  projectedContentScore: demoMetrics.projectedContentScore,
  missingTrafficValue: demoMetrics.organicTrafficValue,
} as const;

if (process.env.NODE_ENV !== "production") {
  const formulaRevenue = deriveMonthlyRevenue(
    demoMetrics.visitors,
    demoMetrics.conversionRate,
    demoMetrics.averageOrderValue,
  );

  // Formula sanity check to prevent hard-coded drift.
  console.info("[metrics-check]", {
    configuredMonthlyRevenue: demoMetrics.monthlyRevenue,
    formulaMonthlyRevenue: formulaRevenue,
    consistent: Math.abs(demoMetrics.monthlyRevenue - formulaRevenue) <= 100,
  });
}
