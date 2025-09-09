"use client";
import { createContext, useContext, useState } from "react";

const CategoryParamsContext = createContext();

function CategoryParamsProvider({ children }) {
  const [itemCategory, setItemCategory] = useState("");
  // console.log(itemCategory);
  return (
    <CategoryParamsContext.Provider value={{ itemCategory, setItemCategory }}>
      {children}
    </CategoryParamsContext.Provider>
  );
}

function useCategoryParams() {
  const context = useContext(CategoryParamsContext);
  if (context === undefined)
    throw new Error("Context was used outside provider for category.");
  return context;
}

export { CategoryParamsProvider, useCategoryParams };
