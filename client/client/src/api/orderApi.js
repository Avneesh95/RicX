import api from "./axios";

// ==========================
// GET ALL ORDERS (ADMIN)
// ==========================
export const getAllOrders = async () => {
  return await api.get("/order");
};

// ==========================
// GET MY ORDERS
// ==========================
export const getMyOrders = async () => {
  return await api.get("/order/my");
};

// ==========================
// GET SINGLE ORDER
// ==========================
export const getOrderById = async (id) => {
  return await api.get(`/order/${id}`);
};

// ==========================
// UPDATE ORDER STATUS
// ==========================
export const updateOrderStatus = async (id, status) => {
  return await api.put(`/order/${id}`, {
    status,
  });
};

// ==========================
// DELETE ORDER
// ==========================
export const deleteOrder = async (id) => {
  return await api.delete(`/order/${id}`);
};
