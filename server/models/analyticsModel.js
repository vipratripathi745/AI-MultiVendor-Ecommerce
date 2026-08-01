import pool from "../config/db.js";

// ==========================================
// Admin Analytics
// ==========================================
export const getAdminAnalytics = async () => {
  // Dashboard Statistics
  const dashboardQuery = `
    SELECT
      (SELECT COUNT(*)::INTEGER FROM users) AS total_users,

      (SELECT COUNT(*)::INTEGER FROM products) AS total_products,

      (SELECT COUNT(*)::INTEGER FROM orders) AS total_orders,

      (
        SELECT COALESCE(SUM(total_amount), 0)::NUMERIC
        FROM orders
        WHERE status = 'Delivered'
      ) AS total_revenue;
  `;

  // Monthly Revenue
  const monthlyRevenueQuery = `
    SELECT
      TO_CHAR(
        DATE_TRUNC('month', created_at),
        'Mon'
      ) AS month,

      COALESCE(
        SUM(total_amount),
        0
      )::NUMERIC AS revenue

    FROM orders

    WHERE status = 'Delivered'

    GROUP BY
      DATE_TRUNC('month', created_at)

    ORDER BY
      DATE_TRUNC('month', created_at);
  `;

  // Orders By Status
  const orderStatusQuery = `
    SELECT
      status,
      COUNT(*)::INTEGER AS count

    FROM orders

    GROUP BY status

    ORDER BY status;
  `;

  // Top Selling Products
  const topProductsQuery = `
    SELECT
      p.name,

      SUM(oi.quantity)::INTEGER AS sold

    FROM order_items oi

    JOIN products p
      ON oi.product_id = p.id

    GROUP BY p.name

    ORDER BY sold DESC

    LIMIT 5;
  `;

  // Recent Orders
  const recentOrdersQuery = `
    SELECT
      o.id,
      o.total_amount,
      o.status,
      o.created_at,
      u.name

    FROM orders o

    JOIN users u
      ON o.user_id = u.id

    ORDER BY o.created_at DESC

    LIMIT 5;
  `;

  const dashboard = await pool.query(dashboardQuery);

  const monthlyRevenue = await pool.query(monthlyRevenueQuery);

  const orderStatus = await pool.query(orderStatusQuery);

  const topProducts = await pool.query(topProductsQuery);

  const recentOrders = await pool.query(recentOrdersQuery);

  return {
    dashboard: dashboard.rows[0],

    monthlyRevenue: monthlyRevenue.rows,

    orderStatus: orderStatus.rows,

    topProducts: topProducts.rows,

    recentOrders: recentOrders.rows,
  };
};

// ==========================================
// Seller Analytics
// ==========================================
export const getSellerAnalytics = async (
  sellerId
) => {
  // Dashboard Statistics
  const dashboardQuery = `
    SELECT

      (
        SELECT COUNT(*)
        FROM products
        WHERE seller_id = $1
      )::INTEGER AS total_products,

      (
        SELECT COUNT(DISTINCT o.id)

        FROM orders o

        JOIN order_items oi
          ON o.id = oi.order_id

        JOIN products p
          ON oi.product_id = p.id

        WHERE p.seller_id = $1
      )::INTEGER AS total_orders,

      (
        SELECT COALESCE(
          SUM(oi.quantity * oi.price),
          0
        )

        FROM order_items oi

        JOIN products p
          ON oi.product_id = p.id

        JOIN orders o
          ON oi.order_id = o.id

        WHERE
          p.seller_id = $1
          AND o.status = 'Delivered'
      )::NUMERIC AS total_revenue;
  `;

  // Monthly Revenue
  const monthlyRevenueQuery = `
    SELECT

      TO_CHAR(
        DATE_TRUNC('month', o.created_at),
        'Mon'
      ) AS month,

      COALESCE(
        SUM(oi.quantity * oi.price),
        0
      )::NUMERIC AS revenue

    FROM order_items oi

    JOIN products p
      ON oi.product_id = p.id

    JOIN orders o
      ON oi.order_id = o.id

    WHERE
      p.seller_id = $1
      AND o.status = 'Delivered'

    GROUP BY
      DATE_TRUNC('month', o.created_at)

    ORDER BY
      DATE_TRUNC('month', o.created_at);
  `;

  // Top Selling Products
  const topProductsQuery = `
    SELECT

      p.name,

      SUM(oi.quantity)::INTEGER AS sold

    FROM order_items oi

    JOIN products p
      ON oi.product_id = p.id

    WHERE
      p.seller_id = $1

    GROUP BY
      p.name

    ORDER BY
      sold DESC

    LIMIT 5;
  `;

  // Recent Orders
  const recentOrdersQuery = `
    SELECT

      o.id,

      u.name,

      o.status,

      o.total_amount,

      o.created_at

    FROM orders o

    JOIN users u
      ON o.user_id = u.id

    JOIN order_items oi
      ON o.id = oi.order_id

    JOIN products p
      ON oi.product_id = p.id

    WHERE
      p.seller_id = $1

    GROUP BY
      o.id,
      u.name,
      o.status,
      o.total_amount,
      o.created_at

    ORDER BY
      o.created_at DESC

    LIMIT 5;
  `;

  const dashboard = await pool.query(
    dashboardQuery,
    [sellerId]
  );

  const monthlyRevenue = await pool.query(
    monthlyRevenueQuery,
    [sellerId]
  );

  const topProducts = await pool.query(
    topProductsQuery,
    [sellerId]
  );

  const recentOrders = await pool.query(
    recentOrdersQuery,
    [sellerId]
  );

  return {
    dashboard: dashboard.rows[0],

    monthlyRevenue: monthlyRevenue.rows,

    topProducts: topProducts.rows,

    recentOrders: recentOrders.rows,
  };
};