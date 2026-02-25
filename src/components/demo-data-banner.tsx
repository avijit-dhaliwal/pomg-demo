"use client";

import { AlertCircle } from "lucide-react";
import { isDemoMode } from "@/lib/demoMetrics";

interface DemoDataBannerProps {
  className?: string;
  message?: string;
}

export default function DemoDataBanner({
  className = "",
  message = "⚠️ Demo Environment — All metrics, revenue figures, projections, and SEO statistics shown below are simulated examples for demonstration purposes. Live data will replace these values once connected to Google Analytics, Search Console, and ecommerce systems.",
}: DemoDataBannerProps) {
  if (!isDemoMode) return null;

  return (
    <div
      className={`sticky top-0 z-40 border-y border-pomg-border-light bg-pomg-surface/90 backdrop-blur ${className}`}
    >
      <div className="mx-auto flex max-w-7xl items-start justify-center gap-2 px-4 py-3 text-center text-xs text-pomg-muted sm:px-6 lg:px-8">
        <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-pomg-gold" />
        <span>{message}</span>
      </div>
    </div>
  );
}
