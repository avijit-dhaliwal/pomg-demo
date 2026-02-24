"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  BarChart3,
  Users,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ChevronRight,
  Target,
  Zap,
} from "lucide-react";
import {
  dailyMetrics,
  categoryRevenue,
  topProducts,
  trafficSources,
  conversionFunnel,
  summaryMetrics,
  revenueProjection,
} from "@/data/analytics";

/* ─── helpers ─── */
const formatCurrency = (n: number) => "$" + n.toLocaleString();
const formatNumber = (n: number) => n.toLocaleString();

/* ─── custom recharts tooltip ─── */
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-pomg-card border border-pomg-border rounded-lg px-4 py-3 shadow-xl">
      <p className="text-pomg-muted text-xs mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-pomg-text text-sm font-semibold">
          {entry.name}: {typeof entry.value === "number" && entry.name?.toLowerCase().includes("rev")
            ? formatCurrency(entry.value)
            : formatNumber(entry.value)}
        </p>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   A. Summary KPI Cards
   ═══════════════════════════════════════════════════════ */
const kpis = [
  {
    label: "Total Revenue",
    value: formatCurrency(summaryMetrics.totalRevenue),
    trend: "+18.4%",
    trendUp: true,
    icon: DollarSign,
    color: "text-green-400",
  },
  {
    label: "Total Orders",
    value: formatNumber(summaryMetrics.totalOrders),
    trend: "+12.1%",
    trendUp: true,
    icon: ShoppingBag,
    color: "text-pomg-purple-light",
  },
  {
    label: "Avg Order Value",
    value: formatCurrency(summaryMetrics.averageOrderValue),
    trend: "+5.6%",
    trendUp: true,
    icon: TrendingUp,
    color: "text-pomg-gold",
  },
  {
    label: "Conversion Rate",
    value: summaryMetrics.conversionRate + "%",
    trend: "+0.3%",
    trendUp: true,
    icon: BarChart3,
    color: "text-blue-400",
  },
  {
    label: "MoM Growth",
    value: "+" + summaryMetrics.monthOverMonthGrowth + "%",
    trend: "+4.2pp",
    trendUp: true,
    icon: Users,
    color: "text-emerald-400",
  },
  {
    label: "Email Subscribers",
    value: formatNumber(summaryMetrics.emailSubscribers),
    trend: "+214",
    trendUp: true,
    icon: Mail,
    color: "text-purple-400",
  },
];

function KPICards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.label}
            className="bg-pomg-card border border-pomg-border rounded-xl p-4 hover:border-pomg-purple/40 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-pomg-dark ${kpi.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-green-400">
                {kpi.trendUp ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-400" />
                )}
                {kpi.trend}
              </span>
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
   B. Revenue Chart
   ═══════════════════════════════════════════════════════ */
function RevenueChart() {
  const chartData = dailyMetrics.map((d) => ({
    date: new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    Revenue: d.revenue,
    Orders: d.orders,
  }));

  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-pomg-text">
            Revenue Overview
          </h3>
          <p className="text-sm text-pomg-muted mt-0.5">
            Daily revenue &middot; Last 30 days
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded bg-[#43437A]" />
            <span className="text-pomg-muted">Revenue</span>
          </span>
        </div>
      </div>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height={320} minWidth={0}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#43437A" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#43437A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e1e2e"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "#71717a", fontSize: 11 }}
              axisLine={{ stroke: "#1e1e2e" }}
              tickLine={false}
              interval={4}
            />
            <YAxis
              tick={{ fill: "#71717a", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => "$" + (v / 1000).toFixed(0) + "k"}
              width={55}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="Revenue"
              stroke="#43437A"
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              dot={false}
              activeDot={{
                r: 5,
                stroke: "#43437A",
                strokeWidth: 2,
                fill: "#0a0a0f",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   C. Conversion Funnel
   ═══════════════════════════════════════════════════════ */
const funnelColors = [
  "from-[#43437A] to-[#5a5a9e]",
  "from-[#3d3d6e] to-[#4e4e8a]",
  "from-[#353562] to-[#434378]",
  "from-[#2d2d56] to-[#3a3a6a]",
];

function ConversionFunnel() {
  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-pomg-text">
          Conversion Funnel
        </h3>
        <p className="text-sm text-pomg-muted mt-0.5">
          Visitor journey &middot; Product view to purchase
        </p>
      </div>
      <div className="space-y-3">
        {conversionFunnel.map((step, i) => {
          const widthPct = Math.max(step.percentage, 8); // minimum visible width
          return (
            <div key={step.step}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-pomg-text">
                  {step.step}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-pomg-text">
                    {formatNumber(step.count)}
                  </span>
                  <span className="text-xs text-pomg-muted w-14 text-right">
                    {step.percentage}%
                  </span>
                </div>
              </div>
              <div className="relative h-8 bg-pomg-dark rounded-lg overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${funnelColors[i]} rounded-lg transition-all duration-700`}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
              {i < conversionFunnel.length - 1 && (
                <div className="flex items-center justify-end mt-1 gap-1">
                  <ArrowDownRight className="w-3 h-3 text-red-400/70" />
                  <span className="text-xs text-red-400/70">
                    {conversionFunnel[i + 1].dropOff}% drop-off
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   D. Top Products Table
   ═══════════════════════════════════════════════════════ */
function TopProductsTable() {
  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-pomg-text">
            Top Products
          </h3>
          <p className="text-sm text-pomg-muted mt-0.5">
            By revenue &middot; This month
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-pomg-border">
              <th className="text-left text-pomg-muted font-medium pb-3 pr-4">
                Product
              </th>
              <th className="text-right text-pomg-muted font-medium pb-3 px-3">
                Revenue
              </th>
              <th className="text-right text-pomg-muted font-medium pb-3 px-3">
                Units
              </th>
              <th className="text-right text-pomg-muted font-medium pb-3 px-3">
                Views
              </th>
              <th className="text-right text-pomg-muted font-medium pb-3 px-3">
                Conv. Rate
              </th>
              <th className="text-center text-pomg-muted font-medium pb-3 pl-3">
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, i) => (
              <tr
                key={product.name}
                className={`border-b border-pomg-border/50 hover:bg-pomg-dark/50 transition-colors ${
                  i % 2 === 0 ? "bg-pomg-card" : "bg-pomg-dark/30"
                }`}
              >
                <td className="py-3 pr-4">
                  <span className="text-pomg-text font-medium">
                    {product.name}
                  </span>
                </td>
                <td className="py-3 px-3 text-right text-pomg-text font-semibold tabular-nums">
                  {formatCurrency(product.revenue)}
                </td>
                <td className="py-3 px-3 text-right text-pomg-muted tabular-nums">
                  {product.units}
                </td>
                <td className="py-3 px-3 text-right text-pomg-muted tabular-nums">
                  {formatNumber(product.views)}
                </td>
                <td className="py-3 px-3 text-right text-pomg-muted tabular-nums">
                  {product.conversionRate}%
                </td>
                <td className="py-3 pl-3 text-center">
                  {product.trend === "up" && (
                    <ArrowUpRight className="w-4 h-4 text-green-400 inline" />
                  )}
                  {product.trend === "down" && (
                    <ArrowDownRight className="w-4 h-4 text-red-400 inline" />
                  )}
                  {product.trend === "stable" && (
                    <Minus className="w-4 h-4 text-pomg-muted inline" />
                  )}
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
   E. Traffic Sources
   ═══════════════════════════════════════════════════════ */
function TrafficSources() {
  const maxPercentage = Math.max(...trafficSources.map((s) => s.percentage));
  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-pomg-text">
          Traffic Sources
        </h3>
        <p className="text-sm text-pomg-muted mt-0.5">
          Where your visitors come from
        </p>
      </div>
      <div className="space-y-4">
        {trafficSources.map((source) => (
          <div key={source.source} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-pomg-text">
                {source.source}
              </span>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-pomg-muted">
                  {formatCurrency(source.revenue)}
                </span>
                <span className="text-pomg-text font-semibold w-10 text-right tabular-nums">
                  {source.percentage}%
                </span>
              </div>
            </div>
            <div className="relative h-5 bg-pomg-dark rounded-md overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#43437A] to-[#5a5a9e] rounded-md group-hover:to-[#6e6eb5] transition-all duration-300"
                style={{
                  width: `${(source.percentage / maxPercentage) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   F. Revenue by Category
   ═══════════════════════════════════════════════════════ */
function CategoryRevenueChart() {
  const chartData = categoryRevenue.map((c) => ({
    category: c.category,
    Revenue: c.revenue,
  }));

  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-pomg-text">
          Revenue by Category
        </h3>
        <p className="text-sm text-pomg-muted mt-0.5">
          Category breakdown &middot; This month
        </p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height={280} minWidth={0}>
          <BarChart data={chartData} barCategoryGap="20%">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e1e2e"
              vertical={false}
            />
            <XAxis
              dataKey="category"
              tick={{ fill: "#71717a", fontSize: 11 }}
              axisLine={{ stroke: "#1e1e2e" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#71717a", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => "$" + (v / 1000).toFixed(0) + "k"}
              width={55}
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar
              dataKey="Revenue"
              fill="#43437A"
              radius={[6, 6, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   G. Revenue Projection
   ═══════════════════════════════════════════════════════ */
function RevenueProjection() {
  const { current, projected, improvements } = revenueProjection;
  const annualDelta = projected.annualRevenue - current.annualRevenue;
  const monthlyDelta = projected.monthlyRevenue - current.monthlyRevenue;

  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-pomg-text">
          Revenue Projection
        </h3>
        <p className="text-sm text-pomg-muted mt-0.5">
          With recommended optimizations
        </p>
      </div>

      {/* Current vs Projected big numbers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Current */}
        <div className="bg-pomg-dark border border-pomg-border rounded-xl p-5">
          <p className="text-xs text-pomg-muted uppercase tracking-wider mb-2">
            Current Monthly
          </p>
          <p className="text-2xl font-bold text-pomg-text tabular-nums">
            {formatCurrency(current.monthlyRevenue)}
          </p>
          <p className="text-xs text-pomg-muted mt-1">
            {formatCurrency(current.annualRevenue)}/yr
          </p>
          <div className="mt-3 pt-3 border-t border-pomg-border space-y-1 text-xs text-pomg-muted">
            <p>{formatNumber(current.monthlyVisitors)} visitors/mo</p>
            <p>{current.conversionRate}% conversion</p>
            <p>{formatCurrency(current.aov)} AOV</p>
          </div>
        </div>

        {/* Delta arrow */}
        <div className="flex flex-col items-center justify-center">
          <div className="p-3 rounded-full bg-pomg-dark border border-pomg-border mb-3">
            <ChevronRight className="w-6 h-6 text-pomg-gold" />
          </div>
          <p className="text-2xl font-bold text-green-400 tabular-nums">
            +{formatCurrency(monthlyDelta)}
          </p>
          <p className="text-xs text-pomg-muted mt-1">/month increase</p>
          <p className="text-lg font-semibold text-green-400/80 mt-2 tabular-nums">
            +{formatCurrency(annualDelta)}
          </p>
          <p className="text-xs text-pomg-muted">/year increase</p>
        </div>

        {/* Projected */}
        <div className="bg-pomg-dark border-2 border-pomg-purple/50 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#43437A]/10 to-transparent" />
          <div className="relative">
            <p className="text-xs text-pomg-gold uppercase tracking-wider mb-2 font-semibold">
              Projected Monthly
            </p>
            <p className="text-3xl font-bold text-pomg-text tabular-nums">
              {formatCurrency(projected.monthlyRevenue)}
            </p>
            <p className="text-sm text-pomg-gold font-medium mt-1">
              {formatCurrency(projected.annualRevenue)}/yr
            </p>
            <div className="mt-3 pt-3 border-t border-pomg-border space-y-1 text-xs text-pomg-muted">
              <p>{formatNumber(projected.monthlyVisitors)} visitors/mo</p>
              <p>{projected.conversionRate}% conversion</p>
              <p>{formatCurrency(projected.aov)} AOV</p>
            </div>
          </div>
        </div>
      </div>

      {/* Improvement areas */}
      <div>
        <h4 className="text-sm font-semibold text-pomg-text mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-pomg-gold" />
          Optimization Breakdown
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {improvements.map((imp) => (
            <div
              key={imp.area}
              className="bg-pomg-dark border border-pomg-border rounded-lg p-4 flex items-start gap-3 hover:border-pomg-purple/40 transition-colors"
            >
              <div className="p-1.5 rounded-md bg-pomg-card">
                <Target className="w-3.5 h-3.5 text-pomg-purple-light" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-pomg-text">
                  {imp.area}
                </p>
                <p className="text-xs text-pomg-muted mt-0.5">{imp.impact}</p>
              </div>
              <span className="text-sm font-semibold text-green-400 whitespace-nowrap tabular-nums">
                +{formatCurrency(imp.revenue)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN DASHBOARD COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-pomg-text">Analytics</h2>
          <p className="text-sm text-pomg-muted mt-1">
            February 2026 &middot; Store Performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 text-xs font-medium bg-pomg-dark border border-pomg-border rounded-lg text-pomg-muted">
            Last 30 days
          </span>
          <span className="px-3 py-1.5 text-xs font-medium bg-pomg-purple/20 border border-pomg-purple/40 rounded-lg text-pomg-purple-light">
            Live
          </span>
        </div>
      </div>

      {/* A. KPI Cards */}
      <KPICards />

      {/* B. Revenue Chart */}
      <RevenueChart />

      {/* C + E: Funnel and Traffic side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConversionFunnel />
        <TrafficSources />
      </div>

      {/* D. Top Products Table */}
      <TopProductsTable />

      {/* F. Category Revenue Chart */}
      <CategoryRevenueChart />

      {/* G. Revenue Projection */}
      <RevenueProjection />
    </div>
  );
}
