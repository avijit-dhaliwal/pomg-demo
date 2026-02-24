"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Shield,
  FileText,
  Camera,
  Send,
  Clock,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Scale,
  Users,
  DollarSign,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const nfaItems = [
  {
    icon: Shield,
    title: "Silencers / Suppressors",
    desc: "Reduce report and recoil on rifles, pistols, and rimfire hosts. We carry Dead Air, SilencerCo, Surefire, CGS, and more.",
  },
  {
    icon: FileText,
    title: "Short Barreled Rifles (SBRs)",
    desc: "Rifles with barrels under 16\u2033 or an overall length under 26\u2033. Perfect for home defense and compact builds.",
  },
  {
    icon: Scale,
    title: "Short Barreled Shotguns (SBSs)",
    desc: "Shotguns with barrels under 18\u2033 or overall length under 26\u2033. Devastating in close-quarters situations.",
  },
  {
    icon: AlertTriangle,
    title: "Any Other Weapons (AOWs)",
    desc: "Specialty items such as pen guns, cane guns, and smooth-bore pistols. Only a $5 transfer tax stamp.",
  },
];

const steps = [
  {
    num: 1,
    icon: Shield,
    title: "Choose Your Item",
    detail:
      "Browse our NFA collection in-store or online. Our staff will help you pick the right silencer, SBR, or other NFA item for your intended use and host firearm.",
  },
  {
    num: 2,
    icon: FileText,
    title: "Purchase & Begin Paperwork",
    detail:
      "Complete a Form 4473 (standard background check) and an ATF Form 4 (Application for Tax Paid Transfer). We walk you through every field so nothing is left blank or incorrect.",
  },
  {
    num: 3,
    icon: Camera,
    title: "Photos & Fingerprints",
    detail:
      "Two passport-style photos and two FBI fingerprint cards are required. We handle both right here in our store\u2014no need to visit a separate service.",
  },
  {
    num: 4,
    icon: Send,
    title: "Submit to ATF",
    detail:
      "We submit your completed application electronically via the ATF eForms system. Electronic submissions are significantly faster than paper forms.",
  },
  {
    num: 5,
    icon: Clock,
    title: "Wait Period",
    detail:
      "The current average approval time is roughly 6\u20138 months for eForm 4 submissions. We\u2019ll notify you the moment your stamp is approved. You can check status on the ATF eForms portal anytime.",
  },
  {
    num: 6,
    icon: CheckCircle,
    title: "Approval & Pickup",
    detail:
      "Once your Form 4 is approved, we\u2019ll call you to schedule a pickup. You\u2019ll complete a final 4473, and your NFA item is yours to take home. Congratulations!",
  },
];

const trustVsIndividual = {
  headers: ["Feature", "Individual", "Gun Trust"],
  rows: [
    ["Registered to", "One person", "Trust entity (multiple trustees)"],
    ["Shared use", "Owner only", "Any trustee can possess & use"],
    ["Inheritance", "Must transfer via executor", "Seamless to successor trustees"],
    ["Photos & prints", "Applicant only", "All responsible persons"],
    ["CLEO notification", "Yes", "Yes"],
    ["Cost", "$0 extra", "$50 \u2013 $150 for trust setup"],
    ["Best for", "Solo owners", "Families, shooting partners, estate planning"],
  ],
};

const faqs: { q: string; a: string }[] = [
  {
    q: "How long does approval take?",
    a: "Electronic Form 4 (eForm 4) submissions currently average 6\u20138 months. Paper Form 4 submissions can take 9\u201312 months or longer. We always file electronically to get you the fastest turnaround.",
  },
  {
    q: "Can I use my silencer while waiting?",
    a: "No. Federal law requires that you wait until your Form 4 is approved before you can take possession. The item stays in our secure NFA vault until your stamp comes back.",
  },
  {
    q: "Do I need to be 21?",
    a: "Yes. For transfers from a licensed dealer (Form 4), you must be 21 years of age or older. This applies to all NFA items including silencers, SBRs, and SBSs.",
  },
  {
    q: "Can I take my NFA items out of state?",
    a: "For silencers, no prior approval is needed\u2014just make sure the destination state allows them. For SBRs, SBSs, and other NFA firearms, you must file ATF Form 5320.20 and receive approval before transporting across state lines.",
  },
  {
    q: "What happens if I\u2019m denied?",
    a: "If your Form 4 is denied, you receive a full refund of the item purchase price. The $200 tax stamp fee is refunded directly by the ATF. Denials are rare if you can pass a standard NICS check.",
  },
  {
    q: "Can I buy online and transfer to my local dealer?",
    a: "Absolutely. We handle FFL transfers for NFA items. If you find something online from another dealer, have them ship it to us and we\u2019ll process all the paperwork on our end.",
  },
  {
    q: "What is a gun trust?",
    a: "A gun trust is a legal entity (revocable living trust) specifically designed to hold NFA items. It allows multiple trustees to legally possess and use the items, simplifies inheritance, and provides clear legal structure for your collection.",
  },
  {
    q: "Do silencers wear out?",
    a: "Quality silencers are built to last. Most welded-baffle designs will handle 30,000+ rounds before any performance degradation. User-serviceable rimfire and pistol cans can be cleaned and maintained indefinitely. We\u2019ll help you pick a silencer rated for your caliber and volume of shooting.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function NfaGuidePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-pomg-darker">
      <Header />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        {/* background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-pomg-purple/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-pomg-purple/5 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pomg-purple/10 border border-pomg-purple/20 text-pomg-purple-light text-xs font-semibold uppercase tracking-widest mb-6">
            <Shield className="w-3.5 h-3.5" />
            NFA Buying Guide
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Understanding{" "}
            <span className="text-pomg-gold">NFA Transfers</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-pomg-muted max-w-2xl mx-auto leading-relaxed">
            Buying a silencer, SBR, or other NFA item doesn&rsquo;t have to be
            intimidating. We&rsquo;ll walk you through every step of the
            process\u2014from choosing the right item to picking it up after
            approval.
          </p>
        </div>
      </section>

      {/* ============ WHAT IS THE NFA ============ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-pomg-card border border-pomg-border rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            What Is the NFA?
          </h2>
          <p className="text-pomg-text leading-relaxed mb-4">
            The <strong className="text-white">National Firearms Act (NFA)</strong>{" "}
            was enacted in 1934 and regulates the manufacture, transfer, and
            possession of certain categories of firearms and accessories. Items
            regulated under the NFA include silencers (suppressors), short
            barreled rifles (SBRs), short barreled shotguns (SBSs), machine
            guns, destructive devices, and any other weapons (AOWs).
          </p>
          <p className="text-pomg-text leading-relaxed">
            To legally purchase an NFA item from a dealer, you must pay a{" "}
            <strong className="text-pomg-gold">$200 federal tax stamp</strong>,
            submit an application (ATF Form 4) with photos and fingerprints,
            pass a background check, and wait for ATF approval. It sounds like a
            lot, but we handle the heavy lifting for you.
          </p>
        </div>
      </section>

      {/* ============ NFA ITEMS WE CARRY ============ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
          NFA Items We Carry
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {nfaItems.map((item) => (
            <div
              key={item.title}
              className="bg-pomg-card border border-pomg-border rounded-2xl p-6 hover:border-pomg-purple/40 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-pomg-purple/10 border border-pomg-purple/20 text-pomg-purple-light group-hover:bg-pomg-purple/20 transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-pomg-muted text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ THE BUYING PROCESS ============ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
          The Buying Process
        </h2>
        <p className="text-pomg-muted text-center max-w-2xl mx-auto mb-12">
          Six straightforward steps from choosing your item to taking it home.
          We guide you through every one.
        </p>

        <div className="relative">
          {/* vertical timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-pomg-purple/60 via-pomg-purple/30 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.num} className="relative flex gap-6 sm:gap-8">
                {/* number circle */}
                <div className="relative z-10 flex items-center justify-center shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-pomg-dark border-2 border-pomg-purple text-pomg-gold font-bold text-lg sm:text-xl">
                  {step.num}
                </div>

                {/* content */}
                <div className="bg-pomg-card border border-pomg-border rounded-2xl p-6 flex-1 hover:border-pomg-purple/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="w-5 h-5 text-pomg-purple-light" />
                    <h3 className="text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-pomg-muted text-sm leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRUST VS INDIVIDUAL ============ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
          Trust vs. Individual Registration
        </h2>
        <p className="text-pomg-muted text-center max-w-2xl mx-auto mb-12">
          You can register NFA items to yourself as an individual or to a gun
          trust. Here&rsquo;s how they compare.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-pomg-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-pomg-card">
                {trustVsIndividual.headers.map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left font-semibold text-white border-b border-pomg-border"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trustVsIndividual.rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-pomg-border/50 last:border-b-0 hover:bg-pomg-card/50 transition-colors"
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-6 py-4 ${
                        j === 0
                          ? "font-medium text-white"
                          : "text-pomg-muted"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-start gap-3 bg-pomg-card border border-pomg-border rounded-xl p-5">
          <Users className="w-5 h-5 text-pomg-purple-light shrink-0 mt-0.5" />
          <p className="text-pomg-muted text-sm leading-relaxed">
            <strong className="text-white">Our recommendation:</strong> If you
            plan to own multiple NFA items or want family members to legally
            access them, a gun trust is worth the small upfront cost. We can
            refer you to a local attorney or help you set up a trust through a
            reputable online service.
          </p>
        </div>
      </section>

      {/* ============ COST BREAKDOWN ============ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
          Cost Breakdown
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: DollarSign,
              label: "Item Price",
              detail: "The retail price of your silencer, SBR, or other NFA item.",
              example: "e.g. $400 \u2013 $2,000+",
            },
            {
              icon: FileText,
              label: "$200 Tax Stamp",
              detail:
                "Federal excise tax paid to the ATF with your Form 4. This is per item.",
              example: "$200 per item ($5 for AOWs)",
            },
            {
              icon: Scale,
              label: "Trust Costs (Optional)",
              detail:
                "If you choose to file under a gun trust instead of as an individual.",
              example: "$50 \u2013 $150 one-time",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-pomg-card border border-pomg-border rounded-2xl p-6 text-center"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-pomg-gold/10 border border-pomg-gold/20 mx-auto mb-4">
                <item.icon className="w-7 h-7 text-pomg-gold" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.label}
              </h3>
              <p className="text-pomg-muted text-sm leading-relaxed mb-3">
                {item.detail}
              </p>
              <span className="text-xs font-medium text-pomg-purple-light">
                {item.example}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-pomg-card border border-pomg-gold/20 rounded-2xl p-6 text-center">
          <p className="text-pomg-text text-sm">
            <strong className="text-pomg-gold">Example total:</strong> Dead Air
            Sandman-S silencer ($799) + Tax Stamp ($200) = $999 &mdash; then
            just wait for approval!
          </p>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center gap-3 mb-12">
          <HelpCircle className="w-6 h-6 text-pomg-purple-light" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className={`border rounded-xl transition-colors ${
                  isOpen
                    ? "bg-pomg-card border-pomg-purple/40"
                    : "bg-pomg-card/50 border-pomg-border hover:border-pomg-purple/20"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm sm:text-base font-medium text-white">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-pomg-gold shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-pomg-muted shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-pomg-muted text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ UTAH LAWS ============ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-pomg-card border border-pomg-border rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Utah Firearms Laws &amp; NFA
          </h2>
          <div className="space-y-4 text-pomg-text text-sm leading-relaxed">
            <p>
              Utah is one of the most NFA-friendly states in the country.
              Silencers, SBRs, SBSs, and AOWs are all{" "}
              <strong className="text-white">legal to own</strong> in Utah with
              proper ATF registration.
            </p>
            <ul className="list-disc list-inside space-y-2 text-pomg-muted">
              <li>
                <strong className="text-white">Silencers:</strong> Legal for
                purchase and use. No state-level restrictions beyond federal
                law.
              </li>
              <li>
                <strong className="text-white">SBRs &amp; SBSs:</strong> Legal
                with an approved Form 4 or Form 1.
              </li>
              <li>
                <strong className="text-white">Concealed carry:</strong> Utah is
                a constitutional carry state \u2014 no permit required for
                concealed carry (21+).
              </li>
              <li>
                <strong className="text-white">Hunting with silencers:</strong>{" "}
                Legal in Utah for all game animals.
              </li>
              <li>
                <strong className="text-white">No state waiting period:</strong>{" "}
                Beyond the federal NFA wait, Utah imposes no additional waiting
                period.
              </li>
            </ul>
            <p className="text-pomg-muted italic">
              This is general information and not legal advice. Always verify
              current laws with the ATF or a qualified attorney.
            </p>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-pomg-muted text-lg mb-8 max-w-xl mx-auto">
          Browse our silencer collection or stop by the store. Our team will
          walk you through the entire process from start to finish.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop?category=silencers"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-pomg-gold text-pomg-dark font-bold text-sm hover:brightness-110 transition"
          >
            Browse Silencers
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-pomg-border text-pomg-text font-semibold text-sm hover:border-pomg-purple/40 hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
