"use client";
import Link from "next/link";

function DropdownItems({ refElement, mainRoot, categories }) {
  return (
    <div className="hidden" ref={refElement}>
      <ul className="flex flex-col absolute mt-4 bg-lavender p-2 text-center rounded-sm">
        {categories.map((cat) => {
          return (
            <Link
              key={cat}
              href={`/${mainRoot}/${cat}`}
              className="hover:bg-lightlavender hover:w-full hover:rounded-sm hover:text-purple-800 hover:p-1"
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default DropdownItems;
