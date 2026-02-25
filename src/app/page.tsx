"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Package,
  ChevronDown,
  Mail,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AgeGate from "@/components/age-gate";
import ProductCard from "@/components/product-card";
import { getFeaturedProducts, manufacturers, categories } from "@/data/products";

const categoryIcons: Record<string, React.ReactNode> = {
  firearms: <Crosshair className="w-7 h-7" />,
  silencers: <Target className="w-7 h-7" />,
  optics: <Eye className="w-7 h-7" />,
  accessories: <Zap className="w-7 h-7" />,
  knives: <Package className="w-7 h-7" />,
  apparel: <Award className="w-7 h-7" />,
};

const testimonials = [
  {
    name: "Jake M.",
    review:
      "Picked up a Noveske Gen 4 and a Dead Air Sandman-S. POMG handled the Form 4 start to finish — zero hassle. This is the only dealer I trust for NFA items in Utah.",
    rating: 5,
  },
  {
    name: "Sarah T.",
    review:
      "Incredible selection and the staff actually knows their stuff. Got fitted for an EOTech EXPS3 and a Modlite setup — night and day difference on my DDM4. Will be back for a suppressor.",
    rating: 5,
  },
  {
    name: "Ryan K.",
    review:
      "Drove from Provo for their Knights Armament inventory. Worth every mile. Pricing was better than anywhere online, and they had the SR-30 in stock when nobody else did.",
    rating: 5,
  },
];

export default function HomePage() {
  const [email, setEmail] = useState("");
  const featured = getFeaturedProducts();

  return (
    <>
      <AgeGate />
      <Header />

      <main>
        {/* ═══════════════════════════════════════════════════════
            1. HERO SECTION
        ═══════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1676496649269-94cec02aca66?w=1920&q=80"
            alt="Premium firearms collection"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-pomg-darker/80 via-pomg-darker/60 to-pomg-darker" />
          {/* Noise Texture */}
          <div className="noise-overlay absolute inset-0" />

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pomg-border-light bg-pomg-card/60 backdrop-blur-sm mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-pomg-muted tracking-wide">
                Utah&apos;s Premier Firearms Dealer
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.95] mb-6 animate-slide-up">
              <span className="text-white block">PREMIUM FIREARMS.</span>
              <span className="gradient-text-gold block">
                UNCOMPROMISING QUALITY.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-pomg-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in">
              Utah&apos;s curated collection of the finest firearms, silencers,
              and accessories. Noveske. Daniel Defense. HK. Dead Air. Knights
              Armament.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
              <Link
                href="/shop"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold"
              >
                Shop Collection
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/nfa-guide"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold border border-pomg-border-light rounded-lg text-white hover:border-pomg-purple hover:text-pomg-purple-light transition-all duration-300"
              >
                NFA Guide
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto animate-fade-in">
              {[
                { value: "25+", label: "Premium Brands" },
                { value: "500+", label: "Products" },
                { value: "4.9★", label: "Customer Rating" },
                { value: "Since 2018", label: "Trusted Dealer" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-pomg-muted uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
            <ChevronDown className="w-6 h-6 text-pomg-muted" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            2. TRUST BADGES
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-pomg-dark py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "FFL Licensed",
                  desc: "Fully licensed & insured Class III SOT dealer",
                },
                {
                  icon: <Truck className="w-6 h-6" />,
                  title: "Fast Shipping",
                  desc: "Same-day shipping on in-stock orders before 2PM",
                },
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: "Expert Support",
                  desc: "Real knowledge from experienced shooters",
                },
                {
                  icon: <Award className="w-6 h-6" />,
                  title: "Authorized Dealer",
                  desc: "Factory-authorized for every brand we carry",
                },
              ].map((badge) => (
                <div
                  key={badge.title}
                  className="glass-card p-6 text-center md:text-left"
                >
                  <div className="text-pomg-purple mb-3 flex justify-center md:justify-start">
                    {badge.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-pomg-muted leading-relaxed">
                    {badge.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            3. FEATURED PRODUCTS
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-pomg-darker py-20">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl uppercase text-white mb-4">
                FEATURED COLLECTION
              </h2>
              <p className="text-pomg-muted max-w-xl mx-auto">
                Hand-selected firearms and accessories from the most sought-after
                manufacturers in the industry.
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-12">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-pomg-gold hover:text-pomg-gold-light transition-colors font-semibold group"
              >
                View All Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            4. CATEGORY SHOWCASE
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-pomg-dark py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl uppercase text-white mb-4">
                SHOP BY CATEGORY
              </h2>
              <p className="text-pomg-muted max-w-lg mx-auto">
                Browse our full catalog organized by category. Every item
                hand-picked for quality and performance.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.id}`}
                  className="group bg-pomg-card border border-pomg-border rounded-lg p-6 text-center hover:border-pomg-purple/50 hover:translate-y-[-2px] hover:shadow-[0_4px_20px_rgba(168,85,247,0.15)] transition-all duration-300"
                >
                  <div className="text-pomg-purple-light mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[cat.id]}
                  </div>
                  <h3 className="font-display text-xl uppercase text-white mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-pomg-muted text-xs">
                    {cat.count} {cat.count === 1 ? "item" : "items"}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            5. BUILD YOUR SETUP CTA
        ═══════════════════════════════════════════════════════ */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-pomg-purple/20 via-pomg-dark to-pomg-darker">
          {/* Crosshatch Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.05]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="crosshatch"
                  width="16"
                  height="16"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 16L16 0M-4 4L4 -4M12 20L20 12"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#crosshatch)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase text-white mb-6">
              BUILD YOUR SETUP
            </h2>
            <p className="text-pomg-muted text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Configure your perfect platform from the ground up. Choose your
              base firearm, optic, suppressor, light, and accessories — we&apos;ll
              make sure everything works together.
            </p>
            <Link
              href="/build-your-setup"
              className="btn-gold inline-flex items-center gap-2 px-10 py-4 text-lg font-semibold"
            >
              Start Building
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            6. NFA PROMO — SILENCERS MADE SIMPLE
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-pomg-darker py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl md:text-5xl uppercase text-white mb-4">
                SILENCERS MADE SIMPLE
              </h2>
              <p className="text-pomg-muted max-w-2xl mx-auto text-lg">
                Buying a suppressor doesn&apos;t have to be complicated. As a Class
                III SOT dealer, we handle the entire NFA process so you can focus
                on what matters — shooting quiet.
              </p>
            </div>

            {/* 3 Step Cards */}
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Gold connector lines on desktop */}
              <div className="hidden md:block absolute top-16 left-[calc(33.33%+0.5rem)] right-[calc(33.33%+0.5rem)] h-[2px] bg-gradient-to-r from-pomg-gold/60 via-pomg-gold to-pomg-gold/60" />

              {[
                {
                  step: 1,
                  title: "CHOOSE",
                  desc: "Browse our full silencer collection. We carry Dead Air, SureFire, Q, and more. Not sure what fits? We'll help.",
                  icon: <Crosshair className="w-6 h-6" />,
                },
                {
                  step: 2,
                  title: "PAPERWORK",
                  desc: "We handle the ATF Form 4, fingerprint cards, passport photos, and eForm submission. You just sign.",
                  icon: <Shield className="w-6 h-6" />,
                },
                {
                  step: 3,
                  title: "PICK UP",
                  desc: "Once your eForm 4 is approved, we'll call you. Come pick up your suppressor and leave quiet.",
                  icon: <Award className="w-6 h-6" />,
                },
              ].map((step) => (
                <div
                  key={step.step}
                  className="glass-card p-8 text-center relative"
                >
                  {/* Step Number Circle */}
                  <div className="w-12 h-12 rounded-full bg-pomg-gold/20 border-2 border-pomg-gold flex items-center justify-center mx-auto mb-5">
                    <span className="font-display text-xl text-pomg-gold">
                      {step.step}
                    </span>
                  </div>
                  <div className="text-pomg-purple mb-4 flex justify-center">
                    {step.icon}
                  </div>
                  <h3 className="font-display text-2xl text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-pomg-muted text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Wait Time & CTA */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-pomg-border bg-pomg-card/60 mb-8">
                <Clock className="w-4 h-4 text-pomg-gold" />
                <span className="text-sm text-pomg-muted">
                  Current eForm 4 Average:{" "}
                  <span className="text-pomg-gold font-semibold">
                    4-6 Months
                  </span>
                </span>
              </div>
              <br />
              <Link
                href="/nfa-guide"
                className="inline-flex items-center gap-2 text-pomg-gold hover:text-pomg-gold-light transition-colors font-semibold group mt-4"
              >
                Read the Full NFA Guide
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            7. BRAND LOGOS
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-pomg-dark py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-display text-pomg-muted text-sm tracking-[0.25em] uppercase mb-10">
              Authorized Dealer
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {manufacturers.slice(0, 15).map((brand) => (
                <span
                  key={brand}
                  className="font-display text-pomg-dim hover:text-pomg-text tracking-wide text-lg transition-colors duration-300 cursor-default"
                >
                  {brand.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            8. TESTIMONIALS
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-pomg-darker py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl uppercase text-white mb-4">
                WHAT OUR CUSTOMERS SAY
              </h2>
              <p className="text-pomg-muted max-w-lg mx-auto">
                Real reviews from verified buyers. We let our customers and our
                inventory speak for themselves.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((review) => (
                <div
                  key={review.name}
                  className="glass-card p-8 flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-pomg-gold text-pomg-gold"
                      />
                    ))}
                  </div>
                  {/* Review Text */}
                  <p className="text-pomg-text italic leading-relaxed mb-6 flex-1">
                    &ldquo;{review.review}&rdquo;
                  </p>
                  {/* Reviewer */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pomg-purple/20 flex items-center justify-center">
                      <span className="font-display text-pomg-purple text-sm">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {review.name}
                      </p>
                      <p className="text-xs text-pomg-muted flex items-center gap-1">
                        <Shield className="w-3 h-3 text-green-500" />
                        Verified Buyer
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            9. NEWSLETTER
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-pomg-dark py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl uppercase text-white mb-4">
              STAY IN THE LOOP
            </h2>
            <p className="text-pomg-muted mb-8 max-w-lg mx-auto">
              Get first access to new arrivals, exclusive deals, restocks, and NFA
              updates. No spam — just the good stuff.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pomg-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-pomg-card border border-pomg-border rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-pomg-dim focus:outline-none focus:border-pomg-purple transition-colors"
                />
              </div>
              <button type="submit" className="btn-primary px-6 py-3 font-semibold whitespace-nowrap">
                Subscribe
              </button>
            </form>

            <p className="text-xs text-pomg-dim">
              We respect your privacy. Unsubscribe anytime. No data shared with
              third parties.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            10. STORE INFO
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-pomg-darker py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Info Column */}
              <div>
                <h2 className="font-display text-4xl md:text-5xl uppercase text-white mb-8">
                  VISIT THE SHOP
                </h2>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-pomg-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-pomg-purple" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-white mb-1">
                        LOCATION
                      </h3>
                      <p className="text-pomg-muted text-sm leading-relaxed">
                        Piece of Mind Guns
                        <br />
                        Salt Lake City, UT
                        <br />
                        <span className="text-pomg-dim text-xs">
                          Exact address provided upon appointment confirmation
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-pomg-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-pomg-purple" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-white mb-1">
                        HOURS
                      </h3>
                      <div className="text-pomg-muted text-sm space-y-1">
                        <p>Mon - Fri: 10:00 AM – 6:00 PM</p>
                        <p>Saturday: 10:00 AM – 4:00 PM</p>
                        <p>Sunday: By Appointment</p>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-pomg-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-5 h-5 text-pomg-purple" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-white mb-1">
                        CONTACT
                      </h3>
                      <p className="text-pomg-muted text-sm">
                        <a
                          href="tel:+18015551776"
                          className="hover:text-pomg-purple transition-colors"
                        >
                          (801) 555-1776
                        </a>
                      </p>
                      <p className="text-pomg-muted text-sm">
                        <a
                          href="mailto:info@pieceofmindguns.com"
                          className="hover:text-pomg-purple transition-colors"
                        >
                          info@pieceofmindguns.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-pomg-card border border-pomg-border rounded-lg overflow-hidden aspect-[4/3] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pomg-purple/5 to-pomg-dark" />
                <div className="relative z-10 text-center p-8">
                  <MapPin className="w-12 h-12 text-pomg-purple/40 mx-auto mb-4" />
                  <p className="font-display text-xl text-white mb-2">
                    SALT LAKE CITY, UT
                  </p>
                  <p className="text-pomg-muted text-sm mb-6">
                    Located in the heart of Utah&apos;s firearms community
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-pomg-purple hover:text-pomg-purple-light transition-colors text-sm font-semibold"
                  >
                    Get Directions
                    <ArrowRight className="w-4 h-4" />
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
