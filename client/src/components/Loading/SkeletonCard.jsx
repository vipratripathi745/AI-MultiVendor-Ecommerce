function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">

      <div className="h-60 bg-gray-300"></div>

      <div className="p-5">

        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>

        <div className="h-4 w-full bg-gray-200 rounded mt-4"></div>

        <div className="h-4 w-5/6 bg-gray-200 rounded mt-2"></div>

        <div className="flex justify-between items-center mt-6">

          <div className="h-7 w-20 bg-gray-300 rounded"></div>

          <div className="h-10 w-28 bg-gray-300 rounded-lg"></div>

        </div>

      </div>

    </div>
  );
}

export default SkeletonCard;