"use client";
import Link from "next/link";

function DropdownItems({ mainRoot, categories }) {
  return (
    <div className="hidden peer-hover:flex hover:flex w-fit flex-col  ">
      <ul className="flex flex-col absolute bg-lavender p-2 text-center rounded-sm">
        {categories.map((category) => {
          return (
            <Link
              key={category}
              href={
                category === "newCollection"
                  ? "/newCollection"
                  : `/${mainRoot}/${category}`
              }
              className="hover:bg-lightlavender hover:w-full hover:rounded-sm hover:text-purple-800 hover:p-1"
            >
              {category === "newCollection"
                ? "New Collection"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default DropdownItems;
