import { getProductById } from "../models/productModel.js";

import {
  createReview,
  deleteReview,
  getProductRatingSummary,
  getReviewById,
  getReviewByUserAndProduct,
  getReviewsByProduct,
  updateReview,
} from "../models/reviewModel.js";

// =======================================
// Add Review Service
// =======================================
export const addReviewService = async (
  user_id,
  product_id,
  rating,
  comment
) => {
  // Validate Product
  const product = await getProductById(product_id);

  if (!product) {
    throw new Error("Product not found.");
  }

  // Validate Rating
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5.");
  }

  // Check Duplicate Review
  const existingReview =
    await getReviewByUserAndProduct(
      user_id,
      product_id
    );

  if (existingReview) {
    throw new Error(
      "You have already reviewed this product."
    );
  }

  return await createReview(
    user_id,
    product_id,
    rating,
    comment
  );
};

// =======================================
// Update Review Service
// =======================================
export const updateReviewService = async (
  review_id,
  user_id,
  rating,
  comment
) => {
  // Validate Rating
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5.");
  }

  const review = await getReviewById(review_id);

  if (!review) {
    throw new Error("Review not found.");
  }

  // Ownership Check
  if (review.user_id !== user_id) {
    throw new Error(
      "You can update only your own review."
    );
  }

  return await updateReview(
    review_id,
    rating,
    comment
  );
};

// =======================================
// Delete Review Service
// =======================================
export const deleteReviewService = async (
  review_id,
  user_id
) => {
  const review = await getReviewById(review_id);

  if (!review) {
    throw new Error("Review not found.");
  }

  // Ownership Check
  if (review.user_id !== user_id) {
    throw new Error(
      "You can delete only your own review."
    );
  }

  await deleteReview(review_id);

  return true;
};

// =======================================
// Product Reviews Service
// =======================================
export const getProductReviewsService = async (
  product_id
) => {
  const product = await getProductById(product_id);

  if (!product) {
    throw new Error("Product not found.");
  }

  const reviews =
    await getReviewsByProduct(product_id);

  const summary =
    await getProductRatingSummary(product_id);

  return {
    reviews,
    averageRating: Number(summary.average_rating),
    totalReviews: Number(summary.total_reviews),
  };
};