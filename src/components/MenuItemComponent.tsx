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
      className="relative group flex flex-row items-center gap-3 sm:gap-4 p-2 sm:p-3 transition border-orange-100/70 border hover:border-orange-100 shadow-sm hover:shadow-lg bg-white hover:bg-orange-50 cursor-pointer"
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
          <CardTitle className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-orange-700 transition-colors">
            {menuItem.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-[16px] sm:text-[18px] mt-0.5 sm:mt-1 text-orange-700 font-bold">
          GHC{(menuItem.price / 100).toFixed(2)}
        </CardContent>
      </div>
      <button
        className="ml-2 sm:ml-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-1.5 sm:p-2 transition shadow group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-300"
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
