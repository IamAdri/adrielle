"use client";
import { useEffect, useRef } from "react";
import { useChooseSize } from "../_contextAPI/ChooseSizeContextApi";

function ButtonForSize({ buttonSizeRef }) {
  const { clickedSize, setClickedSize, setIsNotSelected } = useChooseSize();
  const sizes = [34, 35, 36, 37, 38, 39, 40, 41];

  const handleChooseSize = (e) => {
    e.preventDefault();
    setClickedSize(e.target.innerHTML);
    setIsNotSelected(false);
  };
  return (
    <ul className="flex mt-2 lg:gap-3 gap-1.5">
      {sizes.map((size) => {
        return (
          <button
            ref={buttonSizeRef}
            key={size}
            className={`focus:border-deepgrey border-grey border  hover:border-deepgrey hover:cursor-pointer py- 2 px-3`}
            onClick={handleChooseSize}
          >
            {size}
          </button>
        );
      })}
    </ul>
  );
}

export default ButtonForSize;
