import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";

import {
  getAdminOrders,
  updateOrderStatus,
} from "../../services/adminOrderService";

import OrdersTable from "../../components/Admin/OrdersTable";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getAdminOrders();

      setOrders(response.orders);
    } catch (error) {
      console.error(error);

      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      const response =
        await updateOrderStatus(
          id,
          status
        );

      toast.success(response.message);

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? {
                ...order,
                status,
              }
            : order
        )
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update order"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-3xl font-bold">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold flex items-center gap-4">

              <FaShoppingCart className="text-purple-600" />

              Order Management

            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Track, monitor and update all customer orders.
            </p>

          </div>

          <div className="mt-5 md:mt-0 bg-purple-600 text-white px-8 py-4 rounded-2xl shadow-lg">

            <p className="text-sm uppercase tracking-wide">
              Total Orders
            </p>

            <h2 className="text-3xl font-bold">
              {orders.length}
            </h2>

          </div>

        </div>

        {/* Orders Table */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <OrdersTable
            orders={orders}
            onStatusChange={
              handleStatusChange
            }
          />

        </div>

      </div>

    </div>
  );
}

export default Orders;