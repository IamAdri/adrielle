"use client";
import Image from "next/image";
import AddToCart from "./AddToCart";
import Link from "next/link";
import { useChooseSize } from "../_contextAPI/ChooseSizeContextApi";
import ModalAddCartSuccessfully from "./ModalAddCartSuccessfully";
import { usePathname } from "next/navigation";
import { colorsAvailableFunction } from "../_lib/helper";

function Modal({ setOpenModal, item, selectedColorSrc, priceAfterDiscount }) {
  const {
    setClickedSize,
    setSameCartItem,
    addedToCartSuccessfully,
    setAddedToCartSuccessfully,
  } = useChooseSize();
  const path = usePathname();
  //Detect which color product has when is added to cart
  const { mainColorImage } = colorsAvailableFunction(item);
  const mainColorImageFromModal =
    selectedColorSrc === "" ? mainColorImage : selectedColorSrc;
  //Close add to cart modal if clicking on x or outside modal div
  const closeCartModal = () => {
    setOpenModal(false);
    setSameCartItem("");
    setClickedSize("");
    setAddedToCartSuccessfully(false);
  };
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={closeCartModal}
      ></div>
      <div className="flex justify-center items-center min-h-screen px-4 py-8">
        <div className="bg-warmwhite relative pt-1 px-1 pb-5">
          <div className="flex flex-col items-end">
            <button
              className="w-fit border px-2 mb-2 rounded-full hover:cursor-pointer"
              onClick={closeCartModal}
            >
              x
            </button>
            {!addedToCartSuccessfully ? (
              <div className="flex flex-wrap gap-7 items-center px-3 ">
                <div>
                  <Link href={`${path}/${item.name.replaceAll(" ", "_")}`}>
                    <Image
                      src={mainColorImageFromModal}
                      sizes="100vw"
                      width={175}
                      height={175}
                      alt="Main picture of selected item."
                    />
                  </Link>
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="font-bold text-xl">{item.name}</h2>
                  <AddToCart
                    item={item}
                    selectedColorSrc={selectedColorSrc}
                    priceAfterDiscount={priceAfterDiscount}
                  />
                </div>
              </div>
            ) : (
              <ModalAddCartSuccessfully closeCartModal={closeCartModal} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
