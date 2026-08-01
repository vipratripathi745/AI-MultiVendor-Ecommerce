import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        category,
        setCategory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}