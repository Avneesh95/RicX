import api from "./axios";

// GET ALL PRODUCTS
export const getProducts = async () => {
  return await api.get("/products");
};

// DELETE PRODUCT (ADMIN)
export const deleteProduct = async (id, token) => {
  return await api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};