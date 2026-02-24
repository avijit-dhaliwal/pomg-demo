"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Youtube,
  Facebook,
  ChevronRight,
  Shield,
} from "lucide-react";

const shopLinks = [
  { label: "Firearms", href: "/shop?category=firearms" },
  { label: "Silencers", href: "/shop?category=silencers" },
  { label: "Optics", href: "/shop?category=optics" },
  { label: "Accessories", href: "/shop?category=accessories" },
  { label: "Knives", href: "/shop?category=knives" },
  { label: "All Products", href: "/shop" },
];

const resourceLinks = [
  { label: "NFA Guide", href: "/nfa-guide" },
  { label: "How Buying Works", href: "/how-buying-works" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "FFL Transfers", href: "/ffl-transfers" },
  { label: "FAQ", href: "/faq" },
];

const companyLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/pomgguns",
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@pomgguns",
    icon: Youtube,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/pomgguns",
    icon: Facebook,
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // In a real app this would call an API
      console.log("Newsletter signup:", email);
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-pomg-dark border-t border-pomg-border/60">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pomg-purple/50 to-transparent" />

      {/* ---- Main footer content ---- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* ---- Brand column ---- */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <Link href="/" className="inline-block group">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                PIECE OF MIND{" "}
                <span className="text-pomg-gold">GUNS</span>
              </span>
            </Link>

            <p className="text-pomg-muted text-sm leading-relaxed max-w-xs">
              Utah&rsquo;s premier destination for premium firearms &amp;
              accessories. Expert guidance, curated selection, and a commitment
              to responsible ownership.
            </p>

            {/* Contact details */}
            <div className="space-y-3">
              <a
                href="https://maps.google.com/?q=825+N+300+W+Suite+WA-011+Salt+Lake+City+UT+84103"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-pomg-text hover:text-white transition-colors group"
              >
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-pomg-purple group-hover:text-pomg-gold transition-colors" />
                <span>
                  825 N 300 W, Suite WA-011
                  <br />
                  Salt Lake City, UT 84103
                </span>
              </a>

              <a
                href="tel:+18016664692"
                className="flex items-center gap-3 text-sm text-pomg-text hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 shrink-0 text-pomg-purple group-hover:text-pomg-gold transition-colors" />
                (801) 666-4692
              </a>

              <a
                href="mailto:team@pomg.com"
                className="flex items-center gap-3 text-sm text-pomg-text hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 shrink-0 text-pomg-purple group-hover:text-pomg-gold transition-colors" />
                team@pomg.com
              </a>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3 text-sm">
              <Clock className="w-4 h-4 mt-0.5 shrink-0 text-pomg-purple" />
              <div className="space-y-1">
                <div className="flex justify-between gap-4">
                  <span className="text-pomg-muted">Online</span>
                  <span className="text-pomg-text">Mon&ndash;Sat 10 AM&ndash;6 PM</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-pomg-muted">In-Store</span>
                  <span className="text-pomg-text">Wed&ndash;Sat Noon&ndash;6 PM</span>
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-pomg-card border border-pomg-border text-pomg-muted hover:text-white hover:border-pomg-purple/50 hover:bg-pomg-purple/10 transition-all duration-200"
                >
                  <social.icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* ---- Link columns ---- */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Shop */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Shop
              </h3>
              <ul className="space-y-2.5">
                {shopLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-sm text-pomg-muted hover:text-pomg-text transition-colors"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-pomg-gold" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Resources
              </h3>
              <ul className="space-y-2.5">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-sm text-pomg-muted hover:text-pomg-text transition-colors"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-pomg-gold" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-sm text-pomg-muted hover:text-pomg-text transition-colors"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-pomg-gold" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---- Newsletter column ---- */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Stay in the Loop
            </h3>
            <p className="text-sm text-pomg-muted leading-relaxed">
              Get first access to new inventory, exclusive deals, and NFA
              process updates.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pomg-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-pomg-card border border-pomg-border text-sm text-white placeholder-pomg-muted outline-none focus:border-pomg-purple/60 focus:ring-1 focus:ring-pomg-purple/30 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={subscribed}
                className="w-full py-3 rounded-xl bg-pomg-purple text-white text-sm font-semibold hover:bg-pomg-purple/80 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-pomg-gold animate-fade-in">
                Welcome aboard! Check your inbox for a confirmation.
              </p>
            )}

            <p className="text-[11px] text-pomg-muted leading-relaxed">
              No spam, ever. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>

      {/* ---- Bottom bar ---- */}
      <div className="border-t border-pomg-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: copyright & legal */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-pomg-muted">
              <span>&copy; 2026 Piece of Mind Guns LLC. All rights reserved.</span>
              <span className="hidden sm:inline text-pomg-border">|</span>
              <Link
                href="/privacy"
                className="hover:text-pomg-text transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-pomg-text transition-colors"
              >
                Terms
              </Link>
            </div>

            {/* Right: FFL info + demo badge */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-pomg-muted">
                <Shield className="w-3.5 h-3.5 text-pomg-purple" />
                <span>FFL #9-87-XXX-XX-XX-XXXXX</span>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pomg-gold/10 border border-pomg-gold/20 text-pomg-gold text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-pomg-gold animate-pulse" />
                Demo Site
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
