import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getCart,
  updateCart,
  removeCartItem,
  clearCart,
} from "../../services/cartService";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCart();

      setCart(response.cart);

      setTotal(response.total);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantity = async (
    id,
    quantity
  ) => {
    if (quantity <= 0) return;

    try {
      await updateCart(id, quantity);

      fetchCart();
    } catch (error) {
      toast.error(
        error.response?.data?.message
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await removeCartItem(id);

      toast.success(response.message);

      fetchCart();
    } catch (error) {
      toast.error(
        error.response?.data?.message
      );
    }
  };

  const handleClearCart = async () => {
    const confirmDelete = window.confirm(
      "Clear Cart?"
    );

    if (!confirmDelete) return;

    try {
      const response = await clearCart();

      toast.success(response.message);

      fetchCart();
    } catch (error) {
      toast.error(
        error.response?.data?.message
      );
    }
  };

  if (loading) {
    return (
      <h2 className="text-center text-3xl mt-20">
        Loading Cart...
      </h2>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">
          Your Cart is Empty
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">
          Shopping Cart
        </h1>

        <button
          onClick={handleClearCart}
          className="bg-red-600 text-white px-6 py-3 rounded-lg"
        >
          Clear Cart
        </button>

      </div>

      <div className="space-y-6">

        {cart.map((item) => (

          <div
            key={item.id}
            className="bg-white shadow rounded-xl p-5 flex items-center justify-between"
          >

            <div className="flex items-center gap-5">

              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-lg object-cover"
              />

              <div>

                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                <p>
                  ₹{item.price}
                </p>

                <p>
                  Subtotal :
                  ₹{item.subtotal}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <button
                onClick={() =>
                  handleQuantity(
                    item.id,
                    item.quantity - 1
                  )
                }
                className="bg-gray-300 px-3 py-1 rounded"
              >
                -
              </button>

              <span className="text-xl">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  handleQuantity(
                    item.id,
                    item.quantity + 1
                  )
                }
                className="bg-gray-300 px-3 py-1 rounded"
              >
                +
              </button>

              <button
                onClick={() =>
                  handleDelete(item.id)
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-10 bg-white shadow rounded-xl p-8 flex justify-between">

        <h2 className="text-3xl font-bold">
          Total
        </h2>

        <h2 className="text-3xl font-bold text-blue-600">
          ₹{total}
        </h2>

      </div>

      <button
        className="mt-8 w-full bg-green-600 text-white py-4 rounded-xl text-xl"
      >
        Proceed To Checkout
      </button>

    </div>
  );
}

export default Cart;