import { Navigate, Route, Routes } from "react-router-dom";
import CustomerLayout from "./layout/CustomerLayout";
import ManagerLayout from "./layout/ManagerLayout";
import AdminLayout from "./layout/AdminLayout";
import Homepage from "./pages/Homepage";
import AuthCallBackPage from "./pages/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";

import ProtectRoute from "./auth/ProtectRoute";
import RestaurantManagerRoute from "./auth/RestaurantManagerRoute";
import CustomerRoute from "./auth/CustomerRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import SignupPage from "./pages/SignupPage";
import FavoritesPage from "./pages/FavoritesPage";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ManagerHomepage from "./pages/ManagerHomepage";
import ManagerDashboardGuard from "./components/ManagerDashboardGuard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CustomerLayout showHero={true}>
            <Homepage />
          </CustomerLayout>
        }
      />
      <Route
        path="/auth-callback"
        element={
          <span>
            <AuthCallBackPage />
          </span>
        }
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<CustomerRoute />}>
        <Route
          path="/search/:city"
          element={
            <CustomerLayout showHero={false}>
              <SearchPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/detail/:restaurantId"
          element={
            <CustomerLayout showHero={false}>
              <DetailPage />
            </CustomerLayout>
          }
        />
      </Route>
      <Route element={<ProtectRoute />}>
        <Route
          path="/order-status"
          element={
            <CustomerLayout>
              <OrderStatusPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <CustomerLayout>
              <UserProfilePage />
            </CustomerLayout>
          }
        />
        <Route
          path="/favorites"
          element={
            <CustomerLayout>
              <FavoritesPage />
            </CustomerLayout>
          }
        />
      </Route>
      <Route element={<RestaurantManagerRoute />}>
        <Route
          path="/manager-dashboard"
          element={
            <ManagerLayout>
              <ManagerDashboardGuard>
                <ManagerHomepage />
              </ManagerDashboardGuard>
            </ManagerLayout>
          }
        />
        <Route
          path="/manage-restaurant"
          element={
            <ManagerLayout>
              <ManageRestaurantPage />
            </ManagerLayout>
          }
        />
      </Route>
      <Route element={<AdminRoute />}>
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboardPage />
            </AdminLayout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default AppRoutes;
