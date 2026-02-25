"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, ShoppingCart, Bell } from "lucide-react";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);

  const savings = product.msrp > product.price ? product.msrp - product.price : 0;
  const savingsPercent = savings > 0 ? Math.round((savings / product.msrp) * 100) : 0;

  const fullStars = Math.floor(product.rating);
  const hasHalf = product.rating - fullStars >= 0.5;

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="bg-pomg-card border border-pomg-border rounded-lg overflow-hidden transition-all duration-300 group-hover:border-pomg-border-light group-hover:translate-y-[-2px]">
        {/* ── Image Area ── */}
        <div className="product-image-container aspect-[4/3] relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Top-left badges */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
            {product.isNew && (
              <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                NEW
              </span>
            )}
            {product.isNfa && (
              <span className="bg-pomg-gold text-pomg-darker text-[10px] font-bold px-2 py-0.5 rounded">
                NFA
              </span>
            )}
          </div>

          {/* Top-right wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setWishlisted((w) => !w);
            }}
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-pomg-darker/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pomg-darker/80"
            aria-label="Add to wishlist"
          >
            <Heart
              size={16}
              className={
                wishlisted
                  ? "fill-pomg-gold text-pomg-gold"
                  : "text-pomg-muted hover:text-pomg-gold"
              }
            />
          </button>

          {/* Bottom-right savings badge */}
          {savingsPercent > 0 && (
            <span className="absolute bottom-2 right-2 z-10 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              SAVE {savingsPercent}%
            </span>
          )}

          {/* Hover glow overlay */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-pomg-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* ── Content Area ── */}
        <div className="p-4">
          {/* Manufacturer */}
          <p className="text-[11px] uppercase tracking-wider text-pomg-muted font-medium">
            {product.manufacturer}
          </p>

          {/* Product name */}
          <h3 className="text-sm font-semibold text-pomg-text leading-tight mt-1 line-clamp-2">
            {product.name}
          </h3>

          {/* Quick specs */}
          {(product.caliber || product.barrelLength) && (
            <p className="text-[11px] text-pomg-dim mt-1.5 flex items-center gap-1 flex-wrap">
              {product.caliber && <span>{product.caliber}</span>}
              {product.caliber && product.barrelLength && (
                <span className="text-pomg-border">&middot;</span>
              )}
              {product.barrelLength && <span>{product.barrelLength} barrel</span>}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
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
            <span className="text-[11px] text-pomg-muted">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-pomg-dim">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-lg font-bold text-white">
              ${product.price.toLocaleString()}
            </span>
            {savings > 0 && (
              <>
                <span className="text-xs text-pomg-dim line-through">
                  ${product.msrp.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-emerald-400">
                  Save ${savings.toLocaleString()}
                </span>
              </>
            )}
          </div>

          {/* Stock indicator */}
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                product.inStock
                  ? "bg-emerald-400 animate-pulse"
                  : "bg-red-500"
              }`}
            />
            <span className="text-[11px] text-pomg-dim">
              {product.inStock
                ? product.stockCount <= 3
                  ? `Only ${product.stockCount} left`
                  : "In Stock"
                : "Out of Stock"}
            </span>
          </div>

          {/* Add to Cart / Notify */}
          {product.inStock ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-full mt-3 py-2 text-xs font-semibold rounded btn-primary flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            >
              <ShoppingCart size={14} />
              Add to Cart
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-full mt-3 py-2 text-xs font-semibold rounded border border-pomg-border-light text-pomg-muted hover:text-pomg-text hover:border-pomg-purple flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            >
              <Bell size={14} />
              Notify Me
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
