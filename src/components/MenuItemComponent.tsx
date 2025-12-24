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
      className="relative group flex flex-row items-center gap-4 p-3 transition border-orange-100/70 border hover:border-orange-300 shadow-sm hover:shadow-lg bg-white hover:bg-orange-50 cursor-pointer"
      onClick={addToCart}
      tabIndex={0}
      role="button"
      aria-label={`Add ${menuItem.name} to cart`}
      onKeyDown={(e) => {
        if (e.key === "Enter") addToCart();
      }}
    >
      <div className="flex-1">
        <CardHeader className="p-0 mb-1">
          <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-orange-700 transition-colors">
            {menuItem.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-[18px] mt-1 text-orange-700 font-bold">
          GHC{(menuItem.price / 100).toFixed(2)}
        </CardContent>
      </div>
      <button
        className="ml-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition shadow group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-300"
        aria-label="Add to cart"
        tabIndex={-1}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          addToCart();
        }}
      >
        <ShoppingCart size={22} />
      </button>
      <span className="absolute right-2 top-2 text-xs text-orange-400 opacity-0 group-hover:opacity-100 transition">
        Add to cart
      </span>
    </Card>
  );
};

export default MenuItemComponent;
