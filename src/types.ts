export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  country: string;
  city: string;
  role: "customer" | "restaurant_manager" | "admin";
  applicationStatus?: "pending" | "approved" | "rejected";
  favorites?: string[];
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

export type Restaurant = {
  _id: string;
  user: string | { _id: string; name: string; email: string }; // Can be populated
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
  approvalStatus?: "pending" | "approved" | "rejected";
};

export interface RestaurantSearchResponse {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type OrderCartItem = {
  menuItemId: string;
  name: string;
  quantity: string;
}

export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};
