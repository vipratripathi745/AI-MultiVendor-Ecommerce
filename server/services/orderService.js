import pool from "../config/db.js";

import {
  createOrder,
  createOrderItem,
  getOrderByIdForTransaction,
  getOrderItemsForTransaction,
  restoreProductStock,
  cancelOrderTransaction,
  getOrderByIdForAdmin,
  updateOrderStatus,
} from "../models/orderModel.js";

import {
  getCartByUser,
  clearCart,
} from "../models/cartModel.js";

import {
  lockProductForUpdate,
  decreaseProductStock,
} from "../models/productModel.js";

// ========================================
// Checkout Service
// ========================================
export const checkoutService = async (
  user_id,
  payment_method,
  shipping_address
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const cart = await getCartByUser(user_id);

    if (cart.length === 0) {
      throw new Error("Cart is empty.");
    }

    let total = 0;

    // Lock Products
    for (const item of cart) {
      const product =
        await lockProductForUpdate(
          client,
          item.product_id
        );

      if (!product) {
        throw new Error(
          `${item.name} not found.`
        );
      }

      if (product.stock < item.quantity) {
        throw new Error(
          `${product.name} is out of stock.`
        );
      }

      total += Number(item.subtotal);
    }

    // Create Order
    const order = await createOrder(
      client,
      user_id,
      total,
      payment_method,
      shipping_address
    );

    // Create Items + Reduce Stock
    for (const item of cart) {
      await createOrderItem(
        client,
        order.id,
        item.product_id,
        item.quantity,
        item.price
      );

      await decreaseProductStock(
        client,
        item.product_id,
        item.quantity
      );
    }

    await clearCart(user_id);

    await client.query("COMMIT");

    return order;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// ========================================
// Cancel Order
// ========================================
export const cancelOrderService =
  async (order_id, user_id) => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const order =
        await getOrderByIdForTransaction(
          client,
          order_id,
          user_id
        );

      if (!order) {
        throw new Error(
          "Order not found."
        );
      }

      if (order.status !== "Pending") {
        throw new Error(
          "Only pending orders can be cancelled."
        );
      }

      const items =
        await getOrderItemsForTransaction(
          client,
          order_id
        );

      for (const item of items) {
        await restoreProductStock(
          client,
          item.product_id,
          item.quantity
        );
      }

      const cancelledOrder =
        await cancelOrderTransaction(
          client,
          order_id
        );

      await client.query("COMMIT");

      return cancelledOrder;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  };

// ========================================
// Admin Update Status
// ========================================
export const updateOrderStatusService =
  async (order_id, status) => {
    const order =
      await getOrderByIdForAdmin(
        order_id
      );

    if (!order) {
      throw new Error(
        "Order not found."
      );
    }

    const allowedStatus = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (
      !allowedStatus.includes(status)
    ) {
      throw new Error(
        "Invalid order status."
      );
    }

    return await updateOrderStatus(
      order_id,
      status
    );
  };