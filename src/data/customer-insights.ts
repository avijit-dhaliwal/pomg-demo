export interface CustomerSegment {
  segment: string;
  count: number;
  revenue: number;
  avgOrders: number;
  avgLTV: number;
  retentionRate: number;
  color: string;
}

export interface TopCustomer {
  name: string;
  totalSpent: number;
  orders: number;
  lastOrder: string;
  favoriteCategory: string;
  segment: "VIP" | "Regular" | "New";
  nfaItems: number;
}

export interface ProductAffinity {
  product1: string;
  product2: string;
  cooccurrence: number;
  confidence: number;
}

export interface CohortData {
  cohort: string;
  month1: number;
  month2: number;
  month3: number;
  month6: number;
  month12: number;
}

export const customerSegments: CustomerSegment[] = [
  {
    segment: "VIP Collectors",
    count: 42,
    revenue: 218400,
    avgOrders: 8.2,
    avgLTV: 5200,
    retentionRate: 92,
    color: "#C9A84C",
  },
  {
    segment: "NFA Enthusiasts",
    count: 78,
    revenue: 147600,
    avgOrders: 4.1,
    avgLTV: 1892,
    retentionRate: 84,
    color: "#43437A",
  },
  {
    segment: "Regular Buyers",
    count: 234,
    revenue: 98200,
    avgOrders: 2.4,
    avgLTV: 420,
    retentionRate: 56,
    color: "#5a5a9e",
  },
  {
    segment: "First-Time Buyers",
    count: 189,
    revenue: 38400,
    avgOrders: 1.0,
    avgLTV: 203,
    retentionRate: 28,
    color: "#71717a",
  },
];

export const topCustomers: TopCustomer[] = [
  { name: "Marcus W.", totalSpent: 18420, orders: 12, lastOrder: "2026-02-14", favoriteCategory: "Firearms", segment: "VIP", nfaItems: 3 },
  { name: "Jake M.", totalSpent: 14890, orders: 9, lastOrder: "2026-02-08", favoriteCategory: "Silencers", segment: "VIP", nfaItems: 4 },
  { name: "Ryan K.", totalSpent: 12340, orders: 7, lastOrder: "2026-01-28", favoriteCategory: "Firearms", segment: "VIP", nfaItems: 2 },
  { name: "David L.", totalSpent: 9870, orders: 6, lastOrder: "2026-02-20", favoriteCategory: "Optics", segment: "VIP", nfaItems: 1 },
  { name: "Sarah T.", totalSpent: 8450, orders: 5, lastOrder: "2026-02-12", favoriteCategory: "Accessories", segment: "VIP", nfaItems: 2 },
  { name: "Chris P.", totalSpent: 7290, orders: 5, lastOrder: "2026-01-15", favoriteCategory: "Silencers", segment: "Regular", nfaItems: 2 },
  { name: "Tyler S.", totalSpent: 6840, orders: 4, lastOrder: "2026-02-01", favoriteCategory: "Firearms", segment: "Regular", nfaItems: 1 },
  { name: "Amanda R.", totalSpent: 5670, orders: 3, lastOrder: "2026-01-22", favoriteCategory: "Accessories", segment: "Regular", nfaItems: 1 },
  { name: "Kevin H.", totalSpent: 4920, orders: 3, lastOrder: "2026-02-18", favoriteCategory: "Silencers", segment: "Regular", nfaItems: 1 },
  { name: "Brian M.", totalSpent: 4100, orders: 2, lastOrder: "2026-02-05", favoriteCategory: "Optics", segment: "New", nfaItems: 1 },
];

export const productAffinities: ProductAffinity[] = [
  { product1: "Dead Air Sandman-S", product2: "Dead Air KeyMo Adapter", cooccurrence: 87, confidence: 0.92 },
  { product1: "Noveske Gen 4 N4-PDW", product2: "EOTech EXPS3-0", cooccurrence: 64, confidence: 0.78 },
  { product1: "Daniel Defense DDM4 V7", product2: "Magpul PMAG 30 Gen M3", cooccurrence: 58, confidence: 0.85 },
  { product1: "HK SP5", product2: "Dead Air Wolfman", cooccurrence: 52, confidence: 0.71 },
  { product1: "Aimpoint Micro T-2", product2: "Unity FAST Micro Mount", cooccurrence: 47, confidence: 0.88 },
  { product1: "SIG MCX Spear LT", product2: "SIG SLX 7.62 QD", cooccurrence: 41, confidence: 0.65 },
  { product1: "Any Rifle", product2: "SureFire M600DF Scout", cooccurrence: 39, confidence: 0.54 },
  { product1: "Any Suppressor", product2: "Dead Air KeyMicro Brake", cooccurrence: 34, confidence: 0.72 },
];

export const cohortRetention: CohortData[] = [
  { cohort: "Aug 2025", month1: 100, month2: 42, month3: 31, month6: 22, month12: 18 },
  { cohort: "Sep 2025", month1: 100, month2: 38, month3: 28, month6: 19, month12: 0 },
  { cohort: "Oct 2025", month1: 100, month2: 45, month3: 34, month6: 0, month12: 0 },
  { cohort: "Nov 2025", month1: 100, month2: 41, month3: 29, month6: 0, month12: 0 },
  { cohort: "Dec 2025", month1: 100, month2: 48, month3: 0, month6: 0, month12: 0 },
  { cohort: "Jan 2026", month1: 100, month2: 44, month3: 0, month6: 0, month12: 0 },
];

export const customerStats = {
  totalCustomers: 543,
  activeCustomers: 312,
  repeatPurchaseRate: 34.2,
  averageLTV: 924,
  topSegmentRevenue: 218400,
  nfaCustomers: 78,
  averageNfaSpend: 1892,
  emailCaptureRate: 72,
  referralRate: 18,
  churnRate: 8.4,
};
