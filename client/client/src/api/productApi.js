import api from "./axios";

// =========================
// GET PRODUCTS
// =========================
export const getProducts = (page = 1, limit = 8) => {
  return api.get(`/products?page=${page}&limit=${limit}`);
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
  return api.post("/products/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// =========================
// UPDATE PRODUCT
// =========================
export const updateProduct = (id, formData) => {
  return api.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// =========================
// DELETE PRODUCT
// =========================
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};



export const bulkUploadProducts = (formData) => {
  return api.post("/products/bulk-upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};