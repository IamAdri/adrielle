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

function AddToFavorites({
  currentUser,
  name,
  item,
  position = "relative",
  size = 10,
}) {
  const { isFavorite, setIsFavorite } = useFavoriteItems();
  const [isClicked, setIsClicked] = useState(false);
  const { colorSrc, clickedImage } = useChangingColor();
  const colorsAvailable = Object.keys(item.variants);
  const mainColorImage = item.variants[colorsAvailable[0]][0];
  const displayedImageInFavorite = colorSrc !== "" ? colorSrc : mainColorImage;
  const secondColorGallery = item.variants[colorsAvailable[1]];
  const chooseColor = secondColorGallery.includes(displayedImageInFavorite)
    ? colorsAvailable[1]
    : colorsAvailable[0];

  useEffect(() => {
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
    loadFavoriteItems();
  }, [isFavorite, isClicked, colorSrc]);
  async function handleFavoriteItems(e) {
    console.log(colorSrc, clickedImage);
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
