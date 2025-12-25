import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { useGetMyUser } from "@/api/authRouter";

const CustomerRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { currentUser, isPending } = useGetMyUser();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
      return <Outlet />;
  }

  if (isPending) {
      return null;
  }

  if (isAuthenticated && currentUser?.role === "restaurant_manager") {
    return <Navigate to="/manage-restaurant" replace />;
  }

  if (isAuthenticated && currentUser?.role === "admin") {
      return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default CustomerRoute;
