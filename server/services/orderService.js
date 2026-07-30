import pool from "../config/db.js";

import {
  ORDER_STATUS,
  ORDER_TRANSITIONS,
  VALID_ORDER_STATUS,
} from "../constants/orderStatus.js";

import {
  createOrder,
  createOrderItem,
  getOrderByIdForAdmin,
  updateOrderStatus,
  getOrderByIdForTransaction,
  getOrderItemsForTransaction,
  restoreProductStock,
  cancelOrderTransaction,
} from "../models/orderModel.js";

import {
  lockProductForUpdate,
  decreaseProductStock,
} from "../models/productModel.js";

import {
  getCartByUser,
  clearCart,
} from "../models/cartModel.js";

// =======================================
// Checkout Service
// =======================================
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

    // Lock Products & Validate Stock
    for (const item of cart) {
      const product = await lockProductForUpdate(
        client,
        item.product_id
      );

      if (!product) {
        throw new Error(`${item.name} not found.`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`${item.name} is out of stock.`);
      }

      total += Number(item.price) * item.quantity;
    }

    // Create Order
    const order = await createOrder(
      client,
      user_id,
      total,
      payment_method,
      shipping_address
    );

    // Create Order Items
    for (const item of cart) {
      await createOrderItem(
        client,
        order.id,
        item.product_id,
        item.quantity,
        item.price
      );
    }

    // Reduce Product Stock
    for (const item of cart) {
      await decreaseProductStock(
        client,
        item.product_id,
        item.quantity
      );
    }

    // Clear Cart
    await clearCart(client, user_id);

    await client.query("COMMIT");

    return order;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// =======================================
// Cancel Order Service
// =======================================
export const cancelOrderService = async (
  order_id,
  user_id
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Lock Order
    const order = await getOrderByIdForTransaction(
      client,
      order_id,
      user_id
    );

    if (!order) {
      throw new Error("Order not found.");
    }

    if (order.status !== ORDER_STATUS.PENDING) {
      throw new Error(
        "Only pending orders can be cancelled."
      );
    }

    // Restore Product Stock
    const items = await getOrderItemsForTransaction(
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

    // Cancel Order
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

// =======================================
// Admin Update Order Status Service
// =======================================
export const updateOrderStatusService = async (
  order_id,
  status
) => {
  if (!VALID_ORDER_STATUS.includes(status)) {
    throw new Error("Invalid order status.");
  }

  const order = await getOrderByIdForAdmin(order_id);

  if (!order) {
    throw new Error("Order not found.");
  }

  const allowedTransitions =
    ORDER_TRANSITIONS[order.status];

  if (!allowedTransitions.includes(status)) {
    throw new Error(
      `Invalid status transition from '${order.status}' to '${status}'.`
    );
  }

  return await updateOrderStatus(order_id, status);
};