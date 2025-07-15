"use client";

import { useEffect, useState } from "react";
import { updateCartQuantityColumn } from "../_lib/data-service";

function ButtonForAddingQuantity({ cartItem }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [price, setPrice] = useState(cartItem.shoes.price);
  const [isMinDisabled, setIsMinDisabled] = useState(true);
  const [isMaxDisabled, setIsMaxDisabled] = useState(false);

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
      await updateCartQuantityColumn(cartItem.name, cartItem.size, quantity);
    })();
  }, [quantity]);

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
