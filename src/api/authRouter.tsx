import type { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

interface CreateUserRequest {
  auth0Id: string;
  email: string;
  role: "customer" | "restaurant_manager";
}

interface FormDataToUpdate {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
}

export const useCreateMYUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    mutateAsync: createUser,
    isPending: isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (newUser: CreateUserRequest) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
    },
  });
  return {
    createUser,
    isLoading,
    isError,
    error,
  };
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    mutateAsync: updateUser,
    isPending,
    isError,
    error,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: async (formData: FormDataToUpdate) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("failed to update user");
      }
      return response.json();
    },
  });

  if (isSuccess) {
    toast.success("User Profile Updated!!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateUser,
    isPending,
    isError,
    error,
    isSuccess,
    reset,
  };
};

export const useGetMyUser = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const {
    data: currentUser,
    isPending,
    error,
  } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: async (): Promise<User> => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users!");
      }

      return response.json();
    },
    enabled: isAuthenticated, // Only run query when user is authenticated
    retry: false, // Don't retry on failure
  });

  // Only show error toast for non-authentication errors
  if (error && isAuthenticated) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    // Don't show toast for login/authentication related errors
    if (
      !errorMessage.toLowerCase().includes("login") &&
      !errorMessage.toLowerCase().includes("unauthorized")
    ) {
      toast.error(errorMessage);
    }
  }

  return {
    currentUser,
    isPending,
  };
};
