"use client";

import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCartItems } from "./CartItemsContextApi";
import { getCartItems, insertCartItem } from "../_lib/data-service";
import { useEffect, useState } from "react";
import ButtonForSize from "./ButtonForSize";
import Modal from "./Modal";
import { useChooseSize } from "./ChooseSizeContextApi";

function AddToCartIcon({ itemID, name, item, category }) {
  const { isCart, setIsCart } = useCartItems();
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { sameCartItem, setSameCartItem, clickedSize, setClickedSize } =
    useChooseSize();
  /*
  useEffect(() => {
    async function loadCartItems() {
      const cartItems = await getCartItems();
      cartItems.map((cart) => {
        if (cart.cart_id === itemID) setIsClicked(true);
      });
    }
    loadCartItems();
  }, []);

  useEffect(() => {
    async function loadCartItems() {
      const cartItems = await getCartItems();
      //console.log(favoriteItems);
      // if (favoriteItems.length !== isFavorite.length)
      setIsCart(cartItems.length);
    }
    loadCartItems();
  }, [isCart, setIsCart, isClicked, setIsClicked]);

  async function handleCartItems(e) {
    //setIsClicked(!isClicked);

    await insertCartItem(name, itemID);
    const updatedArray = await getCartItems();
    setIsCart(updatedArray.length);
  }
*/
  const handleOpenModal = () => {
    setIsModalOpened(true);
    setSameCartItem("");
    setClickedSize("");
  };
  return (
    <div>
      <button className="size-7 cursor-pointer" onClick={handleOpenModal}>
        <ShoppingBagIcon />
      </button>
      {isModalOpened && (
        <Modal
          setOpenModal={setIsModalOpened}
          id={itemID}
          name={name}
          item={item}
          category={category}
        />
      )}
    </div>
  );
}

export default AddToCartIcon;
