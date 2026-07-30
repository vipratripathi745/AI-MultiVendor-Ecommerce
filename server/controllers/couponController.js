import {
  createCouponService,
  getCouponsService,
  applyCouponService,
  deleteCouponService,
} from "../services/couponService.js";

export const createCoupon = async (req, res) => {
  try {
    const coupon = await createCouponService(req.body);

    res.status(201).json({
      success: true,
      coupon,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getCoupons = async (req, res) => {
  try {
    const coupons = await getCouponsService();

    res.json({
      success: true,
      coupons,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const applyCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    const result = await applyCouponService(
      code,
      orderAmount
    );

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    await deleteCouponService(req.params.id);

    res.json({
      success: true,
      message: "Coupon deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};