import {
  createCoupon,
  getCouponByCode,
  getAllCoupons,
  deleteCoupon,
} from "../models/couponModel.js";

// ================================
// Create Coupon
// ================================
export const createCouponService = async (data) => {
  const {
    code,
    discount_type,
    discount_value,
    min_order_amount,
    expiry_date,
  } = data;

  const existing = await getCouponByCode(code);

  if (existing) {
    throw new Error("Coupon already exists.");
  }

  return await createCoupon(
    code.toUpperCase(),
    discount_type,
    discount_value,
    min_order_amount,
    expiry_date
  );
};

// ================================
// Get Coupons
// ================================
export const getCouponsService = async () => {
  return await getAllCoupons();
};

// ================================
// Apply Coupon
// ================================
export const applyCouponService = async (
  code,
  orderAmount
) => {
  const coupon = await getCouponByCode(code.toUpperCase());

  if (!coupon) {
    throw new Error("Invalid coupon.");
  }

  if (new Date(coupon.expiry_date) < new Date()) {
    throw new Error("Coupon expired.");
  }

  if (Number(orderAmount) < Number(coupon.min_order_amount)) {
    throw new Error(
      `Minimum order amount should be ₹${coupon.min_order_amount}`
    );
  }

  let discount = 0;

  if (coupon.discount_type === "percentage") {
    discount =
      (Number(orderAmount) * Number(coupon.discount_value)) / 100;
  } else {
    discount = Number(coupon.discount_value);
  }

  return {
    coupon,
    discount,
    finalAmount: Number(orderAmount) - discount,
  };
};

// ================================
// Delete Coupon
// ================================
export const deleteCouponService = async (id) => {
  await deleteCoupon(id);
};