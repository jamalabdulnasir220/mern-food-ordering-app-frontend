import type { CartItem } from "@/pages/DetailPage";
import type { Restaurant } from "@/types";
import { formatOrderMoney } from "@/lib/orderTotals";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Clock, ShoppingBag, Trash2, Truck } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const total = subtotal + restaurant.deliveryPrice;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col">
      <div className="border-b border-brand-border/30 bg-brand px-4 py-4 text-brand-foreground sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-90">
              Order summary
            </p>
            <h2 className="mt-0.5 truncate text-lg font-bold leading-tight sm:text-xl">
              {restaurant.restaurantName}
            </h2>
            <p className="mt-2 flex items-center gap-1.5 text-sm opacity-95">
              <Clock className="h-4 w-4 shrink-0" aria-hidden />
              ~{restaurant.estimatedDeliveryTime} min delivery
            </p>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-foreground/15 backdrop-blur-sm">
            <ShoppingBag className="h-5 w-5" aria-hidden />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-card p-4 sm:p-5">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-brand-border bg-brand-muted px-4 py-8 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-muted">
              <ShoppingBag className="h-6 w-6 text-brand" aria-hidden />
            </div>
            <p className="font-semibold text-foreground">Your cart is empty</p>
            <p className="mt-1 max-w-[220px] text-sm text-muted-foreground">
              Pick items from the menu to see them here before checkout.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="group flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2.5 transition hover:border-brand-border hover:bg-brand-muted/50 sm:gap-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-sm font-bold text-brand-foreground">
                    {item.quantity}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatOrderMoney(item.price)} each
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-bold text-brand">
                    {formatOrderMoney(item.price * item.quantity)}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => removeFromCart(item)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="rounded-xl bg-muted px-3 py-3 sm:px-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold text-foreground">
              {formatOrderMoney(subtotal)}
            </span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Truck className="h-4 w-4 text-brand" aria-hidden />
              Delivery fee
            </span>
            <span className="font-semibold text-foreground">
              {formatOrderMoney(restaurant.deliveryPrice)}
            </span>
          </div>
          <Separator className="my-3" />
          <div className="flex items-center justify-between">
            <span className="font-bold text-foreground">Total</span>
            <span className="text-xl font-extrabold text-brand">
              {formatOrderMoney(total)}
            </span>
          </div>
          {cartItems.length === 0 && (
            <p className="mt-2 text-right text-[11px] text-muted-foreground">
              Add menu items to update your total.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
