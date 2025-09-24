"use client";

import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useRadioValue } from "../_contextAPI/RadioValueContextApi";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import {
  currentPageAtom,
  sliceEndAtom,
  sliceStartAtom,
} from "../storage/atoms";
import { useAtom } from "jotai";

function SortingItems() {
  const { radioValue, setRadioValue } = useRadioValue();
  const [isMounted, setIsMounted] = useState(false);
  const [isSortingClicked, setIsSortingClicked] = useState(false);
  const [currentSliceStart, setCurrentSliceStart] = useAtom(sliceStartAtom);
  const [currentSliceEnd, setCurrentSliceEnd] = useAtom(sliceEndAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  useEffect(() => {
    // Așteaptă până la client render pentru a preveni hydration mismatch
    setIsMounted(true);
  }, []);

  const handleRadioChange = (value) => {
    setRadioValue(value);
    setIsSortingClicked(false);
    setCurrentSliceStart(0);
    setCurrentSliceEnd(8);
    setCurrentPage(1);
  };

  const showRadioOptions = (e) => {
    e.preventDefault();
    setIsSortingClicked(!isSortingClicked);
  };
  if (!isMounted) return <Spinner />;
  return (
    <div className="flex flex-col gap-1 items-end mt-5">
      <div className="w-40 mr-2">
        <button
          onClick={showRadioOptions}
          className="flex items-center gap-2 justify-center border border-coolgrey font-medium cursor-pointer bg-warmwhite w-full"
        >
          <span>SORT BY</span>
          <ArrowDownIcon className="size-3" />
        </button>
        <div
          className={`${
            isSortingClicked
              ? "opacity-100 b-t absolute flex flex-col gap-2 items-center pl-0.5 py-1 w-40 z-2 border-x border-b border-coolgrey bg-warmwhite"
              : "hidden"
          } `}
        >
          <div className="flex gap-1">
            <input
              type="radio"
              id="Price(Low-High)"
              defaultValue="Price(Low-High)"
              checked={radioValue === "Price(Low-High)"}
              onChange={() => {
                handleRadioChange("Price(Low-High)");
              }}
              className="cursor-pointer"
            ></input>
            <label htmlFor="Price(Low-High)" className="cursor-pointer">
              Price(Low-High)
            </label>
          </div>
          <div className="flex gap-1">
            <input
              type="radio"
              id="Price(High-Low)"
              value="Price(High-Low)"
              checked={radioValue === "Price(High-Low)"}
              onChange={() => {
                handleRadioChange("Price(High-Low)");
              }}
              className="cursor-pointer"
            ></input>
            <label htmlFor="Price(High-Low)" className="cursor-pointer">
              Price(High-Low)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortingItems;
