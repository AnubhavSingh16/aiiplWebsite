import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingCart,
  Check,
  ChevronDown,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { listProducts } from "../api/products";
import { listCategories } from "../api/categories";
import { listTypes } from "../api/types";
import { listSubtypes } from "../api/subtypes";
import ProductCardSkeleton from "../components/skeletons/ProductCardSkeleton";

const sortOptions = [
  { label: "Featured first", value: "featured" },
  { label: "Top rated", value: "rating" },
];

// A custom dropdown (not a native <select>) so the open panel can get a
// fixed-height, custom-styled scrollbar and a little open/close motion.
function FancyDropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-2 rounded-2xl border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-300"
      >
        <span className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-sky-400 text-white">
            <LayoutGrid className="h-3.5 w-3.5" />
          </span>
          {value}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180 text-blue-600" : ""
          }`}
        />
      </button>

      {open && (
        <div className="dropdown-pop absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-100/60">
          <div className="fancy-scrollbar max-h-60 space-y-0.5 overflow-y-auto p-1.5">
            {options.map((option) => {
              const active = option === value;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                    active
                      ? "bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {option}
                  {active && <Check className="h-4 w-4 flex-none" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Products() {
  const [productCatalog, setProductCatalog] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSubtypes, setSelectedSubtypes] = useState([]);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const { addToCart, cartItems, decreaseQuantity, totalItems } = useCart();

  useEffect(() => {
    Promise.all([listProducts(), listCategories(), listTypes(), listSubtypes()])
      .then(([productData, categoryData, typeData, subtypeData]) => {
        setProductCatalog(productData);
        setCategories(categoryData);
        setTypes(typeData);
        setSubtypes(subtypeData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categoryOptions = ["All", ...categories.map((category) => category.name)];

  const realTypeOptions =
    selectedCategory === "All"
      ? []
      : [
          ...new Set(
            types.filter((type) => type.category === selectedCategory).map((type) => type.name)
          ),
        ];

  const typeOptions = realTypeOptions.length > 0 ? ["All", ...realTypeOptions] : [];

  const subtypeOptions =
    selectedType === "All"
      ? []
      : [
          ...new Set(
            subtypes
              .filter((subtype) => subtype.category === selectedCategory && subtype.type === selectedType)
              .map((subtype) => subtype.name)
          ),
        ];

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedType("All");
    setSelectedSubtypes([]);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    setSelectedSubtypes([]);
  };

  const toggleSubtype = (subtype) => {
    setSelectedSubtypes((current) =>
      current.includes(subtype)
        ? current.filter((item) => item !== subtype)
        : [...current, subtype]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedType("All");
    setSelectedSubtypes([]);
    setFeaturedOnly(false);
    setInStockOnly(false);
    setSortBy("featured");
  };

  const filteredProducts = productCatalog
    .filter((product) => {
      const normalizedSearch = searchTerm.trim().toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        product.name?.toLowerCase().includes(normalizedSearch) ||
        product.category?.toLowerCase().includes(normalizedSearch) ||
        product.type?.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesType = selectedType === "All" || product.type === selectedType;

      const matchesSubtype =
        selectedSubtypes.length === 0 || selectedSubtypes.includes(product.badge);

      const matchesFeatured = !featuredOnly || product.featured;
      const matchesStock = !inStockOnly || product.inStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesSubtype &&
        matchesFeatured &&
        matchesStock
      );
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return Number(b.featured) - Number(a.featured);
    });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <style>
        {`
          @keyframes dropdownPop {
            from {
              opacity: 0;
              transform: translateY(-6px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .dropdown-pop {
            animation: dropdownPop 160ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }

          .fancy-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #93c5fd #eff6ff;
          }

          .fancy-scrollbar::-webkit-scrollbar {
            width: 6px;
          }

          .fancy-scrollbar::-webkit-scrollbar-track {
            background: #eff6ff;
            border-radius: 999px;
          }

          .fancy-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #60a5fa, #38bdf8);
            border-radius: 999px;
          }

          .fancy-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #3b82f6, #0ea5e9);
          }
        `}
      </style>
      <div className="absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="mx-auto h-[460px] max-w-7xl rounded-b-[56px] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_30%),linear-gradient(180deg,_#ffffff_0%,_#eff6ff_55%,_#f8fafc_100%)]" />
      </div>

      <Navbar />

      <section className="px-6 pb-16 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Smart catalog experience
              </div>

              <h1 className="mt-6 max-w-4xl text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                Explore every product in one modern, filter-first catalog.
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-7 text-slate-600">
                Built like a polished e-commerce page with search, category
                filters, availability controls, and a clean product grid for your
                full offerings.
              </p>
            </div>

            <Link
              to="/cart"
              className="group flex items-center justify-between rounded-3xl bg-gradient-to-bl from-slate-800 to-blue-400 px-7 py-6 shadow-lg transition hover:bg-slate-800"
            >
              {/* Left */}
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white shadow-inner">
                  <ShoppingCart className="h-7 w-7" />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm uppercase tracking-wide text-slate-200">
                    Cart
                  </span>
                  <span className="text-base font-medium text-white">
                    Items added
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3 text-white">
                <span className="text-3xl font-semibold">{totalItems}</span>
                <ArrowRight className="h-5 w-5 opacity-70 transition group-hover:translate-x-1" />
              </div>
            </Link>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="h-fit rounded-[32px] border border-blue-100 bg-gradient-to-b from-slate-800 to-blue-500 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-blue-50">
                  <SlidersHorizontal className="h-5 w-5 text-white " />
                  <h2 className="text-lg font-semibold">Filters</h2>
                </div>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-medium text-blue-100 transition hover:text-white border-2 border-blue-100 rounded-full px-3 py-1 hover:bg-red-600/90"
                >
                  Reset
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-blue-100/70 bg-white/70 p-4 backdrop-blur-sm">
                  <label className="text-sm font-semibold text-slate-900">
                    Search products
                  </label>
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3 focus-within:border-blue-300">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Search hosting, cloud, storage..."
                      className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="relative z-30 rounded-2xl border border-blue-100/70 bg-white/70 p-4 backdrop-blur-sm">
                  <div className="text-sm font-semibold text-slate-900">
                    Category
                  </div>
                  <div className="mt-3">
                    <FancyDropdown
                      options={categoryOptions}
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                    />
                  </div>
                </div>

                {selectedCategory !== "All" && typeOptions.length > 0 && (
                  <div className="rounded-2xl border border-blue-100/70 bg-white/70 p-4 backdrop-blur-sm">
                    <div className="text-sm font-semibold text-slate-900">Type</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {typeOptions.map((type) => {
                        const active = selectedType === type;

                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => handleTypeChange(type)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                              active
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                : "border border-blue-100 bg-white/90 text-slate-600 hover:border-blue-300 hover:text-blue-700"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedType !== "All" && subtypeOptions.length > 0 && (
                  <div className="rounded-2xl border border-blue-100/70 bg-white/70 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-900">Subtype</div>
                      {selectedSubtypes.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedSubtypes([])}
                          className="text-xs font-medium text-slate-400 transition hover:text-blue-700"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="mt-3 max-h-56 space-y-1 overflow-y-auto rounded-xl border border-blue-100 bg-white p-2">
                      {subtypeOptions.map((subtype) => {
                        const checked = selectedSubtypes.includes(subtype);

                        return (
                          <label
                            key={subtype}
                            className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                              checked
                                ? "bg-blue-50 text-blue-700"
                                : "text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleSubtype(subtype)}
                              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-300"
                            />
                            <Tag className="h-3.5 w-3.5 flex-none text-slate-400" />
                            {subtype}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="rounded-2xl border border-blue-100/70 bg-white/70 p-4 backdrop-blur-sm space-y-3">
                  <button
                    type="button"
                    onClick={() => setFeaturedOnly((value) => !value)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition ${
                      featuredOnly
                        ? "bg-slate-950 text-white"
                        : "border border-blue-100 bg-white/90 text-slate-700 hover:border-blue-300"
                    }`}
                  >
                    <span>Featured only</span>
                    {featuredOnly && <Check className="h-4 w-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setInStockOnly((value) => !value)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition ${
                      inStockOnly
                        ? "bg-slate-950 text-white"
                        : "border border-blue-100 bg-white/90 text-slate-700 hover:border-blue-300"
                    }`}
                  >
                    <span>Available now</span>
                    {inStockOnly && <Check className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </aside>

            <div>
              <div className="flex flex-col gap-4 rounded-[32px] border border-blue-100 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-500">
                    Showing {filteredProducts.length} of {productCatalog.length}{" "}
                    products
                  </div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">
                    Catalog built for easy discovery
                  </div>
                </div>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="appearance-none rounded-full border border-slate-200 bg-slate-50 px-5 py-3 pr-11 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-300 focus:bg-white"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {error && (
                <div className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {loading &&
                  Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton key={index} variant="grid" />
                  ))}
                {!loading && filteredProducts.map((product) => {
                  const cartItem = cartItems.find(
                    (item) => item.id === product.id,
                  );

                  return (
                    // <article
                    //   key={product.id}
                    //   className="group overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_44px_rgba(37,99,235,0.12)]"
                    // >
                    //   <div className="relative overflow-hidden bg-slate-100">
                    //     <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-blue-700 shadow-sm">
                    //       {product.badge}
                    //     </span>
                    //     <img
                    //       src={product.image}
                    //       alt={product.name}
                    //       className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                    //     />
                    //   </div>

                    //   <div className="p-3.5">
                    //     <div className="flex items-start justify-between gap-4">
                    //       <div>
                    //         <div className="text-xs font-medium text-slate-500">
                    //           {product.category} - {product.type}
                    //         </div>
                    //         <h3 className="mt-1 text-base font-semibold leading-5 text-slate-950">
                    //           {product.name}
                    //         </h3>
                    //       </div>
                    //       <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
                    //         <Star className="h-3.5 w-3.5 fill-current" />
                    //         {product.rating}
                    //       </div>
                    //     </div>

                    //     <p className="mt-2 text-[12px] leading-[1.1rem] text-slate-600">
                    //       {product.description}
                    //     </p>

                    //     <div className="mt-3 flex items-center gap-2">
                    //       <Link
                    //         to={`/products/${product.id}`}
                    //         className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[11px] font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                    //       >
                    //         View Product
                    //         <ArrowRight className="h-3.5 w-3.5" />
                    //       </Link>
                    //       <button
                    //         type="button"
                    //         onClick={() => addToCart(product)}
                    //         className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3.5 py-2 text-[11px] font-semibold text-white transition hover:bg-blue-700"
                    //       >
                    //         <ShoppingCart className="h-3.5 w-3.5" />
                    //         {cartItem ? `Add More (${cartItem.quantity})` : "Add to Cart"}
                    //       </button>
                    //     </div>
                    //   </div>
                    // </article>
                    <article
                      key={product.id}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-blue-200 hover:shadow-md"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden bg-slate-50">
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-blue-600">
                          {product.badge}
                        </span>

                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[11px] text-slate-500">
                              {product.category} • {product.type}
                            </p>

                            <h3 className="mt-1 text-sm font-semibold text-slate-900 leading-5">
                              {product.name}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1 text-xs text-amber-600">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            {product.rating}
                          </div>
                        </div>

                        <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <span
                            className={`text-[10px] font-medium ${
                              product.inStock
                                ? "text-green-600"
                                : "text-slate-400"
                            }`}
                          >
                            {product.inStock ? "In stock" : "Out of stock"}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex gap-2">
                          <Link
                            to={`/products/${product.id}`}
                            className="flex-1 rounded-full border border-slate-200 py-2 text-center text-[11px] font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                          >
                            View
                          </Link>

                          {cartItem ? (
                            <div className="flex flex-1 items-center justify-between rounded-full bg-blue-600 px-2 py-1.5 text-white">
                              <button
                                type="button"
                                onClick={() => decreaseQuantity(cartItem.cartItemId)}
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full  transition hover:bg-white/20"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>

                              <div className="inline-flex items-center gap-1.5 text-[11px] font-medium">
                                <ShoppingCart className="h-3.5 w-3.5" />
                                {cartItem.quantity}
                              </div>

                              <button
                                type="button"
                                onClick={() => addToCart(product)}
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full  transition hover:bg-white/20"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => addToCart(product)}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-blue-600 py-2 text-[11px] font-medium text-white transition hover:bg-blue-700 active:scale-95"
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

              {!loading && filteredProducts.length === 0 && (
                <div className="mt-6 rounded-[32px] border border-dashed border-blue-200 bg-white px-6 py-14 text-center">
                  <div className="text-2xl font-semibold text-slate-900">
                    No matching products
                  </div>
                  <p className="mx-auto mt-3 max-w-xl text-slate-600">
                    We couldn’t find any products matching your selection. Try removing a few filters or using a different search.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-16 rounded-[36px] border border-blue-100 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-10 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
                  Need a custom stack?
                </div>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                  Mix hosting, servers, and storage into a package that fits
                  your business.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                  This page gives you a stronger product catalog experience
                  without breaking the clean white and blue site direction.
                </p>
              </div>

              <Link
                to="/cart"
                className="inline-flex items-center gap-2 self-start rounded-full bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-100 lg:self-auto"
              >
                View cart
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
