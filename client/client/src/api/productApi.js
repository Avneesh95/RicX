import api from "./axios";

// GET ALL PRODUCTS
export const getProducts = async () => {
  return await api.get("/product");
};

// DELETE PRODUCT (ADMIN)
export const deleteProduct = async (id, token) => {
  return await api.delete(`/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};