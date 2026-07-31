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

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Customer
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-left">
              Amount
            </th>

            <th className="px-6 py-4 text-left">
              Payment
            </th>

            <th className="px-6 py-4 text-left">
              Address
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr
              key={order.id}
              className="border-t hover:bg-gray-50"
            >

              <td className="px-6 py-4 font-semibold">
                {order.name}
              </td>

              <td className="px-6 py-4">
                {order.email}
              </td>

              <td className="px-6 py-4 font-semibold text-blue-600">
                ₹{order.total_amount}
              </td>

              <td className="px-6 py-4">
                {order.payment_method}
              </td>

              <td className="px-6 py-4 max-w-xs">
                {order.shipping_address}
              </td>

              <td className="px-6 py-4">

                <select
                  value={order.status}
                  onChange={(e) =>
                    onStatusChange(
                      order.id,
                      e.target.value
                    )
                  }
                  className="border rounded-lg px-3 py-2"
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

              <td className="px-6 py-4">
                {new Date(
                  order.created_at
                ).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {orders.length === 0 && (

        <div className="text-center py-10 text-gray-500">

          No Orders Found

        </div>

      )}

    </div>
  );
}

export default OrdersTable;