"use client";

import { useEffect, useState } from "react";
import { getCartItems } from "../_lib/data-service";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";
import { IconContext } from "react-icons";
import { usePricePerQuantity } from "../_contextAPI/PricePerQuantityContextApi";

function MakeOrderBox() {
  const { isCurrentUser } = useCurrentUserEmail();
  const { isQuantityChanged, setIsQuantityChanged } = usePricePerQuantity();
  // const [itemsFromCart, setItemsFromCart] = useState("");
  useEffect(() => {
    (async function loadCartItems() {
      let itemsFromCart = [];
      const cartItems = await getCartItems(
        isCurrentUser,
        localStorage.getItem("guestID")
      );
      console.log(cartItems);
      cartItems.map((item) => {
        itemsFromCart.push(item.pricePerQuantity);
      });
      console.log(itemsFromCart);
      // setItemsFromCart(cartItems);
    })();
  }, [isCurrentUser, isQuantityChanged]);
  //console.log(itemsFromCart);
  return (
    <div className="border-2 border-lightlavender rounded-sm p-5">
      <div className="flex flex-col gap-5">
        <div className=" flex flex-col items-start gap-3">
          <h2 className="font-bold">Order summary</h2>
          <span>Product cost:</span>
          <span>Delivery cost:</span>
          <span className="font-bold">Total:</span>
        </div>
        <div className="flex justify-center">
          <button className="bg-lavenderhighlight rounded-sm border-2 border-darklavender font-semibold px-3 py-1 cursor-pointer text-base hover:text-lg  hover:font-bold text-warmwhite hover:text-white">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default MakeOrderBox;
