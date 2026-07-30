import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createPayment,
  getPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  createPayment
);

router.get(
  "/:orderId",
  protect,
  getPayment
);

export default router;