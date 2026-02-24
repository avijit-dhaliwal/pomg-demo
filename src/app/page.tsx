"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import {
  getFeaturedProducts,
  products,
  manufacturers,
  categories,
} from "@/data/products";
import {
  Shield,
  Truck,
  Phone,
  Award,
  ChevronRight,
  ArrowRight,
  Star,
  Clock,
  MapPin,
  Crosshair,
  Target,
  Zap,
  Eye,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  SECTION DATA                                                       */
/* ------------------------------------------------------------------ */

const trustBadges = [
  {
    icon: Shield,
    title: "FFL Licensed Dealer",
    description: "Fully licensed & compliant federal firearms dealer in Utah",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Free shipping over $150. Most orders ship within 24 hours",
  },
  {
    icon: Phone,
    title: "Expert Support",
    description: "Real people who know the product — call, text, or email",
  },
  {
    icon: Award,
    title: "Authorized Dealer",
    description: "Factory-authorized for every brand we carry. Full warranty",
  },
];

const categoryCards: {
  id: string;
  name: string;
  count: number;
  icon: typeof Crosshair;
  gradient: string;
}[] = [
  {
    id: "firearms",
    name: "Firearms",
    count: categories.find((c) => c.id === "firearms")?.count ?? 0,
    icon: Crosshair,
    gradient: "from-pomg-purple/60 to-pomg-purple/20",
  },
  {
    id: "silencers",
    name: "Silencers",
    count: categories.find((c) => c.id === "silencers")?.count ?? 0,
    icon: Target,
    gradient: "from-pomg-gold/40 to-pomg-gold/10",
  },
  {
    id: "optics",
    name: "Optics",
    count: categories.find((c) => c.id === "optics")?.count ?? 0,
    icon: Eye,
    gradient: "from-emerald-600/40 to-emerald-900/10",
  },
  {
    id: "accessories",
    name: "Accessories",
    count: categories.find((c) => c.id === "accessories")?.count ?? 0,
    icon: Zap,
    gradient: "from-sky-600/40 to-sky-900/10",
  },
  {
    id: "knives",
    name: "Knives",
    count: categories.find((c) => c.id === "knives")?.count ?? 0,
    icon: Crosshair,
    gradient: "from-red-600/40 to-red-900/10",
  },
  {
    id: "apparel",
    name: "Apparel",
    count: categories.find((c) => c.id === "apparel")?.count ?? 0,
    icon: Award,
    gradient: "from-amber-600/40 to-amber-900/10",
  },
];

const testimonials = [
  {
    name: "Jason M.",
    rating: 5,
    text: "Bought my Noveske Gen 4 from POMG and the experience was flawless. They had it in stock when nobody else did, shipped next day, and followed up to make sure I was happy. These guys actually know what they're selling.",
    focus: "Noveske Gen 4 N4-PDW",
  },
  {
    name: "Rachel K.",
    rating: 5,
    text: "First time buying a silencer and I was nervous about the NFA process. POMG walked me through every step — fingerprints, photos, Form 4, everything. Got my Sandman-S approved in under 5 months. Cannot recommend them enough.",
    focus: "Dead Air Sandman-S",
  },
  {
    name: "Derek T.",
    rating: 5,
    text: "I've ordered optics and accessories from a dozen different shops online. POMG is the only one where I feel like a person and not a transaction. Prices are competitive, shipping is fast, and the product knowledge is unmatched.",
    focus: "EOTech EXPS3-0",
  },
];

const nfaSteps = [
  {
    step: 1,
    title: "Choose Your Silencer",
    description:
      "Browse our curated selection of suppressors from Dead Air, SIG, and more. We only carry what we'd run ourselves.",
  },
  {
    step: 2,
    title: "We Handle the Paperwork",
    description:
      "eForm 4, fingerprints, passport photo — we guide you through every step and file on your behalf. No guesswork.",
  },
  {
    step: 3,
    title: "Pick Up When Approved",
    description:
      "Once the ATF approves your form, we'll notify you same-day. Stop by, complete the 4473, and walk out quiet.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const featured = getFeaturedProducts();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      console.log("Newsletter signup:", newsletterEmail);
      setSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  /* ---------- star helper ---------- */
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? "fill-pomg-gold text-pomg-gold"
            : "fill-transparent text-pomg-muted/40"
        }`}
      />
    ));

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* ============================================================ */}
        {/*  1. HERO SECTION                                             */}
        {/* ============================================================ */}
        <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-pomg-darker">
          {/* Background layers */}
          <div className="absolute inset-0">
            {/* Dark base gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-pomg-darker via-pomg-dark to-pomg-darker" />
            {/* Purple radial glow */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(67,67,122,0.45) 0%, transparent 70%)",
              }}
            />
            {/* Subtle grain */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
              }}
            />
            {/* Subtle top-down light streak */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] opacity-20"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 60%)",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center py-32">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pomg-border bg-pomg-card/60 backdrop-blur-sm mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-pomg-muted tracking-wide">
                Utah&rsquo;s Premier Firearms Dealer
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] animate-slide-up">
              <span className="text-white">Premium Firearms.</span>
              <br />
              <span className="bg-gradient-to-r from-pomg-gold via-pomg-gold to-amber-300 bg-clip-text text-transparent">
                Uncompromising Quality.
              </span>
            </h1>

            {/* Sub-text */}
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-pomg-muted leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Utah&rsquo;s curated collection of the finest firearms, silencers, and
              accessories. Noveske. Daniel Defense. HK. Dead Air. Knights
              Armament.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.35s" }}>
              <Link
                href="/shop"
                className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-pomg-purple to-[#5a5a9e] text-white font-semibold text-base shadow-lg shadow-pomg-purple/25 hover:shadow-xl hover:shadow-pomg-purple/40 hover:brightness-110 transition-all duration-300"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/nfa-guide"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border border-pomg-border text-pomg-text font-semibold text-base hover:border-pomg-purple/50 hover:bg-pomg-card/50 transition-all duration-300"
              >
                NFA Guide
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.5s" }}>
              {[
                { value: "25+", label: "Premium Brands" },
                { value: "500+", label: "Products" },
                { value: "4.9\u2605", label: "Customer Rating" },
                { value: "Since 2018", label: "Trusted Dealer" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-pomg-muted mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <span className="text-[10px] uppercase tracking-[0.2em] text-pomg-muted">
              Scroll
            </span>
            <div className="w-5 h-8 rounded-full border border-pomg-border flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-pomg-purple animate-bounce" />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  2. TRUST BADGES ROW                                         */}
        {/* ============================================================ */}
        <section className="relative bg-pomg-dark py-16 border-y border-pomg-border/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {trustBadges.map((badge) => (
                <div
                  key={badge.title}
                  className="flex items-start gap-4 p-5 rounded-xl bg-pomg-card border border-pomg-border hover:border-pomg-purple/40 transition-colors duration-300"
                >
                  <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-pomg-purple/15 shrink-0">
                    <badge.icon className="h-5 w-5 text-pomg-purple" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {badge.title}
                    </h3>
                    <p className="text-xs text-pomg-muted mt-1 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  3. FEATURED PRODUCTS                                        */}
        {/* ============================================================ */}
        <section className="relative bg-pomg-darker py-24">
          {/* Subtle top glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-40 opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(67,67,122,0.4) 0%, transparent 70%)",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pomg-purple mb-3">
                Curated Selection
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Featured Collection
              </h2>
              <p className="mt-3 text-pomg-muted max-w-lg mx-auto">
                Hand-picked by our team. The best of what we carry — in stock
                and ready to ship.
              </p>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View all CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-pomg-border text-pomg-text font-semibold text-sm hover:border-pomg-purple/50 hover:text-white hover:bg-pomg-card/50 transition-all duration-300"
              >
                View All Products
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  4. CATEGORY SHOWCASE                                        */}
        {/* ============================================================ */}
        <section className="relative bg-pomg-dark py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pomg-gold mb-3">
                Browse
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Shop by Category
              </h2>
            </div>

            {/* Category grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categoryCards.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.id}`}
                  className="group relative flex flex-col items-center justify-center p-6 rounded-xl border border-pomg-border bg-pomg-card overflow-hidden hover:border-pomg-purple/50 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Gradient bg on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pomg-purple/10 group-hover:bg-pomg-purple/20 transition-colors">
                      <cat.icon className="h-5 w-5 text-pomg-purple group-hover:text-pomg-purple-light transition-colors" />
                    </div>
                    <h3 className="text-sm font-semibold text-white text-center">
                      {cat.name}
                    </h3>
                    <span className="text-xs text-pomg-muted">
                      {cat.count} {cat.count === 1 ? "item" : "items"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  5. BUILD YOUR SETUP CTA                                     */}
        {/* ============================================================ */}
        <section className="relative overflow-hidden">
          {/* Purple gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-pomg-purple via-[#52528c] to-pomg-purple" />
          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
          {/* Glow accent */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(201,168,76,0.25) 0%, transparent 65%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Build Your Setup
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed">
              Configure your perfect platform. Choose your rifle, optic,
              suppressor, and accessories &mdash; we&rsquo;ll handle the rest.
            </p>
            <div className="mt-10">
              <Link
                href="/build-your-setup"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white text-pomg-purple font-bold text-base shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                Start Building
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  6. NFA / SILENCER PROMO                                     */}
        {/* ============================================================ */}
        <section className="relative bg-pomg-darker py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pomg-gold mb-3">
                NFA Items
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Silencers Made Simple
              </h2>
              <p className="mt-3 text-pomg-muted max-w-2xl mx-auto leading-relaxed">
                Buying a suppressor doesn&rsquo;t have to be intimidating. We&rsquo;ve
                streamlined the entire NFA process so you can focus on what
                matters &mdash; picking the right can.
              </p>
            </div>

            {/* 3-step process */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {nfaSteps.map((item, idx) => (
                <div key={item.step} className="relative">
                  {/* Connector line between steps (desktop only) */}
                  {idx < nfaSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px bg-gradient-to-r from-pomg-purple/50 to-pomg-purple/10" />
                  )}

                  <div className="flex flex-col items-center text-center p-6 rounded-xl bg-pomg-card border border-pomg-border hover:border-pomg-purple/40 transition-colors duration-300">
                    {/* Step number */}
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-pomg-purple to-pomg-purple/60 text-white font-bold text-lg mb-5 shadow-lg shadow-pomg-purple/20">
                      {item.step}
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-pomg-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Average wait time + CTA */}
            <div className="mt-12 flex flex-col items-center gap-6">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-pomg-card border border-pomg-border">
                <Clock className="h-5 w-5 text-pomg-gold" />
                <div className="text-left">
                  <p className="text-xs text-pomg-muted">
                    Average eForm 4 Wait Time
                  </p>
                  <p className="text-sm font-semibold text-white">
                    4 &ndash; 6 Months (2024 avg)
                  </p>
                </div>
              </div>

              <Link
                href="/nfa-guide"
                className="group inline-flex items-center gap-2 text-pomg-purple font-semibold text-sm hover:text-pomg-purple-light transition-colors"
              >
                Read the Full NFA Guide
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  7. BRAND LOGOS ROW                                          */}
        {/* ============================================================ */}
        <section className="relative bg-pomg-dark py-16 border-y border-pomg-border/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-pomg-muted mb-8">
              Authorized Dealer
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {manufacturers.slice(0, 12).map((brand) => (
                <span
                  key={brand}
                  className="px-4 py-2 rounded-lg bg-pomg-card border border-pomg-border text-xs sm:text-sm font-medium text-pomg-text/70 hover:text-white hover:border-pomg-purple/40 transition-all duration-300 cursor-default"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  8. TESTIMONIALS                                             */}
        {/* ============================================================ */}
        <section className="relative bg-pomg-darker py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pomg-purple mb-3">
                Testimonials
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                What Our Customers Say
              </h2>
            </div>

            {/* Testimonial cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="flex flex-col p-6 rounded-xl bg-pomg-card border border-pomg-border hover:border-pomg-purple/30 transition-colors duration-300"
                >
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {renderStars(t.rating)}
                  </div>

                  {/* Review text */}
                  <p className="flex-1 text-sm text-pomg-text leading-relaxed mb-5">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Divider */}
                  <div className="border-t border-pomg-border mb-4" />

                  {/* Customer info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {t.name}
                      </p>
                      <p className="text-xs text-pomg-muted">
                        Verified Buyer
                      </p>
                    </div>
                    <span className="text-[10px] font-medium text-pomg-purple bg-pomg-purple/10 px-2 py-1 rounded">
                      {t.focus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  9. NEWSLETTER                                               */}
        {/* ============================================================ */}
        <section className="relative bg-pomg-dark py-20 border-y border-pomg-border/50">
          {/* Subtle background glow */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(67,67,122,0.5) 0%, transparent 70%)",
            }}
          />

          <div className="relative mx-auto max-w-xl px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Stay in the Loop
            </h2>
            <p className="text-pomg-muted text-sm leading-relaxed mb-8">
              Be first to know about new inventory, exclusive drops, and NFA
              updates. No spam, ever.
            </p>

            <form
              onSubmit={handleNewsletter}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="flex-1 px-4 py-3 rounded-xl bg-pomg-card border border-pomg-border text-sm text-white placeholder-pomg-muted outline-none focus:border-pomg-purple/60 focus:ring-1 focus:ring-pomg-purple/30 transition-all"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-pomg-purple to-[#5a5a9e] text-white text-sm font-semibold hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-pomg-purple/20"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>

            {subscribed && (
              <p className="mt-3 text-xs text-pomg-gold animate-fade-in">
                Welcome aboard! Check your inbox for a confirmation.
              </p>
            )}

            <p className="mt-4 text-[11px] text-pomg-muted">
              We respect your privacy. Unsubscribe anytime with one click.
            </p>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  10. STORE INFO                                              */}
        {/* ============================================================ */}
        <section className="relative bg-pomg-darker py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left: Store details */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-pomg-purple/15">
                    <MapPin className="h-5 w-5 text-pomg-purple" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Visit Our Store
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-pomg-muted mb-2">
                      Address
                    </h3>
                    <a
                      href="https://maps.google.com/?q=825+N+300+W+Suite+WA-011+Salt+Lake+City+UT+84103"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pomg-text hover:text-white transition-colors text-sm leading-relaxed"
                    >
                      825 N 300 W, Suite WA-011
                      <br />
                      Salt Lake City, UT 84103
                    </a>
                  </div>

                  {/* Phone */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-pomg-muted mb-2">
                      Phone
                    </h3>
                    <a
                      href="tel:+18016664692"
                      className="text-pomg-text hover:text-white transition-colors text-sm flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4 text-pomg-purple" />
                      (801) 666-4692
                    </a>
                  </div>

                  {/* Hours */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-pomg-muted mb-3">
                      Store Hours
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-pomg-purple shrink-0" />
                        <div className="flex justify-between flex-1 max-w-xs">
                          <span className="text-sm text-pomg-muted">
                            Online
                          </span>
                          <span className="text-sm text-pomg-text font-medium">
                            Mon &ndash; Sat, 10 AM &ndash; 6 PM
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-pomg-gold shrink-0" />
                        <div className="flex justify-between flex-1 max-w-xs">
                          <span className="text-sm text-pomg-muted">
                            In-Store
                          </span>
                          <span className="text-sm text-pomg-text font-medium">
                            Wed &ndash; Sat, Noon &ndash; 6 PM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact CTA */}
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 text-pomg-purple font-semibold text-sm hover:text-pomg-purple-light transition-colors"
                    >
                      Get Directions & Contact Info
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right: Map placeholder */}
              <div className="flex items-center justify-center rounded-xl bg-pomg-card border border-pomg-border overflow-hidden min-h-[320px]">
                <div className="flex flex-col items-center gap-4 text-center p-8">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-pomg-purple/10">
                    <MapPin className="h-7 w-7 text-pomg-purple/60" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-pomg-text">
                      Salt Lake City, Utah
                    </p>
                    <p className="text-xs text-pomg-muted mt-1">
                      825 N 300 W, Suite WA-011
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=825+N+300+W+Suite+WA-011+Salt+Lake+City+UT+84103"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pomg-purple/15 text-pomg-purple text-xs font-semibold hover:bg-pomg-purple/25 transition-colors"
                  >
                    Open in Google Maps
                    <ArrowRight className="h-3 w-3" />
                  </a>
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
