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
  const result = await client.query(
    `
    INSERT INTO orders
    (
      user_id,
      total_amount,
      payment_method,
      shipping_address
    )
    VALUES($1,$2,$3,$4)
    RETURNING *;
    `,
    [
      user_id,
      total_amount,
      payment_method,
      shipping_address,
    ]
  );

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
  await client.query(
    `
    INSERT INTO order_items
    (
      order_id,
      product_id,
      quantity,
      price
    )
    VALUES($1,$2,$3,$4);
    `,
    [
      order_id,
      product_id,
      quantity,
      price,
    ]
  );
};

// ===============================================
// Get Orders By User
// ===============================================
export const getOrdersByUser = async (
  user_id
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM orders
    WHERE user_id=$1
    ORDER BY created_at DESC;
    `,
    [user_id]
  );

  return result.rows;
};

// ===============================================
// Customer Order
// ===============================================
export const getOrderById = async (
  order_id,
  user_id
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM orders
    WHERE id=$1
    AND user_id=$2;
    `,
    [order_id, user_id]
  );

  return result.rows[0];
};

// ===============================================
// Transaction Order
// ===============================================
export const getOrderByIdForTransaction =
  async (
    client,
    order_id,
    user_id
  ) => {
    const result = await client.query(
      `
      SELECT *
      FROM orders
      WHERE id=$1
      AND user_id=$2
      FOR UPDATE;
      `,
      [order_id, user_id]
    );

    return result.rows[0];
  };

// ===============================================
// Order Items
// ===============================================
export const getOrderItems = async (
  order_id
) => {
  const result = await pool.query(
    `
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
      ON oi.product_id=p.id

    WHERE oi.order_id=$1;
    `,
    [order_id]
  );

  return result.rows;
};

// ===============================================
// Transaction Order Items
// ===============================================
export const getOrderItemsForTransaction =
  async (client, order_id) => {
    const result = await client.query(
      `
      SELECT
        product_id,
        quantity
      FROM order_items
      WHERE order_id=$1;
      `,
      [order_id]
    );

    return result.rows;
  };

// ===============================================
// Restore Stock
// ===============================================
export const restoreProductStock =
  async (
    client,
    product_id,
    quantity
  ) => {
    await client.query(
      `
      UPDATE products
      SET stock=stock+$1
      WHERE id=$2;
      `,
      [quantity, product_id]
    );
  };

// ===============================================
// Cancel Order
// ===============================================
export const cancelOrderTransaction =
  async (client, order_id) => {
    const result = await client.query(
      `
      UPDATE orders
      SET
        status='Cancelled',
        updated_at=CURRENT_TIMESTAMP
      WHERE id=$1
      RETURNING *;
      `,
      [order_id]
    );

    return result.rows[0];
  };

// ===============================================
// Cancel Order
// ===============================================
export const cancelOrder = async (
  order_id,
  user_id
) => {
  const result = await pool.query(
    `
    UPDATE orders
    SET
      status='Cancelled',
      updated_at=CURRENT_TIMESTAMP
    WHERE id=$1
    AND user_id=$2
    AND status='Pending'
    RETURNING *;
    `,
    [order_id, user_id]
  );

  return result.rows[0];
};

// ===============================================
// Admin Orders
// ===============================================
export const getAllOrders = async () => {
  const result = await pool.query(
    `
    SELECT

      o.*,

      u.name,
      u.email

    FROM orders o

    JOIN users u
      ON o.user_id=u.id

    ORDER BY o.created_at DESC;
    `
  );

  return result.rows;
};

// ===============================================
// Admin Order
// ===============================================
export const getOrderByIdForAdmin =
  async (order_id) => {
    const result = await pool.query(
      `
      SELECT

        o.*,

        u.name,
        u.email

      FROM orders o

      JOIN users u
        ON o.user_id=u.id

      WHERE o.id=$1;
      `,
      [order_id]
    );

    return result.rows[0];
  };

// ===============================================
// Update Status
// ===============================================
export const updateOrderStatus = async (
  order_id,
  status
) => {
  const result = await pool.query(
    `
    UPDATE orders
    SET
      status=$1,
      updated_at=CURRENT_TIMESTAMP
    WHERE id=$2
    RETURNING *;
    `,
    [status, order_id]
  );

  return result.rows[0];
};

// ===============================================
// Payment Order
// ===============================================
export const getOrderByIdOnly = async (
  order_id
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM orders
    WHERE id=$1;
    `,
    [order_id]
  );

  return result.rows[0];
};

// ===============================================
// Dashboard - Recent Orders
// ===============================================
export const getRecentOrders = async (
  limit = 5
) => {
  const result = await pool.query(
    `
    SELECT

      o.id,
      o.total_amount,
      o.status,
      o.created_at,

      u.name,
      u.email

    FROM orders o

    JOIN users u
      ON o.user_id=u.id

    ORDER BY o.created_at DESC

    LIMIT $1;
    `,
    [limit]
  );

  return result.rows;
};