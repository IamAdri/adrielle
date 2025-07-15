import Image from "next/image";
import ButtonForDeletingCartItem from "./ButtonForDeletingCartItem";
import ButtonForAddingQuantity from "./ButtonForAddingQuantity";
import MainHeading from "./MainHeading";

function DisplayCartItems({ cartItems }) {
  return (
    <div className="flex flex-col items-start ml-25">
      <MainHeading>My shopping cart</MainHeading>
      <div className="relative w-200  ">
        {cartItems.map((cartItem) => {
          console.log(cartItem);
          const colorsAvailable = Object.keys(cartItem.shoes.variants);
          const mainColorImage =
            cartItem.shoes.variants[colorsAvailable[0]].images[0];
          return (
            <ul
              className="flex flex-col gap-15 mt-15"
              key={`${cartItem.shoes.id}, ${cartItem.size}`}
            >
              <li className="flex gap-15">
                <Image
                  src={mainColorImage}
                  width={250}
                  height={250}
                  alt="Main image for favorite item."
                />
                <div className="flex flex-col gap-10 w-full">
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-lg text-deepgrey mb-3">
                      {cartItem.shoes.name}
                    </span>

                    <span>{`Size: ${cartItem.size}`}</span>
                    <span>COLOR</span>
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
  );
}

export default DisplayCartItems;
