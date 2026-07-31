import express from "express";

import protect from "../middleware/authMiddleware.js";
import verifyAdmin from "../middleware/adminMiddleware.js";

import {
  fetchAdminAnalytics,
} from "../controllers/analyticsController.js";

const router = express.Router();

// ==========================================
// Admin Analytics
// GET /api/analytics/admin
// ==========================================
router.get(
  "/admin",
  protect,
  verifyAdmin,
  fetchAdminAnalytics
);

export default router;