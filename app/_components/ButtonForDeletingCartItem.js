"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getCartItems, removeCartItem } from "../_lib/data-service";
import { useCartItems } from "../_contextAPI/CartItemsContextApi";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";

function ButtonForDeletingCartItem({ item }) {
  const { setIsCart } = useCartItems();
  const { isCurrentUser } = useCurrentUserEmail();
  const handleDeleteCartItem = (e) => {
    const targetedItem =
      e.currentTarget.parentNode.parentNode.parentNode.parentNode;
    console.log(targetedItem);
    (async function remove() {
      await removeCartItem(
        item.shoes.name,
        item.size,
        isCurrentUser,
        localStorage.getItem("guestID")
      );
      const updatedArray = await getCartItems(
        isCurrentUser,
        localStorage.getItem("guestID")
      );
      setIsCart(updatedArray.length);
    })();
    targetedItem.style.display = "none";
  };
  return (
    <button onClick={handleDeleteCartItem}>
      <TrashIcon className="size-6 cursor-pointer" />
    </button>
  );
}

export default ButtonForDeletingCartItem;
