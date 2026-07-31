import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { checkout } from "../../services/orderService";

function Checkout() {
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await checkout({
        payment_method: paymentMethod,
        shipping_address: shippingAddress,
      });

      toast.success(response.message);

      navigate("/orders");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Checkout failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-10">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 space-y-6"
      >

        <div>

          <label className="font-semibold">
            Shipping Address
          </label>

          <textarea
            rows="5"
            required
            value={shippingAddress}
            onChange={(e) =>
              setShippingAddress(e.target.value)
            }
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-semibold">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option value="COD">
              Cash On Delivery
            </option>

            <option value="ONLINE">
              Online Payment
            </option>

          </select>

        </div>

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg text-lg"
        >
          {loading
            ? "Placing Order..."
            : "Place Order"}
        </button>

      </form>

    </div>
  );
}

export default Checkout;