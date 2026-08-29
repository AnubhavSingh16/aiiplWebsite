import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
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
    <section className="px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div className="max-w-xl">
            {/* <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
              {eyebrow}
            </p> */}

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#071A3A] sm:text-3xl">
              {title}
            </h2>
{/* 
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {description}
            </p> */}
          </div>

          <Link
            to="/products"
            className="
              inline-flex
              items-center
              gap-1.5
              self-start
              rounded-full
              border
              border-blue-100
              bg-white
              px-4
              py-2
              text-xs
              font-semibold
              text-slate-700
              shadow-sm
              transition
              hover:border-blue-200
              hover:text-blue-700
              sm:self-auto
            "
          >
            {ctaLabel}
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>


        {/* ================= PRODUCTS ================= */}

        <div className="-mx-5 mt-7 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [-ms-overflow-style:none] sm:-mx-6 sm:px-6 md:mx-0 md:overflow-visible md:px-0">
          <div className="flex gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">

            {/* Skeleton */}

            {loading &&
              Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton
                  key={index}
                  variant="wide"
                />
              ))}


            {/* Products */}

            {!loading &&
              products.map((product) => {
                const cartItem = cartItems.find(
                  (item) =>
                    item.id === product.id &&
                    !item.buildGroupId,
                );

                return (
                  <article
                    key={product.id}
                    className="
                      group
                      w-[72vw]
                      max-w-[280px]
                      shrink-0
                      overflow-hidden
                      rounded-2xl
                      border
                      border-blue-200
                      bg-white
                      shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:border-blue-400
                      hover:shadow-[0_16px_60px_rgba(67,99,235,0.20)]
                      md:w-auto
                      md:max-w-none
                    "
                  >

                    {/* ================= IMAGE ================= */}

                    <div className="relative overflow-hidden bg-slate-100">

                      {product.badge && (
                        <span
                          className="
                            absolute
                            left-3
                            top-3
                            z-10
                            rounded-full
                            bg-white/95
                            px-2.5
                            py-1
                            text-[10px]
                            font-bold
                            text-blue-700
                            shadow-sm
                            backdrop-blur
                          "
                        >
                          {product.badge}
                        </span>
                      )}

                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                          h-48
                          w-full
                          object-cover
                          transition
                          duration-500
                          group-hover:scale-105
                        "
                      />
                    </div>


                    {/* ================= CONTENT ================= */}

                    <div className="p-4">

                      {/* Category + Rating */}

                      <div className="flex items-center justify-between gap-2">

                        <p className="truncate text-[11px] font-medium text-slate-400">
                          {product.category}
                        </p>

                        <div className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-amber-500">
                          <Star className="h-3 w-3 fill-current" />
                          {product.rating}
                        </div>

                      </div>


                      {/* Product Name */}

                      <h3 className="mt-1.5 line-clamp-1 text-base font-semibold tracking-tight text-slate-900">
                        {product.name}
                      </h3>


                      {/* Description */}

                      <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-500">
                        {product.description}
                      </p>


                      {/* Actions */}

                      <div className="mt-4 flex items-center justify-between gap-2">

                        <Link
                          to={`/products/${product.id}`}
                          className="
                            rounded-full
                            border
                            border-slate-200
                            px-3
                            py-2
                            text-[11px]
                            font-semibold
                            text-slate-700
                            transition
                            hover:border-blue-200
                            hover:text-blue-700
                          "
                        >
                          View
                        </Link>


                        {/* Cart */}

                        {cartItem ? (
                          <div
                            className="
                              flex
                              items-center
                              rounded-full
                              bg-blue-600
                              px-1
                              py-1
                              text-white
                              shadow-sm
                            "
                          >

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  cartItem.cartItemId,
                                )
                              }
                              className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-full
                                transition
                                hover:bg-white/20
                              "
                            >
                              <Minus className="h-3 w-3" />
                            </button>


                            <div
                              className="
                                flex
                                min-w-8
                                items-center
                                justify-center
                                gap-1
                                text-[11px]
                                font-bold
                              "
                            >
                              <ShoppingCart className="h-3 w-3" />
                              {cartItem.quantity}
                            </div>


                            <button
                              type="button"
                              onClick={() =>
                                addToCart(product)
                              }
                              className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-full
                                transition
                                hover:bg-white/20
                              "
                            >
                              <Plus className="h-3 w-3" />
                            </button>

                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              addToCart(product)
                            }
                            className="
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-full
                              bg-blue-600
                              px-3.5
                              py-2
                              text-[11px]
                              font-semibold
                              text-white
                              shadow-sm
                              transition
                              hover:bg-blue-700
                            "
                          >
                            <ShoppingCart className="h-3.5 w-3.5" />
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