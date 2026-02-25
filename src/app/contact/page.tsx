"use client";

import { useState, FormEvent } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const subjects = [
  "General Inquiry",
  "Product Availability",
  "NFA / Silencer Question",
  "FFL Transfer",
  "Pricing / Quote",
  "Warranty / Service",
  "Other",
];

const storeInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "Piece of Mind Guns\nUtah",
    href: null,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(801) 555-POMG",
    href: "tel:+18015557664",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@pieceofmindguns.com",
    href: "mailto:info@pieceofmindguns.com",
  },
];

const storeHours = [
  { day: "Monday – Friday", hours: "10:00 AM – 7:00 PM" },
  { day: "Saturday", hours: "10:00 AM – 5:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate submission
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
              <Mail className="h-4 w-4" />
              We&apos;re Here to Help
            </div>
            <h1 className="font-display text-5xl uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-pomg-muted">
              Questions about a product, NFA process, or FFL transfer? Reach
              out — our team responds within 24 hours.
            </p>
          </div>
        </section>

        {/* ── Form + Sidebar ──────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* ── Contact Form (2/3) ──────────────────────────────── */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl uppercase tracking-tight text-white">
                Send Us a Message
              </h2>
              <div className="section-divider mb-8 mt-4" />

              {submitted ? (
                <div className="glass-card flex flex-col items-center justify-center p-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pomg-success/20">
                    <Send className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="font-display text-2xl uppercase text-white">
                    Message Sent
                  </h3>
                  <p className="mt-3 max-w-md text-pomg-muted">
                    Thanks for reaching out! We&apos;ll get back to you within
                    24 hours. Check your email for a confirmation.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="btn-primary mt-6"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-pomg-text"
                      >
                        Name <span className="text-pomg-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-pomg-border bg-pomg-surface px-4 py-3 text-sm text-white placeholder-pomg-dim outline-none transition-colors focus:border-pomg-purple"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-pomg-text"
                      >
                        Email <span className="text-pomg-danger">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-pomg-border bg-pomg-surface px-4 py-3 text-sm text-white placeholder-pomg-dim outline-none transition-colors focus:border-pomg-purple"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-pomg-text"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-pomg-border bg-pomg-surface px-4 py-3 text-sm text-white placeholder-pomg-dim outline-none transition-colors focus:border-pomg-purple"
                        placeholder="(801) 555-1234"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-2 block text-sm font-medium text-pomg-text"
                      >
                        Subject <span className="text-pomg-danger">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-pomg-border bg-pomg-surface px-4 py-3 text-sm text-white outline-none transition-colors focus:border-pomg-purple"
                      >
                        <option value="" disabled>
                          Select a subject
                        </option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-pomg-text"
                    >
                      Message <span className="text-pomg-danger">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full resize-none rounded-lg border border-pomg-border bg-pomg-surface px-4 py-3 text-sm text-white placeholder-pomg-dim outline-none transition-colors focus:border-pomg-purple"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary disabled:opacity-50"
                  >
                    {sending ? (
                      <>
                        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* ── Info Sidebar (1/3) ──────────────────────────────── */}
            <div className="space-y-6">
              {/* Store Info Cards */}
              {storeInfo.map((info) => (
                <div key={info.label} className="glass-card p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-pomg-purple/10">
                      <info.icon className="h-5 w-5 text-pomg-purple-light" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm uppercase tracking-wider text-pomg-muted">
                        {info.label}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="mt-1 block text-sm text-white transition-colors hover:text-pomg-gold"
                        >
                          {info.value}
                          <ExternalLink className="ml-1 inline h-3 w-3 text-pomg-dim" />
                        </a>
                      ) : (
                        <p className="mt-1 whitespace-pre-line text-sm text-white">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Hours */}
              <div className="glass-card p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-pomg-purple/10">
                    <Clock className="h-5 w-5 text-pomg-purple-light" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm uppercase tracking-wider text-pomg-muted">
                      Store Hours
                    </h3>
                    <div className="mt-2 space-y-1">
                      {storeHours.map((h) => (
                        <p key={h.day} className="text-sm text-pomg-muted">
                          <span className="text-white">{h.day}</span>
                          <br />
                          {h.hours}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Map Placeholder ─────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg border border-pomg-border bg-pomg-surface">
            <div className="flex h-80 items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto mb-3 h-10 w-10 text-pomg-dim" />
                <p className="font-display text-lg uppercase text-pomg-muted">
                  Store Location
                </p>
                <p className="mt-1 text-sm text-pomg-dim">
                  Interactive map coming soon
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FFL Transfer ────────────────────────────────────────── */}
        <section className="border-t border-pomg-border bg-pomg-darker py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">
                  FFL Transfers
                </h2>
                <div className="section-divider mb-6 mt-4" />
                <p className="text-pomg-muted leading-relaxed">
                  Bought a firearm online and need it shipped to a licensed
                  dealer? We accept FFL transfers for all standard firearms and
                  NFA items. Fast processing, fair pricing, no hassle.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="glass-card p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-pomg-muted">
                        Standard Firearm Transfer
                      </span>
                      <span className="font-display text-lg text-pomg-gold">
                        $25
                      </span>
                    </div>
                  </div>
                  <div className="glass-card p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-pomg-muted">
                        NFA Item Transfer
                      </span>
                      <span className="font-display text-lg text-pomg-gold">
                        $75
                      </span>
                    </div>
                  </div>
                  <div className="glass-card p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-pomg-muted">
                        Multiple Items (same order)
                      </span>
                      <span className="font-display text-lg text-pomg-gold">
                        $25 + $10/ea
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="glass-card p-8">
                <h3 className="font-display text-xl uppercase text-white">
                  How It Works
                </h3>
                <ol className="mt-6 space-y-4">
                  {[
                    "Contact us for our FFL information",
                    "Have the seller ship the firearm to our shop",
                    "We'll notify you when it arrives",
                    "Come in, complete the 4473, and pick it up",
                  ].map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-pomg-purple/20 font-display text-xs text-pomg-purple-light">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-pomg-muted">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
