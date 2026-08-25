import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Save, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { createCategory, listCategories } from "../../api/categories";
import { createType, listTypes } from "../../api/types";
import { createSubtype, listSubtypes } from "../../api/subtypes";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../../api/products";
import Spinner from "../../components/Spinner";
import PageLoader from "../../components/PageLoader";

const emptyProduct = {
  name: "",
  category: "",
  type: "",
  badge: "",
  price: "",
  rating: "",
  description: "",
  points: [],
  image: "",
  featured: false,
  inStock: true,
};

// Shared UI for the category -> type -> subtype(badge) chain: a dropdown of
// existing names plus an inline "+ New" to add one without leaving the form.
function TaxonomySelect({ label, value, onChange, options, onAddNew, disabled, disabledHint }) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);
  const [localError, setLocalError] = useState("");

  const cancelAdd = () => {
    setAdding(false);
    setNewName("");
    setLocalError("");
  };

  const handleSave = async () => {
    const name = newName.trim();

    if (!name) {
      return;
    }

    setSaving(true);
    try {
      await onAddNew(name);
      setNewName("");
      setAdding(false);
      setLocalError("");
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <label className="text-sm font-medium text-slate-900">{label}</label>

      {adding ? (
        <div className="mt-2 flex items-center gap-2">
          <input
            type="text"
            autoFocus
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSave();
              }
            }}
            placeholder={`New ${label.toLowerCase()} name`}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
          />
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-60"
            aria-label={`Save ${label.toLowerCase()}`}
          >
            {saving ? <Spinner className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={cancelAdd}
            disabled={saving}
            className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-200 hover:text-red-600 disabled:opacity-60"
            aria-label="Cancel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="mt-2 flex items-center gap-2">
          <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
            disabled={disabled}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white disabled:opacity-60"
          >
            <option value="">{disabled ? disabledHint : `Select ${label.toLowerCase()}`}</option>
            {options.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setAdding(true)}
            disabled={disabled}
            className="inline-flex h-11 flex-none items-center gap-1.5 whitespace-nowrap rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-700 disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            New
          </button>
        </div>
      )}

      {localError && <p className="mt-2 text-xs font-medium text-red-600">{localError}</p>}
    </div>
  );
}

export default function AdminProductForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formValues, setFormValues] = useState(emptyProduct);
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [subtypes, setSubtypes] = useState([]);

  useEffect(() => {
    Promise.all([listCategories(), listTypes(), listSubtypes()])
      .then(([categoryData, typeData, subtypeData]) => {
        setCategories(categoryData);
        setTypes(typeData);
        setSubtypes(subtypeData);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    getProduct(id)
      .then((existing) =>
        setFormValues({ ...emptyProduct, ...existing, points: existing.points || [] })
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  const updateField = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const typeOptions = types
    .filter((t) => t.category === formValues.category)
    .map((t) => t.name);

  const subtypeOptions = subtypes
    .filter((s) => s.category === formValues.category && s.type === formValues.type)
    .map((s) => s.name);

  const handleCategoryChange = (name) => {
    setFormValues((current) => ({ ...current, category: name, type: "", badge: "" }));
  };

  const handleTypeChange = (name) => {
    setFormValues((current) => ({ ...current, type: name, badge: "" }));
  };

  const handleAddCategory = async (name) => {
    const category = await createCategory(name, token);
    setCategories((current) => [...current, category].sort((a, b) => a.name.localeCompare(b.name)));
    handleCategoryChange(category.name);
  };

  const handleAddType = async (name) => {
    const type = await createType({ name, category: formValues.category }, token);
    setTypes((current) => [...current, type]);
    handleTypeChange(type.name);
  };

  const handleAddSubtype = async (name) => {
    const subtype = await createSubtype(
      { name, category: formValues.category, type: formValues.type },
      token
    );
    setSubtypes((current) => [...current, subtype]);
    updateField("badge", subtype.name);
  };

  const addPoint = () => updateField("points", [...formValues.points, ""]);

  const updatePoint = (index, value) =>
    updateField(
      "points",
      formValues.points.map((point, i) => (i === index ? value : point))
    );

  const removePoint = (index) =>
    updateField("points", formValues.points.filter((_, i) => i !== index));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formValues.name.trim() || !formValues.category.trim()) {
      setError("Name and category are required.");
      return;
    }

    const payload = {
      ...formValues,
      price: Number(formValues.price) || 0,
      rating: Number(formValues.rating) || 0,
      points: formValues.points.map((point) => point.trim()).filter(Boolean),
    };

    setSubmitting(true);
    setError("");

    try {
      if (isEditing) {
        await updateProduct(id, payload, token);
      } else {
        await createProduct(payload, token);
      }

      navigate("/admin/products");
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return <PageLoader label="Loading product..." />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/admin/products"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
        {isEditing ? "Edit product" : "Add product"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-6 rounded-[28px] border border-blue-100 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-900">Name</label>
            <input
              type="text"
              value={formValues.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
            />
          </div>

          <TaxonomySelect
            label="Category"
            value={formValues.category}
            onChange={handleCategoryChange}
            options={categories.map((c) => c.name)}
            onAddNew={handleAddCategory}
          />

          <TaxonomySelect
            label="Type"
            value={formValues.type}
            onChange={handleTypeChange}
            options={typeOptions}
            onAddNew={handleAddType}
            disabled={!formValues.category}
            disabledHint="Select a category first"
          />

          <TaxonomySelect
            label="Subtype (badge)"
            value={formValues.badge}
            onChange={(name) => updateField("badge", name)}
            options={subtypeOptions}
            onAddNew={handleAddSubtype}
            disabled={!formValues.type}
            disabledHint="Select a type first"
          />

          <div>
            <label className="text-sm font-medium text-slate-900">Price ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formValues.price}
              onChange={(event) => updateField("price", event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-900">Rating</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formValues.rating}
              onChange={(event) => updateField("rating", event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-900">Image URL</label>
          <input
            type="url"
            value={formValues.image}
            onChange={(event) => updateField("image", event.target.value)}
            placeholder="https://..."
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-900">Description</label>
          <textarea
            value={formValues.description}
            onChange={(event) => updateField("description", event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-900">
              Highlights <span className="text-slate-400">(shown as bullet points on the product page)</span>
            </label>
            <button
              type="button"
              onClick={addPoint}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
            >
              <Plus className="h-3.5 w-3.5" />
              Add point
            </button>
          </div>

          {formValues.points.length === 0 ? (
            <p className="mt-3 text-sm text-slate-400">No highlights added yet.</p>
          ) : (
            <div className="mt-3 space-y-2">
              {formValues.points.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={point}
                    onChange={(event) => updatePoint(index, event.target.value)}
                    placeholder="e.g. Instant provisioning and guided onboarding"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => removePoint(index)}
                    className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-red-200 hover:text-red-600"
                    aria-label="Remove point"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-3 text-sm font-medium text-slate-900">
            <input
              type="checkbox"
              checked={formValues.featured}
              onChange={(event) => updateField("featured", event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-300"
            />
            Featured
          </label>

          <label className="flex items-center gap-3 text-sm font-medium text-slate-900">
            <input
              type="checkbox"
              checked={formValues.inStock}
              onChange={(event) => updateField("inStock", event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-300"
            />
            In stock
          </label>
        </div>

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
            {submitting ? <Spinner /> : <Save className="h-4 w-4" />}
            {submitting ? "Saving..." : isEditing ? "Save changes" : "Create product"}
          </button>
          <Link
            to="/admin/products"
            className="rounded-full border border-slate-200 px-6 py-3.5 font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
