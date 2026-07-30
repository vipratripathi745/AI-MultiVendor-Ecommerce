import {
  getOrdersByUser,
  getOrderById,
  getOrderItems,
  cancelOrder,
} from "../models/orderModel.js";

import { checkoutService } from "../services/orderService.js";

// ========================================
// Checkout
// ========================================
export const checkout = async (req, res) => {
  try {
    const { payment_method, shipping_address } = req.body;

    if (!payment_method || !shipping_address) {
      return res.status(400).json({
        success: false,
        message: "Payment method and shipping address are required",
      });
    }

    const order = await checkoutService(
      req.user.id,
      payment_method,
      shipping_address
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// Get My Orders
// ========================================
export const getMyOrders = async (req, res) => {
  try {
    const orders = await getOrdersByUser(req.user.id);

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// Get Single Order
// ========================================
export const getSingleOrder = async (req, res) => {
  try {
    const order = await getOrderById(
      req.params.id,
      req.user.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const items = await getOrderItems(order.id);

    res.status(200).json({
      success: true,
      order,
      items,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// Cancel Order
// ========================================
export const cancelUserOrder = async (req, res) => {
  try {
    const order = await cancelOrder(
      req.params.id,
      req.user.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};