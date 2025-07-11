"use client";

import Image from "next/image";
import { useChooseSize } from "./ChooseSizeContextApi";
import ButtonForDeletingCartItem from "./ButtonForDeletingCartItem";

function DisplayCartItems({ cartItems }) {
  const { clickedSize } = useChooseSize();
  return (
    <div className="">
      {cartItems.map((cartItem) => {
        const colorsAvailable = Object.keys(cartItem.shoes.variants);
        const mainColorImage =
          cartItem.shoes.variants[colorsAvailable[0]].images[0];
        return (
          <ul
            className="flex flex-col gap-15  "
            key={`${cartItem.shoes.id}, ${cartItem.size}`}
          >
            <li className="flex gap-15">
              <Image
                src={mainColorImage}
                width={250}
                height={250}
                alt="Main image for favorite item."
              />
              <div className="flex flex-col gap-10">
                <div className="flex flex-col items-start">
                  <span className="font-bold text-lg text-deepgrey mb-3">
                    {cartItem.shoes.name}
                  </span>

                  <span>{`Size: ${cartItem.size}`}</span>
                  <span>COLOR</span>
                  <span className="text-coolgrey text-sm mt-1">
                    Selled by Adrielle
                  </span>
                </div>
                <span className="font-medium text-base text-deepgrey text-end">{`${cartItem.shoes.price} ${cartItem.shoes.currency}`}</span>
                <ButtonForDeletingCartItem cartItem={cartItem} />
              </div>
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default DisplayCartItems;
