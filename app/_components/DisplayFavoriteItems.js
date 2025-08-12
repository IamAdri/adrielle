"use client";
import { useEffect, useState } from "react";
import { getShoesDetailsByFavoriteTable } from "../_lib/data-service";
import FavoriteItem from "./FavoriteItem";

function DisplayFavoriteItems({ currentUser }) {
  const [favoriteItems, setFavoriteItems] = useState([]);
  useEffect(() => {
    (async function loadFavoriteItemsDetails() {
      const favoriteItemsDetails = await getShoesDetailsByFavoriteTable(
        currentUser,
        localStorage.getItem("guestID")
      );
      setFavoriteItems(favoriteItemsDetails);
    })();
  }, []);
  return (
    <div className="flex sm:flex-wrap gap-5 py-15 px-75 md:px-25 sm:px-10 justify-center">
      {favoriteItems.length > 0 &&
        favoriteItems.map((favoriteItem) => {
          //console.log(favoriteItem);
          return (
            <FavoriteItem
              key={`${favoriteItem.shoes.name},${favoriteItem.selectedColor}`}
              favoriteItem={favoriteItem}
              currentUser={currentUser}
            />
          );
        })}
    </div>
  );
}

export default DisplayFavoriteItems;
