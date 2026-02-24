"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Silencers", href: "/shop?category=silencers" },
  { label: "Build Your Setup", href: "/build-your-setup" },
  { label: "NFA Guide", href: "/nfa-guide" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount] = useState(3);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        console.log("Search:", searchQuery);
        setSearchOpen(false);
        setSearchQuery("");
      }
    },
    [searchQuery],
  );

  return (
    <>
      {/* ---- Top announcement bar ---- */}
      <div className="relative z-50 bg-pomg-purple/90 text-center text-xs font-medium tracking-wide text-white py-1.5 px-4 select-none">
        <Shield className="inline-block w-3.5 h-3.5 mr-1.5 -mt-0.5" />
        Free shipping on orders over $150 &mdash; FFL transfers available
        nationwide
      </div>

      {/* ---- Main header ---- */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-pomg-dark/95 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-pomg-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* ---- Logo ---- */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="relative flex items-center">
                {/* Glow behind logo on hover */}
                <div className="absolute -inset-3 rounded-full bg-pomg-purple/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  PIECE OF MIND{" "}
                  <span className="text-pomg-gold">GUNS</span>
                </span>
              </div>
            </Link>

            {/* ---- Desktop nav ---- */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium text-pomg-text hover:text-white transition-colors group"
                >
                  {link.label}
                  {/* Gold underline indicator */}
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-pomg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ))}
            </nav>

            {/* ---- Right actions ---- */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search toggle (desktop) */}
              <button
                onClick={() => setSearchOpen((o) => !o)}
                aria-label="Toggle search"
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-pomg-muted hover:text-white hover:bg-pomg-card transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center justify-center w-10 h-10 rounded-full text-pomg-muted hover:text-white hover:bg-pomg-card transition-colors"
                aria-label={`Cart with ${cartCount} items`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-pomg-gold text-pomg-dark text-[10px] font-bold leading-none">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle menu"
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full text-pomg-muted hover:text-white hover:bg-pomg-card transition-colors"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ---- Desktop search bar (slides down) ---- */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-pomg-border/40 bg-pomg-dark/95 backdrop-blur-xl hidden sm:block"
            >
              <form
                onSubmit={handleSearch}
                className="mx-auto max-w-2xl px-4 py-4 flex items-center gap-3"
              >
                <Search className="w-5 h-5 text-pomg-muted shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search firearms, silencers, optics..."
                  autoFocus
                  className="flex-1 bg-transparent text-white placeholder-pomg-muted text-sm outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-pomg-purple text-white text-sm font-medium hover:bg-pomg-purple/80 transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-pomg-muted hover:text-white transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ---- Mobile drawer overlay ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 z-50 h-full w-[85vw] max-w-sm bg-pomg-dark border-l border-pomg-border shadow-2xl shadow-black/50 flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-pomg-border/60">
                <span className="text-lg font-bold text-white">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-pomg-card text-pomg-muted hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile search */}
              <div className="px-5 py-4 border-b border-pomg-border/40">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pomg-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-pomg-card border border-pomg-border text-sm text-white placeholder-pomg-muted outline-none focus:border-pomg-purple/60 transition-colors"
                  />
                </form>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-3">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-5 py-3.5 text-[15px] font-medium text-pomg-text hover:text-white hover:bg-pomg-card/60 transition-colors"
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4 -rotate-90 text-pomg-muted" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="px-5 py-5 border-t border-pomg-border/60 space-y-3">
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-pomg-gold text-pomg-dark font-semibold text-sm hover:brightness-110 transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  View Cart
                  {cartCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-md bg-pomg-dark/20 text-[11px] font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <p className="text-center text-[11px] text-pomg-muted">
                  Mon&ndash;Sat 10 AM&ndash;6 PM &bull; (801) 666-4692
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
