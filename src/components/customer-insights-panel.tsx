"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  UserCheck,
  Repeat,
  DollarSign,
  Shield,
  Crown,
  ArrowRight,
  Link2,
  TrendingUp,
} from "lucide-react";
import {
  customerSegments,
  topCustomers,
  productAffinities,
  cohortRetention,
  customerStats,
} from "@/data/customer-insights";

/* ─── helpers ─── */
const formatCurrency = (n: number) => "$" + n.toLocaleString();
const formatNumber = (n: number) => n.toLocaleString();

/* ─── custom recharts tooltip ─── */
function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-pomg-card border border-pomg-border rounded-lg px-4 py-3 shadow-xl">
      <p className="text-pomg-text text-sm font-semibold">{data.segment}</p>
      <p className="text-pomg-muted text-xs mt-1">
        {formatNumber(data.count)} customers
      </p>
      <p className="text-pomg-muted text-xs">
        {formatCurrency(data.revenue)} revenue
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   A. Summary Stats Row
   ═══════════════════════════════════════════════════════ */
const kpis = [
  {
    label: "Total Customers",
    value: formatNumber(customerStats.totalCustomers),
    icon: Users,
    color: "text-pomg-purple-light",
  },
  {
    label: "Active Customers",
    value: formatNumber(customerStats.activeCustomers),
    icon: UserCheck,
    color: "text-green-400",
  },
  {
    label: "Repeat Purchase Rate",
    value: customerStats.repeatPurchaseRate + "%",
    icon: Repeat,
    color: "text-blue-400",
  },
  {
    label: "Average LTV",
    value: formatCurrency(customerStats.averageLTV),
    icon: DollarSign,
    color: "text-pomg-gold",
  },
  {
    label: "NFA Customers",
    value: formatNumber(customerStats.nfaCustomers),
    icon: Shield,
    color: "text-emerald-400",
  },
];

function SummaryStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.label}
            className="bg-pomg-card border border-pomg-border rounded-xl p-4 hover:border-pomg-purple/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-pomg-dark ${kpi.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-bold text-pomg-text tracking-tight">
              {kpi.value}
            </p>
            <p className="text-xs text-pomg-muted mt-1">{kpi.label}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   B. Customer Segments
   ═══════════════════════════════════════════════════════ */
function CustomerSegments() {
  const totalCustomers = customerSegments.reduce((s, seg) => s + seg.count, 0);

  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-pomg-text">
          Customer Segments
        </h3>
        <p className="text-sm text-pomg-muted mt-0.5">
          Breakdown by customer tier
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <div className="flex items-center justify-center">
          <div className="w-full h-[260px] relative">
            <ResponsiveContainer width="100%" height={260} minWidth={0}>
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  dataKey="count"
                  nameKey="segment"
                  stroke="none"
                  paddingAngle={2}
                >
                  {customerSegments.map((seg, i) => (
                    <Cell key={i} fill={seg.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-bold text-pomg-text">
                {formatNumber(totalCustomers)}
              </p>
              <p className="text-xs text-pomg-muted">Total</p>
            </div>
          </div>
        </div>

        {/* Segment Details */}
        <div className="space-y-3">
          {customerSegments.map((seg) => {
            const pct = ((seg.count / totalCustomers) * 100).toFixed(1);
            return (
              <div
                key={seg.segment}
                className="bg-pomg-dark border border-pomg-border rounded-lg p-4 hover:border-pomg-purple/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="text-sm font-semibold text-pomg-text">
                    {seg.segment}
                  </span>
                  <span className="ml-auto text-xs text-pomg-muted tabular-nums">
                    {pct}%
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-pomg-muted">Customers</p>
                    <p className="text-pomg-text font-semibold tabular-nums">
                      {formatNumber(seg.count)}
                    </p>
                  </div>
                  <div>
                    <p className="text-pomg-muted">Revenue</p>
                    <p className="text-pomg-text font-semibold tabular-nums">
                      {formatCurrency(seg.revenue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-pomg-muted">Retention</p>
                    <p className="text-pomg-text font-semibold tabular-nums">
                      {seg.retentionRate}%
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   C. Top Customers Table
   ═══════════════════════════════════════════════════════ */
const segmentBadgeClasses: Record<string, string> = {
  VIP: "bg-pomg-gold/15 text-pomg-gold border-pomg-gold/30",
  Regular: "bg-pomg-purple/15 text-pomg-purple-light border-pomg-purple/30",
  New: "bg-pomg-dim/15 text-pomg-muted border-pomg-dim/30",
};

function TopCustomersTable() {
  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-pomg-text">
            Top Customers
          </h3>
          <p className="text-sm text-pomg-muted mt-0.5">
            By lifetime spend &middot; Top 10
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-pomg-gold" />
          <span className="text-xs text-pomg-muted">
            {topCustomers.filter((c) => c.segment === "VIP").length} VIP
            customers
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-pomg-border">
              <th className="text-left text-pomg-muted font-medium pb-3 pr-4">
                Name
              </th>
              <th className="text-right text-pomg-muted font-medium pb-3 px-3">
                Total Spent
              </th>
              <th className="text-right text-pomg-muted font-medium pb-3 px-3">
                Orders
              </th>
              <th className="text-left text-pomg-muted font-medium pb-3 px-3">
                Last Order
              </th>
              <th className="text-left text-pomg-muted font-medium pb-3 px-3">
                Favorite Category
              </th>
              <th className="text-right text-pomg-muted font-medium pb-3 px-3">
                NFA Items
              </th>
              <th className="text-center text-pomg-muted font-medium pb-3 pl-3">
                Segment
              </th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((customer, i) => (
              <tr
                key={customer.name}
                className={`border-b border-pomg-border/50 hover:bg-pomg-dark/50 transition-colors ${
                  i % 2 === 0 ? "bg-pomg-card" : "bg-pomg-dark/30"
                }`}
              >
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    {customer.segment === "VIP" && (
                      <Crown className="w-3.5 h-3.5 text-pomg-gold shrink-0" />
                    )}
                    <span className="text-pomg-text font-medium">
                      {customer.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3 text-right text-pomg-text font-semibold tabular-nums">
                  {formatCurrency(customer.totalSpent)}
                </td>
                <td className="py-3 px-3 text-right text-pomg-muted tabular-nums">
                  {customer.orders}
                </td>
                <td className="py-3 px-3 text-left text-pomg-muted tabular-nums">
                  {new Date(customer.lastOrder).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 px-3 text-left text-pomg-muted">
                  {customer.favoriteCategory}
                </td>
                <td className="py-3 px-3 text-right text-pomg-muted tabular-nums">
                  {customer.nfaItems}
                </td>
                <td className="py-3 pl-3 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border ${
                      segmentBadgeClasses[customer.segment]
                    }`}
                  >
                    {customer.segment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   D. Product Affinity Map
   ═══════════════════════════════════════════════════════ */
function ProductAffinityMap() {
  const sortedAffinities = [...productAffinities]
    .sort((a, b) => b.cooccurrence - a.cooccurrence)
    .slice(0, 6);

  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-pomg-text">
            Product Affinity Map
          </h3>
          <p className="text-sm text-pomg-muted mt-0.5">
            Frequently bought together &middot; Top 6 pairs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-pomg-purple-light" />
          <span className="text-xs text-pomg-muted">
            {productAffinities.length} pairs tracked
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAffinities.map((pair, i) => {
          const confidencePct = Math.round(pair.confidence * 100);
          return (
            <div
              key={i}
              className="bg-pomg-dark border border-pomg-border rounded-lg p-4 hover:border-pomg-purple/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-pomg-gold tabular-nums">
                  #{i + 1}
                </span>
                <span className="text-xs text-pomg-muted">
                  {pair.cooccurrence} co-purchases
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-pomg-text truncate">
                    {pair.product1}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-1 px-2">
                  <ArrowRight className="w-4 h-4 text-pomg-purple-light" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-pomg-text truncate">
                    {pair.product2}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-pomg-border/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-pomg-muted">Confidence</span>
                  <span className="text-xs font-semibold text-pomg-purple-light tabular-nums">
                    {confidencePct}%
                  </span>
                </div>
                <div className="h-1.5 bg-pomg-surface rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#43437A] to-[#5a5a9e]"
                    style={{ width: `${confidencePct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   E. Cohort Retention Heatmap
   ═══════════════════════════════════════════════════════ */
const retentionColumns: { key: keyof (typeof cohortRetention)[0]; label: string }[] = [
  { key: "month1", label: "M1" },
  { key: "month2", label: "M2" },
  { key: "month3", label: "M3" },
  { key: "month6", label: "M6" },
  { key: "month12", label: "M12" },
];

function CohortRetentionHeatmap() {
  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-pomg-text">
            Cohort Retention
          </h3>
          <p className="text-sm text-pomg-muted mt-0.5">
            Customer retention by signup month
          </p>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-pomg-purple-light" />
          <span className="text-xs text-pomg-muted">
            {cohortRetention.length} cohorts
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-pomg-border">
              <th className="text-left text-pomg-muted font-medium pb-3 pr-4 whitespace-nowrap">
                Cohort
              </th>
              {retentionColumns.map((col) => (
                <th
                  key={col.key}
                  className="text-center text-pomg-muted font-medium pb-3 px-2 min-w-[56px]"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cohortRetention.map((row, rowIdx) => (
              <tr
                key={row.cohort}
                className={`border-b border-pomg-border/50 ${
                  rowIdx % 2 === 0 ? "bg-pomg-card" : "bg-pomg-dark/30"
                }`}
              >
                <td className="py-2.5 pr-4 text-pomg-text font-medium whitespace-nowrap">
                  {row.cohort}
                </td>
                {retentionColumns.map((col) => {
                  const val = row[col.key] as number;
                  const isEmpty = val === 0 && col.key !== "month1";
                  const opacity =
                    val === 0
                      ? 0
                      : val <= 20
                        ? 0.2
                        : val <= 35
                          ? 0.35
                          : val <= 50
                            ? 0.5
                            : val <= 75
                              ? 0.65
                              : val <= 90
                                ? 0.8
                                : 1;

                  return (
                    <td key={col.key} className="py-2.5 px-2 text-center">
                      {isEmpty ? (
                        <span className="text-pomg-dim">&mdash;</span>
                      ) : (
                        <span
                          className="inline-flex items-center justify-center w-12 h-8 rounded-md text-xs font-semibold tabular-nums"
                          style={{
                            backgroundColor: `rgba(67, 67, 122, ${opacity})`,
                            color:
                              opacity >= 0.5
                                ? "#e4e4e7"
                                : opacity > 0
                                  ? "#b5b6dc"
                                  : "#71717a",
                          }}
                        >
                          {val}%
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-pomg-border">
        <span className="text-xs text-pomg-muted">Retention:</span>
        <div className="flex items-center gap-1">
          {[0.15, 0.3, 0.5, 0.7, 0.9].map((op, i) => (
            <div
              key={i}
              className="w-6 h-4 rounded-sm"
              style={{ backgroundColor: `rgba(67, 67, 122, ${op})` }}
            />
          ))}
        </div>
        <span className="text-xs text-pomg-muted">Low</span>
        <span className="text-xs text-pomg-dim mx-1">&rarr;</span>
        <span className="text-xs text-pomg-muted">High</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function CustomerInsightsPanel() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-pomg-text">
            Customer Insights
          </h2>
          <p className="text-sm text-pomg-muted mt-1">
            February 2026 &middot; Customer Intelligence
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 text-xs font-medium bg-pomg-dark border border-pomg-border rounded-lg text-pomg-muted">
            {formatNumber(customerStats.totalCustomers)} total
          </span>
          <span className="px-3 py-1.5 text-xs font-medium bg-pomg-purple/20 border border-pomg-purple/40 rounded-lg text-pomg-purple-light">
            {customerStats.churnRate}% churn
          </span>
        </div>
      </div>

      {/* A. Summary Stats */}
      <SummaryStats />

      {/* B. Customer Segments */}
      <CustomerSegments />

      {/* C. Top Customers Table */}
      <TopCustomersTable />

      {/* D. Product Affinity Map */}
      <ProductAffinityMap />

      {/* E. Cohort Retention Heatmap */}
      <CohortRetentionHeatmap />
    </div>
  );
}
