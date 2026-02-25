"use client";

interface DemoDataBannerProps {
  className?: string;
}

export default function DemoDataBanner({
  className = "",
}: DemoDataBannerProps) {
  return (
    <div
      className={`sticky top-0 z-40 border-y border-pomg-gold/25 bg-pomg-gold/10 backdrop-blur ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-pomg-gold sm:px-6 lg:px-8">
        Demo site - all analytics, revenue, and projections are simulated until
        connected to client systems.
      </div>
    </div>
  );
}
