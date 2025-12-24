import { useGetMyOrders } from "@/api/orderRouter";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Loader2, PackageSearch } from "lucide-react";

const OrderStatusPage = () => {
  const { orders, isPending } = useGetMyOrders();

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <Loader2 className="animate-spin h-12 w-12 text-orange-500 mb-4" />
        <div className="text-lg font-semibold text-gray-600">
          Loading your orders...
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gray-50 rounded-lg p-10">
        <PackageSearch className="h-14 w-14 text-orange-400 mb-4" />
        <div className="text-2xl font-bold text-gray-700 mb-2">
          No orders found
        </div>
        <div className="text-gray-500 text-base mb-4">
          You haven&apos;t placed any orders yet.
          <br />
          Start exploring restaurants and place your first order!
        </div>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-orange-500 hover:bg-orange-600 transition font-bold rounded text-white"
        >
          Browse Restaurants
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div key={order._id} className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
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
