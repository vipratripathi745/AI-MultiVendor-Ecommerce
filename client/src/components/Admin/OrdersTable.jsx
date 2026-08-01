import {
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";

import EmptyState from "../Common/EmptyState";

function OrdersTable({
  orders,
  onStatusChange,
}) {
  const statusOptions = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No Orders Found"
        description="Orders placed by customers will appear here."
      />
    );
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-6 py-5 text-left">
              Customer
            </th>

            <th className="px-6 py-5 text-left">
              Amount
            </th>

            <th className="px-6 py-5 text-left">
              Payment
            </th>

            <th className="px-6 py-5 text-left">
              Address
            </th>

            <th className="px-6 py-5 text-left">
              Status
            </th>

            <th className="px-6 py-5 text-left">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr
              key={order.id}
              className="border-b hover:bg-gray-50 transition"
            >

              {/* Customer */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">

                    <FaUser />

                  </div>

                  <div>

                    <h3 className="font-bold">
                      {order.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {order.email}
                    </p>

                  </div>

                </div>

              </td>

              {/* Amount */}

              <td className="px-6 py-5">

                <span className="text-xl font-bold text-green-600">
                  ₹{order.total_amount}
                </span>

              </td>

              {/* Payment */}

              <td className="px-6 py-5">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.payment_method === "ONLINE"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.payment_method}
                </span>

              </td>

              {/* Address */}

              <td className="px-6 py-5">

                <div className="flex items-start gap-2 max-w-xs">

                  <FaMapMarkerAlt className="text-red-500 mt-1" />

                  <span className="text-sm text-gray-700">
                    {order.shipping_address}
                  </span>

                </div>

              </td>

              {/* Status */}

              <td className="px-6 py-5">

                <select
                  value={order.status}
                  onChange={(e) =>
                    onStatusChange(
                      order.id,
                      e.target.value
                    )
                  }
                  className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                >

                  {statusOptions.map((status) => (

                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>

                  ))}

                </select>

              </td>

              {/* Date */}

              <td className="px-6 py-5 text-gray-600">

                {new Date(
                  order.created_at
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default OrdersTable;