import {
  addReviewService,
  updateReviewService,
  deleteReviewService,
  getProductReviewsService,
} from "../services/reviewService.js";

// =======================================
// Add Review
// =======================================
export const createReview = async (req, res) => {
  try {
    const { product_id, rating, comment } = req.body;

    const review = await addReviewService(
      req.user.id,
      product_id,
      Number(rating),
      comment
    );

    res.status(201).json({
      success: true,
      message: "Review added successfully.",
      review,
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
// Update Review
// =======================================
export const editReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await updateReviewService(
      req.params.id,
      req.user.id,
      Number(rating),
      comment
    );

    res.status(200).json({
      success: true,
      message: "Review updated successfully.",
      review,
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
// Delete Review
// =======================================
export const removeReview = async (req, res) => {
  try {
    await deleteReviewService(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
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
// Get Product Reviews
// =======================================
export const fetchProductReviews = async (req, res) => {
  try {
    const data = await getProductReviewsService(
      req.params.productId
    );

    res.status(200).json({
      success: true,
      averageRating: data.averageRating,
      totalReviews: data.totalReviews,
      reviews: data.reviews,
    });
  } catch (error) {
    console.error(error);

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};