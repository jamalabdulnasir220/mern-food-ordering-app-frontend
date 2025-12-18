import { useCreateRestaurant, useGetMyRestaurant } from "@/api/restaurantRouter"
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateRestaurant()
  const {myRestaurant} = useGetMyRestaurant()
  return (
    <ManageRestaurantForm myRestaurant={myRestaurant} onsave={createRestaurant} isLoading={isLoading} />
  )
}

export default ManageRestaurantPage
