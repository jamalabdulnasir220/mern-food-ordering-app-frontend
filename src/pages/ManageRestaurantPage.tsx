import {
  useCreateRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/restaurantRouter";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreating } = useCreateRestaurant();
  const { updateRestaurant, isLoading: isUpdating } = useUpdateMyRestaurant();
  const { myRestaurant } = useGetMyRestaurant();

  const isEditing = !!myRestaurant;

  return (
    <ManageRestaurantForm 
      myRestaurant={myRestaurant}
      onsave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreating || isUpdating}
    />
  );
};

export default ManageRestaurantPage;
