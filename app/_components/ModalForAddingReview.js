"use client";
import { useState } from "react";
import RatingStars from "./RatingStars";
import { sendReview } from "../_lib/actions";
import { useRating } from "../_contextAPI/RatingContextApi";
import { getReviewsAndRatingsByUserAndProductName } from "../_lib/data-service";
import { StarIcon } from "@heroicons/react/24/solid";

function ModalForAddingReview({
  setIsModalReviewOpened,
  productName,
  productImage,
  currentUser,
  hovered,
  setHovered,
  rating,
  setRating,
}) {
  //  const [reviewText, setReviewText] = useState("");
  const { reviewText, setReviewText, pathName } = useRating();
  //const [hovered, setHovered] = useState(null);
  const closeModalReview = async () => {
    const data = await getReviewsAndRatingsByUserAndProductName(
      currentUser,
      productName
    );
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
              {Array.from(Array(5)).map((_, i) => {
                const index = i + 1;
                return (
                  <button
                    key={i}
                    className="cursor-pointer peer group/star"
                    onClick={() => {
                      setIsModalReviewOpened(true);
                      setRating(index);
                    }}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <StarIcon
                      className={`size-7 transition-colors ${
                        index <= (hovered || rating)
                          ? "fill-amber-300"
                          : "fill-gray-300"
                      }`}
                    />
                  </button>
                );
              })}
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
              <textarea
                id="productImage"
                name="productImage"
                value={productImage}
                readOnly
                className="hidden"
              />
              <textarea
                id="pathName"
                name="pathName"
                value={pathName}
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
/*<RatingStars
                setIsModalReviewOpened={setIsModalReviewOpened}
                size={10}
              />*/
