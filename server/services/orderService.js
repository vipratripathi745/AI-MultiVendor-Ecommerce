import pool from "../config/db.js";

import {
  createOrder,
  createOrderItem,
} from "../models/orderModel.js";

import { getCartByUser } from "../models/cartModel.js";

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
    // Start Transaction
    await client.query("BEGIN");

    // Get User Cart
    const cart = await getCartByUser(user_id);

    if (cart.length === 0) {
      throw new Error("Cart is empty");
    }

    // Lock Products & Validate Stock
    let total = 0;

    for (const item of cart) {
      const result = await client.query(
        `
        SELECT id, stock
        FROM products
        WHERE id = $1
        FOR UPDATE;
        `,
        [item.product_id]
      );

      const product = result.rows[0];

      if (!product) {
        throw new Error(`${item.name} not found`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`${item.name} is out of stock`);
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

    // Update Product Stock
    for (const item of cart) {
      await client.query(
        `
        UPDATE products
        SET stock = stock - $1
        WHERE id = $2;
        `,
        [item.quantity, item.product_id]
      );
    }

    // Clear Cart
    await client.query(
      `
      DELETE FROM cart
      WHERE user_id = $1;
      `,
      [user_id]
    );

    // Commit Transaction
    await client.query("COMMIT");

    return order;
  } catch (error) {
    // Rollback Transaction
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};