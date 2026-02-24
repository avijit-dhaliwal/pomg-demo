"use client";

import { useState } from "react";
import Link from "next/link";
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
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const subjects = [
  "General Inquiry",
  "Product Inquiry",
  "NFA Questions",
  "FFL Transfer",
  "Wholesale",
  "Other",
];

const storeInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "825 N 300 W, Suite WA-011\nSalt Lake City, UT 84103",
    href: "https://maps.google.com/?q=825+N+300+W+Suite+WA-011+Salt+Lake+City+UT+84103",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(801) 666-4692",
    href: "tel:+18016664692",
  },
  {
    icon: Mail,
    label: "Email",
    value: "team@pomg.com",
    href: "mailto:team@pomg.com",
  },
];

const hours = [
  { day: "Monday \u2013 Tuesday", time: "10 AM \u2013 6 PM (Online Only)" },
  { day: "Wednesday \u2013 Saturday", time: "Noon \u2013 6 PM (Store & Online)" },
  { day: "Sunday", time: "Closed" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/pomgguns",
    handle: "@pomgguns",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@pomgguns",
    handle: "@pomgguns",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/pomgguns",
    handle: "Piece of Mind Guns",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production this would call an API
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "General Inquiry",
      message: "",
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-pomg-darker">
      <Header />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pomg-purple/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-pomg-purple/5 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pomg-purple/10 border border-pomg-purple/20 text-pomg-purple-light text-xs font-semibold uppercase tracking-widest mb-6">
            <Mail className="w-3.5 h-3.5" />
            Contact
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Get in <span className="text-pomg-gold">Touch</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-pomg-muted max-w-2xl mx-auto leading-relaxed">
            Have a question about a product, NFA transfer, or just want to say
            hello? We&rsquo;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ============ MAIN CONTENT: FORM + SIDEBAR ============ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* ---------- Contact Form ---------- */}
          <div className="lg:col-span-2">
            <div className="bg-pomg-card border border-pomg-border rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-6">
                Send Us a Message
              </h2>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                  Message sent! We&rsquo;ll get back to you within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-pomg-text mb-2"
                    >
                      Name <span className="text-pomg-gold">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-pomg-darker border border-pomg-border text-sm text-white placeholder-pomg-muted outline-none focus:border-pomg-purple/60 focus:ring-1 focus:ring-pomg-purple/30 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-pomg-text mb-2"
                    >
                      Email <span className="text-pomg-gold">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-pomg-darker border border-pomg-border text-sm text-white placeholder-pomg-muted outline-none focus:border-pomg-purple/60 focus:ring-1 focus:ring-pomg-purple/30 transition-all"
                    />
                  </div>
                </div>

                {/* Phone + Subject row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-pomg-text mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(801) 555-1234"
                      className="w-full px-4 py-3 rounded-xl bg-pomg-darker border border-pomg-border text-sm text-white placeholder-pomg-muted outline-none focus:border-pomg-purple/60 focus:ring-1 focus:ring-pomg-purple/30 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-pomg-text mb-2"
                    >
                      Subject <span className="text-pomg-gold">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-pomg-darker border border-pomg-border text-sm text-white outline-none focus:border-pomg-purple/60 focus:ring-1 focus:ring-pomg-purple/30 transition-all appearance-none"
                    >
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
                    className="block text-sm font-medium text-pomg-text mb-2"
                  >
                    Message <span className="text-pomg-gold">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl bg-pomg-darker border border-pomg-border text-sm text-white placeholder-pomg-muted outline-none focus:border-pomg-purple/60 focus:ring-1 focus:ring-pomg-purple/30 transition-all resize-y"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-pomg-gold text-pomg-dark font-bold text-sm hover:brightness-110 transition"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* ---------- Sidebar ---------- */}
          <div className="space-y-6">
            {/* Store Contact Info */}
            <div className="bg-pomg-card border border-pomg-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-5">
                Store Information
              </h3>
              <div className="space-y-5">
                {storeInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.icon === MapPin ? "_blank" : undefined}
                    rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-3 text-sm text-pomg-muted hover:text-white transition-colors group"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-pomg-purple/10 border border-pomg-purple/20 shrink-0 group-hover:bg-pomg-purple/20 transition-colors">
                      <item.icon className="w-4 h-4 text-pomg-purple-light" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-pomg-text uppercase tracking-wider mb-1">
                        {item.label}
                      </span>
                      <span className="whitespace-pre-line">{item.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="bg-pomg-card border border-pomg-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="w-4 h-4 text-pomg-purple-light" />
                <h3 className="text-lg font-bold text-white">Hours</h3>
              </div>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-pomg-muted">{h.day}</span>
                    <span className="text-pomg-text font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-pomg-card border border-pomg-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-5">
                Follow Us
              </h3>
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-pomg-darker border border-pomg-border hover:border-pomg-purple/30 transition-colors group"
                  >
                    <div>
                      <span className="block text-sm font-medium text-white">
                        {social.label}
                      </span>
                      <span className="text-xs text-pomg-muted">
                        {social.handle}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-pomg-muted group-hover:text-pomg-purple-light transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MAP PLACEHOLDER ============ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="aspect-[21/9] sm:aspect-[3/1] rounded-2xl bg-pomg-card border border-pomg-border flex items-center justify-center overflow-hidden">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-pomg-purple/30 mx-auto mb-3" />
            <p className="text-pomg-muted text-sm font-medium">
              Interactive Map
            </p>
            <p className="text-pomg-muted/60 text-xs mt-1">
              825 N 300 W, Suite WA-011 &bull; Salt Lake City, UT 84103
            </p>
          </div>
        </div>
      </section>

      {/* ============ FFL TRANSFER INFO ============ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-pomg-card border border-pomg-border rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            FFL Transfers
          </h2>
          <div className="space-y-4 text-pomg-text text-sm leading-relaxed">
            <p>
              Purchased a firearm or NFA item from an online retailer? We accept
              FFL transfers at our Salt Lake City location. Here&rsquo;s how it
              works:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-pomg-muted">
              <li>
                <strong className="text-white">Contact us</strong> before
                purchasing to confirm we can accept the transfer and get our FFL
                information.
              </li>
              <li>
                <strong className="text-white">Provide our FFL</strong> to the
                seller. They will ship the item directly to us.
              </li>
              <li>
                <strong className="text-white">We notify you</strong> when the
                item arrives. Come in, complete the 4473, and pick it up.
              </li>
            </ol>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-pomg-darker border border-pomg-border rounded-xl p-4">
                <span className="block text-xs font-semibold text-pomg-gold uppercase tracking-wider mb-1">
                  Standard Firearm Transfer
                </span>
                <span className="text-lg font-bold text-white">$35</span>
                <span className="text-pomg-muted text-sm"> per item</span>
              </div>
              <div className="bg-pomg-darker border border-pomg-border rounded-xl p-4">
                <span className="block text-xs font-semibold text-pomg-gold uppercase tracking-wider mb-1">
                  NFA Item Transfer
                </span>
                <span className="text-lg font-bold text-white">$75</span>
                <span className="text-pomg-muted text-sm">
                  {" "}
                  per item (includes paperwork assistance)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
