"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Star, Eye, Heart, Package } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const savings = product.msrp - product.price;
  const hasSavings = savings > 0;
  const savingsPercent = hasSavings
    ? Math.round((savings / product.msrp) * 100)
    : 0;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
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
  };

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div
        className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
          isHovered
            ? "shadow-lg shadow-pomg-purple/20 -translate-y-1"
            : "shadow-none translate-y-0"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient border effect */}
        <div
          className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(135deg, var(--pomg-purple), var(--pomg-gold), var(--pomg-purple))",
            padding: "1px",
          }}
        >
          <div className="absolute inset-[1px] rounded-xl bg-pomg-card" />
        </div>

        {/* Card content */}
        <div className="relative bg-pomg-card border border-pomg-border rounded-xl overflow-hidden group-hover:border-transparent transition-colors duration-300">
          {/* Image area */}
          <div className="relative aspect-square product-image-placeholder overflow-hidden">
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(67,67,122,0.15) 0%, rgba(201,168,76,0.08) 50%, rgba(67,67,122,0.15) 100%)",
              }}
            />

            {/* Product name display in placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <Package className="h-10 w-10 text-pomg-purple/40 mb-3" />
              <span className="text-sm font-semibold text-pomg-text/70 leading-tight">
                {product.name}
              </span>
              <span className="text-xs text-pomg-muted mt-1">
                {product.manufacturer}
              </span>
            </div>

            {/* Hover overlay with quick view */}
            <div
              className={`absolute inset-0 bg-pomg-dark/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-200 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-pomg-purple/80 text-white text-sm font-medium">
                <Eye className="h-4 w-4" />
                Quick View
              </div>
            </div>

            {/* Top badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {/* Category badge */}
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-pomg-purple/80 text-white backdrop-blur-sm">
                {product.category}
              </span>

              {/* NEW badge */}
              {product.isNew && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/90 text-white backdrop-blur-sm">
                  NEW
                </span>
              )}

              {/* NFA badge */}
              {product.isNfa && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-pomg-gold/90 text-pomg-dark backdrop-blur-sm">
                  NFA
                </span>
              )}
            </div>

            {/* Wishlist button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsWishlisted(!isWishlisted);
              }}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                isWishlisted
                  ? "bg-red-500/20 text-red-400"
                  : "bg-pomg-dark/40 text-pomg-muted hover:text-red-400 hover:bg-red-500/20"
              }`}
            >
              <Heart
                className={`h-4 w-4 transition-all ${
                  isWishlisted ? "fill-red-400" : ""
                }`}
              />
            </button>

            {/* Savings badge - bottom right of image */}
            {hasSavings && (
              <div className="absolute bottom-3 right-3">
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-emerald-500/90 text-white backdrop-blur-sm">
                  SAVE {savingsPercent}%
                </span>
              </div>
            )}
          </div>

          {/* Info section */}
          <div className="p-4 space-y-3">
            {/* Manufacturer */}
            <p className="text-[11px] font-semibold uppercase tracking-widest text-pomg-purple">
              {product.manufacturer}
            </p>

            {/* Product name */}
            <h3 className="text-sm font-bold text-pomg-text leading-snug line-clamp-2 group-hover:text-white transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {renderStars(product.rating)}
              </div>
              <span className="text-xs text-pomg-muted">
                {product.rating.toFixed(1)} ({product.reviewCount})
              </span>
            </div>

            {/* Quick specs */}
            {(product.caliber || product.barrelLength) && (
              <div className="flex items-center gap-2 flex-wrap">
                {product.caliber && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-pomg-dark text-pomg-muted border border-pomg-border">
                    {product.caliber}
                  </span>
                )}
                {product.barrelLength && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-pomg-dark text-pomg-muted border border-pomg-border">
                    {product.barrelLength} BBL
                  </span>
                )}
              </div>
            )}

            {/* Stock indicator */}
            <div className="flex items-center gap-1.5">
              {product.inStock ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs text-emerald-400 font-medium">
                    In Stock ({product.stockCount})
                  </span>
                </>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex rounded-full h-2 w-2 bg-red-500" />
                    <span className="text-xs text-red-400 font-medium">
                      Out of Stock
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="text-[10px] font-semibold text-pomg-gold hover:text-pomg-gold/80 transition-colors underline underline-offset-2"
                  >
                    Notify Me
                  </button>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-pomg-border" />

            {/* Price and CTA */}
            <div className="flex items-end justify-between gap-2">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-white">
                    ${product.price.toLocaleString()}
                  </span>
                  {hasSavings && (
                    <span className="text-xs text-pomg-muted line-through">
                      ${product.msrp.toLocaleString()}
                    </span>
                  )}
                </div>
                {hasSavings && (
                  <span className="text-[11px] text-emerald-400 font-medium">
                    Save ${savings.toLocaleString()}
                  </span>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                disabled={!product.inStock}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  product.inStock
                    ? "bg-gradient-to-r from-pomg-purple to-pomg-purple/80 text-white hover:shadow-md hover:shadow-pomg-purple/30 hover:brightness-110 active:scale-95"
                    : "bg-pomg-dark text-pomg-muted cursor-not-allowed border border-pomg-border"
                }`}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                {product.inStock ? "Add" : "Sold Out"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
