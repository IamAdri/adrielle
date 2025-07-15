"use client";
import { createContext, useContext, useState } from "react";

const ShoesParamsContext = createContext();

function ShoesParamsProvider({ children }) {
  const [itemCategory, setItemCategory] = useState("");

  return (
    <ShoesParamsContext.Provider value={{ itemCategory, setItemCategory }}>
      {children}
    </ShoesParamsContext.Provider>
  );
}

function useShoesParams() {
  const context = useContext(ShoesParamsContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ShoesParamsProvider, useShoesParams };
