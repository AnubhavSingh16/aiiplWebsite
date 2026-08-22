import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Check,
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  deleteEnquiry,
  listEnquiries,
  updateEnquiry,
} from "../../api/enquiries";
import PageLoader from "../../components/PageLoader";
import Spinner from "../../components/Spinner";

const TABS = [
  { key: "contact", label: "Contact Messages", icon: MessageSquare },
  { key: "cart", label: "Product Enquiries", icon: Package },
];

const toDateInputValue = (date) => new Date(date).toISOString().slice(0, 10);

export default function AdminEnquiries() {
  const { token } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("contact");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [noteDrafts, setNoteDrafts] = useState({});
  const [savingNoteId, setSavingNoteId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    listEnquiries(token)
      .then((data) => {
        setEnquiries(data);
        setNoteDrafts(
          Object.fromEntries(data.map((enquiry) => [enquiry._id, enquiry.note || ""]))
        );
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const contactMessages = enquiries.filter((enquiry) => enquiry.source !== "cart");
  const productEnquiries = enquiries.filter((enquiry) => enquiry.source === "cart");
  const tabItems = activeTab === "contact" ? contactMessages : productEnquiries;

  const visible = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return tabItems.filter((enquiry) => {
      const matchesSearch =
        !normalizedSearch ||
        enquiry.name.toLowerCase().includes(normalizedSearch) ||
        enquiry.phone?.toLowerCase().includes(normalizedSearch);

      const enquiryDate = toDateInputValue(enquiry.createdAt);
      const matchesFrom = !dateFrom || enquiryDate >= dateFrom;
      const matchesTo = !dateTo || enquiryDate <= dateTo;

      return matchesSearch && matchesFrom && matchesTo;
    });
  }, [tabItems, searchTerm, dateFrom, dateTo]);

  const hasActiveFilters = searchTerm || dateFrom || dateTo;

  const resetFilters = () => {
    setSearchTerm("");
    setDateFrom("");
    setDateTo("");
  };

  const handleToggleFulfilled = async (enquiry) => {
    setTogglingId(enquiry._id);
    try {
      const updated = await updateEnquiry(
        enquiry._id,
        { fulfilled: !enquiry.fulfilled },
        token
      );
      setEnquiries((current) =>
        current.map((item) => (item._id === updated._id ? updated : item))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setTogglingId(null);
    }
  };

  const handleSaveNote = async (enquiry) => {
    setSavingNoteId(enquiry._id);
    try {
      const updated = await updateEnquiry(
        enquiry._id,
        { note: noteDrafts[enquiry._id] ?? "" },
        token
      );
      setEnquiries((current) =>
        current.map((item) => (item._id === updated._id ? updated : item))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingNoteId(null);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteEnquiry(id, token);
      setEnquiries((current) => current.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
      setPendingDeleteId(null);
    }
  };

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

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-blue-300">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name or phone number..."
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <Calendar className="h-4 w-4 flex-none text-slate-400" />
          <input
            type="date"
            value={dateFrom}
            onChange={(event) => setDateFrom(event.target.value)}
            className="bg-transparent text-sm text-slate-700 outline-none"
          />
          <span className="text-sm text-slate-400">to</span>
          <input
            type="date"
            value={dateTo}
            onChange={(event) => setDateTo(event.target.value)}
            className="bg-transparent text-sm text-slate-700 outline-none"
          />
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
          >
            <X className="h-4 w-4" />
            Reset
          </button>
        )}
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
            {tabItems.length === 0
              ? activeTab === "contact"
                ? "No contact messages yet"
                : "No product enquiries yet"
              : "No enquiries match your filters"}
          </div>
          <p className="mt-2 text-sm text-slate-600">
            {tabItems.length === 0
              ? activeTab === "contact"
                ? "Submissions from the storefront contact form will show up here."
                : "Enquiries placed from the cart's \"Request enquiry\" flow will show up here."
              : "Try a different search term or date range."}
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {visible.map((enquiry) => {
            const isCart = enquiry.source === "cart";

            return (
              <div
                key={enquiry._id}
                className={`rounded-3xl border bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)] ${
                  isCart ? "border-violet-100" : "border-blue-100"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-base font-semibold text-slate-900">
                        {enquiry.name}
                      </div>
                      {enquiry.fulfilled && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />
                          Fulfilled
                        </span>
                      )}
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
                      {isCart && enquiry.address && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {enquiry.address}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isCart && (
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {enquiry.topic}
                      </span>
                    )}
                    <span className="text-xs text-slate-400">
                      {new Date(enquiry.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {!isCart && (
                  <p className="mt-4 text-sm leading-6 text-slate-600">{enquiry.message}</p>
                )}

                {isCart && enquiry.items?.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {enquiry.items.map((item, index) => (
                      <div
                        key={`${enquiry._id}-${index}`}
                        className="flex items-center justify-between rounded-xl bg-violet-50 px-4 py-2.5 text-sm"
                      >
                        <span className="font-medium text-slate-900">{item.name}</span>
                        <div className="flex items-center gap-3 text-slate-500">
                          {item.category && <span>{item.category}</span>}
                          <span className="font-semibold text-violet-700">
                            x{item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Internal note
                  </label>
                  <div className="mt-2 flex items-start gap-2">
                    <textarea
                      rows={2}
                      value={noteDrafts[enquiry._id] ?? ""}
                      onChange={(event) =>
                        setNoteDrafts((current) => ({
                          ...current,
                          [enquiry._id]: event.target.value,
                        }))
                      }
                      placeholder="Add a note for your team..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-300 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveNote(enquiry)}
                      disabled={
                        savingNoteId === enquiry._id ||
                        (noteDrafts[enquiry._id] ?? "") === (enquiry.note || "")
                      }
                      className="inline-flex h-[38px] flex-none items-center gap-1.5 rounded-xl bg-slate-900 px-3 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-40"
                    >
                      {savingNoteId === enquiry._id ? (
                        <Spinner className="h-3.5 w-3.5" />
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => handleToggleFulfilled(enquiry)}
                    disabled={togglingId === enquiry._id}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition disabled:opacity-60 ${
                      enquiry.fulfilled
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "border border-slate-200 text-slate-600 hover:border-emerald-200 hover:text-emerald-700"
                    }`}
                  >
                    {togglingId === enquiry._id ? (
                      <Spinner className="h-3.5 w-3.5" />
                    ) : (
                      <Check className="h-3.5 w-3.5" />
                    )}
                    {enquiry.fulfilled ? "Fulfilled" : "Mark fulfilled"}
                  </button>

                  {pendingDeleteId === enquiry._id ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDelete(enquiry._id)}
                        disabled={deletingId === enquiry._id}
                        className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                      >
                        {deletingId === enquiry._id && <Spinner className="h-3.5 w-3.5" />}
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteId(null)}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPendingDeleteId(enquiry._id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-red-200 hover:text-red-600"
                      aria-label={`Delete enquiry from ${enquiry.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
