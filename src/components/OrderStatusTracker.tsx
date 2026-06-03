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
    <div className="w-full space-y-3">
      <div
        className={cn(
          "flex items-start gap-3 rounded-lg border px-3 py-3 sm:px-4",
          isDelivered
            ? "border-green-200 bg-success-muted dark:border-green-800"
            : "border-brand-border bg-brand-muted/50",
        )}
      >
        {!isDelivered && (
          <span className="relative mt-1.5 flex h-3 w-3 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-brand" />
          </span>
        )}
        {isDelivered && (
          <CheckCircle2
            className="mt-0.5 shrink-0 text-success"
            size={20}
            aria-hidden
          />
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground sm:text-base">
            {isDelivered ? "Order complete" : "What's happening now"}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {statusMessage}
          </p>
          {!isDelivered && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-brand">
              <Radio className="h-3.5 w-3.5" aria-hidden />
              Live updates — no need to refresh
            </p>
          )}
        </div>
      </div>

      <div className="hidden sm:block">
        <ol className="flex w-full items-center">
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
                <div className="flex min-w-[4.5rem] flex-col items-center gap-2">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                      isComplete && "border-brand bg-brand text-brand-foreground",
                      isCurrent &&
                        "border-brand bg-brand-muted text-brand ring-4 ring-brand/20",
                      !isComplete &&
                        !isCurrent &&
                        "border-border bg-muted text-muted-foreground",
                    )}
                  >
                    {isComplete ? (
                      <Check className="h-5 w-5" strokeWidth={3} />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-center text-xs font-semibold leading-tight",
                      isCurrent ? "text-brand" : "text-muted-foreground",
                    )}
                  >
                    {step.shortLabel}
                  </span>
                </div>
                {index < ORDER_STATUS.length - 1 && (
                  <div
                    className={cn(
                      "mx-1 mb-6 h-0.5 flex-1 rounded-full transition-colors",
                      index < currentIndex ? "bg-brand" : "bg-border",
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="space-y-2 sm:hidden">
        {ORDER_STATUS.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = statusIcons[step.value];

          return (
            <div
              key={step.value}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2",
                isCurrent
                  ? "border-brand-border bg-brand-muted"
                  : "border-transparent bg-muted/80",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                  isComplete && "border-brand bg-brand text-brand-foreground",
                  isCurrent && "border-brand bg-brand-muted text-brand",
                  !isComplete &&
                    !isCurrent &&
                    "border-border bg-card text-muted-foreground",
                )}
              >
                {isComplete ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  isCurrent ? "text-brand" : "text-muted-foreground",
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
