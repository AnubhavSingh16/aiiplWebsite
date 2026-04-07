import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cartItems,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="mx-auto h-[360px] max-w-7xl rounded-b-[56px] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.14),_transparent_30%),linear-gradient(180deg,_#ffffff_0%,_#eff6ff_55%,_#f8fafc_100%)]" />
      </div>

      <Navbar />

      <section className="px-6 pb-16 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
                <ShoppingCart className="h-4 w-4" />
                Cart summary
              </div>
              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                Review the products you added.
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Update quantities, remove items, and keep track of your selected
                products before moving ahead.
              </p>
            </div>

            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-600"
              >
                Clear cart
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="mt-10 rounded-[28px] border border-dashed border-blue-200 bg-white px-6 py-16 text-center shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                <ShoppingCart className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-slate-900">
                Your cart is empty
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-slate-600">
                Start adding products from the catalog and they will appear here
                automatically.
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Browse products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <article
                    key={item.id}
                    className="grid gap-4 rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)] md:grid-cols-[120px_minmax(0,1fr)_auto]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-28 w-full rounded-[16px] object-cover"
                    />

                    <div>
                      <div className="text-xs font-medium text-slate-500">
                        {item.category} - {item.type}
                      </div>
                      <h2 className="mt-1 text-lg font-semibold text-slate-950">
                        {item.name}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                      <div className="mt-3 text-sm font-semibold text-blue-700">
                        {item.priceLabel}
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 md:items-end">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>

                      <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="rounded-full p-1 text-slate-600 transition hover:bg-white hover:text-blue-700"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="rounded-full p-1 text-slate-600 transition hover:bg-white hover:text-blue-700"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                          Total
                        </div>
                        <div className="mt-1 text-lg font-semibold text-slate-950">
                          ${item.price * item.quantity}/mo
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="h-fit rounded-[28px] border border-blue-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
                  Order Summary
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Items</span>
                    <span className="font-semibold text-slate-900">{totalItems}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Products selected</span>
                    <span className="font-semibold text-slate-900">{cartItems.length}</span>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Estimated total</span>
                    <span className="text-2xl font-semibold text-slate-950">
                      ${totalPrice}/mo
                    </span>
                  </div>
                </div>

                <button className="mt-6 w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Proceed to checkout
                </button>
                <Link
                  to="/products"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
                >
                  Continue shopping
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
