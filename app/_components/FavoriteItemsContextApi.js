"use client";

import { createContext, useContext, useState } from "react";

const FavoriteItemsContext = createContext();

function FavoriteItemsProvider({ children }) {
  const [isFavorite, setIsFavorite] = useState(0);
  return (
    <FavoriteItemsContext.Provider value={{ isFavorite, setIsFavorite }}>
      {children}
    </FavoriteItemsContext.Provider>
  );
}

function useFavoriteItems() {
  const context = useContext(FavoriteItemsContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { FavoriteItemsProvider, useFavoriteItems };
