import {
  getAdminAnalytics,
  getSellerAnalytics,
} from "../models/analyticsModel.js";

// ==========================================
// Seller Analytics
// ==========================================
export const fetchSellerAnalytics = async (
  req,
  res
) => {
  try {
    const analytics = await getSellerAnalytics(
      req.user.id
    );

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch seller analytics.",
    });
  }
};

// ==========================================
// Admin Analytics
// ==========================================
export const fetchAdminAnalytics = async (
  req,
  res
) => {
  try {
    const analytics =
      await getAdminAnalytics();

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch analytics.",
    });
  }
};