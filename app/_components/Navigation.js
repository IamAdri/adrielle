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
import { useFavoriteItems } from "./FavoriteItemsContextApi";
import { getCartItems, getFavoriteItems } from "../_lib/data-service";
import { useCartItems } from "./CartItemsContextApi";

function Navigation() {
  const [scrollY, setScrollY] = useState(0);
  const { isFavorite, setIsFavorite } = useFavoriteItems();
  const { isCart, setIsCart } = useCartItems();
  // console.log(isFavorite);
  const onScroll = useCallback((event) => {
    const { pageYOffset, scrollY } = window;
    //console.log("yOffset", pageYOffset, "scrollY", scrollY);
    setScrollY(window.pageYOffset);
  }, []);

  useEffect(() => {
    async function loadFavoriteItems() {
      const favoriteItems = await getFavoriteItems();
      if (isFavorite === 0) setIsFavorite(favoriteItems.length);
    }
    loadFavoriteItems();
  }, []);

  useEffect(() => {
    async function loadCartItems() {
      const cartItems = await getCartItems();
      setIsCart(cartItems.length);
    }
    loadCartItems();
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
        <div className="flex gap-0.5 items-center">
          <Link href="/favorites">
            <HeartIcon className="size-7 text-deepgrey" />
          </Link>
          <span>{isFavorite > 0 && isFavorite}</span>
        </div>
        <div className="flex gap-0.5 items-center">
          <Link href="/bag">
            <ShoppingBagIcon className="size-7 text-deepgrey" />
          </Link>
          <span>{isCart > 0 && isCart}</span>
        </div>

        <Link href="/login">
          <UserIcon className="size-7 text-deepgrey" />
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
