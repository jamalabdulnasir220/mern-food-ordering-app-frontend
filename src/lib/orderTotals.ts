import type { Order } from "@/types";

export const formatOrderMoney = (value: number) =>
  `GHC${(value / 100).toFixed(2)}`;

export const getOrderTotalAmount = (order: Order): number | null => {
  if (order.totalAmount != null && !Number.isNaN(order.totalAmount)) {
    return order.totalAmount;
  }

  const menuItems = order.restaurant?.menuItems;
  if (!menuItems?.length) {
    return null;
  }

  const subtotal = order.cartItems.reduce((acc, item) => {
    const menuItem = menuItems.find((m) => m._id === item.menuItemId);
    if (!menuItem) {
      return acc;
    }
    return acc + menuItem.price * parseInt(item.quantity, 10);
  }, 0);

  const deliveryPrice = order.restaurant.deliveryPrice ?? 0;
  const total = subtotal + deliveryPrice;

  return Number.isNaN(total) ? null : total;
};

export const getOrderTotalLabel = (order: Order): string => {
  const total = getOrderTotalAmount(order);
  if (total != null) {
    return formatOrderMoney(total);
  }

  if (order.status === "placed") {
    return "Pending payment";
  }

  return "—";
};
