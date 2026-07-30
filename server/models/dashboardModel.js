import pool from "../config/db.js";

// ===============================
// Get Dashboard Statistics
// ===============================
export const getDashboardStats = async () => {
  const query = `
    SELECT
      (SELECT COUNT(*) FROM users) AS total_users,

      (SELECT COUNT(*) FROM products) AS total_products,

      (SELECT COUNT(*) FROM orders) AS total_orders,

      (
        SELECT COALESCE(SUM(total_amount), 0)
        FROM orders
        WHERE status = 'Delivered'
      ) AS total_revenue,

      (
        SELECT COUNT(*)
        FROM orders
        WHERE status = 'Pending'
      ) AS pending_orders,

      (
        SELECT COUNT(*)
        FROM orders
        WHERE status = 'Processing'
      ) AS processing_orders,

      (
        SELECT COUNT(*)
        FROM orders
        WHERE status = 'Shipped'
      ) AS shipped_orders,

      (
        SELECT COUNT(*)
        FROM orders
        WHERE status = 'Delivered'
      ) AS delivered_orders,

      (
        SELECT COUNT(*)
        FROM orders
        WHERE status = 'Cancelled'
      ) AS cancelled_orders;
  `;

  const result = await pool.query(query);

  return result.rows[0];
};