"use client";

import { createContext, useContext, useState } from "react";

const CurrentUserEmailContext = createContext();

function CurrentUserEmailProvider({ children }) {
  const [isCurrentUser, setIsCurrentUser] = useState(0);
  const [guestIDIsRemoved, setGuestIDIsRemoved] = useState(false);

  return (
    <CurrentUserEmailContext.Provider
      value={{
        isCurrentUser,
        setIsCurrentUser,
        guestIDIsRemoved,
        setGuestIDIsRemoved,
      }}
    >
      {children}
    </CurrentUserEmailContext.Provider>
  );
}

function useCurrentUserEmail() {
  const context = useContext(CurrentUserEmailContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { CurrentUserEmailProvider, useCurrentUserEmail };
