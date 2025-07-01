"use client";
import Link from "next/link";
import {
  HeartIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import DropdownMenu from "./DropdownMenu";
import { useCallback, useEffect, useState } from "react";

function Navigation() {
  const [scrollY, setScrollY] = useState(0);

  const onScroll = useCallback((event) => {
    const { pageYOffset, scrollY } = window;
    //console.log("yOffset", pageYOffset, "scrollY", scrollY);
    setScrollY(window.pageYOffset);
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);
  return (
    <div
      className={`fixed top-0 right-0 left-0 z-100 ${
        scrollY > 0 ? "bg-nude border-none" : ""
      } border-b-3 border-lightlavender flex  px-4  items-center justify-between flex-wrap basis-1/10 text-deepgrey`}
    >
      <DropdownMenu />
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
