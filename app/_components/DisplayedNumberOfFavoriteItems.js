"use client";
import { useEffect, useState } from "react";
import { useFavoriteItems } from "../_contextAPI/FavoriteItemsContextApi";
import { getFavoriteItems } from "../_lib/data-service";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";
import { useRealTimeSubscription } from "../_customHooks/useRealTimeSubscription";
import { supabase } from "../_lib/supabase";

function DisplayedNumberOfFavoriteItems({ currentUser }) {
  const { isFavorite, setIsFavorite } = useFavoriteItems();
  const { setIsCurrentUser, guestIDIsRemoved } = useCurrentUserEmail();
  //Get number of favorite products of active user
  async function loadFavoriteItems() {
    const favoriteItems = await getFavoriteItems(
      currentUser,
      localStorage.getItem("guestID")
    );
    setIsFavorite(favoriteItems.length);
  }
  useEffect(() => {
    setIsCurrentUser(currentUser);
    loadFavoriteItems();
  }, [guestIDIsRemoved]);

  return <span>{isFavorite > 0 && isFavorite}</span>;
}

export default DisplayedNumberOfFavoriteItems;
