"use client";

import { createContext, useContext, useState } from "react";

const CartItemsContext = createContext();

function CartItemsProvider({ children }) {
  const [isCart, setIsCart] = useState(0);
  return (
    <CartItemsContext.Provider value={{ isCart, setIsCart }}>
      {children}
    </CartItemsContext.Provider>
  );
}

function useCartItems() {
  const context = useContext(CartItemsContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { CartItemsProvider, useCartItems };
