import uploadToCloudinary from "../utils/uploadToCloudinary.js";

import {
  addProduct,
  getAllProducts,
  getAllProductsForAdmin,
  getSellerProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteProductByAdmin,
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

    const imageUpload = await uploadToCloudinary(
      req.file.buffer
    );

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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search = req.query.search || "";
    const category = req.query.category || "";
    const brand = req.query.brand || "";
    const minPrice = req.query.minPrice || "";
    const maxPrice = req.query.maxPrice || "";
    const sort = req.query.sort || "newest";

    const { products, totalProducts } =
      await getAllProducts(
        page,
        limit,
        search,
        category,
        brand,
        minPrice,
        maxPrice,
        sort
      );

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(
        totalProducts / limit
      ),
      totalProducts,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// ============================
// Seller Products
// ============================
export const fetchSellerProducts = async (
  req,
  res
) => {
  try {
    const products =
      await getSellerProducts(req.user.id);

    res.status(200).json({
      success: true,
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch seller products",
    });
  }
};

// ============================
// Get Single Product
// ============================
export const fetchProduct = async (
  req,
  res
) => {
  try {
    const product = await getProductById(
      req.params.id
    );

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
    });
  }
};

// ============================
// Update Product
// ============================
export const editProduct = async (
  req,
  res
) => {
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
      message:
        "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to update product",
    });
  }
};

// ============================
// Delete Product (Seller)
// ============================
export const removeProduct = async (
  req,
  res
) => {
  try {
    const product = await getProductById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await deleteProduct(req.params.id);

    res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to delete product",
    });
  }
};

// ============================
// Admin - Get All Products
// ============================
export const fetchAdminProducts = async (
  req,
  res
) => {
  try {
    const products =
      await getAllProductsForAdmin();

    res.status(200).json({
      success: true,
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch products",
    });
  }
};

// ============================
// Admin - Delete Product
// ============================
export const removeAdminProduct = async (
  req,
  res
) => {
  try {
    const product =
      await deleteProductByAdmin(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to delete product",
    });
  }
};