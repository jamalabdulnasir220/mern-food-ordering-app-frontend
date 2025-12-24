import type { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot, MapPin, Timer, BadgePercent } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-orange-50 to-white">
      <CardHeader className="space-y-1 pb-2">
        <div className="flex items-center gap-3 mb-2">
          <CardTitle className="text-3xl font-extrabold text-orange-600 tracking-tight drop-shadow-sm">
            {restaurant.restaurantName}
          </CardTitle>
          <BadgePercent className="text-orange-400 h-6 w-6" />
        </div>
        <CardDescription className="flex items-center gap-2 text-base text-gray-600">
          <MapPin className="w-5 h-5 text-orange-500 inline-block" />
          <span>{restaurant.city}, {restaurant.country}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-3 py-2 px-1">
        <span className="flex items-center gap-2 text-[15px] text-gray-500 font-medium">
          <Timer className="h-4 w-4 text-orange-400 mr-1" />
          Est. Delivery: 
          <span className="text-orange-700 font-semibold">{restaurant.estimatedDeliveryTime} mins</span>
        </span>
        <span className="flex items-center gap-2 text-[15px] text-gray-500 font-medium before:content-['·'] before:mx-2 before:text-gray-300">
          Delivery Fee: 
          <span className="text-orange-700 font-semibold">${restaurant.deliveryPrice.toFixed(2)}</span>
        </span>
        <span className="flex items-center gap-2 flex-wrap ml-2">
          {restaurant.cuisines.map((cuisine, index) => (
            <span
              key={cuisine}
              className="inline-flex items-center px-2 py-1 bg-orange-100 rounded-full text-orange-800 text-sm font-semibold shadow-sm mr-2"
            >
              {cuisine}
              {index < restaurant.cuisines.length - 1 && (
                <Dot className="inline-block text-orange-300 h-5 w-5 ml-1" />
              )}
            </span>
          ))}
        </span>
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
