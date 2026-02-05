import type { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot, MapPin, Timer } from "lucide-react";
import { StarRating } from "./StarRating";

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  const computeOpenStatus = () => {
    if (restaurant.isTemporarilyClosed) {
      return { isOpen: false, label: "Temporarily closed" };
    }

    if (!restaurant.openingTime || !restaurant.closingTime) {
      return { isOpen: true, label: "Hours not set" };
    }

    const now = new Date();
    const dayIndex = now.getDay(); 
    const dayCodes = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayCode = dayCodes[dayIndex];

    if (restaurant.daysOpen && restaurant.daysOpen.length > 0) {
      if (!restaurant.daysOpen.includes(todayCode)) {
        return { isOpen: false, label: "Closed today" };
      }
    }

    const [openH, openM] = restaurant.openingTime.split(":").map(Number);
    const [closeH, closeM] = restaurant.closingTime.split(":").map(Number);
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    const isOpen = nowMinutes >= openMinutes && nowMinutes < closeMinutes;

    return {
      isOpen,
      label: isOpen
        ? `Open now • Closes at ${restaurant.closingTime}`
        : `Closed now • Opens at ${restaurant.openingTime}`,
    };
  };

  const { isOpen, label } = computeOpenStatus();

  return (
    <Card className="border-none shadow-lg  p-2 sm:p-4">
      <CardHeader className="space-y-1 pb-2 px-1 sm:px-2">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <CardTitle className="text-xl sm:text-3xl font-extrabold text-orange-600 tracking-tight ">
            {restaurant.restaurantName}
          </CardTitle>
          {/* <BadgePercent className="text-orange-400 h-5 w-5 sm:h-6 sm:w-6" /> */}
        </div>
        <CardDescription className="flex flex-col gap-2 text-sm sm:text-base text-gray-600">
          <div className="flex items-center gap-1 sm:gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 inline-block" />
            <span>
              {restaurant.city}, {restaurant.country}
            </span>
          </div>
          {restaurant.averageRating && (
            <div className="flex items-center gap-2">
              <StarRating
                rating={restaurant.averageRating}
                size="sm"
                showNumber
              />
              {restaurant.totalReviews && (
                <span className="text-xs text-gray-500">
                  ({restaurant.totalReviews}{" "}
                  {restaurant.totalReviews === 1 ? "review" : "reviews"})
                </span>
              )}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-2 sm:gap-3 py-1 px-1 sm:py-2 sm:px-2">
        <span
          className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-[15px] font-medium ${
            isOpen ? "text-emerald-600" : "text-red-600"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isOpen ? "bg-emerald-500" : "bg-red-500"
            }`}
          />
          <span>{label}</span>
        </span>
        <span className="flex items-center gap-1 sm:gap-2 text-xs sm:text-[15px] text-gray-500 font-medium">
          <Timer className="h-4 w-4 text-orange-400 mr-1" />
          Est. Delivery:
          <span className="text-orange-700 font-semibold">
            {restaurant.estimatedDeliveryTime} mins
          </span>
        </span>
        <span className="flex items-center gap-1 sm:gap-2 text-xs sm:text-[15px] text-gray-500 font-medium before:content-['·'] before:mx-2 before:text-gray-300">
          Delivery Fee:
          <span className="text-orange-700 font-semibold">
            GHC{(restaurant.deliveryPrice / 100).toFixed(2)}
          </span>
        </span>
        <span className="flex items-center gap-1 sm:gap-2 flex-wrap ml-0 sm:ml-2 w-full sm:w-auto">
          {restaurant.cuisines.map((cuisine, index) => (
            <span
              key={cuisine}
              className="inline-flex items-center px-2 py-0.5 sm:py-1  rounded-full text-orange-800 text-xs sm:text-sm font-semibold shadow-sm mr-1 sm:mr-2 mb-1"
            >
              {cuisine}
              {index < restaurant.cuisines.length - 1 && (
                <Dot className="inline-block text-orange-300 h-4 w-4 sm:h-5 sm:w-5 ml-1" />
              )}
            </span>
          ))}
        </span>
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
