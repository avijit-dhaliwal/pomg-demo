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

// 30 days of simulated daily metrics
export const dailyMetrics: DailyMetric[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 1, i + 1);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const base = isWeekend ? 380 : 290;
  const visitors = base + Math.floor(Math.random() * 120);
  const pageViews = Math.floor(visitors * (2.8 + Math.random() * 1.2));
  const addToCart = Math.floor(visitors * (0.06 + Math.random() * 0.04));
  const checkouts = Math.floor(addToCart * (0.35 + Math.random() * 0.2));
  const orders = Math.floor(checkouts * (0.7 + Math.random() * 0.2));
  const aov = 420 + Math.floor(Math.random() * 380);
  const revenue = orders * aov;

  return {
    date: date.toISOString().split("T")[0],
    visitors,
    pageViews,
    addToCart,
    checkouts,
    revenue,
    orders,
    aov,
    conversionRate: Number(((orders / visitors) * 100).toFixed(2)),
  };
});

export const categoryRevenue: CategoryRevenue[] = [
  { category: "Firearms", revenue: 287400, units: 98, avgPrice: 2933, conversionRate: 1.8 },
  { category: "Silencers", revenue: 84600, units: 78, avgPrice: 1085, conversionRate: 2.1 },
  { category: "Optics", revenue: 62300, units: 71, avgPrice: 877, conversionRate: 3.2 },
  { category: "Accessories", revenue: 41200, units: 287, avgPrice: 144, conversionRate: 5.4 },
  { category: "Knives", revenue: 18900, units: 55, avgPrice: 344, conversionRate: 4.1 },
  { category: "Apparel", revenue: 8200, units: 124, avgPrice: 66, conversionRate: 6.8 },
];

export const topProducts: TopProduct[] = [
  { name: "Noveske Gen 4 N4-PDW", revenue: 38340, units: 12, views: 1847, conversionRate: 0.65, trend: "up" },
  { name: "Dead Air Sandman-S", revenue: 31968, units: 32, views: 2103, conversionRate: 1.52, trend: "up" },
  { name: "Daniel Defense DDM4 V7", revenue: 28686, units: 14, views: 3241, conversionRate: 0.43, trend: "stable" },
  { name: "HK SP5", revenue: 26991, units: 9, views: 4102, conversionRate: 0.22, trend: "up" },
  { name: "EOTech EXPS3-0", revenue: 22715, units: 35, views: 1876, conversionRate: 1.87, trend: "stable" },
  { name: "SIG MCX Spear LT", revenue: 22392, units: 8, views: 2890, conversionRate: 0.28, trend: "up" },
  { name: "Aimpoint Micro T-2", revenue: 20376, units: 24, views: 1654, conversionRate: 1.45, trend: "up" },
  { name: "Geissele SSA-E Trigger", revenue: 16800, units: 70, views: 987, conversionRate: 7.09, trend: "stable" },
  { name: "Dead Air Wolfman", revenue: 15386, units: 14, views: 1432, conversionRate: 0.98, trend: "down" },
  { name: "Nighthawk President", revenue: 12897, units: 3, views: 876, conversionRate: 0.34, trend: "up" },
];

export const trafficSources: TrafficSource[] = [
  { source: "Organic Search", visitors: 4280, revenue: 198400, conversionRate: 2.1, percentage: 38 },
  { source: "Direct", visitors: 2810, revenue: 142300, conversionRate: 2.8, percentage: 25 },
  { source: "Social Media", visitors: 1690, revenue: 54200, conversionRate: 1.2, percentage: 15 },
  { source: "Email", visitors: 1240, revenue: 89100, conversionRate: 4.2, percentage: 11 },
  { source: "Referral", visitors: 790, revenue: 32600, conversionRate: 1.8, percentage: 7 },
  { source: "Paid Search", visitors: 450, revenue: 18400, conversionRate: 1.5, percentage: 4 },
];

export const conversionFunnel: FunnelStep[] = [
  { step: "Product Page View", count: 11260, percentage: 100, dropOff: 0 },
  { step: "Add to Cart", count: 1013, percentage: 9.0, dropOff: 91.0 },
  { step: "Begin Checkout", count: 456, percentage: 4.1, dropOff: 55.0 },
  { step: "Complete Purchase", count: 248, percentage: 2.2, dropOff: 45.6 },
];

export const stateTraffic: StateTraffic[] = [
  { state: "Utah", visitors: 2840, revenue: 134200, orders: 78 },
  { state: "Texas", visitors: 1920, revenue: 89400, orders: 52 },
  { state: "Florida", visitors: 1340, revenue: 62100, orders: 36 },
  { state: "Arizona", visitors: 980, revenue: 45600, orders: 24 },
  { state: "Idaho", visitors: 870, revenue: 41200, orders: 22 },
  { state: "Montana", visitors: 640, revenue: 31800, orders: 18 },
  { state: "Colorado", visitors: 580, revenue: 27400, orders: 15 },
  { state: "Nevada", visitors: 520, revenue: 24100, orders: 13 },
  { state: "Wyoming", visitors: 410, revenue: 19800, orders: 11 },
  { state: "Georgia", visitors: 380, revenue: 18200, orders: 10 },
];

// Summary metrics
export const summaryMetrics = {
  totalRevenue: 502600,
  totalOrders: 713,
  averageOrderValue: 705,
  conversionRate: 2.2,
  totalVisitors: 11260,
  returningVisitorRate: 34.2,
  cartAbandonmentRate: 55.0,
  emailSubscribers: 2847,
  monthOverMonthGrowth: 18.4,
  topManufacturerRevenue: { name: "Noveske", revenue: 67200 },
  nfaItemsInProcess: 24,
  averageNfaWaitDays: 187,
};

// Revenue projection model
export const revenueProjection = {
  current: {
    monthlyVisitors: 11260,
    conversionRate: 1.2,
    aov: 580,
    monthlyRevenue: 78331,
    annualRevenue: 939972,
  },
  projected: {
    monthlyVisitors: 16890, // +50% from SEO
    conversionRate: 1.8,    // +0.6% from UX improvements
    aov: 705,               // +21.5% from cross-sell/upsell
    monthlyRevenue: 214257,
    annualRevenue: 2571084,
  },
  improvements: [
    { area: "SEO & Content", impact: "+50% organic traffic", revenue: 39166 },
    { area: "Conversion Optimization", impact: "+0.6% conversion rate", revenue: 47032 },
    { area: "AOV Increase (Bundling)", impact: "+$125 average order", revenue: 31400 },
    { area: "Email Retention", impact: "12% repeat purchase rate", revenue: 18328 },
  ],
};
