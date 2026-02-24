"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import {
  products,
  categories,
  manufacturers,
  calibers,
} from "@/data/products";
import type { Product } from "@/data/products";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Filter,
} from "lucide-react";

/* ---------- sort helpers ---------- */
type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "name-az";

const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low → High",
  "price-desc": "Price: High → Low",
  newest: "Newest",
  "name-az": "Name: A → Z",
};

function sortProducts(list: Product[], sort: SortOption): Product[] {
  const copy = [...list];
  switch (sort) {
    case "featured":
      return copy.sort(
        (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
      );
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "newest":
      return copy.sort(
        (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      );
    case "name-az":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy;
  }
}

/* =========================================================
   Inner shop component (needs useSearchParams inside Suspense)
   ========================================================= */
function ShopInner() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") ?? "";

  /* --- filter state --- */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    urlCategory ? [urlCategory] : []
  );
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedCalibers, setSelectedCalibers] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(5000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [nfaOnly, setNfaOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  /* --- derived min/max from catalogue --- */
  const globalMinPrice = 0;
  const globalMaxPrice = 5000;

  /* --- toggle helpers --- */
  const toggleCategory = useCallback((id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }, []);

  const toggleCaliber = useCallback((cal: string) => {
    setSelectedCalibers((prev) =>
      prev.includes(cal) ? prev.filter((c) => c !== cal) : [...prev, cal]
    );
  }, []);

  /* --- active filter chips --- */
  const activeFilters = useMemo(() => {
    const chips: { label: string; clear: () => void }[] = [];
    selectedCategories.forEach((cat) => {
      const found = categories.find((c) => c.id === cat);
      chips.push({
        label: `Category: ${found?.name ?? cat}`,
        clear: () =>
          setSelectedCategories((p) => p.filter((c) => c !== cat)),
      });
    });
    if (selectedManufacturer) {
      chips.push({
        label: `Mfr: ${selectedManufacturer}`,
        clear: () => setSelectedManufacturer(""),
      });
    }
    selectedCalibers.forEach((cal) => {
      chips.push({
        label: `Caliber: ${cal}`,
        clear: () =>
          setSelectedCalibers((p) => p.filter((c) => c !== cal)),
      });
    });
    if (priceMin > globalMinPrice || priceMax < globalMaxPrice) {
      chips.push({
        label: `$${priceMin} – $${priceMax}`,
        clear: () => {
          setPriceMin(globalMinPrice);
          setPriceMax(globalMaxPrice);
        },
      });
    }
    if (inStockOnly) {
      chips.push({
        label: "In Stock Only",
        clear: () => setInStockOnly(false),
      });
    }
    if (nfaOnly) {
      chips.push({
        label: "NFA Items",
        clear: () => setNfaOnly(false),
      });
    }
    return chips;
  }, [
    selectedCategories,
    selectedManufacturer,
    selectedCalibers,
    priceMin,
    priceMax,
    inStockOnly,
    nfaOnly,
  ]);

  const clearAllFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedManufacturer("");
    setSelectedCalibers([]);
    setPriceMin(globalMinPrice);
    setPriceMax(globalMaxPrice);
    setInStockOnly(false);
    setNfaOnly(false);
    setSearchQuery("");
  }, []);

  /* --- filtered + sorted products --- */
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.manufacturer.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          p.caliber?.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // category
    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }

    // manufacturer
    if (selectedManufacturer) {
      list = list.filter((p) => p.manufacturer === selectedManufacturer);
    }

    // caliber
    if (selectedCalibers.length > 0) {
      list = list.filter(
        (p) => p.caliber && selectedCalibers.some((c) => p.caliber!.includes(c))
      );
    }

    // price
    list = list.filter((p) => p.price >= priceMin && p.price <= priceMax);

    // in stock
    if (inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // nfa
    if (nfaOnly) {
      list = list.filter((p) => p.isNfa);
    }

    return sortProducts(list, sort);
  }, [
    searchQuery,
    selectedCategories,
    selectedManufacturer,
    selectedCalibers,
    priceMin,
    priceMax,
    inStockOnly,
    nfaOnly,
    sort,
  ]);

  /* ---------- sidebar JSX (shared desktop + mobile) ---------- */
  const sidebarContent = (
    <div className="space-y-8">
      {/* --- Category --- */}
      <div>
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
          Category
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="w-4 h-4 rounded border-pomg-border bg-pomg-card text-pomg-purple focus:ring-pomg-purple/50 focus:ring-offset-0 accent-pomg-purple cursor-pointer"
              />
              <span className="text-sm text-pomg-text group-hover:text-white transition-colors flex-1">
                {cat.name}
              </span>
              <span className="text-xs text-pomg-muted">{cat.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* --- Manufacturer --- */}
      <div>
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
          Manufacturer
        </h3>
        <div className="relative">
          <select
            value={selectedManufacturer}
            onChange={(e) => setSelectedManufacturer(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg bg-pomg-card border border-pomg-border text-sm text-pomg-text appearance-none cursor-pointer hover:border-pomg-purple/50 focus:border-pomg-purple focus:outline-none transition-colors"
          >
            <option value="">All Manufacturers</option>
            {manufacturers.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pomg-muted pointer-events-none" />
        </div>
      </div>

      {/* --- Caliber --- */}
      <div>
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
          Caliber
        </h3>
        <div className="space-y-2">
          {calibers.map((cal) => (
            <label
              key={cal}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCalibers.includes(cal)}
                onChange={() => toggleCaliber(cal)}
                className="w-4 h-4 rounded border-pomg-border bg-pomg-card text-pomg-purple focus:ring-pomg-purple/50 focus:ring-offset-0 accent-pomg-purple cursor-pointer"
              />
              <span className="text-sm text-pomg-text group-hover:text-white transition-colors">
                {cal}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* --- Price Range --- */}
      <div>
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
          Price Range
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-[11px] text-pomg-muted mb-1 block">Min</label>
            <input
              type="number"
              min={globalMinPrice}
              max={priceMax}
              value={priceMin}
              onChange={(e) =>
                setPriceMin(Math.max(0, parseInt(e.target.value) || 0))
              }
              className="w-full px-2.5 py-2 rounded-lg bg-pomg-card border border-pomg-border text-sm text-pomg-text focus:border-pomg-purple focus:outline-none transition-colors"
              placeholder="$0"
            />
          </div>
          <span className="text-pomg-muted mt-5">–</span>
          <div className="flex-1">
            <label className="text-[11px] text-pomg-muted mb-1 block">Max</label>
            <input
              type="number"
              min={priceMin}
              max={globalMaxPrice}
              value={priceMax}
              onChange={(e) =>
                setPriceMax(
                  Math.min(globalMaxPrice, parseInt(e.target.value) || globalMaxPrice)
                )
              }
              className="w-full px-2.5 py-2 rounded-lg bg-pomg-card border border-pomg-border text-sm text-pomg-text focus:border-pomg-purple focus:outline-none transition-colors"
              placeholder="$5000"
            />
          </div>
        </div>
        {/* visual bar */}
        <div className="mt-3 h-1.5 rounded-full bg-pomg-card border border-pomg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pomg-purple to-pomg-gold"
            style={{
              marginLeft: `${(priceMin / globalMaxPrice) * 100}%`,
              width: `${((priceMax - priceMin) / globalMaxPrice) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* --- Toggles --- */}
      <div className="space-y-4">
        {/* In Stock Only */}
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm text-pomg-text group-hover:text-white transition-colors">
            In Stock Only
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={inStockOnly}
            onClick={() => setInStockOnly((p) => !p)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              inStockOnly ? "bg-pomg-purple" : "bg-pomg-card border border-pomg-border"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
                inStockOnly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </label>

        {/* NFA Items */}
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm text-pomg-text group-hover:text-white transition-colors">
            NFA Items
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={nfaOnly}
            onClick={() => setNfaOnly((p) => !p)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              nfaOnly ? "bg-pomg-gold" : "bg-pomg-card border border-pomg-border"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
                nfaOnly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </label>
      </div>

      {/* --- Clear All --- */}
      {activeFilters.length > 0 && (
        <button
          onClick={clearAllFilters}
          className="w-full py-2.5 rounded-lg border border-pomg-border text-sm text-pomg-muted hover:text-white hover:border-pomg-purple/50 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-pomg-darker">
        {/* -------- Hero / page header -------- */}
        <section className="relative overflow-hidden border-b border-pomg-border">
          <div className="absolute inset-0 bg-gradient-to-br from-pomg-purple/10 via-transparent to-pomg-gold/5" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Shop
            </h1>
            <p className="mt-2 text-pomg-muted text-sm sm:text-base max-w-xl">
              Browse our curated collection of premium firearms, silencers,
              optics, and accessories.
            </p>
          </div>
        </section>

        {/* -------- Main content grid -------- */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* === Desktop Sidebar === */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 pr-2 pb-8 max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-thin">
                {sidebarContent}
              </div>
            </aside>

            {/* === Product area === */}
            <div className="flex-1 min-w-0">
              {/* --- Toolbar: search, sort, mobile filter toggle --- */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
                {/* Search */}
                <div className="relative flex-1 w-full sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pomg-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-pomg-card border border-pomg-border text-sm text-white placeholder-pomg-muted outline-none focus:border-pomg-purple/60 focus:ring-1 focus:ring-pomg-purple/30 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-pomg-muted hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Mobile filter button */}
                  <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pomg-card border border-pomg-border text-sm text-pomg-text hover:text-white hover:border-pomg-purple/50 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {activeFilters.length > 0 && (
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-pomg-purple text-white text-[10px] font-bold">
                        {activeFilters.length}
                      </span>
                    )}
                  </button>

                  {/* Sort dropdown */}
                  <div className="relative ml-auto sm:ml-0">
                    <button
                      onClick={() => setSortOpen((o) => !o)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pomg-card border border-pomg-border text-sm text-pomg-text hover:text-white hover:border-pomg-purple/50 transition-colors"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {SORT_LABELS[sort]}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          sortOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {sortOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setSortOpen(false)}
                        />
                        <div className="absolute right-0 mt-2 w-52 rounded-xl bg-pomg-card border border-pomg-border shadow-xl shadow-black/30 z-20 py-1 overflow-hidden">
                          {(Object.keys(SORT_LABELS) as SortOption[]).map(
                            (key) => (
                              <button
                                key={key}
                                onClick={() => {
                                  setSort(key);
                                  setSortOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                  sort === key
                                    ? "text-white bg-pomg-purple/20"
                                    : "text-pomg-text hover:bg-pomg-dark hover:text-white"
                                }`}
                              >
                                {SORT_LABELS[key]}
                              </button>
                            )
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* --- Active filter chips --- */}
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {activeFilters.map((f, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pomg-purple/15 border border-pomg-purple/30 text-xs font-medium text-pomg-purple-light"
                    >
                      {f.label}
                      <button
                        onClick={f.clear}
                        className="hover:text-white transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-pomg-muted hover:text-white transition-colors underline underline-offset-2"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* --- Product count --- */}
              <p className="text-sm text-pomg-muted mb-5">
                Showing{" "}
                <span className="text-white font-semibold">
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
                {activeFilters.length > 0 && (
                  <span>
                    {" "}
                    (filtered from {products.length} total)
                  </span>
                )}
              </p>

              {/* --- Product grid --- */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 rounded-full bg-pomg-card border border-pomg-border flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-pomg-muted" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    No products found
                  </h3>
                  <p className="text-sm text-pomg-muted max-w-sm mb-6">
                    Try adjusting your filters or search query to find what
                    you&apos;re looking for.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-5 py-2.5 rounded-xl bg-pomg-purple text-white text-sm font-medium hover:bg-pomg-purple/80 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ======== Mobile filter drawer ======== */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute top-0 left-0 h-full w-[85vw] max-w-sm bg-pomg-dark border-r border-pomg-border shadow-2xl shadow-black/50 flex flex-col animate-slide-in-left">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-pomg-border/60 shrink-0">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-pomg-purple" />
                <span className="text-lg font-bold text-white">Filters</span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-pomg-card text-pomg-muted hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Drawer body */}
            <div className="flex-1 overflow-y-auto px-5 py-6">
              {sidebarContent}
            </div>
            {/* Drawer footer */}
            <div className="px-5 py-4 border-t border-pomg-border/60 shrink-0">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-pomg-purple text-white text-sm font-semibold hover:bg-pomg-purple/80 transition-colors"
              >
                Show {filteredProducts.length} Products
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* slide-in animation for mobile drawer */}
      <style jsx>{`
        @keyframes slide-in-left {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

/* =========================================================
   Page wrapper — Suspense boundary for useSearchParams
   ========================================================= */
export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-pomg-darker flex items-center justify-center">
          <div className="animate-pulse text-pomg-muted text-sm">
            Loading shop...
          </div>
        </div>
      }
    >
      <ShopInner />
    </Suspense>
  );
}
