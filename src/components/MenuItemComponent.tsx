import type { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ShoppingCart } from "lucide-react";

type Props = {
  menuItem: MenuItem;
  addToCart: () => void;
};

const MenuItemComponent = ({ menuItem, addToCart }: Props) => {
  return (
    <Card
      className="group relative flex cursor-pointer flex-row items-center gap-3 border border-brand-border bg-card p-2 shadow-sm transition hover:border-brand hover:bg-brand-muted/50 hover:shadow-md sm:gap-4 sm:p-3"
      onClick={addToCart}
      tabIndex={0}
      role="button"
      aria-label={`Add ${menuItem.name} to cart`}
      onKeyDown={(e) => {
        if (e.key === "Enter") addToCart();
      }}
    >
      {menuItem.imageUrl && (
        <img
          src={menuItem.imageUrl}
          alt={menuItem.name}
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
        />
      )}
      <div className="flex-1">
        <CardHeader className="p-0 mb-0.5 sm:mb-1">
          <CardTitle className="text-base font-semibold text-foreground transition-colors group-hover:text-brand sm:text-lg">
            {menuItem.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-0.5 p-0 text-base font-bold text-brand sm:mt-1 sm:text-lg">
          GHC{(menuItem.price / 100).toFixed(2)}
        </CardContent>
      </div>
      <button
        className="ml-2 rounded-full bg-brand p-1.5 text-brand-foreground shadow transition hover:bg-brand/90 group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand sm:ml-3 sm:p-2"
        aria-label="Add to cart"
        tabIndex={-1}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          addToCart();
        }}
      >
        <ShoppingCart size={18} className="sm:w-[22px] sm:h-[22px]" />
      </button>
      <span className="absolute right-2 top-1.5 sm:top-2 text-[11px] sm:text-xs text-orange-400 opacity-0 group-hover:opacity-100 transition">
        Add to cart
      </span>
    </Card>
  );
};

export default MenuItemComponent;
