"use client";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useRating } from "../_contextAPI/RatingContextApi";
import {
  deleteReviewsAndRatingsByUser,
  getReviewsAndRatingsByUser,
} from "../_lib/data-service";
import { TrashIcon } from "@heroicons/react/24/outline";

function RatingStars({
  setIsModalReviewOpened,
  size,
  productName,
  currentUser,
  isModalReviewOpened,
}) {
  const [hovered, setHovered] = useState(null); // track hovered index
  //  const [rating, setRating] = useState(0); // track clicked rating
  const { rating, setRating, reviewText, setReviewText } = useRating();
  //const [reviewText, setReviewText] = useState("");
  useEffect(() => {
    async function loadReviews() {
      const data = await getReviewsAndRatingsByUser(currentUser, productName);
      //console.log(data.rating);
      if (!data) return;
      if (data[0]?.rating) setRating(data[0].rating);
      if (data[0]?.review) setReviewText(data[0].review);
    }
    loadReviews();
  }, []);
  const handleDeleteRating = async () => {
    await deleteReviewsAndRatingsByUser(currentUser, productName);
    setRating(0);
    setReviewText("");
  };
  //console.log(rating);
  console.log(reviewText);
  return (
    <div className="flex gap-3 items-center">
      <div>
        <div className="flex gap-3 items-center">
          <div>
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
                    className={`size-${size} transition-colors ${
                      index <= (hovered || rating)
                        ? "fill-amber-300"
                        : "fill-gray-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <div>
            {rating > 0 && isModalReviewOpened === false && (
              <button className="cursor-pointer" onClick={handleDeleteRating}>
                <TrashIcon className="size-5" />
              </button>
            )}
          </div>
        </div>

        {reviewText && isModalReviewOpened === false && (
          <p className="w-95 h-fit text-left text-wrap">{reviewText}</p>
        )}
      </div>
    </div>
  );
}

export default RatingStars;
