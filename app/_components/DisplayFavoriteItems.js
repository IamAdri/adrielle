import { getShoesDetailsByFavoriteTable } from "../_lib/data-service";
import FavoriteItem from "./FavoriteItem";

async function DisplayFavoriteItems() {
  const favoriteItems = await getShoesDetailsByFavoriteTable();

  return (
    <div className="flex sm:flex-wrap gap-5 py-15 px-75 md:px-25 sm:px-10 justify-center">
      {favoriteItems.map((favoriteItem) => {
        const colorsAvailable = Object.keys(favoriteItem.shoes.variants);
        const mainColorImage =
          favoriteItem.shoes.variants[colorsAvailable[0]].images[0];

        return (
          <FavoriteItem
            key={favoriteItem.shoes.name}
            favoriteItem={favoriteItem}
            mainColorImage={mainColorImage}
          />
        );
      })}
    </div>
  );
}

export default DisplayFavoriteItems;
