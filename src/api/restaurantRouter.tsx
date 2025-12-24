import type { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    data: myRestaurant,
    isPending,
    error,
  } = useQuery({
    queryKey: ["fetchMyRestaurant"],
    queryFn: async (): Promise<Restaurant | null> => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 404) {
        // User doesn't have a restaurant yet, return null instead of throwing
        return null;
      }
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

export const useGetMyRestaurantOrders = (enabled: boolean = true) => {
  const { getAccessTokenSilently } = useAuth0();

  const { data: restaurantOrders, isPending } = useQuery({
    queryKey: ["fetchRestaurantOrders"],
    queryFn: async (): Promise<Order[]> => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Unable to fetch restaurant orders");
      }
      return response.json();
    },
    enabled: enabled, // Only fetch orders if restaurant exists
  });
  return {
    restaurantOrders: restaurantOrders || [],
    isPending,
  };
};

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const {
    mutateAsync: updateRestaurantStatus,
    isPending,
    isError,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: async (updateStatusOrderRequest: UpdateOrderStatusRequest) => {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(
        `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ status: updateStatusOrderRequest.status }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to update order status");
      }

      return response.json();
    },
  });

  if (isError) {
    toast.error("Unable to update order");
    reset();
  }

  if (isSuccess) {
    toast.success("Order updated");
  }

  return {
    updateRestaurantStatus,
    isPending,
  };
};
