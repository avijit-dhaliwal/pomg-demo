"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Heart,
  Shield,
  Users,
  Award,
  MapPin,
  Clock,
  Phone,
  Mail,
  Star,
  Quote,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const values = [
  {
    icon: Award,
    title: "Quality",
    description:
      "We only carry products we'd stake our own name on. Every firearm, silencer, and accessory in our shop has been vetted for quality, reliability, and value. No junk, no gimmicks — just the best.",
  },
  {
    icon: Heart,
    title: "Service",
    description:
      "We treat every customer like a friend. Whether you're buying your first pistol or building a suppressed SBR, you'll get honest advice, patient guidance, and a no-pressure shopping experience.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We're shooters, hunters, and competitors ourselves. This shop exists because we wanted a place where like-minded people can find premium gear, share knowledge, and build relationships.",
  },
  {
    icon: Shield,
    title: "Trust",
    description:
      "Transparent pricing. No hidden fees. No bait-and-switch. When we make a promise, we keep it. Our reputation is built on trust and we protect it on every single transaction.",
  },
];

const brands = [
  "Noveske",
  "Daniel Defense",
  "Sig Sauer",
  "HK",
  "B&T",
  "Wilson Combat",
  "Dead Air",
  "SilencerCo",
  "Surefire",
  "CGS Group",
  "Eotech",
  "Trijicon",
  "Aimpoint",
  "Nightforce",
  "Geissele",
  "Magpul",
  "Benchmade",
  "Microtech",
  "BCM",
  "LMT",
];

const storeHours = [
  { day: "Monday – Friday", hours: "10:00 AM – 7:00 PM" },
  { day: "Saturday", hours: "10:00 AM – 5:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-pomg-dark">
        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-pomg-border">
          <div className="noise-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-pomg-purple/10 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 py-28 text-center sm:px-6 lg:px-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pomg-gold/30 bg-pomg-gold/10 px-4 py-1.5 text-sm text-pomg-gold-light">
              <Star className="h-4 w-4" />
              Utah&apos;s Premium Firearms Dealer
            </div>
            <h1 className="font-display text-5xl uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
              Our Story
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-pomg-muted">
              How a passion for quality firearms turned into Utah&apos;s
              go-to destination for premium guns, silencers, and accessories.
            </p>
          </div>
        </section>

        {/* ── Founding Story ──────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-4xl uppercase tracking-tight text-white">
                From the Basement to the Shop Floor
              </h2>
              <div className="section-divider mb-6 mt-4" />
              <p className="text-pomg-muted leading-relaxed">
                Piece of Mind Guns started the way most great things do — with
                obsession. We were the guys who spent every weekend at the range,
                who researched every barrel profile and trigger pull weight, who
                couldn&apos;t stop building and tinkering.
              </p>
              <p className="mt-4 text-pomg-muted leading-relaxed">
                It began in a basement. Buying, selling, and trading firearms
                with friends who trusted our taste and knowledge. Word spread. The
                collection grew. Pretty soon, the basement wasn&apos;t big enough.
              </p>
              <p className="mt-4 text-pomg-muted leading-relaxed">
                We opened Piece of Mind Guns because we saw a gap — most gun
                stores felt like hardware stores. Fluorescent lights, bare walls,
                and staff who didn&apos;t know the difference between an HK roller
                lock and a direct impingement AR. We wanted something different: a
                curated experience for people who care about quality.
              </p>
              <p className="mt-4 text-pomg-muted leading-relaxed">
                Today we&apos;re a licensed Class III / SOT dealer, stocking the
                best brands in the industry. From your first firearm to your fifth
                silencer — we&apos;re here to make every purchase feel right.
              </p>
            </div>
            <div className="space-y-6">
              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-pomg-purple/10">
                    <Shield className="h-7 w-7 text-pomg-purple-light" />
                  </div>
                  <div>
                    <p className="font-display text-2xl text-pomg-gold">Class III / SOT</p>
                    <p className="text-sm text-pomg-muted">
                      Licensed NFA Dealer
                    </p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-pomg-purple/10">
                    <Award className="h-7 w-7 text-pomg-purple-light" />
                  </div>
                  <div>
                    <p className="font-display text-2xl text-pomg-gold">20+</p>
                    <p className="text-sm text-pomg-muted">
                      Premium Brands Authorized
                    </p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-pomg-purple/10">
                    <Users className="h-7 w-7 text-pomg-purple-light" />
                  </div>
                  <div>
                    <p className="font-display text-2xl text-pomg-gold">
                      Hundreds
                    </p>
                    <p className="text-sm text-pomg-muted">
                      NFA Transfers Processed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission ─────────────────────────────────────────────── */}
        <section className="border-y border-pomg-border bg-pomg-darker py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl uppercase tracking-tight text-white">
              Our Mission
            </h2>
            <div className="section-divider mx-auto mb-8 mt-4" />
            <p className="text-xl leading-relaxed text-pomg-muted">
              Providing access to the guns, silencers, and accessories that
              we&apos;ve always dreamed of — curated for quality, priced
              fairly, and backed by people who genuinely know and love this
              industry. Every customer leaves with{" "}
              <span className="text-white">peace of mind</span>.
            </p>
          </div>
        </section>

        {/* ── Values ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-4xl uppercase tracking-tight text-white">
              What We Stand For
            </h2>
            <div className="section-divider mx-auto mb-6 mt-4" />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="glass-card group p-6 transition-colors hover:border-pomg-purple/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pomg-purple/10 transition-colors group-hover:bg-pomg-purple/20">
                  <v.icon className="h-6 w-6 text-pomg-purple-light" />
                </div>
                <h3 className="font-display text-xl uppercase text-white">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-pomg-muted">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quote Callout ───────────────────────────────────────── */}
        <section className="border-y border-pomg-border bg-pomg-darker py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Quote className="mx-auto mb-6 h-10 w-10 text-pomg-gold/40" />
            <p className="font-display text-4xl uppercase leading-tight tracking-tight sm:text-5xl">
              <span className="gradient-text-gold">
                If you like quality, you&apos;re in the right place.
              </span>
            </p>
            <div className="mx-auto mt-8 h-px w-16 bg-pomg-gold/30" />
            <p className="mt-4 text-sm text-pomg-muted">
              — Piece of Mind Guns
            </p>
          </div>
        </section>

        {/* ── Brands We Carry ─────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-4xl uppercase tracking-tight text-white">
              Brands We Carry
            </h2>
            <div className="section-divider mx-auto mb-6 mt-4" />
            <p className="mx-auto max-w-2xl text-pomg-muted">
              Authorized dealer for 20+ of the industry&apos;s most respected
              manufacturers. Only brands that meet our quality standard make
              the shelf.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {brands.map((brand) => (
              <div
                key={brand}
                className="flex items-center justify-center rounded-lg border border-pomg-border bg-pomg-surface/30 px-4 py-4 text-center transition-colors hover:border-pomg-gold/30 hover:bg-pomg-surface/50"
              >
                <span className="font-display text-sm uppercase tracking-wider text-pomg-muted">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Store Info ──────────────────────────────────────────── */}
        <section className="border-y border-pomg-border bg-pomg-darker py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-display text-4xl uppercase tracking-tight text-white">
                Visit Us
              </h2>
              <div className="section-divider mx-auto mb-6 mt-4" />
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {/* Address */}
              <div className="glass-card flex flex-col items-center p-8 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pomg-purple/10">
                  <MapPin className="h-7 w-7 text-pomg-purple-light" />
                </div>
                <h3 className="font-display text-lg uppercase text-white">
                  Location
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pomg-muted">
                  Piece of Mind Guns
                  <br />
                  Utah
                </p>
              </div>

              {/* Hours */}
              <div className="glass-card flex flex-col items-center p-8 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pomg-purple/10">
                  <Clock className="h-7 w-7 text-pomg-purple-light" />
                </div>
                <h3 className="font-display text-lg uppercase text-white">
                  Hours
                </h3>
                <div className="mt-3 space-y-1">
                  {storeHours.map((h) => (
                    <p key={h.day} className="text-sm text-pomg-muted">
                      <span className="text-pomg-text">{h.day}:</span>{" "}
                      {h.hours}
                    </p>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="glass-card flex flex-col items-center p-8 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pomg-purple/10">
                  <Phone className="h-7 w-7 text-pomg-purple-light" />
                </div>
                <h3 className="font-display text-lg uppercase text-white">
                  Contact
                </h3>
                <div className="mt-3 space-y-2">
                  <p className="flex items-center justify-center gap-2 text-sm text-pomg-muted">
                    <Phone className="h-3.5 w-3.5 text-pomg-dim" />
                    (801) 555-POMG
                  </p>
                  <p className="flex items-center justify-center gap-2 text-sm text-pomg-muted">
                    <Mail className="h-3.5 w-3.5 text-pomg-dim" />
                    info@pieceofmindguns.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl uppercase tracking-tight text-white">
              See What We&apos;ve Got
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pomg-muted">
              Browse our curated collection of firearms, silencers, optics, and
              accessories. New inventory added regularly.
            </p>
            <div className="mt-8">
              <Link href="/shop" className="btn-primary">
                Shop Now
                <Star className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
