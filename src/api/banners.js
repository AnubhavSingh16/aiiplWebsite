import { apiRequest } from "./client";

export function listBanners() {
  return apiRequest("/api/banners");
}

export function getBanner(id) {
  return apiRequest(`/api/banners/${id}`);
}

export function createBanner(banner, token) {
  return apiRequest("/api/banners", { method: "POST", body: banner, token });
}

export function updateBanner(id, updates, token) {
  return apiRequest(`/api/banners/${id}`, {
    method: "PUT",
    body: updates,
    token,
  });
}

export function deleteBanner(id, token) {
  return apiRequest(`/api/banners/${id}`, { method: "DELETE", token });
}
