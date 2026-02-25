import { revenueModel, summaryMetricsModel } from "@/lib/demoMetrics";

export interface DailyMetric {
  date: string;
  visitors: number;
  pageViews: number;
  addToCart: number;
  checkouts: number;
  revenue: number;
  orders: number;
  aov: number;
  conversionRate: number;
}

export interface CategoryRevenue {
  category: string;
  revenue: number;
  units: number;
  avgPrice: number;
  conversionRate: number;
}

export interface TopProduct {
  name: string;
  revenue: number;
  units: number;
  views: number;
  conversionRate: number;
  trend: "up" | "down" | "stable";
}

export interface TrafficSource {
  source: string;
  visitors: number;
  revenue: number;
  conversionRate: number;
  percentage: number;
}

export interface FunnelStep {
  step: string;
  count: number;
  percentage: number;
  dropOff: number;
}

export interface StateTraffic {
  state: string;
  visitors: number;
  revenue: number;
  orders: number;
}

function allocateByWeights(total: number, weights: number[]): number[] {
  const weightSum = weights.reduce((sum, value) => sum + value, 0);
  const raw = weights.map((weight) => (weight / weightSum) * total);
  const base = raw.map((value) => Math.floor(value));

  let remainder = total - base.reduce((sum, value) => sum + value, 0);
  const order = raw
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction);

  let cursor = 0;
  while (remainder > 0) {
    base[order[cursor % order.length].index] += 1;
    remainder -= 1;
    cursor += 1;
  }

  return base;
}

const dayWeights = Array.from({ length: 30 }, (_, index) => {
  const day = index + 1;
  const weekendBoost = day % 7 === 6 || day % 7 === 0 ? 1.15 : 1;
  const seasonalWave = 1 + 0.12 * Math.sin((index / 30) * Math.PI * 2);
  return Number((weekendBoost * seasonalWave).toFixed(4));
});

const visitorSeries = allocateByWeights(summaryMetricsModel.totalVisitors, dayWeights);
const orderSeries = allocateByWeights(summaryMetricsModel.totalOrders, dayWeights);
const revenueSeries = allocateByWeights(summaryMetricsModel.totalRevenue, dayWeights);

// 30 days of deterministic simulated daily metrics.
export const dailyMetrics: DailyMetric[] = Array.from({ length: 30 }, (_, i) => {
  const visitors = visitorSeries[i];
  const orders = Math.max(orderSeries[i], 1);
  const revenue = revenueSeries[i];
  const addToCart = Math.max(Math.round(visitors * 0.09), orders + 6);
  const checkouts = Math.max(Math.round(addToCart * 0.45), orders + 2);

  return {
    date: new Date(Date.UTC(2026, 1, i + 1)).toISOString().split("T")[0],
    visitors,
    pageViews: Math.round(visitors * 3.1),
    addToCart,
    checkouts,
    revenue,
    orders,
    aov: Math.round(revenue / orders),
    conversionRate: Number(((orders / visitors) * 100).toFixed(2)),
  };
});

const categoryDefinitions = [
  { category: "Firearms", share: 0.57, avgPrice: 2933, conversionRate: 1.8 },
  { category: "Silencers", share: 0.17, avgPrice: 1085, conversionRate: 2.1 },
  { category: "Optics", share: 0.12, avgPrice: 877, conversionRate: 3.2 },
  { category: "Accessories", share: 0.08, avgPrice: 144, conversionRate: 5.4 },
  { category: "Knives", share: 0.04, avgPrice: 344, conversionRate: 4.1 },
  { category: "Apparel", share: 0.02, avgPrice: 66, conversionRate: 6.8 },
] as const;

const categoryRevenueValues = allocateByWeights(
  summaryMetricsModel.totalRevenue,
  categoryDefinitions.map((category) => category.share),
);

export const categoryRevenue: CategoryRevenue[] = categoryDefinitions.map(
  (category, index) => {
    const revenue = categoryRevenueValues[index];
    return {
      category: category.category,
      revenue,
      units: Math.max(Math.round(revenue / category.avgPrice), 1),
      avgPrice: category.avgPrice,
      conversionRate: category.conversionRate,
    };
  },
);

const topProductDefinitions = [
  { name: "Noveske Gen 4 N4-PDW", avgPrice: 3195, views: 1847, trend: "up", share: 0.17 },
  { name: "Dead Air Sandman-S", avgPrice: 949, views: 2103, trend: "up", share: 0.15 },
  { name: "Daniel Defense DDM4 V7", avgPrice: 2125, views: 3241, trend: "stable", share: 0.13 },
  { name: "HK SP5", avgPrice: 2999, views: 4102, trend: "up", share: 0.11 },
  { name: "EOTech EXPS3-0", avgPrice: 729, views: 1876, trend: "stable", share: 0.1 },
  { name: "SIG MCX Spear LT", avgPrice: 2599, views: 2890, trend: "up", share: 0.09 },
  { name: "Aimpoint Micro T-2", avgPrice: 839, views: 1654, trend: "up", share: 0.08 },
  { name: "Geissele SSA-E Trigger", avgPrice: 245, views: 987, trend: "stable", share: 0.07 },
  { name: "Dead Air Wolfman", avgPrice: 899, views: 1432, trend: "down", share: 0.06 },
  { name: "Nighthawk President", avgPrice: 4299, views: 876, trend: "up", share: 0.04 },
] as const;

const topProductRevenuePool = Math.round(summaryMetricsModel.totalRevenue * 0.82);
const topProductRevenueValues = allocateByWeights(
  topProductRevenuePool,
  topProductDefinitions.map((product) => product.share),
);

export const topProducts: TopProduct[] = topProductDefinitions.map(
  (product, index) => {
    const revenue = topProductRevenueValues[index];
    const units = Math.max(Math.round(revenue / product.avgPrice), 1);
    const conversionRate = Number(((units / product.views) * 100).toFixed(2));

    return {
      name: product.name,
      revenue,
      units,
      views: product.views,
      conversionRate,
      trend: product.trend,
    };
  },
);

const trafficSourceDefinitions = [
  { source: "Organic Search", share: 0.38, conversionRate: 3.0 },
  { source: "Direct", share: 0.24, conversionRate: 3.1 },
  { source: "Social Media", share: 0.14, conversionRate: 1.8 },
  { source: "Email", share: 0.12, conversionRate: 4.6 },
  { source: "Referral", share: 0.07, conversionRate: 2.3 },
  { source: "Paid Search", share: 0.05, conversionRate: 1.9 },
] as const;

const trafficVisitors = allocateByWeights(
  summaryMetricsModel.totalVisitors,
  trafficSourceDefinitions.map((source) => source.share),
);
const trafficRevenue = allocateByWeights(
  summaryMetricsModel.totalRevenue,
  trafficSourceDefinitions.map((source) => source.share),
);

export const trafficSources: TrafficSource[] = trafficSourceDefinitions.map(
  (source, index) => ({
    source: source.source,
    visitors: trafficVisitors[index],
    revenue: trafficRevenue[index],
    conversionRate: source.conversionRate,
    percentage: Number((source.share * 100).toFixed(0)),
  }),
);

const productViews = summaryMetricsModel.totalVisitors;
const addToCartCount = Math.round(productViews * 0.09);
const beginCheckoutCount = Math.round(addToCartCount * 0.45);
const completedPurchaseCount = summaryMetricsModel.totalOrders;

const conversionFunnelCounts = [
  productViews,
  addToCartCount,
  beginCheckoutCount,
  completedPurchaseCount,
];

const conversionFunnelSteps = [
  "Product Page View",
  "Add to Cart",
  "Begin Checkout",
  "Complete Purchase",
] as const;

export const conversionFunnel: FunnelStep[] = conversionFunnelSteps.map(
  (step, index) => {
    const count = conversionFunnelCounts[index];
    const previous = conversionFunnelCounts[index - 1] ?? count;

    return {
      step,
      count,
      percentage: Number(((count / productViews) * 100).toFixed(1)),
      dropOff:
        index === 0
          ? 0
          : Number((100 - (count / previous) * 100).toFixed(1)),
    };
  },
);

const stateDefinitions = [
  { state: "Utah", share: 0.26 },
  { state: "Texas", share: 0.17 },
  { state: "Florida", share: 0.12 },
  { state: "Arizona", share: 0.09 },
  { state: "Idaho", share: 0.08 },
  { state: "Montana", share: 0.06 },
  { state: "Colorado", share: 0.06 },
  { state: "Nevada", share: 0.06 },
  { state: "Wyoming", share: 0.05 },
  { state: "Georgia", share: 0.05 },
] as const;

const stateVisitors = allocateByWeights(
  summaryMetricsModel.totalVisitors,
  stateDefinitions.map((state) => state.share),
);
const stateRevenue = allocateByWeights(
  summaryMetricsModel.totalRevenue,
  stateDefinitions.map((state) => state.share),
);
const stateOrders = allocateByWeights(
  summaryMetricsModel.totalOrders,
  stateDefinitions.map((state) => state.share),
);

export const stateTraffic: StateTraffic[] = stateDefinitions.map((state, index) => ({
  state: state.state,
  visitors: stateVisitors[index],
  revenue: stateRevenue[index],
  orders: stateOrders[index],
}));

// Summary metrics are derived from centralized demo metrics.
export const summaryMetrics = summaryMetricsModel;

// Revenue projection model is derived from centralized demo metrics.
export const revenueProjection = revenueModel;
