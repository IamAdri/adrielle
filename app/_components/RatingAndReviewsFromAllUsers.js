import {
  getAllRatingsByProductName,
  getReviewsAndRatingsByProductName,
} from "../_lib/data-service";
import MainHeading from "./MainHeading";
import StaticRatingStars from "./StaticRatingStars";

async function RatingAndReviewsFromAllUsers({ itemName }) {
  const getRatingsFromAllUsers = await getAllRatingsByProductName(itemName);
  const ratingsValues = getRatingsFromAllUsers.map((rating) => {
    return rating.rating;
  });
  const sumOfRatings = ratingsValues.reduce((acc, curr) => acc + curr, 0);
  const averageOfRatings = sumOfRatings / ratingsValues.length;
  const getReviewsAndRatingsOfProduct = await getReviewsAndRatingsByProductName(
    itemName
  );
  return (
    <div className="flex flex-col gap-3 items-start">
      <MainHeading>
        Reviews
        <span className="text-coolgrey text-lg">
          {" "}
          ({ratingsValues.length} reviews)
        </span>
      </MainHeading>
      {ratingsValues.length > 0 && (
        <div>
          <div className="flex gap-3 items-center">
            <StaticRatingStars rating={averageOfRatings} />
            <span className="font-medium text-xl">{averageOfRatings}</span>
          </div>
          <div className="mt-15">
            {getReviewsAndRatingsOfProduct.map((review) => {
              console.log(review);
              return (
                <div
                  key={review.id}
                  className="flex gap-15 items-start border-b border-coolgrey mb-15 w-85 md:w-150"
                >
                  <span>{review.userName}</span>
                  <div className="flex flex-col items-start gap-3">
                    <StaticRatingStars rating={review.rating} />
                    <p className="text-left w-95 italic">"{review.review}"</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default RatingAndReviewsFromAllUsers;
