import Image from "next/image";
import { getShoes } from "../_lib/data-service";
import Link from "next/link";
import SortingItems from "./SortingItems";
import { Suspense } from "react";
import Spinner from "./Spinner";
import GridSection from "./GridSection";
import { RadioValueProvider } from "./RadioValueContext";

async function HeelsCatalog({ category }) {
  const shoes = await getShoes();

  const selectCategory = shoes.filter((item) =>
    item.category.includes(category.shoesCategory)
  );

  return (
    <div className="mx-55 my-25">
      <RadioValueProvider>
        <SortingItems />
        <GridSection selectCategory={selectCategory} category={category} />
      </RadioValueProvider>
    </div>
  );
}

export default HeelsCatalog;
