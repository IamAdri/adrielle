"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getFavoriteItems, removeFavoriteItem } from "../_lib/data-service";
import { useFavoriteItems } from "../_contextAPI/FavoriteItemsContextApi";

function ButtonForDeletingFavoriteItem({ item, currentUser }) {
  const { setIsFavorite } = useFavoriteItems();
  //Delete favorite item from favorites and update data
  const handleDeleteFavoriteItem = (e) => {
    const targetedItem =
      e.currentTarget.parentNode.parentNode.parentNode.parentNode;
    (async function remove() {
      await removeFavoriteItem(
        item.items.name,
        item.selectedColor,
        currentUser,
        localStorage.getItem("guestID")
      );
      const updatedArray = await getFavoriteItems(
        currentUser,
        localStorage.getItem("guestID")
      );
      setIsFavorite(updatedArray.length);
    })();
    targetedItem.style.display = "none";
  };
  return (
    <button onClick={handleDeleteFavoriteItem}>
      <TrashIcon className="size-7 cursor-pointer text-darkheart" />
    </button>
  );
}

export default ButtonForDeletingFavoriteItem;
