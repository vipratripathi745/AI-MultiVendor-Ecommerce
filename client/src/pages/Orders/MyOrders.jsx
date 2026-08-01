import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaCreditCard,
  FaEye,
  FaTimesCircle,
} from "react-icons/fa";

import {
  getMyOrders,
  cancelOrder,
} from "../../services/orderService";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getMyOrders();
      setOrders(response.orders);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this order?")) return;

    try {
      const response = await cancelOrder(id);

      toast.success(response.message);

      fetchOrders();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to cancel order"
      );
    }
  };

  const getStatusColor = (status) => {
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
        Loading Orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center">

        <FaBoxOpen className="text-7xl text-gray-400 mb-5" />

        <h1 className="text-5xl font-bold">
          No Orders Yet
        </h1>

        <p className="text-gray-500 mt-4 text-lg">
          Your orders will appear here.
        </p>

      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          My Orders
        </h1>

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition"
            >

              <div className="flex flex-col lg:flex-row justify-between gap-8">

                {/* Left */}

                <div className="space-y-4">

                  <h2 className="text-3xl font-bold">
                    Order #{order.id}
                  </h2>

                  <div className="flex items-center gap-3 text-gray-600">

                    <FaCalendarAlt />

                    <span>
                      {new Date(
                        order.created_at
                      ).toLocaleString()}
                    </span>

                  </div>

                  <div className="flex items-center gap-3 text-gray-600">

                    <FaCreditCard />

                    <span>
                      {order.payment_method}
                    </span>

                  </div>

                  <span
                    className={`inline-block px-4 py-2 rounded-full font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                </div>

                {/* Right */}

                <div className="flex flex-col items-end justify-between">

                  <h2 className="text-4xl font-bold text-blue-600">
                    ₹{order.total_amount}
                  </h2>

                  <div className="flex gap-4 mt-8">

                    <Link
                      to={`/orders/${order.id}`}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
                    >

                      <FaEye />

                      View

                    </Link>

                    {order.status ===
                      "Pending" && (

                      <button
                        onClick={() =>
                          handleCancel(order.id)
                        }
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition"
                      >

                        <FaTimesCircle />

                        Cancel

                      </button>

                    )}

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default MyOrders;