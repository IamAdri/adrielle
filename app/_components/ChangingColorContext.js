"use client";

import { createContext, useContext, useState } from "react";

const ChangingColorContext = createContext();

function ChangingColorProvider({ children }) {
  const [colorSrc, setColorSrc] = useState("");
  const [clickedImage, setIsClickedImage] = useState("");

  return (
    <ChangingColorContext.Provider
      value={{ colorSrc, setColorSrc, clickedImage, setIsClickedImage }}
    >
      {children}
    </ChangingColorContext.Provider>
  );
}

function useChangingColor() {
  const context = useContext(ChangingColorContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ChangingColorProvider, useChangingColor };
