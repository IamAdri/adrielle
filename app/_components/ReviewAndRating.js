"use client";
import { useState } from "react";
import ModalForAddingReview from "./ModalForAddingReview";
import RatingStars from "./RatingStars";
import { RatingProvider } from "../_contextAPI/RatingContextApi";

function ReviewAndRating({ productName, currentUser }) {
  const [isModalReviewOpened, setIsModalReviewOpened] = useState(false);
  //console.log(isModalReviewOpened);
  return (
    <RatingProvider>
      <div className="flex" style={{ direction: "ltr" }}>
        <RatingStars
          setIsModalReviewOpened={setIsModalReviewOpened}
          isModalReviewOpened={isModalReviewOpened}
          size={7}
          productName={productName}
          currentUser={currentUser}
        />
        {isModalReviewOpened && (
          <ModalForAddingReview
            setIsModalReviewOpened={setIsModalReviewOpened}
            productName={productName}
            currentUser={currentUser}
          />
        )}
      </div>
    </RatingProvider>
  );
}

export default ReviewAndRating;
