import { useState } from "react";
import { useCreateReview, useUpdateReview } from "@/api/reviewApi";
import { InteractiveStarRating } from "./StarRating";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import type { Review } from "@/types";
import { toast } from "sonner";

type ReviewFormProps = {
  restaurantId: string;
  existingReview?: Review | null;
  onSuccess?: () => void;
};

const ReviewForm = ({
  restaurantId,
  existingReview,
  onSuccess,
}: ReviewFormProps) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: createReview } = useCreateReview();
  const { mutateAsync: updateReview } = useUpdateReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (existingReview) {
        await updateReview({
          reviewId: existingReview._id,
          data: { rating, comment },
        });
      } else {
        await createReview({
          restaurantId,
          data: { rating, comment: comment.trim() || undefined },
        });
      }
      setComment("");
      setRating(0);
      onSuccess?.();
    } catch (error) {
        // Error is handled by the mutation
        console.error(error);
        toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="rating" className="text-base font-semibold">
          Your Rating *
        </Label>
        <div className="mt-2">
          <InteractiveStarRating
            rating={rating}
            onRatingChange={setRating}
            size="lg"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="comment" className="text-base font-semibold">
          Your Review (Optional)
        </Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this restaurant..."
          className="mt-2 min-h-[100px]"
          maxLength={500}
        />
        <p className="text-xs text-gray-500 mt-1">
          {comment.length}/500 characters
        </p>
      </div>

      <Button
        type="submit"
        disabled={rating === 0 || isSubmitting}
        className="w-full bg-orange-500 hover:bg-orange-600"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {existingReview ? "Updating..." : "Submitting..."}
          </>
        ) : existingReview ? (
          "Update Review"
        ) : (
          "Submit Review"
        )}
      </Button>
    </form>
  );
};

export default ReviewForm;
