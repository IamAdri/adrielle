import AddToFavorites from "@/app/_components/AddToFavorites";
import ButtonForChangingColor from "@/app/_components/ButtonForChangingColor";
import ButtonForImages from "@/app/_components/ButtonForImages";
import { ChangingColorProvider } from "@/app/_components/ChangingColorContext";
import Drawer from "@/app/_components/Drawer";
import ListOfSizes from "@/app/_components/ListOfSizes";
import { getShoes } from "@/app/_lib/data-service";
import { getCategory } from "@/app/_lib/helper";
import {
  ChevronRightIcon,
  HeartIcon as SolidHeart,
} from "@heroicons/react/24/solid";

import Link from "next/link";

async function Page({ params }) {
  const itemParams = await params;
  //console.log(itemParams);
  const shoes = await getShoes();
  const itemName = itemParams.itemID.replaceAll("_", " ");
  const selectedItem = shoes.filter((item) => item.name === itemName);
  const itemDetails = selectedItem[0];
  const colorsAvailable = Object.keys(itemDetails.variants);
  const heading = getCategory(itemParams);
  //itemParams.shoesCategory.charAt(0).toUpperCase() +
  //itemParams.shoesCategory.slice(1);

  return (
    <ChangingColorProvider>
      <div className="flex justify-start ml-10 gap-1 items-center">
        <Link href="/shoes" className="font-medium hover:underline ">
          Shoes
        </Link>
        <ChevronRightIcon className="size-4 pt-[3px]" />
        <Link
          href={`/shoes/${itemParams.shoesCategory}`}
          className="font-medium hover:underline "
        >
          {heading}
        </Link>
        <ChevronRightIcon className="size-4 pt-[3px]" />
        <Link
          href={`/shoes/${itemParams.shoesCategory}/${itemParams.itemID}`}
          className="font-medium hover:underline "
        >
          {itemName}
        </Link>
      </div>
      <div className="flex justify-center gap-35 mt-25">
        <div className="flex gap-2 items-center">
          <ButtonForImages
            itemDetails={itemDetails}
            colorsAvailable={colorsAvailable}
          />
        </div>
        <div className="flex flex-col flex-wrap">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-left">{itemName}</h1>
            <AddToFavorites itemName={itemName} />
            {/**/}
          </div>

          <h4 className="font-bold text-2xl mt-1 text-left">{`${itemDetails.price} ${itemDetails.currency}`}</h4>

          <p className="lg:w-200 sm:w-100 mt-10 text-left">
            {itemDetails.description}
          </p>
          <p className="mt-10 text-left">Colors available</p>
          <div className="flex mt-2">
            {colorsAvailable.map((color) => {
              return (
                <ButtonForChangingColor
                  key={color}
                  color={color}
                  itemDetails={itemDetails}
                  colorsAvailable={colorsAvailable}
                />
              );
            })}
          </div>
          <div className="w-fit">
            <div className="flex mt-10 justify-between">
              <p className="text-left">Choose your size</p>
              <Drawer />
            </div>
            <ListOfSizes />
          </div>
        </div>
      </div>
    </ChangingColorProvider>
  );
}

export default Page;
