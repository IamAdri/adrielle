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
import { useChangingColor } from "../_contextAPI/ChangingColorContextApi";
import { colorsAvailableFunction } from "../_lib/helper";
import { supabase } from "../_lib/supabase";

function AddToFavorites({
  currentUser,
  name,
  item,
  position = "relative",
  size = 10,
}) {
  const { isFavorite, setIsFavorite } = useFavoriteItems();
  const [isClicked, setIsClicked] = useState(false);
  const [isError, setIsError] = useState(false);
  const { colorSrc, clickedImage } = useChangingColor();
  const { colorsAvailable, mainColorImage, secondColorGallery } =
    colorsAvailableFunction(item);
  //Detect which color of product was displayed when user added product to favorites
  const displayedImageInFavorite = colorSrc !== "" ? colorSrc : mainColorImage;
  const chooseColor = secondColorGallery.includes(displayedImageInFavorite)
    ? colorsAvailable[1]
    : colorsAvailable[0];
  async function loadFavoriteItems() {
    const favoriteItems = await getFavoriteItems(
      currentUser,
      localStorage.getItem("guestID")
    );
    setIsFavorite(favoriteItems.length);
    const favoriteExists = favoriteItems.some(
      (favorite) =>
        favorite.favorite_id === item.id &&
        favorite.selectedColor === chooseColor
    );
    setIsClicked(favoriteExists);
  }
  //Load favorite items from supabase based on user who is using website
  useEffect(() => {
    loadFavoriteItems();
  }, [isFavorite, isClicked, colorSrc]);

  //Add/remove product from favorites and update favorites table
  async function handleFavoriteItems(e) {
    setIsClicked(!isClicked);
    if (!isClicked) {
      await insertFavoriteItem(
        name,
        item.id,
        displayedImageInFavorite,
        chooseColor,
        currentUser,
        localStorage.getItem("guestID")
      );
      const updatedArray = await getFavoriteItems(
        currentUser,
        localStorage.getItem("guestID")
      );
      setIsFavorite(updatedArray.length);
    }
    if (isClicked) {
      await removeFavoriteItem(
        name,
        chooseColor,
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

  //Style position and size of heart icon based on page it is rendered
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
        <SolidHeart className={`${sizeOptions[size]} text-darkheart`} />
      ) : (
        <OutlinedHeart className={`${sizeOptions[size]} text-darkheart`} />
      )}
    </button>
  );
}

export default AddToFavorites;
