import { getItemByName } from "@/app/_lib/data-service";
import NavigationLinksFromProductPage from "@/app/_components/NavigationLinksFromProductPage";
import ItemPageDetails from "@/app/_components/ItemPageDetails";
import { getCategoryName, getCategoryNameForHeading } from "@/app/_lib/helper";

async function Page({ params }) {
  const itemParams = await params;
  const itemName = itemParams.itemID.replaceAll("_", " ");
  //const item = await getAccessoryById(itemName);
  const item = await getItemByName(itemName);
  const categoryName = getCategoryName(itemParams);
  console.log(categoryName);
  return (
    <div className="flex flex-col items-start gap-25 xl:ml-45 lg:ml-25 ml-20">
      <NavigationLinksFromProductPage itemName={itemName} />
      <ItemPageDetails item={item} itemName={itemName} />
    </div>
  );
}

export default Page;
