"use client";
import Image from "next/image";
import { useChangingColor } from "../_contextAPI/ChangingColorContextApi";
import { colorsAvailableFunction } from "../_lib/helper";

function ButtonForImages({ itemDetails }) {
  const { colorSrc, clickedImage, setIsClickedImage } = useChangingColor();
  const {
    mainColorImage,
    secondColorImage,
    mainColorGallery,
    secondColorGallery,
  } = colorsAvailableFunction(itemDetails);
  //Show product images based on selected color
  const chooseGallery = secondColorGallery.includes(colorSrc)
    ? secondColorGallery
    : mainColorGallery;
  const chooseMainImage = secondColorGallery.includes(colorSrc)
    ? secondColorImage
    : mainColorImage;
  const changeMainImage = (e) => {
    setIsClickedImage(e.target.src);
  };
  return (
    <>
      <div className="flex flex-col gap-1 2xl:w-[125px] xl:w-[100px] w-[75px]">
        {chooseGallery.map((image) => {
          return (
            <button
              key={image}
              onClick={changeMainImage}
              className="cursor-pointer"
            >
              <Image
                src={image}
                overrideSrc={image}
                width={122}
                height={122}
                alt="The selected pair of shoes presented from different position"
                className="border-2 border-grey opacity-30 hover:opacity-100"
              />
            </button>
          );
        })}
      </div>
      <div className="2xl:w-[500px] xl:w-[400px] w-[300px]">
        <Image
          src={clickedImage !== "" ? clickedImage : chooseMainImage}
          alt="Main image of the pair of heels from catalog."
          width={500}
          height={500}
        />
      </div>
    </>
  );
}

export default ButtonForImages;
