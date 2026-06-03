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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  accent: string;
};

const StatCard = ({ title, value, subtitle, icon, accent }: StatCardProps) => (
  <div
    className={cn(
      "rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6",
      accent,
    )}
  >
    <div className="mb-3 flex items-center justify-between gap-2">
      <h3 className="text-base font-bold text-foreground sm:text-lg">{title}</h3>
      {icon}
    </div>
    <div className="text-2xl font-bold text-foreground sm:text-3xl">
      {value}
    </div>
    <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
  </div>
);

const ManagerHomepage = () => {
  const { currentUser } = useGetMyUser();
  const { myRestaurant } = useGetMyRestaurant();
  const { restaurantOrders, isPending: isOrdersLoading } =
    useGetMyRestaurantOrders({ enabled: !!myRestaurant });

  const activeOrders =
    restaurantOrders?.filter((o) => o.status !== "delivered").length || 0;
  const totalOrders = restaurantOrders?.length || 0;
  const today = new Date().toDateString();

  const todaysOrders =
    restaurantOrders?.filter(
      (o) => new Date(o.createdAt).toDateString() === today,
    ).length || 0;

  const completedOrders =
    restaurantOrders?.filter(
      (o) => o.totalAmount && (o.status === "paid" || o.status === "delivered"),
    ) || [];

  const totalRevenueCents = completedOrders.reduce(
    (sum, o) => sum + (o.totalAmount || 0),
    0,
  );
  const todayRevenueCents = completedOrders
    .filter((o) => new Date(o.createdAt).toDateString() === today)
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const averageOrderValue =
    completedOrders.length > 0
      ? totalRevenueCents / completedOrders.length / 100
      : 0;

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

  const loading = isOrdersLoading ? "..." : undefined;

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="rounded-2xl border border-brand-border bg-card p-6 text-center shadow-sm sm:p-10">
        <h1 className="mb-3 text-2xl font-bold text-foreground sm:text-4xl">
          Welcome back,{" "}
          <span className="text-brand">{currentUser?.name}</span>!
        </h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
          Manage your restaurant, track orders, and grow your business with
          GhanaBite.
        </p>
        {myRestaurant && (
          <p className="mt-2 text-sm font-medium text-brand">
            {myRestaurant.restaurantName} · {myRestaurant.city}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        <StatCard
          title="Active Orders"
          value={loading ?? activeOrders}
          subtitle="Orders needing attention"
          icon={<Timer className="h-7 w-7 text-brand sm:h-8 sm:w-8" />}
          accent="border-l-4 border-l-brand"
        />
        <StatCard
          title="Today's Orders"
          value={loading ?? todaysOrders}
          subtitle="Orders placed today"
          icon={
            <ClipboardList className="h-7 w-7 text-blue-600 dark:text-blue-400 sm:h-8 sm:w-8" />
          }
          accent="border-l-4 border-l-blue-500"
        />
        <StatCard
          title="Total Orders"
          value={loading ?? totalOrders}
          subtitle="All-time orders"
          icon={
            <TrendingUp className="h-7 w-7 text-emerald-600 dark:text-emerald-400 sm:h-8 sm:w-8" />
          }
          accent="border-l-4 border-l-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        <StatCard
          title="Total Revenue"
          value={loading ?? formatCurrency(totalRevenueCents)}
          subtitle="From paid & delivered orders"
          icon={
            <TrendingUp className="h-7 w-7 text-emerald-600 dark:text-emerald-400 sm:h-8 sm:w-8" />
          }
          accent="border-l-4 border-l-emerald-500"
        />
        <StatCard
          title="Today's Revenue"
          value={loading ?? formatCurrency(todayRevenueCents)}
          subtitle="Revenue generated today"
          icon={
            <TrendingUp className="h-7 w-7 text-violet-600 dark:text-violet-400 sm:h-8 sm:w-8" />
          }
          accent="border-l-4 border-l-violet-500"
        />
        <StatCard
          title="Avg. Order Value"
          value={loading ?? `GHC ${averageOrderValue.toFixed(2)}`}
          subtitle="Average per completed order"
          icon={
            <TrendingUp className="h-7 w-7 text-indigo-600 dark:text-indigo-400 sm:h-8 sm:w-8" />
          }
          accent="border-l-4 border-l-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div className="flex flex-col gap-4 rounded-xl border border-brand-border bg-brand-muted/50 p-6 transition hover:shadow-md sm:p-8">
          <div className="w-fit rounded-full bg-brand-muted p-3">
            <UtensilsCrossed className="h-8 w-8 text-brand" />
          </div>
          <div>
            <h2 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">
              Manage Restaurant
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Update your restaurant details, menu items, and business hours.
            </p>
          </div>
          <Button asChild className="mt-auto w-full font-bold sm:w-auto">
            <Link to="/manage-restaurant">Restaurant settings</Link>
          </Button>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition hover:shadow-md sm:p-8">
          <div className="w-fit rounded-full bg-muted p-3">
            <ClipboardList className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">
              View Orders
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Check active orders, update status, and view order history.
            </p>
          </div>
          <Button asChild variant="secondary" className="mt-auto w-full font-bold sm:w-auto">
            <Link to="/manage-restaurant">Go to orders</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h3 className="mb-4 text-lg font-bold text-foreground sm:text-xl">
            Top Selling Items
          </h3>
          {isOrdersLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : topItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              When customers start ordering, your top items will appear here.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {topItems.map(([name, count]) => (
                <li
                  key={name}
                  className="flex items-center justify-between py-2.5 text-sm"
                >
                  <span className="font-medium text-foreground">{name}</span>
                  <span className="text-muted-foreground">{count} sold</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h3 className="mb-4 text-lg font-bold text-foreground sm:text-xl">
            Recent Orders
          </h3>
          {isOrdersLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : !restaurantOrders || restaurantOrders.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No orders yet. Recent orders will appear here.
            </p>
          ) : (
            <div className="max-h-64 space-y-2 overflow-y-auto">
              {restaurantOrders.slice(0, 6).map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between border-b border-border pb-2 text-sm last:border-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <span className="block truncate font-medium text-foreground">
                      {order.deliveryDetails.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-foreground">
                      {order.totalAmount
                        ? formatCurrency(order.totalAmount)
                        : "Pending"}
                    </p>
                    <p className="text-xs capitalize text-muted-foreground">
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
