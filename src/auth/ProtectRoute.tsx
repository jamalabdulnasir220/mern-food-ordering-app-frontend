import PageLoader from "@/components/ui/page-loader";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import RedirectWithToast from "./RedirectWithToast";

/** Any logged-in user (profile, etc.). */
const ProtectRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <PageLoader label="Checking access..." />;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return (
    <RedirectWithToast
      to="/signup"
      message="Please sign in to access this page."
    />
  );
};

export default ProtectRoute;
