import pool from "../config/db.js";

// Create Coupon
export const createCoupon = async (
  code,
  discount_type,
  discount_value,
  min_order_amount,
  expiry_date
) => {
  const result = await pool.query(
    `
    INSERT INTO coupons
    (code, discount_type, discount_value, min_order_amount, expiry_date)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *;
    `,
    [
      code,
      discount_type,
      discount_value,
      min_order_amount,
      expiry_date,
    ]
  );

  return result.rows[0];
};

// Get Coupon By Code
export const getCouponByCode = async (code) => {
  const result = await pool.query(
    `
    SELECT *
    FROM coupons
    WHERE code = $1
    AND is_active = TRUE;
    `,
    [code]
  );

  return result.rows[0];
};

// Get All Coupons
export const getAllCoupons = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM coupons
    ORDER BY created_at DESC;
    `
  );

  return result.rows;
};

// Delete Coupon
export const deleteCoupon = async (id) => {
  await pool.query(
    `
    DELETE FROM coupons
    WHERE id=$1;
    `,
    [id]
  );
};