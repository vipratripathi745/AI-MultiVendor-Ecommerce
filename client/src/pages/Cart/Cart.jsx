import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaTrash,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

import {
  getCart,
  updateCart,
  removeCartItem,
  clearCart,
} from "../../services/cartService";

import CartSummary from "../../components/Cart/CartSummary";
import EmptyState from "../../components/Common/EmptyState";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await getCart();

      setCart(response.cart || []);
      setTotal(Number(response.total) || 0);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantity = async (
    id,
    quantity
  ) => {
    if (quantity < 1) return;

    try {
      setUpdatingId(id);

      await updateCart(id, quantity);

      await fetchCart();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update cart"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response =
        await removeCartItem(id);

      toast.success(response.message);

      await fetchCart();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove item"
      );
    }
  };

  const handleClearCart = async () => {
    if (
      !window.confirm(
        "Are you sure you want to clear your cart?"
      )
    )
      return;

    try {
      const response = await clearCart();

      toast.success(response.message);

      setCart([]);
      setTotal(0);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to clear cart"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-3xl font-bold">
        Loading Cart...
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <EmptyState
        title="Your Cart is Empty"
        description="Looks like you haven't added any products yet."
        buttonText="Continue Shopping"
        buttonLink="/"
      />
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold">
            Shopping Cart
          </h1>

          <button
            onClick={handleClearCart}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
          >
            Clear Cart
          </button>

        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left */}

          <div className="lg:col-span-2 space-y-6">

            {cart.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 rounded-xl object-cover"
                />

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    ₹{item.price}
                  </p>

                  <p className="mt-3 font-semibold text-blue-600">
                    Subtotal : ₹{item.subtotal}
                  </p>

                </div>

                {/* Quantity */}

                <div className="flex flex-col items-center gap-4">

                  <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">

                    <button
                      disabled={updatingId === item.id}
                      onClick={() =>
                        handleQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                      className="px-4 py-3 hover:bg-gray-200 disabled:opacity-50"
                    >
                      <FaMinus />
                    </button>

                    <span className="px-5 font-bold">
                      {item.quantity}
                    </span>

                    <button
                      disabled={updatingId === item.id}
                      onClick={() =>
                        handleQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                      className="px-4 py-3 hover:bg-gray-200 disabled:opacity-50"
                    >
                      <FaPlus />
                    </button>

                  </div>

                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
                  >

                    <FaTrash />

                    Remove

                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* Right */}

          <CartSummary total={total} />

        </div>

      </div>

    </div>
  );
}

export default Cart;