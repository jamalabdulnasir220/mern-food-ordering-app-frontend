import type { OrderStatus } from "@/types";

export type OrderStatusInfo = {
  label: string;
  shortLabel: string;
  value: OrderStatus;
  progressValue: number;
  waitingMessage: string;
};

export const ORDER_STATUS: OrderStatusInfo[] = [
  {
    label: "Order placed",
    shortLabel: "Placed",
    value: "placed",
    progressValue: 0,
    waitingMessage:
      "We're confirming your payment. This usually takes just a few seconds.",
  },
  {
    label: "Awaiting restaurant confirmation",
    shortLabel: "Confirmed",
    value: "paid",
    progressValue: 25,
    waitingMessage:
      "Payment received. The restaurant has been notified and will start preparing your order soon.",
  },
  {
    label: "In progress",
    shortLabel: "Preparing",
    value: "inProgress",
    progressValue: 50,
    waitingMessage: "Your order is being prepared in the kitchen.",
  },
  {
    label: "Out for delivery",
    shortLabel: "On the way",
    value: "outForDelivery",
    progressValue: 75,
    waitingMessage: "Your order is on its way to you.",
  },
  {
    label: "Delivered",
    shortLabel: "Delivered",
    value: "delivered",
    progressValue: 100,
    waitingMessage: "Enjoy your meal! Your order has been delivered.",
  },
];

export const getOrderStatusInfo = (status: OrderStatus) =>
  ORDER_STATUS.find((o) => o.value === status) ?? ORDER_STATUS[0];

export const getActiveStatusMessage = (
  status: OrderStatus,
  justPlaced?: boolean,
): string => {
  if (status === "placed" && justPlaced) {
    return "Thank you for your order! We're confirming your payment and will update this page automatically.";
  }

  return getOrderStatusInfo(status).waitingMessage;
};
