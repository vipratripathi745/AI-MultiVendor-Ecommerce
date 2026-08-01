import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaBox,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";

import { getOrderDetails } from "../../services/orderService";

function OrderDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await getOrder(id);

      setOrder(response.order);
      setItems(response.items);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load order"
      );
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-indigo-100 text-indigo-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-3xl font-bold">
        Loading Order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-24 text-3xl font-bold">
        Order Not Found
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          Order Details
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-8">

            {/* Order Info */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-3xl font-bold mb-8">
                Order Information
              </h2>

              <div className="space-y-5">

                <div className="flex items-center gap-3">

                  <FaBox className="text-blue-600" />

                  <span className="font-semibold">
                    Order ID :
                  </span>

                  #{order.id}

                </div>

                <div className="flex items-center gap-3">

                  <FaCalendarAlt className="text-orange-500" />

                  {new Date(
                    order.created_at
                  ).toLocaleString()}

                </div>

                <div className="flex items-center gap-3">

                  <FaCreditCard className="text-green-600" />

                  {order.payment_method}

                </div>

                <div className="flex items-start gap-3">

                  <FaMapMarkerAlt className="text-red-600 mt-1" />

                  <span>
                    {order.shipping_address}
                  </span>

                </div>

                <span
                  className={`inline-block px-4 py-2 rounded-full font-semibold ${statusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

              </div>

            </div>

            {/* Products */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-3xl font-bold mb-8">
                Ordered Products
              </h2>

              <div className="space-y-6">

                {items.map((item) => (

                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center gap-6 border rounded-2xl p-5 hover:shadow-md transition"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 rounded-xl object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="text-2xl font-bold">
                        {item.name}
                      </h3>

                      <p className="text-gray-500 mt-2">
                        {item.brand}
                      </p>

                      <p className="mt-3">
                        Quantity :

                        <span className="font-bold ml-2">

                          {item.quantity}

                        </span>

                      </p>

                    </div>

                    <h2 className="text-3xl font-bold text-blue-600">

                      ₹{item.price}

                    </h2>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24">

              <h2 className="text-3xl font-bold mb-8">

                Payment Summary

              </h2>

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span>Total Amount</span>

                  <span className="font-semibold">

                    ₹{order.total_amount}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Payment</span>

                  <span>

                    {order.payment_method}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Status</span>

                  <span>

                    {order.status}

                  </span>

                </div>

                <hr />

                <div className="flex items-center gap-3 text-green-600 font-semibold">

                  <FaCheckCircle />

                  Secure Order

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;