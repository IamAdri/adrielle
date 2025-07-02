"use client";
import Image from "next/image";
import ButtonForAddingToCart from "./ButtonForAddingtoCart";
import ButtonForDeletingFavoriteItem from "./ButtonForDeletingFavoriteItem";
import Link from "next/link";
import { useState } from "react";

function FavoriteItem({ favoriteItem, mainColorImage }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <ul className="flex flex-col items-center gap-5 ">
      <li className="relative">
        <ButtonForDeletingFavoriteItem favoriteItem={favoriteItem} />
        <Link
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          href={`/shoes/${
            favoriteItem.shoes.category
          }/${favoriteItem.shoes.name.replaceAll(" ", "_")}`}
          className="peer"
        >
          <Image
            src={mainColorImage}
            width={250}
            height={250}
            alt="Main image for favorite item."
          />
        </Link>
      </li>
      <ButtonForAddingToCart
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        favoriteItem={favoriteItem}
      />
    </ul>
  );
}

export default FavoriteItem;
