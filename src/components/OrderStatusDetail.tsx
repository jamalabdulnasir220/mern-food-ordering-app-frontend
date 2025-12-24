import type { Order } from "@/types";
import { Separator } from "./ui/separator";
import { User, MapPin, ShoppingBag, DollarSign, CheckCircle } from "lucide-react";

type Props = {
  order: Order;
};

const formatMoney = (value: number) => `GHC${(value / 100).toFixed(2)}`;

const OrderStatusDetail = ({ order }: Props) => {
  return (
    <div className="space-y-7">
      <div className="bg-white rounded-lg shadow-sm p-4 flex gap-3 items-start">
        <MapPin className="text-orange-400 mt-[2px]" size={24} />
        <div>
          <span className="font-bold text-sm text-gray-700">Delivering to</span>
          <div className="mt-1 text-gray-900 font-medium text-lg flex items-center gap-1">
            <User className="inline-block text-gray-400" size={17} />{order.deliveryDetails.name}
          </div>
          <div className="text-gray-600 text-base">
            {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
          </div>
        </div>
      </div>
      <div className="bg-orange-50 rounded-lg shadow px-4 py-4">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingBag className="text-orange-400" size={21} />
          <span className="font-bold text-gray-700 tracking-tight text-lg">Your Order</span>
        </div>
        <ul className="pl-3 flex flex-col gap-2">
          {order.cartItems.map((item) => (
            <li key={item.menuItemId} className="flex justify-between items-center py-1">
              <span className="font-semibold text-gray-800">{item.name}</span>
              <span className="flex items-center gap-2">
                <span className="bg-orange-100 rounded-md px-2 py-0.5 text-orange-600 font-bold text-sm">
                  x{item.quantity}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="bg-white py-4 px-4 rounded-lg flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <DollarSign className="text-green-400" size={19} />
          <span className="font-bold text-gray-800 text-lg">Total</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-orange-700">{formatMoney(order.totalAmount)}</span>
          <CheckCircle className="text-emerald-500" size={22} />
        </div>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
