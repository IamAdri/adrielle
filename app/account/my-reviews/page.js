import MainHeading from "@/app/_components/MainHeading";
import ReviewAndRating from "@/app/_components/ReviewAndRating";
import { auth } from "@/app/_lib/auth";
import { getReviewsAndRatingsByUser } from "@/app/_lib/data-service";
import Image from "next/image";

async function MyReviews() {
  //Check if user is loged in
  const session = await auth();
  const currentUser = session?.user.email || "not loged in";
  //Get all ratings and rewiesc on products of active user
  const reviewsDetails = await getReviewsAndRatingsByUser(currentUser);
  return (
    <div>
      <MainHeading>My reviews</MainHeading>
      <div className="flex flex-col items-start gap-15 mt-5 md:w-125 lg:w-full">
        {reviewsDetails.map((review) => {
          return (
            <div
              key={review.id}
              className="bg-nude p-5 w-full flex-wrap flex gap-5 lg:gap-15"
            >
              <div className="flex flex-col items-start gap-3">
                <span className="font-medium">{review.productName}</span>
                <div className="w-[100px] h-[100px]">
                  <Image
                    src={review.productImage}
                    width={100}
                    height={100}
                    alt="Image of ordered product"
                  />
                </div>
              </div>
              <ReviewAndRating
                productName={review.productName}
                currentUser={currentUser}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyReviews;
