import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createProduct,
  fetchProducts,
  fetchProduct,
  editProduct,
  removeProduct,
  fetchSellerProducts,
} from "../controllers/productController.js";

const router = express.Router();

// Create Product
router.post("/", protect, upload.single("image"),createProduct);

// Get All Products
router.get("/", fetchProducts);

router.get("/my-products", protect, fetchSellerProducts);

// Get Single Product
router.get("/:id", fetchProduct);

// Update Product
router.put(
  "/:id",
  protect,
  upload.single("image"),
  editProduct
);

// Delete Product
router.delete("/:id",protect, removeProduct);

export default router;