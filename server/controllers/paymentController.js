import {
  createPaymentService,
  getPaymentService,
} from "../services/paymentService.js";

// Create Payment
export const createPayment = async (
  req,
  res
) => {
  try {
    const { order_id, payment_method } = req.body;

    const payment = await createPaymentService(
      order_id,
      payment_method
    );

    res.status(201).json({
      success: true,
      payment,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Payment
export const getPayment = async (
  req,
  res
) => {
  try {
    const payment = await getPaymentService(
      req.params.orderId
    );

    res.json({
      success: true,
      payment,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};