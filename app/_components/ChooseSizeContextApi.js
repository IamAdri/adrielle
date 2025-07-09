"use client";

import { createContext, useContext, useState } from "react";

const ChooseSizeContext = createContext();

function ChooseSizeProvider({ children }) {
  const [clickedSize, setClickedSize] = useState("");
  const [isNotSelected, setIsNotSelected] = useState(false);

  return (
    <ChooseSizeContext.Provider
      value={{ clickedSize, setClickedSize, isNotSelected, setIsNotSelected }}
    >
      {children}
    </ChooseSizeContext.Provider>
  );
}

function useChooseSize() {
  const context = useContext(ChooseSizeContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ChooseSizeProvider, useChooseSize };
