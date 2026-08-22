import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Link as LinkIcon, Save, Upload } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { createBanner, getBanner, updateBanner } from "../../api/banners";

const MAX_UPLOAD_BYTES = 3 * 1024 * 1024;

const emptyBanner = {
  label: "",
  title: "",
  description: "",
  image: "",
  active: true,
};

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function AdminBannerForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formValues, setFormValues] = useState(emptyBanner);
  const [imageMode, setImageMode] = useState("url");
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    getBanner(id)
      .then((existing) => setFormValues({ ...emptyBanner, ...existing }))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  const updateField = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      setError("Image is too large — please use a file under 3MB.");
      return;
    }

    setError("");
    const dataUrl = await readFileAsDataUrl(file);
    updateField("image", dataUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formValues.title.trim() || !formValues.image.trim()) {
      setError("Title and image are required.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      if (isEditing) {
        await updateBanner(id, formValues, token);
      } else {
        await createBanner(formValues, token);
      }

      navigate("/admin/banners");
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
        to="/admin/banners"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to banners
      </Link>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
        {isEditing ? "Edit banner" : "Add banner"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-6 rounded-3xl border border-blue-100 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
      >
        <div>
          <label className="text-sm font-medium text-slate-900">
            Label <span className="text-slate-400">(small text shown on top)</span>
          </label>
          <input
            type="text"
            value={formValues.label}
            onChange={(event) => updateField("label", event.target.value)}
            placeholder="Limited Offer"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-900">Title</label>
          <input
            type="text"
            value={formValues.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Save more on premium cloud hosting plans"
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
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-900">Image</label>
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setImageMode("url")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  imageMode === "url"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                <LinkIcon className="h-3.5 w-3.5" />
                Paste URL
              </button>
              <button
                type="button"
                onClick={() => setImageMode("upload")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  imageMode === "upload"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                <Upload className="h-3.5 w-3.5" />
                Upload
              </button>
            </div>
          </div>

          {imageMode === "url" ? (
            <input
              type="url"
              value={formValues.image.startsWith("data:") ? "" : formValues.image}
              onChange={(event) => updateField("image", event.target.value)}
              placeholder="https://..."
              className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-3 w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none file:mr-3 file:rounded-full file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
            />
          )}

          {formValues.image && (
            <img
              src={formValues.image}
              alt="Banner preview"
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
            {submitting ? "Saving..." : isEditing ? "Save changes" : "Create banner"}
          </button>
          <Link
            to="/admin/banners"
            className="rounded-full border border-slate-200 px-6 py-3.5 font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
