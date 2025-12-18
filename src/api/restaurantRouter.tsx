import type { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    data: myRestaurant,
    isPending,
    error,
  } = useQuery({
    queryKey: ["fetchMyRestaurant"],
    queryFn: async (): Promise<Restaurant> => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to get restaurant");
      }
      return response.json();
    },
  });
  if (error) {
    toast.error("Unable to fetch my restaurant");
  }

  return {
    myRestaurant,
    isPending,
  };
};

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const {
    mutateAsync: createRestaurant,
    isPending: isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: async (restaurantFormData: FormData): Promise<Restaurant> => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: restaurantFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to create a new restaurant");
      }

      return response.json();
    },
  });

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    toast.error("Unable to create restaurant");
  }

  return {
    createRestaurant,
    isLoading,
  };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const {
    mutateAsync: updateRestaurant,
    isPending: isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: async (restaurantFormData: FormData): Promise<Restaurant> => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: restaurantFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to update restaurant");
      }

      return response.json();
    },
  });

  if (isSuccess) {
    toast.success("Restaurant updated!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return {
    updateRestaurant,
    isLoading,
  };
};
