"use client";
import { useEffect, useRef, useState } from "react";
import { useCartItems } from "../_contextAPI/CartItemsContextApi";
import { useChooseSize } from "../_contextAPI/ChooseSizeContextApi";
import { useChangingColor } from "../_contextAPI/ChangingColorContextApi";
import {
  getCartItems,
  insertCartItem,
  updateCartPricePerQuantityColumn,
  updateCartQuantityColumn,
} from "../_lib/data-service";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";
import { colorsAvailableFunction } from "../_lib/helper";

export function useAddToCart({ item, priceAfterDiscount, selectedColorSrc }) {
  const {
    clickedSize,
    setClickedSize,
    sameCartItem,
    setAddedToCartSuccessfully,
  } = useChooseSize();
  const { isCurrentUser } = useCurrentUserEmail();
  const { setIsClickedImage } = useChangingColor();
  const [quantity, setQuantity] = useState(0);
  const [pricePerQuantity, setPricePerQuantity] = useState(0);
  const { isCart, setIsCart } = useCartItems();
  const { colorSrc } = useChangingColor();
  const { colorsAvailable, mainColorImage, secondColorGallery } =
    colorsAvailableFunction(item);
  //Detect which color should product have on image from cart
  const displayedImageInCart =
    colorSrc === ""
      ? selectedColorSrc === ""
        ? mainColorImage
        : selectedColorSrc
      : colorSrc;
  const chooseColor = secondColorGallery.includes(displayedImageInCart)
    ? colorsAvailable[1]
    : colorsAvailable[0];

  useEffect(() => {
    setIsClickedImage("");
  }, []);
  const buttonSizeRef = useRef(null);
  const buttonAddToCartRef = useRef(null);
  //Update cart related values from context api and add to cart table or update quantity of product from cart in case it is already in cart
  useEffect(() => {
    (async function insert() {
      if (!sameCartItem && sameCartItem !== "") {
        await insertCartItem(
          item.name,
          item.id,
          clickedSize,
          priceAfterDiscount,
          displayedImageInCart,
          chooseColor,
          isCurrentUser,
          localStorage.getItem("guestID")
        );
        const updatedArray = await getCartItems(
          isCurrentUser,
          localStorage.getItem("guestID")
        );
        setIsCart(updatedArray.length);
        setAddedToCartSuccessfully(true);
      }
      if (sameCartItem) {
        setPricePerQuantity(priceAfterDiscount * quantity);
        await updateCartQuantityColumn(
          item.name,
          clickedSize,
          displayedImageInCart,
          quantity,
          isCurrentUser,
          localStorage.getItem("guestID")
        );
        setAddedToCartSuccessfully(true);
      }
    })();
    (async function changePricePerQuantity() {
      if (pricePerQuantity > 0) {
        await updateCartPricePerQuantityColumn(
          item.name,
          clickedSize,
          pricePerQuantity,
          isCurrentUser,
          localStorage.getItem("guestID")
        );
      }
    })();
  }, [sameCartItem, clickedSize, quantity, pricePerQuantity]);

  //Reset to "" size for cart in case user clicked anywhere otside size button before adding to cart
  useEffect(() => {
    function handleClick(e) {
      if (buttonSizeRef.current === null) return;
      if (
        !Array.from(buttonSizeRef.current.parentNode.children).includes(
          e.target
        ) &&
        e.target !== buttonAddToCartRef.current
      ) {
        return setClickedSize("");
      }
    }
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  });
  //Load existing products from cart of active user
  useEffect(() => {
    async function loadCartItems() {
      const cartItems = await getCartItems(
        isCurrentUser,
        localStorage.getItem("guestID")
      );
      setIsCart(cartItems.length);
    }
    loadCartItems();
  }, [isCart, setIsCart]);

  return {
    buttonSizeRef,
    buttonAddToCartRef,
    isCurrentUser,
    setQuantity,
    displayedImageInCart,
  };
}
