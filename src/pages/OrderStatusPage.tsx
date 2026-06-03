import { useGetMyOrders } from "@/api/orderRouter";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import OrderStatusTracker from "@/components/OrderStatusTracker";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { PartyPopper, Loader2, PackageSearch } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const OrderStatusPage = () => {
  const { orders, isPending } = useGetMyOrders();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSuccessBanner, setShowSuccessBanner] = useState(
    () => searchParams.get("success") === "true",
  );

  useEffect(() => {
    if (searchParams.get("success") !== "true") {
      return;
    }

    setShowSuccessBanner(true);
    toast.success("Order placed successfully!", {
      description: "We're confirming your payment and will update the status here.",
    });

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("success");
    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams]);

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

  const latestOrderId = orders[0]?._id;

  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 md:px-0 pb-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Your Orders
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Track the status of your recent orders
        </p>
      </div>

      {showSuccessBanner && (
        <div className="rounded-xl border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-4 sm:px-6 sm:py-5 flex gap-3 sm:gap-4 items-start shadow-sm">
          <div className="bg-green-500 rounded-full p-2 shrink-0">
            <PartyPopper className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-green-900">
              Order placed successfully!
            </h2>
            <p className="text-green-800 text-sm sm:text-base mt-1">
              Sit tight — we&apos;re confirming your payment and your order status
              will update on this page automatically.
            </p>
          </div>
        </div>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <div className="bg-linear-to-r from-orange-50 to-orange-100/50 px-4 sm:px-6 py-4 border-b border-orange-100">
            <div className="flex justify-between items-start sm:items-center sm:flex-row flex-col gap-4 mb-4">
              <OrderStatusHeader order={order} />
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold sm:w-auto w-full shrink-0"
                onClick={() => {
                  navigate(`/detail/${order.restaurant._id}`, {
                    state: { reorderItems: order.cartItems },
                  });
                }}
              >
                Order Again
              </Button>
            </div>
            <OrderStatusTracker
              order={order}
              justPlaced={showSuccessBanner && order._id === latestOrderId}
            />
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <OrderStatusDetail order={order} />
              <div className="relative rounded-lg overflow-hidden shadow-md border border-gray-200 h-full w-full flex">
                <AspectRatio ratio={16 / 5} className="w-full h-full">
                  <img
                    src={order.restaurant.imageUrl}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt={order.restaurant.restaurantName + " image"}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent px-3 py-2 sm:px-4 sm:py-2.5 flex items-end">
                    <p className="text-white font-bold text-sm sm:text-base m-0 leading-tight">
                      {order.restaurant.restaurantName}
                    </p>
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
