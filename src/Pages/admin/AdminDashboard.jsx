import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Package, Sparkles, XCircle } from "lucide-react";
import { listProducts } from "../../api/products";
import PageLoader from "../../components/PageLoader";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    listProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      label: "Total products",
      value: products.length,
      icon: Package,
      accent: "text-blue-700 bg-blue-50",
    },
    {
      label: "Featured",
      value: products.filter((product) => product.featured).length,
      icon: Sparkles,
      accent: "text-amber-600 bg-amber-50",
    },
    {
      label: "In stock",
      value: products.filter((product) => product.inStock).length,
      icon: CheckCircle2,
      accent: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Out of stock",
      value: products.filter((product) => !product.inStock).length,
      icon: XCircle,
      accent: "text-slate-500 bg-slate-100",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
        Dashboard
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Overview of the products currently shown on the storefront.
      </p>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <PageLoader className="mt-8" />
      ) : (
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-[24px] border border-blue-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${stat.accent}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-3xl font-semibold text-slate-950">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
            </div>
          );
        })}
      </div>
      )}

      <Link
        to="/admin/products"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-950 via-slate-800 to-sky-700 px-6 py-3.5 font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)] transition hover:scale-[1.01]"
      >
        Manage products
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
