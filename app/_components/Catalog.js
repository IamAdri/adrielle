import SortingItems from "./SortingItems";
import { RadioValueProvider } from "../_contextAPI/RadioValueContextApi";
import { auth } from "../_lib/auth";
import { getCategoryName } from "../_lib/helper";
import GridSection from "./GridSection";

async function Catalog({ category, productsData }) {
  const session = await auth();
  const currentUser = session?.user.email || "not loged in";
  const categoryName = getCategoryName(category);
  const selectItemsOfSameCategory = productsData.filter((item) =>
    Object.keys(category)[0] === "shoesCategory"
      ? item.category.includes(categoryName) && item.itemType === "shoes"
      : item.category.includes(categoryName) && item.itemType === "accessories"
  );

  return (
    <div className="xl:mx-55 lg:mx-35 mx-25">
      <RadioValueProvider>
        <SortingItems />
        <GridSection
          selectItemsOfSameCategory={selectItemsOfSameCategory}
          currentUser={currentUser}
        />
      </RadioValueProvider>
    </div>
  );
}

export default Catalog;
