"use client";

import { createContext, useContext, useState } from "react";

const RatingContext = createContext();

function RatingProvider({ children }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  return (
    <RatingContext.Provider
      value={{ rating, setRating, reviewText, setReviewText }}
    >
      {children}
    </RatingContext.Provider>
  );
}

function useRating() {
  const context = useContext(RatingContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { RatingProvider, useRating };
