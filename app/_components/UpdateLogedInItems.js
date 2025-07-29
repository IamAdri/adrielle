"use client";

import { useEffect } from "react";
import {
  updateNotLogedInCartItems,
  updateNotLogedInFavoriteItems,
} from "../_lib/data-service";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";

function UpdateLogedInItems({ currentUser }) {
  console.log(currentUser);
  const { setGuestIDIsRemoved } = useCurrentUserEmail();

  useEffect(() => {
    async function updateItems() {
      await updateNotLogedInFavoriteItems(
        currentUser,
        localStorage.getItem("guestID")
      );
      await updateNotLogedInCartItems(
        currentUser,
        localStorage.getItem("guestID")
      );
      if (currentUser !== "not logged in") {
        localStorage.removeItem("guestID");
        setGuestIDIsRemoved(true);
      }
    }
    updateItems();
  }, [currentUser]);

  return null;
}

export default UpdateLogedInItems;
