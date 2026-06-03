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

  // We allow pending status to access the page, but we will block "submissions" on the page itself.
  if (currentUser?.applicationStatus === "rejected") {
    return (
        <div className="flex h-screen items-center justify-center bg-background px-4">
            <div className="rounded-lg bg-card p-8 text-center shadow-lg">
                <h1 className="mb-4 text-2xl font-bold text-destructive">Application Rejected</h1>
                <p className="text-muted-foreground">Your application to become a restaurant manager has been rejected.</p>
                <p className="text-muted-foreground">Please contact support for more information.</p>
            </div>
        </div>
    )
  }

  return <Outlet />;

};

export default RestaurantManagerRoute;
