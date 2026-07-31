import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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
    const confirmCancel = window.confirm(
      "Cancel this order?"
    );

    if (!confirmCancel) return;

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

  if (loading) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading Orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">
          No Orders Found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-white shadow-lg rounded-xl p-6"
          >

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold">
                  Order #{order.id}
                </h2>

                <p className="text-gray-500 mt-2">
                  {new Date(
                    order.created_at
                  ).toLocaleString()}
                </p>

                <p className="mt-2">
                  Payment :
                  <span className="font-semibold ml-2">
                    {order.payment_method}
                  </span>
                </p>

                <p className="mt-2">
                  Status :

                  <span
                    className={`ml-2 font-semibold ${
                      order.status === "Pending"
                        ? "text-yellow-600"
                        : order.status === "Cancelled"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {order.status}
                  </span>

                </p>

              </div>

              <div className="text-right">

                <h2 className="text-3xl font-bold text-blue-600">
                  ₹{order.total_amount}
                </h2>

                <div className="flex gap-3 mt-5">

                  <Link
                    to={`/orders/${order.id}`}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                  >
                    View
                  </Link>

                  {order.status === "Pending" && (

                    <button
                      onClick={() =>
                        handleCancel(order.id)
                      }
                      className="bg-red-600 text-white px-5 py-2 rounded-lg"
                    >
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
  );
}

export default MyOrders;