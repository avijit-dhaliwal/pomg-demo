"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { products, Product } from "@/data/products";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  ShoppingCart,
  X,
  Target,
  Crosshair,
  Shield,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  PLATFORM DATA                                                      */
/* ------------------------------------------------------------------ */

interface Platform {
  id: string;
  name: string;
  icon: typeof Crosshair;
  description: string;
  compatibleCategories: string[];
}

const platforms: Platform[] = [
  {
    id: "AR-15",
    name: "AR-15",
    icon: Crosshair,
    description:
      "A versatile rifle platform known for modularity, accuracy, and broad aftermarket support.",
    compatibleCategories: ["firearms", "silencers", "optics", "accessories"],
  },
  {
    id: "MCX",
    name: "SIG MCX",
    icon: Zap,
    description:
      "SIG's next-generation modular platform. Short-stroke piston, folding stock, quick-change barrel.",
    compatibleCategories: ["firearms", "silencers", "optics", "accessories"],
  },
  {
    id: "Roller-Delayed",
    name: "Roller-Delayed",
    icon: Shield,
    description:
      "HK's legendary roller-delayed blowback system. Smooth recoil, surgical precision, iconic design.",
    compatibleCategories: ["firearms", "silencers", "optics", "accessories"],
  },
  {
    id: "1911",
    name: "1911",
    icon: Target,
    description:
      "The classic .45 ACP platform. Over a century of proven performance, now available in premium configurations.",
    compatibleCategories: ["firearms", "silencers", "accessories"],
  },
  {
    id: "Bolt Action",
    name: "Bolt Action",
    icon: Crosshair,
    description:
      "Precision rifle platform for long-range shooting and hunting. Maximum accuracy at distance.",
    compatibleCategories: ["firearms", "silencers", "optics", "accessories"],
  },
];

/* ------------------------------------------------------------------ */
/*  STEP CONFIG                                                        */
/* ------------------------------------------------------------------ */

const stepLabels = [
  "Platform",
  "Firearm",
  "Accessories",
  "Review",
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function BuildYourSetupPage() {
  const [step, setStep] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedFirearm, setSelectedFirearm] = useState<Product | null>(null);
  const [selectedAccessories, setSelectedAccessories] = useState<Product[]>([]);

  /* ── Derived data ───────────────────────────────────────────────── */

  const platformFirearms = useMemo(() => {
    if (!selectedPlatform) return [];
    return products.filter(
      (p) =>
        p.category === "firearms" &&
        p.platform === selectedPlatform &&
        p.inStock
    );
  }, [selectedPlatform]);

  const compatibleAccessories = useMemo(() => {
    if (!selectedPlatform) return [];
    const platform = platforms.find((p) => p.id === selectedPlatform);
    if (!platform) return [];
    return products.filter(
      (p) =>
        p.category !== "firearms" &&
        platform.compatibleCategories.includes(p.category) &&
        p.inStock
    );
  }, [selectedPlatform]);

  const allItems = useMemo(() => {
    const items: Product[] = [];
    if (selectedFirearm) items.push(selectedFirearm);
    items.push(...selectedAccessories);
    return items;
  }, [selectedFirearm, selectedAccessories]);

  const subtotal = allItems.reduce((sum, p) => sum + p.price, 0);
  const itemCount = allItems.length;
  const discountApplied = itemCount >= 3;
  const discountAmount = discountApplied ? subtotal * 0.05 : 0;
  const total = subtotal - discountAmount;

  /* ── Helpers ────────────────────────────────────────────────────── */

  const canGoNext = () => {
    if (step === 0) return !!selectedPlatform;
    if (step === 1) return !!selectedFirearm;
    return true;
  };

  const goNext = () => {
    if (canGoNext() && step < 3) setStep(step + 1);
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const toggleAccessory = (product: Product) => {
    setSelectedAccessories((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const removeItem = (id: string) => {
    if (selectedFirearm?.id === id) setSelectedFirearm(null);
    setSelectedAccessories((prev) => prev.filter((p) => p.id !== id));
  };

  const resetBuild = () => {
    setStep(0);
    setSelectedPlatform(null);
    setSelectedFirearm(null);
    setSelectedAccessories([]);
  };

  /* ── Format ─────────────────────────────────────────────────────── */

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  /* ── Render ─────────────────────────────────────────────────────── */

  return (
    <>
      <Header />

      <main className="min-h-screen bg-pomg-dark">
        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-pomg-border">
          <div className="noise-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-pomg-purple/10 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
              Build Your Setup
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-pomg-muted">
              Choose your platform, pick your firearm, add accessories, and
              see the complete build. Bundle 3+ items for 5% off.
            </p>
          </div>
        </section>

        {/* ── Progress Bar ────────────────────────────────────────── */}
        <div className="border-b border-pomg-border bg-pomg-darker">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {stepLabels.map((label, idx) => (
                <button
                  key={label}
                  onClick={() => {
                    if (idx < step) setStep(idx);
                  }}
                  className="flex items-center gap-2"
                  disabled={idx > step}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full font-display text-sm transition-colors ${
                      idx < step
                        ? "bg-pomg-purple text-white"
                        : idx === step
                        ? "border-2 border-pomg-purple bg-pomg-purple/20 text-pomg-purple-light"
                        : "border border-pomg-border bg-pomg-surface text-pomg-dim"
                    }`}
                  >
                    {idx < step ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      idx + 1
                    )}
                  </span>
                  <span
                    className={`hidden text-sm sm:block ${
                      idx <= step ? "text-white" : "text-pomg-dim"
                    }`}
                  >
                    {label}
                  </span>
                  {idx < stepLabels.length - 1 && (
                    <div
                      className={`mx-2 hidden h-px w-8 sm:block lg:w-16 ${
                        idx < step ? "bg-pomg-purple" : "bg-pomg-border"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content + Sidebar ────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* ── Main content (2/3) ──────────────────────────────── */}
            <div className="lg:col-span-2">
              {/* ── Step 0: Platform ──────────────────────────────── */}
              {step === 0 && (
                <div>
                  <h2 className="font-display text-3xl uppercase tracking-tight text-white">
                    Choose Your Platform
                  </h2>
                  <div className="section-divider mb-8 mt-4" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {platforms.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedPlatform(p.id);
                          setSelectedFirearm(null);
                          setSelectedAccessories([]);
                        }}
                        className={`glass-card p-6 text-left transition-all ${
                          selectedPlatform === p.id
                            ? "border-pomg-purple bg-pomg-purple/10"
                            : "hover:border-pomg-border-light"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pomg-purple/10">
                            <p.icon className="h-5 w-5 text-pomg-purple-light" />
                          </div>
                          {selectedPlatform === p.id && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pomg-purple">
                              <Check className="h-3.5 w-3.5 text-white" />
                            </div>
                          )}
                        </div>
                        <h3 className="mt-4 font-display text-xl uppercase text-white">
                          {p.name}
                        </h3>
                        <p className="mt-1 text-sm text-pomg-muted">
                          {p.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Step 1: Firearm ───────────────────────────────── */}
              {step === 1 && (
                <div>
                  <h2 className="font-display text-3xl uppercase tracking-tight text-white">
                    Choose Your Firearm
                  </h2>
                  <p className="mt-2 text-sm text-pomg-muted">
                    Showing {selectedPlatform} platform firearms in stock
                  </p>
                  <div className="section-divider mb-8 mt-4" />

                  {platformFirearms.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                      <p className="text-pomg-muted">
                        No firearms currently in stock for this platform.
                        Please check back soon or{" "}
                        <span className="text-pomg-purple-light">
                          contact us
                        </span>{" "}
                        for special orders.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {platformFirearms.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => setSelectedFirearm(product)}
                          className={`glass-card flex w-full items-center gap-4 p-4 text-left transition-all sm:gap-6 ${
                            selectedFirearm?.id === product.id
                              ? "border-pomg-purple bg-pomg-purple/10"
                              : "hover:border-pomg-border-light"
                          }`}
                        >
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-pomg-surface sm:h-24 sm:w-24">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain p-2"
                              sizes="96px"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-display text-lg uppercase text-white">
                              {product.name}
                            </h3>
                            <p className="text-sm text-pomg-muted">
                              {product.manufacturer} &middot;{" "}
                              {product.caliber}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="font-display text-lg text-pomg-gold">
                              {fmt(product.price)}
                            </span>
                            {selectedFirearm?.id === product.id && (
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pomg-purple">
                                <Check className="h-3.5 w-3.5 text-white" />
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── Step 2: Accessories ───────────────────────────── */}
              {step === 2 && (
                <div>
                  <h2 className="font-display text-3xl uppercase tracking-tight text-white">
                    Add Accessories
                  </h2>
                  <p className="mt-2 text-sm text-pomg-muted">
                    Select compatible optics, silencers, and accessories for
                    your build. Select multiple items.
                  </p>
                  <div className="section-divider mb-8 mt-4" />

                  {compatibleAccessories.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                      <p className="text-pomg-muted">
                        No compatible accessories currently in stock.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {compatibleAccessories.map((product) => {
                        const isSelected = selectedAccessories.some(
                          (a) => a.id === product.id
                        );
                        return (
                          <button
                            key={product.id}
                            onClick={() => toggleAccessory(product)}
                            className={`glass-card p-4 text-left transition-all ${
                              isSelected
                                ? "border-pomg-gold bg-pomg-gold/5"
                                : "hover:border-pomg-border-light"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-pomg-surface">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-contain p-1"
                                  sizes="64px"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="text-xs uppercase text-pomg-dim">
                                      {product.category}
                                    </p>
                                    <h3 className="font-display text-sm uppercase text-white">
                                      {product.name}
                                    </h3>
                                  </div>
                                  <div
                                    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded ${
                                      isSelected
                                        ? "bg-pomg-gold text-pomg-dark"
                                        : "border border-pomg-border"
                                    }`}
                                  >
                                    {isSelected && (
                                      <Check className="h-3 w-3" />
                                    )}
                                  </div>
                                </div>
                                <p className="mt-1 font-display text-sm text-pomg-gold">
                                  {fmt(product.price)}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ── Step 3: Review ────────────────────────────────── */}
              {step === 3 && (
                <div>
                  <h2 className="font-display text-3xl uppercase tracking-tight text-white">
                    Review Your Build
                  </h2>
                  <p className="mt-2 text-sm text-pomg-muted">
                    {selectedPlatform} Platform Build &middot; {itemCount}{" "}
                    {itemCount === 1 ? "item" : "items"}
                  </p>
                  <div className="section-divider mb-8 mt-4" />

                  {allItems.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                      <p className="text-pomg-muted">
                        Your build is empty. Go back and add items.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {allItems.map((product) => (
                        <div
                          key={product.id}
                          className="glass-card flex items-center gap-4 p-4"
                        >
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-pomg-surface">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain p-1"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs uppercase text-pomg-dim">
                              {product.category}
                            </p>
                            <h3 className="font-display text-base uppercase text-white">
                              {product.name}
                            </h3>
                            <p className="text-xs text-pomg-muted">
                              {product.manufacturer}
                            </p>
                          </div>
                          <span className="font-display text-lg text-pomg-gold">
                            {fmt(product.price)}
                          </span>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-pomg-dim transition-colors hover:bg-pomg-danger/20 hover:text-red-400"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Summary */}
                  {allItems.length > 0 && (
                    <div className="glass-card mt-6 p-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-pomg-muted">Subtotal</span>
                          <span className="text-white">{fmt(subtotal)}</span>
                        </div>
                        {discountApplied && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-green-400">
                              Bundle Discount (5%)
                            </span>
                            <span className="text-green-400">
                              -{fmt(discountAmount)}
                            </span>
                          </div>
                        )}
                        <div className="border-t border-pomg-border pt-3">
                          <div className="flex items-center justify-between">
                            <span className="font-display text-lg uppercase text-white">
                              Total
                            </span>
                            <span className="font-display text-2xl text-pomg-gold">
                              {fmt(total)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button className="btn-gold mt-6 w-full justify-center">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add All to Cart
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ── Navigation Buttons ─────────────────────────────── */}
              <div className="mt-8 flex items-center justify-between">
                {step > 0 ? (
                  <button
                    onClick={goBack}
                    className="flex items-center gap-2 rounded-lg border border-pomg-border px-5 py-2.5 text-sm text-pomg-muted transition-colors hover:border-pomg-border-light hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    onClick={goNext}
                    disabled={!canGoNext()}
                    className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={resetBuild}
                    className="flex items-center gap-2 rounded-lg border border-pomg-border px-5 py-2.5 text-sm text-pomg-muted transition-colors hover:border-pomg-border-light hover:text-white"
                  >
                    Start Over
                  </button>
                )}
              </div>
            </div>

            {/* ── Sticky Sidebar ──────────────────────────────────── */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg uppercase text-white">
                    Your Build
                  </h3>
                  <div className="my-4 h-px bg-pomg-border" />

                  {selectedPlatform && (
                    <div className="mb-4">
                      <p className="text-xs uppercase text-pomg-dim">
                        Platform
                      </p>
                      <p className="font-display text-sm text-pomg-purple-light">
                        {selectedPlatform}
                      </p>
                    </div>
                  )}

                  {allItems.length === 0 ? (
                    <p className="text-sm text-pomg-dim">No items yet</p>
                  ) : (
                    <div className="space-y-3">
                      {allItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs text-white">
                              {item.name}
                            </p>
                            <p className="text-xs text-pomg-dim">
                              {item.category}
                            </p>
                          </div>
                          <span className="ml-2 flex-shrink-0 text-xs text-pomg-gold">
                            {fmt(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="my-4 h-px bg-pomg-border" />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-pomg-muted">
                        Items ({itemCount})
                      </span>
                      <span className="text-white">{fmt(subtotal)}</span>
                    </div>
                    {discountApplied && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-400">Bundle -5%</span>
                        <span className="text-green-400">
                          -{fmt(discountAmount)}
                        </span>
                      </div>
                    )}
                    {!discountApplied && itemCount > 0 && (
                      <p className="text-xs text-pomg-dim">
                        Add {3 - itemCount} more item
                        {3 - itemCount > 1 ? "s" : ""} for 5% bundle discount
                      </p>
                    )}
                    <div className="border-t border-pomg-border pt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm uppercase text-white">
                          Total
                        </span>
                        <span className="font-display text-xl text-pomg-gold">
                          {fmt(total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
