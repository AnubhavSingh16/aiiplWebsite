import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Tag,
  Trash2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  createCategory,
  deleteCategory,
  listCategories,
} from "../../api/categories";
import { createType, deleteType, listTypes } from "../../api/types";
import { createSubtype, deleteSubtype, listSubtypes } from "../../api/subtypes";
import PageLoader from "../../components/PageLoader";
import Spinner from "../../components/Spinner";

function InlineAddRow({ placeholder, onAdd, saving }) {
  const [value, setValue] = useState("");

  const submit = async () => {
    const name = value.trim();

    if (!name) {
      return;
    }

    await onAdd(name);
    setValue("");
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            submit();
          }
        }}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-300"
      />
      <button
        type="button"
        onClick={submit}
        disabled={saving}
        className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-60"
        aria-label="Add"
      >
        {saving ? <Spinner className="h-3.5 w-3.5" /> : <Plus className="h-4 w-4" />}
      </button>
    </div>
  );
}

export default function AdminCategories() {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newCategoryName, setNewCategoryName] = useState("");
  const [submittingCategory, setSubmittingCategory] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [savingTypeFor, setSavingTypeFor] = useState(null);
  const [savingSubtypeFor, setSavingSubtypeFor] = useState(null);

  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [expandedTypes, setExpandedTypes] = useState(new Set());

  useEffect(() => {
    Promise.all([listCategories(), listTypes(), listSubtypes()])
      .then(([categoryData, typeData, subtypeData]) => {
        setCategories(categoryData);
        setTypes(typeData);
        setSubtypes(subtypeData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const toggleSet = (setter) => (id) =>
    setter((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const toggleCategory = toggleSet(setExpandedCategories);
  const toggleType = toggleSet(setExpandedTypes);

  const handleAddCategory = async (event) => {
    event.preventDefault();
    const name = newCategoryName.trim();

    if (!name) {
      return;
    }

    setSubmittingCategory(true);
    try {
      const category = await createCategory(name, token);
      setCategories((current) =>
        [...current, category].sort((a, b) => a.name.localeCompare(b.name))
      );
      setNewCategoryName("");
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmittingCategory(false);
    }
  };

  const handleDeleteCategory = async (category) => {
    setDeletingId(category._id);
    try {
      await deleteCategory(category._id, token);
      setCategories((current) => current.filter((c) => c._id !== category._id));
      setTypes((current) => current.filter((t) => t.category !== category.name));
      setSubtypes((current) => current.filter((s) => s.category !== category.name));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddType = async (category, name) => {
    setSavingTypeFor(category._id);
    try {
      const type = await createType({ name, category: category.name }, token);
      setTypes((current) => [...current, type]);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingTypeFor(null);
    }
  };

  const handleDeleteType = async (type) => {
    setDeletingId(type._id);
    try {
      await deleteType(type._id, token);
      setTypes((current) => current.filter((t) => t._id !== type._id));
      setSubtypes((current) =>
        current.filter((s) => !(s.type === type.name && s.category === type.category))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddSubtype = async (type, name) => {
    setSavingSubtypeFor(type._id);
    try {
      const subtype = await createSubtype(
        { name, category: type.category, type: type.name },
        token
      );
      setSubtypes((current) => [...current, subtype]);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingSubtypeFor(null);
    }
  };

  const handleDeleteSubtype = async (subtype) => {
    setDeletingId(subtype._id);
    try {
      await deleteSubtype(subtype._id, token);
      setSubtypes((current) => current.filter((s) => s._id !== subtype._id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
        Categories
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Manage the full category &rarr; type &rarr; subtype (badge) hierarchy used
        across products and the storefront filters.
      </p>

      <form onSubmit={handleAddCategory} className="mt-6 flex max-w-md items-center gap-2">
        <input
          type="text"
          value={newCategoryName}
          onChange={(event) => setNewCategoryName(event.target.value)}
          placeholder="New category name"
          disabled={submittingCategory}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={submittingCategory}
          className="inline-flex h-11 flex-none items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {submittingCategory ? <Spinner className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          Add category
        </button>
      </form>

      {error && (
        <div className="mt-4 max-w-2xl rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <PageLoader />
      ) : categories.length === 0 ? (
        <div className="mt-6 max-w-2xl rounded-3xl border border-dashed border-blue-200 bg-white px-6 py-10 text-center text-sm text-slate-500">
          No categories yet.
        </div>
      ) : (
        <div className="mt-6 max-w-2xl space-y-3">
          {categories.map((category) => {
            const categoryOpen = expandedCategories.has(category._id);
            const categoryTypes = types.filter((t) => t.category === category.name);

            return (
              <div
                key={category._id}
                className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
              >
                <div className="flex items-center justify-between px-5 py-4">
                  <button
                    type="button"
                    onClick={() => toggleCategory(category._id)}
                    className="flex flex-1 items-center gap-3 text-left"
                  >
                    {categoryOpen ? (
                      <ChevronDown className="h-4 w-4 flex-none text-slate-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 flex-none text-slate-400" />
                    )}
                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Tag className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-slate-900">{category.name}</span>
                    <span className="text-xs text-slate-400">
                      {categoryTypes.length} type{categoryTypes.length === 1 ? "" : "s"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(category)}
                    disabled={deletingId === category._id}
                    className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-red-200 hover:text-red-600 disabled:opacity-60"
                    aria-label={`Delete ${category.name}`}
                  >
                    {deletingId === category._id ? (
                      <Spinner className="h-4 w-4" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {categoryOpen && (
                  <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4 pl-14">
                    <div className="space-y-3">
                      {categoryTypes.map((type) => {
                        const typeOpen = expandedTypes.has(type._id);
                        const typeSubtypes = subtypes.filter(
                          (s) => s.category === category.name && s.type === type.name
                        );

                        return (
                          <div
                            key={type._id}
                            className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                          >
                            <div className="flex items-center justify-between px-4 py-3">
                              <button
                                type="button"
                                onClick={() => toggleType(type._id)}
                                className="flex flex-1 items-center gap-2.5 text-left"
                              >
                                {typeOpen ? (
                                  <ChevronDown className="h-3.5 w-3.5 flex-none text-slate-400" />
                                ) : (
                                  <ChevronRight className="h-3.5 w-3.5 flex-none text-slate-400" />
                                )}
                                <span className="text-sm font-medium text-slate-800">
                                  {type.name}
                                </span>
                                <span className="text-xs text-slate-400">
                                  {typeSubtypes.length} subtype{typeSubtypes.length === 1 ? "" : "s"}
                                </span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteType(type)}
                                disabled={deletingId === type._id}
                                className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-red-200 hover:text-red-600 disabled:opacity-60"
                                aria-label={`Delete ${type.name}`}
                              >
                                {deletingId === type._id ? (
                                  <Spinner className="h-3.5 w-3.5" />
                                ) : (
                                  <Trash2 className="h-3.5 w-3.5" />
                                )}
                              </button>
                            </div>

                            {typeOpen && (
                              <div className="space-y-2 border-t border-slate-100 bg-slate-50/60 px-4 py-3 pl-8">
                                {typeSubtypes.map((subtype) => (
                                  <div
                                    key={subtype._id}
                                    className="flex items-center justify-between rounded-lg bg-white px-3 py-2"
                                  >
                                    <span className="text-sm text-slate-700">{subtype.name}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteSubtype(subtype)}
                                      disabled={deletingId === subtype._id}
                                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-red-200 hover:text-red-600 disabled:opacity-60"
                                      aria-label={`Delete ${subtype.name}`}
                                    >
                                      {deletingId === subtype._id ? (
                                        <Spinner className="h-3.5 w-3.5" />
                                      ) : (
                                        <Trash2 className="h-3.5 w-3.5" />
                                      )}
                                    </button>
                                  </div>
                                ))}

                                <InlineAddRow
                                  placeholder="New subtype (badge) name"
                                  saving={savingSubtypeFor === type._id}
                                  onAdd={(name) => handleAddSubtype(type, name)}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}

                      <InlineAddRow
                        placeholder="New type name"
                        saving={savingTypeFor === category._id}
                        onAdd={(name) => handleAddType(category, name)}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
