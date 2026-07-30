import express from "express";

import protect from "../middleware/authMiddleware.js";
import verifyAdmin from "../middleware/adminMiddleware.js";

import {
  createCoupon,
  getCoupons,
  applyCoupon,
  deleteCoupon,
} from "../controllers/couponController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  verifyAdmin,
  createCoupon
);

router.get("/", getCoupons);

router.post("/apply", applyCoupon);

router.delete(
  "/:id",
  protect,
  verifyAdmin,
  deleteCoupon
);

export default router;