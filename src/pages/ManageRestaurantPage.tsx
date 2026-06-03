import {
  useCreateRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/restaurantRouter";
import OrderItemCard from "@/components/OrderItemCard";
import PageLoader from "@/components/ui/page-loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { Badge } from "@/components/ui/badge";
import {
  PackageSearch,
  UtensilsCrossed,
  ClipboardList,
} from "lucide-react";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreating } = useCreateRestaurant();
  const { updateRestaurant, isLoading: isUpdating } = useUpdateMyRestaurant();
  const { myRestaurant, isPending: isGetRestaurantLoading } =
    useGetMyRestaurant();
  const { restaurantOrders, isPending: isLoadingOrders } =
    useGetMyRestaurantOrders({ enabled: !!myRestaurant });

  const handleCreateRestaurant = (restaurantFormData: FormData) => {
    createRestaurant(restaurantFormData);
  };

  const handleUpdateRestaurant = (restaurantFormData: FormData) => {
    updateRestaurant(restaurantFormData);
  };

  const isEditing = !!myRestaurant;
  const pendingOrders =
    restaurantOrders?.filter((order) => order.status !== "delivered") || [];

  return (
    <div className="space-y-6 sm:space-y-8">
      <header>
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground sm:gap-3 sm:text-3xl md:text-4xl">
          <UtensilsCrossed className="h-7 w-7 shrink-0 text-brand sm:h-9 sm:w-9 md:h-10 md:w-10" />
          Restaurant Management
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Manage your restaurant details and track incoming orders
        </p>
      </header>

      <Tabs defaultValue="manage-restaurant" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 p-1">
          <TabsTrigger
            value="orders"
            className="flex items-center gap-2 py-2.5 text-sm sm:text-base"
          >
            <ClipboardList className="h-4 w-4 shrink-0" />
            <span>Orders</span>
            {pendingOrders.length > 0 && (
              <Badge className="bg-brand text-brand-foreground">
                {pendingOrders.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="manage-restaurant"
            className="flex items-center gap-2 py-2.5 text-sm sm:text-base"
          >
            <UtensilsCrossed className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Restaurant </span>
            Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          {isGetRestaurantLoading ? (
            <PageLoader label="Loading restaurant data..." />
          ) : !myRestaurant ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-brand-border bg-card p-6 text-center sm:p-10">
              <UtensilsCrossed className="mb-4 h-16 w-16 text-muted-foreground/40 sm:h-20 sm:w-20" />
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                No restaurant yet
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
                Create your restaurant in the Restaurant Details tab to start
                receiving orders.
              </p>
            </div>
          ) : isLoadingOrders ? (
            <PageLoader label="Loading orders..." />
          ) : pendingOrders.length === 0 ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-brand-border bg-card p-6 text-center sm:p-10">
              <PackageSearch className="mb-4 h-16 w-16 text-brand sm:h-20 sm:w-20" />
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                No pending orders
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
                {restaurantOrders && restaurantOrders.length > 0
                  ? "All orders have been delivered. Great work!"
                  : "Orders will appear here when customers place them."}
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-foreground sm:text-xl">
                    Pending Orders
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {pendingOrders.length}{" "}
                    {pendingOrders.length === 1 ? "order" : "orders"} pending
                    {restaurantOrders &&
                      restaurantOrders.length > pendingOrders.length && (
                        <span className="text-muted-foreground/70">
                          {" "}
                          ({restaurantOrders.length - pendingOrders.length}{" "}
                          delivered)
                        </span>
                      )}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-muted">
                  <span className="text-lg font-bold text-brand sm:text-xl">
                    {pendingOrders.length}
                  </span>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-5">
                {pendingOrders.map((order) => (
                  <OrderItemCard key={order._id} order={order} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="manage-restaurant" className="mt-6">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6 md:p-8">
            <ManageRestaurantForm
              restaurant={myRestaurant}
              onSave={isEditing ? handleUpdateRestaurant : handleCreateRestaurant}
              isLoading={isCreating || isUpdating}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageRestaurantPage;
