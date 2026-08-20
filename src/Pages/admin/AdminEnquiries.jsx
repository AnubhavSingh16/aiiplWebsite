import { useEffect, useState } from "react";
import { Mail, MapPin, MessageSquare, Package, Phone } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { listEnquiries } from "../../api/enquiries";
import PageLoader from "../../components/PageLoader";

const TABS = [
  { key: "contact", label: "Contact Messages", icon: MessageSquare },
  { key: "cart", label: "Product Enquiries", icon: Package },
];

export default function AdminEnquiries() {
  const { token } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("contact");

  useEffect(() => {
    listEnquiries(token)
      .then(setEnquiries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const contactMessages = enquiries.filter((enquiry) => enquiry.source !== "cart");
  const productEnquiries = enquiries.filter((enquiry) => enquiry.source === "cart");
  const visible = activeTab === "contact" ? contactMessages : productEnquiries;

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
        Enquiries
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Messages from the contact form and product enquiries placed from the cart.
      </p>

      <div className="mt-6 inline-flex rounded-full border border-blue-100 bg-white p-1.5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const count = tab.key === "contact" ? contactMessages.length : productEnquiries.length;
          const active = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                active
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "text-slate-600 hover:text-blue-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  active ? "bg-white/20" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <PageLoader />
      ) : visible.length === 0 ? (
        <div className="mt-6 rounded-[24px] border border-dashed border-blue-200 bg-white px-6 py-14 text-center">
          <div className="text-lg font-semibold text-slate-900">
            {activeTab === "contact" ? "No contact messages yet" : "No product enquiries yet"}
          </div>
          <p className="mt-2 text-sm text-slate-600">
            {activeTab === "contact"
              ? "Submissions from the storefront contact form will show up here."
              : "Enquiries placed from the cart's \"Request enquiry\" flow will show up here."}
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {visible.map((enquiry) =>
            activeTab === "contact" ? (
              <div
                key={enquiry._id}
                className="rounded-[24px] border border-blue-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold text-slate-900">
                      {enquiry.name}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5" />
                        {enquiry.email}
                      </span>
                      {enquiry.phone && (
                        <span className="inline-flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          {enquiry.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {enquiry.topic}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(enquiry.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">{enquiry.message}</p>
              </div>
            ) : (
              <div
                key={enquiry._id}
                className="rounded-[24px] border border-emerald-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold text-slate-900">
                      {enquiry.name}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5" />
                        {enquiry.email}
                      </span>
                      {enquiry.phone && (
                        <span className="inline-flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          {enquiry.phone}
                        </span>
                      )}
                      {enquiry.address && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {enquiry.address}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-xs text-slate-400">
                    {new Date(enquiry.createdAt).toLocaleString()}
                  </span>
                </div>

                {enquiry.items?.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {enquiry.items.map((item, index) => (
                      <div
                        key={`${enquiry._id}-${index}`}
                        className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-2.5 text-sm"
                      >
                        <span className="font-medium text-slate-900">{item.name}</span>
                        <div className="flex items-center gap-3 text-slate-500">
                          {item.category && <span>{item.category}</span>}
                          <span className="font-semibold text-emerald-700">
                            x{item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
