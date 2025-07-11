"use client";
import { useChooseSize } from "./ChooseSizeContextApi";
import { getCartItems, insertCartItem } from "../_lib/data-service";
import { useEffect, useState } from "react";
import { useCartItems } from "./CartItemsContextApi";

function AddToCart({ id, name }) {
  const {
    clickedSize,
    isNotSelected,
    setIsNotSelected,
    sameCartItem,
    setSameCartItem,
  } = useChooseSize();
  const { isCart, setIsCart } = useCartItems();
  useEffect(() => {
    async function insert() {
      if (!sameCartItem && sameCartItem !== "") {
        await insertCartItem(name, id, clickedSize);
        const updatedArray = await getCartItems();
        setIsCart(updatedArray.length);
      }
    }
    insert();
  }, [sameCartItem, clickedSize]);

  useEffect(() => {
    async function loadCartItems() {
      const cartItems = await getCartItems();
      setIsCart(cartItems.length);
    }
    loadCartItems();
  }, [isCart, setIsCart]);

  const handleAddToCart = async () => {
    const cartItems = await getCartItems();
    if (!clickedSize) setIsNotSelected(true);
    if (clickedSize) {
      const isItemInCart = cartItems.filter((item) => {
        return item.cart_id === id && item.size === clickedSize;
      });
      if (isItemInCart.length > 0) {
        setSameCartItem(true);
      } else {
        setSameCartItem(false);
      }
    }
  };
  console.log(sameCartItem);
  return (
    <div className="flex flex-col items-start gap-1">
      <button
        className="bg-deepgrey mt-10 justify-center w-45 h-15 py-1.5 cursor-pointer font-bold text-lg text-warmwhite hover:text-xl hover:w-50"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
      {isNotSelected && (
        <p>
          Please choose required size!<span className="text-red">*</span>
        </p>
      )}
    </div>
  );
}

export default AddToCart;
