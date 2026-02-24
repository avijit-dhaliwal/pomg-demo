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
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const values = [
  {
    icon: Award,
    title: "Quality",
    desc: "We carry only brands we personally trust and shoot. Every item in our inventory is hand-selected for reliability, craftsmanship, and performance.",
  },
  {
    icon: Heart,
    title: "Service",
    desc: "Whether you\u2019re buying your first firearm or adding another silencer to the collection, our team provides expert guidance without the attitude.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "We believe in responsible gun ownership and the Second Amendment. This store exists because of a community that shares those values.",
  },
  {
    icon: Shield,
    title: "Trust",
    desc: "We\u2019re authorized dealers for every brand we carry. No grey-market inventory, no questionable sourcing \u2014 just legitimate products from legitimate channels.",
  },
];

const brands = [
  "Noveske",
  "Daniel Defense",
  "Heckler & Koch",
  "B&T",
  "Dead Air Silencers",
  "SilencerCo",
  "Surefire",
  "CGS Group",
  "Eotech",
  "Trijicon",
  "Aimpoint",
  "Leupold",
  "Geissele",
  "Hodge Defense",
  "KAC (Knight\u2019s Armament)",
  "LMT (Lewis Machine & Tool)",
  "Sig Sauer",
  "FN America",
  "Benchmade",
  "Microtech",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pomg-darker">
      <Header />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pomg-purple/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-pomg-purple/5 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pomg-purple/10 border border-pomg-purple/20 text-pomg-purple-light text-xs font-semibold uppercase tracking-widest mb-6">
            <Heart className="w-3.5 h-3.5" />
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Built by Enthusiasts,{" "}
            <span className="text-pomg-gold">For Enthusiasts</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-pomg-muted max-w-2xl mx-auto leading-relaxed">
            Piece of Mind Guns started with a simple idea: create the kind of
            store we always wanted to walk into \u2014 curated, knowledgeable,
            and stocked with the best.
          </p>
        </div>
      </section>

      {/* ============ FOUNDING STORY ============ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="aspect-[4/3] rounded-2xl bg-pomg-card border border-pomg-border flex items-center justify-center">
            <div className="text-center">
              <Shield className="w-16 h-16 text-pomg-purple/30 mx-auto mb-3" />
              <span className="text-pomg-muted text-sm">Store Photo</span>
            </div>
          </div>

          {/* Story */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How It Started
            </h2>
            <div className="space-y-4 text-pomg-text text-sm leading-relaxed">
              <p>
                It started in a basement. A collection that grew from a passion
                for quality firearms, a deep appreciation for precision
                engineering, and a frustration with the shopping experience at
                most gun stores.
              </p>
              <p>
                We wanted a place where you could find Noveske next to HK,
                where Dead Air silencers sat alongside SilencerCo, and where
                the staff actually knew the difference. A place that felt more
                like walking into a friend&rsquo;s collection than a big-box
                retailer.
              </p>
              <p>
                Piece of Mind Guns was born out of that vision. We opened our
                doors in Salt Lake City with a simple promise:{" "}
                <strong className="text-white">
                  stock only what we&rsquo;d personally buy, and treat every
                  customer the way we&rsquo;d want to be treated.
                </strong>
              </p>
              <p>
                Today, we&rsquo;re proud to be one of Utah&rsquo;s premier
                destinations for premium firearms, silencers, optics, and
                accessories. Our inventory is curated, our team is passionate,
                and our commitment to the community is unwavering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MISSION ============ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-pomg-card border border-pomg-purple/20 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
          {/* subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-pomg-purple/5 via-transparent to-pomg-gold/5 pointer-events-none" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg sm:text-xl text-pomg-text leading-relaxed max-w-2xl mx-auto">
              Providing access to the guns, silencers, and accessories that
              we&rsquo;ve always dreamed of \u2014 paired with the knowledge and
              service to help you make the right choice.
            </p>
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
          What We Stand For
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-pomg-card border border-pomg-border rounded-2xl p-6 hover:border-pomg-purple/40 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-pomg-purple/10 border border-pomg-purple/20 text-pomg-purple-light group-hover:bg-pomg-purple/20 transition-colors">
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">{v.title}</h3>
              </div>
              <p className="text-pomg-muted text-sm leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ TEAM ============ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-pomg-card border border-pomg-border rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Our Team
              </h2>
              <div className="space-y-4 text-pomg-text text-sm leading-relaxed">
                <p>
                  Every member of our team is a shooter, collector, or industry
                  professional. We don&rsquo;t hire salespeople \u2014 we hire
                  enthusiasts who happen to be great at helping others find the
                  right gear.
                </p>
                <p>
                  From NFA paperwork specialists to gunsmiths and competitive
                  shooters, our staff brings real-world experience to every
                  interaction. Have a question about suppressor host selection,
                  optic mounting, or building your first AR? We&rsquo;ve been
                  there.
                </p>
                <p className="text-pomg-muted italic">
                  Stop by the store and say hello. We&rsquo;re always happy to
                  talk shop.
                </p>
              </div>
            </div>

            {/* Team photo placeholder */}
            <div className="aspect-[4/3] rounded-xl bg-pomg-darker border border-pomg-border flex items-center justify-center">
              <div className="text-center">
                <Users className="w-16 h-16 text-pomg-purple/30 mx-auto mb-3" />
                <span className="text-pomg-muted text-sm">Team Photo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ QUOTE CALLOUT ============ */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Quote className="w-10 h-10 text-pomg-gold/40 mx-auto mb-6" />
          <blockquote className="text-2xl sm:text-3xl font-bold text-white leading-snug italic">
            &ldquo;If you like quality, you&rsquo;re in the right place.&rdquo;
          </blockquote>
          <div className="mt-4 w-16 h-1 bg-pomg-gold/40 rounded-full mx-auto" />
        </div>
      </section>

      {/* ============ STORE INFO ============ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
          Visit Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: MapPin,
              label: "Address",
              lines: ["825 N 300 W", "Suite WA-011", "Salt Lake City, UT 84103"],
            },
            {
              icon: Clock,
              label: "Hours",
              lines: [
                "Online: Mon\u2013Sat 10 AM\u20136 PM",
                "In-Store: Wed\u2013Sat Noon\u20136 PM",
                "Closed Sunday",
              ],
            },
            {
              icon: Phone,
              label: "Phone",
              lines: ["(801) 666-4692"],
              href: "tel:+18016664692",
            },
            {
              icon: Mail,
              label: "Email",
              lines: ["team@pomg.com"],
              href: "mailto:team@pomg.com",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-pomg-card border border-pomg-border rounded-2xl p-6 text-center"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pomg-purple/10 border border-pomg-purple/20 mx-auto mb-4">
                <item.icon className="w-5 h-5 text-pomg-purple-light" />
              </div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                {item.label}
              </h3>
              <div className="space-y-1">
                {item.lines.map((line, i) =>
                  item.href && item.lines.length === 1 ? (
                    <a
                      key={i}
                      href={item.href}
                      className="text-sm text-pomg-muted hover:text-white transition-colors"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={i} className="text-sm text-pomg-muted">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ BRANDS WE CARRY ============ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
          Brands We Carry
        </h2>
        <p className="text-pomg-muted text-center max-w-xl mx-auto mb-12">
          We&rsquo;re authorized dealers for the industry&rsquo;s most respected
          manufacturers.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {brands.map((brand) => (
            <div
              key={brand}
              className="flex items-center justify-center h-20 rounded-xl bg-pomg-card border border-pomg-border hover:border-pomg-purple/30 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-pomg-gold/40 group-hover:text-pomg-gold transition-colors" />
                <span className="text-sm font-medium text-pomg-muted group-hover:text-white transition-colors">
                  {brand}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Come See What We&rsquo;ve Got
        </h2>
        <p className="text-pomg-muted text-lg mb-8 max-w-xl mx-auto">
          Browse our collection online or visit the store in Salt Lake City.
          We&rsquo;d love to help you find your next piece.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-pomg-gold text-pomg-dark font-bold text-sm hover:brightness-110 transition"
          >
            Shop Now
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-pomg-border text-pomg-text font-semibold text-sm hover:border-pomg-purple/40 hover:text-white transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
