import { getProductById } from "../models/productModel.js";

import {
  getWishlistItem,
  addToWishlist,
  getWishlist,
  removeWishlistItem,
} from "../models/wishlistModel.js";

// =======================================
// Add To Wishlist
// =======================================
export const addWishlistService = async (
  user_id,
  product_id
) => {
  const product = await getProductById(product_id);

  if (!product) {
    throw new Error("Product not found.");
  }

  const existing = await getWishlistItem(
    user_id,
    product_id
  );

  if (existing) {
    throw new Error("Product already exists in wishlist.");
  }

  return await addToWishlist(
    user_id,
    product_id
  );
};

// =======================================
// Get Wishlist
// =======================================
export const getWishlistService = async (
  user_id
) => {
  return await getWishlist(user_id);
};

// =======================================
// Remove Wishlist
// =======================================
export const removeWishlistService = async (
  user_id,
  product_id
) => {
  await removeWishlistItem(
    user_id,
    product_id
  );

  return true;
};
