import type { CartItem } from "@/pages/DetailPage";
import type { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash, ShoppingCart, CheckCircle, Truck } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const formatMoney = (value: number) => `GHC${(value / 100).toFixed(2)}`;

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const getSubtotal = () =>
    cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

  const getTotalCost = () => getSubtotal() + restaurant.deliveryPrice;

  return (
    <>
      <CardHeader className="rounded-t-lg pb-2 px-2 sm:pb-3">
        <CardTitle className="flex items-center justify-between text-lg sm:text-2xl font-bold tracking-tight text-orange-700">
          <span className="flex items-center gap-1 sm:gap-2">
            <ShoppingCart className="text-orange-400" size={24} />
            <span className="text-base sm:text-xl">Your Order</span>
          </span>
          <span className=" rounded-xl px-3 sm:px-4 py-1 sm:py-2 text-base sm:text-xl">
            {formatMoney(getTotalCost())}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 py-3 px-2 sm:gap-4 sm:py-4 sm:px-4">
        {cartItems.length === 0 ? (
          <>
            <div className="text-center text-gray-400 pb-2 sm:pb-3 flex flex-col items-center gap-2">
              <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 text-orange-200 mb-1" />
              <div className="font-medium text-sm sm:text-base">
                No items in your cart yet.
              </div>
              <div className="text-xs sm:text-[15px]">
                Add some delicious food to start your order!
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 shadow flex justify-between items-center mt-1">
              <span className="flex items-center gap-1 sm:gap-2 text-gray-700 font-medium text-sm sm:text-base">
                <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" /> Delivery Fee
              </span>
              <span className="font-semibold text-orange-700 text-sm sm:text-base">
                {formatMoney(restaurant.deliveryPrice)}
              </span>
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 text-right mt-1">
              Total includes only the delivery fee until items are added.
            </div>
          </>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center  rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 shadow group transition hover:bg-orange-100"
              >
                <span className="flex items-center gap-2 sm:gap-3">
                  <Badge
                    variant="default"
                    className="bg-orange-400/90 text-white text-xs sm:text-base px-1.5 py-0.5 sm:px-2 sm:py-1 font-bold"
                  >
                    {item.quantity}
                  </Badge>
                  <span className="font-semibold text-gray-800 tracking-tight text-sm sm:text-base">
                    {item.name}
                  </span>
                </span>
                <span className="flex items-center gap-1 sm:gap-2">
                  <span className="text-orange-700 font-bold text-base sm:text-lg">
                    {formatMoney(item.price * item.quantity)}
                  </span>
                  <Trash
                    className="cursor-pointer hover:scale-110 transition hover:text-red-500 text-red-400"
                    size={19}
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => removeFromCart(item)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        removeFromCart(item);
                    }}
                  />
                </span>
              </div>
            ))}
            <Separator className="my-1" />
            <div className="flex justify-between items-center px-1 text-[13px] sm:text-[16px]">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="font-semibold">
                {formatMoney(getSubtotal())}
              </span>
            </div>
            <div className="flex justify-between items-center px-1 text-[13px] sm:text-[16px]">
              <span className="flex items-center gap-1 text-gray-600 font-medium">
                <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" /> Delivery
              </span>
              <span className="font-semibold">
                {formatMoney(restaurant.deliveryPrice)}
              </span>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between items-center px-1 mt-2">
              <span className="text-base sm:text-lg font-bold text-orange-700">Total</span>
              <span className=" rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-base sm:text-[19px] font-bold text-orange-800 shadow">
                {formatMoney(getTotalCost())}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </>
  );
};

export default OrderSummary;
