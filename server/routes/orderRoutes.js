import express from "express";

import protect from "../middleware/authMiddleware.js";
import verifyAdmin from "../middleware/adminMiddleware.js";

import {
  checkout,
  getMyOrders,
  getSingleOrder,
  cancelUserOrder,
  adminGetAllOrders,
  adminUpdateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// =======================================
// Customer Routes
// =======================================

// Checkout
router.post("/", protect, checkout);

// Get My Orders
router.get("/", protect, getMyOrders);

// =======================================
// Admin Routes
// =======================================

// Get All Orders
router.get(
  "/admin/all",
  protect,
  verifyAdmin,
  adminGetAllOrders
);

// Update Order Status
router.put(
  "/admin/:id/status",
  protect,
  verifyAdmin,
  adminUpdateOrderStatus
);

// =======================================
// Customer Routes
// =======================================

// Get Single Order
router.get("/:id", protect, getSingleOrder);

// Cancel Order
router.delete("/:id", protect, cancelUserOrder);

export default router;