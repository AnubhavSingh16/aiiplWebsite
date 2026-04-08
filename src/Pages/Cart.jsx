import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShoppingCart,
  Trash2,
  User,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

const PROFILE_STORAGE_KEY = "userProfile";

const emptyProfile = {
  name: "",
  phone: "",
  email: "",
  address: "",
};

const readSavedProfile = () => {
  try {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    return saved ? { ...emptyProfile, ...JSON.parse(saved) } : emptyProfile;
  } catch {
    return emptyProfile;
  }
};

const hasCheckoutDetails = (profile) =>
  [profile.name, profile.phone, profile.email, profile.address].every((value) =>
    value.trim()
  );

const formatPrice = (value) => `Rs. ${value}`;

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

  const [savedProfile, setSavedProfile] = useState(emptyProfile);
  const [checkoutForm, setCheckoutForm] = useState(emptyProfile);
  const [showAddressPrompt, setShowAddressPrompt] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  useEffect(() => {
    const profile = readSavedProfile();
    setSavedProfile(profile);
    setCheckoutForm(profile);
  }, []);

  const canUseSavedAddress = useMemo(
    () => hasCheckoutDetails(savedProfile),
    [savedProfile]
  );

  const cartSections = useMemo(() => {
    const groupedBuilds = cartItems.reduce((groups, item) => {
      if (!item.buildGroupId) {
        return groups;
      }

      if (!groups[item.buildGroupId]) {
        groups[item.buildGroupId] = {
          id: item.buildGroupId,
          name: item.buildGroupName || "Custom Build",
          items: [],
        };
      }

      groups[item.buildGroupId].items.push(item);
      return groups;
    }, {});

    const buildSections = Object.values(groupedBuilds).map((group) => ({
      ...group,
      totalPrice: group.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    }));

    const singleItems = cartItems.filter((item) => !item.buildGroupId);

    return { buildSections, singleItems };
  }, [cartItems]);

  const handleProceedToCheckout = () => {
    if (canUseSavedAddress) {
      setCheckoutMessage("");
      setShowAddressPrompt(true);
      return;
    }

    setCheckoutForm(savedProfile);
    setCheckoutMessage("");
    setShowCheckoutModal(true);
  };

  const handleUseSavedAddress = () => {
    setShowAddressPrompt(false);
    setCheckoutMessage("Saved profile selected for checkout.");
  };

  const handleOpenCheckoutForm = () => {
    setShowAddressPrompt(false);
    setCheckoutForm(savedProfile);
    setShowCheckoutModal(true);
  };

  const handleCheckoutChange = (event) => {
    const { name, value } = event.target;
    setCheckoutForm((current) => ({ ...current, [name]: value }));
  };

  const handleCheckoutSave = () => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(checkoutForm));
    setSavedProfile(checkoutForm);
    setShowCheckoutModal(false);
    setCheckoutMessage("Checkout details saved and ready to use.");
  };

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
                Update quantities, remove items, and confirm the address you want
                to use before checkout.
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
                {cartSections.buildSections.map((group) => (
                  <section
                    key={group.id}
                    className="rounded-[24px] border border-blue-100 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]"
                  >
                    <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                          Saved Build
                        </div>
                        <h2 className="mt-1 text-xl font-semibold text-slate-950">
                          {group.name}
                        </h2>
                        <p className="mt-1 text-sm text-slate-600">
                          These parts were saved together from the Build PC page.
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        {formatPrice(group.totalPrice)}/mo
                      </div>
                    </div>

                    <div className="mt-4 space-y-4">
                      {group.items.map((item) => (
                        <article
                          key={item.cartItemId}
                          className="grid gap-4 rounded-[22px] border border-slate-200 bg-slate-50 p-4 md:grid-cols-[120px_minmax(0,1fr)_auto]"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-28 w-full rounded-[16px] object-cover"
                          />

                          <div>
                            <div className="text-xs font-medium text-slate-500">
                              {item.category} - {item.buildCategory || item.type}
                            </div>
                            <h3 className="mt-1 text-lg font-semibold text-slate-950">
                              {item.name}
                            </h3>
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
                              onClick={() => removeFromCart(item.cartItemId)}
                              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </button>

                            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2">
                              <button
                                type="button"
                                onClick={() => decreaseQuantity(item.cartItemId)}
                                className="rounded-full p-1 text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="min-w-6 text-center text-sm font-semibold text-slate-900">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => increaseQuantity(item.cartItemId)}
                                className="rounded-full p-1 text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                                Total
                              </div>
                              <div className="mt-1 text-lg font-semibold text-slate-950">
                                {formatPrice(item.price * item.quantity)}/mo
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}

                {cartSections.singleItems.map((item) => (
                  <article
                    key={item.cartItemId}
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
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>

                      <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.cartItemId)}
                          className="rounded-full p-1 text-slate-600 transition hover:bg-white hover:text-blue-700"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.cartItemId)}
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
                          {formatPrice(item.price * item.quantity)}/mo
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
                      {formatPrice(totalPrice)}/mo
                    </span>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <MapPin className="h-4 w-4 text-blue-700" />
                    Delivery details
                  </div>
                  {canUseSavedAddress ? (
                    <div className="mt-3 space-y-1 text-sm text-slate-600">
                      <div className="font-medium text-slate-900">{savedProfile.name}</div>
                      <div>{savedProfile.phone}</div>
                      <div>{savedProfile.email}</div>
                      <div>{savedProfile.address}</div>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      No complete profile saved yet. You can add it during checkout.
                    </p>
                  )}
                </div>

                {checkoutMessage && (
                  <div className="mt-4 inline-flex w-full items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    {checkoutMessage}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="mt-6 w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
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

      {showAddressPrompt && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/45 px-4">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Checkout Address
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  Continue with saved details?
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowAddressPrompt(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <div className="font-medium text-slate-900">{savedProfile.name}</div>
              <div className="mt-1">{savedProfile.phone}</div>
              <div>{savedProfile.email}</div>
              <div className="mt-2 leading-6">{savedProfile.address}</div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleUseSavedAddress}
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Continue with this address
              </button>
              <button
                type="button"
                onClick={handleOpenCheckoutForm}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
              >
                Use different details
              </button>
            </div>
          </div>
        </div>
      )}

      {showCheckoutModal && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-slate-950/45 px-4 py-8">
          <div className="mx-auto w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Checkout Form
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  Add delivery details
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Save these details now and we will reuse them next time as well.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCheckoutModal(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="rounded-2xl border border-slate-200 px-4 py-3">
                <div className="mb-2 text-sm font-medium text-slate-700">Full name</div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={checkoutForm.name}
                    onChange={handleCheckoutChange}
                    placeholder="Enter your full name"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>

              <label className="rounded-2xl border border-slate-200 px-4 py-3">
                <div className="mb-2 text-sm font-medium text-slate-700">Phone</div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    name="phone"
                    value={checkoutForm.phone}
                    onChange={handleCheckoutChange}
                    placeholder="Enter your phone number"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>

              <label className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2">
                <div className="mb-2 text-sm font-medium text-slate-700">Email</div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={checkoutForm.email}
                    onChange={handleCheckoutChange}
                    placeholder="Enter your email"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>

              <label className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2">
                <div className="mb-2 text-sm font-medium text-slate-700">Address</div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-slate-400" />
                  <textarea
                    name="address"
                    rows="4"
                    value={checkoutForm.address}
                    onChange={handleCheckoutChange}
                    placeholder="Enter your full delivery address"
                    className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-end">
              <button
                type="button"
                onClick={() => setShowCheckoutModal(false)}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCheckoutSave}
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Save and continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
