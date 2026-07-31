import api from "./api";

// Get Wishlist
export const getWishlist = async () => {
  const response = await api.get("/wishlist");
  return response.data;
};

// Add To Wishlist
export const addToWishlist = async (product_id) => {
  const response = await api.post("/wishlist", {
    product_id,
  });

  return response.data;
};

// Remove Wishlist Item
export const removeWishlistItem = async (productId) => {
  const response = await api.delete(
    `/wishlist/${productId}`
  );

  return response.data;
};