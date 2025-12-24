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
      <CardHeader className="bg-gradient-to-r from-orange-50 to-white rounded-t-lg pb-3">
        <CardTitle className="flex items-center justify-between text-2xl font-bold tracking-tight text-orange-700">
          <span className="flex items-center gap-2">
            <ShoppingCart className="text-orange-400" size={30} />
            <span>Your Order</span>
          </span>
          <span className="bg-orange-100 rounded-xl px-4 py-2 text-xl">
            {formatMoney(getTotalCost())}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 py-4 px-2">
        {cartItems.length === 0 ? (
          <>
            <div className="text-center text-gray-400 pb-3 flex flex-col items-center gap-2">
              <CheckCircle className="h-8 w-8 text-orange-200 mb-1" />
              <div className="font-medium text-base">
                No items in your cart yet.
              </div>
              <div className="text-[15px]">
                Add some delicious food to start your order!
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg px-3 py-2 shadow flex justify-between items-center mt-1">
              <span className="flex items-center gap-2 text-gray-700 font-medium">
                <Truck className="h-5 w-5 text-orange-400" /> Delivery Fee
              </span>
              <span className="font-semibold text-orange-700">
                {formatMoney(restaurant.deliveryPrice)}
              </span>
            </div>
            <div className="text-xs text-gray-400 text-right mt-1">
              Total includes only the delivery fee until items are added.
            </div>
          </>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-orange-50 rounded-lg px-3 py-2 shadow group transition hover:bg-orange-100"
              >
                <span className="flex items-center gap-3">
                  <Badge
                    variant="default"
                    className="bg-orange-400/90 text-white text-base px-2 py-1 font-bold"
                  >
                    {item.quantity}
                  </Badge>
                  <span className="font-semibold text-gray-800 tracking-tight">
                    {item.name}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-orange-700 font-bold text-lg">
                    {formatMoney(item.price * item.quantity)}
                  </span>
                  <Trash
                    className="cursor-pointer hover:scale-110 transition hover:text-red-500 text-red-400"
                    size={21}
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
            <div className="flex justify-between items-center px-1 text-[16px]">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="font-semibold">
                {formatMoney(getSubtotal())}
              </span>
            </div>
            <div className="flex justify-between items-center px-1 text-[16px]">
              <span className="flex items-center gap-1 text-gray-600 font-medium">
                <Truck className="h-5 w-5 text-orange-400" /> Delivery
              </span>
              <span className="font-semibold">
                {formatMoney(restaurant.deliveryPrice)}
              </span>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between items-center px-1 mt-2">
              <span className="text-lg font-bold text-orange-700">Total</span>
              <span className="bg-orange-100 rounded-lg px-4 py-2 text-[19px] font-bold text-orange-800 shadow">
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
