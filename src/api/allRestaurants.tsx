import type { RestaurantSearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (city?: string) => {
  const { data: results, isLoading } = useQuery({
    queryKey: ["searchRestaurants"],
    queryFn: async (): Promise<RestaurantSearchResponse> => {
      const response = await fetch(
        `${API_BASE_URL}/api/restaurants/search/${city}`
      );
      if (!response.ok) {
        throw new Error("Failed to get restaurants");
      }
      return response.json();
    },
    // we will only enable the fetch request if city is a truthy value
    enabled: !!city,
  });

  return {
    results,
    isLoading,
  };
};
