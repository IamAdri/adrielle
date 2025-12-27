"use client";
import { useEffect, useRef, useState } from "react";
import { getItemsDetailsByFavoriteTable } from "../_lib/data-service";
import FavoriteItem from "./FavoriteItem";
import { supabase } from "../_lib/supabase";
import { useFavoriteItems } from "../_contextAPI/FavoriteItemsContextApi";

function DisplayFavoriteItems({ currentUser }) {
  const { isFavorite, setIsFavorite } = useFavoriteItems();
  const [favoriteItems, setFavoriteItems] = useState([]);
  //Load favorite items of active user
  async function loadFavoriteItemsDetails() {
    const favoriteItemsDetails = await getItemsDetailsByFavoriteTable(
      currentUser,
      localStorage.getItem("guestID")
    );
    setFavoriteItems(favoriteItemsDetails);
    setIsFavorite(favoriteItemsDetails.length);
  }
  useEffect(() => {
    loadFavoriteItemsDetails();
  }, []);

  //Update cart items when making changes in items table
  useEffect(() => {
    const channel = supabase
      .channel("favoriteItems")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "favorites",
        },
        () => {
          loadFavoriteItemsDetails();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return (
    <div className="flex flex-wrap gap-5 py-15 lg:px-35 md:px-25 px-10 justify-center">
      {favoriteItems.length > 0 &&
        favoriteItems.map((favoriteItem) => {
          return (
            <FavoriteItem
              key={`${favoriteItem.items.name},${favoriteItem.selectedColor}`}
              favoriteItem={favoriteItem}
              currentUser={currentUser}
            />
          );
        })}
    </div>
  );
}

export default DisplayFavoriteItems;
