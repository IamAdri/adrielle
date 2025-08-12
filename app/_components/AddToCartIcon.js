"use client";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { useChooseSize } from "../_contextAPI/ChooseSizeContextApi";
import { useChangingColor } from "../_contextAPI/ChangingColorContextApi";

function AddToCartIcon({ name, item, selectedSrc = "" }) {
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
          name={name}
          item={item}
          selectedColorSrc={selectedSrc}
        />
      )}
    </div>
  );
}

export default AddToCartIcon;
