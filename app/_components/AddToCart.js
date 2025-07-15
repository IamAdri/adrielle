"use client";
import { useChooseSize } from "../_contextAPI/ChooseSizeContextApi";
import {
  getCartItems,
  insertCartItem,
  updateCartQuantityColumn,
} from "../_lib/data-service";
import { useEffect, useState } from "react";
import { useCartItems } from "../_contextAPI/CartItemsContextApi";

function AddToCart({ item }) {
  const {
    clickedSize,
    isNotSelected,
    setIsNotSelected,
    sameCartItem,
    setSameCartItem,
    setAddedToCartSuccessfully,
  } = useChooseSize();

  const [quantity, setQuantity] = useState(0);

  const { isCart, setIsCart } = useCartItems();

  useEffect(() => {
    async function insert() {
      if (!sameCartItem && sameCartItem !== "") {
        await insertCartItem(item.name, item.id, clickedSize, item.price);
        const updatedArray = await getCartItems();
        setIsCart(updatedArray.length);
        setAddedToCartSuccessfully(true);
      }
      if (sameCartItem) {
        console.log(quantity);
        console.log(item.name);
        await updateCartQuantityColumn(item.name, clickedSize, quantity);
        setAddedToCartSuccessfully(true);
      }
    }
    insert();
  }, [sameCartItem, clickedSize, quantity, setQuantity]);

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
        return item.cart_id === item.id && item.size === clickedSize;
      });
      if (isItemInCart.length > 0) {
        setSameCartItem(true);
        setQuantity((quantity) => (quantity = isItemInCart[0].quantity + 1));
      } else {
        setSameCartItem(false);
      }
    }
  };
  //console.log(sameCartItem);
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
