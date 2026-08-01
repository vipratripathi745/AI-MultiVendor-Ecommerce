import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        category,
        setCategory,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}