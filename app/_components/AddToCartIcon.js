"use client";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { useChooseSize } from "../_contextAPI/ChooseSizeContextApi";

function AddToCartIcon({ name, item }) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { setSameCartItem, setClickedSize, setAddedToCartSuccessfully } =
    useChooseSize();

  const handleOpenModal = () => {
    setIsModalOpened(true);
    setSameCartItem("");
    setClickedSize("");
    setAddedToCartSuccessfully(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>
        <ShoppingBagIcon className="size-7 cursor-pointer" />
      </button>
      {isModalOpened && (
        <Modal setOpenModal={setIsModalOpened} name={name} item={item} />
      )}
    </div>
  );
}

export default AddToCartIcon;
