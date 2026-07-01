import api from "./axios";

// Get all products
export const getProducts = () => {
  return api.get("/products");
};

// Get single product
export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

// Update product
export const updateProduct = (id, formData) => {
  return api.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete product
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};