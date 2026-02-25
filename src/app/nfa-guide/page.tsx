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
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const nfaItems = [
  {
    icon: Shield,
    title: "Silencers / Suppressors",
    description:
      "Reduce sound signature and recoil. We carry top-tier cans from Dead Air, SilencerCo, Surefire, CGS Group, and more. The single best upgrade for any shooting platform.",
    popular: true,
  },
  {
    icon: FileText,
    title: "Short Barreled Rifles (SBRs)",
    description:
      "Rifles with barrels under 16\". Compact, maneuverable platforms ideal for home defense and vehicle operations. Register a lower and configure it however you want.",
    popular: false,
  },
  {
    icon: Scale,
    title: "Short Barreled Shotguns (SBSs)",
    description:
      "Shotguns with barrels under 18\". Devastating close-range capability in a compact package. Less common but incredibly effective for home defense.",
    popular: false,
  },
  {
    icon: AlertTriangle,
    title: "Any Other Weapons (AOWs)",
    description:
      "Catch-all NFA category covering items like pen guns, cane guns, and smooth-bore pistols. Only $5 transfer tax vs $200 for other NFA items.",
    popular: false,
  },
];

const steps = [
  {
    number: 1,
    icon: Shield,
    title: "Choose Your Item",
    description:
      "Browse our silencer and NFA inventory in-store or online. Our staff will help you find the perfect match for your host firearm, shooting style, and budget. We stock all major manufacturers and can special-order anything.",
  },
  {
    number: 2,
    icon: FileText,
    title: "Purchase & Paperwork",
    description:
      "Complete the purchase and we'll start your ATF Form 4473 and Form 4 (for individual) or Form 4 with Trust (for trust purchases). We handle all the paperwork — you just need to sign. We recommend purchasing or setting up a gun trust beforehand.",
  },
  {
    number: 3,
    icon: Camera,
    title: "Photos & Fingerprints",
    description:
      "We take your passport-style photos and digital fingerprints right here in our shop — no need to go to a separate location. Everything is done in one visit. Each responsible person on a trust will need their own set.",
  },
  {
    number: 4,
    icon: Send,
    title: "Submit to ATF",
    description:
      "We submit your completed Form 4 via the ATF's eForm system electronically. E-filed forms have been processing significantly faster than paper forms. You'll receive a confirmation that your application is pending.",
  },
  {
    number: 5,
    icon: Clock,
    title: "Wait Period",
    description:
      "ATF processing times vary and change frequently. As of early 2026, ATF reports median eForm 4 processing times around ~11 days for individual submissions, while industry trackers show approvals typically in the days-to-weeks range depending on submission type (Individual vs Trust). We monitor timelines and keep customers updated throughout the process.",
  },
  {
    number: 6,
    icon: CheckCircle,
    title: "Approval & Pickup",
    description:
      "Once approved, we'll call you immediately. Come in, complete a final 4473, and take your NFA item home. The entire pickup process takes about 15 minutes. Congratulations — you now own one of the most satisfying upgrades in the firearms world.",
  },
];

const trustComparison = [
  {
    feature: "Multiple Owners",
    individual: "No — registered to one person only",
    trust: "Yes — add multiple responsible persons",
  },
  {
    feature: "Inheritance",
    individual: "Complex — requires new Form 4 transfer",
    trust: "Seamless — passes to beneficiaries automatically",
  },
  {
    feature: "CLEO Notification",
    individual: "Required for the individual",
    trust: "Required for each responsible person",
  },
  {
    feature: "Photos & Prints",
    individual: "One set for the applicant",
    trust: "One set per responsible person",
  },
  {
    feature: "Privacy",
    individual: "Personal name on registration",
    trust: "Trust name on registration",
  },
  {
    feature: "Cost",
    individual: "No additional cost",
    trust: "$50–$150 for trust setup",
  },
  {
    feature: "Who Can Possess",
    individual: "Only the registered owner",
    trust: "Any responsible person on the trust",
  },
  {
    feature: "Best For",
    individual: "Single owners, simplicity",
    trust: "Families, shared collections, estate planning",
  },
];

const costCards = [
  {
    icon: DollarSign,
    title: "Item Price",
    value: "Varies",
    description:
      "The cost of the silencer or NFA item itself. We carry options from $399 to $1,500+. Our team will help you find the best value for your needs.",
  },
  {
    icon: FileText,
    title: "$200 Tax Stamp",
    value: "$200",
    description:
      "One-time federal tax paid to the ATF for each NFA item registration. This fee is non-refundable and required by law. AOWs are only $5.",
  },
  {
    icon: Users,
    title: "Gun Trust (Optional)",
    value: "$50–$150",
    description:
      "A legal trust document that allows multiple people to possess NFA items. Highly recommended for families. We can help you set one up.",
  },
];

const faqs = [
  {
    question: "How long does the NFA approval process take?",
    answer:
      "ATF processing times vary and change frequently. As of early 2026, ATF reports median eForm 4 processing times around ~11 days for individual submissions, while industry trackers show approvals typically in the days-to-weeks range depending on submission type (Individual vs Trust). We monitor timelines and keep customers updated throughout the process.",
  },
  {
    question: "Can I shoot my silencer while waiting for the stamp?",
    answer:
      "In Utah, yes! Utah allows \"conjugal visits\" where you can come to the dealer and use your pending NFA item at a range under our supervision. Not all states allow this, but we're happy to offer it.",
  },
  {
    question: "Do I need to be 21 to buy a silencer?",
    answer:
      "You must be 21 to purchase a silencer or any NFA item from a dealer. You must also be legally eligible to purchase a firearm (pass a background check, no felony convictions, etc.).",
  },
  {
    question: "Are silencers legal in Utah?",
    answer:
      "Yes. Utah is generally considered NFA-friendly, and silencers, SBRs, SBSs, and AOWs are legal under current state and federal law. Always verify the latest state requirements before purchase or travel.",
  },
  {
    question: "What is a gun trust and do I need one?",
    answer:
      "A gun trust is a legal document that allows multiple people (trustees) to legally possess your NFA items. While not required, we strongly recommend trusts for anyone who shares firearms with family members, wants easier inheritance planning, or values the flexibility of multiple authorized users.",
  },
  {
    question: "Can I take my silencer out of state?",
    answer:
      "Yes, but you must first submit an ATF Form 5320.20 (Application to Transport) to notify the ATF before crossing state lines with any NFA item. This is free and typically approved within a few weeks. Some states do not allow silencers, so always verify destination state law.",
  },
  {
    question: "What caliber silencer should I buy first?",
    answer:
      "We generally recommend a .30 caliber silencer as your first can. A .30 cal suppressor can be used on 5.56, .300 BLK, .308, and many other calibers — making it the most versatile choice. If you primarily shoot pistols, a 9mm can is ideal as a first purchase.",
  },
  {
    question: "What happens if my Form 4 is denied?",
    answer:
      "If denied, you'll receive a letter from the ATF explaining why. Common reasons include form errors or background check issues. We can help review the denial reason and resubmit when appropriate. The $200 tax is generally refundable if denied.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function NfaGuidePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-pomg-dark">
        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-pomg-border">
          <div className="noise-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-pomg-purple/10 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 py-28 text-center sm:px-6 lg:px-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pomg-purple/30 bg-pomg-purple/10 px-4 py-1.5 text-sm text-pomg-purple-light">
              <Shield className="h-4 w-4" />
              Complete NFA Buying Resource
            </div>
            <h1 className="font-display text-5xl uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
              Understanding NFA Transfers
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-pomg-muted">
              Everything you need to know about buying silencers, SBRs, and
              other NFA items. From paperwork to pickup — we walk you through
              every step.
            </p>
          </div>
        </section>

        {/* ── What is the NFA? ────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-4xl uppercase tracking-tight text-white">
                What Is the NFA?
              </h2>
              <div className="section-divider mb-6 mt-4" />
              <p className="text-pomg-muted leading-relaxed">
                The <strong className="text-white">National Firearms Act (NFA)</strong>{" "}
                is a federal law originally enacted in 1934 that regulates certain
                categories of firearms and accessories. Items regulated under the NFA
                require a special registration process, a $200 tax stamp, and ATF
                approval before transfer.
              </p>
              <p className="mt-4 text-pomg-muted leading-relaxed">
                Despite the extra paperwork, buying an NFA item is{" "}
                <strong className="text-white">legal in many states</strong> —
                including Utah. The process simply requires patience and proper
                documentation. We handle 90% of the paperwork for you.
              </p>
              <p className="mt-4 text-pomg-muted leading-relaxed">
                At Piece of Mind Guns, we specialize in NFA transfers and silencer
                sales. We&apos;ve processed hundreds of Form 4s and have the experience to
                make your purchase smooth and stress-free.
              </p>
            </div>
            <div className="glass-card flex items-center justify-center p-12">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-pomg-purple/20">
                  <FileText className="h-10 w-10 text-pomg-purple-light" />
                </div>
                <p className="font-display text-5xl text-pomg-gold">1934</p>
                <p className="mt-2 text-sm text-pomg-muted">
                  National Firearms Act Enacted
                </p>
                <div className="mx-auto my-6 h-px w-16 bg-pomg-border" />
                <p className="font-display text-5xl text-pomg-gold">42</p>
                <p className="mt-2 text-sm text-pomg-muted">
                  States Where Silencers Are Legal
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── NFA Items We Carry ──────────────────────────────────── */}
        <section className="border-y border-pomg-border bg-pomg-darker py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-display text-4xl uppercase tracking-tight text-white">
                NFA Items We Carry
              </h2>
              <div className="section-divider mx-auto mb-6 mt-4" />
              <p className="mx-auto max-w-2xl text-pomg-muted">
                We stock and transfer all major categories of NFA items. Silencers are
                our specialty and make up the majority of our NFA business.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {nfaItems.map((item) => (
                <div
                  key={item.title}
                  className="glass-card group relative p-6 transition-colors hover:border-pomg-purple/40"
                >
                  {item.popular && (
                    <span className="absolute right-4 top-4 rounded-full bg-pomg-gold/10 px-2.5 py-0.5 text-xs font-semibold text-pomg-gold">
                      MOST POPULAR
                    </span>
                  )}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pomg-purple/10">
                    <item.icon className="h-6 w-6 text-pomg-purple-light" />
                  </div>
                  <h3 className="font-display text-xl uppercase text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-pomg-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6-Step Process Timeline ─────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-4xl uppercase tracking-tight text-white">
              The Buying Process
            </h2>
            <div className="section-divider mx-auto mb-6 mt-4" />
            <p className="mx-auto max-w-2xl text-pomg-muted">
              Six straightforward steps from choosing your item to taking it home.
              We guide you through every stage.
            </p>
          </div>

          <div className="relative mt-16">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-pomg-purple via-pomg-gold to-pomg-purple/20 lg:left-1/2 lg:block" />

            <div className="space-y-12 lg:space-y-16">
              {steps.map((step, idx) => (
                <div
                  key={step.number}
                  className={`relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12 ${
                    idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Number circle (center on desktop) */}
                  <div className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-pomg-purple bg-pomg-dark font-display text-xl text-pomg-purple-light lg:left-1/2 lg:-translate-x-1/2">
                    {step.number}
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-16 lg:ml-0 lg:w-[calc(50%-3rem)] ${
                      idx % 2 === 1 ? "lg:mr-auto" : "lg:ml-auto"
                    }`}
                  >
                    <div className="glass-card p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pomg-purple/10">
                          <step.icon className="h-5 w-5 text-pomg-purple-light" />
                        </div>
                        <h3 className="font-display text-xl uppercase text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-pomg-muted">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust vs Individual ─────────────────────────────────── */}
        <section className="border-y border-pomg-border bg-pomg-darker py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-display text-4xl uppercase tracking-tight text-white">
                Trust vs Individual Purchase
              </h2>
              <div className="section-divider mx-auto mb-6 mt-4" />
              <p className="mx-auto max-w-2xl text-pomg-muted">
                You can register NFA items to yourself individually or through a gun
                trust. Here&apos;s a side-by-side comparison.
              </p>
            </div>

            <div className="glass-card mt-12 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-pomg-border bg-pomg-surface/50">
                      <th className="px-6 py-4 font-display text-sm uppercase tracking-wider text-pomg-muted">
                        Feature
                      </th>
                      <th className="px-6 py-4 font-display text-sm uppercase tracking-wider text-pomg-purple-light">
                        Individual
                      </th>
                      <th className="px-6 py-4 font-display text-sm uppercase tracking-wider text-pomg-gold">
                        Trust
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pomg-border/50">
                    {trustComparison.map((row) => (
                      <tr key={row.feature} className="transition-colors hover:bg-pomg-surface/30">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                          {row.feature}
                        </td>
                        <td className="px-6 py-4 text-sm text-pomg-muted">
                          {row.individual}
                        </td>
                        <td className="px-6 py-4 text-sm text-pomg-muted">
                          {row.trust}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-lg border border-pomg-gold/20 bg-pomg-gold/5 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-pomg-gold" />
              <p className="text-sm text-pomg-muted">
                <strong className="text-pomg-gold">Our recommendation:</strong>{" "}
                If you plan to own more than one NFA item or share access with family
                members, a gun trust is almost always the right choice. We can help
                you set one up during your purchase.
              </p>
            </div>
          </div>
        </section>

        {/* ── Cost Breakdown ──────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-4xl uppercase tracking-tight text-white">
              Cost Breakdown
            </h2>
            <div className="section-divider mx-auto mb-6 mt-4" />
            <p className="mx-auto max-w-2xl text-pomg-muted">
              Transparent pricing — no hidden fees. Here&apos;s what you&apos;ll
              pay for a typical NFA purchase.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {costCards.map((card) => (
              <div
                key={card.title}
                className="glass-card flex flex-col items-center p-8 text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pomg-gold/10">
                  <card.icon className="h-7 w-7 text-pomg-gold" />
                </div>
                <h3 className="font-display text-lg uppercase text-white">
                  {card.title}
                </h3>
                <p className="mt-2 font-display text-3xl text-pomg-gold">
                  {card.value}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-pomg-muted">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────── */}
        <section className="border-y border-pomg-border bg-pomg-darker py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-display text-4xl uppercase tracking-tight text-white">
                Frequently Asked Questions
              </h2>
              <div className="section-divider mx-auto mb-6 mt-4" />
            </div>

            <div className="mt-12 space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="glass-card overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 flex-shrink-0 text-pomg-purple-light" />
                      <span className="font-medium text-white">
                        {faq.question}
                      </span>
                    </div>
                    {openFaq === idx ? (
                      <ChevronUp className="h-5 w-5 flex-shrink-0 text-pomg-muted" />
                    ) : (
                      <ChevronDown className="h-5 w-5 flex-shrink-0 text-pomg-muted" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="border-t border-pomg-border/50 px-6 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-pomg-muted">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Utah-Specific ───────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="glass-card overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">
                  NFA in Utah
                </h2>
                <div className="section-divider mb-6 mt-4" />
                <p className="text-pomg-muted leading-relaxed">
                  Utah is generally considered NFA-friendly. Silencers, SBRs,
                  SBSs, and AOWs are currently legal under state and federal law.
                  Always verify current statutes and travel rules before
                  purchasing or transporting NFA items.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "NFA items are currently legal under state and federal law",
                    "Utah Silencer Protection Act in effect",
                    "Conjugal visits allowed at your dealer",
                    "No separate state waiting period beyond federal process",
                    "Hunting with suppressors is currently legal",
                    "No magazine capacity restrictions",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-pomg-gold" />
                      <span className="text-sm text-pomg-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center justify-center border-t border-pomg-border bg-pomg-surface/30 p-8 lg:border-l lg:border-t-0 lg:p-12">
                <Shield className="mb-4 h-16 w-16 text-pomg-purple-light opacity-60" />
                <p className="text-center font-display text-2xl uppercase text-white">
                  Class III Dealer
                </p>
                <p className="mt-2 text-center text-sm text-pomg-muted">
                  Piece of Mind Guns is a licensed Class III / SOT dealer authorized
                  to transfer all NFA items in the state of Utah.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <section className="border-t border-pomg-border bg-pomg-darker py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl uppercase tracking-tight text-white">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pomg-muted">
              Browse our silencer collection or reach out to our team with any
              questions. We&apos;re here to make the NFA process as simple as
              possible.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/shop?category=silencers" className="btn-primary">
                Browse Silencers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="btn-gold"
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
