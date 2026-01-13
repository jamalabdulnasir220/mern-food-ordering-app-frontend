import { useGetRestaurantReviews } from "@/api/reviewApi";
import { StarRating } from "./StarRating";
import { Loader2, MessageSquare } from "lucide-react";

type ReviewsListProps = {
  restaurantId: string;
};

const ReviewsList = ({ restaurantId }: ReviewsListProps) => {
  const { reviews, pagination, isLoading } = useGetRestaurantReviews(
    restaurantId,
    1,
    10
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <MessageSquare className="h-12 w-12 mb-2 text-gray-400" />
        <p className="text-sm">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-gray-900">
                  {review.user.name}
                </p>
                <StarRating rating={review.rating} size="sm" />
              </div>
              <p className="text-xs text-gray-500">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          {review.comment && (
            <p className="text-sm text-gray-700 mt-3 whitespace-pre-wrap">
              {review.comment}
            </p>
          )}
        </div>
      ))}
      {pagination && pagination.pages > 1 && (
        <p className="text-sm text-gray-500 text-center py-2">
          Showing {reviews.length} of {pagination.total} reviews
        </p>
      )}
    </div>
  );
};

export default ReviewsList;
