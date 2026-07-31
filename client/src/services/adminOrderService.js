import api from "./api";

// =======================================
// Get All Orders
// =======================================
export const getAdminOrders = async () => {
  const response = await api.get("/orders/admin/all");

  return response.data;
};

// =======================================
// Update Order Status
// =======================================
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