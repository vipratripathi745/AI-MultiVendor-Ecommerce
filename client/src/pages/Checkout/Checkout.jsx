import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaTruck,
  FaLock,
} from "react-icons/fa";

import { checkout } from "../../services/orderService";

function Checkout() {
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [loading, setLoading] =
    useState(false);

  const subtotal = 199999;
  const shipping = 0;
  const discount = 10000;

  const total =
    subtotal - discount + shipping;

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
          "Checkout Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">

          Checkout

        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 gap-10"
        >

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-8">

            {/* Address */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <div className="flex items-center gap-3 mb-6">

                <FaMapMarkerAlt className="text-blue-600 text-2xl"/>

                <h2 className="text-2xl font-bold">

                  Shipping Address

                </h2>

              </div>

              <textarea
                rows="6"
                required
                value={shippingAddress}
                onChange={(e)=>
                  setShippingAddress(e.target.value)
                }
                placeholder="Enter complete delivery address..."
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-600 outline-none"
              />

            </div>

            {/* Payment */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <div className="flex items-center gap-3 mb-6">

                <FaCreditCard className="text-green-600 text-2xl"/>

                <h2 className="text-2xl font-bold">

                  Payment Method

                </h2>

              </div>

              <div className="space-y-5">

                <label className="flex items-center gap-4 border rounded-xl p-4 cursor-pointer hover:border-blue-500">

                  <input
                    type="radio"
                    checked={paymentMethod==="COD"}
                    onChange={()=>
                      setPaymentMethod("COD")
                    }
                  />

                  <FaMoneyBillWave className="text-green-600 text-2xl"/>

                  Cash On Delivery

                </label>

                <label className="flex items-center gap-4 border rounded-xl p-4 cursor-pointer hover:border-blue-500">

                  <input
                    type="radio"
                    checked={paymentMethod==="ONLINE"}
                    onChange={()=>
                      setPaymentMethod("ONLINE")
                    }
                  />

                  <FaCreditCard className="text-blue-600 text-2xl"/>

                  Online Payment

                </label>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24">

              <h2 className="text-3xl font-bold mb-8">

                Order Summary

              </h2>

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span>Subtotal</span>

                  <span>₹{subtotal}</span>

                </div>

                <div className="flex justify-between">

                  <span>Discount</span>

                  <span className="text-green-600">

                    -₹{discount}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Shipping</span>

                  <span className="text-green-600">

                    FREE

                  </span>

                </div>

                <hr/>

                <div className="flex justify-between text-2xl font-bold">

                  <span>Total</span>

                  <span className="text-blue-600">

                    ₹{total}

                  </span>

                </div>

              </div>

              {/* Features */}

              <div className="mt-8 space-y-4">

                <div className="flex gap-3 items-center">

                  <FaTruck className="text-green-600"/>

                  <span>Free Delivery</span>

                </div>

                <div className="flex gap-3 items-center">

                  <FaLock className="text-blue-600"/>

                  <span>100% Secure Checkout</span>

                </div>

              </div>

              <button
                disabled={loading}
                className="w-full mt-10 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-xl font-bold transition"
              >

                {loading
                  ? "Placing Order..."
                  : "Place Order"}

              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Checkout;