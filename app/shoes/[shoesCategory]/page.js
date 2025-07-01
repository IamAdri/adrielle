import HeelsCatalog from "@/app/_components/HeelsCatalog";
import MainHeading from "@/app/_components/MainHeading";
import { getCategory } from "@/app/_lib/helper";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

async function Page({ params }) {
  const category = await params;
  console.log(category.shoesCategory);
  const heading = getCategory(category);
  //category.shoesCategory.charAt(0).toUpperCase() +
  //category.shoesCategory.slice(1);
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

      <span>FILTER</span>
      <HeelsCatalog category={category} />
    </div>
  );
}

export default Page;
