"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

function Pagination({ selectItemsOfSameCategory }) {
  useEffect(() => {}, []);
  const handleNextPage = () => {};
  return (
    <div className="flex justify-between">
      <div>
        <span>1-8 of 23 products</span>
      </div>
      <div className="flex gap-5 text-warmwhite">
        <button className="flex items-center bg-darklavender p-1.5 rounded-sm cursor-pointer hover:bg-lavenderhighlight">
          <ChevronLeftIcon className="size-5" />
          <span>Previous page</span>
        </button>
        <button
          className="flex items-center bg-darklavender p-1.5 rounded-sm cursor-pointer hover:bg-lavenderhighlight"
          onClick={handleNextPage}
        >
          <span>Next page</span>
          <ChevronRightIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
