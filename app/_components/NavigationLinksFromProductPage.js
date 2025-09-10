"use client";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { getCategoryNameForHeading } from "../_lib/helper";

function NavigationLinksFromProductPage({ itemName }) {
  const params = useParams();
  const path = usePathname();
  const heading = getCategoryNameForHeading(params);
  const pathNamesSplited = Array.from(
    path.replace("/", "").replaceAll("/", ",").split(",")
  );
  const firstPathNameWithUpperCase =
    pathNamesSplited[0].charAt(0).toUpperCase() + pathNamesSplited[0].slice(1);
  // console.log(pathNamesSplited);
  console.log(itemName);
  return (
    <div className="flex justify-start ml-10 gap-1 items-center">
      <Link
        href={`/${pathNamesSplited[0]}`}
        className="font-medium hover:underline "
      >
        {firstPathNameWithUpperCase}
      </Link>
      <ChevronRightIcon className="size-4 pt-[3px]" />
      <Link
        href={`/${pathNamesSplited[0]}/${pathNamesSplited[1]}`}
        className="font-medium hover:underline "
      >
        {heading}
      </Link>
      <ChevronRightIcon className="size-4 pt-[3px]" />
      <Link
        href={`/${pathNamesSplited[0]}/${pathNamesSplited[1]}/${pathNamesSplited[2]}`}
        className="font-medium hover:underline "
      >
        {itemName}
      </Link>
    </div>
  );
}

export default NavigationLinksFromProductPage;
