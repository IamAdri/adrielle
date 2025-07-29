import { auth } from "../_lib/auth";
import { getShoesDetailsByFavoriteTable } from "../_lib/data-service";
import FavoriteItem from "./FavoriteItem";

async function DisplayFavoriteItems() {
  const session = await auth();
  const favoriteItems = await getShoesDetailsByFavoriteTable(
    session?.user.email || "not loged in"
  );
  const currentUser = session?.user.email || "not loged in";
  //  console.log(session);
  return (
    <div className="flex sm:flex-wrap gap-5 py-15 px-75 md:px-25 sm:px-10 justify-center">
      {favoriteItems.length > 0 &&
        favoriteItems.map((favoriteItem) => {
          const colorsAvailable = Object.keys(favoriteItem.shoes.variants);
          const mainColorImage =
            favoriteItem.shoes.variants[colorsAvailable[0]].images[0];

          return (
            <FavoriteItem
              key={favoriteItem.shoes.name}
              favoriteItem={favoriteItem}
              mainColorImage={mainColorImage}
              currentUser={currentUser}
            />
          );
        })}
    </div>
  );
}

export default DisplayFavoriteItems;
