import type { SearchState } from "@/pages/SearchPage";
import type { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const { data: results, isLoading } = useQuery({
    queryKey: ["searchRestaurants", searchState],
    queryFn: async (): Promise<RestaurantSearchResponse> => {
      const params = new URLSearchParams();
      params.set("searchQuery", searchState.searchQuery);
      params.set("page", searchState.page.toString());
      params.set("selectedCuisines", searchState.selectedCuisines.join(","));
      params.set("sortOptions", searchState.sortOption);

      const response = await fetch(
        `${API_BASE_URL}/api/restaurants/search/${city}?${params.toString()}`
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

export const useGetRestaurant = (restaurantId?: string) => {
  const { data: restaurant, isPending: isLoading } = useQuery({
    queryKey: ["getRestaurant"],
    queryFn: async (): Promise<Restaurant> => {
      const response = await fetch(
        `${API_BASE_URL}/api/restaurants/${restaurantId}`
      );
      if (!response.ok) {
        throw new Error("Unable to get restaurant");
      }
      return response.json();
    },
    enabled: !!restaurantId
  });
  return {
    restaurant,
    isLoading,
  };
};
