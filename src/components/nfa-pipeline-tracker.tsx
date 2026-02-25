"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FileText,
  Send,
  Search,
  CheckCircle2,
  Package,
  DollarSign,
  Clock,
  Zap,
  Hourglass,
} from "lucide-react";
import {
  NFAApplication,
  nfaApplications,
  nfaPipelineStats,
} from "@/data/nfa-pipeline";
import { isDemoMode } from "@/lib/demoMetrics";

/* ─── helpers ─── */
const formatCurrency = (n: number) => "$" + n.toLocaleString();

interface ChartTooltipEntry {
  name?: string;
  value?: number | string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipEntry[];
  label?: string;
}

const statusPriority: Record<NFAApplication["status"], number> = {
  "Ready for Pickup": 0,
  Approved: 1,
  "In Review": 2,
  Submitted: 3,
  "Pending Docs": 4,
};

const statusColors: Record<NFAApplication["status"], string> = {
  "Pending Docs": "bg-pomg-dim/20 text-pomg-dim border-pomg-dim/30",
  Submitted: "bg-blue-400/15 text-blue-400 border-blue-400/30",
  "In Review": "bg-pomg-purple/20 text-pomg-purple-light border-pomg-purple/30",
  Approved: "bg-green-400/15 text-green-400 border-green-400/30",
  "Ready for Pickup": "bg-pomg-gold/15 text-pomg-gold border-pomg-gold/30",
};

/* ─── custom recharts tooltip ─── */
function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-pomg-card border border-pomg-border rounded-lg px-4 py-3 shadow-xl">
      <p className="text-pomg-muted text-xs mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-pomg-text text-sm font-semibold">
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   A. Pipeline Status Cards
   ═══════════════════════════════════════════════════════ */
const statusCards = [
  {
    label: "Pending Docs",
    count: nfaPipelineStats.pendingDocs,
    icon: FileText,
    color: "text-pomg-dim",
    bgColor: "bg-pomg-dim/10",
  },
  {
    label: "Submitted",
    count: nfaPipelineStats.submitted,
    icon: Send,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    label: "In Review",
    count: nfaPipelineStats.inReview,
    icon: Search,
    color: "text-pomg-purple-light",
    bgColor: "bg-pomg-purple/10",
  },
  {
    label: "Approved",
    count: nfaPipelineStats.approved,
    icon: CheckCircle2,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    label: "Ready for Pickup",
    count: nfaPipelineStats.readyForPickup,
    icon: Package,
    color: "text-pomg-gold",
    bgColor: "bg-pomg-gold/10",
  },
];

function PipelineStatusCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {statusCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-pomg-card border border-pomg-border rounded-xl p-4 hover:border-pomg-purple/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-pomg-dark ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-pomg-text tabular-nums">
              {card.count}
            </p>
            <p className="text-xs text-pomg-muted mt-1">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   B. Pipeline Value Summary
   ═══════════════════════════════════════════════════════ */
function PipelineValueSummary() {
  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-pomg-text">
          Pipeline Value
        </h3>
        <p className="text-sm text-pomg-muted mt-0.5">
          {isDemoMode
            ? "Example NFA items in pipeline"
            : "Total NFA items in pipeline"}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-pomg-dark border border-pomg-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-pomg-gold" />
            <p className="text-xs text-pomg-muted uppercase tracking-wider">
              Total Value
            </p>
          </div>
          <p className="text-2xl font-bold text-pomg-text tabular-nums">
            {formatCurrency(nfaPipelineStats.totalPipelineValue)}
          </p>
        </div>
        <div className="bg-pomg-dark border border-pomg-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-pomg-purple-light" />
            <p className="text-xs text-pomg-muted uppercase tracking-wider">
              {isDemoMode ? "Example Avg Wait" : "Avg Wait"}
            </p>
          </div>
          <p className="text-2xl font-bold text-pomg-text tabular-nums">
            {nfaPipelineStats.averageWaitDays}
            <span className="text-sm font-normal text-pomg-muted ml-1">
              days
            </span>
          </p>
        </div>
        <div className="bg-pomg-dark border border-pomg-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-green-400" />
            <p className="text-xs text-pomg-muted uppercase tracking-wider">
              Fastest
            </p>
          </div>
          <p className="text-2xl font-bold text-pomg-text tabular-nums">
            {nfaPipelineStats.fastestApproval}
            <span className="text-sm font-normal text-pomg-muted ml-1">
              days
            </span>
          </p>
        </div>
        <div className="bg-pomg-dark border border-pomg-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Hourglass className="w-4 h-4 text-red-400" />
            <p className="text-xs text-pomg-muted uppercase tracking-wider">
              Slowest
            </p>
          </div>
          <p className="text-2xl font-bold text-pomg-text tabular-nums">
            {nfaPipelineStats.slowestApproval}
            <span className="text-sm font-normal text-pomg-muted ml-1">
              days
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   C. Applications Table
   ═══════════════════════════════════════════════════════ */
function ApplicationsTable() {
  const sorted = [...nfaApplications].sort(
    (a, b) => statusPriority[a.status] - statusPriority[b.status]
  );

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "\u2014";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "2-digit",
    });
  };

  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-pomg-text">
            NFA Applications
          </h3>
          <p className="text-sm text-pomg-muted mt-0.5">
            {nfaPipelineStats.totalActive} active applications &middot; Sorted
            by status
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-pomg-border">
              <th className="text-left text-pomg-muted font-medium pb-3 pr-4">
                ID
              </th>
              <th className="text-left text-pomg-muted font-medium pb-3 px-3">
                Customer
              </th>
              <th className="text-left text-pomg-muted font-medium pb-3 px-3">
                Item
              </th>
              <th className="text-left text-pomg-muted font-medium pb-3 px-3">
                Type
              </th>
              <th className="text-left text-pomg-muted font-medium pb-3 px-3">
                Status
              </th>
              <th className="text-left text-pomg-muted font-medium pb-3 px-3">
                Submitted
              </th>
              <th className="text-left text-pomg-muted font-medium pb-3 pl-3">
                Est. Approval
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((app, i) => (
              <tr
                key={app.id}
                className={`border-b border-pomg-border/50 hover:bg-pomg-dark/50 transition-colors ${
                  i % 2 === 0 ? "bg-pomg-card" : "bg-pomg-dark/30"
                }`}
              >
                <td className="py-3 pr-4">
                  <span className="text-pomg-muted font-mono text-xs">
                    {app.id}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-pomg-text font-medium">
                    {app.customerName}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-pomg-text">{app.item}</span>
                  <span className="text-pomg-muted text-xs ml-2">
                    {app.caliber}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-pomg-muted">{app.type}</span>
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[app.status]}`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-pomg-muted tabular-nums">
                  {formatDate(app.submittedDate)}
                </td>
                <td className="py-3 pl-3 text-pomg-muted tabular-nums">
                  {formatDate(app.estimatedApproval)}
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
   D. Monthly Submissions Chart
   ═══════════════════════════════════════════════════════ */
function MonthlySubmissionsChart() {
  const chartData = nfaPipelineStats.monthlySubmissions.map((d) => ({
    month: d.month,
    Submissions: d.count,
  }));

  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-pomg-text">
          Monthly Submissions
        </h3>
        <p className="text-sm text-pomg-muted mt-0.5">
          NFA applications submitted per month
        </p>
      </div>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height={260} minWidth={0}>
          <BarChart data={chartData} barCategoryGap="25%">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e1e2e"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#71717a", fontSize: 11 }}
              axisLine={{ stroke: "#1e1e2e" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#71717a", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              width={30}
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar
              dataKey="Submissions"
              fill="#43437A"
              radius={[6, 6, 0, 0]}
              maxBarSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   E. Top Manufacturers
   ═══════════════════════════════════════════════════════ */
function TopManufacturers() {
  const sorted = [...nfaPipelineStats.topManufacturers].sort(
    (a, b) => b.count - a.count
  );
  const maxCount = Math.max(...sorted.map((m) => m.count));

  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-pomg-text">
          Top Manufacturers
        </h3>
        <p className="text-sm text-pomg-muted mt-0.5">
          Most popular brands in the NFA pipeline
        </p>
      </div>
      <div className="space-y-4">
        {sorted.map((mfr) => (
          <div key={mfr.name} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-pomg-text">
                {mfr.name}
              </span>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-pomg-muted">
                  {formatCurrency(mfr.revenue)}
                </span>
                <span className="text-pomg-text font-semibold w-8 text-right tabular-nums">
                  {mfr.count}
                </span>
              </div>
            </div>
            <div className="relative h-5 bg-pomg-dark rounded-md overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#43437A] to-[#5a5a9e] rounded-md group-hover:to-[#6e6eb5] transition-all duration-300"
                style={{
                  width: `${(mfr.count / maxCount) * 100}%`,
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
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function NFAPipelineTracker() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-pomg-text">
            NFA Pipeline Tracker
          </h2>
          <p className="text-sm text-pomg-muted mt-1">
            {nfaPipelineStats.totalActive} active applications &middot;{" "}
            {isDemoMode ? "example eForm 4 workflow" : "eForm 4 processing"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 text-xs font-medium bg-pomg-dark border border-pomg-border rounded-lg text-pomg-muted">
            All Time
          </span>
          <span className="px-3 py-1.5 text-xs font-medium bg-pomg-gold/15 border border-pomg-gold/30 rounded-lg text-pomg-gold">
            {nfaPipelineStats.readyForPickup} Ready
          </span>
        </div>
      </div>

      {/* A. Pipeline Status Cards */}
      <PipelineStatusCards />

      {/* B. Pipeline Value Summary */}
      <PipelineValueSummary />

      {/* C. Applications Table */}
      <ApplicationsTable />

      {/* D + E: Monthly Submissions and Top Manufacturers side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlySubmissionsChart />
        <TopManufacturers />
      </div>
    </div>
  );
}
