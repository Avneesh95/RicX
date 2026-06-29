import api from "./axios";

// GET ALL
export const getProducts = () => {
  return api.get("/products");
};

// DELETE PRODUCT
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};

// UPDATE PRODUCT
export const updateProduct = (id, data) => {
  return api.put(`/products/${id}`, data);
};