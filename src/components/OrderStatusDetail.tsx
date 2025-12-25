import type { Order } from "@/types";
import { Separator } from "./ui/separator";
import {
  User,
  MapPin,
  ShoppingBag,
  DollarSign,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { Badge } from "./ui/badge";

type Props = {
  order: Order;
};

const formatMoney = (value: number) => `GHC${(value / 100).toFixed(2)}`;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const OrderStatusDetail = ({ order }: Props) => {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Delivery Address Card */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 p-4 sm:p-5 hover:shadow-lg transition-shadow">
        <div className="flex gap-3 sm:gap-4 items-start">
          <div className="bg-orange-100 rounded-lg p-2.5 sm:p-3 flex-shrink-0">
            <MapPin className="text-orange-600" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                Delivery Address
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <User className="text-gray-400 flex-shrink-0" size={16} />
              <span className="text-gray-900 font-semibold text-base sm:text-lg">
                {order.deliveryDetails.name}
              </span>
            </div>
            <div className="text-gray-600 text-sm sm:text-base break-words leading-relaxed">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </div>
          </div>
        </div>
      </div>

      {/* Order Items Card */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-xl shadow-md border border-orange-200 p-4 sm:p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-500 rounded-lg p-2">
            <ShoppingBag className="text-white" size={18} />
          </div>
          <span className="font-bold text-gray-800 tracking-tight text-base sm:text-lg">
            Order Items
          </span>
        </div>
        <div className="space-y-2.5 sm:space-y-3">
          {order.cartItems.map((item) => (
            <div
              key={item.menuItemId}
              className="bg-white rounded-lg p-3 sm:p-4 flex justify-between items-center shadow-sm border border-orange-100 hover:shadow-md transition-shadow"
            >
              <span className="font-semibold text-gray-800 text-sm sm:text-base flex-1">
                {item.name}
              </span>
              <Badge className="bg-orange-500 text-white font-bold text-xs sm:text-sm px-3 py-1 ml-3">
                ×{item.quantity}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Order Date */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 flex items-center gap-3">
        <Calendar className="text-gray-400 flex-shrink-0" size={18} />
        <div>
          <span className="text-xs sm:text-sm text-gray-500 font-medium">
            Order placed on
          </span>
          <p className="text-sm sm:text-base font-semibold text-gray-800">
            {formatDate(order.createdAt)}
          </p>
        </div>
      </div>

      <Separator className="my-2" />

      {/* Total Amount Card */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-md border-2 border-green-200 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 rounded-lg p-2">
              <DollarSign className="text-white" size={20} />
            </div>
            <div>
              <span className="text-xs sm:text-sm text-gray-600 font-medium block">
                Total Amount
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-green-700">
                {formatMoney(order.totalAmount)}
              </span>
            </div>
          </div>
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircle2 className="text-green-600" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
