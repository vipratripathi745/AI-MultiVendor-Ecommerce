import pool from "../config/db.js";

// ===============================
// Create Order
// ===============================
export const createOrder = async (
  client,
  user_id,
  total_amount,
  payment_method,
  shipping_address
) => {
  const query = `
    INSERT INTO orders
    (
      user_id,
      total_amount,
      payment_method,
      shipping_address
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const result = await client.query(query, [
    user_id,
    total_amount,
    payment_method,
    shipping_address,
  ]);

  return result.rows[0];
};

// ===============================
// Add Order Item
// ===============================
export const createOrderItem = async (
  client,
  order_id,
  product_id,
  quantity,
  price
) => {
  const query = `
    INSERT INTO order_items
    (
      order_id,
      product_id,
      quantity,
      price
    )
    VALUES ($1, $2, $3, $4);
  `;

  await client.query(query, [
    order_id,
    product_id,
    quantity,
    price,
  ]);
};

// ===============================
// Get User Orders
// ===============================
export const getOrdersByUser = async (user_id) => {
  const query = `
    SELECT *
    FROM orders
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(query, [user_id]);

  return result.rows;
};

// ===============================
// Get Order By Id
// ===============================
export const getOrderById = async (
  order_id,
  user_id
) => {
  const query = `
    SELECT *
    FROM orders
    WHERE id = $1
      AND user_id = $2;
  `;

  const result = await pool.query(query, [
    order_id,
    user_id,
  ]);

  return result.rows[0];
};

// ===============================
// Get Order Items
// ===============================
export const getOrderItems = async (order_id) => {
  const query = `
    SELECT
      oi.id,
      oi.quantity,
      oi.price,

      p.name,
      p.image,
      p.brand

    FROM order_items oi

    JOIN products p
      ON oi.product_id = p.id

    WHERE oi.order_id = $1;
  `;

  const result = await pool.query(query, [order_id]);

  return result.rows;
};

// ===============================
// Cancel Order
// ===============================
export const cancelOrder = async (
  order_id,
  user_id
) => {
  const query = `
    UPDATE orders
    SET status = 'Cancelled',
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
      AND user_id = $2
    RETURNING *;
  `;

  const result = await pool.query(query, [
    order_id,
    user_id,
  ]);

  return result.rows[0];
};