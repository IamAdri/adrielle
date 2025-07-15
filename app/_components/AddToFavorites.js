"use client";
import { HeartIcon as OutlinedHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import {
  getFavoriteItems,
  insertFavoriteItem,
  removeFavoriteItem,
} from "../_lib/data-service";
import { useFavoriteItems } from "../_contextAPI/FavoriteItemsContextApi";

function AddToFavorites({ name, itemID, position = "relative", size = 10 }) {
  const { isFavorite, setIsFavorite } = useFavoriteItems();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    async function loadFavoriteItems() {
      const favoriteItems = await getFavoriteItems();
      favoriteItems.map((favorite) => {
        if (favorite.favorite_id === itemID) setIsClicked(true);
      });
    }
    loadFavoriteItems();
  }, []);

  useEffect(() => {
    async function loadFavoriteItems() {
      const favoriteItems = await getFavoriteItems();
      setIsFavorite(favoriteItems.length);
    }
    loadFavoriteItems();
  }, [isFavorite, setIsFavorite, isClicked, setIsClicked]);

  async function handleFavoriteItems(e) {
    setIsClicked(!isClicked);
    if (!isClicked) {
      await insertFavoriteItem(name, itemID);
      const updatedArray = await getFavoriteItems();
      setIsFavorite(updatedArray.length);
    }
    if (isClicked) {
      await removeFavoriteItem(name);
      const updatedArray = await getFavoriteItems();
      setIsFavorite(updatedArray.length);
    }
  }

  const positionOptions = {
    relative: "relative",
    absolute: "absolute",
  };
  const sizeOptions = {
    10: "size-10",
    7: "size-7",
  };
  return (
    <button
      onClick={handleFavoriteItems}
      className={`${positionOptions[position]} cursor-pointer right-0`}
    >
      {isClicked ? (
        <SolidHeart className={`${sizeOptions[size]}`} />
      ) : (
        <OutlinedHeart className={`${sizeOptions[size]}`} />
      )}
    </button>
  );
}

export default AddToFavorites;
