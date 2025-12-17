import { useCreateRestaurant } from "@/api/restaurantRouter"
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"

const ManageRestaurantPage = () => {
  const {createRestaurant, isLoading} = useCreateRestaurant()
  return (
    <ManageRestaurantForm onsave={createRestaurant} isLoading={isLoading} />
  )
}

export default ManageRestaurantPage
