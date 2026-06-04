import { useGetRestaurantsByIds } from "@/api/allRestaurants";
import { useGetMyUser } from "@/api/authRouter";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import PageLoader from "@/components/ui/page-loader";
import { Button } from "@/components/ui/button";
import { PackageSearch } from "lucide-react";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const { currentUser, isPending: isUserLoading } = useGetMyUser();
  const { restaurants, isLoading: isRestaurantsLoading } = useGetRestaurantsByIds(
    currentUser?.favorites
  );

  const isLoading = isUserLoading || isRestaurantsLoading;

  if (isLoading) {
    return <PageLoader label="Loading your favorites..." />;
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center rounded-2xl border border-dashed border-brand-border bg-card p-8 text-center sm:p-12">
        <PackageSearch className="mb-4 h-14 w-14 text-brand" aria-hidden />
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          No favorites yet
        </h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Explore restaurants and tap the heart icon to save them here for quick
          access.
        </p>
        <Button asChild className="mt-6 font-bold">
          <Link to="/">Browse restaurants</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8 sm:space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Your favorites
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Quickly access your saved restaurants
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant._id}
            to={`/detail/${restaurant._id}`}
            className="group block overflow-hidden rounded-xl border border-brand-border bg-card shadow-sm transition-all duration-300 hover:border-brand hover:shadow-md"
          >
            <AspectRatio ratio={16 / 9}>
              <img
                src={restaurant.imageUrl}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                alt={restaurant.restaurantName}
              />
            </AspectRatio>
            <div className="p-4">
              <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-brand">
                {restaurant.restaurantName}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {restaurant.cuisines.join(", ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
