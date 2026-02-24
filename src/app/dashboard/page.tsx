"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AnalyticsDashboard from "@/components/analytics-dashboard";
import { BarChart3, Calendar, Download } from "lucide-react";

/* ─── Date range options (visual only) ─── */
const DATE_RANGES = [
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "90 Days", value: "90d" },
  { label: "This Year", value: "ytd" },
  { label: "All Time", value: "all" },
];

export default function DashboardPage() {
  const [selectedRange, setSelectedRange] = useState("30d");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-pomg-darker">
        {/* ── Hero / Title Section ── */}
        <section className="relative overflow-hidden border-b border-pomg-border">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-pomg-purple/15 via-transparent to-pomg-gold/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(67,67,122,0.15),transparent_60%)]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              {/* Left: Title + subtitle */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-pomg-purple/20 text-pomg-purple-light">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-pomg-gold/10 border border-pomg-gold/20 text-pomg-gold text-[11px] font-bold uppercase tracking-widest">
                    Demo Data
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Revenue Intelligence{" "}
                  <span className="text-pomg-gold">Dashboard</span>
                </h1>
                <p className="mt-3 text-pomg-muted text-base sm:text-lg max-w-2xl">
                  POMG Performance Analytics &mdash; A comprehensive view of your
                  store&apos;s revenue engine, traffic sources, conversion funnel,
                  and growth projections.
                </p>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-3 shrink-0">
                {/* Download button */}
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pomg-card border border-pomg-border text-pomg-text text-sm font-medium hover:border-pomg-purple/50 hover:text-white transition-all">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>

            {/* Date Range Selector */}
            <div className="mt-8 flex items-center gap-2 flex-wrap">
              <Calendar className="w-4 h-4 text-pomg-muted mr-1" />
              {DATE_RANGES.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setSelectedRange(range.value)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedRange === range.value
                      ? "bg-pomg-purple text-white shadow-md shadow-pomg-purple/20"
                      : "bg-pomg-card border border-pomg-border text-pomg-muted hover:text-pomg-text hover:border-pomg-purple/40"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Dashboard Content ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <AnalyticsDashboard />
        </section>

        {/* ── Footer Note ── */}
        <section className="border-t border-pomg-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="bg-pomg-card border border-pomg-border rounded-2xl p-6 sm:p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-pomg-purple/20 text-pomg-purple-light">
                  <BarChart3 className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                Revenue Engine Analytics
              </h3>
              <p className="text-pomg-muted text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                This dashboard demonstrates the analytics infrastructure
                included with the POMG revenue engine upgrade. Real-time KPI
                tracking, conversion funnel analysis, traffic source attribution,
                and AI-powered revenue projections &mdash; all built to help
                firearms retailers make data-driven decisions.
              </p>
              <div className="flex items-center justify-center gap-4 mt-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pomg-gold/10 border border-pomg-gold/20 text-pomg-gold text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-pomg-gold animate-pulse" />
                  Demo Mode
                </span>
                <span className="text-xs text-pomg-muted">
                  All data shown is simulated for demonstration purposes
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
