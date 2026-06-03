import { ORDER_STATUS, getActiveStatusMessage } from "@/config/order-status-config";
import type { Order, OrderStatus } from "@/types";
import { cn } from "@/lib/utils";
import {
  Check,
  CheckCircle2,
  ChefHat,
  Clock,
  Package,
  Radio,
  Truck,
} from "lucide-react";

type Props = {
  order: Order;
  justPlaced?: boolean;
};

const statusIcons: Record<OrderStatus, typeof Package> = {
  placed: Package,
  paid: Clock,
  inProgress: ChefHat,
  outForDelivery: Truck,
  delivered: CheckCircle2,
};

const OrderStatusTracker = ({ order, justPlaced }: Props) => {
  const currentIndex = ORDER_STATUS.findIndex((s) => s.value === order.status);
  const statusMessage = getActiveStatusMessage(order.status, justPlaced);
  const isDelivered = order.status === "delivered";

  return (
    <div className="w-full space-y-4">
      <div
        className={cn(
          "rounded-xl border px-4 py-3 sm:px-5 sm:py-4 flex gap-3 items-start",
          isDelivered
            ? "bg-green-50 border-green-200"
            : "bg-white/80 border-orange-200 shadow-sm",
        )}
      >
        {!isDelivered && (
          <span className="relative flex h-3 w-3 mt-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
          </span>
        )}
        {isDelivered && (
          <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" size={20} />
        )}
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 text-sm sm:text-base">
            {isDelivered ? "Order complete" : "What's happening now"}
          </p>
          <p className="text-gray-600 text-sm sm:text-base mt-1 leading-relaxed">
            {statusMessage}
          </p>
          {!isDelivered && (
            <p className="text-xs text-orange-600 font-medium mt-2 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              Live updates — no need to refresh
            </p>
          )}
        </div>
      </div>

      <div className="hidden sm:block">
        <ol className="flex items-center w-full">
          {ORDER_STATUS.map((step, index) => {
            const isComplete = index < currentIndex;
            const isCurrent = index === currentIndex;
            const Icon = statusIcons[step.value];

            return (
              <li
                key={step.value}
                className={cn(
                  "flex items-center",
                  index < ORDER_STATUS.length - 1 ? "flex-1" : "",
                )}
              >
                <div className="flex flex-col items-center gap-2 min-w-[4.5rem]">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                      isComplete &&
                        "bg-orange-500 border-orange-500 text-white",
                      isCurrent &&
                        "bg-orange-100 border-orange-500 text-orange-700 ring-4 ring-orange-100",
                      !isComplete &&
                        !isCurrent &&
                        "bg-gray-50 border-gray-200 text-gray-400",
                    )}
                  >
                    {isComplete ? (
                      <Check className="w-5 h-5" strokeWidth={3} />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-semibold text-center leading-tight",
                      isCurrent ? "text-orange-700" : "text-gray-500",
                    )}
                  >
                    {step.shortLabel}
                  </span>
                </div>
                {index < ORDER_STATUS.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mx-1 mb-6 rounded-full transition-colors",
                      index < currentIndex ? "bg-orange-500" : "bg-gray-200",
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="sm:hidden space-y-2">
        {ORDER_STATUS.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = statusIcons[step.value];

          return (
            <div
              key={step.value}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 border",
                isCurrent
                  ? "border-orange-300 bg-orange-50"
                  : "border-transparent bg-gray-50/80",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                  isComplete && "bg-orange-500 border-orange-500 text-white",
                  isCurrent &&
                    "bg-orange-100 border-orange-500 text-orange-700",
                  !isComplete &&
                    !isCurrent &&
                    "bg-white border-gray-200 text-gray-400",
                )}
              >
                {isComplete ? (
                  <Check className="w-4 h-4" strokeWidth={3} />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  isCurrent ? "text-orange-800" : "text-gray-600",
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusTracker;
