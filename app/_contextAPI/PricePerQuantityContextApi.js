"use client";

import { createContext, useContext, useState } from "react";

const PricePerQuantityContext = createContext();

function PricePerQuantityProvider({ children }) {
  const [isQuantityChanged, setIsQuantityChanged] = useState(0);
  const [isPriceArrayChanged, setIsPriceArrayChanged] = useState([]);
  // console.log(isQuantityChanged);
  return (
    <PricePerQuantityContext.Provider
      value={{ isQuantityChanged, setIsQuantityChanged }}
    >
      {children}
    </PricePerQuantityContext.Provider>
  );
}

function usePricePerQuantity() {
  const context = useContext(PricePerQuantityContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { PricePerQuantityProvider, usePricePerQuantity };
