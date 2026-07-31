import { getAdminAnalytics } from "../models/analyticsModel.js";

// ==========================================
// Admin Analytics Dashboard
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