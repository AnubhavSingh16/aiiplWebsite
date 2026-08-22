import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Inbox,
  MessageSquare,
  Package,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { listProducts } from "../../api/products";
import { listEnquiries } from "../../api/enquiries";
import PageLoader from "../../components/PageLoader";

function StatTile({ label, value, icon, accent }) {
  const Icon = icon;

  return (
    <div className="group rounded-3xl border border-blue-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(15,23,42,0.08)]">
      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 text-3xl font-semibold text-slate-950">{value}</div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  );
}

function StatSection({ title, viewAllLink, stats }) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h2>
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition hover:text-blue-800"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}

export default function AdminDashboard() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([listProducts(), listEnquiries(token)])
      .then(([productData, enquiryData]) => {
        setProducts(productData);
        setEnquiries(enquiryData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const contactEnquiries = enquiries.filter((enquiry) => enquiry.source !== "cart");
  const productEnquiries = enquiries.filter((enquiry) => enquiry.source === "cart");
  const fulfilledEnquiries = enquiries.filter((enquiry) => enquiry.fulfilled);

  // Color language is fixed across the admin panel: blue = neutral total,
  // amber = highlight flag (matches the star-rating amber used site-wide),
  // violet = product-enquiry identity (matches the Enquiries page cards),
  // emerald = reserved for "good / complete" status only, slate = inactive.
  const productStats = [
    { label: "Total products", value: products.length, icon: Package, accent: "text-blue-700 bg-blue-50" },
    { label: "Featured", value: products.filter((p) => p.featured).length, icon: Sparkles, accent: "text-amber-600 bg-amber-50" },
    { label: "In stock", value: products.filter((p) => p.inStock).length, icon: CheckCircle2, accent: "text-emerald-600 bg-emerald-50" },
    { label: "Out of stock", value: products.filter((p) => !p.inStock).length, icon: XCircle, accent: "text-slate-500 bg-slate-100" },
  ];

  const enquiryStats = [
    { label: "Total enquiries", value: enquiries.length, icon: Inbox, accent: "text-indigo-600 bg-indigo-50" },
    { label: "Contact messages", value: contactEnquiries.length, icon: MessageSquare, accent: "text-blue-700 bg-blue-50" },
    { label: "Product enquiries", value: productEnquiries.length, icon: Package, accent: "text-violet-600 bg-violet-50" },
    { label: "Fulfilled", value: fulfilledEnquiries.length, icon: CheckCircle2, accent: "text-emerald-600 bg-emerald-50" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
        Dashboard
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Overview of your products and incoming enquiries.
      </p>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <PageLoader className="mt-8" />
      ) : (
        <>
          <StatSection title="Enquiries" viewAllLink="/admin/enquiries" stats={enquiryStats} />
          <StatSection title="Catalog" viewAllLink="/admin/products" stats={productStats} />

        </>
      )}

      {/* <Link
        to="/admin/products"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-950 via-slate-800 to-sky-700 px-6 py-3.5 font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)] transition hover:scale-[1.01]"
      >
        Manage products
        <ArrowRight className="h-4 w-4" />
      </Link> */}
    </div>
  );
}
