"use client";

import type { Product } from "@/data/products";
import ProductCard from "@/components/product-card";
import { Package } from "lucide-react";

const gridColsMap = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const;

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
}

export default function ProductGrid({
  products,
  title,
  subtitle,
  columns = 4,
}: ProductGridProps) {
  const colClasses = gridColsMap[columns] ?? gridColsMap[4];

  return (
    <section>
      {/* ── Header ── */}
      {(title || subtitle) && (
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
          <div>
            {title && (
              <h2 className="font-display text-3xl md:text-4xl uppercase text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-pomg-muted mt-1 text-sm md:text-base">
                {subtitle}
              </p>
            )}
          </div>
          <span className="text-[11px] font-medium text-pomg-dim bg-pomg-surface border border-pomg-border rounded-full px-3 py-1 shrink-0 self-start sm:self-auto">
            {products.length} {products.length === 1 ? "product" : "products"}
          </span>
        </div>
      )}

      {/* ── Grid ── */}
      {products.length > 0 ? (
        <div className={`grid ${colClasses} gap-4 md:gap-5 stagger-children`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* ── Empty State ── */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-pomg-surface border border-pomg-border flex items-center justify-center mb-4">
            <Package size={28} className="text-pomg-dim" />
          </div>
          <h3 className="text-lg font-semibold text-pomg-text mb-1">
            No products found
          </h3>
          <p className="text-sm text-pomg-muted max-w-xs">
            Try adjusting your filters or check back later for new inventory.
          </p>
        </div>
      )}
    </section>
  );
}
