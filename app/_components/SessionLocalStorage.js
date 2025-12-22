"use client";
import { useEffect } from "react";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";

function SessionLocalStorage({ currentUser }) {
  const { setGuestIDIsRemoved } = useCurrentUserEmail();
  //Set guest ID in local storage when an user is not loged in
  useEffect(() => {
    if (currentUser === "not loged in" && !localStorage.getItem("guestID")) {
      localStorage.setItem("guestID", crypto.randomUUID());
      setGuestIDIsRemoved(false);
    }
  }, [currentUser]);

  return null;
}

export default SessionLocalStorage;
