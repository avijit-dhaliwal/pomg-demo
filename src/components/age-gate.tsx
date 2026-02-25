"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AgeGate() {
  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("pomg-age-confirmed");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConfirmed(stored === "true");
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("pomg-age-confirmed", "true");
    setConfirmed(true);
  };

  const handleDeny = () => {
    window.location.href = "https://www.google.com";
  };

  // Still loading from localStorage
  if (confirmed === null) return null;

  // Already confirmed
  if (confirmed) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card rounded-2xl border border-pomg-border p-8 sm:p-10 max-w-md w-full mx-4 text-center">
        {/* Logo with glow */}
        <div className="relative flex justify-center mb-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-pomg-purple/20 blur-3xl pointer-events-none" />
          <Image
            src="/pomg-logo.png"
            alt="Piece of Mind Guns"
            width={200}
            height={200}
            className="relative z-10"
            priority
          />
        </div>

        {/* Message */}
        <p className="text-pomg-text text-sm leading-relaxed mb-6">
          Thank you for visiting Piece of Mind. Our site is for individuals 18
          years of age or older.
        </p>

        <p className="text-pomg-text font-medium text-base mb-8">
          Are you 18 years of age or older?
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleConfirm}
            className="btn-primary px-8 py-3 rounded-lg text-sm font-semibold tracking-wide cursor-pointer"
          >
            I&apos;m 18+
          </button>
          <button
            onClick={handleDeny}
            className="px-8 py-3 rounded-lg text-sm font-semibold tracking-wide border border-pomg-border-light text-pomg-muted hover:text-pomg-text hover:border-pomg-purple/50 transition-all cursor-pointer"
          >
            Under 18
          </button>
        </div>

        {/* Cookie notice */}
        <p className="text-pomg-dim text-xs mt-8 leading-relaxed">
          This site uses cookies. This information will not be used for
          marketing purposes.
        </p>
      </div>
    </div>
  );
}
