import type { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api/restaurantRouter";
import { useEffect, useState } from "react";
import {
  User,
  MapPin,
  Clock,
  DollarSign,
  ShoppingBag,
  Loader2,
} from "lucide-react";

type Props = {
  order: Order;
};

const formatMoney = (value: number) => `GHC${(value / 100).toFixed(2)}`;

const OrderItemCard = ({ order }: Props) => {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const { updateRestaurantStatus, isPending } = useUpdateMyRestaurantOrder();

  useEffect(() => {
    setStatus(order.status);
  }, [order]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestaurantStatus({ orderId: order._id, status: newStatus });
    setStatus(newStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);
    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedMinutes}`;
  };

  const getOrderStatusInfo = () => {
    return ORDER_STATUS.find((o) => o.value === status) || ORDER_STATUS[0];
  };

  const getStatusColor = () => {
    switch (status) {
      case "placed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "paid":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "inProgress":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "outForDelivery":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const statusInfo = getOrderStatusInfo();

  // Get border color based on status for better visual distinction
  const getBorderColor = () => {
    switch (status) {
      case "placed":
        return "border-l-4 border-l-blue-500";
      case "paid":
        return "border-l-4 border-l-yellow-500";
      case "inProgress":
        return "border-l-4 border-l-orange-500";
      case "outForDelivery":
        return "border-l-4 border-l-purple-500";
      case "delivered":
        return "border-l-4 border-l-green-500";
      default:
        return "border-l-4 border-l-gray-500";
    }
  };

  // Get order number from ID (last 6 characters)
  const orderNumber = order._id.slice(-6).toUpperCase();

  return (
    <Card
      className={`bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden ${getBorderColor()}`}
    >
      <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 px-4 sm:px-6 py-4 border-b border-orange-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Badge
              className={`${getStatusColor()} border font-semibold text-xs sm:text-sm px-3 py-1.5`}
            >
              {statusInfo.label}
            </Badge>
            <span className="text-xs sm:text-sm text-gray-500 font-medium">
              Order #{orderNumber}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm sm:text-base font-medium">
              {getTime()}
            </span>
          </div>
        </div>
      </div>

      <CardHeader className="pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 flex items-start gap-3">
            <div className="bg-orange-100 rounded-lg p-2 flex-shrink-0">
              <User className="text-orange-600" size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs sm:text-sm text-gray-500 font-medium block mb-1">
                Customer Name
              </span>
              <span className="text-sm sm:text-base font-semibold text-gray-900">
                {order.deliveryDetails.name}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 flex items-start gap-3">
            <div className="bg-orange-100 rounded-lg p-2 flex-shrink-0">
              <MapPin className="text-orange-600" size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs sm:text-sm text-gray-500 font-medium block mb-1">
                Delivery Address
              </span>
              <span className="text-sm sm:text-base font-semibold text-gray-900 break-words">
                {order.deliveryDetails.addressLine1},{" "}
                {order.deliveryDetails.city}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6 space-y-6">
        <div className="bg-orange-50 rounded-lg p-4 sm:p-5 border border-orange-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500 rounded-lg p-2">
              <ShoppingBag className="text-white" size={18} />
            </div>
            <span className="font-bold text-gray-800 text-base sm:text-lg">
              Order Items
            </span>
          </div>
          <div className="space-y-2.5">
            {order.cartItems.map((cartItem) => (
              <div
                key={cartItem.menuItemId}
                className="bg-white rounded-lg p-3 sm:p-4 flex justify-between items-center shadow-sm border border-orange-100"
              >
                <span className="font-semibold text-gray-800 text-sm sm:text-base flex-1">
                  {cartItem.name}
                </span>
                <Badge className="bg-orange-500 text-white font-bold text-xs sm:text-sm px-3 py-1 ml-3">
                  ×{cartItem.quantity}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 sm:p-5 border-2 border-green-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 rounded-lg p-2">
              <DollarSign className="text-white" size={20} />
            </div>
            <div>
              <span className="text-xs sm:text-sm text-gray-600 font-medium block">
                Total Amount
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-green-700">
                {formatMoney(order.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
          <Label
            htmlFor="status"
            className="text-sm sm:text-base font-semibold text-gray-700 mb-3 block"
          >
            Update Order Status
          </Label>
          <Select
            value={status}
            disabled={isPending}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger
              id="status"
              className="w-full h-11 sm:h-12 text-sm sm:text-base"
            >
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((statusOption) => (
                <SelectItem
                  key={statusOption.value}
                  value={statusOption.value}
                  className="text-sm sm:text-base"
                >
                  {statusOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isPending && (
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>Updating status...</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
