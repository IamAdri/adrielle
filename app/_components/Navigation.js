import Link from "next/link";
import {
  HeartIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import DropdownMenu from "./DropdownMenu";

function Navigation() {
  return (
    <div className=" border-b-3 border-lightlavender flex  px-4  items-center justify-between flex-wrap basis-1/10 text-deepgrey">
      <DropdownMenu />
      <div className="flex gap-8">
        <Link href="/">
          <HomeIcon className="size-7 text-deepgrey" />
        </Link>
        <Link href="/favorites">
          <HeartIcon className="size-7 text-deepgrey" />
        </Link>
        <Link href="/bag">
          <ShoppingBagIcon className="size-7 text-deepgrey" />
        </Link>
        <Link href="/login">
          <UserIcon className="size-7 text-deepgrey" />
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
