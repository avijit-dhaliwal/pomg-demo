"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  Bell,
  Minus,
  Plus,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { getProductBySlug, getRelatedProducts, Product } from "@/data/products";

type Tab = "description" | "specifications" | "shipping" | "reviews";

const sampleReviews = [
  {
    id: 1,
    author: "Mike R.",
    rating: 5,
    date: "Jan 12, 2026",
    title: "Absolutely worth the investment",
    body: "Build quality is outstanding. Everything arrived in perfect condition and POMG handled the transfer seamlessly. Will definitely be buying from them again.",
    verified: true,
  },
  {
    id: 2,
    author: "Jason T.",
    rating: 4,
    date: "Dec 28, 2025",
    title: "Great product, fast shipping",
    body: "Exactly as described. Shipped quickly and the packaging was excellent. Only minor note is the wait for FFL transfer, but that's the process, not the dealer.",
    verified: true,
  },
  {
    id: 3,
    author: "Chris L.",
    rating: 5,
    date: "Nov 15, 2025",
    title: "POMG is the real deal",
    body: "Second purchase from Piece of Mind Guns. Their team is incredibly knowledgeable and the product selection is top tier. This piece exceeded my expectations.",
    verified: true,
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const product = getProductBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  /* ── 404 ── */
  if (!product) {
    return (
      <div className="min-h-screen bg-pomg-dark">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-24 text-center">
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pomg-surface mb-6">
              <Package className="h-10 w-10 text-pomg-dim" />
            </div>
            <h1 className="font-display text-4xl uppercase text-white mb-3">
              Product Not Found
            </h1>
            <p className="text-pomg-muted mb-8 max-w-md">
              The product you&apos;re looking for doesn&apos;t exist or may have been removed.
            </p>
            <Link
              href="/shop"
              className="btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product);
  const savings = product.msrp > product.price ? product.msrp - product.price : 0;
  const savingsPercent = savings > 0 ? Math.round((savings / product.msrp) * 100) : 0;
  const fullStars = Math.floor(product.rating);
  const hasHalf = product.rating - fullStars >= 0.5;

  const tabs: { id: Tab; label: string }[] = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "shipping", label: "Shipping" },
    { id: "reviews", label: "Reviews" },
  ];

  const categoryLabel =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  /* ── Rating distribution (simulated) ── */
  const ratingDistribution = [
    { stars: 5, pct: 72 },
    { stars: 4, pct: 18 },
    { stars: 3, pct: 6 },
    { stars: 2, pct: 3 },
    { stars: 1, pct: 1 },
  ];

  /* ── JSON-LD ── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.manufacturer,
    },
    offers: {
      "@type": "Offer",
      url: `https://pomg.com/shop/${product.slug}`,
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
    },
  };

  return (
    <div className="min-h-screen bg-pomg-dark">
      <Header />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Breadcrumbs ── */}
        <nav className="flex items-center gap-2 text-xs text-pomg-dim mb-8 flex-wrap">
          <Link href="/" className="hover:text-pomg-muted transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-pomg-muted transition-colors">
            Shop
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-pomg-muted transition-colors"
          >
            {categoryLabel}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-pomg-muted truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ── Left: Image Gallery ── */}
          <div>
            {/* Main Image */}
            <div className="product-image-container aspect-square rounded-lg overflow-hidden relative bg-pomg-surface">
              <Image
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                {product.isNew && (
                  <span className="bg-emerald-500/90 text-white text-xs font-bold px-2.5 py-1 rounded">
                    NEW
                  </span>
                )}
                {product.isNfa && (
                  <span className="bg-pomg-gold text-pomg-darker text-xs font-bold px-2.5 py-1 rounded">
                    NFA
                  </span>
                )}
              </div>

              {/* Savings Badge */}
              {savingsPercent > 0 && (
                <span className="absolute bottom-3 right-3 z-10 bg-emerald-500/90 text-white text-xs font-bold px-2.5 py-1 rounded">
                  SAVE {savingsPercent}%
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? "border-pomg-purple ring-1 ring-pomg-purple/50"
                        : "border-pomg-border hover:border-pomg-border-light"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Product Info ── */}
          <div>
            {/* Manufacturer */}
            <Link
              href={`/shop?manufacturer=${encodeURIComponent(product.manufacturer)}`}
              className="text-sm uppercase tracking-wider text-pomg-purple-light hover:text-pomg-purple transition-colors"
            >
              {product.manufacturer}
            </Link>

            {/* Product Name */}
            <h1 className="font-display text-4xl lg:text-5xl uppercase text-white mt-2 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < fullStars
                        ? "fill-pomg-gold text-pomg-gold"
                        : i === fullStars && hasHalf
                          ? "fill-pomg-gold/50 text-pomg-gold"
                          : "text-pomg-border"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-pomg-muted">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm text-pomg-dim">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price Block */}
            <div className="mt-5 flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-bold text-white">
                ${product.price.toLocaleString()}
              </span>
              {savings > 0 && (
                <>
                  <span className="text-lg text-pomg-dim line-through">
                    MSRP ${product.msrp.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Save ${savings.toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* NFA Notice */}
            {product.isNfa && (
              <div className="mt-5 rounded-lg border border-pomg-gold/30 bg-pomg-gold/5 p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-pomg-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-pomg-gold">
                      NFA / Tax Stamp Item
                    </p>
                    <p className="text-xs text-pomg-muted mt-1 leading-relaxed">
                      This item requires a $200 federal tax stamp and ATF Form 4 approval. 
                      Average wait time is 4–9 months. We handle all paperwork and guide you 
                      through the entire process.
                    </p>
                    <Link
                      href="/nfa-guide"
                      className="inline-flex items-center gap-1 text-xs text-pomg-gold hover:text-pomg-gold-light mt-2 transition-colors"
                    >
                      Learn about the NFA process
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Stock Indicator */}
            <div className="flex items-center gap-2 mt-5">
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${
                  product.inStock
                    ? product.stockCount <= 3
                      ? "bg-amber-400 animate-pulse"
                      : "bg-emerald-400"
                    : "bg-red-500"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  product.inStock
                    ? product.stockCount <= 3
                      ? "text-amber-400"
                      : "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {product.inStock
                  ? product.stockCount <= 3
                    ? `Only ${product.stockCount} left in stock`
                    : `In Stock (${product.stockCount} available)`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="mt-6 space-y-3">
              {/* Quantity Selector */}
              {product.inStock && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-pomg-muted">Qty:</span>
                  <div className="flex items-center rounded-lg border border-pomg-border overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-pomg-muted hover:text-white hover:bg-pomg-surface transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-medium text-white bg-pomg-surface py-2">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.min(product.stockCount, q + 1))
                      }
                      className="px-3 py-2 text-pomg-muted hover:text-white hover:bg-pomg-surface transition-colors"
                      disabled={quantity >= product.stockCount}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              {product.inStock ? (
                <button className="btn-gold w-full rounded-lg py-4 font-display text-lg uppercase tracking-wider flex items-center justify-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
              ) : (
                <button className="w-full rounded-lg border-2 border-pomg-border py-4 font-display text-lg uppercase tracking-wider text-pomg-muted hover:border-pomg-purple hover:text-pomg-text transition-colors flex items-center justify-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notify When Available
                </button>
              )}

              {/* Wishlist + Share Row */}
              <div className="flex gap-3">
                <button
                  onClick={() => setWishlisted((w) => !w)}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                    wishlisted
                      ? "border-pomg-gold bg-pomg-gold/10 text-pomg-gold"
                      : "border-pomg-border text-pomg-muted hover:border-pomg-border-light hover:text-pomg-text"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${wishlisted ? "fill-pomg-gold" : ""}`}
                  />
                  {wishlisted ? "Wishlisted" : "Add to Wishlist"}
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg border border-pomg-border px-4 py-2.5 text-sm text-pomg-muted hover:border-pomg-border-light hover:text-pomg-text transition-colors">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="rounded-lg border border-pomg-border bg-pomg-surface/50 p-3 text-center">
                <Truck className="h-4 w-4 text-pomg-purple-light mx-auto mb-1" />
                <p className="text-[10px] text-pomg-muted leading-tight">
                  Free Shipping<br />Over $150
                </p>
              </div>
              <div className="rounded-lg border border-pomg-border bg-pomg-surface/50 p-3 text-center">
                <Shield className="h-4 w-4 text-pomg-purple-light mx-auto mb-1" />
                <p className="text-[10px] text-pomg-muted leading-tight">
                  Licensed FFL<br />Dealer
                </p>
              </div>
              <div className="rounded-lg border border-pomg-border bg-pomg-surface/50 p-3 text-center">
                <Check className="h-4 w-4 text-pomg-purple-light mx-auto mb-1" />
                <p className="text-[10px] text-pomg-muted leading-tight">
                  Guaranteed<br />Authentic
                </p>
              </div>
            </div>

            {/* SKU */}
            <p className="text-xs text-pomg-dim mt-4">
              SKU: {product.sku}
            </p>
          </div>
        </div>

        {/* ── Tabs Section ── */}
        <div className="mt-12 lg:mt-16">
          {/* Tab Buttons */}
          <div className="border-b border-pomg-border flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-display text-sm uppercase tracking-wider px-5 py-3 whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-pomg-gold text-white"
                    : "border-transparent text-pomg-dim hover:text-pomg-muted"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {/* ── Description ── */}
            {activeTab === "description" && (
              <div className="max-w-3xl space-y-4">
                <p className="text-pomg-muted leading-relaxed">
                  {product.description}
                </p>

                {/* Quick specs inline */}
                {(product.caliber || product.platform || product.barrelLength || product.weight) && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                    {product.caliber && (
                      <div className="rounded-lg bg-pomg-surface p-3">
                        <p className="text-[10px] uppercase tracking-wider text-pomg-dim">Caliber</p>
                        <p className="text-sm font-medium text-white mt-0.5">{product.caliber}</p>
                      </div>
                    )}
                    {product.platform && (
                      <div className="rounded-lg bg-pomg-surface p-3">
                        <p className="text-[10px] uppercase tracking-wider text-pomg-dim">Platform</p>
                        <p className="text-sm font-medium text-white mt-0.5">{product.platform}</p>
                      </div>
                    )}
                    {product.barrelLength && (
                      <div className="rounded-lg bg-pomg-surface p-3">
                        <p className="text-[10px] uppercase tracking-wider text-pomg-dim">Barrel</p>
                        <p className="text-sm font-medium text-white mt-0.5">{product.barrelLength}</p>
                      </div>
                    )}
                    {product.weight && (
                      <div className="rounded-lg bg-pomg-surface p-3">
                        <p className="text-[10px] uppercase tracking-wider text-pomg-dim">Weight</p>
                        <p className="text-sm font-medium text-white mt-0.5">{product.weight}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tags */}
                {product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-pomg-border bg-pomg-surface px-3 py-1 text-xs text-pomg-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Specifications ── */}
            {activeTab === "specifications" && (
              <div className="max-w-2xl">
                <div className="rounded-lg border border-pomg-border overflow-hidden">
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <div
                      key={key}
                      className={`flex items-center justify-between px-4 py-3 text-sm ${
                        i % 2 === 0 ? "bg-pomg-surface/50" : "bg-transparent"
                      } ${i > 0 ? "border-t border-pomg-border/50" : ""}`}
                    >
                      <span className="text-pomg-muted font-medium">{key}</span>
                      <span className="text-white text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Shipping ── */}
            {activeTab === "shipping" && (
              <div className="max-w-3xl space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-pomg-purple-light flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Standard Shipping</h4>
                      <p className="text-sm text-pomg-muted mt-1">
                        Free shipping on orders over $150. Standard delivery takes 3-7 business days. 
                        All firearms and NFA items ship fully insured via FedEx with signature required.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-pomg-purple-light flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">FFL Transfer</h4>
                      <p className="text-sm text-pomg-muted mt-1">
                        All firearms must be shipped to a Federal Firearms Licensee (FFL) near you. 
                        During checkout, you&apos;ll select your preferred FFL dealer. We coordinate 
                        directly with them for a seamless transfer. Your FFL may charge a transfer fee.
                      </p>
                    </div>
                  </div>

                  {product.isNfa && (
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-pomg-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-pomg-gold">NFA Item Shipping</h4>
                        <p className="text-sm text-pomg-muted mt-1">
                          This is an NFA-regulated item. After purchase, we&apos;ll hold the item at our 
                          facility and submit your ATF Form 4 for processing. Once your tax stamp is 
                          approved (typically 4–9 months), we&apos;ll ship to your designated FFL/SOT dealer 
                          or you can pick up at our Salt Lake City location.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="rounded-lg border border-pomg-border bg-pomg-surface/50 p-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Return Policy</h4>
                  <p className="text-sm text-pomg-muted leading-relaxed">
                    Unfired items may be returned within 14 days for a full refund. All returns require 
                    prior authorization. NFA items are non-returnable once the Form 4 has been submitted. 
                    Please inspect all items upon receipt and report any issues within 48 hours.
                  </p>
                </div>
              </div>
            )}

            {/* ── Reviews ── */}
            {activeTab === "reviews" && (
              <div className="max-w-3xl">
                {/* Rating Summary */}
                <div className="flex flex-col sm:flex-row gap-8 mb-8">
                  {/* Overall Score */}
                  <div className="text-center sm:text-left">
                    <p className="text-5xl font-bold text-white">
                      {product.rating.toFixed(1)}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < fullStars
                              ? "fill-pomg-gold text-pomg-gold"
                              : i === fullStars && hasHalf
                                ? "fill-pomg-gold/50 text-pomg-gold"
                                : "text-pomg-border"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-xs text-pomg-dim mt-1">
                      {product.reviewCount} reviews
                    </p>
                  </div>

                  {/* Distribution Bars */}
                  <div className="flex-1 space-y-1.5">
                    {ratingDistribution.map((dist) => (
                      <div key={dist.stars} className="flex items-center gap-2">
                        <span className="text-xs text-pomg-dim w-3 text-right">
                          {dist.stars}
                        </span>
                        <Star size={10} className="fill-pomg-gold text-pomg-gold" />
                        <div className="flex-1 h-2 rounded-full bg-pomg-surface overflow-hidden">
                          <div
                            className="h-full rounded-full bg-pomg-gold transition-all"
                            style={{ width: `${dist.pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-pomg-dim w-8">
                          {dist.pct}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {sampleReviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-t border-pomg-border/50 pt-6"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pomg-surface text-sm font-bold text-pomg-muted">
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">
                                {review.author}
                              </span>
                              {review.verified && (
                                <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400">
                                  <Check className="h-3 w-3" />
                                  Verified
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-pomg-dim">
                              {review.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={
                                i < review.rating
                                  ? "fill-pomg-gold text-pomg-gold"
                                  : "text-pomg-border"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">
                        {review.title}
                      </h4>
                      <p className="text-sm text-pomg-muted leading-relaxed">
                        {review.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 lg:mt-20">
            <div className="section-divider mb-10" />
            <h2 className="font-display text-3xl uppercase text-white mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
