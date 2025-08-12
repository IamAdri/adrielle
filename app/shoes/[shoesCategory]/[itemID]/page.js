import AddToFavorites from "@/app/_components/AddToFavorites";
import ButtonForChangingColor from "@/app/_components/ButtonForChangingColor";
import ButtonForImages from "@/app/_components/ButtonForImages";
import ButtonForSize from "@/app/_components/ButtonForSize";
import Drawer from "@/app/_components/Drawer";
import { getItemById } from "@/app/_lib/data-service";
import { getCategory } from "@/app/_lib/helper";
import {
  ChevronRightIcon,
  HeartIcon as SolidHeart,
} from "@heroicons/react/24/solid";

import Link from "next/link";
import MainHeading from "@/app/_components/MainHeading";

import AddToCartFromItemPage from "@/app/_components/AddToCartFromItemPage";
import { auth } from "@/app/_lib/auth";

async function Page({ params }) {
  const itemParams = await params;
  const itemName = itemParams.itemID.replaceAll("_", " ");
  const item = await getItemById(itemName);
  const colorsAvailable = Object.keys(item.variants);
  const heading = getCategory(itemParams);
  const session = await auth();
  const currentUser = session?.user.email || "not loged in";
  return (
    <div>
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
            itemDetails={item}
            colorsAvailable={colorsAvailable}
          />
        </div>
        <div className="flex flex-col flex-wrap">
          <div className="flex justify-between">
            <MainHeading className="text-3xl font-bold text-left">
              {itemName}
            </MainHeading>
            <AddToFavorites
              name={itemName}
              itemID={item.id}
              item={item}
              currentUser={currentUser}
            />
          </div>

          <h4 className="font-bold text-2xl mt-1 text-left">{`${item.price} ${item.currency}`}</h4>

          <p className="lg:w-200 sm:w-100 mt-10 text-left">
            {item.description}
          </p>
          <p className="mt-10 text-left">Colors available</p>
          <div className="flex mt-2">
            {colorsAvailable.map((color) => {
              return (
                <ButtonForChangingColor
                  key={color}
                  color={color}
                  itemDetails={item}
                />
              );
            })}
          </div>
          <div className="w-fit">
            <div className="flex mt-10 justify-between">
              <p className="text-left">Choose your size</p>
              <Drawer />
            </div>
            <ButtonForSize />
            <AddToCartFromItemPage item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
