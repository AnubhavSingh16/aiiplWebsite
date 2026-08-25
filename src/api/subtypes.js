import { apiRequest } from "./client";

export function listSubtypes(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/api/subtypes${query ? `?${query}` : ""}`);
}

export function createSubtype(payload, token) {
  return apiRequest("/api/subtypes", { method: "POST", body: payload, token });
}

export function deleteSubtype(id, token) {
  return apiRequest(`/api/subtypes/${id}`, { method: "DELETE", token });
}
