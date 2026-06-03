import { useGetMyOrders } from "@/api/orderRouter";
import OrderCard from "@/components/orders/OrderCard";
import PageLoader from "@/components/ui/page-loader";
import { Button } from "@/components/ui/button";
import type { Order } from "@/types";
import { PartyPopper, PackageSearch } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type OrderTab = "active" | "past";

const isActiveOrder = (order: Order) => order.status !== "delivered";

const OrderStatusPage = () => {
  const { orders, isPending } = useGetMyOrders();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState<OrderTab>("active");
  const [showSuccessBanner, setShowSuccessBanner] = useState(
    () => searchParams.get("success") === "true",
  );

  useEffect(() => {
    if (searchParams.get("success") !== "true") {
      return;
    }

    setShowSuccessBanner(true);
    toast.success("Order placed successfully!", {
      description:
        "We're confirming your payment and will update the status here.",
    });

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("success");
    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const { activeOrders, pastOrders } = useMemo(() => {
    if (!orders) {
      return { activeOrders: [], pastOrders: [] };
    }
    return {
      activeOrders: orders.filter(isActiveOrder),
      pastOrders: orders.filter((o) => !isActiveOrder(o)),
    };
  }, [orders]);

  const displayedOrders = tab === "active" ? activeOrders : pastOrders;
  const latestOrderId = orders?.[0]?._id;

  useEffect(() => {
    if (!orders?.length) {
      return;
    }
    if (activeOrders.length === 0 && pastOrders.length > 0) {
      setTab("past");
    }
  }, [orders, activeOrders.length, pastOrders.length]);

  if (isPending) {
    return <PageLoader label="Loading your orders..." />;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center rounded-2xl border border-dashed border-brand-border bg-card p-8 text-center sm:p-12">
        <PackageSearch className="mb-4 h-14 w-14 text-brand" aria-hidden />
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          No orders yet
        </h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          When you place an order, it will show up here with live status updates.
        </p>
        <Button asChild className="mt-6 font-bold">
          <Link to="/">Browse restaurants</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Your orders
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          {orders.length} order{orders.length === 1 ? "" : "s"} total
          {activeOrders.length > 0 && (
            <> · {activeOrders.length} in progress</>
          )}
        </p>
      </header>

      {showSuccessBanner && (
        <div
          className="flex gap-3 rounded-xl border border-green-200 bg-success-muted px-4 py-4 dark:border-green-800 sm:gap-4 sm:px-5"
          role="status"
        >
          <div className="shrink-0 rounded-full bg-success p-2 text-white">
            <PartyPopper className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <h2 className="font-bold text-foreground">Order placed!</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Payment is being confirmed. Status updates appear below
              automatically.
            </p>
          </div>
        </div>
      )}

      <div
        className="flex gap-1 rounded-xl border border-brand-border bg-brand-muted/50 p-1"
        role="tablist"
        aria-label="Filter orders"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "active"}
          onClick={() => setTab("active")}
          className={cn(
            "flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition sm:px-4",
            tab === "active"
              ? "bg-card text-brand shadow-sm"
              : "text-muted-foreground hover:text-brand",
          )}
        >
          Active ({activeOrders.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "past"}
          onClick={() => setTab("past")}
          className={cn(
            "flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition sm:px-4",
            tab === "past"
              ? "bg-card text-brand shadow-sm"
              : "text-muted-foreground hover:text-brand",
          )}
        >
          Past ({pastOrders.length})
        </button>
      </div>

      {displayedOrders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-10 text-center">
          <p className="font-medium text-foreground">
            {tab === "active"
              ? "No active orders right now"
              : "No past orders yet"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {tab === "active"
              ? "Delivered orders appear under Past."
              : "Completed deliveries will show up here."}
          </p>
          {tab === "active" && pastOrders.length > 0 && (
            <Button
              variant="link"
              className="mt-2 text-brand"
              onClick={() => setTab("past")}
            >
              View past orders
            </Button>
          )}
        </div>
      ) : (
        <ul className="space-y-6">
          {displayedOrders.map((order) => (
            <li key={order._id}>
              <OrderCard
                order={order}
                justPlaced={
                  showSuccessBanner && order._id === latestOrderId
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderStatusPage;
