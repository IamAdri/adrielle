import DropdownItems from "@/app/_components/DropdownItems";
import Image from "next/image";
import DropdownButton from "./DropdownButton";
import Link from "next/link";

function DropdownMenu() {
  const shoesCategories = ["heels", "sandals", "flats", "newCollection"];
  const accessoriesCategories = ["bags", "belts", "newCollection"];
  return (
    <div className="flex gap-8 items-center">
      <Link href="/">
        <Image src="/logo.png" width="75" height="75" alt="Logo" />
      </Link>
      <div className="flex gap-10">
        <div>
          <DropdownButton mainRoot="shoes" />
          <DropdownItems mainRoot="shoes" categories={shoesCategories} />
        </div>
        <div>
          <DropdownButton mainRoot="accessories" />
          <DropdownItems
            mainRoot="accessories"
            categories={accessoriesCategories}
          />
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
