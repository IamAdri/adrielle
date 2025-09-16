"use client";
import Image from "next/image";
import ButtonForDeletingFavoriteItem from "./ButtonForDeletingFavoriteItem";
import AddToCartIcon from "./AddToCartIcon";
import { useChangingColor } from "../_contextAPI/ChangingColorContextApi";
import { redirect } from "next/navigation";

function FavoriteItem({ favoriteItem, currentUser }) {
  const { setColorSrc } = useChangingColor();
  const handleDisplayImage = (item) => {
    setColorSrc(item.selectedColorSrc);
    redirect(
      `/${favoriteItem.items.itemType}/${
        favoriteItem.items.category[0]
      }/${favoriteItem.items.name.replaceAll(" ", "_")}`
    );
  };
  const discount =
    favoriteItem.items.discount !== null
      ? (favoriteItem.items.price * favoriteItem.items.discount) / 100
      : null;
  const priceAfterDiscount = favoriteItem.items.price - discount;

  return (
    <ul className="flex flex-col items-center gap-5 ">
      <li className="relative">
        <div className="absolute right-0 flex-col gap-1.5">
          <div className="flex">
            <AddToCartIcon
              item={favoriteItem.items}
              selectedSrc={favoriteItem.selectedColorSrc}
              priceAfterDiscount={priceAfterDiscount}
            />
            <ButtonForDeletingFavoriteItem
              item={favoriteItem}
              currentUser={currentUser}
            />
          </div>
          {favoriteItem.items.discount !== null && (
            <div className="bg-lavender font-bold text-warmwhite text-xl">
              -{favoriteItem.items.discount}%
            </div>
          )}
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
      <div className="justify-center w-50 h-15 py-1.5 text-xl">
        <li>
          <h2 className="font-bold text-lg">{favoriteItem.items.name}</h2>
        </li>
        <li>
          {favoriteItem.items.discount !== null ? (
            <div className="font-medium text-base flex gap-1.5 justify-center">
              <h4>{`${priceAfterDiscount} EUR`}</h4>
              <h4 className="text-coolgrey line-through">{`${favoriteItem.items.price} EUR`}</h4>
            </div>
          ) : (
            <h4 className="font-medium text-base">{`${favoriteItem.items.price} EUR`}</h4>
          )}
        </li>
      </div>
    </ul>
  );
}

export default FavoriteItem;
