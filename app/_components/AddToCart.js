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
  const [pricePerQuantity, setPricePerQuantity] = useState(0);
  const { isCart, setIsCart } = useCartItems();
  const { colorSrc, setIsClickedImage } = useChangingColor();
  const colorsAvailable = Object.keys(item.variants);
  const mainColorImage = item.variants[colorsAvailable[0]].images[0];
  const displayedImageInCart = colorSrc !== "" ? colorSrc : mainColorImage;
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
          chooseColor
        );
        const updatedArray = await getCartItems();
        setIsCart(updatedArray.length);
        setAddedToCartSuccessfully(true);
      }
      if (sameCartItem) {
        console.log(pricePerQuantity);
        console.log(quantity);
        setPricePerQuantity(item.price * quantity);
        await updateCartQuantityColumn(
          item.name,
          clickedSize,
          displayedImageInCart,
          quantity
        );

        setAddedToCartSuccessfully(true);
      }
    })();
    (async function changePricePerQuantity() {
      if (pricePerQuantity > 0) {
        await updateCartPricePerQuantityColumn(
          item.name,
          clickedSize,
          pricePerQuantity
        );
      }
    })();
  }, [sameCartItem, clickedSize, quantity, pricePerQuantity]);

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
