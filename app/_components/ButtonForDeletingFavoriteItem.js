"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { removeFavoriteItem } from "../_lib/data-service";

function ButtonForDeletingFavoriteItem({ favoriteItem }) {
  const handleDeleteFavoriteItem = (e) => {
    const targetedItem = e.currentTarget.parentNode.parentNode;
    (async function remove() {
      await removeFavoriteItem(favoriteItem.shoes.name);
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
