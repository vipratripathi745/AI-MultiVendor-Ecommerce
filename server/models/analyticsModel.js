import pool from "../config/db.js";

// ==========================================
// Admin Analytics
// ==========================================
export const getAdminAnalytics = async () => {
  // ==========================================
  // Dashboard Statistics
  // ==========================================
  const dashboardQuery = `
    SELECT

      (SELECT COUNT(*) FROM users) AS total_users,

      (SELECT COUNT(*) FROM products) AS total_products,

      (SELECT COUNT(*) FROM orders) AS total_orders,

      (
        SELECT COALESCE(SUM(total_amount),0)
        FROM orders
        WHERE status='Delivered'
      ) AS total_revenue;
  `;

  // ==========================================
  // Monthly Revenue
  // ==========================================
  const monthlyRevenueQuery = `
    SELECT

      TO_CHAR(created_at,'Mon') AS month,

      COALESCE(SUM(total_amount),0) AS revenue

    FROM orders

    WHERE status='Delivered'

    GROUP BY
      DATE_TRUNC('month',created_at),
      TO_CHAR(created_at,'Mon')

    ORDER BY
      DATE_TRUNC('month',created_at);
  `;

  // ==========================================
  // Orders By Status
  // ==========================================
  const orderStatusQuery = `
    SELECT

      status,

      COUNT(*)::INTEGER AS count

    FROM orders

    GROUP BY status

    ORDER BY status;
  `;

  // ==========================================
  // Top Selling Products
  // ==========================================
  const topProductsQuery = `
    SELECT

      p.name,

      SUM(oi.quantity)::INTEGER AS sold

    FROM order_items oi

    JOIN products p
      ON oi.product_id=p.id

    GROUP BY p.name

    ORDER BY sold DESC

    LIMIT 5;
  `;

  // ==========================================
  // Recent Orders
  // ==========================================
  const recentOrdersQuery = `
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
  `;

  const dashboard =
    await pool.query(dashboardQuery);

  const monthlyRevenue =
    await pool.query(monthlyRevenueQuery);

  const orderStatus =
    await pool.query(orderStatusQuery);

  const topProducts =
    await pool.query(topProductsQuery);

  const recentOrders =
    await pool.query(recentOrdersQuery);

  return {

    dashboard:
      dashboard.rows[0],

    monthlyRevenue:
      monthlyRevenue.rows,

    orderStatus:
      orderStatus.rows,

    topProducts:
      topProducts.rows,

    recentOrders:
      recentOrders.rows,

  };
};