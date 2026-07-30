import pool from "../config/db.js";

// Create Payment
export const createPayment = async (
  order_id,
  payment_method,
  amount,
  transaction_id
) => {
  const result = await pool.query(
    `
    INSERT INTO payments
    (
      order_id,
      payment_method,
      amount,
      transaction_id,
      payment_status,
      paid_at
    )
    VALUES
    ($1,$2,$3,$4,'success',NOW())
    RETURNING *;
    `,
    [
      order_id,
      payment_method,
      amount,
      transaction_id,
    ]
  );

  return result.rows[0];
};

// Get Payment
export const getPaymentByOrder = async (
  order_id
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM payments
    WHERE order_id=$1;
    `,
    [order_id]
  );

  return result.rows[0];
};