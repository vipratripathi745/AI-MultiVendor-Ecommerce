import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createCartItem,
  fetchCart,
  editCartItem,
  deleteCartItem,
  deleteCart,
} from "../controllers/cartController.js";

const router = express.Router();

// Add Item to Cart
router.post("/", protect, createCartItem);

// Get Logged-in User Cart
router.get("/", protect, fetchCart);

// Update Quantity
router.put("/:id", protect, editCartItem);

// Remove Single Item
router.delete("/:id", protect, deleteCartItem);

// Clear Entire Cart
router.delete("/", protect, deleteCart);

export default router;