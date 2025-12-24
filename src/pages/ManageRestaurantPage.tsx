import {
  useCreateRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/restaurantRouter";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreating } = useCreateRestaurant();
  const { updateRestaurant, isLoading: isUpdating } = useUpdateMyRestaurant();
  const { myRestaurant } = useGetMyRestaurant();
  const { restaurantOrders } = useGetMyRestaurantOrders(!!myRestaurant);

  const isEditing = !!myRestaurant;

  return (
    <Tabs defaultValue={myRestaurant ? "orders" : "manage-restaurant"}>
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        {!myRestaurant ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">
              Create your restaurant first to view orders.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold">
              {restaurantOrders?.length || 0} active orders
            </h2>
            {restaurantOrders?.map((order) => (
              <OrderItemCard key={order._id} order={order} />
            ))}
          </>
        )}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          myRestaurant={myRestaurant || undefined}
          onsave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreating || isUpdating}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
