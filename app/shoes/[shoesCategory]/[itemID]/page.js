import { getItemByName } from "@/app/_lib/data-service";
import NavigationLinksFromProductPage from "@/app/_components/NavigationLinksFromProductPage";
import ItemPageDetails from "@/app/_components/ItemPageDetails";

async function Page({ params }) {
  //Take product name from url and load product details from supabase
  const itemParams = await params;
  const itemName = itemParams.itemID.replaceAll("_", " ");
  const item = await getItemByName(itemName);
  return (
    <div className="flex flex-col items-start gap-25 xl:ml-45 lg:ml-25 ml-20">
      <NavigationLinksFromProductPage itemName={itemName} />
      <ItemPageDetails item={item} itemName={itemName} />
    </div>
  );
}

export default Page;
