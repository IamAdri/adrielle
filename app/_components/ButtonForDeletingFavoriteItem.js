"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getFavoriteItems, removeFavoriteItem } from "../_lib/data-service";
import { useFavoriteItems } from "../_contextAPI/FavoriteItemsContextApi";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";

function ButtonForDeletingFavoriteItem({ item, currentUser }) {
  const { setIsFavorite } = useFavoriteItems();
  const handleDeleteFavoriteItem = (e) => {
    const targetedItem = e.currentTarget.parentNode.parentNode.parentNode;
    console.log(targetedItem);
    (async function remove() {
      await removeFavoriteItem(
        item.shoes.name,
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
      <TrashIcon className="size-7 cursor-pointer" />
    </button>
  );
}

export default ButtonForDeletingFavoriteItem;
