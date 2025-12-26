import { useGetMyRestaurant, useGetMyRestaurantOrders } from "@/api/restaurantRouter";
import { Link } from "react-router-dom";
import { UtensilsCrossed, ClipboardList, Timer, TrendingUp } from "lucide-react";
import { useGetMyUser } from "@/api/authRouter";

const ManagerHomepage = () => {
  const { currentUser } = useGetMyUser();
  const { myRestaurant } = useGetMyRestaurant();
  const { restaurantOrders, isPending: isOrdersLoading } = useGetMyRestaurantOrders({ enabled: !!myRestaurant });

  const activeOrders = restaurantOrders?.filter(o => o.status !== "delivered").length || 0;
  const totalOrders = restaurantOrders?.length || 0;
  
  // Calculate today's orders (simple daily stat)
  const today = new Date().toDateString();
  const todaysOrders = restaurantOrders?.filter(o => new Date(o.createdAt).toDateString() === today).length || 0;

  return (
    <div className="flex flex-col gap-8 -mt-16">
      <div className="bg-white rounded-lg shadow-lg p-8 sm:p-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Welcome back, <span className="text-orange-600">{currentUser?.name}</span>!
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Manage your restaurant, track orders, and grow your business with GhanaBite.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stat Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Active Orders</h3>
            <Timer className="text-orange-500 w-8 h-8" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{isOrdersLoading ? "..." : activeOrders}</div>
          <p className="text-sm text-gray-500 mt-1">Orders needing attention</p>
        </div>

         {/* Quick Stat Card 2 */}
         <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Today's Orders</h3>
            <ClipboardList className="text-blue-500 w-8 h-8" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{isOrdersLoading ? "..." : todaysOrders}</div>
          <p className="text-sm text-gray-500 mt-1">Orders placed today</p>
        </div>

        {/* Quick Stat Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Total Orders</h3>
            <TrendingUp className="text-green-500 w-8 h-8" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{isOrdersLoading ? "..." : totalOrders}</div>
          <p className="text-sm text-gray-500 mt-1">All time orders</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-orange-50 p-8 rounded-lg border border-orange-100 flex flex-col items-start gap-4 hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 p-3 rounded-full">
                  <UtensilsCrossed className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Restaurant</h2>
                  <p className="text-gray-600">Update your restaurant details, menu items, and business hours.</p>
              </div>
              <Link to="/manage-restaurant" className="mt-2 bg-orange-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-700 transition-colors">
                  Go to Restaurant Management Page
              </Link>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 flex flex-col items-start gap-4 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full">
                  <ClipboardList className="w-8 h-8 text-blue-600" />
              </div>
               <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">View Orders</h2>
                  <p className="text-gray-600">Check active orders, update status, and view order history.</p>
              </div>
               <Link to="/manage-restaurant" className="mt-2 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                  View Orders
              </Link>
          </div>
      </div>
    </div>
  );
};

export default ManagerHomepage;
