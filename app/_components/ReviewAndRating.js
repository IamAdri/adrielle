"use client";
import { useEffect, useState } from "react";
import { StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import { sendReview } from "../_lib/actions";
import {
  deleteReviewsAndRatingsByUser,
  getReviewsAndRatingsByUserAndProductName,
} from "../_lib/data-service";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Button from "./Button";

function ReviewAndRating({ productName, productImage, currentUser }) {
  const [isModalReviewOpened, setIsModalReviewOpened] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [pathName, setPathName] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    async function loadReviews() {
      const data = await getReviewsAndRatingsByUserAndProductName(
        currentUser,
        productName
      );
      if (!data) return;
      if (data[0]?.rating) setRating(data[0].rating);
      if (data[0]?.review) setReviewText(data[0].review);
    }
    loadReviews();
    setPathName(pathname);
  }, []);
  const closeModalReview = async () => {
    const data = await getReviewsAndRatingsByUserAndProductName(
      currentUser,
      productName
    );
    setRating(data[0]?.rating);
    setIsModalReviewOpened(false);
  };
  const handleDeleteRating = async () => {
    await deleteReviewsAndRatingsByUser(currentUser, productName);
    setRating(0);
    setReviewText("");
    router.refresh();
  };

  return (
    <div className="ml-5 mr-5">
      <div className="flex flex-col gap-3 items-start ">
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
                    className={`size-9 transition-colors ${
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
        <div>
          {reviewText && isModalReviewOpened === false && (
            <p className="w-95 h-fit text-left text-wrap italic">
              {reviewText}
            </p>
          )}
        </div>
      </div>
      {isModalReviewOpened && (
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
                            className={`size-9 transition-colors ${
                              index <= (hovered || rating)
                                ? "fill-amber-300"
                                : "fill-gray-300"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

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
                  <Button type="submit">Submit</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewAndRating;
