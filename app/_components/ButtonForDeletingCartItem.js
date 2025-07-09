"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getFavoriteItems, removeFavoriteItem } from "../_lib/data-service";
import { useFavoriteItems } from "./FavoriteItemsContextApi";

function ButtonForDeletingCartItem({ favoriteItem }) {
  //const { isFavorite, setIsFavorite } = useFavoriteItems();
  const handleDeleteFavoriteItem = (e) => {
    const targetedItem = e.currentTarget.parentNode.parentNode;
    (async function remove() {
      await removeFavoriteItem(favoriteItem.shoes.name);
      const updatedArray = await getFavoriteItems();
      setIsFavorite(updatedArray.length);
    })();
    targetedItem.style.display = "none";
  };
  return (
    <button className="absolute right-0 p-1" onClick={handleDeleteFavoriteItem}>
      <TrashIcon className="size-6 cursor-pointer" />
    </button>
  );
}

export default ButtonForDeletingFavoriteItem;
