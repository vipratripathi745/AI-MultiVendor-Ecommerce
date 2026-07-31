import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TopProductsChart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Top Selling Products
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 20,
            left: 40,
            bottom: 10,
          }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="name"
            width={150}
          />

          <Tooltip />

          <Bar
            dataKey="sold"
            fill="#2563eb"
            radius={[0, 8, 8, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default TopProductsChart;