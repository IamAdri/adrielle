import { getShoes } from "../_lib/data-service";
import SortingItems from "./SortingItems";
import GridSection from "./GridSection";
import { RadioValueProvider } from "../_contextAPI/RadioValueContextApi";

async function HeelsCatalog({ category }) {
  const shoes = await getShoes();
  const selectItemsOfSameCategory = shoes.filter((item) =>
    item.category.includes(category.shoesCategory)
  );
  return (
    <div className="mx-55 xl:mx-55 lg:mx-45 my-25 md:mx-25 sm:15">
      <RadioValueProvider>
        <SortingItems />
        <GridSection
          selectItemsOfSameCategory={selectItemsOfSameCategory}
          category={category}
        />
      </RadioValueProvider>
    </div>
  );
}

export default HeelsCatalog;
