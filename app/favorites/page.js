import DisplayFavoriteItems from "../_components/DisplayFavoriteItems";

export const metadata = {
  title: "Favorites",
};

async function Page() {
  return (
    <div>
      <h1 className="font-bold text-xl">Favorites items</h1>
      <DisplayFavoriteItems />
    </div>
  )
}

export default Page;
