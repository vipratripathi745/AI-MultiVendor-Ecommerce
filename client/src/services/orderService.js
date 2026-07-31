import api from "./api";

// Checkout
export const checkout = async (data) => {
  const response = await api.post("/orders", data);
  return response.data;
};

// My Orders
export const getMyOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

// Single Order
export const getOrder = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Cancel Order
export const cancelOrder = async (id) => {
  const response = await api.delete(`/orders/${id}`);
  return response.data;
};