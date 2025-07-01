import { getFavoriteItems } from "../_lib/data-service";

export const metadata = {
  title: "Favorites",
};

async function Page() {
  const favoriteItems = await getFavoriteItems();

  return (
    <div>
      <h1 className="font-bold text-xl">Favorites items</h1>
      {favoriteItems.map((favItem) => {
        return (
          <ul key={favItem.name}>
            <li>{favItem.name}</li>
          </ul>
        );
      })}
    </div>
  );
}

export default Page;
