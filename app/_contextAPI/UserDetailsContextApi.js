"use client";
import { createContext, useContext, useState } from "react";

const UserDetailsContext = createContext();

function UserDetailsProvider({ children }) {
  const [userDetails, setUserDetails] = useState("");
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

function useUserDetails() {
  const context = useContext(UserDetailsContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { UserDetailsProvider, useUserDetails };
