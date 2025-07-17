"use client";
import { useChooseSize } from "../_contextAPI/ChooseSizeContextApi";
import AddToCart from "./AddToCart";
import ModalAddCartSuccessfully from "./ModalAddCartSuccessfully";

function AddToCartFromItemPage({ item }) {
  const {
    addedToCartSuccessfully,
    setSameCartItem,
    setClickedSize,
    setAddedToCartSuccessfully,
  } = useChooseSize();

  const closeSmallCartModal = () => {
    setSameCartItem("");
    setClickedSize("");
    setAddedToCartSuccessfully(false);
  };

  return (
    <div>
      <AddToCart item={item} />
      {addedToCartSuccessfully && (
        <ModalAddCartSuccessfully closeCartModal={closeSmallCartModal} />
      )}
    </div>
  );
}

export default AddToCartFromItemPage;
