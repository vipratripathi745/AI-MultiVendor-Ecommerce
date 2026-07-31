function RecentOrders({ orders }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-5">
        Recent Orders
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="py-3 text-left">
              Order
            </th>

            <th className="text-left">
              Customer
            </th>

            <th className="text-left">
              Amount
            </th>

            <th className="text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr
              key={order.id}
              className="border-b"
            >

              <td className="py-3">
                #{order.id}
              </td>

              <td>
                {order.name}
              </td>

              <td>
                ₹{order.total_amount}
              </td>

              <td className="font-semibold">
                {order.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentOrders;