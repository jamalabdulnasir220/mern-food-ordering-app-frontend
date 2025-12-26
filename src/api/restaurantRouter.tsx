import type { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { data: myRestaurant, isPending, isError } = useQuery({
    queryKey: ["fetchMyRestaurant"],
    queryFn: async (): Promise<Restaurant | null> => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      // If restaurant doesn't exist (404), return null instead of throwing
      if (response.status === 404) {
        return null;
      }
      
      if (!response.ok) {
        throw new Error("Failed to get restaurant");
      }
      return response.json();
    },
    retry: false, // Don't retry on 404
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes to avoid unnecessary refetches
  });

  return {
    myRestaurant,
    isPending,
    isError
  };
};

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const {
    mutateAsync: createRestaurant,
    isPending: isLoading,
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
    onSuccess: () => {
      // Invalidate and refetch restaurant data
      queryClient.invalidateQueries({ queryKey: ["fetchMyRestaurant"] });
      toast.success("Restaurant created!");
    },
  });

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

export const useGetMyRestaurantOrders = (options?: { enabled?: boolean }) => {
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
    enabled: options?.enabled,
  });
  return {
    restaurantOrders,
    isPending,
  };
};

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      // Invalidate restaurant orders query to refetch with updated data
      queryClient.invalidateQueries({ queryKey: ["fetchRestaurantOrders"] });
      // Also invalidate customer orders query in case they're viewing their orders
      queryClient.invalidateQueries({ queryKey: ["fetchOrders"] });
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
