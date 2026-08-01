function StatCard({
  title,
  value,
  color = "bg-blue-600",
  icon,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      <div className={`${color} h-2`} />

      <div className="p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm uppercase tracking-wide">
              {title}
            </p>

            <h2 className="text-4xl font-bold mt-4">
              {value}
            </h2>

          </div>

          <div
            className={`${color} text-white text-3xl w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg`}
          >
            {icon}
          </div>

        </div>

      </div>

    </div>
  );
}

export default StatCard;