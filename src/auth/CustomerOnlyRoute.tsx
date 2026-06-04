import PageLoader from "@/components/ui/page-loader";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import { useGetMyUser } from "@/api/authRouter";
import RedirectWithToast from "./RedirectWithToast";

/** Authenticated customers only (order status, favorites, etc.). */
const CustomerOnlyRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { currentUser, isPending } = useGetMyUser();

  if (isLoading) {
    return <PageLoader label="Checking access..." />;
  }

  if (!isAuthenticated) {
    return (
      <RedirectWithToast
        to="/signup"
        message="Sign in as a customer to access this page."
      />
    );
  }

  if (isPending) {
    return <PageLoader label="Loading your account..." />;
  }

  if (currentUser?.role === "restaurant_manager") {
    return (
      <RedirectWithToast
        to="/manager-dashboard"
        message="Restaurant managers use the manager dashboard instead."
      />
    );
  }

  if (currentUser?.role === "admin") {
    return (
      <RedirectWithToast
        to="/admin"
        message="Admins use the admin dashboard instead."
      />
    );
  }

  return <Outlet />;
};

export default CustomerOnlyRoute;
