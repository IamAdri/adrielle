"use client";
import Image from "next/image";
import { useChangingColor } from "./ChangingColorContext";

function ButtonForImages({ itemDetails, colorsAvailable }) {
  const { colorSrc, clickedImage, setIsClickedImage } = useChangingColor();
  const mainColorImage = itemDetails.variants[colorsAvailable[0]].images[0];
  const secondColorImage = itemDetails.variants[colorsAvailable[1]].images[0];
  const mainColorGallery = itemDetails.variants[colorsAvailable[0]].images;
  const secondColorGallery = itemDetails.variants[colorsAvailable[1]].images;

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
      <div className="flex flex-col gap-1">
        {chooseGallery.map((image) => {
          return (
            <button
              key={image}
              onClick={changeMainImage}
              className="hover:cursor-pointer"
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
      <Image
        src={clickedImage !== "" ? clickedImage : chooseMainImage}
        alt="Main image of the pair of heels from catalog."
        width={500}
        height={500}
      />
    </>
  );
}

export default ButtonForImages;
