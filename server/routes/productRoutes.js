import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createProduct,
  fetchProducts,
  fetchProduct,
  editProduct,
  removeProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Create Product
router.post("/", protect, upload.single("image"),createProduct);

// Get All Products
router.get("/", fetchProducts);

// Get Single Product
router.get("/:id", fetchProduct);

// Update Product
router.put("/:id",protect, editProduct);

// Delete Product
router.delete("/:id",protect, removeProduct);

export default router;