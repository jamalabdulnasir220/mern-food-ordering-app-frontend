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
  ChefHat,
  Package,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { formatOrderMoney } from "@/lib/orderTotals";
import { formatOrderDateTime } from "@/lib/orderFormatters";

type Props = {
  order: Order;
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
      "bg-brand-muted text-brand border-brand-border",
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

const borderAccent: Record<OrderStatus, string> = {
  placed: "border-l-blue-500",
  paid: "border-l-amber-500",
  inProgress: "border-l-brand",
  outForDelivery: "border-l-violet-500",
  delivered: "border-l-emerald-500",
};

const OrderItemCard = ({ order }: Props) => {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const { updateRestaurantStatus, isPending } = useUpdateMyRestaurantOrder();

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestaurantStatus({ orderId: order._id, status: newStatus });
    setStatus(newStatus);
  };

  const statusInfo =
    ORDER_STATUS.find((o) => o.value === status) || ORDER_STATUS[0];
  const { badge, icon: StatusIcon } = statusStyles[status];

  return (
    <Card
      className={`overflow-hidden border-2 border-border shadow-sm transition hover:shadow-md ${borderAccent[status]} border-l-4`}
    >
      <div className="border-b border-brand-border bg-gradient-to-r from-brand-muted to-card px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Badge
              className={`border px-3 py-1.5 text-xs font-semibold sm:text-sm ${badge}`}
            >
              <StatusIcon className="mr-1.5 h-4 w-4" aria-hidden />
              {statusInfo.label}
            </Badge>
            <span className="text-sm font-medium text-foreground">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-brand" aria-hidden />
            <span className="text-sm font-medium">
              {formatOrderDateTime(order.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <CardHeader className="pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          <div className="flex items-start gap-3 rounded-lg bg-muted p-3 sm:p-4">
            <div className="shrink-0 rounded-lg bg-brand-muted p-2">
              <User className="text-brand" size={18} aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <span className="mb-1 block text-xs font-medium text-muted-foreground sm:text-sm">
                Customer
              </span>
              <span className="text-sm font-semibold text-foreground sm:text-base">
                {order.deliveryDetails.name}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-muted p-3 sm:p-4">
            <div className="shrink-0 rounded-lg bg-brand-muted p-2">
              <MapPin className="text-brand" size={18} aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <span className="mb-1 block text-xs font-medium text-muted-foreground sm:text-sm">
                Delivery address
              </span>
              <span className="break-words text-sm font-semibold text-foreground sm:text-base">
                {order.deliveryDetails.addressLine1},{" "}
                {order.deliveryDetails.city}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-5 pt-5 sm:space-y-6 sm:pt-6">
        <div className="rounded-lg border border-brand-border bg-brand-muted/50 p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-lg bg-brand p-2">
              <ShoppingBag className="text-brand-foreground" size={18} aria-hidden />
            </div>
            <span className="text-base font-bold text-foreground sm:text-lg">
              Order items
            </span>
          </div>
          <ul className="space-y-2">
            {order.cartItems.map((cartItem) => (
              <li
                key={cartItem.menuItemId}
                className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5 sm:px-4 sm:py-3"
              >
                <span className="flex-1 text-sm font-semibold text-foreground sm:text-base">
                  {cartItem.name}
                </span>
                <Badge className="ml-2 bg-brand text-brand-foreground">
                  ×{cartItem.quantity}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-success-muted px-4 py-4 dark:border-emerald-800 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-success p-2 text-white">
              <DollarSign size={20} aria-hidden />
            </div>
            <div>
              <span className="block text-xs font-medium text-muted-foreground sm:text-sm">
                Total amount
              </span>
              <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400 sm:text-2xl">
                {formatOrderMoney(order.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
          <Label
            htmlFor={`status-${order._id}`}
            className="mb-3 block text-sm font-semibold text-foreground sm:text-base"
          >
            Update order status
          </Label>
          <Select
            value={status}
            disabled={isPending}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger
              id={`status-${order._id}`}
              className="h-11 w-full text-sm sm:h-12 sm:text-base"
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
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              <span>Updating status...</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
