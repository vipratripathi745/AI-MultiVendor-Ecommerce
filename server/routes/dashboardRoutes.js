import express from "express";

import protect from "../middleware/authMiddleware.js";
import verifyAdmin from "../middleware/adminMiddleware.js";

import {
  getAdminDashboard,
} from "../controllers/dashboardController.js";

const router = express.Router();

// ===============================
// Admin Dashboard
// GET /api/dashboard
// ===============================
router.get(
  "/",
  protect,
  verifyAdmin,
  getAdminDashboard
);

export default router;