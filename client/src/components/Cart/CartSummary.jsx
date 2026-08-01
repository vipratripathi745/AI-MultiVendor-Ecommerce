import { Link } from "react-router-dom";
import {
  FaTag,
  FaShippingFast,
  FaLock,
} from "react-icons/fa";

function CartSummary({ total }) {
  const shipping = total > 999 ? 0 : 99;
  const discount = Math.floor(total * 0.1);

  const finalAmount =
    total + shipping - discount;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24">

      <h2 className="text-3xl font-bold mb-8">

        Order Summary

      </h2>

      {/* Coupon */}

      <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 mb-8">

        <FaTag className="text-blue-600 text-2xl" />

        <div>

          <h3 className="font-semibold">

            Coupon Applied

          </h3>

          <p className="text-gray-500 text-sm">

            Flat 10% Discount

          </p>

        </div>

      </div>

      {/* Price */}

      <div className="space-y-5">

        <div className="flex justify-between">

          <span className="text-gray-600">

            Subtotal

          </span>

          <span className="font-semibold">

            ₹{total}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-600">

            Discount

          </span>

          <span className="text-green-600 font-semibold">

            -₹{discount}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-600">

            Shipping

          </span>

          <span className="font-semibold">

            {shipping === 0
              ? "FREE"
              : `₹${shipping}`}

          </span>

        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold">

          <span>Total</span>

          <span className="text-blue-600">

            ₹{finalAmount}

          </span>

        </div>

      </div>

      {/* Shipping */}

      <div className="bg-green-50 rounded-xl p-5 mt-8 flex gap-4">

        <FaShippingFast className="text-4xl text-green-600" />

        <div>

          <h3 className="font-bold">

            Free Delivery

          </h3>

          <p className="text-gray-500 text-sm">

            On orders above ₹999

          </p>

        </div>

      </div>

      {/* Secure */}

      <div className="bg-gray-100 rounded-xl p-5 mt-5 flex gap-4">

        <FaLock className="text-3xl text-blue-600" />

        <div>

          <h3 className="font-bold">

            Secure Checkout

          </h3>

          <p className="text-sm text-gray-500">

            100% Secure Payment

          </p>

        </div>

      </div>

      {/* Button */}

      <Link to="/checkout">

        <button className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-xl font-bold transition">

          Proceed To Checkout

        </button>

      </Link>

    </div>
  );
}

export default CartSummary;