import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  createHeroSlide,
  getHeroSlide,
  updateHeroSlide,
} from "../../api/heroSlides";

const emptySlide = {
  eyebrow: "",
  title: "",
  description: "",
  image: "",
  active: true,
};

export default function AdminHeroSlideForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formValues, setFormValues] = useState(emptySlide);
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    getHeroSlide(id)
      .then((existing) => setFormValues({ ...emptySlide, ...existing }))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  const updateField = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formValues.title.trim()) {
      setError("Title is required.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      if (isEditing) {
        await updateHeroSlide(id, formValues, token);
      } else {
        await createHeroSlide(formValues, token);
      }

      navigate("/admin/hero-slides");
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-500">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        to="/admin/hero-slides"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to hero section
      </Link>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
        {isEditing ? "Edit slide" : "Add slide"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-6 rounded-3xl border border-blue-100 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
      >
        <div>
          <label className="text-sm font-medium text-slate-900">
            Eyebrow <span className="text-slate-400">(small text shown above the title)</span>
          </label>
          <input
            type="text"
            value={formValues.eyebrow}
            onChange={(event) => updateField("eyebrow", event.target.value)}
            placeholder="Built for heavy-duty server workloads"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-900">Title</label>
          <input
            type="text"
            value={formValues.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Dedicated servers that stay fast under serious demand."
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-900">Description</label>
          <textarea
            value={formValues.description}
            onChange={(event) => updateField("description", event.target.value)}
            rows={3}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-900">
            Image link <span className="text-slate-400">(paste a URL)</span>
          </label>
          <input
            type="url"
            value={formValues.image}
            onChange={(event) => updateField("image", event.target.value)}
            placeholder="https://..."
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
          />

          {formValues.image && (
            <img
              src={formValues.image}
              alt="Slide preview"
              className="mt-4 h-40 w-full rounded-2xl object-cover"
            />
          )}
        </div>

        <label className="flex items-center gap-3 text-sm font-medium text-slate-900">
          <input
            type="checkbox"
            checked={formValues.active}
            onChange={(event) => updateField("active", event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-300"
          />
          Active (visible on the homepage)
        </label>

        {error && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {submitting ? "Saving..." : isEditing ? "Save changes" : "Create slide"}
          </button>
          <Link
            to="/admin/hero-slides"
            className="rounded-full border border-slate-200 px-6 py-3.5 font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
