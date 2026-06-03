import type { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";
import { StarRating } from "./StarRating";

interface Props {
  restaurant: Restaurant;
}

const SearchResultsCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="group grid gap-4 rounded-xl border border-border bg-card p-3 shadow-sm transition hover:border-brand-border hover:shadow-md sm:gap-5 sm:p-4 lg:grid-cols-[2fr_3fr]"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
          className="h-full w-full rounded-lg object-cover transition group-hover:brightness-[1.02]"
        />
      </AspectRatio>
      <div className="flex flex-col justify-center">
        <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-brand sm:text-2xl">
          {restaurant.restaurantName}
        </h3>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          <div className="flex flex-row flex-wrap text-xs text-muted-foreground sm:text-sm">
            {restaurant.cuisines.map((cuisine, index) => (
              <span className="flex items-center" key={cuisine}>
                <span>{cuisine}</span>
                {index < restaurant.cuisines.length - 1 && (
                  <Dot className="h-4 w-4" aria-hidden />
                )}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-1 text-xs sm:text-sm">
            {restaurant.averageRating != null && (
              <div className="flex items-center gap-1">
                <StarRating
                  rating={restaurant.averageRating}
                  size="sm"
                  showNumber
                />
                {restaurant.totalReviews != null && (
                  <span className="text-muted-foreground">
                    ({restaurant.totalReviews} reviews)
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
              {restaurant.estimatedDeliveryTime} min delivery
            </div>
            <div className="flex items-center gap-1.5 text-foreground/90">
              <Banknote className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
              Delivery from GHC {(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultsCard;
