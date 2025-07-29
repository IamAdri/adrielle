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
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";

function AddToFavorites({
  currentUser,
  name,
  itemID,
  position = "relative",
  size = 10,
}) {
  const { isFavorite, setIsFavorite } = useFavoriteItems();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    async function loadFavoriteItems() {
      const favoriteItems = await getFavoriteItems(
        currentUser,
        localStorage.getItem("guestID")
      );
      favoriteItems.map((favorite) => {
        if (favorite.favorite_id === itemID) setIsClicked(true);
      });
    }
    loadFavoriteItems();
  }, []);
  //console.log(currentUser);

  useEffect(() => {
    async function loadFavoriteItems() {
      const favoriteItems = await getFavoriteItems(
        currentUser,
        localStorage.getItem("guestID")
      );
      setIsFavorite(favoriteItems.length);
    }
    loadFavoriteItems();
  }, [isFavorite, setIsFavorite, isClicked, setIsClicked]);

  async function handleFavoriteItems(e) {
    setIsClicked(!isClicked);
    if (!isClicked) {
      // console.log(currentUser);
      await insertFavoriteItem(
        name,
        itemID,
        currentUser,
        localStorage.getItem("guestID")
      );
      const updatedArray = await getFavoriteItems(
        currentUser,
        localStorage.getItem("guestID")
      );
      console.log(updatedArray);
      setIsFavorite(updatedArray.length);
    }
    if (isClicked) {
      await removeFavoriteItem(
        name,
        currentUser,
        localStorage.getItem("guestID")
      );
      const updatedArray = await getFavoriteItems(
        currentUser,
        localStorage.getItem("guestID")
      );
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
