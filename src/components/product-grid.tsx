"use client";

import { Package } from "lucide-react";
import type { Product } from "@/data/products";
import ProductCard from "@/components/product-card";

interface ProductGridProps {
  products: Product[];
  title: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
}

export default function ProductGrid({
  products,
  title,
  subtitle,
  columns = 3,
}: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {title}
            </h2>
            <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full text-xs font-bold bg-pomg-purple/20 text-pomg-purple-light border border-pomg-purple/30">
              {products.length}
            </span>
          </div>
          {subtitle && (
            <p className="text-sm text-pomg-muted max-w-lg">{subtitle}</p>
          )}
        </div>

        {/* Decorative line */}
        <div className="hidden sm:block flex-1 max-w-xs h-px bg-gradient-to-r from-pomg-border via-pomg-purple/30 to-transparent" />
      </div>

      {/* Grid or Empty State */}
      {products.length > 0 ? (
        <div className={`grid ${gridCols[columns]} gap-5 lg:gap-6 stagger-children`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 rounded-xl border border-dashed border-pomg-border bg-pomg-card/50">
          <div className="p-4 rounded-full bg-pomg-dark mb-4">
            <Package className="h-8 w-8 text-pomg-muted" />
          </div>
          <h3 className="text-lg font-semibold text-pomg-text mb-1">
            No products found
          </h3>
          <p className="text-sm text-pomg-muted text-center max-w-sm">
            Try adjusting your filters or search terms to find what you are
            looking for.
          </p>
        </div>
      )}
    </section>
  );
}
