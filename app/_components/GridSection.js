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
import Button from "./Button";
import { colorsAvailableFunction, priceWithDiscount } from "../_lib/helper";

function GridSection({ selectItemsOfSameCategory, currentUser }) {
  const { radioValue } = useRadioValue();
  const { setColorSrc, setIsClickedImage } = useChangingColor();
  const path = usePathname();
  const [currentSliceStart, setCurrentSliceStart] = useAtom(sliceStartAtom);
  const [currentSliceEnd, setCurrentSliceEnd] = useAtom(sliceEndAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  //Order products ascending/descending price based on sorting option chosen
  const ascendingOrder = selectItemsOfSameCategory
    .slice()
    .sort(function (a, b) {
      const priceAfterDiscountA = priceWithDiscount(a.discount, a.price);
      const priceAfterDiscountB = priceWithDiscount(b.discount, b.price);
      return priceAfterDiscountA - priceAfterDiscountB;
    });

  const descendingOrder = selectItemsOfSameCategory
    .slice()
    .sort(function (a, b) {
      const priceAfterDiscountA = priceWithDiscount(a.discount, a.price);
      const priceAfterDiscountB = priceWithDiscount(b.discount, b.price);
      return priceAfterDiscountB - priceAfterDiscountA;
    });
  const chooseOrder =
    radioValue === "Price(Low-High)"
      ? ascendingOrder
      : radioValue === "Price(High-Low)"
      ? descendingOrder
      : selectItemsOfSameCategory;
  //Set color src from provider to "" and to first page always on first render
  useEffect(() => {
    setColorSrc("");
    setCurrentSliceStart(0);
    setCurrentSliceEnd(8);
    setCurrentPage(1);
  }, []);
  //Redirect to product page when user clicks on main image of product
  const handleClickOnMainImage = (item) => {
    setColorSrc("");
    setIsClickedImage("");
    redirect(`${path}/${item.name.replaceAll(" ", "_")}`);
  };
  //Redirect to product page when user clicks on images of product per color
  const handleClickOnImagesForColors = (e, item) => {
    setColorSrc(e.target.src);
    setIsClickedImage("");
    redirect(`${path}/${item.name.replaceAll(" ", "_")}`);
  };
  //Change page when clicking on next/previous page
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

  return (
    <div>
      <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-0.5 justify-items-center mt-5">
        {chooseOrder.slice(currentSliceStart, currentSliceEnd).map((item) => {
          const { colorsAvailable, mainColorImage } =
            colorsAvailableFunction(item);
          const priceAfterDiscount = priceWithDiscount(
            item.discount,
            item.price
          );
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
                      item={item}
                      name={item.name}
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
                    src={mainColorImage}
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
                          src={item.variants[color][0]}
                          overrideSrc={item.variants[color][0]}
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
        <div className="flex justify-between items-center">
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
              <Button handleClick={previousPage}>
                <ChevronLeftIcon className="size-5" />
                <span>Previous page</span>
              </Button>
            )}
            {currentSliceEnd < chooseOrder.length && (
              <Button handleClick={nextPage}>
                <span>Next page</span>
                <ChevronRightIcon className="size-5" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GridSection;
