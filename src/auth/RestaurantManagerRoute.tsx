import PageLoader from "@/components/ui/page-loader";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, useLocation } from "react-router-dom";
import { useGetMyUser } from "@/api/authRouter";
import RedirectWithToast from "./RedirectWithToast";
import { getHomePathForRole } from "./roleRedirects";

const RestaurantManagerRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { currentUser, isPending } = useGetMyUser();
  const location = useLocation();

  if (isLoading) {
    return <PageLoader label="Checking access..." />;
  }

  if (!isAuthenticated) {
    return (
      <RedirectWithToast
        to="/signup"
        message="Sign in as a restaurant manager to access this page."
      />
    );
  }

  if (isPending) {
    return <PageLoader label="Loading your account..." />;
  }

  if (currentUser?.role !== "restaurant_manager") {
    return (
      <RedirectWithToast
        to={getHomePathForRole(currentUser?.role)}
        message="This page is only for restaurant managers."
      />
    );
  }

  if (currentUser.applicationStatus === "rejected") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
        <div className="max-w-md rounded-lg bg-card p-8 text-center shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-destructive">
            Application rejected
          </h1>
          <p className="text-muted-foreground">
            Your application to become a restaurant manager has been rejected.
            Please contact support for more information.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet context={{ from: location.pathname }} />;
};

export default RestaurantManagerRoute;
