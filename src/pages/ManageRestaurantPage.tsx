import {
  useCreateRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/restaurantRouter";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import {
  Loader2,
  PackageSearch,
  UtensilsCrossed,
  ClipboardList,
} from "lucide-react";
import { useGetMyUser } from "@/api/authRouter";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ManageRestaurantPage = () => {
  const navigate = useNavigate()
  const { createRestaurant, isLoading: isCreating } = useCreateRestaurant();
  const { updateRestaurant, isLoading: isUpdating } = useUpdateMyRestaurant();
  const { myRestaurant, isPending: isGetRestaurantLoading } = useGetMyRestaurant();
  const { restaurantOrders, isPending: isLoadingOrders } =
    useGetMyRestaurantOrders({ enabled: !!myRestaurant });
  const { currentUser } = useGetMyUser();

  const handleCreateRestaurant = (restaurantFormData: FormData) => {
    if (currentUser?.applicationStatus !== "approved") {
      toast.error("Your account has not been approved yet. Please contact admin for approval.");
      return;
    }
    createRestaurant(restaurantFormData);
    navigate("/manager-dashboard");
  };

  const handleUpdateRestaurant = (restaurantFormData: FormData) => {
      if (currentUser?.applicationStatus !== "approved") {
        toast.error("Your account has not been approved yet. Please contact admin for approval.");
        return;
      }
      updateRestaurant(restaurantFormData);
  };

  const isEditing = !!myRestaurant;

  // Filter out delivered orders - only show pending orders
  const pendingOrders =
    restaurantOrders?.filter((order) => order.status !== "delivered") || [];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
          <UtensilsCrossed className="text-orange-500 w-8 h-8 sm:w-10 sm:h-10" />
          Restaurant Management
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Manage your restaurant details and track incoming orders
        </p>
      </div>

      <Tabs defaultValue="manage-restaurant" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger
            value="orders"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2"
          >
            <ClipboardList className="w-4 h-4" />
            <span>Orders</span>
            {pendingOrders.length > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {pendingOrders.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="manage-restaurant"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Restaurant Details</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          {isGetRestaurantLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gray-50 rounded-xl p-8">
              <Loader2 className="animate-spin h-10 w-10 sm:h-12 sm:w-12 text-orange-500 mb-3 sm:mb-4" />
              <div className="text-base sm:text-lg font-semibold text-gray-600">
                Loading restaurant data...
              </div>
            </div>
          ) : !myRestaurant ? (
             <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gray-50 rounded-xl p-8">
              <UtensilsCrossed className="h-16 w-16 sm:h-20 sm:w-20 text-gray-300 mb-4" />
              <div className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">
                No Restaurant Found
              </div>
              <div className="text-gray-500 text-sm sm:text-base text-center max-w-md">
                Create your restaurant in the "Restaurant Details" tab to start receiving orders.
              </div>
            </div>
          ) : isLoadingOrders ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gray-50 rounded-xl p-8">
              <Loader2 className="animate-spin h-10 w-10 sm:h-12 sm:w-12 text-orange-500 mb-3 sm:mb-4" />
              <div className="text-base sm:text-lg font-semibold text-gray-600">
                Loading orders...
              </div>
            </div>
          ) : pendingOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gray-50 rounded-xl p-8">
              <PackageSearch className="h-16 w-16 sm:h-20 sm:w-20 text-orange-400 mb-4" />
              <div className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">
                No pending orders
              </div>
              <div className="text-gray-500 text-sm sm:text-base text-center max-w-md">
                {restaurantOrders && restaurantOrders.length > 0
                  ? "All orders have been delivered! Great work! 🎉"
                  : "You don't have any orders at the moment. Orders will appear here when customers place them."}
              </div>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Pending Orders
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">
                    {pendingOrders.length}{" "}
                    {pendingOrders.length === 1 ? "order" : "orders"} pending
                    {restaurantOrders &&
                      restaurantOrders.length > pendingOrders.length && (
                        <span className="text-gray-400">
                          {" "}
                          ({restaurantOrders.length - pendingOrders.length}{" "}
                          delivered)
                        </span>
                      )}
                  </p>
                </div>
                <div className="bg-orange-100 rounded-full px-4 py-2">
                  <span className="text-orange-700 font-bold text-lg sm:text-xl">
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
          <ManageRestaurantForm
            restaurant={myRestaurant}
            onSave={isEditing ? handleUpdateRestaurant : handleCreateRestaurant}
            isLoading={isCreating || isUpdating}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageRestaurantPage;
