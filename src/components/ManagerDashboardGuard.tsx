import { useGetMyRestaurant } from "@/api/restaurantRouter";
import PageLoader from "@/components/ui/page-loader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const ManagerDashboardGuard = ({ children }: Props) => {
  const navigate = useNavigate();
  const {
    myRestaurant,
    isPending: isRestaurantLoading,
    isError: isRestaurantError,
  } = useGetMyRestaurant();

  useEffect(() => {
    if (!isRestaurantLoading && (isRestaurantError || !myRestaurant)) {
      navigate("/manage-restaurant");
    }
  }, [isRestaurantLoading, isRestaurantError, myRestaurant, navigate]);

  if (isRestaurantLoading) {
    return <PageLoader label="Loading restaurant data..." />;
  }

  if (!myRestaurant) {
    return null;
  }

  return <>{children}</>;
};

export default ManagerDashboardGuard;
