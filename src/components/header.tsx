"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Menu, X, Shield, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Silencers", href: "/silencers" },
  { label: "Build Your Setup", href: "/build" },
  { label: "NFA Guide", href: "/nfa-guide" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Announcement Bar */}
      <AnimatePresence>
        {announcementVisible && (
          <motion.div
            initial={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-50 bg-pomg-purple/90 backdrop-blur"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2">
              <div className="flex items-center gap-2 text-center text-xs font-medium text-white sm:text-sm">
                <Shield className="h-3.5 w-3.5 flex-shrink-0 text-pomg-gold" />
                <span>
                  Free shipping on orders over $150 — FFL transfers available
                  nationwide
                </span>
              </div>
              <button
                onClick={() => setAnnouncementVisible(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/60 transition hover:text-white"
                aria-label="Dismiss announcement"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-pomg-border/50 bg-pomg-dark/95 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Left — Logo */}
          <Link href="/" className="relative flex-shrink-0">
            <Image
              src="/pomg-logo.png"
              width={120}
              height={50}
              alt="Piece of Mind Guns"
              className="object-contain"
              priority
            />
          </Link>

          {/* Center — Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-display text-sm uppercase tracking-wider transition-colors duration-200 ${
                    isActive
                      ? "text-pomg-gold"
                      : "text-pomg-text hover:text-pomg-gold"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right — Actions */}
          <div className="flex items-center gap-3">
            {/* Search — desktop */}
            <button
              className="hidden rounded-full p-2 text-pomg-muted transition hover:text-pomg-text lg:flex"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative rounded-full p-2 text-pomg-muted transition hover:text-pomg-text"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-pomg-gold text-[10px] font-bold leading-none text-pomg-darker">
                3
              </span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-full p-2 text-pomg-muted transition hover:text-pomg-text lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col bg-pomg-darker shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-pomg-border/50 px-5 py-4">
                <Image
                  src="/pomg-logo.png"
                  width={100}
                  height={42}
                  alt="Piece of Mind Guns"
                  className="object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full p-2 text-pomg-muted transition hover:text-pomg-text"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="px-5 py-4">
                <div className="flex items-center gap-2 rounded-lg border border-pomg-border bg-pomg-surface px-3 py-2.5">
                  <Search className="h-4 w-4 text-pomg-muted" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-transparent text-sm text-pomg-text placeholder:text-pomg-dim focus:outline-none"
                  />
                </div>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto px-3 py-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between rounded-lg px-3 py-3.5 font-display text-sm uppercase tracking-wider transition-colors ${
                        isActive
                          ? "bg-pomg-purple/10 text-pomg-gold"
                          : "text-pomg-text hover:bg-pomg-surface hover:text-pomg-gold"
                      }`}
                    >
                      {link.label}
                      <ChevronRight className="h-4 w-4 text-pomg-dim" />
                    </Link>
                  );
                })}
              </nav>

              {/* Drawer Footer — Cart Button */}
              <div className="border-t border-pomg-border/50 p-5">
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-display text-sm uppercase tracking-wider"
                >
                  <ShoppingCart className="h-4 w-4" />
                  View Cart (3)
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
