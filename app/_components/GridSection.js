"use client";
import Image from "next/image";
import { useRadioValue } from "../_contextAPI/RadioValueContextApi";
import AddToFavorites from "./AddToFavorites";
import AddToCartIcon from "./AddToCartIcon";
import { useChangingColor } from "../_contextAPI/ChangingColorContextApi";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  currentPageAtom,
  sliceEndAtom,
  sliceStartAtom,
} from "../storage/atoms";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function GridSection({ selectItemsOfSameCategory, currentUser }) {
  const { radioValue } = useRadioValue();
  const { setColorSrc, setIsClickedImage } = useChangingColor();
  const path = usePathname();
  const ascendingOrder = selectItemsOfSameCategory
    .slice()
    .sort(function (a, b) {
      const discountA =
        a.discount !== null ? (a.price * a.discount) / 100 : null;
      const priceAfterDiscountA = a.price - discountA;
      const discountB =
        b.discount !== null ? (b.price * b.discount) / 100 : null;
      const priceAfterDiscountB = b.price - discountB;
      return priceAfterDiscountA - priceAfterDiscountB;
    });

  const descendingOrder = selectItemsOfSameCategory
    .slice()
    .sort(function (a, b) {
      const discountA =
        a.discount !== null ? (a.price * a.discount) / 100 : null;
      const priceAfterDiscountA = a.price - discountA;
      const discountB =
        b.discount !== null ? (b.price * b.discount) / 100 : null;
      const priceAfterDiscountB = b.price - discountB;
      return priceAfterDiscountB - priceAfterDiscountA;
    });

  const chooseOrder =
    radioValue === "Price(Low-High)"
      ? ascendingOrder
      : radioValue === "Price(High-Low)"
      ? descendingOrder
      : selectItemsOfSameCategory;

  const [currentSliceStart, setCurrentSliceStart] = useAtom(sliceStartAtom);
  const [currentSliceEnd, setCurrentSliceEnd] = useAtom(sliceEndAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  useEffect(() => {
    setColorSrc("");
  }, []);
  console.log(selectItemsOfSameCategory.slice());
  const handleClickOnMainImage = (item) => {
    setColorSrc("");
    setIsClickedImage("");
    redirect(`${path}/${item.name.replaceAll(" ", "_")}`);
  };

  const handleClickOnImagesForColors = (e, item) => {
    setColorSrc(e.target.src);
    setIsClickedImage("");
    redirect(`${path}/${item.name.replaceAll(" ", "_")}`);
  };
  console.log(selectItemsOfSameCategory);
  const nextPage = () => {
    setCurrentSliceStart(currentSliceStart + 8);
    setCurrentSliceEnd(currentSliceEnd + 8);
    setCurrentPage(currentPage + 1);
  };
  const previousPage = () => {
    setCurrentSliceStart(currentSliceStart - 8);
    setCurrentSliceEnd(currentSliceEnd - 8);
    setCurrentPage(currentPage - 1);
  };
  console.log(currentPage);
  return (
    <div>
      <div className="grid grid-flow-row grid-cols-4 gap-x-0.5 justify-items-center mt-5">
        {chooseOrder.slice(currentSliceStart, currentSliceEnd).map((item) => {
          const colorsAvailable = Object.keys(item.variants);
          const mainColorImage = item.variants[colorsAvailable[0]].images;
          const discount =
            item.discount !== null ? (item.price * item.discount) / 100 : null;
          const priceAfterDiscount = item.price - discount;
          return (
            <div
              key={`${item.id}, ${item.mainColorImage}`}
              className="flex flex-col items-center group relative"
            >
              <div className="relative">
                <div className="absolute right-0 flex-col justify-end">
                  <div className="flex">
                    <AddToFavorites
                      size="7"
                      itemID={item.id}
                      name={item.name}
                      item={item}
                      currentUser={currentUser}
                    />
                    <AddToCartIcon
                      item={item}
                      priceAfterDiscount={priceAfterDiscount}
                    />
                  </div>
                  {item.discount !== null && (
                    <div className="bg-lavender font-bold text-warmwhite text-xl">
                      -{item.discount}%
                    </div>
                  )}
                </div>
                <button
                  className="cursor-pointer"
                  onClick={() => handleClickOnMainImage(item)}
                >
                  <Image
                    src={mainColorImage[0]}
                    alt="Main image of the pair of items from catalog."
                    width={350}
                    height={350}
                  />
                </button>
              </div>
              <div className="flex gap-0.5 items-center">
                {colorsAvailable.map((color) => {
                  const colorMap = {
                    red: "bg-red",
                    gold: "bg-gold",
                    black: "bg-black",
                    blue: "bg-blue",
                    pink: "bg-pink",
                    grey: "bg-grey",
                    beige: "bg-beige",
                    green: "bg-green",
                    purple: "bg-purple",
                    nude: "bg-nude",
                    brown: "bg-brown",
                    white: "bg-white",
                    yellow: "bg-yellow",
                    silver: "bg-silver",
                    orange: "bg-orange",
                    claret: "bg-claret",
                  };
                  return (
                    <div
                      key={`${item.id}, ${color}`}
                      className={`rounded-full ${colorMap[color]} w-5 h-5 border border-deepgrey group-hover:opacity-0 group-hover:h-0 my-3 group-hover:my-0`}
                    ></div>
                  );
                })}
              </div>
              <div className="flex justify-center h-0 w-0 opacity-0 group-hover:opacity-100 group-hover:h-[75px] group-hover:w-[75px]">
                {colorsAvailable.map((color) => {
                  return (
                    <button
                      className="cursor-pointer"
                      key={color}
                      onClick={(e) => handleClickOnImagesForColors(e, item)}
                    >
                      <div className="w-[75px] h-[75px]">
                        <Image
                          src={item.variants[color].images[0]}
                          overrideSrc={item.variants[color].images[0]}
                          width={75}
                          height={75}
                          alt="Colors available for the pair of items from catalog."
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
              <h3 className="font-semibold">{item.name}</h3>
              {item.discount !== null ? (
                <div className="font-medium mb-15 group-hover:mb-0 flex gap-1.5">
                  <h4>{`${priceAfterDiscount} EUR`}</h4>
                  <h4 className=" text-coolgrey line-through">{`${item.price} EUR`}</h4>
                </div>
              ) : (
                <h4 className="font-medium mb-15 group-hover:mb-0">{`${item.price} EUR`}</h4>
              )}
            </div>
          );
        })}
      </div>
      {chooseOrder.length > 8 && (
        <div className="flex justify-between">
          <div>
            <span>
              {currentSliceStart + 1}-
              {currentSliceEnd > chooseOrder.length
                ? chooseOrder.length
                : currentSliceEnd}{" "}
              of {chooseOrder.length} products
            </span>
          </div>
          <div className="flex gap-5 text-warmwhite justify-end">
            {currentSliceStart >= 4 && (
              <button
                className="flex items-center bg-darklavender p-1.5 rounded-sm cursor-pointer hover:bg-lavenderhighlight"
                onClick={previousPage}
              >
                <ChevronLeftIcon className="size-5" />
                <span>Previous page</span>
              </button>
            )}
            {currentSliceEnd < chooseOrder.length && (
              <button
                className="flex items-center bg-darklavender p-1.5 rounded-sm cursor-pointer hover:bg-lavenderhighlight"
                onClick={nextPage}
              >
                <span>Next page</span>
                <ChevronRightIcon className="size-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GridSection;
/*<div className="grid grid-flow-row grid-cols-4 gap-x-0.5 justify-items-center mt-5">
      {chooseOrder.map((item) => {
        const colorsAvailable = Object.keys(item.variants);
        const mainColorImage = item.variants[colorsAvailable[0]].images;
        const discount =
          item.discount !== null ? (item.price * item.discount) / 100 : null;
        const priceAfterDiscount = item.price - discount;
        return (
          <div
            key={`${item.id}, ${item.mainColorImage}`}
            className="flex flex-col items-center group relative"
          >
            <div className="relative">
              <div className="absolute right-0 flex-col justify-end">
                <div className="flex">
                  <AddToFavorites
                    size="7"
                    itemID={item.id}
                    name={item.name}
                    item={item}
                    currentUser={currentUser}
                  />
                  <AddToCartIcon
                    item={item}
                    priceAfterDiscount={priceAfterDiscount}
                  />
                </div>
                {item.discount !== null && (
                  <div className="bg-lavender font-bold text-warmwhite text-xl">
                    -{item.discount}%
                  </div>
                )}
              </div>
              <button
                className="cursor-pointer"
                onClick={() => handleClickOnMainImage(item)}
              >
                <Image
                  src={mainColorImage[0]}
                  alt="Main image of the pair of items from catalog."
                  width={350}
                  height={350}
                />
              </button>
            </div>
            <div className="flex gap-0.5 items-center">
              {colorsAvailable.map((color) => {
                const colorMap = {
                  red: "bg-red",
                  gold: "bg-gold",
                  black: "bg-black",
                  blue: "bg-blue",
                  pink: "bg-pink",
                  grey: "bg-grey",
                  beige: "bg-beige",
                  green: "bg-green",
                  purple: "bg-purple",
                  nude: "bg-nude",
                  brown: "bg-brown",
                  white: "bg-white",
                  yellow: "bg-yellow",
                  silver: "bg-silver",
                  orange: "bg-orange",
                  claret: "bg-claret",
                };
                return (
                  <div
                    key={`${item.id}, ${color}`}
                    className={`rounded-full ${colorMap[color]} w-5 h-5 border border-deepgrey group-hover:opacity-0 group-hover:h-0 my-3 group-hover:my-0`}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-center h-0 w-0 opacity-0 group-hover:opacity-100 group-hover:h-[75px] group-hover:w-[75px]">
              {colorsAvailable.map((color) => {
                return (
                  <button
                    className="cursor-pointer"
                    key={color}
                    onClick={(e) => handleClickOnImagesForColors(e, item)}
                  >
                    <div className="w-[75px] h-[75px]">
                      <Image
                        src={item.variants[color].images[0]}
                        overrideSrc={item.variants[color].images[0]}
                        width={75}
                        height={75}
                        alt="Colors available for the pair of items from catalog."
                      />
                    </div>
                  </button>
                );
              })}
            </div>
            <h3 className="font-semibold">{item.name}</h3>
            {item.discount !== null ? (
              <div className="font-medium mb-15 group-hover:mb-0 flex gap-1.5">
                <h4>{`${priceAfterDiscount} EUR`}</h4>
                <h4 className=" text-coolgrey line-through">{`${item.price} EUR`}</h4>
              </div>
            ) : (
              <h4 className="font-medium mb-15 group-hover:mb-0">{`${item.price} EUR`}</h4>
            )}
          </div>
        );
      })}
    </div>*/
