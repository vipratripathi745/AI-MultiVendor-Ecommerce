import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createReview,
  editReview,
  removeReview,
  fetchProductReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

// =======================================
// Add Review
// =======================================
router.post("/", protect, createReview);

// =======================================
// Update Review
// =======================================
router.put("/:id", protect, editReview);

// =======================================
// Delete Review
// =======================================
router.delete("/:id", protect, removeReview);

// =======================================
// Get Product Reviews
// =======================================
router.get("/product/:productId", fetchProductReviews);

export default router;