import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ImageOff, Pencil, Plus, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  deleteHeroSlide,
  listHeroSlides,
  updateHeroSlide,
} from "../../api/heroSlides";
import PageLoader from "../../components/PageLoader";
import Spinner from "../../components/Spinner";

export default function AdminHeroSlides() {
  const { token } = useAuth();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => {
    listHeroSlides()
      .then(setSlides)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleActive = async (slide) => {
    setTogglingId(slide._id);
    try {
      const updated = await updateHeroSlide(
        slide._id,
        { active: !slide.active },
        token
      );
      setSlides((current) =>
        current.map((item) => (item._id === updated._id ? updated : item))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteHeroSlide(id, token);
      setSlides((current) => current.filter((slide) => slide._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
      setPendingDeleteId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
            Hero Section
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {slides.length} slide{slides.length === 1 ? "" : "s"} &middot; only active ones rotate on the homepage
          </p>
        </div>

        <Link
          to="/admin/hero-slides/new"
          className="inline-flex items-center gap-2 self-start rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add slide
        </Link>
      </div>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <PageLoader className="mt-8" />
      ) : slides.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-blue-200 bg-white px-6 py-14 text-center">
          <div className="text-lg font-semibold text-slate-900">No hero slides yet</div>
          <p className="mt-2 text-sm text-slate-600">
            Add your first slide to feature it at the top of the homepage.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {slides.map((slide) => (
            <div
              key={slide._id}
              className="flex flex-col gap-4 rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center"
            >
              {slide.image ? (
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-24 w-full flex-none rounded-2xl object-cover sm:w-40"
                />
              ) : (
                <div className="flex h-24 w-full flex-none items-center justify-center rounded-2xl bg-slate-100 text-slate-400 sm:w-40">
                  <ImageOff className="h-6 w-6" />
                </div>
              )}

              <div className="flex-1">
                {slide.eyebrow && (
                  <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                    {slide.eyebrow}
                  </div>
                )}
                <div className="mt-1 text-base font-semibold text-slate-900">
                  {slide.title}
                </div>
                {slide.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {slide.description}
                  </p>
                )}
                {!slide.image && (
                  <p className="mt-1 text-xs font-medium text-amber-600">
                    No image set yet
                  </p>
                )}
              </div>

              <div className="flex flex-none items-center gap-2 sm:flex-col sm:items-end sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleActive(slide)}
                  disabled={togglingId === slide._id}
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition disabled:opacity-60 ${
                    slide.active
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                  aria-label={slide.active ? "Deactivate slide" : "Activate slide"}
                >
                  {togglingId === slide._id ? (
                    <Spinner className="h-3.5 w-3.5" />
                  ) : (
                    <span
                      className={`relative inline-flex h-4 w-7 flex-none items-center rounded-full transition ${
                        slide.active ? "bg-emerald-500" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 flex-none rounded-full bg-white transition ${
                          slide.active ? "translate-x-3.5" : "translate-x-0.5"
                        }`}
                      />
                    </span>
                  )}
                  {slide.active ? "Active" : "Inactive"}
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/hero-slides/${slide._id}/edit`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
                    aria-label={`Edit ${slide.title}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>

                  {pendingDeleteId === slide._id ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDelete(slide._id)}
                        disabled={deletingId === slide._id}
                        className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                      >
                        {deletingId === slide._id && <Spinner className="h-3.5 w-3.5" />}
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
                      onClick={() => setPendingDeleteId(slide._id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-red-200 hover:text-red-600"
                      aria-label={`Delete ${slide.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
