import { useEffect, useState } from "react";
import { Plus, Tag, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  createCategory,
  deleteCategory,
  listCategories,
} from "../../api/categories";

export default function AdminCategories() {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    listCategories()
      .then(setCategories)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (event) => {
    event.preventDefault();
    const name = newCategoryName.trim();

    if (!name) {
      return;
    }

    try {
      const category = await createCategory(name, token);
      setCategories((current) =>
        [...current, category].sort((a, b) => a.name.localeCompare(b.name))
      );
      setNewCategoryName("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id, token);
      setCategories((current) => current.filter((category) => category._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
        Categories
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Manage the categories available when adding or editing products.
      </p>

      <form
        onSubmit={handleAdd}
        className="mt-6 flex max-w-md items-center gap-2"
      >
        <input
          type="text"
          value={newCategoryName}
          onChange={(event) => setNewCategoryName(event.target.value)}
          placeholder="New category name"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300"
        />
        <button
          type="submit"
          className="inline-flex h-11 flex-none items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </form>

      {error && (
        <div className="mt-4 max-w-md rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <p className="mt-6 text-sm text-slate-500">Loading...</p>
      ) : (
        <div className="mt-6 max-w-md overflow-hidden rounded-[24px] border border-blue-100 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
          {categories.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-slate-500">
              No categories yet.
            </div>
          ) : (
            categories.map((category) => (
              <div
                key={category._id}
                className="flex items-center justify-between border-b border-slate-50 px-5 py-4 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Tag className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-slate-900">{category.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(category._id)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-red-200 hover:text-red-600"
                  aria-label={`Delete ${category.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
