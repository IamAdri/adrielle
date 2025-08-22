import HeelsCatalog from "@/app/_components/HeelsCatalog";
import MainHeading from "@/app/_components/MainHeading";
import { getCategory } from "@/app/_lib/helper";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

async function Page({ params }) {
  const category = await params;
  //console.log(Object.keys(category)[0]);
  const heading = getCategory(category);
  return (
    <div>
      <div className="flex justify-start ml-10 gap-1 items-center">
        <Link href="/accessories" className="font-medium hover:underline ">
          Accessories
        </Link>
        <ChevronRightIcon className="size-4 pt-[3px]" />
        <Link
          href={`/accessories/${Object.keys(category)[0]}`}
          className="font-medium hover:underline "
        >
          {heading}
        </Link>
      </div>
      <MainHeading>{heading}</MainHeading>
    </div>
  );
}

export default Page;
/*<Link
          href={`/shoes/${category.shoesCategory}`}
          className="font-medium hover:underline "
        >
          {heading}
        </Link>
         <MainHeading>{heading}</MainHeading>
      <HeelsCatalog category={category} />*/
