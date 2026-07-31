import pool from "../config/db.js";

// ===============================
// Get Dashboard Statistics
// ===============================
export const getDashboardStats = async () => {
  // Dashboard Counts
  const statsResult = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM users) AS total_users,

      (SELECT COUNT(*) FROM products) AS total_products,

      (SELECT COUNT(*) FROM orders) AS total_orders,

      (
        SELECT COALESCE(SUM(total_amount),0)
        FROM orders
        WHERE status='Delivered'
      ) AS total_revenue,

      (
        SELECT COUNT(*)
        FROM orders
        WHERE status='Pending'
      ) AS pending_orders,

      (
        SELECT COUNT(*)
        FROM orders
        WHERE status='Processing'
      ) AS processing_orders,

      (
        SELECT COUNT(*)
        FROM orders
        WHERE status='Shipped'
      ) AS shipped_orders,

      (
        SELECT COUNT(*)
        FROM orders
        WHERE status='Delivered'
      ) AS delivered_orders,

      (
        SELECT COUNT(*)
        FROM orders
        WHERE status='Cancelled'
      ) AS cancelled_orders;
  `);

  // Latest Users
  const usersResult = await pool.query(`
    SELECT
      id,
      name,
      email,
      role,
      created_at
    FROM users
    ORDER BY created_at DESC
    LIMIT 5;
  `);

  // Latest Orders
  const ordersResult = await pool.query(`
    SELECT
      o.id,
      o.total_amount,
      o.status,
      o.created_at,
      u.name

    FROM orders o

    JOIN users u
      ON o.user_id=u.id

    ORDER BY o.created_at DESC
    LIMIT 5;
  `);

  return {
    ...statsResult.rows[0],
    latestUsers: usersResult.rows,
    latestOrders: ordersResult.rows,
  };
};