"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import type { Product } from "@/data/products";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Shield,
  Truck,
  ArrowLeft,
  Check,
  ChevronRight,
  Package,
  Info,
} from "lucide-react";

/* ---------- helpers ---------- */
function renderStars(rating: number, size = "h-5 w-5") {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`${size} ${
          i <= Math.floor(rating)
            ? "fill-pomg-gold text-pomg-gold"
            : i - 0.5 <= rating
            ? "fill-pomg-gold/50 text-pomg-gold"
            : "fill-transparent text-pomg-muted/40"
        }`}
      />
    );
  }
  return stars;
}

/* ---------- fake reviews data ---------- */
const fakeReviews = [
  {
    id: 1,
    author: "Mike T.",
    rating: 5,
    date: "2 weeks ago",
    title: "Absolutely worth every penny",
    body: "This exceeded all my expectations. Build quality is impeccable, and the team at POMG made the whole process seamless. Will definitely be buying here again.",
    verified: true,
  },
  {
    id: 2,
    author: "Sarah K.",
    rating: 5,
    date: "1 month ago",
    title: "Best purchase I've made",
    body: "Did a lot of research before pulling the trigger (pun intended). The staff was incredibly knowledgeable and helped me pick exactly what I needed. Shipping was fast and packaging was top-notch.",
    verified: true,
  },
  {
    id: 3,
    author: "Jake R.",
    rating: 4,
    date: "2 months ago",
    title: "Great quality, minor nitpick",
    body: "Product itself is outstanding. Only giving 4 stars because shipping took a bit longer than expected, but the team kept me updated throughout. Would still recommend POMG to anyone.",
    verified: true,
  },
];

/* =========================================================
   Product Detail Page
   ========================================================= */
export default function ProductDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";

  const product = getProductBySlug(slug);
  const relatedProducts = product ? getRelatedProducts(product) : [];

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "shipping" | "reviews"
  >("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  /* ---------- 404 state ---------- */
  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-pomg-darker flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-24 h-24 rounded-full bg-pomg-card border border-pomg-border flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-pomg-muted" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Product Not Found
            </h1>
            <p className="text-pomg-muted mb-6 max-w-sm">
              The product you&apos;re looking for doesn&apos;t exist or may have
              been removed.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pomg-purple text-white font-medium hover:bg-pomg-purple/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const savings = product.msrp - product.price;
  const hasSavings = savings > 0;
  const savingsPercent = hasSavings
    ? Math.round((savings / product.msrp) * 100)
    : 0;

  const categoryLabel =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  /* ---------- tabs data ---------- */
  const tabs = [
    { key: "description" as const, label: "Description" },
    { key: "specs" as const, label: "Specifications" },
    { key: "shipping" as const, label: "Shipping" },
    { key: "reviews" as const, label: `Reviews (${product.reviewCount})` },
  ];

  /* ---------- JSON-LD ---------- */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.manufacturer,
    },
    offers: {
      "@type": "Offer",
      url: `https://pomgguns.com/shop/${product.slug}`,
      priceCurrency: "USD",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Piece of Mind Guns",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="min-h-screen bg-pomg-darker">
        {/* ---- Breadcrumbs ---- */}
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <ol className="flex items-center gap-1.5 text-sm text-pomg-muted flex-wrap">
            <li>
              <Link
                href="/"
                className="hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li>
              <Link
                href="/shop"
                className="hover:text-white transition-colors"
              >
                Shop
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li>
              <Link
                href={`/shop?category=${product.category}`}
                className="hover:text-white transition-colors"
              >
                {categoryLabel}
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="text-pomg-text font-medium truncate max-w-[200px]">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* ---- Product hero: two-column ---- */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* === Left: Images === */}
            <div className="space-y-4">
              {/* Main image placeholder */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-pomg-card border border-pomg-border">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(67,67,122,0.15) 0%, rgba(201,168,76,0.08) 50%, rgba(67,67,122,0.15) 100%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <Package className="h-16 w-16 text-pomg-purple/40 mb-4" />
                  <span className="text-lg font-bold text-pomg-text/80 leading-tight">
                    {product.name}
                  </span>
                  <span className="text-sm text-pomg-muted mt-1">
                    {product.manufacturer}
                  </span>
                </div>
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="inline-flex px-3 py-1 rounded-lg text-xs font-bold uppercase bg-emerald-500/90 text-white">
                      NEW
                    </span>
                  )}
                  {product.isNfa && (
                    <span className="inline-flex px-3 py-1 rounded-lg text-xs font-bold uppercase bg-pomg-gold/90 text-pomg-dark">
                      NFA ITEM
                    </span>
                  )}
                </div>
                {/* Share button */}
                <button
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-pomg-dark/50 backdrop-blur-sm text-pomg-muted hover:text-white transition-colors"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.name,
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnail row */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === idx
                          ? "border-pomg-purple"
                          : "border-pomg-border hover:border-pomg-purple/50"
                      }`}
                    >
                      <div className="absolute inset-0 bg-pomg-card flex items-center justify-center">
                        <Package className="w-6 h-6 text-pomg-purple/30" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* === Right: Details === */}
            <div className="space-y-6">
              {/* Manufacturer */}
              <Link
                href={`/shop?manufacturer=${encodeURIComponent(product.manufacturer)}`}
                className="text-sm font-semibold uppercase tracking-widest text-pomg-purple hover:text-pomg-purple-light transition-colors"
              >
                {product.manufacturer}
              </Link>

              {/* Product name */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight -mt-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-pomg-muted">
                  {product.rating.toFixed(1)} ({product.reviewCount}{" "}
                  {product.reviewCount === 1 ? "review" : "reviews"})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3">
                <span className="text-3xl font-extrabold text-white">
                  ${product.price.toLocaleString()}
                </span>
                {hasSavings && (
                  <>
                    <span className="text-lg text-pomg-muted line-through">
                      ${product.msrp.toLocaleString()}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                      Save ${savings.toLocaleString()} ({savingsPercent}%)
                    </span>
                  </>
                )}
              </div>

              {/* NFA notice */}
              {product.isNfa && (
                <div className="p-4 rounded-xl border-2 border-pomg-gold/40 bg-pomg-gold/5">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-pomg-gold shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-pomg-gold mb-1">
                        NFA / Tax Stamp Required
                      </h3>
                      <p className="text-xs text-pomg-muted leading-relaxed">
                        This item is regulated under the National Firearms Act.
                        Purchase requires a $200 ATF tax stamp and approximately
                        4-12 months for Form 4 approval. We handle the
                        paperwork and guide you through every step of the
                        process.{" "}
                        <Link
                          href="/nfa-guide"
                          className="text-pomg-gold underline underline-offset-2 hover:text-pomg-gold/80"
                        >
                          Learn more about the NFA process
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Stock status */}
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="text-sm font-medium text-emerald-400">
                      In Stock
                    </span>
                    <span className="text-sm text-pomg-muted">
                      &mdash; {product.stockCount} available
                    </span>
                  </>
                ) : (
                  <>
                    <span className="inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                    <span className="text-sm font-medium text-red-400">
                      Out of Stock
                    </span>
                  </>
                )}
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-4 pt-2">
                {/* Quantity selector */}
                <div className="flex items-center rounded-xl border border-pomg-border overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={!product.inStock}
                    className="px-3.5 py-2.5 text-pomg-muted hover:text-white hover:bg-pomg-card transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    &minus;
                  </button>
                  <span className="px-4 py-2.5 text-sm font-semibold text-white min-w-[3rem] text-center border-x border-pomg-border bg-pomg-card">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((q) =>
                        Math.min(product.stockCount, q + 1)
                      )
                    }
                    disabled={!product.inStock}
                    className="px-3.5 py-2.5 text-pomg-muted hover:text-white hover:bg-pomg-card transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    product.inStock
                      ? "bg-gradient-to-r from-pomg-purple to-pomg-purple/80 text-white hover:shadow-lg hover:shadow-pomg-purple/30 hover:brightness-110 active:scale-[0.98]"
                      : "bg-pomg-card text-pomg-muted border border-pomg-border cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? "Add to Cart" : "Sold Out"}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-200 ${
                    isWishlisted
                      ? "bg-red-500/10 border-red-500/30 text-red-400"
                      : "bg-pomg-card border-pomg-border text-pomg-muted hover:text-red-400 hover:border-red-500/30"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? "fill-red-400" : ""
                    }`}
                  />
                </button>
              </div>

              {/* SKU */}
              <p className="text-xs text-pomg-muted pt-1">
                SKU: <span className="font-mono">{product.sku}</span>
              </p>

              {/* Quick trust signals */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-pomg-card border border-pomg-border">
                  <Truck className="w-4 h-4 text-pomg-purple shrink-0" />
                  <span className="text-xs text-pomg-text">
                    Free shipping over $150
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-pomg-card border border-pomg-border">
                  <Shield className="w-4 h-4 text-pomg-purple shrink-0" />
                  <span className="text-xs text-pomg-text">
                    Licensed FFL dealer
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-pomg-card border border-pomg-border">
                  <Check className="w-4 h-4 text-pomg-purple shrink-0" />
                  <span className="text-xs text-pomg-text">
                    Authenticity guaranteed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Tabbed section ---- */}
        <section className="border-t border-pomg-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            {/* Tab buttons */}
            <div className="flex overflow-x-auto gap-1 border-b border-pomg-border mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`whitespace-nowrap px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? "border-pomg-purple text-white"
                      : "border-transparent text-pomg-muted hover:text-pomg-text"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="max-w-3xl">
              {/* Description */}
              {activeTab === "description" && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-pomg-text leading-relaxed text-[15px]">
                    {product.description}
                  </p>
                  {product.caliber && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium bg-pomg-card border border-pomg-border text-pomg-muted"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Specifications */}
              {activeTab === "specs" && (
                <div className="rounded-xl border border-pomg-border overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(product.specs).map(
                        ([key, value], idx) => (
                          <tr
                            key={key}
                            className={
                              idx % 2 === 0 ? "bg-pomg-card" : "bg-pomg-dark"
                            }
                          >
                            <td className="px-5 py-3 font-medium text-pomg-muted whitespace-nowrap w-1/3">
                              {key}
                            </td>
                            <td className="px-5 py-3 text-pomg-text">
                              {value}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Shipping */}
              {activeTab === "shipping" && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-pomg-card border border-pomg-border">
                    <Truck className="w-5 h-5 text-pomg-purple shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">
                        Standard Shipping
                      </h3>
                      <p className="text-sm text-pomg-muted leading-relaxed">
                        Free on orders over $150. Orders under $150 ship for a
                        flat rate of $9.99. Most orders ship within 1-2 business
                        days via UPS or FedEx.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-xl bg-pomg-card border border-pomg-border">
                    <Shield className="w-5 h-5 text-pomg-purple shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">
                        FFL Transfers
                      </h3>
                      <p className="text-sm text-pomg-muted leading-relaxed">
                        All firearms must ship to a valid FFL holder. If
                        you&apos;re in the Salt Lake City area, we can transfer
                        directly at our location. For out-of-state buyers, we
                        ship to your local FFL at no extra cost.
                      </p>
                    </div>
                  </div>

                  {product.isNfa && (
                    <div className="flex items-start gap-4 p-5 rounded-xl bg-pomg-gold/5 border-2 border-pomg-gold/30">
                      <Info className="w-5 h-5 text-pomg-gold shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-bold text-pomg-gold mb-1">
                          NFA Item Shipping
                        </h3>
                        <p className="text-sm text-pomg-muted leading-relaxed">
                          NFA items (silencers, SBRs, etc.) are held at our
                          facility until your Form 4 is approved by the ATF.
                          Once approved, you can pick up in-store or we&apos;ll
                          ship to your approved FFL/SOT dealer.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4 p-5 rounded-xl bg-pomg-card border border-pomg-border">
                    <Package className="w-5 h-5 text-pomg-purple shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">
                        Returns &amp; Exchanges
                      </h3>
                      <p className="text-sm text-pomg-muted leading-relaxed">
                        Unused items may be returned within 30 days of delivery
                        for a full refund. Firearms must be unfired and in
                        original packaging. NFA items are non-returnable once
                        the Form 4 process has begun. Contact us for details.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews */}
              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="flex items-center gap-6 p-5 rounded-xl bg-pomg-card border border-pomg-border">
                    <div className="text-center">
                      <p className="text-4xl font-extrabold text-white">
                        {product.rating.toFixed(1)}
                      </p>
                      <div className="flex items-center gap-0.5 mt-1">
                        {renderStars(product.rating, "h-4 w-4")}
                      </div>
                      <p className="text-xs text-pomg-muted mt-1">
                        {product.reviewCount} reviews
                      </p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const pct =
                          star === 5
                            ? 78
                            : star === 4
                            ? 15
                            : star === 3
                            ? 5
                            : star === 2
                            ? 1
                            : 1;
                        return (
                          <div
                            key={star}
                            className="flex items-center gap-2"
                          >
                            <span className="text-xs text-pomg-muted w-3">
                              {star}
                            </span>
                            <Star className="w-3 h-3 fill-pomg-gold text-pomg-gold" />
                            <div className="flex-1 h-2 rounded-full bg-pomg-dark border border-pomg-border overflow-hidden">
                              <div
                                className="h-full rounded-full bg-pomg-gold"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs text-pomg-muted w-8 text-right">
                              {pct}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Individual reviews */}
                  {fakeReviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-5 rounded-xl bg-pomg-card border border-pomg-border space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-pomg-purple/20 flex items-center justify-center text-sm font-bold text-pomg-purple">
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {review.author}
                            </p>
                            <p className="text-xs text-pomg-muted">
                              {review.date}
                            </p>
                          </div>
                        </div>
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <Check className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating, "h-3.5 w-3.5")}
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        {review.title}
                      </h4>
                      <p className="text-sm text-pomg-muted leading-relaxed">
                        {review.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ---- Related Products ---- */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-pomg-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-8">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
