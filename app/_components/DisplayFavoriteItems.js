"use client";
import { useEffect, useState } from "react";
import { getItemsDetailsByFavoriteTable } from "../_lib/data-service";
import FavoriteItem from "./FavoriteItem";

function DisplayFavoriteItems({ currentUser }) {
  const [favoriteItems, setFavoriteItems] = useState([]);
  //Load favorite items of active user
  useEffect(() => {
    (async function loadFavoriteItemsDetails() {
      const favoriteItemsDetails = await getItemsDetailsByFavoriteTable(
        currentUser,
        localStorage.getItem("guestID")
      );
      setFavoriteItems(favoriteItemsDetails);
    })();
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
