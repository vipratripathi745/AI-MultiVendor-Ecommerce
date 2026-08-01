import api from "./api";

// ==========================================
// Admin Analytics
// ==========================================
export const getAdminAnalytics = async () => {
  const response = await api.get(
    "/analytics/admin"
  );

  return response.data;
};

// ==========================================
// Seller Analytics
// ==========================================
export const getSellerAnalytics = async () => {
  const response = await api.get(
    "/analytics/seller"
  );

  return response.data;
};