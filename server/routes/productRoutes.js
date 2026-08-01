import express from "express";

import protect from "../middleware/authMiddleware.js";
import verifyAdmin from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createProduct,
  fetchProducts,
  fetchProduct,
  editProduct,
  removeProduct,
  fetchSellerProducts,
  fetchAdminProducts,
  removeAdminProduct,
} from "../controllers/productController.js";

const router = express.Router();

// ======================================
// Public Routes
// ======================================

// Get All Products
router.get("/", fetchProducts);

// Get Single Product
router.get("/:id", fetchProduct);

// ======================================
// Seller Routes
// ======================================

// Create Product
router.post(
  "/",
  protect,
  upload.single("image"),
  createProduct
);

// Get Seller Products
router.get(
  "/my-products",
  protect,
  fetchSellerProducts
);

// Update Product
router.put(
  "/:id",
  protect,
  upload.single("image"),
  editProduct
);

// Delete Product
router.delete(
  "/:id",
  protect,
  removeProduct
);

// ======================================
// Admin Routes
// ======================================

// Get All Products
router.get(
  "/admin/all",
  protect,
  verifyAdmin,
  fetchAdminProducts
);

// Delete Any Product
router.delete(
  "/admin/:id",
  protect,
 verifyAdmin,
  removeAdminProduct
);

export default router;