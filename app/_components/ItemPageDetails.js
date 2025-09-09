import { auth } from "../_lib/auth";
import AddToCartFromItemPage from "./AddToCartFromItemPage";
import AddToFavorites from "./AddToFavorites";
import ButtonForChangingColor from "./ButtonForChangingColor";
import ButtonForImages from "./ButtonForImages";
import ButtonForSize from "./ButtonForSize";
import Drawer from "./Drawer";
import MainHeading from "./MainHeading";
import RatingAndReviewsFromAllUsers from "./RatingAndReviewsFromAllUsers";
import ReviewAndRating from "./ReviewAndRating";

async function ItemPageDetails({ item, itemName }) {
  const session = await auth();
  //console.log(item);
  const currentUser = session?.user.email || "not loged in";
  const colorsAvailable = Object.keys(item.variants);
  return (
    <>
      <div>
        <div className="flex flex-wrap  lg:flex-nowrap gap-10 2xl:gap-35 xl:gap-25 md:gap-10 mt-25">
          <div className="flex gap-2 items-center">
            <ButtonForImages
              itemDetails={item}
              colorsAvailable={colorsAvailable}
            />
          </div>
          <div className="flex flex-col flex-wrap lg:w-150 mr-5">
            <div className="flex justify-between lg:w-115 md:55">
              <MainHeading className="text-3xl font-bold text-left">
                {itemName}
              </MainHeading>
              <AddToFavorites
                name={itemName}
                itemID={item.id}
                item={item}
                currentUser={currentUser}
              />
            </div>

            <h4 className="font-bold text-2xl mt-1 text-left">{`${item.price} EUR`}</h4>
            <p className="mt-10 text-left lg:w-125 w-100">{item.description}</p>
            <p className="mt-10 text-left">Colors available</p>
            <div className="flex mt-2">
              {colorsAvailable.map((color) => {
                return (
                  <ButtonForChangingColor
                    key={color}
                    color={color}
                    itemDetails={item}
                  />
                );
              })}
            </div>

            <div className="w-fit">
              <AddToCartFromItemPage item={item} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap xl:flex-nowrap 2xl:gap-35 gap-15 items-start">
        <RatingAndReviewsFromAllUsers
          itemName={itemName}
          currentUser={currentUser}
        />
        {currentUser !== "not loged in" && (
          <div className="flex flex-col items-center gap-7">
            <MainHeading>My review</MainHeading>
            <ReviewAndRating
              productName={itemName}
              productImage={item.variants[colorsAvailable[0]].images[0]}
              currentUser={currentUser}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ItemPageDetails;
