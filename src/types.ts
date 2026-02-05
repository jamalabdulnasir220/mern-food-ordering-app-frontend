export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  country: string;
  city: string;
  phoneNumber?: string;
  role: "customer" | "restaurant_manager" | "admin";
  applicationStatus?: "pending" | "approved" | "rejected";
  favorites?: string[];
  notificationPreferences?: {
    email?: boolean;
    sms?: boolean;
  };
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
  averageRating?: number;
  totalReviews?: number;
  openingTime?: string; 
  closingTime?: string; 
  daysOpen?: string[]; 
  isTemporarilyClosed?: boolean;
};

export type Review = {
  _id: string;
  restaurant: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
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
};

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
    phoneNumber?: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};
