"use client";

import Image from "next/image";
import Link from "next/link";
import { Shield, MapPin, Phone, Mail, Clock, Globe, Video, Users } from "lucide-react";

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
  { label: "How Buying Works", href: "/nfa-guide" },
  { label: "Shipping & FFL", href: "/contact" },
  { label: "Build Your Setup", href: "/build-your-setup" },
  { label: "FAQ", href: "/nfa-guide" },
];

const companyLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "The Pitch", href: "/pitch" },
];

const socials = [
  { icon: Globe, href: "https://instagram.com", label: "Instagram" },
  { icon: Video, href: "https://youtube.com", label: "YouTube" },
  { icon: Users, href: "https://facebook.com", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer>
      {/* Top Divider */}
      <div className="section-divider" />

      {/* Main Footer */}
      <div className="bg-pomg-dark">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Column 1 — Brand */}
            <div className="space-y-5">
              <Image
                src="/pomg-logo.png"
                width={100}
                height={42}
                alt="Piece of Mind Guns"
                className="object-contain"
              />
              <p className="text-sm leading-relaxed text-pomg-muted">
                Utah&apos;s premier destination for premium firearms &amp;
                accessories
              </p>
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-pomg-border text-pomg-muted transition hover:border-pomg-purple hover:text-pomg-purple-light"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 — Shop */}
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider text-pomg-gold">
                Shop
              </h4>
              <ul className="mt-4 space-y-2.5">
                {shopLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-pomg-muted transition hover:text-pomg-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Resources */}
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider text-pomg-gold">
                Resources
              </h4>
              <ul className="mt-4 space-y-2.5">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-pomg-muted transition hover:text-pomg-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Company + Store Info */}
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider text-pomg-gold">
                Company
              </h4>
              <ul className="mt-4 space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-pomg-muted transition hover:text-pomg-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Store Info */}
              <div className="mt-6 space-y-2.5 border-t border-pomg-border/40 pt-5">
                <div className="flex items-start gap-2 text-sm text-pomg-muted">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-pomg-dim" />
                  <span>825 N 300 W, Suite WA-011, SLC UT 84103</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-pomg-muted">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0 text-pomg-dim" />
                  <a
                    href="tel:+18016664692"
                    className="transition hover:text-pomg-text"
                  >
                    (801) 666-4692
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-pomg-muted">
                  <Mail className="h-3.5 w-3.5 flex-shrink-0 text-pomg-dim" />
                  <a
                    href="mailto:team@pomg.com"
                    className="transition hover:text-pomg-text"
                  >
                    team@pomg.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-pomg-muted">
                  <Clock className="h-3.5 w-3.5 flex-shrink-0 text-pomg-dim" />
                  <span>Mon–Sat 10am–6pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pomg-border/30">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-5 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
            {/* Left */}
            <p className="text-xs text-pomg-dim">
              &copy; 2026 Piece of Mind Guns. All rights reserved.
            </p>

            {/* Center */}
            <div className="flex items-center gap-1.5 text-xs text-pomg-muted">
              <Shield className="h-3.5 w-3.5 text-pomg-purple-light" />
              <span>Federal Firearms Licensee</span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 text-xs">
              <span className="text-pomg-muted">
                Privacy Policy
              </span>
              <span className="text-pomg-dim">|</span>
              <span className="text-pomg-muted">
                Terms of Service
              </span>
              <span className="ml-2 inline-flex items-center rounded-full border border-pomg-border/50 bg-pomg-surface/50 px-2 py-0.5 text-[10px] uppercase tracking-wider text-pomg-dim">
                Demo Site
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
