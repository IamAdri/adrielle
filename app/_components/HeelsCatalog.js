import SortingItems from "./SortingItems";

import { RadioValueProvider } from "../_contextAPI/RadioValueContextApi";
import { auth } from "../_lib/auth";
import GridSectionAccessory from "./GridSection";

async function HeelsCatalog({ category }) {
  //const shoes = await getShoes();
  const session = await auth();
  const currentUser = session?.user.email || "not loged in";
  const selectItemsOfSameCategory = shoes.filter((item) =>
    item.category.includes(category.shoesCategory)
  );
  console.log(shoes);
  return (
    <div className="mx-55 xl:mx-55 lg:mx-45 my-25 md:mx-25 sm:15">
      <RadioValueProvider>
        <SortingItems />
        <GridSectionAccessory
          selectItemsOfSameCategory={selectItemsOfSameCategory}
          currentUser={currentUser}
        />
      </RadioValueProvider>
    </div>
  );
}

export default HeelsCatalog;
/* 
 const shoes = await getShoes();
  const session = await auth();
  const currentUser = session?.user.email || "not loged in";
  const selectItemsOfSameCategory = shoes.filter((item) =>
    item.category.includes(category.shoesCategory)
  );
  console.log(shoes);
return(
<div className="mx-55 xl:mx-55 lg:mx-45 my-25 md:mx-25 sm:15">
      <RadioValueProvider>
        <SortingItems />
        <GridSection
          selectItemsOfSameCategory={selectItemsOfSameCategory}
          category={category}
          currentUser={currentUser}
        />
      </RadioValueProvider>
    </div>)*/
