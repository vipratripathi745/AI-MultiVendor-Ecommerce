import {
  addWishlistService,
  getWishlistService,
  removeWishlistService,
} from "../services/wishlistService.js";

// =======================================
// Add To Wishlist
// =======================================
export const addWishlist = async (req, res) => {
  try {
    const { product_id } = req.body;

    const wishlist = await addWishlistService(
      req.user.id,
      product_id
    );

    res.status(201).json({
      success: true,
      message: "Product added to wishlist.",
      wishlist,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get Wishlist
// =======================================
export const fetchWishlist = async (req, res) => {
  try {
    const wishlist = await getWishlistService(
      req.user.id
    );

    res.status(200).json({
      success: true,
      totalItems: wishlist.length,
      wishlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Remove Wishlist Item
// =======================================
export const deleteWishlistItem = async (
  req,
  res
) => {
  try {
    await removeWishlistService(
      req.user.id,
      req.params.productId
    );

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};