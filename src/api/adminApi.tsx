import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { User } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurantManagers = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getRestaurantManagersRequest = async (): Promise<User[]> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/admin/managers`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch restaurant managers");
        }

        return response.json();
    };

    const { data: managers, isLoading, error } = useQuery({
        queryKey: ["fetchRestaurantManagers"],
        queryFn: getRestaurantManagersRequest,
    });

    return { managers, isLoading, error };
};

type UpdateStatusRequest = {
    userId: string;
    status: "approved" | "rejected";
};

export const useUpdateApplicationStatus = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateStatusRequest = async (formData: UpdateStatusRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/admin/managers/${formData.userId}/status`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: formData.status }),
        });

        if (!response.ok) {
            throw new Error("Failed to update application status");
        }
    };

    const { mutateAsync: updateStatus, isPending: isLoading, isSuccess, error, reset } = useMutation({
        mutationFn: updateStatusRequest,
    });

    return { updateStatus, isLoading, isSuccess, error, reset };
};
