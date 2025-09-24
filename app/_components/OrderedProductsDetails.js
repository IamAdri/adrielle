import Image from "next/image";

function OrderedProductsDetails({ cartItems }) {
  return (
    <div className="flex flex-col whitespace-nowrap gap-15 mt-15">
      {cartItems.length > 0 &&
        cartItems.map((cartItem) => {
          return (
            <ul key={`${cartItem.items.id}, ${cartItem.size}, ${cartItem.id}`}>
              <li className="flex gap-5">
                <div className="w-[150px] h-[150px]">
                  <Image
                    src={cartItem.selectedColorSrc}
                    width={150}
                    height={150}
                    alt="Main image for favorite item."
                  />
                </div>
                <div className="flex flex-wrap gap-5  lg:gap-25 w-full">
                  <div className="flex flex-col items-start">
                    <h3>{cartItem.items.name}</h3>
                    <span>{`size: ${cartItem.size}`}</span>
                    <span>{cartItem.selectedColor}</span>
                    <span>{`quantity: ${cartItem.quantity}`}</span>
                    <span className="text-coolgrey text-sm mt-1">
                      Selled by Adrielle
                    </span>
                  </div>
                  <span className="font-medium text-base text-deepgrey text-end mr-15">{`${cartItem.pricePerQuantity} EUR`}</span>
                </div>
              </li>
            </ul>
          );
        })}
    </div>
  );
}

export default OrderedProductsDetails;
