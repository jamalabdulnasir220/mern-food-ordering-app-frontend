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

  if (currentUser?.applicationStatus === "pending") {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="text-center p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Application Pending</h1>
                <p className="text-gray-600">Your application to become a restaurant manager is currently under review.</p>
                <p className="text-gray-600">Please check back later.</p>
            </div>
        </div>
    )
  }

  if (currentUser?.applicationStatus === "rejected") {
     return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="text-center p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Application Rejected</h1>
                <p className="text-gray-600">Your application has been rejected.</p>
                 <p className="text-gray-600">Please contact support for more information.</p>
            </div>
        </div>
    )
  }

  return <Outlet />;
};

export default RestaurantManagerRoute;
