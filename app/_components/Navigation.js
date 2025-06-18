"use client";
import Link from "next/link";
import {
  ChevronUpDownIcon,
  HeartIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRef, useState } from "react";

function Navigation() {
  const [isOpened, setIsOpened] = useState(false);
  const shoesSection = useRef(null);

  const showDropdownMenu = () => {
    console.log(shoesSection);
    shoesSection.current.className = "block";
  };

  const hideDropDownMenu = () => {
    shoesSection.current.className = "hidden";
  };

  return (
    <div className="bg-warmwhite border border-lightlavender flex  px-4  items-center justify-between flex-wrap basis-1/10 text-deepgrey">
      <div className="flex gap-8 items-center" onMouseLeave={hideDropDownMenu}>
        <Image src="/logo.png" width="75" height="75" alt="Logo" />
        <div>
          <button
            onMouseOver={showDropdownMenu}
            className="hover:bg-lightlavender px-4 py-2 rounded-xl cursor-pointer"
          >
            Shoes
          </button>
          <div className="hidden" ref={shoesSection}>
            <ul className="flex flex-col absolute mt-4 bg-lavender p-2 text-center rounded-sm">
              <Link
                href="/shoes/sport"
                className="hover:bg-lightlavender hover:w-full hover:rounded-sm hover:text-purple-800 hover:p-1"
              >
                Sport
              </Link>
              <Link
                href="/shoes/elegant"
                className="hover:bg-lightlavender hover:w-full hover:rounded-sm hover:text-purple-800 hover:p-1"
              >
                Elegant
              </Link>
              <Link
                href="/shoes/summer"
                className="hover:bg-lightlavender hover:w-full hover:rounded-sm hover:text-purple-800 hover:p-1"
              >
                Summer
              </Link>
            </ul>
          </div>
        </div>
        <Link href="/accessories" className=" text-deepgrey">
          Accessories
        </Link>
      </div>
      <div className="flex gap-8">
        <Link href="/">
          <HomeIcon className="size-7 text-deepgrey" />
        </Link>

        <Link href="/favorites">
          <HeartIcon className="size-7 text-deepgrey" />
        </Link>
        <Link href="/bag">
          <ShoppingBagIcon className="size-7 text-deepgrey" />
        </Link>
        <Link href="/login">
          <UserIcon className="size-7 text-deepgrey" />
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
