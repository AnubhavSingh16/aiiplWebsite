import { apiRequest } from "./client";

export function listHeroSlides() {
  return apiRequest("/api/hero-slides");
}

export function getHeroSlide(id) {
  return apiRequest(`/api/hero-slides/${id}`);
}

export function createHeroSlide(slide, token) {
  return apiRequest("/api/hero-slides", { method: "POST", body: slide, token });
}

export function updateHeroSlide(id, updates, token) {
  return apiRequest(`/api/hero-slides/${id}`, {
    method: "PUT",
    body: updates,
    token,
  });
}

export function deleteHeroSlide(id, token) {
  return apiRequest(`/api/hero-slides/${id}`, { method: "DELETE", token });
}
