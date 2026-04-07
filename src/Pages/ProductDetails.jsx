import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, ShoppingCart, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { productCatalog } from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();

  const product = productCatalog.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <section className="px-6 pb-20 pt-32">
          <div className="mx-auto max-w-4xl rounded-[28px] border border-dashed border-blue-200 bg-white px-6 py-16 text-center shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
            <h1 className="text-3xl font-semibold text-slate-950">Product not found</h1>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              The product you are looking for is not available right now.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Back to products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const cartItem = cartItems.find((item) => item.id === product.id);
  const relatedProducts = productCatalog
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);

  const highlights = [
    "Instant provisioning and guided onboarding",
    "Scalable plans for growing business workloads",
    "Business-ready support with secure infrastructure",
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="mx-auto h-[420px] max-w-7xl rounded-b-[56px] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.24),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_30%),linear-gradient(180deg,_#ffffff_0%,_#eff6ff_55%,_#f8fafc_100%)]" />
      </div>

      <Navbar />

      <section className="px-6 pb-16 pt-32">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-800"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to products
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_420px]">
            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="relative bg-slate-100">
                <span className="absolute left-6 top-6 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                  {product.badge}
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[420px] w-full object-cover"
                />
              </div>
            </div>

            <div className="rounded-[26px] border border-blue-100 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                {product.category} / {product.type}
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
                {product.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-600">
                  <Star className="h-4 w-4 fill-current" />
                  {product.rating} rating
                </div>
                <div
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    product.inStock
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {product.inStock ? "Available now" : "Available on request"}
                </div>
              </div>

              <p className="mt-6 text-base leading-7 text-slate-600">
                {product.description} Built for teams that want performance, easier scaling,
                and a more polished delivery experience from day one.
              </p>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Starting from
                </div>
                <div className="mt-2 text-4xl font-semibold">{product.priceLabel}</div>
                <div className="mt-2 text-sm text-slate-300">
                  Flexible monthly pricing with room to scale as your needs grow.
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {highlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="mt-0.5 rounded-full bg-blue-50 p-1 text-blue-700">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {cartItem ? `Add More (${cartItem.quantity})` : "Add to Cart"}
                </button>
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
                >
                  View cart
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <section className="mt-16">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Related Products
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  More options in {product.category}
                </h2>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-800"
              >
                Browse full catalog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.map((item) => {
                const relatedCartItem = cartItems.find((cartProduct) => cartProduct.id === item.id);

                return (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.05)]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <div className="text-xs font-medium text-slate-500">{item.type}</div>
                      <h3 className="mt-1 text-base font-semibold text-slate-950">{item.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="text-lg font-semibold text-slate-950">{item.priceLabel}</div>
                        <div className="inline-flex items-center gap-1 text-sm font-medium text-amber-600">
                          <Star className="h-4 w-4 fill-current" />
                          {item.rating}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <Link
                          to={`/products/${item.id}`}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[11px] font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                        >
                          View Product
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3.5 py-2 text-[11px] font-semibold text-white transition hover:bg-blue-700"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          {relatedCartItem ? `Add More (${relatedCartItem.quantity})` : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
