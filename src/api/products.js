import { apiRequest } from "./client";

// The storefront (Cart, BestSellingProducts, ProductDetails) was built keying
// off a plain `id` field. Mongo returns `_id` — alias it so those consumers
// don't need to change, while admin code can still use `_id` directly.
const withId = (product) => ({ ...product, id: product._id });

export async function listProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const products = await apiRequest(`/api/products${query ? `?${query}` : ""}`);
  return products.map(withId);
}

export async function getProduct(id) {
  const product = await apiRequest(`/api/products/${id}`);
  return withId(product);
}

export function createProduct(product, token) {
  return apiRequest("/api/products", { method: "POST", body: product, token });
}

export function updateProduct(id, updates, token) {
  return apiRequest(`/api/products/${id}`, {
    method: "PUT",
    body: updates,
    token,
  });
}

export function deleteProduct(id, token) {
  return apiRequest(`/api/products/${id}`, { method: "DELETE", token });
}
