import {
  addToCart,
  getCartByUser,
  updateCartQuantity,
  removeCartItem,
  clearCart,
} from "../models/cartModel.js";

import { getProductById } from "../models/productModel.js";

// ===============================
// Add Item to Cart
// ===============================
export const createCartItem = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id;

    if (!product_id || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    const product = await getProductById(product_id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    const cart = await addToCart(user_id, product_id, quantity);

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Cart
// ===============================
export const fetchCart = async (req, res) => {
  try {
    const user_id = req.user.id;

    const cart = await getCartByUser(user_id);

    let total = 0;

    cart.forEach((item) => {
      total += Number(item.subtotal);
    });

    res.status(200).json({
      success: true,
      count: cart.length,
      total,
      cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Quantity
// ===============================
export const editCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid quantity is required",
      });
    }

    const cart = await updateCartQuantity(
      req.params.id,
      quantity
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Remove Item
// ===============================
export const deleteCartItem = async (req, res) => {
  try {
    const cart = await removeCartItem(req.params.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Clear Cart
// ===============================
export const deleteCart = async (req, res) => {
  try {
    await clearCart(req.user.id);

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};