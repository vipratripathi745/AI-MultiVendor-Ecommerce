function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-12">

      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="px-5 py-2 rounded-lg bg-white shadow hover:bg-blue-600 hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-black transition"
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (

        <button
          key={index}
          onClick={() =>
            onPageChange(index + 1)
          }
          className={`w-11 h-11 rounded-lg font-semibold transition

          ${
            currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "bg-white shadow hover:bg-blue-600 hover:text-white"
          }`}
        >
          {index + 1}
        </button>

      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="px-5 py-2 rounded-lg bg-white shadow hover:bg-blue-600 hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-black transition"
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;