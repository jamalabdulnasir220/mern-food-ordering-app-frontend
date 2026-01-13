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
      className="grid lg:grid-cols-[2fr_3fr] gap-4 sm:gap-5 group px-2 py-3 sm:px-4 sm:py-4 rounded-md bg-white"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          alt=""
          className="w-full h-full rounded-md object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-lg sm:text-2xl font-bold tracking-tight mb-1 sm:mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-1 sm:gap-2">
          <div className="flex flex-row flex-wrap text-xs sm:text-base mb-1">
            {restaurant.cuisines.map((cuisine, index) => (
              <span className="flex items-center" key={cuisine}>
                <span>{cuisine}</span>
                {index < restaurant.cuisines.length - 1 && (
                  <Dot className="w-4 h-4" />
                )}
              </span>
            ))}
          </div>
          <div className="flex gap-1 sm:gap-2 flex-col text-xs sm:text-base">
            {restaurant.averageRating && (
              <div className="flex items-center gap-1">
                <StarRating
                  rating={restaurant.averageRating}
                  size="sm"
                  showNumber
                />
                {restaurant.totalReviews && (
                  <span className="text-gray-500">
                    ({restaurant.totalReviews})
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote className="w-4 h-4 sm:w-5 sm:h-5" />
              Delivery from GHC {(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultsCard;
