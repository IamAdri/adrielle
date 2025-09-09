"use client";
import Image from "next/image";
import ButtonForSize from "./ButtonForSize";
import AddToCart from "./AddToCart";
import Link from "next/link";
import { useChooseSize } from "../_contextAPI/ChooseSizeContextApi";
import ModalAddCartSuccessfully from "./ModalAddCartSuccessfully";
import { usePathname } from "next/navigation";

function Modal({ setOpenModal, name, item, selectedColorSrc }) {
  const {
    setClickedSize,
    setSameCartItem,
    addedToCartSuccessfully,
    setAddedToCartSuccessfully,
  } = useChooseSize();
  const path = usePathname();
  const colorsAvailable = Object.keys(item.variants);
  const mainColorImage =
    selectedColorSrc === ""
      ? item.variants[colorsAvailable[0]].images[0]
      : selectedColorSrc;
  //console.log(mainColorImage);
  const closeCartModal = () => {
    setOpenModal(false);
    setSameCartItem("");
    setClickedSize("");
    setAddedToCartSuccessfully(false);
  };
  console.log(item);
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
              <div className="flex gap-7 items-center px-3">
                <div>
                  <Link href={`${path}/${name.replaceAll(" ", "_")}`}>
                    <Image
                      src={mainColorImage}
                      sizes="100vw"
                      width={175}
                      height={175}
                      alt="Main picture of selected item."
                    />
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <h2 className="font-bold text-xl">{name}</h2>
                  <AddToCart item={item} selectedColorSrc={selectedColorSrc} />
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
