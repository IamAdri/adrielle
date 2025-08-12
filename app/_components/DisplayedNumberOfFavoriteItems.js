"use client";

import { useEffect, useState } from "react";
import { useFavoriteItems } from "../_contextAPI/FavoriteItemsContextApi";
import { getFavoriteItems } from "../_lib/data-service";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";

function DisplayedNumberOfFavoriteItems({ currentUser }) {
  const { isFavorite, setIsFavorite } = useFavoriteItems();
  const { setIsCurrentUser, guestIDIsRemoved } = useCurrentUserEmail();

  useEffect(() => {
    setIsCurrentUser(currentUser);
    async function loadFavoriteItems() {
      //console.log(localStorage.getItem("guestID"));
      const favoriteItems = await getFavoriteItems(
        currentUser,
        localStorage.getItem("guestID")
      );
      //console.log(favoriteItems);
      setIsFavorite(favoriteItems.length);
    }
    loadFavoriteItems();
  }, [guestIDIsRemoved]);

  // console.log(isFavorite);
  return <span>{isFavorite > 0 && isFavorite}</span>;
}

export default DisplayedNumberOfFavoriteItems;
