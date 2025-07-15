"use client";
import Image from "next/image";
import { useChangingColor } from "../_contextAPI/ChangingColorContextApi";

function ButtonForChangingColor({ color, itemDetails }) {
  const { setColorSrc, setIsClickedImage } = useChangingColor();

  const handleChangeColor = (e) => {
    setColorSrc(() => e.target.src);
    setIsClickedImage("");
  };

  return (
    <button onClick={handleChangeColor} className="cursor-pointer">
      <Image
        src={itemDetails.variants[color].images[0]}
        overrideSrc={itemDetails.variants[color].images[0]}
        width={75}
        height={75}
        alt="Colors available for the pair of heels from catalog."
      />
    </button>
  );
}

export default ButtonForChangingColor;
