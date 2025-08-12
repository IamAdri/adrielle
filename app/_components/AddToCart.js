"use client";
import { useChooseSize } from "../_contextAPI/ChooseSizeContextApi";
import {
  getCartItems,
  insertCartItem,
  updateCartPricePerQuantityColumn,
  updateCartQuantityColumn,
} from "../_lib/data-service";
import { useEffect, useState } from "react";
import { useCartItems } from "../_contextAPI/CartItemsContextApi";
import { useChangingColor } from "../_contextAPI/ChangingColorContextApi";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";

function AddToCart({ item, selectedColorSrc }) {
  const {
    clickedSize,
    isNotSelected,
    setIsNotSelected,
    sameCartItem,
    setSameCartItem,
    setAddedToCartSuccessfully,
  } = useChooseSize();
  const { isCurrentUser } = useCurrentUserEmail();
  const [quantity, setQuantity] = useState(0);
  const [pricePerQuantity, setPricePerQuantity] = useState(0);
  const { isCart, setIsCart } = useCartItems();
  const { colorSrc, setIsClickedImage } = useChangingColor();
  const colorsAvailable = Object.keys(item.variants);
  const mainColorImage = item.variants[colorsAvailable[0]].images[0];
  console.log(selectedColorSrc);
  //const displayedImageInCart = colorSrc !== "" ? colorSrc : mainColorImage;
  const displayedImageInCart =
    colorSrc === ""
      ? selectedColorSrc === ""
        ? mainColorImage
        : selectedColorSrc
      : colorSrc;
  const secondColorGallery = item.variants[colorsAvailable[1]].images;
  const chooseColor = secondColorGallery.includes(displayedImageInCart)
    ? colorsAvailable[1]
    : colorsAvailable[0];

  useEffect(() => {
    setIsClickedImage("");
  }, []);

  useEffect(() => {
    (async function insert() {
      if (!sameCartItem && sameCartItem !== "") {
        await insertCartItem(
          item.name,
          item.id,
          clickedSize,
          item.price,
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
        setPricePerQuantity(item.price * quantity);
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

  const handleAddToCart = async () => {
    const cartItems = await getCartItems(
      isCurrentUser,
      localStorage.getItem("guestID")
    );
    if (!clickedSize) setIsNotSelected(true);
    if (clickedSize) {
      const isItemInCart = cartItems.filter((itemFiltered) => {
        return (
          item.id === itemFiltered.cart_id &&
          itemFiltered.size === clickedSize &&
          itemFiltered.selectedColorSrc === displayedImageInCart
        );
      });
      if (isItemInCart.length > 0) {
        setSameCartItem(true);
        setQuantity(isItemInCart[0].quantity + 1);
      } else {
        setSameCartItem(false);
      }
    }
    console.log(colorSrc, item);
  };

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
