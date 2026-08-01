import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaEye,
} from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

import { addToCart } from "../../services/cartService";
import {
  addToWishlist,
  removeWishlistItem,
} from "../../services/wishlistService";

function ProductCard({ product }) {
  const [wishlist, setWishlist] = useState(false);
  const [addingCart, setAddingCart] = useState(false);
  const [addingWishlist, setAddingWishlist] =
    useState(false);

  const handleWishlist = async () => {
    try {
      setAddingWishlist(true);

      if (wishlist) {
        const response =
          await removeWishlistItem(product.id);

        toast.success(response.message);
      } else {
        const response =
          await addToWishlist(product.id);

        toast.success(response.message);
      }

      setWishlist((prev) => !prev);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setAddingWishlist(false);
    }
  };

  const handleCart = async () => {
    try {
      setAddingCart(true);

      const response = await addToCart(
        product.id,
        1
      );

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to add to cart"
      );
    } finally {
      setAddingCart(false);
    }
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      {/* IMAGE */}

      <div className="relative overflow-hidden">

        <Link to={`/products/${product.id}`}>

          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
          />

        </Link>

        {/* Discount */}

        <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
          20% OFF
        </span>

        {/* Stock */}

        <span
          className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
            product.stock > 0
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {product.stock > 0
            ? "In Stock"
            : "Out of Stock"}
        </span>

        {/* Wishlist */}

        <button
          onClick={handleWishlist}
          disabled={addingWishlist}
          className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition disabled:opacity-60 ${
            wishlist
              ? "bg-red-600 text-white"
              : "bg-white hover:bg-red-600 hover:text-white"
          }`}
        >
          <FaHeart />
        </button>

      </div>

      {/* DETAILS */}

      <div className="p-5">

        <p className="uppercase text-xs tracking-wider text-gray-400">
          {product.category}
        </p>

        <Link to={`/products/${product.id}`}>

          <h2 className="text-xl font-bold mt-2 group-hover:text-blue-600 transition">
            {product.name}
          </h2>

        </Link>

        <p className="text-gray-500 text-sm mt-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}

        <div className="flex items-center mt-4">

          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className="text-yellow-400"
            />
          ))}

          <span className="ml-2 text-gray-500 text-sm">
            (5.0)
          </span>

        </div>

        {/* Price */}

        <div className="flex items-end gap-3 mt-5">

          <span className="text-3xl font-bold text-blue-600">
            ₹{product.price}
          </span>

          <span className="line-through text-gray-400">
            ₹{Math.floor(product.price * 1.2)}
          </span>

        </div>

        {/* Buttons */}

        <div className="flex gap-3 mt-6">

          <button
            onClick={handleCart}
            disabled={
              addingCart ||
              product.stock === 0
            }
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
          >

            <FaShoppingCart />

            {addingCart
              ? "Adding..."
              : "Add To Cart"}

          </button>

          <Link
            to={`/products/${product.id}`}
            className="w-14 border rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
          >

            <FaEye />

          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;