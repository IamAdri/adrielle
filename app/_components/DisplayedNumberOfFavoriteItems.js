"use client";
import { useEffect } from "react";
import { useFavoriteItems } from "../_contextAPI/FavoriteItemsContextApi";
import { getFavoriteItems } from "../_lib/data-service";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";

function DisplayedNumberOfFavoriteItems({ currentUser }) {
  const { isFavorite, setIsFavorite } = useFavoriteItems();
  const { setIsCurrentUser, guestIDIsRemoved } = useCurrentUserEmail();
  //Get number of favorite products of active user
  useEffect(() => {
    setIsCurrentUser(currentUser);
    async function loadFavoriteItems() {
      const favoriteItems = await getFavoriteItems(
        currentUser,
        localStorage.getItem("guestID")
      );
      setIsFavorite(favoriteItems.length);
    }
    loadFavoriteItems();
  }, [guestIDIsRemoved]);

  return <span>{isFavorite > 0 && isFavorite}</span>;
}

export default DisplayedNumberOfFavoriteItems;
