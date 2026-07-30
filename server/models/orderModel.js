import pool from "../config/db.js";

// ===============================================
// Create Order
// ===============================================
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
    VALUES ($1,$2,$3,$4)
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

// ===============================================
// Create Order Item
// ===============================================
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
    VALUES ($1,$2,$3,$4);
  `;

  await client.query(query, [
    order_id,
    product_id,
    quantity,
    price,
  ]);
};

// ===============================================
// Get Orders By User
// ===============================================
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

// ===============================================
// Get Order By Id (Customer)
// ===============================================
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

// ===============================================
// Get Order By Id (Transaction)
// ===============================================
export const getOrderByIdForTransaction = async (
  client,
  order_id,
  user_id
) => {
  const query = `
    SELECT *
    FROM orders
    WHERE id = $1
      AND user_id = $2
    FOR UPDATE;
  `;

  const result = await client.query(query, [
    order_id,
    user_id,
  ]);

  return result.rows[0];
};

// ===============================================
// Get Order Items
// ===============================================
export const getOrderItems = async (order_id) => {
  const query = `
    SELECT
      oi.id,
      oi.product_id,
      oi.quantity,
      oi.price,

      p.name,
      p.brand,
      p.image

    FROM order_items oi

    JOIN products p
      ON oi.product_id = p.id

    WHERE oi.order_id = $1;
  `;

  const result = await pool.query(query, [order_id]);

  return result.rows;
};

// ===============================================
// Get Order Items (Transaction)
// ===============================================
export const getOrderItemsForTransaction = async (
  client,
  order_id
) => {
  const query = `
    SELECT
      product_id,
      quantity
    FROM order_items
    WHERE order_id = $1;
  `;

  const result = await client.query(query, [order_id]);

  return result.rows;
};

// ===============================================
// Restore Product Stock
// ===============================================
export const restoreProductStock = async (
  client,
  product_id,
  quantity
) => {
  const query = `
    UPDATE products
    SET stock = stock + $1
    WHERE id = $2;
  `;

  await client.query(query, [
    quantity,
    product_id,
  ]);
};

// ===============================================
// Cancel Order (Transaction)
// ===============================================
export const cancelOrderTransaction = async (
  client,
  order_id
) => {
  const query = `
    UPDATE orders
    SET
      status = 'Cancelled',
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *;
  `;

  const result = await client.query(query, [
    order_id,
  ]);

  return result.rows[0];
};

// ===============================================
// Cancel Order (Normal)
// ===============================================
export const cancelOrder = async (
  order_id,
  user_id
) => {
  const query = `
    UPDATE orders
    SET
      status = 'Cancelled',
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
      AND user_id = $2
      AND status = 'Pending'
    RETURNING *;
  `;

  const result = await pool.query(query, [
    order_id,
    user_id,
  ]);

  return result.rows[0];
};

// ===============================================
// Admin - Get All Orders
// ===============================================
export const getAllOrders = async () => {
  const query = `
    SELECT
      o.*,
      u.name,
      u.email

    FROM orders o

    JOIN users u
      ON o.user_id = u.id

    ORDER BY o.created_at DESC;
  `;

  const result = await pool.query(query);

  return result.rows;
};

// ===============================================
// Admin - Get Order By Id
// ===============================================
export const getOrderByIdForAdmin = async (
  order_id
) => {
  const query = `
    SELECT
      o.*,
      u.name,
      u.email

    FROM orders o

    JOIN users u
      ON o.user_id = u.id

    WHERE o.id = $1;
  `;

  const result = await pool.query(query, [
    order_id,
  ]);

  return result.rows[0];
};

// ===============================================
// Admin - Update Order Status
// ===============================================
export const updateOrderStatus = async (
  order_id,
  status
) => {
  const query = `
    UPDATE orders
    SET
      status = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *;
  `;

  const result = await pool.query(query, [
    status,
    order_id,
  ]);

  return result.rows[0];
};
// ===============================================
// Get Order By Id (Payment)
// ===============================================
export const getOrderByIdOnly = async (order_id) => {
  const query = `
    SELECT *
    FROM orders
    WHERE id = $1;
  `;

  const result = await pool.query(query, [order_id]);

  return result.rows[0];
};