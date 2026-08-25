import { apiRequest } from "./client";

export function listTypes(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/api/types${query ? `?${query}` : ""}`);
}

export function createType(payload, token) {
  return apiRequest("/api/types", { method: "POST", body: payload, token });
}

export function deleteType(id, token) {
  return apiRequest(`/api/types/${id}`, { method: "DELETE", token });
}
