import uploadToCloudinary from "../utils/uploadToCloudinary.js";

import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../models/productModel.js";

// ============================
// Add Product
// ============================
export const createProduct = async (req, res) => {
  try {


    const {
      name,
      description,
      price,
      stock,
      category,
      brand,
    } = req.body;

    const seller_id = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    const imageUpload = await uploadToCloudinary(req.file.buffer);

    const product = await addProduct(
      seller_id,
      name,
      description,
      price,
      stock,
      category,
      imageUpload.secure_url,
      brand
    );

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get All Products
// ============================
export const fetchProducts = async (req, res) => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// ============================
// Get Product By ID
// ============================
export const fetchProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

// ============================
// Update Product
// ============================
export const editProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      image,
      brand,
    } = req.body;

    const product = await updateProduct(
      req.params.id,
      name,
      description,
      price,
      stock,
      category,
      image,
      brand
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// ============================
// Delete Product
// ============================
export const removeProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await deleteProduct(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};