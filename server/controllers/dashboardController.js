import { getDashboardStats } from "../models/dashboardModel.js";

// =======================================
// Admin Dashboard
// =======================================
export const getAdminDashboard = async (req, res) => {
  try {
    const stats = await getDashboardStats();

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics.",
    });
  }
};