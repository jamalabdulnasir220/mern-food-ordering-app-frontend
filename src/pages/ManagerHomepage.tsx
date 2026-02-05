import {
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
} from "@/api/restaurantRouter";
import { Link } from "react-router-dom";
import {
  UtensilsCrossed,
  ClipboardList,
  Timer,
  TrendingUp,
} from "lucide-react";
import { useGetMyUser } from "@/api/authRouter";

const ManagerHomepage = () => {
  const { currentUser } = useGetMyUser();
  const { myRestaurant } = useGetMyRestaurant();
  const { restaurantOrders, isPending: isOrdersLoading } =
    useGetMyRestaurantOrders({ enabled: !!myRestaurant });

  const activeOrders =
    restaurantOrders?.filter((o) => o.status !== "delivered").length || 0;
  const totalOrders = restaurantOrders?.length || 0;

  // Calculate today's date string once
  const today = new Date().toDateString();

  // Today's orders count
  const todaysOrders =
    restaurantOrders?.filter(
      (o) => new Date(o.createdAt).toDateString() === today
    ).length || 0;

  // Revenue analytics (based on paid / delivered orders)
  const completedOrders =
    restaurantOrders?.filter(
      (o) => o.totalAmount && (o.status === "paid" || o.status === "delivered")
    ) || [];

  const totalRevenueCents = completedOrders.reduce(
    (sum, o) => sum + (o.totalAmount || 0),
    0
  );
  const todayRevenueCents = completedOrders
    .filter((o) => new Date(o.createdAt).toDateString() === today)
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const averageOrderValue =
    completedOrders.length > 0
      ? totalRevenueCents / completedOrders.length / 100
      : 0;

  // Top selling items (by quantity)
  const topItems = (() => {
    if (!restaurantOrders) return [];

    const itemCountMap = new Map<string, number>();

    restaurantOrders.forEach((order) => {
      order.cartItems.forEach((item) => {
        const qty = parseInt(item.quantity, 10) || 0;
        itemCountMap.set(item.name, (itemCountMap.get(item.name) || 0) + qty);
      });
    });

    return Array.from(itemCountMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  })();

  const formatCurrency = (amountCents: number) =>
    `GHC ${(amountCents / 100).toFixed(2)}`;

  return (
    <div className="flex flex-col gap-8 -mt-16">
      <div className="bg-white rounded-lg shadow-lg p-8 sm:p-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Welcome back,{" "}
          <span className="text-orange-600">{currentUser?.name}</span>!
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Manage your restaurant, track orders, and grow your business with
          GhanaBite.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stat Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Active Orders</h3>
            <Timer className="text-orange-500 w-8 h-8" />
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {isOrdersLoading ? "..." : activeOrders}
          </div>
          <p className="text-sm text-gray-500 mt-1">Orders needing attention</p>
        </div>

        {/* Quick Stat Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Today's Orders</h3>
            <ClipboardList className="text-blue-500 w-8 h-8" />
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {isOrdersLoading ? "..." : todaysOrders}
          </div>
          <p className="text-sm text-gray-500 mt-1">Orders placed today</p>
        </div>

        {/* Quick Stat Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Total Orders</h3>
            <TrendingUp className="text-green-500 w-8 h-8" />
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {isOrdersLoading ? "..." : totalOrders}
          </div>
          <p className="text-sm text-gray-500 mt-1">All-time orders</p>
        </div>
      </div>

      {/* Revenue analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Total Revenue</h3>
            <TrendingUp className="text-emerald-500 w-8 h-8" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {isOrdersLoading ? "..." : formatCurrency(totalRevenueCents)}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            From paid & delivered orders
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Today's Revenue</h3>
            <TrendingUp className="text-purple-500 w-8 h-8" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {isOrdersLoading ? "..." : formatCurrency(todayRevenueCents)}
          </div>
          <p className="text-sm text-gray-500 mt-1">Revenue generated today</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Avg. Order Value
            </h3>
            <TrendingUp className="text-indigo-500 w-8 h-8" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {isOrdersLoading ? "..." : `GHC ${averageOrderValue.toFixed(2)}`}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Average per completed order
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Navigation cards */}
        <div className="bg-orange-50 p-8 rounded-lg border border-orange-100 flex flex-col items-start gap-4 hover:shadow-lg transition-shadow">
          <div className="bg-orange-100 p-3 rounded-full">
            <UtensilsCrossed className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Manage Restaurant
            </h2>
            <p className="text-gray-600">
              Update your restaurant details, menu items, and business hours.
            </p>
          </div>
          <Link
            to="/manage-restaurant"
            className="mt-2 bg-orange-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Go to Restaurant Management Page
          </Link>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 flex flex-col items-start gap-4 hover:shadow-lg transition-shadow">
          <div className="bg-blue-100 p-3 rounded-full">
            <ClipboardList className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              View Orders
            </h2>
            <p className="text-gray-600">
              Check active orders, update status, and view order history.
            </p>
          </div>
          <Link
            to="/manage-restaurant"
            className="mt-2 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Orders
          </Link>
        </div>
      </div>

      {/* Analytics: Top items & recent orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Top Selling Items
          </h3>
          {isOrdersLoading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : topItems.length === 0 ? (
            <p className="text-gray-500 text-sm">
              Not enough data yet. When customers start ordering, your top items
              will appear here.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {topItems.map(([name, count]) => (
                <li
                  key={name}
                  className="py-2 flex items-center justify-between text-sm"
                >
                  <span className="font-medium text-gray-800">{name}</span>
                  <span className="text-gray-500">{count} sold</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Recent Orders
          </h3>
          {isOrdersLoading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : !restaurantOrders || restaurantOrders.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No orders yet. Your recent orders will appear here.
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {restaurantOrders.slice(0, 6).map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between text-sm border-b border-gray-100 pb-2 last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">
                      {order.deliveryDetails.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {order.totalAmount
                        ? formatCurrency(order.totalAmount)
                        : "Pending"}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerHomepage;
