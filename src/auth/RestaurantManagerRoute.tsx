import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { useGetMyUser } from "@/api/authRouter";

const RestaurantManagerRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { currentUser, isPending } = useGetMyUser();

  if (isLoading || isPending) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  if (currentUser?.role !== "restaurant_manager") {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default RestaurantManagerRoute;
