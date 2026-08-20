import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Save, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { createCategory, listCategories } from "../../api/categories";
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
  price: "",
  rating: "",
  badge: "",
  description: "",
  image: "",
  featured: false,
  inStock: true,
};

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
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [savingCategory, setSavingCategory] = useState(false);

  useEffect(() => {
    listCategories()
      .then(setCategories)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    getProduct(id)
      .then((existing) => setFormValues({ ...emptyProduct, ...existing }))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  const handleAddCategory = async () => {
    const name = newCategoryName.trim();

    if (!name) {
      return;
    }

    setSavingCategory(true);
    try {
      const category = await createCategory(name, token);
      setCategories((current) => [...current, category].sort((a, b) => a.name.localeCompare(b.name)));
      updateField("category", category.name);
      setNewCategoryName("");
      setAddingCategory(false);
      setCategoryError("");
    } catch (err) {
      setCategoryError(err.message);
    } finally {
      setSavingCategory(false);
    }
  };

  const updateField = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

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

          <div>
            <label className="text-sm font-medium text-slate-900">Category</label>

            {addingCategory ? (
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  autoFocus
                  value={newCategoryName}
                  onChange={(event) => setNewCategoryName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleAddCategory();
                    }
                  }}
                  placeholder="New category name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  disabled={savingCategory}
                  className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-60"
                  aria-label="Save category"
                >
                  {savingCategory ? <Spinner className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddingCategory(false);
                    setNewCategoryName("");
                    setCategoryError("");
                  }}
                  disabled={savingCategory}
                  className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-200 hover:text-red-600 disabled:opacity-60"
                  aria-label="Cancel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="mt-2 flex items-center gap-2">
                <select
                  value={formValues.category}
                  onChange={(event) => updateField("category", event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setAddingCategory(true)}
                  className="inline-flex h-11 flex-none items-center gap-1.5 whitespace-nowrap rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  New
                </button>
              </div>
            )}

            {categoryError && (
              <p className="mt-2 text-xs font-medium text-red-600">{categoryError}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-900">Type</label>
            <input
              type="text"
              value={formValues.type}
              onChange={(event) => updateField("type", event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-900">Badge</label>
            <input
              type="text"
              value={formValues.badge}
              onChange={(event) => updateField("badge", event.target.value)}
              placeholder="Best Seller, New, Popular..."
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
            />
          </div>

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
