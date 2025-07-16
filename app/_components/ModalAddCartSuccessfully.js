import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useChooseSize } from "../_contextAPI/ChooseSizeContextApi";
import { redirect } from "next/navigation";

function ModalAddCartSuccessfully({ closeCartModal }) {
  const {
    setClickedSize,
    setSameCartItem,
    addedToCartSuccessfully,
    setAddedToCartSuccessfully,
  } = useChooseSize();

  const handleGoToCart = () => {
    //setOpenModal(false);
    setSameCartItem("");
    setClickedSize("");
    setAddedToCartSuccessfully(false);
    redirect("/bag");
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

            <div>
              <div className="flex items-center gap-0.5 pb-5 ">
                <CheckCircleIcon className="size-5 text-green-700 ml-4" />
                <h3 className="font-medium mr-4">
                  Successfully added to your cart!
                </h3>
              </div>
              <div className="flex gap-5 justify-center">
                <button
                  className="border border-deepgrey py-1 px-3 hover:bg-deepgrey hover:text-warmwhite cursor-pointer"
                  onClick={handleGoToCart}
                >
                  Go to cart
                </button>
                <button
                  className="border border-deepgrey py-1 px-3 hover:bg-deepgrey hover:text-warmwhite cursor-pointer"
                  onClick={closeCartModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAddCartSuccessfully;
