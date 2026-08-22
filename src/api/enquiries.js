import { apiRequest } from "./client";

export function createEnquiry(enquiry) {
  return apiRequest("/api/enquiries", { method: "POST", body: enquiry });
}

export function listEnquiries(token) {
  return apiRequest("/api/enquiries", { token });
}

export function updateEnquiry(id, updates, token) {
  return apiRequest(`/api/enquiries/${id}`, {
    method: "PATCH",
    body: updates,
    token,
  });
}

export function deleteEnquiry(id, token) {
  return apiRequest(`/api/enquiries/${id}`, { method: "DELETE", token });
}
