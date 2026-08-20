import { apiRequest } from "./client";

export function listCategories() {
  return apiRequest("/api/categories");
}

export function createCategory(name, token) {
  return apiRequest("/api/categories", { method: "POST", body: { name }, token });
}

export function deleteCategory(id, token) {
  return apiRequest(`/api/categories/${id}`, { method: "DELETE", token });
}
