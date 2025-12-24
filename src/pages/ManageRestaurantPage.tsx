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
  const { restaurantOrders } = useGetMyRestaurantOrders();
  const { myRestaurant } = useGetMyRestaurant();

  const isEditing = !!myRestaurant;

  

  

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">
          {restaurantOrders?.length} active orders
        </h2>
        {restaurantOrders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          myRestaurant={myRestaurant}
          onsave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreating || isUpdating}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
