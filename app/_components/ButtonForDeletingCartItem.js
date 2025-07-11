"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getCartItems, removeCartItem } from "../_lib/data-service";
import { useCartItems } from "./CartItemsContextApi";

function ButtonForDeletingCartItem({ cartItem }) {
  const { setIsCart } = useCartItems();
  const handleDeleteCartItem = (e) => {
    const targetedItem = e.currentTarget.parentNode.parentNode;
    (async function remove() {
      await removeCartItem(cartItem.shoes.name, cartItem.size);
      const updatedArray = await getCartItems();
      setIsCart(updatedArray.length);
    })();
    targetedItem.style.display = "none";
  };
  return (
    <button className="absolute right-0 p-1" onClick={handleDeleteCartItem}>
      <TrashIcon className="size-6 cursor-pointer" />
    </button>
  );
}

export default ButtonForDeletingCartItem;
