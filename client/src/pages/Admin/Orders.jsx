import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
      <div className="text-center py-20 text-3xl">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">
          Order Management
        </h1>

        <span className="bg-blue-600 text-white px-5 py-2 rounded-lg">
          Total Orders : {orders.length}
        </span>

      </div>

      <OrdersTable
        orders={orders}
        onStatusChange={
          handleStatusChange
        }
      />

    </div>
  );
}

export default Orders;