"use client";

import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Search,
  Globe,
  MapPin,
  FileText,
  Tag,
  AlertCircle,
  AlertTriangle,
  Info,
  DollarSign,
  Zap,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import {
  keywordOpportunities,
  competitors,
  contentGaps,
  technicalIssues,
  seoStats,
} from "@/data/seo-report";
import type {
  KeywordOpportunity,
  ContentGap,
  TechnicalIssue,
} from "@/data/seo-report";

/* ─── helpers ─── */
const formatNumber = (n: number) => n.toLocaleString();
const formatCurrency = (n: number) => "$" + n.toLocaleString();

function percentGain(current: number, projected: number): number {
  if (current === 0) return projected > 0 ? 999 : 0;
  return Math.round(((projected - current) / current) * 100);
}

/* ═══════════════════════════════════════════════════════
   A. SEO Score Overview — 4 Score Cards
   ═══════════════════════════════════════════════════════ */

const scoreCards = [
  {
    label: "Organic Traffic",
    current: seoStats.currentOrganicTraffic,
    projected: seoStats.projectedOrganicTraffic,
    suffix: "/mo",
    icon: TrendingUp,
  },
  {
    label: "Keywords Ranking",
    current: seoStats.currentKeywords,
    projected: seoStats.projectedKeywords,
    suffix: "",
    icon: Search,
  },
  {
    label: "Domain Authority",
    current: seoStats.domainAuthority,
    projected: seoStats.projectedDA,
    suffix: "",
    icon: Globe,
  },
  {
    label: "Local SEO Score",
    current: seoStats.localSEOScore,
    projected: seoStats.projectedLocalScore,
    suffix: "/100",
    icon: MapPin,
  },
];

function SEOScoreOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {scoreCards.map((card) => {
        const Icon = card.icon;
        const gain = percentGain(card.current, card.projected);
        const currentPct =
          card.suffix === "/100"
            ? card.current
            : Math.min(
                Math.round((card.current / card.projected) * 100),
                100
              );
        const projectedPct =
          card.suffix === "/100" ? card.projected : 100;

        return (
          <div
            key={card.label}
            className="bg-pomg-card border border-pomg-border rounded-xl p-5 hover:border-pomg-purple/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-pomg-dark text-pomg-purple-light">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-pomg-success tabular-nums">
                +{gain}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="relative h-2 bg-pomg-dark rounded-full overflow-hidden mb-4">
              {/* Projected (background layer) */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-pomg-purple/30"
                style={{ width: `${projectedPct}%` }}
              />
              {/* Current (foreground layer) */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-pomg-purple transition-all duration-700"
                style={{ width: `${currentPct}%` }}
              />
            </div>

            {/* Current */}
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs text-pomg-muted">Current</span>
              <span className="text-lg font-bold text-pomg-text tabular-nums">
                {formatNumber(card.current)}
                <span className="text-xs text-pomg-dim font-normal">
                  {card.suffix}
                </span>
              </span>
            </div>

            {/* Projected */}
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-pomg-gold">Projected</span>
              <span className="text-lg font-bold text-pomg-gold tabular-nums">
                {formatNumber(card.projected)}
                <span className="text-xs text-pomg-gold-light font-normal">
                  {card.suffix}
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   B. Keyword Opportunities Table
   ═══════════════════════════════════════════════════════ */

function StatusBadge({ status }: { status: KeywordOpportunity["status"] }) {
  const styles: Record<typeof status, string> = {
    Ranking: "bg-pomg-success/15 text-pomg-success border-pomg-success/30",
    Opportunity: "bg-pomg-gold/15 text-pomg-gold border-pomg-gold/30",
    Missing: "bg-pomg-danger/15 text-pomg-danger border-pomg-danger/30",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function CategoryBadge({
  category,
}: {
  category: KeywordOpportunity["category"];
}) {
  const icons: Record<typeof category, typeof Tag> = {
    Product: Tag,
    Informational: FileText,
    Local: MapPin,
    Brand: Globe,
  };
  const Icon = icons[category];
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-pomg-muted bg-pomg-dark rounded-md border border-pomg-border">
      <Icon className="w-3 h-3" />
      {category}
    </span>
  );
}

function DifficultyBar({ difficulty }: { difficulty: number }) {
  const color =
    difficulty < 30
      ? "bg-pomg-success"
      : difficulty <= 50
        ? "bg-yellow-500"
        : "bg-pomg-danger";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-pomg-dark rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${difficulty}%` }}
        />
      </div>
      <span className="text-xs text-pomg-muted tabular-nums w-6 text-right">
        {difficulty}
      </span>
    </div>
  );
}

function KeywordOpportunitiesTable() {
  const sorted = [...keywordOpportunities].sort((a, b) => {
    const statusOrder = { Missing: 0, Opportunity: 1, Ranking: 2 };
    if (statusOrder[a.status] !== statusOrder[b.status])
      return statusOrder[a.status] - statusOrder[b.status];
    return b.potentialTraffic - a.potentialTraffic;
  });

  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-pomg-text">
            Keyword Opportunities
          </h3>
          <p className="text-sm text-pomg-muted mt-0.5">
            {keywordOpportunities.length} keywords tracked &middot; Sorted
            by opportunity
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pomg-success" />
            <span className="text-pomg-muted">Ranking</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pomg-gold" />
            <span className="text-pomg-muted">Opportunity</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pomg-danger" />
            <span className="text-pomg-muted">Missing</span>
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-pomg-border">
              <th className="text-left text-pomg-muted font-medium pb-3 pr-4">
                Keyword
              </th>
              <th className="text-right text-pomg-muted font-medium pb-3 px-3">
                Rank
              </th>
              <th className="text-right text-pomg-muted font-medium pb-3 px-3">
                Volume
              </th>
              <th className="text-left text-pomg-muted font-medium pb-3 px-3">
                Difficulty
              </th>
              <th className="text-right text-pomg-muted font-medium pb-3 px-3">
                Potential
              </th>
              <th className="text-center text-pomg-muted font-medium pb-3 px-3">
                Status
              </th>
              <th className="text-center text-pomg-muted font-medium pb-3 pl-3">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((kw, i) => (
              <tr
                key={kw.keyword}
                className={`border-b border-pomg-border/50 hover:bg-pomg-dark/50 transition-colors ${
                  i % 2 === 0 ? "bg-pomg-card" : "bg-pomg-dark/30"
                }`}
              >
                <td className="py-3 pr-4">
                  <span className="text-pomg-text font-medium">
                    {kw.keyword}
                  </span>
                </td>
                <td className="py-3 px-3 text-right tabular-nums">
                  {kw.currentRank !== null ? (
                    <span className="text-pomg-text">{kw.currentRank}</span>
                  ) : (
                    <span className="text-pomg-dim">&mdash;</span>
                  )}
                </td>
                <td className="py-3 px-3 text-right text-pomg-muted tabular-nums">
                  {formatNumber(kw.searchVolume)}
                </td>
                <td className="py-3 px-3">
                  <DifficultyBar difficulty={kw.difficulty} />
                </td>
                <td className="py-3 px-3 text-right text-pomg-text font-semibold tabular-nums">
                  {formatNumber(kw.potentialTraffic)}
                </td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status={kw.status} />
                </td>
                <td className="py-3 pl-3 text-center">
                  <CategoryBadge category={kw.category} />
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
   C. Competitor Comparison Table
   ═══════════════════════════════════════════════════════ */

function CompetitorComparisonTable() {
  const topTraffic = Math.max(...competitors.map((c) => c.estimatedTraffic));
  const pomg = competitors.find((c) => c.name.startsWith("POMG"));

  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-pomg-text">
            Competitor Landscape
          </h3>
          <p className="text-sm text-pomg-muted mt-0.5">
            {competitors.length} competitors &middot; Organic SEO comparison
          </p>
        </div>
        {pomg && (
          <div className="text-xs text-pomg-muted">
            Traffic gap to #1:{" "}
            <span className="text-pomg-danger font-semibold tabular-nums">
              {formatNumber(topTraffic - pomg.estimatedTraffic)}
            </span>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-pomg-border">
              <th className="text-left text-pomg-muted font-medium pb-3 pr-4">
                Competitor
              </th>
              <th className="text-right text-pomg-muted font-medium pb-3 px-3">
                DA
              </th>
              <th className="text-right text-pomg-muted font-medium pb-3 px-3">
                Organic Keywords
              </th>
              <th className="text-right text-pomg-muted font-medium pb-3 px-3">
                Est. Traffic
              </th>
              <th className="text-left text-pomg-muted font-medium pb-3 px-3">
                Top Category
              </th>
              <th className="text-center text-pomg-muted font-medium pb-3 pl-3">
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((comp, i) => {
              const isPomg = comp.name.startsWith("POMG");
              return (
                <tr
                  key={comp.name}
                  className={`border-b transition-colors ${
                    isPomg
                      ? "border-pomg-gold/40 bg-pomg-gold/5 hover:bg-pomg-gold/10"
                      : `border-pomg-border/50 hover:bg-pomg-dark/50 ${
                          i % 2 === 0 ? "bg-pomg-card" : "bg-pomg-dark/30"
                        }`
                  }`}
                >
                  <td className="py-3 pr-4">
                    <span
                      className={`font-medium ${
                        isPomg ? "text-pomg-gold" : "text-pomg-text"
                      }`}
                    >
                      {comp.name}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums">
                    <span
                      className={
                        isPomg
                          ? "text-pomg-gold font-semibold"
                          : "text-pomg-text"
                      }
                    >
                      {comp.domainAuthority}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right text-pomg-muted tabular-nums">
                    {formatNumber(comp.organicKeywords)}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums">
                    <span
                      className={
                        isPomg
                          ? "text-pomg-gold font-semibold"
                          : "text-pomg-text font-semibold"
                      }
                    >
                      {formatNumber(comp.estimatedTraffic)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-pomg-muted">
                    {comp.topCategory}
                  </td>
                  <td className="py-3 pl-3 text-center">
                    {comp.trend === "up" && (
                      <ArrowUpRight className="w-4 h-4 text-pomg-success inline" />
                    )}
                    {comp.trend === "down" && (
                      <ArrowDownRight className="w-4 h-4 text-pomg-danger inline" />
                    )}
                    {comp.trend === "stable" && (
                      <Minus className="w-4 h-4 text-pomg-muted inline" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   D. Content Gap Opportunities
   ═══════════════════════════════════════════════════════ */

function DifficultyBadge({ difficulty }: { difficulty: ContentGap["difficulty"] }) {
  const styles: Record<typeof difficulty, string> = {
    Easy: "bg-pomg-success/15 text-pomg-success border-pomg-success/30",
    Medium: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
    Hard: "bg-pomg-danger/15 text-pomg-danger border-pomg-danger/30",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border ${styles[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: ContentGap["priority"] }) {
  const styles: Record<typeof priority, string> = {
    High: "bg-pomg-purple/20 text-pomg-purple-light border-pomg-purple/40",
    Medium: "bg-pomg-gold/15 text-pomg-gold border-pomg-gold/30",
    Low: "bg-pomg-dark text-pomg-muted border-pomg-border",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

function ContentGapCards() {
  const sorted = [...contentGaps].sort((a, b) => {
    const priorityOrder: Record<string, number> = {
      High: 0,
      Medium: 1,
      Low: 2,
    };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority])
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    return b.estimatedTraffic - a.estimatedTraffic;
  });

  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-pomg-text">
            Content Gap Opportunities
          </h3>
          <p className="text-sm text-pomg-muted mt-0.5">
            {contentGaps.length} content pieces to capture missing traffic
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-pomg-muted">
          <FileText className="w-3.5 h-3.5" />
          Sorted by priority &amp; traffic
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sorted.map((gap) => (
          <div
            key={gap.topic}
            className="bg-pomg-dark border border-pomg-border rounded-lg p-4 hover:border-pomg-purple/40 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h4 className="text-sm font-medium text-pomg-text leading-snug group-hover:text-white transition-colors">
                {gap.topic}
              </h4>
              <ExternalLink className="w-3.5 h-3.5 text-pomg-dim shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-pomg-muted bg-pomg-card rounded-md border border-pomg-border">
                <TrendingUp className="w-3 h-3" />
                {formatNumber(gap.estimatedTraffic)}/mo
              </span>
              <DifficultyBadge difficulty={gap.difficulty} />
              <PriorityBadge priority={gap.priority} />
              <span className="inline-flex items-center px-2 py-0.5 text-xs text-pomg-dim bg-pomg-card rounded-md border border-pomg-border">
                {gap.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   E. Technical Issues
   ═══════════════════════════════════════════════════════ */

function SeverityIcon({ severity }: { severity: TechnicalIssue["severity"] }) {
  switch (severity) {
    case "Critical":
      return <AlertCircle className="w-4 h-4 text-pomg-danger" />;
    case "Warning":
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    case "Info":
      return <Info className="w-4 h-4 text-blue-400" />;
  }
}

function TechnicalIssuesList() {
  const severityOrder: Record<string, number> = {
    Critical: 0,
    Warning: 1,
    Info: 2,
  };
  const sorted = [...technicalIssues].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );

  const criticalCount = sorted.filter((i) => i.severity === "Critical").length;
  const warningCount = sorted.filter((i) => i.severity === "Warning").length;

  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-pomg-text">
            Technical SEO Issues
          </h3>
          <p className="text-sm text-pomg-muted mt-0.5">
            {technicalIssues.length} issues found &middot;{" "}
            <span className="text-pomg-danger">{criticalCount} critical</span>
            {" "}&middot;{" "}
            <span className="text-yellow-500">{warningCount} warnings</span>
          </p>
        </div>
        <div className="px-3 py-1.5 text-xs font-medium bg-pomg-danger/15 border border-pomg-danger/30 rounded-lg text-pomg-danger">
          Score: {seoStats.technicalScore}/100
        </div>
      </div>
      <div className="space-y-2">
        {sorted.map((issue) => {
          const severityStyles: Record<string, string> = {
            Critical: "border-pomg-danger/30 bg-pomg-danger/5",
            Warning: "border-yellow-500/20 bg-yellow-500/5",
            Info: "border-blue-400/20 bg-blue-400/5",
          };
          return (
            <div
              key={issue.issue}
              className={`flex items-start gap-3 rounded-lg border p-4 transition-all duration-200 hover:border-opacity-60 ${severityStyles[issue.severity]}`}
            >
              <div className="mt-0.5 shrink-0">
                <SeverityIcon severity={issue.severity} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-pomg-text">
                  {issue.issue}
                </p>
                <p className="text-xs text-pomg-muted mt-1">
                  {issue.impact}
                </p>
              </div>
              {issue.pages > 0 && (
                <div className="shrink-0 text-right">
                  <span className="text-sm font-semibold text-pomg-text tabular-nums">
                    {issue.pages}
                  </span>
                  <p className="text-xs text-pomg-muted">pages</p>
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
   F. Missing Traffic Value Call-Out
   ═══════════════════════════════════════════════════════ */

function MissingTrafficCallout() {
  const totalMissingTraffic = keywordOpportunities
    .filter((kw) => kw.status === "Missing")
    .reduce((sum, kw) => sum + kw.potentialTraffic, 0);

  return (
    <div className="relative overflow-hidden bg-pomg-card border-2 border-pomg-gold/40 rounded-xl p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-pomg-gold/5 via-transparent to-pomg-purple/5" />
      <div className="relative flex flex-col md:flex-row items-center gap-6">
        {/* Left icon */}
        <div className="shrink-0 p-4 rounded-2xl bg-pomg-gold/10 border border-pomg-gold/30">
          <DollarSign className="w-8 h-8 text-pomg-gold" />
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-xs text-pomg-gold uppercase tracking-wider font-semibold mb-1">
            Missing Organic Traffic Value
          </p>
          <p className="text-4xl font-bold text-pomg-gold tabular-nums">
            {formatCurrency(seoStats.missingTrafficValue)}
            <span className="text-lg text-pomg-gold-light font-normal">
              /mo
            </span>
          </p>
          <p className="text-sm text-pomg-muted mt-2 max-w-lg">
            Based on {formatNumber(totalMissingTraffic)} monthly visitors from
            unranked keywords at an average CPC equivalent. This traffic is
            currently going to competitors.
          </p>
        </div>

        {/* Right stats */}
        <div className="shrink-0 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-pomg-dark rounded-lg border border-pomg-border">
            <p className="text-xs text-pomg-muted mb-1">Content Score</p>
            <p className="text-lg font-bold text-pomg-text tabular-nums">
              {seoStats.contentScore}
              <span className="text-xs text-pomg-dim font-normal">/100</span>
            </p>
            <p className="text-xs text-pomg-success mt-0.5">
              &rarr; {seoStats.projectedContentScore}
            </p>
          </div>
          <div className="text-center p-3 bg-pomg-dark rounded-lg border border-pomg-border">
            <p className="text-xs text-pomg-muted mb-1">Technical</p>
            <p className="text-lg font-bold text-pomg-text tabular-nums">
              {seoStats.technicalScore}
              <span className="text-xs text-pomg-dim font-normal">/100</span>
            </p>
            <p className="text-xs text-pomg-success mt-0.5">
              &rarr; {seoStats.projectedTechnicalScore}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function SEOReportPanel() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-pomg-text">
            SEO Opportunity Report
          </h2>
          <p className="text-sm text-pomg-muted mt-1">
            Keyword gaps, competitor intelligence &amp; technical audit
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 text-xs font-medium bg-pomg-dark border border-pomg-border rounded-lg text-pomg-muted flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5" />
            Feb 2026
          </span>
          <span className="px-3 py-1.5 text-xs font-medium bg-pomg-purple/20 border border-pomg-purple/40 rounded-lg text-pomg-purple-light flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            {keywordOpportunities.length} Keywords
          </span>
        </div>
      </div>

      {/* A. Missing Traffic Value Call-Out (top for impact) */}
      <MissingTrafficCallout />

      {/* B. SEO Score Overview */}
      <SEOScoreOverview />

      {/* C. Keyword Opportunities Table */}
      <KeywordOpportunitiesTable />

      {/* D. Competitor Comparison + Technical Issues side by side on large screens */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CompetitorComparisonTable />
        <TechnicalIssuesList />
      </div>

      {/* E. Content Gap Opportunities */}
      <ContentGapCards />
    </div>
  );
}
