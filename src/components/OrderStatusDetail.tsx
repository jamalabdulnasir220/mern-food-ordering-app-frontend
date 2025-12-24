import type { Order } from "@/types";
import { Separator } from "./ui/separator";
import { User, MapPin, ShoppingBag, DollarSign, CheckCircle } from "lucide-react";

type Props = {
  order: Order;
};

const formatMoney = (value: number) => `GHC${(value / 100).toFixed(2)}`;

const OrderStatusDetail = ({ order }: Props) => {
  return (
    <div className="space-y-5 sm:space-y-7 px-1 py-3 sm:px-0 sm:py-0">
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 flex gap-2 sm:gap-3 items-start">
        <MapPin className="text-orange-400 mt-[2px]" size={20} />
        <div>
          <span className="font-bold text-xs sm:text-sm text-gray-700">Delivering to</span>
          <div className="mt-1 text-gray-900 font-medium text-base sm:text-lg flex items-center gap-1">
            <User className="inline-block text-gray-400" size={15} />
            <span>{order.deliveryDetails.name}</span>
          </div>
          <div className="text-gray-600 text-sm sm:text-base break-all">
            {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
          </div>
        </div>
      </div>
      <div className="bg-orange-50 rounded-lg shadow px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
          <ShoppingBag className="text-orange-400" size={18} />
          <span className="font-bold text-gray-700 tracking-tight text-base sm:text-lg">Your Order</span>
        </div>
        <ul className="pl-2 sm:pl-3 flex flex-col gap-2">
          {order.cartItems.map((item) => (
            <li key={item.menuItemId} className="flex justify-between items-center py-0.5">
              <span className="font-semibold text-gray-800 text-sm sm:text-base">{item.name}</span>
              <span className="flex items-center gap-2">
                <span className="bg-orange-100 rounded-md px-2 py-0.5 text-orange-600 font-bold text-xs sm:text-sm">
                  x{item.quantity}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="bg-white py-3 px-3 sm:py-4 sm:px-4 rounded-lg flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <DollarSign className="text-green-400" size={17} />
          <span className="font-bold text-gray-800 text-base sm:text-lg">Total</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl font-extrabold text-orange-700">{formatMoney(order.totalAmount)}</span>
          <CheckCircle className="text-emerald-500" size={19} />
        </div>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
