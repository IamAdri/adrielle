"use client";
import { useChooseSize } from "../_contextAPI/ChooseSizeContextApi";
import AddToCart from "./AddToCart";
import ModalAddCartSuccessfully from "./ModalAddCartSuccessfully";

function AddToCartFromItemPage({
  item,
  selectedColorSrc = "",
  priceAfterDiscount,
}) {
  const {
    addedToCartSuccessfully,
    setSameCartItem,
    setClickedSize,
    setAddedToCartSuccessfully,
  } = useChooseSize();
  //Close add to cart modal
  const closeSmallCartModal = () => {
    setSameCartItem("");
    setClickedSize("");
    setAddedToCartSuccessfully(false);
  };
  return (
    <div>
      <AddToCart
        item={item}
        selectedColorSrc={selectedColorSrc}
        priceAfterDiscount={priceAfterDiscount}
      />
      {addedToCartSuccessfully && (
        <ModalAddCartSuccessfully closeCartModal={closeSmallCartModal} />
      )}
    </div>
  );
}

export default AddToCartFromItemPage;
