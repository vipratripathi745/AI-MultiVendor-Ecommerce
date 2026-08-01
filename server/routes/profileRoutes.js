import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getProfile,
  updateProfile,
} from "../controllers/profileController.js";

const router = express.Router();

// ================================
// Profile Routes
// ================================

// Get Logged In User Profile
router.get(
  "/",
  protect,
  getProfile
);

// Update Logged In User Profile
router.put(
  "/",
  protect,
  updateProfile
);

export default router;