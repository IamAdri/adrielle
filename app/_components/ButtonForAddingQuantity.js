"use client";

import { useEffect, useState } from "react";
import {
  updateCartPricePerQuantityColumn,
  updateCartQuantityColumn,
} from "../_lib/data-service";
import { useChangingColor } from "../_contextAPI/ChangingColorContextApi";

function ButtonForAddingQuantity({ cartItem }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [price, setPrice] = useState(cartItem.pricePerQuantity);
  const [isMinDisabled, setIsMinDisabled] = useState(true);
  const [isMaxDisabled, setIsMaxDisabled] = useState(false);
  const { colorSrc } = useChangingColor();
  useEffect(() => {
    if (quantity === 1) {
      setIsMinDisabled(true);
    } else if (quantity === 10) {
      setIsMaxDisabled(true);
    } else {
      setIsMinDisabled(false);
      setIsMaxDisabled(false);
    }
    (async function updateQuantity() {
      setPrice(cartItem.shoes.price * quantity);
      await updateCartQuantityColumn(
        cartItem.name,
        cartItem.size,
        cartItem.selectedColorSrc,
        quantity
      );
    })();
  }, [quantity]);

  useEffect(() => {
    (async function updatePrice() {
      await updateCartPricePerQuantityColumn(
        cartItem.name,
        cartItem.size,
        cartItem.selectedColorSrc,
        price
      );
    })();
  }, [price]);
  const handleDecreaseQuantity = () => {
    setQuantity(quantity - 1);
    setPrice(price);
  };

  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-end justify-between w-full">
      <div className="border border-coolgrey flex gap-3 px-3 items-center mt-3">
        <button
          disabled={isMinDisabled}
          onClick={handleDecreaseQuantity}
          className={`font-bold text-lg cursor-pointer ${
            isMinDisabled && "disabled:text-coolgrey disabled:cursor-auto"
          }`}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          disabled={isMaxDisabled}
          onClick={handleAddQuantity}
          className={`font-bold text-lg cursor-pointer ${
            isMaxDisabled ? "disabled:text-coolgrey" : ""
          }`}
        >
          +
        </button>
      </div>
      <span className="font-medium text-base text-deepgrey text-end mr-15">{`${price} ${cartItem.shoes.currency}`}</span>
    </div>
  );
}

export default ButtonForAddingQuantity;
