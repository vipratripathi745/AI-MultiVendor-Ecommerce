import crypto from "crypto";

import { getOrderByIdOnly } from "../models/orderModel.js";
import {
  createPayment,
  getPaymentByOrder,
} from "../models/paymentModel.js";

// ================================
// Create Payment
// ================================
export const createPaymentService = async (
  order_id,
  payment_method
) => {
  const order = await getOrderByIdOnly(order_id);

  if (!order) {
    throw new Error("Order not found.");
  }

  const existing = await getPaymentByOrder(order_id);

  if (existing) {
    throw new Error("Payment already exists.");
  }

  const transaction_id = crypto.randomUUID();

  return await createPayment(
    order_id,
    payment_method,
    order.total_amount,
    transaction_id
  );
};

// ================================
// Get Payment
// ================================
export const getPaymentService = async (
  order_id
) => {
  const payment = await getPaymentByOrder(order_id);

  if (!payment) {
    throw new Error("Payment not found.");
  }

  return payment;
};