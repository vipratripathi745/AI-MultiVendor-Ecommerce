import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaShieldAlt,
  FaShippingFast,
} from "react-icons/fa";

import { getProduct } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import { addToWishlist } from "../../services/wishlistService";
import Reviews from "../../components/Product/Reviews";

function ProductDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [addingCart, setAddingCart] = useState(false);
  const [addingWishlist, setAddingWishlist] = useState(false);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProduct(id);

      setProduct(response.product);
    } catch (error) {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingCart(true);

      const response = await addToCart(product.id, 1);

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add to cart"
      );
    } finally {
      setAddingCart(false);
    }
  };

  const handleWishlist = async () => {
    try {
      setAddingWishlist(true);

      const response = await addToWishlist(product.id);

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add to wishlist"
      );
    } finally {
      setAddingWishlist(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-3xl font-bold">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-24 text-3xl font-bold">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="grid lg:grid-cols-2 gap-12 p-10">

          {/* Image */}

          <div>

            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-[550px] object-cover rounded-3xl shadow-lg transition duration-500 ${
                product.stock > 0 ? "hover:scale-105" : ""
              }`}
            />

          </div>

          {/* Details */}

          <div>

            <p className="uppercase text-blue-600 font-semibold tracking-wider">

              {product.category}

            </p>

            <h1 className="text-5xl font-extrabold mt-3">

              {product.name}

            </h1>

            <p className="text-gray-500 mt-3 text-lg">

              Brand :
              <span className="font-semibold text-black ml-2">
                {product.brand}
              </span>

            </p>

            {/* Rating */}

            <div className="flex items-center gap-2 mt-6">

              <div className="flex text-yellow-400">

                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

              </div>

              <span className="text-gray-600">
                (5.0 Rating)
              </span>

            </div>

            {/* Price */}

            <div className="flex items-center gap-4 mt-8">

              <span className="text-5xl font-bold text-blue-600">

                ₹{product.price}

              </span>

              <span className="line-through text-gray-400 text-2xl">

                ₹{Math.floor(product.price * 1.25)}

              </span>

              <span className="bg-red-500 text-white px-3 py-1 rounded-full">

                20% OFF

              </span>

            </div>

            {/* Description */}

            <p className="text-gray-600 leading-8 mt-10">

              {product.description}

            </p>

            {/* Stock */}

            <div className="mt-8">

              {product.stock > 0 ? (

                <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">

                  In Stock : {product.stock}

                </span>

              ) : (

                <span className="bg-red-100 text-red-700 px-5 py-2 rounded-full">

                  Out of Stock

                </span>

              )}

            </div>

            {/* Features */}

            <div className="grid md:grid-cols-2 gap-5 mt-10">

              <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-4">

                <FaShippingFast className="text-blue-600 text-3xl" />

                <div>

                  <h3 className="font-bold">

                    Free Shipping

                  </h3>

                  <p className="text-sm text-gray-500">

                    Delivery in 2-4 Days

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-4">

                <FaShieldAlt className="text-green-600 text-3xl" />

                <div>

                  <h3 className="font-bold">

                    Secure Payment

                  </h3>

                  <p className="text-sm text-gray-500">

                    100% Protected

                  </p>

                </div>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex gap-5 mt-12">

              <button
                onClick={handleAddToCart}
                disabled={addingCart || product.stock === 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition"
              >

                <FaShoppingCart />

                {addingCart
                  ? "Adding..."
                  : "Add To Cart"}

              </button>

              <button
                onClick={handleWishlist}
                disabled={addingWishlist || product.stock === 0}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 rounded-xl flex items-center justify-center text-2xl transition"
              >

                <FaHeart />

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Reviews */}

      <div className="max-w-7xl mx-auto mt-16">

        <Reviews productId={product.id} />

      </div>

    </div>
  );
}

export default ProductDetails;