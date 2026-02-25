export type DataMode = "demo" | "live";

type ExampleTag = "example";

interface BaselineMetrics {
  monthlyRevenue: number;
  visitors: number;
  conversionRate: number;
  averageOrderValue: number;
}

interface ProjectionMetrics {
  visitors: number;
  conversionRate: number;
  averageOrderValue: number;
}

interface SeoExampleLabels {
  organicTrafficValue: ExampleTag;
  authorityScore: ExampleTag;
  rankingKeywords: ExampleTag;
  competitorKeywords: ExampleTag;
  subscriberCount: ExampleTag;
}

interface SeoValueMetrics {
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
  organicTrafficValue: number;
}

interface EngagementMetrics {
  subscriberCount: number;
  productViewDropoffRate: number;
  industryDropoffRangeLow: number;
  industryDropoffRangeHigh: number;
}

export interface DemoMetricStore {
  baseline: BaselineMetrics;
  projections: ProjectionMetrics;
  seoExamples: SeoExampleLabels;
  seoValues: SeoValueMetrics;
  engagement: EngagementMetrics;
}

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

const fallbackDemoMetrics: DemoMetricStore = {
  baseline: {
    monthlyRevenue: 78331,
    visitors: 11260,
    conversionRate: 0.011995,
    averageOrderValue: 580,
  },
  projections: {
    visitors: 16890,
    conversionRate: 0.018,
    averageOrderValue: 705,
  },
  seoExamples: {
    organicTrafficValue: "example",
    authorityScore: "example",
    rankingKeywords: "example",
    competitorKeywords: "example",
    subscriberCount: "example",
  },
  seoValues: {
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
    organicTrafficValue: 48600,
  },
  engagement: {
    subscriberCount: 2847,
    productViewDropoffRate: 0.91,
    industryDropoffRangeLow: 0.7,
    industryDropoffRangeHigh: 0.8,
  },
};

function parseLiveMetrics(
  rawValue: string | undefined,
): DeepPartial<DemoMetricStore> | null {
  if (!rawValue) return null;

  try {
    const parsed = JSON.parse(rawValue);
    return typeof parsed === "object" && parsed !== null
      ? (parsed as DeepPartial<DemoMetricStore>)
      : null;
  } catch {
    return null;
  }
}

function mergeDemoMetrics(
  base: DemoMetricStore,
  overrides: DeepPartial<DemoMetricStore>,
): DemoMetricStore {
  return {
    baseline: { ...base.baseline, ...(overrides.baseline ?? {}) },
    projections: { ...base.projections, ...(overrides.projections ?? {}) },
    seoExamples: { ...base.seoExamples, ...(overrides.seoExamples ?? {}) },
    seoValues: { ...base.seoValues, ...(overrides.seoValues ?? {}) },
    engagement: { ...base.engagement, ...(overrides.engagement ?? {}) },
  };
}

const configuredMode = (
  process.env.NEXT_PUBLIC_DATA_MODE ??
  process.env.DATA_MODE ??
  "demo"
).toLowerCase();
const liveMetricOverrides = parseLiveMetrics(
  process.env.NEXT_PUBLIC_LIVE_METRICS_JSON ?? process.env.LIVE_METRICS_JSON,
);
const hasLiveMetrics = Boolean(liveMetricOverrides);

export const dataMode: DataMode =
  configuredMode === "live" && hasLiveMetrics ? "live" : "demo";
export const isDemoMode = dataMode === "demo";

export const demoMetrics: DemoMetricStore =
  dataMode === "live" && liveMetricOverrides
    ? mergeDemoMetrics(fallbackDemoMetrics, liveMetricOverrides)
    : fallbackDemoMetrics;

export function deriveMonthlyRevenue(
  visitors: number,
  conversionRate: number,
  averageOrderValue: number,
): number {
  return Math.round(visitors * conversionRate * averageOrderValue);
}

const baseline = demoMetrics.baseline;
const projected = demoMetrics.projections;

const baselineFormulaRevenue = deriveMonthlyRevenue(
  baseline.visitors,
  baseline.conversionRate,
  baseline.averageOrderValue,
);
const currentMonthlyRevenue = baseline.monthlyRevenue;
const projectedMonthlyRevenue = deriveMonthlyRevenue(
  projected.visitors,
  projected.conversionRate,
  projected.averageOrderValue,
);
const trafficOnlyRevenue = deriveMonthlyRevenue(
  projected.visitors,
  baseline.conversionRate,
  baseline.averageOrderValue,
);
const conversionOnlyRevenue = deriveMonthlyRevenue(
  projected.visitors,
  projected.conversionRate,
  baseline.averageOrderValue,
);

export const revenueModel = {
  current: {
    monthlyVisitors: baseline.visitors,
    conversionRate: Number((baseline.conversionRate * 100).toFixed(1)),
    aov: baseline.averageOrderValue,
    monthlyRevenue: currentMonthlyRevenue,
    annualRevenue: currentMonthlyRevenue * 12,
  },
  projected: {
    monthlyVisitors: projected.visitors,
    conversionRate: Number((projected.conversionRate * 100).toFixed(1)),
    aov: projected.averageOrderValue,
    monthlyRevenue: projectedMonthlyRevenue,
    annualRevenue: projectedMonthlyRevenue * 12,
  },
  improvements: [
    {
      area: "SEO & Content",
      impact: "+50% organic traffic",
      revenue: trafficOnlyRevenue - currentMonthlyRevenue,
    },
    {
      area: "Conversion Optimization",
      impact: "+0.6% conversion rate",
      revenue: conversionOnlyRevenue - trafficOnlyRevenue,
    },
    {
      area: "AOV Increase (Bundling)",
      impact: `+$${projected.averageOrderValue - baseline.averageOrderValue} average order`,
      revenue: projectedMonthlyRevenue - conversionOnlyRevenue,
    },
  ],
} as const;

const totalOrders = Math.max(
  Math.round(currentMonthlyRevenue / baseline.averageOrderValue),
  1,
);

export const summaryMetricsModel = {
  totalRevenue: currentMonthlyRevenue,
  totalOrders,
  averageOrderValue: baseline.averageOrderValue,
  conversionRate: Number((baseline.conversionRate * 100).toFixed(1)),
  totalVisitors: baseline.visitors,
  returningVisitorRate: 34.2,
  cartAbandonmentRate: 55.0,
  emailSubscribers: demoMetrics.engagement.subscriberCount,
  monthOverMonthGrowth: 18.4,
  topManufacturerRevenue: {
    name: "Noveske",
    revenue: Math.round(currentMonthlyRevenue * 0.23),
  },
  nfaItemsInProcess: 24,
  averageNfaWaitDays: 24,
} as const;

export const seoMetricsModel = {
  currentOrganicTraffic: demoMetrics.seoValues.currentOrganicTraffic,
  projectedOrganicTraffic: demoMetrics.seoValues.projectedOrganicTraffic,
  projectedKeywords: demoMetrics.seoValues.projectedKeywords,
  authorityScore: demoMetrics.seoValues.authorityScore,
  projectedAuthorityScore: demoMetrics.seoValues.projectedAuthorityScore,
  rankingKeywords: demoMetrics.seoValues.rankingKeywords,
  competitorKeywords: demoMetrics.seoValues.competitorKeywords,
  localSeoScore: demoMetrics.seoValues.localSeoScore,
  projectedLocalSeoScore: demoMetrics.seoValues.projectedLocalSeoScore,
  technicalScore: demoMetrics.seoValues.technicalScore,
  projectedTechnicalScore: demoMetrics.seoValues.projectedTechnicalScore,
  contentScore: demoMetrics.seoValues.contentScore,
  projectedContentScore: demoMetrics.seoValues.projectedContentScore,
  missingTrafficValue: demoMetrics.seoValues.organicTrafficValue,
} as const;

if (process.env.NODE_ENV !== "production") {
  console.info("[metrics-check]", {
    requestedMode: configuredMode,
    effectiveMode: dataMode,
    configuredMonthlyRevenue: baseline.monthlyRevenue,
    formulaMonthlyRevenue: baselineFormulaRevenue,
    consistent: Math.abs(baseline.monthlyRevenue - baselineFormulaRevenue) <= 100,
  });
}
