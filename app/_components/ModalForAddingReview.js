"use client";
import { useState } from "react";
import RatingStars from "./RatingStars";
import { sendReview } from "../_lib/actions";
import { useRating } from "../_contextAPI/RatingContextApi";
import { getReviewsAndRatingsByUser } from "../_lib/data-service";

function ModalForAddingReview({
  setIsModalReviewOpened,
  productName,
  currentUser,
}) {
  //  const [reviewText, setReviewText] = useState("");
  const { rating, setRating, reviewText, setReviewText } = useRating();
  const closeModalReview = async () => {
    const data = await getReviewsAndRatingsByUser(currentUser, productName);
    setRating(data[0]?.rating);
    setIsModalReviewOpened(false);
  };
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={closeModalReview}
      ></div>
      <div className="flex justify-center items-center min-h-screen px-4 py-8">
        <div className="bg-warmwhite relative pt-1 px-1 pb-5">
          <div className="flex flex-col items-end">
            <button
              className="w-fit border px-2 mb-2 rounded-full hover:cursor-pointer"
              onClick={closeModalReview}
            >
              x
            </button>
          </div>
          <div className="flex flex-col items-start gap-5 m-5">
            <div className="flex items-center gap-3">
              <RatingStars
                setIsModalReviewOpened={setIsModalReviewOpened}
                size={10}
              />
              <span className="font-medium text-xl">
                {rating > 0 && rating}
              </span>
            </div>

            <form
              action={sendReview}
              className="flex flex-col gap-3 items-start"
            >
              <label htmlFor="review">
                Review <span className="text-coolgrey">(optional)</span>
              </label>
              <textarea
                id="review"
                name="review"
                rows={5}
                cols={50}
                placeholder="Write here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="border border-coolgrey p-1"
              />
              <textarea
                id="rating"
                name="rating"
                value={rating}
                readOnly
                className="hidden"
              />
              <textarea
                id="productName"
                name="productName"
                value={productName}
                readOnly
                className="hidden"
              />

              <button
                type="submit"
                className="bg-lavenderhighlight rounded-sm border-2 border-darklavender font-semibold px-3 py-1 cursor-pointer text-base hover:text-lg  hover:font-bold text-warmwhite hover:text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalForAddingReview;
