import {
  getUserById,
  updateUserProfile,
} from "../models/userModel.js";

// ========================================
// Get Logged In User Profile
// ========================================

export const getProfile = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

// ========================================
// Update Logged In User Profile
// ========================================

export const updateProfile = async (req, res) => {
  try {

    const { name, phone } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const updatedUser =
      await updateUserProfile(
        req.user.id,
        name,
        phone
      );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });

  }
};