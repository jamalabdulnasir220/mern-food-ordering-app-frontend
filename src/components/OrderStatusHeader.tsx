import type { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

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

  return (
    <div className="px-2 py-2 sm:px-4 sm:py-4">
      <h1 className="text-xl sm:text-3xl font-bold tracking-tighter flex flex-col gap-2 sm:gap-5 md:flex-row md:justify-between">
        <span className="text-base sm:text-2xl">
          Order Status: {getOrderStatusInfo().label}
        </span>
        <span className="text-base sm:text-2xl">
          Expected by: {getExpectedDelivery()}
        </span>
      </h1>
      <Progress
        className="animate-pulse mt-3"
        value={getOrderStatusInfo().progressValue}
      />
    </div>
  );
};

export default OrderStatusHeader;
