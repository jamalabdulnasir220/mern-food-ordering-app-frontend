import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  className?: string;
};

export const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = false,
  className,
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5 && fullStars < maxRating;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, index) => {
          const starValue = index + 1;
          if (starValue <= fullStars) {
            return (
              <Star
                key={index}
                className={cn(
                  sizeClasses[size],
                  "fill-yellow-400 text-yellow-400"
                )}
              />
            );
          } else if (starValue === fullStars + 1 && hasHalfStar) {
            return (
              <div key={index} className="relative inline-block">
                <Star
                  className={cn(
                    sizeClasses[size],
                    "fill-gray-300 text-gray-300"
                  )}
                />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: "50%" }}
                >
                  <Star
                    className={cn(
                      sizeClasses[size],
                      "fill-yellow-400 text-yellow-400"
                    )}
                  />
                </div>
              </div>
            );
          } else {
            return (
              <Star
                key={index}
                className={cn(sizeClasses[size], "fill-gray-300 text-gray-300")}
              />
            );
          }
        })}
      </div>
      {showNumber && (
        <span className="text-sm font-medium text-gray-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

type InteractiveStarRatingProps = {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export const InteractiveStarRating = ({
  rating,
  onRatingChange,
  maxRating = 5,
  size = "md",
  className,
}: InteractiveStarRatingProps) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7",
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            onClick={() => onRatingChange(starValue)}
            className="focus:outline-none transition-transform hover:scale-110"
            aria-label={`Rate ${starValue} out of ${maxRating}`}
          >
            <Star
              className={cn(
                sizeClasses[size],
                starValue <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-300 text-gray-300"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
