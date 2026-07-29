import express from "express";

import {
  createProduct,
  fetchProducts,
  fetchProduct,
  editProduct,
  removeProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Create Product
router.post("/", createProduct);

// Get All Products
router.get("/", fetchProducts);

// Get Single Product
router.get("/:id", fetchProduct);

// Update Product
router.put("/:id", editProduct);

// Delete Product
router.delete("/:id", removeProduct);

export default router;