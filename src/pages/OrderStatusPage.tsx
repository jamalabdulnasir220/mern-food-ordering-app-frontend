import { useGetMyOrders } from "@/api/orderRouter";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";

const OrderStatusPage = () => {
  const { orders, isPending } = useGetMyOrders();

  if (isPending) {
    return "Loading....";
  }

  if (!orders || orders.length === 0) {
    return "No orders found..";
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div key={order._id} className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2"> 
            <OrderStatusDetail order={order} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
