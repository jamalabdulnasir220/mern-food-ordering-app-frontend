import { useGetMyRestaurant } from "@/api/restaurantRouter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const ManagerDashboardGuard = ({ children }: Props) => {
  const navigate = useNavigate();
  const { myRestaurant, isPending: isRestaurantLoading, isError: isRestaurantError } = useGetMyRestaurant();

  // If the user has no restaurant (api returns error or null), redirect to create one
  useEffect(() => {
    if (!isRestaurantLoading && (isRestaurantError || !myRestaurant)) {
      navigate("/manage-restaurant");
    }
  }, [isRestaurantLoading, isRestaurantError, myRestaurant, navigate]);

  if (isRestaurantLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="animate-spin h-10 w-10 text-orange-500 mb-4" />
        <div className="text-lg text-gray-700 font-medium">
          Loading restaurant data...
        </div>
      </div>
    );
  }

  if (!myRestaurant) {
    return null; // Will redirect
  }

  return <>{children}</>;
};

export default ManagerDashboardGuard;
