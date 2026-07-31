import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getWishlist,
  removeWishlistItem,
} from "../../services/wishlistService";

import { addToCart } from "../../services/cartService";

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
        prev.filter((item) => item.product_id !== productId)
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
      <div className="text-center py-20 text-3xl">
        Loading Wishlist...
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">
          Your Wishlist is Empty
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">
        My Wishlist
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {wishlist.map((item) => (

          <div
            key={item.product_id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60 object-cover"
            />

            <div className="p-5">

              <h2 className="text-2xl font-bold">
                {item.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {item.brand}
              </p>

              <p className="text-blue-600 text-2xl font-bold mt-5">
                ₹{item.price}
              </p>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() =>
                    handleMoveToCart(item.product_id)
                  }
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg"
                >
                  Add To Cart
                </button>

                <button
                  onClick={() =>
                    handleRemove(item.product_id)
                  }
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg"
                >
                  Remove
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Wishlist;