import type { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];

  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const { data: orders, isPending } = useQuery({
    queryKey: ["fetchOrders"],
    queryFn: async (): Promise<Order[]> => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/order`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      return response.json();
    },
    enabled: isAuthenticated, // Only run query when user is authenticated
    refetchInterval: 5000,
  });

  return {
    orders,
    isPending,
  };
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const {
    mutateAsync: createCheckoutSession,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: async (checkoutSessionRequest: CheckoutSessionRequest) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-Type": "application/json",
          },
          body: JSON.stringify(checkoutSessionRequest),
        }
      );
      if (!response.ok) {
        throw new Error("Unable to create checkout session");
      }

      return response.json();
    },
  });

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createCheckoutSession,
    isPending,
  };
};
