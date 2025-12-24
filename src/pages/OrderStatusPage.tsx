import { useGetMyOrders } from "@/api/orderRouter";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Loader2, PackageSearch } from "lucide-react";

const OrderStatusPage = () => {
  const { orders, isPending } = useGetMyOrders();

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] px-2 sm:px-4">
        <Loader2 className="animate-spin h-10 w-10 sm:h-12 sm:w-12 text-orange-500 mb-3 sm:mb-4" />
        <div className="text-base sm:text-lg font-semibold text-gray-600">
          Loading your orders...
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gray-50 rounded-lg p-4 sm:p-10">
        <PackageSearch className="h-11 w-11 sm:h-14 sm:w-14 text-orange-400 mb-3 sm:mb-4" />
        <div className="text-lg sm:text-2xl font-bold text-gray-700 mb-1 sm:mb-2">
          No orders found
        </div>
        <div className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4 text-center">
          You haven&apos;t placed any orders yet.
          <br />
          Start exploring restaurants and place your first order!
        </div>
        <a
          href="/"
          className="inline-block px-4 sm:px-6 py-2 bg-orange-500 hover:bg-orange-600 transition font-bold rounded text-white text-sm sm:text-base"
        >
          Browse Restaurants
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-10 px-2 sm:px-4 md:px-0">
      {orders.map((order) => (
        <div key={order._id} className="space-y-6 sm:space-y-10 bg-gray-50 p-4 sm:p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-6 sm:gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className="w-full h-full object-cover rounded-md"
                alt={order.restaurant.restaurantName + " image"}
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
