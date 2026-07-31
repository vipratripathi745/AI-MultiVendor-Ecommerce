import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getOrder } from "../../services/orderService";

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

  if (loading) {
    return (
      <div className="text-center py-20 text-3xl">
        Loading Order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20 text-3xl">
        Order Not Found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Order Details
      </h1>

      {/* Order Information */}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          Order Information
        </h2>

        <div className="space-y-3">

          <p>
            <span className="font-semibold">
              Order ID :
            </span>{" "}
            #{order.id}
          </p>

          <p>
            <span className="font-semibold">
              Status :
            </span>

            <span
              className={`ml-2 font-bold ${
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

          <p>
            <span className="font-semibold">
              Payment :
            </span>{" "}
            {order.payment_method}
          </p>

          <p>
            <span className="font-semibold">
              Shipping Address :
            </span>{" "}
            {order.shipping_address}
          </p>

          <p>
            <span className="font-semibold">
              Order Date :
            </span>{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-6">
            Total : ₹{order.total_amount}
          </h2>

        </div>

      </div>

      {/* Ordered Products */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Ordered Products
        </h2>

        <div className="space-y-5">

          {items.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between border rounded-xl p-4"
            >

              <div className="flex items-center gap-5">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div>

                  <h3 className="text-xl font-bold">
                    {item.name}
                  </h3>

                  <p className="text-gray-500">
                    {item.brand}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p>
                  Qty :
                  <span className="font-semibold ml-2">
                    {item.quantity}
                  </span>
                </p>

                <p className="text-blue-600 font-bold text-xl mt-2">
                  ₹{item.price}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;