import type { Order, OrderCartItem } from "@/types";
import { formatOrderMoney } from "@/lib/orderTotals";

export const formatOrderDateTime = (dateString: string) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(dateString));

export const getExpectedDeliveryTime = (order: Order) => {
  const eta = new Date(order.createdAt);
  eta.setMinutes(
    eta.getMinutes() + order.restaurant.estimatedDeliveryTime,
  );
  return new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
  }).format(eta);
};

export const getCartLineTotal = (
  order: Order,
  item: OrderCartItem,
): number | null => {
  const menuItem = order.restaurant.menuItems?.find(
    (m) => m._id === item.menuItemId,
  );
  if (!menuItem) {
    return null;
  }
  const qty = parseInt(item.quantity, 10);
  if (Number.isNaN(qty)) {
    return null;
  }
  return menuItem.price * qty;
};

export const formatLineTotal = (order: Order, item: OrderCartItem) => {
  const total = getCartLineTotal(order, item);
  return total != null ? formatOrderMoney(total) : "—";
};

export const countOrderItems = (order: Order) =>
  order.cartItems.reduce(
    (sum, item) => sum + (parseInt(item.quantity, 10) || 0),
    0,
  );
