"use client";
import { useChooseSize } from "./ChooseSizeContextApi";

function ButtonForSize() {
  const { clickedSize, setClickedSize, setIsNotSelected } = useChooseSize();
  const sizes = [34, 35, 36, 37, 38, 39, 40, 41];
  const handleChooseSize = (e) => {
    e.preventDefault();
    // console.log(e.target);
    setClickedSize(e.target.innerHTML);
    setIsNotSelected(false);
  };
  //console.log(clickedSize);
  return (
    <ul className="flex mt-2 gap-3 ">
      {sizes.map((size) => {
        return (
          <button
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
