"use client";
import Image from "next/image";
import ButtonForDeletingCartItem from "./ButtonForDeletingCartItem";
import ButtonForAddingQuantity from "./ButtonForAddingQuantity";
import MainHeading from "./MainHeading";
import { useChangingColor } from "../_contextAPI/ChangingColorContextApi";
import { redirect } from "next/navigation";
import MakeOrderBox from "./MakeOrderBox";
import { PricePerQuantityProvider } from "../_contextAPI/PricePerQuantityContextApi";

function DisplayCartItems({ cartItems }) {
  const { setColorSrc, colorSrc } = useChangingColor();

  const handleDisplayImage = (item) => {
    setColorSrc(item.selectedColorSrc);
    redirect(
      `/shoes/${item.shoes.category[0]}/${item.name.replaceAll(" ", "_")}`
    );
  };
  return (
    <PricePerQuantityProvider>
      <div className="flex flex-wrap justify-around gap-15 mx-5">
        <div className="flex flex-col items-start border-2 border-lightlavender p-5 rounded-sm">
          <MainHeading>My shopping cart</MainHeading>
          <div className="relative w-200">
            {cartItems.map((cartItem) => {
              return (
                <ul
                  className="flex flex-col gap-15 mt-15"
                  key={`${cartItem.shoes.id}, ${cartItem.size}, ${cartItem.id}`}
                >
                  <li className="flex gap-15">
                    <button
                      onClick={() => handleDisplayImage(cartItem)}
                      className="cursor-pointer"
                    >
                      <Image
                        src={cartItem.selectedColorSrc}
                        width={250}
                        height={250}
                        alt="Main image for favorite item."
                      />
                    </button>

                    <div className="flex flex-col gap-10 w-full">
                      <div className="flex flex-col items-start">
                        <button
                          onClick={() => handleDisplayImage(cartItem)}
                          className="cursor-pointer"
                        >
                          {cartItem.shoes.name}
                        </button>

                        <span>{`Size: ${cartItem.size}`}</span>
                        <span>{cartItem.selectedColor}</span>
                        <span className="text-coolgrey text-sm mt-1">
                          Selled by Adrielle
                        </span>
                        <ButtonForAddingQuantity cartItem={cartItem} />
                      </div>

                      <div className="absolute right-0">
                        <ButtonForDeletingCartItem item={cartItem} />
                      </div>
                    </div>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
        <MakeOrderBox />
      </div>
    </PricePerQuantityProvider>
  );
}

export default DisplayCartItems;
