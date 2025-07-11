import Image from "next/image";
import { getItemById, getShoesById } from "../_lib/data-service";
import ButtonForSize from "./ButtonForSize";
import AddToCart from "./AddToCart";
import Link from "next/link";

function Modal({ setOpenModal, name, item, id, category }) {
  console.log(item);
  console.log(category);
  //const selectedItem = await getItemById(name);
  const colorsAvailable = Object.keys(item.variants);
  const mainColorImage = item.variants[colorsAvailable[0]].images[0];
  console.log(item);
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModal(false)}
        ></div>
        <div className="flex justify-center items-center min-h-screen px-4 py-8">
          <div className="bg-warmwhite relative p-5">
            <div className="flex flex-col items-end">
              <button
                className="w-fit border px-2 justify-center mb-2 rounded-full hover:cursor-pointer"
                onClick={() => setOpenModal(false)}
              >
                x
              </button>
              <div className="flex gap-2 items-center ">
                <div>
                  <Link
                    href={`/shoes/${category.shoesCategory}/${name.replaceAll(
                      " ",
                      "_"
                    )}`}
                  >
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
                  <h3 className="mt-5 mb-1 font-medium">Choose size</h3>
                  <ButtonForSize />
                  <AddToCart name={name} id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
