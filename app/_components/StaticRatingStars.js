import { StarIcon } from "@heroicons/react/24/solid";

function StaticRatingStars({ rating }) {
  return (
    <div className="flex">
      {Array.from(Array(5)).map((_, i) => {
        const index = i + 1;
        return (
          <StarIcon
            key={index}
            className={`size-9 transition-colors ${
              index <= rating ? "fill-amber-300" : "fill-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
}

export default StaticRatingStars;
