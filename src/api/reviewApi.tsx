import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import type { Review } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateReviewRequest = {
  rating: number;
  comment?: string;
};

type UpdateReviewRequest = {
  rating: number;
  comment?: string;
};

type ReviewsResponse = {
  reviews: Review[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export const useGetRestaurantReviews = (
  restaurantId?: string,
  page: number = 1,
  limit: number = 10
) => {
  const { data, isPending } = useQuery({
    queryKey: ["restaurantReviews", restaurantId, page, limit],
    queryFn: async (): Promise<ReviewsResponse> => {
      const response = await fetch(
        `${API_BASE_URL}/api/restaurant/${restaurantId}/reviews?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to get reviews");
      }
      return response.json();
    },
    enabled: !!restaurantId,
  });

  return {
    reviews: data?.reviews || [],
    pagination: data?.pagination,
    isLoading: isPending,
  };
};

export const useGetUserReview = (restaurantId?: string) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const { data, isPending } = useQuery({
    queryKey: ["userReview", restaurantId],
    queryFn: async (): Promise<Review | null> => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${API_BASE_URL}/api/restaurant/${restaurantId}/my-review`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 404) {
        return null;
      }
      if (!response.ok) {
        throw new Error("Failed to get review");
      }
      return response.json();
    },
    enabled: !!restaurantId && isAuthenticated,
    retry: false,
  });

  return {
    review: data || null,
    isLoading: isPending,
  };
};

export const useCreateReview = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      restaurantId,
      data,
    }: {
      restaurantId: string;
      data: CreateReviewRequest;
    }): Promise<Review> => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${API_BASE_URL}/api/restaurant/${restaurantId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create review");
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["restaurantReviews", variables.restaurantId],
      });
      queryClient.invalidateQueries({
        queryKey: ["userReview", variables.restaurantId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getRestaurant"],
      });
      queryClient.invalidateQueries({
        queryKey: ["searchRestaurants"],
      });
      toast.success("Review submitted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit review");
    },
  });
};

export const useUpdateReview = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reviewId,
      data,
    }: {
      reviewId: string;
      data: UpdateReviewRequest;
    }): Promise<Review> => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update review");
      }

      return response.json();
    },
    onSuccess: (review) => {
      queryClient.invalidateQueries({
        queryKey: ["restaurantReviews"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userReview"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getRestaurant"],
      });
      queryClient.invalidateQueries({
        queryKey: ["searchRestaurants"],
      });
      toast.success("Review updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update review");
    },
  });
};

export const useDeleteReview = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: string): Promise<void> => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete review");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["restaurantReviews"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userReview"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getRestaurant"],
      });
      queryClient.invalidateQueries({
        queryKey: ["searchRestaurants"],
      });
      toast.success("Review deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete review");
    },
  });
};
