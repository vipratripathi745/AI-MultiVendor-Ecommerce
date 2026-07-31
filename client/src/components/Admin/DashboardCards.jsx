function DashboardCards({ dashboard }) {
  const cards = [
    {
      title: "Total Users",
      value: dashboard.total_users,
      color: "bg-blue-500",
    },
    {
      title: "Total Products",
      value: dashboard.total_products,
      color: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: dashboard.total_orders,
      color: "bg-yellow-500",
    },
    {
      title: "Total Revenue",
      value: `₹${dashboard.total_revenue}`,
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {cards.map((card, index) => (

        <div
          key={index}
          className={`${card.color} rounded-xl shadow-lg p-6 text-white`}
        >

          <h3 className="text-lg font-medium">
            {card.title}
          </h3>

          <h1 className="text-4xl font-bold mt-3">
            {card.value}
          </h1>

        </div>

      ))}

    </div>
  );
}

export default DashboardCards;