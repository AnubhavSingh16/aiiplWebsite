import { apiRequest } from "./client";

export function createEnquiry(enquiry) {
  return apiRequest("/api/enquiries", { method: "POST", body: enquiry });
}

export function listEnquiries(token) {
  return apiRequest("/api/enquiries", { token });
}
