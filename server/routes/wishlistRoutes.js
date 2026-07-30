import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  addWishlist,
  fetchWishlist,
  deleteWishlistItem,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/", protect, addWishlist);

router.get("/", protect, fetchWishlist);

router.delete("/:productId", protect, deleteWishlistItem);

export default router;