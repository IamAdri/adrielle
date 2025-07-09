"use client";
import { redirect } from "next/navigation";
import { useChooseSize } from "./ChooseSizeContextApi";
import { insertCartItem } from "../_lib/data-service";

function AddToCart({ id, name }) {
  const { clickedSize, isNotSelected, setIsNotSelected } = useChooseSize();
  const handleAddToCart = async () => {
    console.log(clickedSize);
    if (!clickedSize) setIsNotSelected(true);
    const insertToCartTable = await insertCartItem(name, id, clickedSize);
    if (clickedSize) {
      setIsNotSelected(false);
      redirect("/bag");
    }
  };
  console.log(name);
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
