"use client";

import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Search,
  Globe,
  MapPin,
  Tag,
  AlertCircle,
  DollarSign,
  Zap,
  BarChart3,
  Bot,
  ArrowRight,
} from "lucide-react";
import {
  keywordOpportunities,
  competitors,
  technicalIssues,
  seoStats,
  geoMetrics,
  geoCaseStudies,
} from "@/data/seo-report";
import { isDemoMode } from "@/lib/demoMetrics";
import type { KeywordOpportunity } from "@/data/seo-report";

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
    source: isDemoMode ? "Example metric (GA4-style dataset)" : "GA4 live metric",
  },
  {
    label: "Keywords Ranking",
    current: seoStats.currentKeywords,
    projected: seoStats.projectedKeywords,
    suffix: "",
    icon: Search,
    source: isDemoMode ? "Example metric (SEO dataset)" : "Search Console live metric",
  },
  {
    label: "Domain Authority",
    current: seoStats.domainAuthority,
    projected: seoStats.projectedDA,
    suffix: "",
    icon: Globe,
    source: isDemoMode ? "Example metric (Semrush-style score)" : "Live provider score",
  },
  {
    label: "Local SEO Score",
    current: seoStats.localSEOScore,
    projected: seoStats.projectedLocalScore,
    suffix: "/100",
    icon: MapPin,
    source: isDemoMode ? "Example metric (local SEO model)" : "Live local SEO metric",
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
            <p className="mt-2 text-[11px] text-pomg-dim">{card.source}</p>
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
    Informational: Search,
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
            {keywordOpportunities.length} keywords analyzed &middot; Sorted by
            revenue potential
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
   D. Generative Engine Optimization (GEO)
   ═══════════════════════════════════════════════════════ */

function GEOOpportunitySection() {
  return (
    <div className="relative overflow-hidden bg-pomg-card border-2 border-pomg-purple/40 rounded-xl p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-pomg-purple/5 via-transparent to-pomg-gold/5" />
      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-pomg-purple/15 border border-pomg-purple/30">
            <Bot className="w-6 h-6 text-pomg-purple-light" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-pomg-text">
              Generative Engine Optimization (GEO)
            </h3>
            <p className="text-sm text-pomg-muted">
              The biggest distribution channel since early Google
            </p>
          </div>
        </div>

        {/* GEO Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {geoMetrics.map((metric) => {
            const gain = percentGain(metric.current, metric.projected);
            return (
              <div
                key={metric.label}
                className="bg-pomg-dark rounded-lg border border-pomg-border p-4"
              >
                <p className="text-xs text-pomg-muted mb-2">{metric.label}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold text-pomg-text tabular-nums">
                    {metric.current}
                  </span>
                  <ArrowRight className="w-3 h-3 text-pomg-dim shrink-0" />
                  <span className="text-lg font-bold text-pomg-gold tabular-nums">
                    {metric.projected}
                    <span className="text-xs text-pomg-gold-light font-normal">
                      {metric.suffix}
                    </span>
                  </span>
                </div>
                <span className="text-xs font-bold text-pomg-success">
                  +{gain}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Why GEO Matters */}
        <div className="bg-pomg-dark/50 rounded-lg border border-pomg-border p-5 mb-4">
          <p className="text-sm font-semibold text-pomg-text mb-3">
            When you appear in AI buyer recommendations:
          </p>
          <div className="space-y-2.5">
            {[
              {
                text: "You show up when they're",
                bold: "ready to buy",
                rest: " — not casually browsing",
              },
              {
                text: "You",
                bold: "borrow the trust",
                rest: " users already have for AI instead of earning it from scratch",
              },
              {
                text: "You",
                bold: "sideline competitors",
                rest: " by appearing in recommendations before they reach search",
              },
            ].map((item) => (
              <div key={item.bold} className="flex items-start gap-3">
                <div className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-pomg-gold" />
                <p className="text-sm text-pomg-muted">
                  {item.text}{" "}
                  <span className="text-pomg-text font-medium">
                    {item.bold}
                  </span>
                  {item.rest}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {geoCaseStudies.map((study) => (
            <div
              key={study.name}
              className="bg-pomg-dark rounded-lg border border-pomg-success/20 p-4"
            >
              <p className="text-xs text-pomg-muted mb-2">{study.name}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-pomg-dim tabular-nums">
                  {study.before}
                </span>
                <ArrowRight className="w-3 h-3 text-pomg-success shrink-0" />
                <span className="text-xl font-bold text-pomg-success tabular-nums">
                  {study.after.toLocaleString()}+
                </span>
              </div>
              <p className="text-xs text-pomg-muted mt-1">
                {study.unit} &middot; {study.timeframe}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-pomg-dim">
          {isDemoMode
            ? "GEO metrics are example projections based on comparable implementations."
            : "GEO metrics sourced from AI search monitoring."}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   E. Growth Readiness Score
   ═══════════════════════════════════════════════════════ */

function GrowthReadinessScore() {
  const criticalCount = technicalIssues.filter(
    (i) => i.severity === "Critical"
  ).length;
  const warningCount = technicalIssues.filter(
    (i) => i.severity === "Warning"
  ).length;
  const infoCount = technicalIssues.filter(
    (i) => i.severity === "Info"
  ).length;

  return (
    <div className="bg-pomg-card border border-pomg-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-pomg-text">
            Growth Readiness
          </h3>
          <p className="text-sm text-pomg-muted mt-0.5">
            Technical foundation assessment
          </p>
        </div>
        <div className="px-3 py-1.5 text-xs font-medium bg-pomg-danger/15 border border-pomg-danger/30 rounded-lg text-pomg-danger">
          Score: {seoStats.technicalScore}/100
        </div>
      </div>

      {/* Score visualization */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-pomg-dark"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${(seoStats.technicalScore / 100) * 327} 327`}
              strokeLinecap="round"
              className="text-pomg-danger"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold text-pomg-text tabular-nums">
              {seoStats.technicalScore}
            </span>
            <span className="text-xs text-pomg-dim">/100</span>
          </div>
        </div>
      </div>

      {/* Issue breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between p-3 bg-pomg-dark rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-pomg-danger" />
            <span className="text-sm text-pomg-muted">Critical Issues</span>
          </div>
          <span className="text-sm font-bold text-pomg-danger tabular-nums">
            {criticalCount}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-pomg-dark rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-pomg-muted">Warnings</span>
          </div>
          <span className="text-sm font-bold text-yellow-500 tabular-nums">
            {warningCount}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-pomg-dark rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-pomg-muted">Improvements</span>
          </div>
          <span className="text-sm font-bold text-blue-400 tabular-nums">
            {infoCount}
          </span>
        </div>
      </div>

      {/* Projected score */}
      <div className="pt-4 border-t border-pomg-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-pomg-gold uppercase tracking-wider font-semibold">
            Projected Score
          </span>
          <span className="text-xl font-bold text-pomg-gold tabular-nums">
            {seoStats.projectedTechnicalScore}
            <span className="text-xs text-pomg-gold-light font-normal">
              /100
            </span>
          </span>
        </div>
        <div className="h-2 bg-pomg-dark rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pomg-danger via-yellow-500 to-pomg-success"
            style={{
              width: `${seoStats.projectedTechnicalScore}%`,
            }}
          />
        </div>
      </div>

      <p className="mt-4 text-[11px] text-pomg-dim">
        Full technical audit &amp; remediation plan included with engagement.
      </p>
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
          <p className="text-[11px] text-pomg-dim mt-2">
            {isDemoMode
              ? "Example metric. Replaced with live SEO data upon integration."
              : "Live metric sourced from connected SEO providers."}
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
            SEO &amp; GEO Growth Report
          </h2>
          <p className="text-sm text-pomg-muted mt-1">
            Revenue opportunities, AI visibility &amp; competitive analysis{" "}
            {isDemoMode ? "(example dataset)" : "(live dataset)"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 text-xs font-medium bg-pomg-dark border border-pomg-border rounded-lg text-pomg-muted flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5" />
            Feb 2026
          </span>
          <span className="px-3 py-1.5 text-xs font-medium bg-pomg-purple/20 border border-pomg-purple/40 rounded-lg text-pomg-purple-light flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            {keywordOpportunities.length}{" "}
            {isDemoMode ? "Example Keywords" : "Tracked Keywords"}
          </span>
        </div>
      </div>

      {/* A. Missing Traffic Value Call-Out (top for impact) */}
      <MissingTrafficCallout />

      {/* B. SEO Score Overview */}
      <SEOScoreOverview />

      {/* C. GEO Opportunity */}
      <GEOOpportunitySection />

      {/* D. Keyword Opportunities Table */}
      <KeywordOpportunitiesTable />

      {/* E. Competitor Comparison + Growth Readiness side by side */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CompetitorComparisonTable />
        <GrowthReadinessScore />
      </div>
    </div>
  );
}
