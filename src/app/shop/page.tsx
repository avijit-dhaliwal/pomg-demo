"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, SlidersHorizontal, X, ChevronDown, Filter, Package } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { products, categories, manufacturers, calibers } from "@/data/products";

type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "name-az";

function ShopContent() {
  const searchParams = useSearchParams();
  const preselectedCategory = searchParams.get("category");
  const preselectedManufacturer = searchParams.get("manufacturer");

  /* ── State ── */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    preselectedCategory ? [preselectedCategory] : []
  );
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(
    preselectedManufacturer ? [preselectedManufacturer] : []
  );
  const [selectedCalibers, setSelectedCalibers] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [nfaOnly, setNfaOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  /* ── Togglers ── */
  const toggleCategory = (id: string) =>
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  const toggleManufacturer = (name: string) =>
    setSelectedManufacturers((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]
    );
  const toggleCaliber = (cal: string) =>
    setSelectedCalibers((prev) =>
      prev.includes(cal) ? prev.filter((c) => c !== cal) : [...prev, cal]
    );

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedManufacturers([]);
    setSelectedCalibers([]);
    setPriceMin("");
    setPriceMax("");
    setInStockOnly(false);
    setNfaOnly(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategories.length > 0 ||
    selectedManufacturers.length > 0 ||
    selectedCalibers.length > 0 ||
    priceMin ||
    priceMax ||
    inStockOnly ||
    nfaOnly;

  /* ── Filter + Sort ── */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.manufacturer.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.caliber?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Categories
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Manufacturers
    if (selectedManufacturers.length > 0) {
      result = result.filter((p) => selectedManufacturers.includes(p.manufacturer));
    }

    // Calibers
    if (selectedCalibers.length > 0) {
      result = result.filter((p) => p.caliber && selectedCalibers.includes(p.caliber));
    }

    // Price range
    if (priceMin) {
      result = result.filter((p) => p.price >= Number(priceMin));
    }
    if (priceMax) {
      result = result.filter((p) => p.price <= Number(priceMax));
    }

    // Stock
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // NFA
    if (nfaOnly) {
      result = result.filter((p) => p.isNfa);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "name-az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [
    searchQuery,
    selectedCategories,
    selectedManufacturers,
    selectedCalibers,
    priceMin,
    priceMax,
    inStockOnly,
    nfaOnly,
    sortBy,
  ]);

  /* ── Active filter chips ── */
  const activeChips: { label: string; onRemove: () => void }[] = [];
  selectedCategories.forEach((cat) => {
    const c = categories.find((c) => c.id === cat);
    activeChips.push({
      label: c?.name ?? cat,
      onRemove: () => toggleCategory(cat),
    });
  });
  selectedManufacturers.forEach((mfr) => {
    activeChips.push({ label: mfr, onRemove: () => toggleManufacturer(mfr) });
  });
  selectedCalibers.forEach((cal) => {
    activeChips.push({ label: cal, onRemove: () => toggleCaliber(cal) });
  });
  if (priceMin) {
    activeChips.push({ label: `Min $${priceMin}`, onRemove: () => setPriceMin("") });
  }
  if (priceMax) {
    activeChips.push({ label: `Max $${priceMax}`, onRemove: () => setPriceMax("") });
  }
  if (inStockOnly) {
    activeChips.push({ label: "In Stock", onRemove: () => setInStockOnly(false) });
  }
  if (nfaOnly) {
    activeChips.push({ label: "NFA Items", onRemove: () => setNfaOnly(false) });
  }

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
    { value: "name-az", label: "Name: A–Z" },
  ];

  /* ── Manufacturer counts ── */
  const manufacturerCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.manufacturer] = (counts[p.manufacturer] || 0) + 1;
    });
    return counts;
  }, []);

  /* ── Sidebar Content (shared desktop/mobile) ── */
  const filterSidebar = (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-display text-sm uppercase tracking-wider text-pomg-gold mb-3">
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
                className="h-4 w-4 rounded border-pomg-border bg-pomg-surface text-pomg-purple focus:ring-pomg-purple focus:ring-offset-0 focus:ring-offset-pomg-dark accent-pomg-purple cursor-pointer"
              />
              <span className="text-sm text-pomg-muted group-hover:text-pomg-text transition-colors flex-1">
                {cat.name}
              </span>
              <span className="text-xs text-pomg-dim">{cat.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Manufacturer */}
      <div>
        <h3 className="font-display text-sm uppercase tracking-wider text-pomg-gold mb-3">
          Manufacturer
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pomg-border scrollbar-track-transparent">
          {manufacturers.map((mfr) => (
            <label
              key={mfr}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedManufacturers.includes(mfr)}
                onChange={() => toggleManufacturer(mfr)}
                className="h-4 w-4 rounded border-pomg-border bg-pomg-surface text-pomg-purple focus:ring-pomg-purple focus:ring-offset-0 focus:ring-offset-pomg-dark accent-pomg-purple cursor-pointer"
              />
              <span className="text-sm text-pomg-muted group-hover:text-pomg-text transition-colors flex-1">
                {mfr}
              </span>
              <span className="text-xs text-pomg-dim">
                {manufacturerCounts[mfr] || 0}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Caliber */}
      <div>
        <h3 className="font-display text-sm uppercase tracking-wider text-pomg-gold mb-3">
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
                className="h-4 w-4 rounded border-pomg-border bg-pomg-surface text-pomg-purple focus:ring-pomg-purple focus:ring-offset-0 focus:ring-offset-pomg-dark accent-pomg-purple cursor-pointer"
              />
              <span className="text-sm text-pomg-muted group-hover:text-pomg-text transition-colors">
                {cal}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-display text-sm uppercase tracking-wider text-pomg-gold mb-3">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-pomg-dim">$</span>
            <input
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="w-full rounded-md border border-pomg-border bg-pomg-surface py-2 pl-7 pr-2 text-sm text-pomg-text placeholder:text-pomg-dim focus:border-pomg-purple focus:outline-none focus:ring-1 focus:ring-pomg-purple"
            />
          </div>
          <span className="text-pomg-dim text-xs">–</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-pomg-dim">$</span>
            <input
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="w-full rounded-md border border-pomg-border bg-pomg-surface py-2 pl-7 pr-2 text-sm text-pomg-text placeholder:text-pomg-dim focus:border-pomg-purple focus:outline-none focus:ring-1 focus:ring-pomg-purple"
            />
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-pomg-muted">In Stock Only</span>
          <button
            type="button"
            role="switch"
            aria-checked={inStockOnly}
            onClick={() => setInStockOnly((v) => !v)}
            className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
              inStockOnly ? "bg-pomg-purple" : "bg-pomg-surface border border-pomg-border"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                inStockOnly ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-pomg-muted">NFA Items Only</span>
          <button
            type="button"
            role="switch"
            aria-checked={nfaOnly}
            onClick={() => setNfaOnly((v) => !v)}
            className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
              nfaOnly ? "bg-pomg-purple" : "bg-pomg-surface border border-pomg-border"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                nfaOnly ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </label>
      </div>

      {/* Clear All */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full rounded-lg border border-pomg-border py-2.5 text-sm font-medium text-pomg-muted hover:border-pomg-border-light hover:text-pomg-text transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-pomg-dark">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Page Header ── */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-xs text-pomg-dim mb-4">
            <Link href="/" className="hover:text-pomg-muted transition-colors">
              Home
            </Link>
            <ChevronDown className="h-3 w-3 -rotate-90" />
            <span className="text-pomg-muted">Shop</span>
          </nav>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-display text-5xl uppercase text-white">Shop</h1>
              <p className="text-sm text-pomg-muted mt-1">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* ── Main Layout ── */}
        <div className="flex gap-8">
          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">{filterSidebar}</div>
          </aside>

          {/* ── Product Area ── */}
          <div className="flex-1 min-w-0">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-pomg-dim" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-pomg-border bg-pomg-surface py-2.5 pl-10 pr-4 text-sm text-pomg-text placeholder:text-pomg-dim focus:border-pomg-purple focus:outline-none focus:ring-1 focus:ring-pomg-purple"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-pomg-dim hover:text-pomg-muted"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-lg border border-pomg-border bg-pomg-surface px-4 py-2.5 text-sm text-pomg-muted hover:border-pomg-border-light transition-colors whitespace-nowrap"
                >
                  <span>{sortOptions.find((s) => s.value === sortBy)?.label}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${sortDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {sortDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setSortDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 z-20 w-52 rounded-lg border border-pomg-border bg-pomg-card shadow-xl py-1">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSortBy(opt.value);
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            sortBy === opt.value
                              ? "text-pomg-gold bg-pomg-surface"
                              : "text-pomg-muted hover:text-pomg-text hover:bg-pomg-surface"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 rounded-lg border border-pomg-border bg-pomg-surface px-4 py-2.5 text-sm text-pomg-muted hover:border-pomg-border-light transition-colors"
              >
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pomg-purple text-[10px] font-bold text-white">
                    {activeChips.length}
                  </span>
                )}
              </button>
            </div>

            {/* Active Filter Chips */}
            {activeChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {activeChips.map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-full border border-pomg-border bg-pomg-surface px-3 py-1 text-xs text-pomg-muted"
                  >
                    {chip.label}
                    <button
                      onClick={chip.onRemove}
                      className="text-pomg-dim hover:text-pomg-text transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-pomg-purple-light hover:text-pomg-purple transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pomg-surface mb-4">
                  <Package className="h-8 w-8 text-pomg-dim" />
                </div>
                <h3 className="font-display text-xl uppercase text-pomg-muted mb-2">
                  No Products Found
                </h3>
                <p className="text-sm text-pomg-dim max-w-sm mb-6">
                  Try adjusting your filters or search query to find what you&apos;re looking for.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="btn-primary rounded-lg px-6 py-2.5 text-sm font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Mobile Filter Slide-Over ── */}
      {mobileFiltersOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* Panel */}
          <div className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-pomg-darker shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-pomg-border/50 px-5 py-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-pomg-gold" />
                <span className="font-display text-lg uppercase text-white">Filters</span>
              </div>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full p-2 text-pomg-muted hover:text-pomg-text transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Filters */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {filterSidebar}
            </div>

            {/* Footer */}
            <div className="border-t border-pomg-border/50 p-5">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="btn-gold w-full rounded-lg py-3 font-display text-sm uppercase tracking-wider"
              >
                Show {filteredProducts.length} Result{filteredProducts.length !== 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-pomg-dark flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-pomg-purple border-t-transparent" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
