import express from "express";

import { verifyToken } from "../middleware/authMiddleware.js";

import {
  checkout,
  getMyOrders,
  getSingleOrder,
  cancelUserOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// ===============================
// User Routes
// ===============================

// Checkout
router.post("/", verifyToken, checkout);

// Get My Orders
router.get("/", verifyToken, getMyOrders);

// Get Single Order
router.get("/:id", verifyToken, getSingleOrder);

// Cancel Order
router.delete("/:id", verifyToken, cancelUserOrder);

export default router;