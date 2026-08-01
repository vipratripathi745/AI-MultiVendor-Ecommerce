import api from "./api";

// ========================================
// Checkout
// ========================================
export const checkout = async (data) => {
  const response = await api.post(
    "/orders",
    data
  );

  return response.data;
};

// ========================================
// My Orders
// ========================================
export const getMyOrders = async () => {
  const response = await api.get("/orders");

  return response.data;
};

// ========================================
// Order Details
// ========================================
export const getOrderDetails = async (
  id
) => {
  const response = await api.get(
    `/orders/${id}`
  );

  return response.data;
};

// ========================================
// Cancel Order
// ========================================
export const cancelOrder = async (id) => {
  const response = await api.delete(
    `/orders/${id}`
  );

  return response.data;
};

// ========================================
// Admin - Get All Orders
// ========================================
export const getAllOrders = async () => {
  const response = await api.get(
    "/orders/admin/all"
  );

  return response.data;
};

// ========================================
// Admin - Update Order Status
// ========================================
export const updateOrderStatus = async (
  id,
  status
) => {
  const response = await api.put(
    `/orders/admin/${id}/status`,
    { status }
  );

  return response.data;
};