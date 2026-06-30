import api from "./axios";

// =========================
// GET ALL PRODUCTS
// =========================
export const getProducts = () => {
  return api.get("/products");
};

// =========================
// GET SINGLE PRODUCT
// =========================
export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

// =========================
// CREATE PRODUCT
// =========================
export const createProduct = (formData) => {
  const token = localStorage.getItem("token");

  return api.post("/products/add", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// =========================
// UPDATE PRODUCT
// =========================
export const updateProduct = (id, formData) => {
  const token = localStorage.getItem("token");

  return api.put(`/products/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// =========================
// DELETE PRODUCT
// =========================
export const deleteProduct = (id) => {
  const token = localStorage.getItem("token");

  return api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};