import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Homepage from "./pages/Homepage";
import AuthCallBackPage from "./pages/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";

import ProtectRoute from "./auth/ProtectRoute";
import RestaurantManagerRoute from "./auth/RestaurantManagerRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import SignupPage from "./pages/SignupPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero={true}>
            <Homepage />
          </Layout>
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
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false}>
            <DetailPage />
          </Layout>
        }
      />
      <Route element={<ProtectRoute />}>
        <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
      </Route>
      <Route element={<RestaurantManagerRoute />}>
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default AppRoutes;
