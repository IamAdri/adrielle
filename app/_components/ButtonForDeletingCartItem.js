"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getCartItems, removeCartItem } from "../_lib/data-service";
import { useCartItems } from "../_contextAPI/CartItemsContextApi";

function ButtonForDeletingCartItem({ item }) {
  const { setIsCart } = useCartItems();
  const handleDeleteCartItem = (e) => {
    const targetedItem = e.currentTarget.parentNode.parentNode.parentNode;
    console.log(targetedItem);
    (async function remove() {
      await removeCartItem(item.shoes.name, item.size);
      const updatedArray = await getCartItems();
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
