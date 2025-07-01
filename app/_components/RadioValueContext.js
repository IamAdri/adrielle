"use client";

import { createContext, useContext, useState } from "react";

const RadioValueContext = createContext();

function RadioValueProvider({ children }) {
  const [radioValue, setRadioValue] = useState("");

  return (
    <RadioValueContext.Provider value={{ radioValue, setRadioValue }}>
      {children}
    </RadioValueContext.Provider>
  );
}

function useRadioValue() {
  const context = useContext(RadioValueContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { RadioValueProvider, useRadioValue };
