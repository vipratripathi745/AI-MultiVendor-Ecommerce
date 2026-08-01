import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
  FaStar,
} from "react-icons/fa";

import {
  getWishlist,
  removeWishlistItem,
} from "../../services/wishlistService";

import { addToCart } from "../../services/cartService";
import EmptyState from "../../components/Common/EmptyState";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await getWishlist();
      setWishlist(response.wishlist);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await removeWishlistItem(productId);

      toast.success(response.message);

      setWishlist((prev) =>
        prev.filter(
          (item) => item.product_id !== productId
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove product"
      );
    }
  };

  const handleMoveToCart = async (productId) => {
    try {
      await addToCart(productId, 1);

      toast.success("Added to cart");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add to cart"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-3xl font-bold">
        Loading Wishlist...
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <EmptyState
        title="Your Wishlist is Empty"
        description="Save your favourite products here and access them anytime."
        buttonText="Browse Products"
        buttonLink="/"
      />
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          My Wishlist
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {wishlist.map((item) => (

            <div
              key={item.product_id}
              className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <div className="relative overflow-hidden">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                />

                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Wishlist
                </span>

              </div>

              <div className="p-6">

                <p className="uppercase text-gray-400 text-sm">

                  {item.brand}

                </p>

                <h2 className="text-2xl font-bold mt-2">

                  {item.name}

                </h2>

                <div className="flex items-center gap-1 mt-3 text-yellow-400">

                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />

                  <span className="text-gray-600 ml-2">
                    5.0
                  </span>

                </div>

                <h3 className="text-3xl text-blue-600 font-bold mt-5">

                  ₹{item.price}

                </h3>

                <div className="grid grid-cols-2 gap-3 mt-6">

                  <button
                    onClick={() =>
                      handleMoveToCart(item.product_id)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
                  >

                    <FaShoppingCart />

                    Cart

                  </button>

                  <button
                    onClick={() =>
                      handleRemove(item.product_id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
                  >

                    <FaTrash />

                    Remove

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Wishlist;