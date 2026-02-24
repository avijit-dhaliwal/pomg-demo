"use client";

import { useState, useMemo } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { products, type Product } from "@/data/products";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  ShoppingCart,
  Plus,
  Minus,
  X,
  Target,
  Crosshair,
  Shield,
  Zap,
} from "lucide-react";

/* ─── Constants ─── */
const STEPS = [
  { id: 1, label: "Platform" },
  { id: 2, label: "Firearm" },
  { id: 3, label: "Accessories" },
  { id: 4, label: "Review" },
];

const PLATFORMS = [
  {
    id: "AR-15",
    name: "AR-15",
    description:
      "America's most popular rifle platform. Modular, ergonomic, and infinitely customizable.",
    icon: Crosshair,
  },
  {
    id: "MCX",
    name: "SIG MCX",
    description:
      "Next-gen piston-driven modular platform with folding stock and quick-change barrels.",
    icon: Zap,
  },
  {
    id: "Roller-Delayed",
    name: "Roller-Delayed / MP5",
    description:
      "Legendary HK roller-delayed blowback system. The smoothest shooting platform ever made.",
    icon: Shield,
  },
  {
    id: "1911",
    name: "1911",
    description:
      "Over a century of proven design. The single-action pistol that defined American firearms.",
    icon: Target,
  },
  {
    id: "Bolt Action",
    name: "Bolt Action",
    description:
      "Precision rifle platform for long-range shooting. Maximum accuracy, minimal complexity.",
    icon: Crosshair,
  },
];

const BUNDLE_DISCOUNT_PERCENT = 5;

/* ─── Compatibility map: platform → compatible accessory subcategories ─── */
const PLATFORM_ACCESSORY_MAP: Record<string, string[]> = {
  "AR-15": [
    "Weapon Lights",
    "Magazines",
    "Triggers",
    "Muzzle Devices",
    "Optic Mounts",
    "Suppressor Accessories",
  ],
  MCX: [
    "Weapon Lights",
    "Muzzle Devices",
    "Optic Mounts",
    "Suppressor Accessories",
  ],
  "Roller-Delayed": [
    "Weapon Lights",
    "Suppressor Accessories",
    "Optic Mounts",
  ],
  "1911": ["Magazines"],
  "Bolt Action": [
    "Optic Mounts",
    "Muzzle Devices",
    "Suppressor Accessories",
  ],
};

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function BuildYourSetupPage() {
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedFirearm, setSelectedFirearm] = useState<Product | null>(null);
  const [selectedAccessories, setSelectedAccessories] = useState<Product[]>([]);

  /* ─── Derived data ─── */
  const platformFirearms = useMemo(() => {
    if (!selectedPlatform) return [];
    return products.filter(
      (p) => p.category === "firearms" && p.platform === selectedPlatform
    );
  }, [selectedPlatform]);

  const compatibleAccessories = useMemo(() => {
    if (!selectedPlatform) return [];
    const subcats = PLATFORM_ACCESSORY_MAP[selectedPlatform] ?? [];
    // Include optics and silencers as well
    const optics = products.filter((p) => p.category === "optics");
    const silencers = products.filter((p) => p.category === "silencers");
    const accessories = products.filter(
      (p) => p.category === "accessories" && subcats.includes(p.subcategory)
    );
    return [...optics, ...silencers, ...accessories];
  }, [selectedPlatform]);

  const allSelectedItems = useMemo(() => {
    const items: Product[] = [];
    if (selectedFirearm) items.push(selectedFirearm);
    items.push(...selectedAccessories);
    return items;
  }, [selectedFirearm, selectedAccessories]);

  const subtotal = useMemo(
    () => allSelectedItems.reduce((sum, item) => sum + item.price, 0),
    [allSelectedItems]
  );

  const bundleSavings = useMemo(
    () =>
      allSelectedItems.length >= 3
        ? Math.round(subtotal * (BUNDLE_DISCOUNT_PERCENT / 100))
        : 0,
    [subtotal, allSelectedItems.length]
  );

  const total = subtotal - bundleSavings;

  /* ─── Handlers ─── */
  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
    // Reset downstream selections when platform changes
    setSelectedFirearm(null);
    setSelectedAccessories([]);
  };

  const handleFirearmSelect = (firearm: Product) => {
    setSelectedFirearm(firearm);
  };

  const toggleAccessory = (accessory: Product) => {
    setSelectedAccessories((prev) => {
      const exists = prev.find((a) => a.id === accessory.id);
      if (exists) return prev.filter((a) => a.id !== accessory.id);
      return [...prev, accessory];
    });
  };

  const removeItem = (productId: string) => {
    if (selectedFirearm?.id === productId) {
      setSelectedFirearm(null);
    } else {
      setSelectedAccessories((prev) => prev.filter((a) => a.id !== productId));
    }
  };

  const canGoNext = () => {
    if (step === 1) return !!selectedPlatform;
    if (step === 2) return !!selectedFirearm;
    return true;
  };

  const goNext = () => {
    if (step < 4 && canGoNext()) setStep(step + 1);
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  /* ─── Format helpers ─── */
  const fmt = (n: number) => "$" + n.toLocaleString();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-pomg-darker">
        {/* ── Hero Section ── */}
        <section className="relative overflow-hidden border-b border-pomg-border">
          <div className="absolute inset-0 bg-gradient-to-b from-pomg-purple/10 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Build Your{" "}
              <span className="text-pomg-gold">Setup</span>
            </h1>
            <p className="mt-4 text-pomg-muted text-base sm:text-lg max-w-2xl mx-auto">
              Walk through our guided builder to assemble a complete, compatible
              firearms package. Select your platform, pick your firearm, add
              accessories, and see your total savings.
            </p>
          </div>
        </section>

        {/* ── Progress Bar ── */}
        <div className="sticky top-0 z-30 bg-pomg-dark/95 backdrop-blur-xl border-b border-pomg-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                  {/* Step circle */}
                  <button
                    onClick={() => {
                      // Allow going back to completed steps
                      if (s.id < step) setStep(s.id);
                    }}
                    className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 text-sm font-bold transition-all duration-300 shrink-0 ${
                      s.id < step
                        ? "bg-pomg-gold border-pomg-gold text-pomg-dark cursor-pointer"
                        : s.id === step
                        ? "border-pomg-purple bg-pomg-purple/20 text-pomg-purple-light"
                        : "border-pomg-border bg-pomg-dark text-pomg-muted cursor-default"
                    }`}
                  >
                    {s.id < step ? <Check className="w-4 h-4" /> : s.id}
                  </button>
                  {/* Step label */}
                  <span
                    className={`ml-2 text-xs sm:text-sm font-medium hidden sm:inline ${
                      s.id <= step ? "text-pomg-text" : "text-pomg-muted"
                    }`}
                  >
                    {s.label}
                  </span>
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 mx-3 sm:mx-4">
                      <div
                        className={`h-0.5 rounded-full transition-all duration-500 ${
                          s.id < step ? "bg-pomg-gold" : "bg-pomg-border"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main Content Area ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8">
            {/* Left: Step Content */}
            <div className="min-w-0">
              {/* ════════════════════════════════════════════
                  STEP 1: Choose Platform
                  ════════════════════════════════════════════ */}
              {step === 1 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Choose Your Platform
                  </h2>
                  <p className="text-pomg-muted mb-8">
                    Select the firearms platform you want to build around. This
                    determines your compatible firearms and accessories.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PLATFORMS.map((platform) => {
                      const Icon = platform.icon;
                      const isSelected = selectedPlatform === platform.id;
                      const firearmCount = products.filter(
                        (p) =>
                          p.category === "firearms" &&
                          p.platform === platform.id
                      ).length;
                      return (
                        <button
                          key={platform.id}
                          onClick={() => handlePlatformSelect(platform.id)}
                          className={`group relative text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                            isSelected
                              ? "border-pomg-gold bg-pomg-gold/5 shadow-lg shadow-pomg-gold/10"
                              : "border-pomg-border bg-pomg-card hover:border-pomg-purple/50 hover:bg-pomg-card/80"
                          }`}
                        >
                          {/* Selection indicator */}
                          {isSelected && (
                            <div className="absolute top-3 right-3">
                              <div className="w-6 h-6 rounded-full bg-pomg-gold flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 text-pomg-dark" />
                              </div>
                            </div>
                          )}
                          <div
                            className={`p-3 rounded-xl inline-flex mb-4 ${
                              isSelected
                                ? "bg-pomg-gold/20 text-pomg-gold"
                                : "bg-pomg-dark text-pomg-purple-light group-hover:text-pomg-gold"
                            } transition-colors`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-1.5">
                            {platform.name}
                          </h3>
                          <p className="text-sm text-pomg-muted leading-relaxed mb-3">
                            {platform.description}
                          </p>
                          <span className="text-xs text-pomg-purple-light font-medium">
                            {firearmCount} firearm{firearmCount !== 1 ? "s" : ""}{" "}
                            available
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ════════════════════════════════════════════
                  STEP 2: Choose Firearm
                  ════════════════════════════════════════════ */}
              {step === 2 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Choose Your Firearm
                  </h2>
                  <p className="text-pomg-muted mb-8">
                    Showing{" "}
                    <span className="text-pomg-gold font-medium">
                      {
                        PLATFORMS.find((p) => p.id === selectedPlatform)
                          ?.name
                      }
                    </span>{" "}
                    platform firearms. Select one to continue.
                  </p>

                  {platformFirearms.length === 0 ? (
                    <div className="text-center py-16 bg-pomg-card border border-pomg-border rounded-2xl">
                      <Crosshair className="w-12 h-12 text-pomg-muted mx-auto mb-4" />
                      <p className="text-pomg-muted text-lg">
                        No firearms currently available for this platform.
                      </p>
                      <p className="text-pomg-muted text-sm mt-2">
                        Try selecting a different platform.
                      </p>
                      <button
                        onClick={goBack}
                        className="mt-6 px-6 py-2.5 rounded-xl bg-pomg-purple text-white text-sm font-medium hover:bg-pomg-purple/80 transition-colors"
                      >
                        Back to Platforms
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {platformFirearms.map((firearm) => {
                        const isSelected =
                          selectedFirearm?.id === firearm.id;
                        return (
                          <button
                            key={firearm.id}
                            onClick={() => handleFirearmSelect(firearm)}
                            className={`group relative text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                              isSelected
                                ? "border-pomg-gold bg-pomg-gold/5 shadow-lg shadow-pomg-gold/10"
                                : "border-pomg-border bg-pomg-card hover:border-pomg-purple/50"
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-3 right-3">
                                <div className="w-6 h-6 rounded-full bg-pomg-gold flex items-center justify-center">
                                  <Check className="w-3.5 h-3.5 text-pomg-dark" />
                                </div>
                              </div>
                            )}

                            {/* Image placeholder */}
                            <div className="w-full h-40 rounded-xl product-image-placeholder mb-4 flex items-center justify-center">
                              <Crosshair
                                className={`w-10 h-10 ${
                                  isSelected
                                    ? "text-pomg-gold/50"
                                    : "text-pomg-border"
                                }`}
                              />
                            </div>

                            {/* Badges */}
                            <div className="flex items-center gap-2 mb-2">
                              {firearm.isNew && (
                                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-pomg-gold/20 text-pomg-gold rounded-md">
                                  New
                                </span>
                              )}
                              {firearm.isNfa && (
                                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-400 rounded-md">
                                  NFA
                                </span>
                              )}
                              {!firearm.inStock && (
                                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-pomg-border text-pomg-muted rounded-md">
                                  Out of Stock
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-pomg-muted font-medium uppercase tracking-wider mb-1">
                              {firearm.manufacturer}
                            </p>
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {firearm.name}
                            </h3>

                            {/* Key specs */}
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-pomg-muted mb-3">
                              {firearm.caliber && (
                                <span>{firearm.caliber}</span>
                              )}
                              {firearm.barrelLength && (
                                <span>{firearm.barrelLength} barrel</span>
                              )}
                              {firearm.weight && (
                                <span>{firearm.weight}</span>
                              )}
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-bold text-pomg-gold">
                                {fmt(firearm.price)}
                              </span>
                              {firearm.msrp > firearm.price && (
                                <span className="text-sm text-pomg-muted line-through">
                                  {fmt(firearm.msrp)}
                                </span>
                              )}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1.5 mt-2">
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-3.5 h-3.5 ${
                                      i < Math.round(firearm.rating)
                                        ? "text-pomg-gold"
                                        : "text-pomg-border"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-xs text-pomg-muted">
                                ({firearm.reviewCount})
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ════════════════════════════════════════════
                  STEP 3: Choose Accessories
                  ════════════════════════════════════════════ */}
              {step === 3 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Choose Accessories
                  </h2>
                  <p className="text-pomg-muted mb-2">
                    Select compatible accessories for your{" "}
                    <span className="text-pomg-gold font-medium">
                      {selectedFirearm?.name}
                    </span>
                    . Multi-select any combination.
                  </p>
                  <p className="text-xs text-pomg-purple-light mb-8">
                    <Zap className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
                    Highlighted items are recommended for your setup. Add 3+ items total for {BUNDLE_DISCOUNT_PERCENT}% bundle savings.
                  </p>

                  {compatibleAccessories.length === 0 ? (
                    <div className="text-center py-16 bg-pomg-card border border-pomg-border rounded-2xl">
                      <p className="text-pomg-muted">
                        No compatible accessories found.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {compatibleAccessories.map((accessory) => {
                        const isSelected = selectedAccessories.some(
                          (a) => a.id === accessory.id
                        );
                        // Check if this accessory is in the firearm's relatedIds
                        const isRecommended =
                          selectedFirearm?.relatedIds.includes(
                            accessory.id
                          ) ?? false;

                        return (
                          <button
                            key={accessory.id}
                            onClick={() => toggleAccessory(accessory)}
                            className={`group relative text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                              isSelected
                                ? "border-pomg-gold bg-pomg-gold/5"
                                : isRecommended
                                ? "border-pomg-purple/50 bg-pomg-purple/5 hover:border-pomg-purple"
                                : "border-pomg-border bg-pomg-card hover:border-pomg-border/80"
                            }`}
                          >
                            {/* Selection indicator */}
                            <div className="absolute top-3 right-3">
                              <div
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                  isSelected
                                    ? "bg-pomg-gold border-pomg-gold"
                                    : "border-pomg-border bg-pomg-dark"
                                }`}
                              >
                                {isSelected && (
                                  <Check className="w-3.5 h-3.5 text-pomg-dark" />
                                )}
                              </div>
                            </div>

                            {/* Recommended badge */}
                            {isRecommended && !isSelected && (
                              <span className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-pomg-purple/30 text-pomg-purple-light rounded-md">
                                Recommended
                              </span>
                            )}

                            {/* Category badge */}
                            <span className="inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-pomg-dark text-pomg-muted rounded-md mb-3">
                              {accessory.category === "optics"
                                ? "Optic"
                                : accessory.category === "silencers"
                                ? "Suppressor"
                                : accessory.subcategory}
                            </span>

                            <p className="text-xs text-pomg-muted font-medium uppercase tracking-wider mb-0.5">
                              {accessory.manufacturer}
                            </p>
                            <h3 className="text-sm font-semibold text-white mb-1.5 pr-8">
                              {accessory.name}
                            </h3>
                            <p className="text-xs text-pomg-muted leading-relaxed line-clamp-2 mb-3">
                              {accessory.description.slice(0, 120)}...
                            </p>

                            {/* NFA badge */}
                            {accessory.isNfa && (
                              <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-400 rounded-md mb-2">
                                NFA Item
                              </span>
                            )}

                            <div className="flex items-baseline gap-2">
                              <span className="text-lg font-bold text-pomg-gold">
                                {fmt(accessory.price)}
                              </span>
                              {accessory.msrp > accessory.price && (
                                <span className="text-xs text-pomg-muted line-through">
                                  {fmt(accessory.msrp)}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ════════════════════════════════════════════
                  STEP 4: Review Your Build
                  ════════════════════════════════════════════ */}
              {step === 4 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Review Your Build
                  </h2>
                  <p className="text-pomg-muted mb-8">
                    Here&apos;s your complete{" "}
                    <span className="text-pomg-gold font-medium">
                      {
                        PLATFORMS.find((p) => p.id === selectedPlatform)
                          ?.name
                      }
                    </span>{" "}
                    setup. Remove items or go back to adjust.
                  </p>

                  {allSelectedItems.length === 0 ? (
                    <div className="text-center py-16 bg-pomg-card border border-pomg-border rounded-2xl">
                      <ShoppingCart className="w-12 h-12 text-pomg-muted mx-auto mb-4" />
                      <p className="text-pomg-muted text-lg">
                        Your build is empty.
                      </p>
                      <button
                        onClick={() => setStep(1)}
                        className="mt-6 px-6 py-2.5 rounded-xl bg-pomg-purple text-white text-sm font-medium hover:bg-pomg-purple/80 transition-colors"
                      >
                        Start Building
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Firearm */}
                      {selectedFirearm && (
                        <div className="bg-pomg-card border border-pomg-border rounded-2xl p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 min-w-0">
                              <div className="w-20 h-20 rounded-xl product-image-placeholder flex items-center justify-center shrink-0">
                                <Crosshair className="w-8 h-8 text-pomg-border" />
                              </div>
                              <div className="min-w-0">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-pomg-purple-light">
                                  Primary Firearm
                                </span>
                                <h3 className="text-base font-semibold text-white mt-0.5">
                                  {selectedFirearm.name}
                                </h3>
                                <p className="text-xs text-pomg-muted mt-1">
                                  {selectedFirearm.manufacturer} &bull;{" "}
                                  {selectedFirearm.caliber}
                                  {selectedFirearm.barrelLength &&
                                    ` \u2022 ${selectedFirearm.barrelLength}`}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-lg font-bold text-pomg-gold">
                                {fmt(selectedFirearm.price)}
                              </span>
                              <button
                                onClick={() =>
                                  removeItem(selectedFirearm.id)
                                }
                                className="p-1.5 rounded-lg hover:bg-red-500/10 text-pomg-muted hover:text-red-400 transition-colors"
                                aria-label="Remove firearm"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Accessories */}
                      {selectedAccessories.map((accessory) => (
                        <div
                          key={accessory.id}
                          className="bg-pomg-card border border-pomg-border rounded-xl p-4"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-pomg-muted">
                                {accessory.category === "optics"
                                  ? "Optic"
                                  : accessory.category === "silencers"
                                  ? "Suppressor"
                                  : accessory.subcategory}
                              </span>
                              <h3 className="text-sm font-semibold text-white mt-0.5">
                                {accessory.name}
                              </h3>
                              <p className="text-xs text-pomg-muted">
                                {accessory.manufacturer}
                                {accessory.isNfa && (
                                  <span className="ml-2 text-red-400 font-medium">
                                    NFA
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-base font-bold text-pomg-gold">
                                {fmt(accessory.price)}
                              </span>
                              <button
                                onClick={() =>
                                  removeItem(accessory.id)
                                }
                                className="p-1.5 rounded-lg hover:bg-red-500/10 text-pomg-muted hover:text-red-400 transition-colors"
                                aria-label={`Remove ${accessory.name}`}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Totals */}
                      <div className="bg-pomg-dark border border-pomg-border rounded-2xl p-6 mt-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-pomg-muted">
                              Subtotal ({allSelectedItems.length} item
                              {allSelectedItems.length !== 1 ? "s" : ""})
                            </span>
                            <span className="text-pomg-text font-medium">
                              {fmt(subtotal)}
                            </span>
                          </div>
                          {bundleSavings > 0 && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-green-400 flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5" />
                                Bundle Discount ({BUNDLE_DISCOUNT_PERCENT}%)
                              </span>
                              <span className="text-green-400 font-medium">
                                -{fmt(bundleSavings)}
                              </span>
                            </div>
                          )}
                          <div className="border-t border-pomg-border pt-3">
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-semibold text-white">
                                Total
                              </span>
                              <span className="text-2xl font-bold text-pomg-gold">
                                {fmt(total)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button className="mt-6 w-full py-4 rounded-xl bg-pomg-gold text-pomg-dark font-bold text-base hover:brightness-110 transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-pomg-gold/20">
                          <ShoppingCart className="w-5 h-5" />
                          Add All to Cart
                        </button>

                        {bundleSavings > 0 && (
                          <p className="text-center text-xs text-green-400 mt-3">
                            You&apos;re saving {fmt(bundleSavings)} with the
                            bundle discount!
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── Navigation Buttons ── */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-pomg-border">
                <button
                  onClick={goBack}
                  disabled={step === 1}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    step === 1
                      ? "text-pomg-muted cursor-not-allowed opacity-50"
                      : "text-pomg-text hover:text-white hover:bg-pomg-card border border-pomg-border"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>

                {step < 4 ? (
                  <button
                    onClick={goNext}
                    disabled={!canGoNext()}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      canGoNext()
                        ? "bg-pomg-purple text-white hover:bg-pomg-purple/80"
                        : "bg-pomg-border text-pomg-muted cursor-not-allowed"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-pomg-card border border-pomg-border text-pomg-text hover:text-white hover:border-pomg-purple/50 transition-all"
                  >
                    Start New Build
                  </button>
                )}
              </div>
            </div>

            {/* Right: Sticky Sidebar (Desktop) */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <div className="bg-pomg-card border border-pomg-border rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-pomg-gold" />
                    Build Summary
                  </h3>

                  {allSelectedItems.length === 0 ? (
                    <p className="text-sm text-pomg-muted py-4 text-center">
                      No items selected yet.
                    </p>
                  ) : (
                    <div className="space-y-3 mb-4">
                      {allSelectedItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-pomg-text truncate">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-pomg-muted">
                              {item.manufacturer}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-pomg-gold shrink-0">
                            {fmt(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-pomg-border pt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-pomg-muted">Subtotal</span>
                      <span className="text-pomg-text font-medium">
                        {fmt(subtotal)}
                      </span>
                    </div>
                    {bundleSavings > 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-green-400">Bundle Savings</span>
                        <span className="text-green-400 font-medium">
                          -{fmt(bundleSavings)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-pomg-border">
                      <span className="text-sm font-semibold text-white">
                        Total
                      </span>
                      <span className="text-lg font-bold text-pomg-gold">
                        {fmt(total)}
                      </span>
                    </div>
                  </div>

                  {allSelectedItems.length >= 3 && (
                    <div className="mt-3 p-2.5 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-[11px] text-green-400 text-center font-medium">
                        <Zap className="w-3 h-3 inline -mt-0.5 mr-1" />
                        {BUNDLE_DISCOUNT_PERCENT}% bundle discount applied!
                      </p>
                    </div>
                  )}

                  {allSelectedItems.length > 0 &&
                    allSelectedItems.length < 3 && (
                      <div className="mt-3 p-2.5 rounded-lg bg-pomg-purple/10 border border-pomg-purple/20">
                        <p className="text-[11px] text-pomg-purple-light text-center">
                          Add {3 - allSelectedItems.length} more item
                          {3 - allSelectedItems.length !== 1
                            ? "s"
                            : ""}{" "}
                          for {BUNDLE_DISCOUNT_PERCENT}% bundle discount
                        </p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
