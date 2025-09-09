import SortingItems from "./SortingItems";
import { RadioValueProvider } from "../_contextAPI/RadioValueContextApi";
import { auth } from "../_lib/auth";
import { getCategoryName } from "../_lib/helper";
import GridSection from "./GridSection";

async function Catalog({ category, productsData }) {
  const session = await auth();
  const currentUser = session?.user.email || "not loged in";
  const categoryName = getCategoryName(category);
  //  console.log(categoryName);
  //console.log(productsData);
  const selectItemsOfSameCategory = productsData.filter((item) =>
    item.category.includes(categoryName)
  );

  return (
    <div className="mx-55 xl:mx-55 lg:mx-45 my-25 md:mx-25 sm:15">
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
