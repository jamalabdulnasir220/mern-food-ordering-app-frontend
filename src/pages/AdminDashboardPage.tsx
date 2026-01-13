import {
  useGetRestaurantManagers,
  useUpdateApplicationStatus,
  useGetAllRestaurants,
  useUpdateRestaurantApprovalStatus,
} from "@/api/adminApi";
import type { User, Restaurant } from "@/types";
import { useState } from "react";

const AdminDashboardPage = () => {
  const { managers, isLoading: isLoadingManagers } = useGetRestaurantManagers();
  const { updateStatus, isLoading: isUpdatingStatus } =
    useUpdateApplicationStatus();
  const { restaurants, isLoading: isLoadingRestaurants } =
    useGetAllRestaurants();
  const { updateApprovalStatus, isLoading: isUpdatingApproval } =
    useUpdateRestaurantApprovalStatus();

  const [activeTab, setActiveTab] = useState<"managers" | "restaurants">(
    "managers"
  );

  if (isLoadingManagers || isLoadingRestaurants) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <svg
          className="animate-spin h-10 w-10 text-orange-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="text-lg text-gray-700 font-medium">
          Handling status...
        </span>
      </div>
    );
  }

  const handleStatusUpdate = async (
    userId: string,
    status: "approved" | "rejected"
  ) => {
    await updateStatus({ userId, status });
    window.location.reload(); // Simple reload to refresh list for now
  };

  const handleRestaurantApproval = async (
    restaurantId: string,
    status: "approved" | "rejected"
  ) => {
    await updateApprovalStatus({ restaurantId, status });
    window.location.reload(); // Simple reload to refresh list for now
  };

  const getManagerName = (restaurant: Restaurant): string => {
    if (typeof restaurant.user === "object" && restaurant.user !== null) {
      return restaurant.user.name;
    }
    return "Unknown";
  };

  const getManagerEmail = (restaurant: Restaurant): string => {
    if (typeof restaurant.user === "object" && restaurant.user !== null) {
      return restaurant.user.email;
    }
    return "";
  };

  return (
    <div className="space-y-10 bg-gray-50 min-h-screen p-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("managers")}
            className={`${
              activeTab === "managers"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Manager Applications
          </button>
          <button
            onClick={() => setActiveTab("restaurants")}
            className={`${
              activeTab === "restaurants"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Restaurant Approvals
          </button>
        </nav>
      </div>

      {/* Manager Applications Tab */}
      {activeTab === "managers" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Restaurant Manager Applications
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {managers &&
                  managers.map((manager: User) => (
                    <tr key={manager._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {manager.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {manager.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            manager.applicationStatus === "approved"
                              ? "bg-green-100 text-green-800"
                              : manager.applicationStatus === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {manager.applicationStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {manager.applicationStatus === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(manager._id, "approved")
                              }
                              disabled={isUpdatingStatus}
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-xs disabled:opacity-50"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(manager._id, "rejected")
                              }
                              disabled={isUpdatingStatus}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Restaurant Approvals Tab */}
      {activeTab === "restaurants" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Restaurant Approvals</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Restaurant Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Manager
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {restaurants &&
                  restaurants.map((restaurant: Restaurant) => (
                    <tr key={restaurant._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {restaurant.restaurantName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{getManagerName(restaurant)}</div>
                        <div className="text-xs text-gray-400">
                          {getManagerEmail(restaurant)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {restaurant.city}, {restaurant.country}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            restaurant.approvalStatus === "approved"
                              ? "bg-green-100 text-green-800"
                              : restaurant.approvalStatus === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {restaurant.approvalStatus || "pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {restaurant.approvalStatus === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleRestaurantApproval(
                                  restaurant._id,
                                  "approved"
                                )
                              }
                              disabled={isUpdatingApproval}
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-xs disabled:opacity-50"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleRestaurantApproval(
                                  restaurant._id,
                                  "rejected"
                                )
                              }
                              disabled={isUpdatingApproval}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
