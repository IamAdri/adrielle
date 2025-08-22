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

/*
//const shoesSection = useRef(null);
  //const accessoriesSection = useRef(null);

  //const hideDropDownMenu = () => {
  //   shoesSection.current.className = "hidden";
  //   accessoriesSection.current.className = "hidden";
  // };

  //const shoesCategories = ["heels", "sneakers", "sandals", "flats"];
  //const accossoriesCategories = ["bracelets", "bags", "necklaces", "belts"];

  return (
    <div className="flex gap-8 items-center" onMouseLeave={hideDropDownMenu}>
      <Link href="/">
        <Image src="/logo.png" width="75" height="75" alt="Logo" />
      </Link>
      <div className="flex gap-10">
        <div>
          <DropdownButton
            showDropdownMenu={() => (shoesSection.current.className = "block")}
            mainRoot="shoes"
          />
          <DropdownItems
            refElement={shoesSection}
            mainRoot="shoes"
            categories={shoesCategories}
          />
        </div>
        <div>
          <DropdownButton
            showDropdownMenu={() =>
              (accessoriesSection.current.className = "block")
            }
            mainRoot="accessories"
          />
          <DropdownItems
            refElement={accessoriesSection}
            mainRoot="accessories"
            categories={accossoriesCategories}
          />
        </div>
      </div>
    </div>
  );*/
