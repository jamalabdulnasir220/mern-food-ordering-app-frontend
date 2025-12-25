import type { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";
import { Clock, CheckCircle2, Package, Truck, ChefHat } from "lucide-react";
import { Badge } from "./ui/badge";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  const getStatusIcon = () => {
    switch (order.status) {
      case "placed":
        return <Package className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "paid":
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "inProgress":
        return <ChefHat className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "outForDelivery":
        return <Truck className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "delivered":
        return <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <Package className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const getStatusColor = () => {
    switch (order.status) {
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

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
        <div className="flex items-center gap-3">
          <Badge
            className={`${getStatusColor()} border font-semibold text-xs sm:text-sm px-3 py-1.5 flex items-center gap-2`}
          >
            {getStatusIcon()}
            {statusInfo.label}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
          <span className="text-sm sm:text-base font-semibold">
            Expected by{" "}
            <span className="text-orange-600">{getExpectedDelivery()}</span>
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-1">
          <span>Order Progress</span>
          {/* <span className="font-semibold text-gray-800">
            {statusInfo.progressValue}%
          </span> */}
        </div>
        <Progress className="h-2.5 sm:h-3" value={statusInfo.progressValue} />
      </div>
    </div>
  );
};

export default OrderStatusHeader;
