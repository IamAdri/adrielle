"use client";
import Image from "next/image";
import ButtonForDeletingFavoriteItem from "./ButtonForDeletingFavoriteItem";
import AddToCartIcon from "./AddToCartIcon";
import { useChangingColor } from "../_contextAPI/ChangingColorContextApi";
import { redirect } from "next/navigation";

function FavoriteItem({ favoriteItem, currentUser }) {
  const { setColorSrc } = useChangingColor();
  //console.log(favoriteItem);
  const handleDisplayImage = (item) => {
    setColorSrc(item.selectedColorSrc);
    redirect(
      `/shoes/${
        favoriteItem.shoes.category
      }/${favoriteItem.shoes.name.replaceAll(" ", "_")}`
    );
  };
  return (
    <ul className="flex flex-col items-center gap-5 ">
      <li className="relative">
        <div className="absolute right-0 flex gap-1.5">
          <AddToCartIcon
            name={favoriteItem.shoes.name}
            item={favoriteItem.shoes}
            selectedSrc={favoriteItem.selectedColorSrc}
          />
          <ButtonForDeletingFavoriteItem
            item={favoriteItem}
            currentUser={currentUser}
          />
        </div>
        <button
          className="peer cursor-pointer"
          onClick={() => handleDisplayImage(favoriteItem)}
        >
          <Image
            src={favoriteItem.selectedColorSrc}
            width={250}
            height={250}
            alt="Main image for favorite item."
          />
        </button>
      </li>
      <div className="justify-center w-50 h-15 py-1.5 text-xl text-warmwhite">
        <li>
          <h2 className="font-bold text-lg text-deepgrey">
            {favoriteItem.shoes.name}
          </h2>
        </li>
        <li>
          <h3 className="font-medium text-base text-deepgrey">
            {`${favoriteItem.shoes.price} ${favoriteItem.shoes.currency}`}
          </h3>
        </li>
      </div>
    </ul>
  );
}

export default FavoriteItem;
/* <Link
          href={`/shoes/${
            favoriteItem.shoes.category
          }/${favoriteItem.shoes.name.replaceAll(" ", "_")}`}
          className="peer"
        >
          <Image
            src={favoriteItem.selectedColorSrc}
            width={250}
            height={250}
            alt="Main image for favorite item."
          />
        </Link>*/
