import type { Order, OrderStatus } from "@/types";
import OrderStatusTracker from "@/components/OrderStatusTracker";
import { getOrderStatusInfo } from "@/config/order-status-config";
import { getOrderTotalLabel } from "@/lib/orderTotals";
import {
  countOrderItems,
  formatLineTotal,
  formatOrderDateTime,
  getExpectedDeliveryTime,
} from "@/lib/orderFormatters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  ChefHat,
  Clock,
  MapPin,
  Package,
  RotateCcw,
  Truck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  order: Order;
  justPlaced?: boolean;
};

const statusStyles: Record<
  OrderStatus,
  { badge: string; icon: typeof Package }
> = {
  placed: {
    badge:
      "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800",
    icon: Package,
  },
  paid: {
    badge:
      "bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800",
    icon: Clock,
  },
  inProgress: {
    badge:
      "bg-brand-muted text-brand border-brand-border dark:bg-brand-muted dark:text-brand",
    icon: ChefHat,
  },
  outForDelivery: {
    badge:
      "bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-950 dark:text-violet-200 dark:border-violet-800",
    icon: Truck,
  },
  delivered: {
    badge:
      "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800",
    icon: CheckCircle2,
  },
};

const OrderCard = ({ order, justPlaced }: Props) => {
  const navigate = useNavigate();
  const statusInfo = getOrderStatusInfo(order.status);
  const { badge, icon: StatusIcon } = statusStyles[order.status];
  const itemCount = countOrderItems(order);
  const isDelivered = order.status === "delivered";

  return (
    <article
      className="overflow-hidden rounded-2xl border border-brand-border bg-card shadow-sm transition hover:shadow-md"
      aria-labelledby={`order-${order._id}-title`}
    >
      <div className="border-b border-brand-border bg-gradient-to-r from-brand-muted to-card px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-3 sm:gap-4">
            <img
              src={order.restaurant.imageUrl}
              alt=""
              className="h-16 w-16 shrink-0 rounded-xl border border-brand-border object-cover sm:h-20 sm:w-20"
            />
            <div className="min-w-0">
              <h2
                id={`order-${order._id}-title`}
                className="truncate text-lg font-bold text-foreground sm:text-xl"
              >
                {order.restaurant.restaurantName}
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Placed {formatOrderDateTime(order.createdAt)}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground/90">
                {itemCount} {itemCount === 1 ? "item" : "items"}
                {!isDelivered && (
                  <>
                    <span className="mx-1.5 text-brand-border" aria-hidden>
                      ·
                    </span>
                    <span className="text-brand">
                      Est. delivery {getExpectedDeliveryTime(order)}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
          <Badge
            className={`w-fit shrink-0 border px-3 py-1.5 text-sm font-semibold ${badge}`}
          >
            <StatusIcon className="mr-1.5 h-4 w-4" aria-hidden />
            {statusInfo.label}
          </Badge>
        </div>
      </div>

      <div className="border-b border-border px-4 py-4 sm:px-6">
        <OrderStatusTracker order={order} justPlaced={justPlaced} />
      </div>

      <div className="px-4 py-4 sm:px-6">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Your order
        </h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[280px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2.5 sm:px-4" scope="col">
                  Item
                </th>
                <th
                  className="hidden px-3 py-2.5 text-center sm:table-cell sm:px-4"
                  scope="col"
                >
                  Qty
                </th>
                <th className="px-3 py-2.5 text-right sm:px-4" scope="col">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((item) => (
                <tr
                  key={item.menuItemId}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-3 py-3 font-medium text-foreground sm:px-4">
                    {item.name}
                    <span className="mt-0.5 block text-xs font-normal text-muted-foreground sm:hidden">
                      Qty: {item.quantity}
                    </span>
                  </td>
                  <td className="hidden px-3 py-3 text-center text-foreground/90 sm:table-cell sm:px-4">
                    {item.quantity}
                  </td>
                  <td className="px-3 py-3 text-right font-semibold text-foreground sm:px-4">
                    {formatLineTotal(order, item)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-brand-muted/80">
                <td
                  colSpan={2}
                  className="hidden px-4 py-3 text-right font-bold text-foreground sm:table-cell"
                >
                  Total
                </td>
                <td
                  colSpan={2}
                  className="px-3 py-3 sm:col-span-1 sm:px-4 sm:text-right"
                >
                  <span className="font-bold text-foreground sm:hidden">
                    Total{" "}
                  </span>
                  <span className="text-lg font-extrabold text-brand">
                    {getOrderTotalLabel(order)}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg bg-muted px-3 py-3 text-sm text-foreground/90">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
          <div>
            <span className="font-semibold text-foreground">
              {order.deliveryDetails.name}
            </span>
            <p className="mt-0.5 leading-relaxed">
              {order.deliveryDetails.addressLine1},{" "}
              {order.deliveryDetails.city}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Button variant="outline" className="w-full font-semibold sm:w-auto" asChild>
          <Link to={`/detail/${order.restaurant._id}`}>View restaurant</Link>
        </Button>
        <Button
          className="w-full font-bold sm:w-auto"
          onClick={() =>
            navigate(`/detail/${order.restaurant._id}`, {
              state: { reorderItems: order.cartItems },
            })
          }
        >
          <RotateCcw className="mr-2 h-4 w-4" aria-hidden />
          Order again
        </Button>
      </div>
    </article>
  );
};

export default OrderCard;
