import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";

export default function BestSellingProducts({
  eyebrow = "Best Sellers",
  title = "Best selling products",
  description = "Browse featured products in a reusable e-commerce style section.",
  ctaLabel = "View all products",
  products = [],
}) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              {eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 self-start rounded-full border border-blue-100 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700 lg:self-auto"
          >
            {ctaLabel}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(37,99,235,0.12)]"
            >
              <div className="relative overflow-hidden bg-slate-100">
                {product.badge && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                    {product.badge}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-slate-500">{product.category}</p>
                  <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    {product.rating}
                  </div>
                </div>

                <h3 className="mt-3 text-xl font-semibold text-slate-900">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {product.description}
                </p>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Starting from
                    </div>
                    <div className="mt-1 text-2xl font-semibold text-slate-900">
                      {product.price}
                    </div>
                  </div>

                  <Link
                    to={`/products/${product.id}`}
                    className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
