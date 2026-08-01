import { useSearch } from "../../context/SearchContext";

function SortDropdown() {
  const { sortBy, setSortBy } = useSearch();

  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="border rounded-xl px-4 py-3 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
    >
      <option value="default">Sort By</option>
      <option value="price-low">Price : Low → High</option>
      <option value="price-high">Price : High → Low</option>
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
    </select>
  );
}

export default SortDropdown;