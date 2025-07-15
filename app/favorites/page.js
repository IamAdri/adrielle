import DisplayFavoriteItems from "../_components/DisplayFavoriteItems";
import MainHeading from "../_components/MainHeading";

export const metadata = {
  title: "Favorites",
};

async function Page() {
  return (
    <div>
      <MainHeading className="font-bold text-xl">Favorites items</MainHeading>
      <DisplayFavoriteItems />
    </div>
  );
}

export default Page;
