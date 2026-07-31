import api from "./api";

// ==========================================
// Get Admin Analytics
// ==========================================
export const getAdminAnalytics = async () => {
  const response = await api.get(
    "/analytics/admin"
  );

  return response.data;
};