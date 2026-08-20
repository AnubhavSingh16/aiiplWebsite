import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductCardSkeleton from "./skeletons/ProductCardSkeleton";

export default function BestSellingProducts({
  eyebrow = "Best Sellers",
  title = "Best selling products",
  description = "Browse featured products in a reusable e-commerce style section.",
  ctaLabel = "View all products",
  products = [],
  loading = false,
}) {
  const { addToCart, cartItems, decreaseQuantity } = useCart();

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

        <div className="-mx-6 mt-10 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] md:mx-0 md:overflow-visible md:px-0">
          <div className="flex gap-4 md:grid md:gap-6 md:grid-cols-2 xl:grid-cols-4">
            {loading &&
              Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} variant="wide" />
              ))}
            {!loading && products.map((product) => {
              const cartItem = cartItems.find(
                (item) => item.id === product.id && !item.buildGroupId,
              );

              return (
                <article
                  key={product.id}
                  className="group w-[82vw] max-w-[320px] shrink-0 overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(37,99,235,0.12)] md:w-auto md:max-w-none md:min-w-0"
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

                    <div className="mt-6 flex items-center justify-end gap-3">
                      <Link
                        to={`/products/${product.id}`}
                        className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
                      >
                        View Product
                      </Link>
                      {cartItem ? (
                        <div className="flex items-center justify-between rounded-full bg-blue-600 px-2 py-1.5 text-white">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(cartItem.cartItemId)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/20"
                          >
                            <Minus className="h-4 w-4" />
                          </button>

                          <div className="inline-flex min-w-10 items-center justify-center gap-1.5 text-sm font-semibold">
                            <ShoppingCart className="h-4 w-4" />
                            {cartItem.quantity}
                          </div>

                          <button
                            type="button"
                            onClick={() => addToCart(product)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/20"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
