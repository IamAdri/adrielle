"use client";

import { useEffect } from "react";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";

function SessionLocalStorage({ currentUser }) {
  const { setGuestIDIsRemoved } = useCurrentUserEmail();
  console.log(currentUser);
  useEffect(() => {
    if (currentUser === "not loged in") {
      localStorage.setItem("guestID", crypto.randomUUID());
      setGuestIDIsRemoved(false);
    }
  }, [currentUser]);

  return null;
}

export default SessionLocalStorage;
