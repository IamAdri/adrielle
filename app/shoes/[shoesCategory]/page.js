import Catalog from "@/app/_components/Catalog";
import MainHeading from "@/app/_components/MainHeading";
import { getItemByName, getItems } from "@/app/_lib/data-service";
import { getCategoryNameForHeading } from "@/app/_lib/helper";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

async function Page({ params }) {
  const category = await params;
  const heading = getCategoryNameForHeading(category);
  const shoes = await getItems();
  return (
    <div>
      <div className="flex justify-start ml-10 gap-1 items-center">
        <Link href="/shoes" className="font-medium hover:underline ">
          Shoes
        </Link>
        <ChevronRightIcon className="size-4 pt-[3px]" />
        <Link
          href={`/shoes/${category.shoesCategory}`}
          className="font-medium hover:underline "
        >
          {heading}
        </Link>
      </div>
      <MainHeading>{heading}</MainHeading>
      <Catalog category={category} productsData={shoes} />
    </div>
  );
}

export default Page;
/*<div>
      <div className="flex justify-start ml-10 gap-1 items-center">
        <Link href="/shoes" className="font-medium hover:underline ">
          Shoes
        </Link>
        <ChevronRightIcon className="size-4 pt-[3px]" />
        <Link
          href={`/shoes/${category.shoesCategory}`}
          className="font-medium hover:underline "
        >
          {heading}
        </Link>
      </div>
      <MainHeading>{heading}</MainHeading>
      <HeelsCatalog category={category} />
    </div>*/
