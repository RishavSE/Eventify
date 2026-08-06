import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);

  const registerSearchData = (category, data) => {
    setSearchData((prev) => {
      const filtered = prev.filter((item) => item.category !== category);

      const formatted = data.map((item) => ({
        ...item,
        category,
      }));

      return [...filtered, ...formatted];
    });
  };

  return (
    <SearchContext.Provider
      value={{
        searchData,
        registerSearchData,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);