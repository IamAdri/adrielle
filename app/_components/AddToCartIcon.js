"use client";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { useChooseSize } from "../_contextAPI/ChooseSizeContextApi";
import { useChangingColor } from "../_contextAPI/ChangingColorContextApi";

function AddToCartIcon({ item, selectedSrc = "", priceAfterDiscount }) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { setSameCartItem, setClickedSize, setAddedToCartSuccessfully } =
    useChooseSize();
  const { setColorSrc } = useChangingColor();

  const handleOpenModal = () => {
    setIsModalOpened(true);
    setSameCartItem("");
    setClickedSize("");
    setAddedToCartSuccessfully(false);
    setColorSrc("");
  };

  return (
    <div>
      <button onClick={handleOpenModal}>
        <ShoppingBagIcon className="size-7 cursor-pointer" />
      </button>
      {isModalOpened && (
        <Modal
          setOpenModal={setIsModalOpened}
          item={item}
          selectedColorSrc={selectedSrc}
          priceAfterDiscount={priceAfterDiscount}
        />
      )}
    </div>
  );
}

export default AddToCartIcon;
