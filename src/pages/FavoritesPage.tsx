import { useGetRestaurantsByIds } from "@/api/allRestaurants";
import { useGetMyUser } from "@/api/authRouter";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Loader2, PackageSearch } from "lucide-react";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const { currentUser, isPending: isUserLoading } = useGetMyUser();
  const { restaurants, isLoading: isRestaurantsLoading } = useGetRestaurantsByIds(
    currentUser?.favorites
  );

  const isLoading = isUserLoading || isRestaurantsLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] px-2 sm:px-4">
        <Loader2 className="animate-spin h-10 w-10 sm:h-12 sm:w-12 text-orange-500 mb-3 sm:mb-4" />
        <div className="text-base sm:text-lg font-semibold text-gray-600">
          Loading your favorites...
        </div>
      </div>
    );
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gray-50 rounded-lg p-4 sm:p-10">
        <PackageSearch className="h-11 w-11 sm:h-14 sm:w-14 text-orange-400 mb-3 sm:mb-4" />
        <div className="text-lg sm:text-2xl font-bold text-gray-700 mb-1 sm:mb-2">
          No favorites yet
        </div>
        <div className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4 text-center">
          You haven't added any restaurants to your favorites.
          <br />
          Explore restaurants and click the heart icon to save them!
        </div>
        <Link
          to="/"
          className="inline-block px-4 sm:px-6 py-2 bg-orange-500 hover:bg-orange-600 transition font-bold rounded text-white text-sm sm:text-base"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 md:px-0 pb-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Your Favorites
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Quickly access your favorite restaurants
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant._id}
            to={`/detail/${restaurant._id}`}
            className="group block bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <AspectRatio ratio={16 / 9}>
              <img
                src={restaurant.imageUrl}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                alt={restaurant.restaurantName}
              />
            </AspectRatio>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                {restaurant.restaurantName}
              </h3>
              <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                {restaurant.cuisines.join(", ")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
