"use client";
import Image from "next/image";
import { useRadioValue } from "../_contextAPI/RadioValueContextApi";
import AddToFavorites from "./AddToFavorites";
import AddToCartIcon from "./AddToCartIcon";
import { useShoesParams } from "../_contextAPI/ShoesParamsContextApi";
import { useEffect } from "react";
import { useChangingColor } from "../_contextAPI/ChangingColorContextApi";
import { redirect } from "next/navigation";

function GridSection({ selectItemsOfSameCategory, category, currentUser }) {
  const { radioValue } = useRadioValue();
  const { setItemCategory } = useShoesParams();
  const { setColorSrc, setIsClickedImage } = useChangingColor();
  useEffect(() => {
    setItemCategory(category.shoesCategory);
  }, []);

  const ascendingOrder = selectItemsOfSameCategory
    .slice()
    .sort(function (a, b) {
      return a.price - b.price;
    });

  const descendingOrder = selectItemsOfSameCategory
    .slice()
    .sort(function (a, b) {
      return b.price - a.price;
    });

  const chooseOrder =
    radioValue === "Price(Low-High)"
      ? ascendingOrder
      : radioValue === "Price(High-Low)"
      ? descendingOrder
      : selectItemsOfSameCategory;

  const handleClickOnMainImage = (item) => {
    setColorSrc("");
    setIsClickedImage("");
    redirect(
      `/shoes/${category.shoesCategory}/${item.name.replaceAll(" ", "_")}`
    );
  };

  const handleClickOnImagesForColors = (e, item) => {
    setColorSrc(e.target.src);
    setIsClickedImage("");
    redirect(
      `/shoes/${category.shoesCategory}/${item.name.replaceAll(" ", "_")}`
    );
  };

  return (
    <div className="grid grid-flow-row grid-cols-4 gap-x-0.5 justify-items-center mt-5">
      {chooseOrder.map((heel) => {
        const colorsAvailable = Object.keys(heel.variants);
        const mainColorImage = heel.variants[colorsAvailable[0]].images;
        return (
          <div
            key={`${heel.id}, ${heel.mainColorImage}`}
            className="flex flex-col items-center group relative"
          >
            <div className="relative">
              <div className="absolute right-0 flex gap-1.5 ">
                <AddToFavorites
                  size="7"
                  itemID={heel.id}
                  name={heel.name}
                  item={heel}
                  currentUser={currentUser}
                />
                <AddToCartIcon itemID={heel.id} name={heel.name} item={heel} />
              </div>
              <button
                className="cursor-pointer"
                onClick={() => handleClickOnMainImage(heel)}
              >
                <Image
                  src={mainColorImage[0]}
                  alt="Main image of the pair of heels from catalog."
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
                    key={`${heel.id}, ${color}`}
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
                    onClick={(e) => handleClickOnImagesForColors(e, heel)}
                  >
                    <div className="w-[75px] h-[75px]">
                      <Image
                        src={heel.variants[color].images[0]}
                        overrideSrc={heel.variants[color].images[0]}
                        width={75}
                        height={75}
                        alt="Colors available for the pair of heels from catalog."
                      />
                    </div>
                  </button>
                );
              })}
            </div>
            <h3 className="font-semibold">{heel.name}</h3>
            <h4 className="font-medium mb-15 group-hover:mb-0">{`${heel.price} ${heel.currency}`}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default GridSection;
