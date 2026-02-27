"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import DemoDataBanner from "@/components/demo-data-banner";
import Link from "next/link";
import { revenueProjection } from "@/data/analytics";
import { seoStats } from "@/data/seo-report";
import { demoMetrics, isDemoMode } from "@/lib/demoMetrics";
import {
  ChevronDown,
  AlertTriangle,
  TrendingDown,
  Clock,
  Search,
  Users,
  Mail,
  ShoppingCart,
  BarChart3,
  Wrench,
  Globe,
  Brain,
  ArrowRight,
  ArrowUpRight,
  Phone,
  CheckCircle2,
  Target,
  Zap,
  DollarSign,
  TrendingUp,
} from "lucide-react";

/* ─── Format helpers ─── */
function fmtUSD(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

/* ─── Data ─── */

const modules = [
  {
    icon: ShoppingCart,
    name: "Smart Shop",
    desc: "Guided filtering, cross-sell recommendations, and conversion-optimized product pages.",
    href: "/shop",
  },
  {
    icon: Target,
    name: "NFA Pipeline",
    desc: "Real-time Form 4 tracking dashboard. Automated status updates. Customer peace of mind.",
    href: "/dashboard",
  },
  {
    icon: BarChart3,
    name: "Analytics Engine",
    desc: "Revenue intelligence, conversion funnels, customer insights, and growth forecasting.",
    href: "/dashboard",
  },
  {
    icon: Wrench,
    name: "Build Your Setup",
    desc: "Interactive configuration wizard that increases AOV through intelligent bundling.",
    href: "/build-your-setup",
  },
  {
    icon: Globe,
    name: "SEO Engine",
    desc: "Content strategy, technical optimization, and keyword targeting for 10x organic growth.",
    href: "/dashboard",
  },
  {
    icon: Brain,
    name: "Customer Intelligence",
    desc: "Segment analysis, LTV tracking, product affinity, and retention optimization.",
    href: "/dashboard",
  },
];

const timeline = [
  {
    phase: 1,
    title: "Foundation",
    weeks: "typically ~2 weeks (example schedule)",
    desc: "Design system, architecture, product data migration, core shopping experience",
    active: true,
  },
  {
    phase: 2,
    title: "Intelligence",
    weeks: "typically ~2 weeks (example schedule)",
    desc: "Analytics dashboard, NFA pipeline tracker, customer segmentation engine",
    active: false,
  },
  {
    phase: 3,
    title: "Growth",
    weeks: "typically ~2 weeks (example schedule)",
    desc: "SEO optimization, content strategy, email marketing integration, Build Your Setup wizard",
    active: false,
  },
  {
    phase: 4,
    title: "Launch & Optimize",
    weeks: "typically ~2 weeks (example schedule)",
    desc: "QA, performance tuning, deployment, monitoring setup, training",
    active: false,
  },
];

export default function PitchPage() {
  const exampleLabel = isDemoMode ? "Example" : "Current";
  const sourceLabel = isDemoMode
    ? "Example dataset. Replaced with live SEO data upon integration."
    : "Live source: GA4 + Search Console + SEO connector.";
  const currentMonthly = revenueProjection.current.monthlyRevenue;
  const projectedMonthly = revenueProjection.projected.monthlyRevenue;
  const deltaMonthly = projectedMonthly - currentMonthly;
  const currentAnnual = revenueProjection.current.annualRevenue;
  const projectedAnnual = revenueProjection.projected.annualRevenue;
  const deltaAnnual = projectedAnnual - currentAnnual;
  const problems = [
    {
      icon: AlertTriangle,
      title: "No Analytics",
      color: "text-pomg-danger",
      desc: "You’re making inventory and marketing decisions blind. Zero visibility into what’s selling, what’s stalling, and why.",
    },
    {
      icon: TrendingDown,
      title: "No Conversion Optimization",
      color: "text-orange-400",
      desc: `${exampleLabel} benchmark: ${Math.round(
        demoMetrics.engagement.productViewDropoffRate * 100,
      )}% of visitors who view products leave without adding to cart. Typical ecommerce benchmarks are often closer to the ${Math.round(
        demoMetrics.engagement.industryDropoffRangeLow * 100,
      )}-${Math.round(demoMetrics.engagement.industryDropoffRangeHigh * 100)}% range.`,
    },
    {
      icon: Clock,
      title: "No NFA Pipeline Tracking",
      color: "text-orange-400",
      desc: "Suppressor buyers still navigate an ATF approval process that can take days to weeks depending on submission type and method. Modern eForms processing has significantly reduced wait times, though customers value transparency and engagement throughout their approval journey.",
    },
    {
      icon: Search,
      title: "No SEO Strategy",
      color: "text-pomg-danger",
      desc: `Authority score (${exampleLabel.toLowerCase()}): ${demoMetrics.seoValues.authorityScore}. Ranking keywords (${exampleLabel.toLowerCase()}): ${demoMetrics.seoValues.rankingKeywords.toLocaleString()}. Larger competitors often rank for ${demoMetrics.seoValues.competitorKeywords.toLocaleString()}+ keywords.`,
    },
    {
      icon: Users,
      title: "No Customer Intelligence",
      color: "text-orange-400",
      desc: "You don’t know your top customers’ LTV, repeat purchase rate, or what they’ll buy next.",
    },
    {
      icon: Mail,
      title: "No Email Marketing",
      color: "text-pomg-danger",
      desc: `Potential subscribers (${exampleLabel.toLowerCase()}): ${demoMetrics.engagement.subscriberCount.toLocaleString()}. Zero automated flows. Every lost email is a lost repeat sale.`,
    },
  ];

  return (
    <>
      <Header />

      <main>
        <DemoDataBanner />

        {/* ═══════════════════════════════════════════════════════
            1. HERO — "THE REVENUE ENGINE"
        ═══════════════════════════════════════════════════════ */}
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-pomg-darker">
          {/* Radial glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pomg-gold/[0.04] blur-[120px]" />
          </div>
          {/* Noise */}
          <div className="noise-overlay absolute inset-0" />

          <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
            {/* Pill badge */}
            <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-pomg-border-light bg-pomg-card/60 px-5 py-2.5 backdrop-blur-sm animate-fade-in">
              <span className="h-2 w-2 rounded-full bg-pomg-gold animate-pulse" />
              <span className="text-sm tracking-wide text-pomg-muted">
                Prepared for Piece of Mind Guns
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-6xl uppercase leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl animate-slide-up">
              <span className="gradient-text-gold block text-glow-gold">
                THE REVENUE ENGINE
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-8 max-w-2xl text-lg text-pomg-muted md:text-xl animate-fade-in">
              A data-driven growth platform that turns your website into your
              highest-performing sales channel.
            </p>

            {/* Scroll indicator */}
            <div className="mt-20 flex justify-center animate-bounce">
              <ChevronDown className="h-7 w-7 text-pomg-dim" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            2. THE PROBLEM — "WHAT YOU'RE LEAVING ON THE TABLE"
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-pomg-dark py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="mb-6 text-center">
              <p className="font-display text-sm uppercase tracking-[0.25em] text-pomg-muted">
                The Problem
              </p>
            </div>
            <h2 className="mb-6 text-center font-display text-4xl uppercase text-white md:text-5xl">
              WHAT YOU&apos;RE LEAVING ON THE TABLE
            </h2>

            {/* Shocking number */}
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <div className="inline-flex items-baseline gap-3">
                <span className="font-display text-5xl text-pomg-danger md:text-6xl lg:text-7xl">
                  {fmtUSD(seoStats.missingTrafficValue)}
                </span>
                <span className="font-display text-xl text-pomg-danger/70 md:text-2xl">
                  /mo
                </span>
              </div>
              <p className="mt-3 text-pomg-muted">
                {isDemoMode
                  ? "Estimated missed organic traffic value (example scenario; simulated data)."
                  : "Estimated missed organic traffic value (live model)."}
              </p>
              <p className="mt-2 text-xs text-pomg-dim">
                Modeled using SEO traffic-value estimates and benchmark CPC
                assumptions.
              </p>
              <p className="mt-1 text-xs text-pomg-dim">{sourceLabel}</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px]">
                <span className="rounded-full border border-pomg-border px-2 py-1 text-pomg-dim">
                  Authority Score ({exampleLabel} - Semrush-style metric)
                </span>
                <span className="rounded-full border border-pomg-border px-2 py-1 text-pomg-dim">
                  Ranking Keywords ({exampleLabel} dataset)
                </span>
                <span className="rounded-full border border-pomg-border px-2 py-1 text-pomg-dim">
                  Traffic Value (Estimated CPC model - {exampleLabel})
                </span>
              </div>
            </div>

            {/* Gap cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
              {problems.map((p) => (
                <div
                  key={p.title}
                  className="bg-pomg-card border border-pomg-border rounded-xl p-6 transition-all duration-300 hover:border-pomg-border-light"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pomg-danger/10">
                      <p.icon className={`h-5 w-5 ${p.color}`} />
                    </div>
                    <h3 className="font-display text-lg uppercase text-white">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-pomg-muted">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════════
            3. THE SOLUTION — "WHAT WE BUILD"
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-pomg-darker py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="mb-6 text-center">
              <p className="font-display text-sm uppercase tracking-[0.25em] text-pomg-muted">
                The Solution
              </p>
            </div>
            <h2 className="mb-4 text-center font-display text-4xl uppercase text-white md:text-5xl">
              THE POMG REVENUE ENGINE
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-center text-pomg-muted">
              Six integrated modules designed to capture, convert, and retain
              every dollar of revenue your business deserves.
            </p>

            {/* Module cards — 2x3 */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
              {modules.map((m) => (
                <div
                  key={m.name}
                  className="group bg-pomg-card border border-pomg-border rounded-xl p-7 transition-all duration-300 hover:border-pomg-purple/40"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-pomg-purple/15">
                    <m.icon className="h-6 w-6 text-pomg-purple-light" />
                  </div>
                  <h3 className="mb-2 font-display text-xl uppercase text-white">
                    {m.name}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-pomg-muted">
                    {m.desc}
                  </p>
                  <Link
                    href={m.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-pomg-gold transition-colors hover:text-pomg-gold-light group"
                  >
                    See Demo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-pomg-border bg-pomg-card/70 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pomg-purple/15">
                  <Brain className="h-6 w-6 text-pomg-purple-light" />
                </div>
                <h3 className="font-display text-2xl uppercase text-white md:text-3xl">
                  Generative Engine Optimization (GEO)
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-pomg-gold md:text-base font-medium">
                The biggest distribution opportunity since early Google.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-pomg-muted md:text-base">
                Buyers are skipping traditional search entirely. They ask
                ChatGPT, Gemini, and Perplexity for recommendations — and get
                2–3 summarized options. They choose from that list. If
                you&apos;re not on it, you don&apos;t exist.
              </p>

              {/* 3-column benefit cards */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-pomg-gold/20 bg-pomg-dark p-5">
                  <p className="text-xs text-pomg-gold uppercase tracking-wider font-semibold mb-2">
                    Ready-to-Buy Traffic
                  </p>
                  <p className="text-sm text-pomg-muted">
                    You show up when buyers are{" "}
                    <span className="text-white font-medium">
                      ready to purchase
                    </span>{" "}
                    — not casually browsing. AI recommendations carry
                    pre-filtered buying intent.
                  </p>
                </div>
                <div className="rounded-xl border border-pomg-gold/20 bg-pomg-dark p-5">
                  <p className="text-xs text-pomg-gold uppercase tracking-wider font-semibold mb-2">
                    Borrowed Trust
                  </p>
                  <p className="text-sm text-pomg-muted">
                    You{" "}
                    <span className="text-white font-medium">
                      borrow the trust
                    </span>{" "}
                    users already have for AI instead of earning credibility from
                    scratch through years of reviews and rankings.
                  </p>
                </div>
                <div className="rounded-xl border border-pomg-gold/20 bg-pomg-dark p-5">
                  <p className="text-xs text-pomg-gold uppercase tracking-wider font-semibold mb-2">
                    Competitive Displacement
                  </p>
                  <p className="text-sm text-pomg-muted">
                    You{" "}
                    <span className="text-white font-medium">
                      sideline competitors
                    </span>{" "}
                    by appearing in AI recommendations before they even reach
                    traditional search results.
                  </p>
                </div>
              </div>

              {/* Case Studies */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-pomg-success/20 bg-pomg-dark p-5">
                  <p className="text-xs text-pomg-muted mb-1">
                    B2C SaaS Client
                  </p>
                  <p className="font-display text-2xl text-pomg-success">
                    185 → 1,300+
                  </p>
                  <p className="text-xs text-pomg-muted mt-1">
                    clicks/day in 90 days after GEO implementation
                  </p>
                </div>
                <div className="rounded-xl border border-pomg-success/20 bg-pomg-dark p-5">
                  <p className="text-xs text-pomg-muted mb-1">
                    AI Scheduling Tool
                  </p>
                  <p className="font-display text-2xl text-pomg-success">
                    200 → 1,300+
                  </p>
                  <p className="text-xs text-pomg-muted mt-1">
                    daily clicks after LLM-focused distribution strategy
                  </p>
                </div>
              </div>

              {/* Urgency callout */}
              <div className="mt-6 rounded-lg border border-pomg-border bg-pomg-dark/50 p-5">
                <p className="text-sm text-pomg-muted">
                  The window where AI-driven distribution is under-saturated is
                  closing. Companies that embed themselves into AI citations
                  today become the{" "}
                  <span className="text-white font-medium">
                    default answers tomorrow
                  </span>
                  . Everyone else competes for the leftovers.
                </p>
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.2em] text-pomg-gold/80">
                  Our GEO Strategy Targets
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-pomg-muted">
                  <li>
                    AI citation authority and LLM recommendation positioning
                  </li>
                  <li>
                    Community signal amplification across high-engagement
                    platforms
                  </li>
                  <li>
                    Structured data optimized for AI comprehension and citation
                  </li>
                  <li>
                    LLM visibility monitoring across ChatGPT, Gemini, and
                    Perplexity
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════════
            4. REVENUE PROJECTION — "THE NUMBERS"
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-pomg-dark py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="mb-6 text-center">
              <p className="font-display text-sm uppercase tracking-[0.25em] text-pomg-muted">
                Revenue Projection
              </p>
            </div>
            <h2 className="mb-16 text-center font-display text-4xl uppercase text-white md:text-5xl">
              THE NUMBERS
            </h2>
            {isDemoMode && (
              <p className="mx-auto mb-10 max-w-3xl text-center text-xs text-pomg-gold/80">
                Example scenario only. Metrics below are simulated and replaced
                with verified client data after GA4, Search Console, and
                commerce platform connections.
              </p>
            )}

            {/* Monthly comparison */}
            <div className="mx-auto mb-16 max-w-4xl">
              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
                {/* Current */}
                <div className="rounded-xl border border-pomg-border bg-pomg-card p-8 text-center">
                  <p className="mb-2 text-xs uppercase tracking-widest text-pomg-dim">
                    {isDemoMode
                      ? "Example Current Monthly Revenue"
                      : "Current Monthly Revenue"}
                  </p>
                  <p className="font-display text-4xl text-pomg-muted lg:text-5xl">
                    {fmtUSD(currentMonthly)}
                  </p>
                </div>

                {/* Arrow + delta */}
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-pomg-success/30 bg-pomg-success/10">
                    <TrendingUp className="h-6 w-6 text-pomg-success" />
                  </div>
                  <span className="font-display text-2xl text-pomg-success">
                    +{fmtUSD(deltaMonthly)}/mo
                  </span>
                </div>

                {/* Projected */}
                <div className="rounded-xl border border-pomg-gold/30 bg-pomg-card p-8 text-center glow-gold">
                  <p className="mb-2 text-xs uppercase tracking-widest text-pomg-gold/70">
                    {isDemoMode
                      ? "Example Projected Monthly Revenue"
                      : "Projected Monthly Revenue"}
                  </p>
                  <p className="font-display text-4xl text-pomg-gold lg:text-5xl">
                    {fmtUSD(projectedMonthly)}
                  </p>
                </div>
              </div>
            </div>

            {/* Improvement area cards */}
            <div className="mx-auto mb-16 max-w-4xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {revenueProjection.improvements.map((imp) => (
                  <div
                    key={imp.area}
                    className="flex items-center gap-4 rounded-xl border border-pomg-border bg-pomg-card/60 p-5"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-pomg-purple/15">
                      <Zap className="h-5 w-5 text-pomg-purple-light" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">
                        {imp.area}
                      </p>
                      <p className="text-xs text-pomg-muted">{imp.impact}</p>
                    </div>
                    <p className="font-display text-lg text-pomg-success">
                      +{fmtUSD(imp.revenue)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Annual projection */}
            <div className="mx-auto max-w-3xl rounded-2xl border border-pomg-border bg-pomg-surface/50 p-8 text-center md:p-12">
              <p className="mb-6 font-display text-sm uppercase tracking-[0.2em] text-pomg-muted">
                Annual Revenue Impact
              </p>
              <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-pomg-dim">
                    {isDemoMode ? "Example Current" : "Current"}
                  </p>
                  <p className="font-display text-3xl text-pomg-muted">
                    {fmtUSD(currentAnnual)}
                  </p>
                </div>
                <ArrowRight className="h-6 w-6 rotate-90 text-pomg-dim md:rotate-0" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-pomg-gold/70">
                    {isDemoMode ? "Example Projected" : "Projected"}
                  </p>
                  <p className="font-display text-3xl text-pomg-gold">
                    {fmtUSD(projectedAnnual)}
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <p className="font-display text-5xl text-pomg-success md:text-6xl">
                  +{fmtUSD(deltaAnnual)}
                </p>
                <p className="mt-2 text-sm text-pomg-success/70">
                  additional revenue per year
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════════
            5. IMPLEMENTATION TIMELINE — "THE ROADMAP"
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-pomg-darker py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="mb-6 text-center">
              <p className="font-display text-sm uppercase tracking-[0.25em] text-pomg-muted">
                Implementation
              </p>
            </div>
            <h2 className="mb-16 text-center font-display text-4xl uppercase text-white md:text-5xl">
              THE ROADMAP
            </h2>

            {/* Vertical timeline */}
            <div className="mx-auto max-w-2xl">
              <div className="relative pl-10 md:pl-14">
                {/* Vertical line */}
                <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-pomg-gold via-pomg-border-light to-pomg-border md:left-6" />

                {timeline.map((phase, idx) => (
                  <div
                    key={phase.phase}
                    className={`relative pb-14 ${idx === timeline.length - 1 ? "pb-0" : ""}`}
                  >
                    {/* Circle node */}
                    <div
                      className={`absolute -left-[calc(1rem-6px)] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 md:-left-[calc(1.5rem-6px)] ${
                        phase.active
                          ? "border-pomg-gold bg-pomg-gold/20 shadow-[0_0_12px_rgba(201,168,76,0.4)]"
                          : "border-pomg-border bg-pomg-surface"
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          phase.active ? "bg-pomg-gold" : "bg-pomg-dim"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="rounded-xl border border-pomg-border bg-pomg-card p-6 transition-all duration-300 hover:border-pomg-border-light">
                      <div className="mb-2 flex items-center gap-3">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                            phase.active
                              ? "bg-pomg-gold/15 text-pomg-gold"
                              : "bg-pomg-surface text-pomg-dim"
                          }`}
                        >
                          Phase {phase.phase}
                        </span>
                        <span className="text-xs text-pomg-dim">
                          {phase.weeks}
                        </span>
                      </div>
                      <h3 className="mb-2 font-display text-xl uppercase text-white">
                        {phase.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-pomg-muted">
                        {phase.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════════
            6. ROI — "THE INVESTMENT"
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-pomg-dark py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="mb-6 text-center">
              <p className="font-display text-sm uppercase tracking-[0.25em] text-pomg-muted">
                Return on Investment
              </p>
            </div>
            <h2 className="mb-16 text-center font-display text-4xl uppercase text-white md:text-5xl">
              THE INVESTMENT
            </h2>

            <div className="mx-auto max-w-3xl">
              {/* Visual bar comparison */}
              <div className="mb-12 space-y-6">
                {/* One-time build */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-pomg-muted">
                      One-Time Build Cost
                    </span>
                    <span className="font-display text-lg text-pomg-muted">
                      One-time
                    </span>
                  </div>
                  <div className="h-4 w-full overflow-hidden rounded-full bg-pomg-surface">
                    <div
                      className="h-full rounded-full bg-pomg-purple/60"
                      style={{ width: "8%" }}
                    />
                  </div>
                </div>

                {/* Monthly revenue increase */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">
                      Monthly Revenue Increase
                    </span>
                    <span className="font-display text-lg text-pomg-success">
                      +{fmtUSD(deltaMonthly)}/mo
                    </span>
                  </div>
                  <div className="h-4 w-full overflow-hidden rounded-full bg-pomg-surface">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pomg-success/80 to-pomg-success"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>

              {/* ROI cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="rounded-xl border border-pomg-border bg-pomg-card p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-pomg-success/10">
                    <DollarSign className="h-6 w-6 text-pomg-success" />
                  </div>
                  <p className="font-display text-2xl text-pomg-success">
                    &lt; 30 Days
                  </p>
                  <p className="mt-1 text-xs text-pomg-muted">ROI Payback</p>
                </div>

                <div className="rounded-xl border border-pomg-border bg-pomg-card p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-pomg-gold/10">
                    <TrendingUp className="h-6 w-6 text-pomg-gold" />
                  </div>
                  <p className="font-display text-2xl text-pomg-gold">
                    +{fmtUSD(deltaAnnual)}
                  </p>
                  <p className="mt-1 text-xs text-pomg-muted">
                    Year 1 Revenue Lift
                  </p>
                </div>

                <div className="rounded-xl border border-pomg-border bg-pomg-card p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-pomg-purple/10">
                    <CheckCircle2 className="h-6 w-6 text-pomg-purple-light" />
                  </div>
                  <p className="font-display text-2xl text-pomg-purple-light">
                    8 Weeks
                  </p>
                  <p className="mt-1 text-xs text-pomg-muted">
                    Full Delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════════
            7. CTA — "LET'S BUILD THIS"
        ═══════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-pomg-purple/20 via-pomg-darker to-pomg-darker py-28">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pomg-purple/[0.06] blur-[100px]" />
          </div>
          <div className="noise-overlay absolute inset-0" />

          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
            <h2 className="mb-6 font-display text-5xl uppercase text-white md:text-6xl lg:text-7xl">
              LET&apos;S BUILD THIS
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-lg text-pomg-muted md:text-xl">
              Ready to turn your website into a revenue engine?
            </p>

            {/* Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:+18016664692"
                className="btn-gold inline-flex items-center gap-2.5 rounded-lg px-8 py-4 font-display text-base uppercase tracking-wider"
              >
                <Phone className="h-5 w-5" />
                Schedule a Call
              </a>
              <Link
                href="/dashboard"
                className="btn-primary inline-flex items-center gap-2.5 rounded-lg px-8 py-4 font-display text-base uppercase tracking-wider"
              >
                Explore the Demo
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Contact info */}
            <div className="mt-12 flex flex-col items-center justify-center gap-4 text-sm text-pomg-muted sm:flex-row sm:gap-8">
              <a
                href="mailto:team@pomg.com"
                className="flex items-center gap-2 transition-colors hover:text-pomg-text"
              >
                <Mail className="h-4 w-4 text-pomg-dim" />
                team@pomg.com
              </a>
              <a
                href="tel:+18016664692"
                className="flex items-center gap-2 transition-colors hover:text-pomg-text"
              >
                <Phone className="h-4 w-4 text-pomg-dim" />
                (801) 666-4692
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
