"use client";
import { HeartIcon as OutlinedHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import {
  getFavoriteItems,
  insertFavoriteItem,
  removeFavoriteItem,
} from "../_lib/data-service";

function AddToFavorites({ itemName, selectedItem }) {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    async function loadFavoriteItems() {
      const favoriteItems = await getFavoriteItems();
      favoriteItems.map(
        (favorite) => favorite.name.includes(itemName) && setIsClicked(true)
      );
    }
    loadFavoriteItems();
  }, []);

  async function handleFavoriteItems() {
    setIsClicked(!isClicked);
    if (!isClicked) await insertFavoriteItem(itemName, selectedItem[0].id);
    if (isClicked) await removeFavoriteItem(itemName);
  }
  console.log(selectedItem[0].id);
  return (
    <button onClick={handleFavoriteItems} className="cursor-pointer">
      {isClicked ? (
        <SolidHeart className="size-10" />
      ) : (
        <OutlinedHeart className="size-10" />
      )}
    </button>
  );
}

export default AddToFavorites;
