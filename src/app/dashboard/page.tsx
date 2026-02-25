"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AnalyticsDashboard from "@/components/analytics-dashboard";
import { BarChart3, Calendar, Download } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const dateRanges = ["7 Days", "30 Days", "90 Days", "12 Months", "All Time"];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const [activeRange, setActiveRange] = useState("30 Days");

  return (
    <>
      <Header />

      <main className="min-h-screen bg-pomg-dark">
        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-pomg-border">
          <div className="noise-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-pomg-purple/10 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pomg-gold/30 bg-pomg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pomg-gold">
                  Demo Data
                </div>
                <h1 className="font-display text-4xl uppercase tracking-tight text-white sm:text-5xl">
                  Revenue Intelligence
                </h1>
                <p className="mt-3 max-w-xl text-pomg-muted">
                  POMG Performance Analytics &mdash; real-time revenue,
                  inventory velocity, and customer insights for strategic
                  decision-making.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Date range pills */}
                <div className="flex items-center gap-1 rounded-lg border border-pomg-border bg-pomg-surface p-1">
                  <Calendar className="ml-2 h-4 w-4 text-pomg-dim" />
                  {dateRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => setActiveRange(range)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        activeRange === range
                          ? "bg-pomg-purple text-white"
                          : "text-pomg-muted hover:text-white"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                {/* Export */}
                <button className="flex items-center gap-2 rounded-lg border border-pomg-border bg-pomg-surface px-4 py-2 text-sm text-pomg-muted transition-colors hover:border-pomg-border-light hover:text-white">
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Dashboard ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <AnalyticsDashboard />
        </section>

        {/* ── Footer Note ─────────────────────────────────────────── */}
        <section className="border-t border-pomg-border bg-pomg-darker py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 text-center">
              <BarChart3 className="h-4 w-4 text-pomg-dim" />
              <p className="text-xs text-pomg-dim">
                Dashboard displays demo data for demonstration purposes.
                Revenue figures, inventory metrics, and customer analytics
                are simulated.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
