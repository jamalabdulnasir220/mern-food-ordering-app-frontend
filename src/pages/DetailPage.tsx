import { useGetRestaurant } from "@/api/allRestaurants";
import { useCreateCheckoutSession } from "@/api/orderRouter";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItemComponent from "@/components/MenuItemComponent";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import type { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import type { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2, PackageSearch } from "lucide-react";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isPending } = useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevState) => {
      const existingCartItem = prevState.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prevState.map((item) => {
          return item._id === menuItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      } else {
        updatedCartItems = [
          ...prevState,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevState) => {
      const updatedState = prevState.filter(
        (item) => item._id !== cartItem._id
      );
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedState)
      );
      return updatedState;
    });
  };

  const onCheckoutSave = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }
    const checkoutData = {
      cartItems: cartItems.map((item) => ({
        menuItemId: item._id,
        name: item.name,
        quantity: item.quantity.toString(),
      })),

      restaurantId: restaurant._id,
      deliveryDetails: {
        email: userFormData.email as string,
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  // Show loading UI
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] px-2 sm:px-4">
        <Loader2 className="animate-spin h-10 w-10 sm:h-12 sm:w-12 text-orange-500 mb-3 sm:mb-4" />
        <div className="text-base sm:text-lg font-semibold text-gray-600">
          Loading restaurant details...
        </div>
      </div>
    );
  }

  // Show nice empty UI if there is no restaurant data
  if (!restaurant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gray-50 rounded-lg p-4 sm:p-10">
        <PackageSearch className="h-11 w-11 sm:h-14 sm:w-14 text-orange-400 mb-3 sm:mb-4" />
        <div className="text-lg sm:text-2xl font-bold text-gray-700 mb-1 sm:mb-2">
          Restaurant not found
        </div>
        <div className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4 text-center">
          We couldn't find the restaurant you're looking for.<br />
          Please try another restaurant or return to the main page.
        </div>
        <a
          href="/"
          className="inline-block px-4 sm:px-6 py-2 bg-orange-500 hover:bg-orange-600 transition font-bold rounded text-white text-sm sm:text-base"
        >
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7 sm:gap-10 px-2 sm:px-6 md:px-0">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="w-full h-full object-cover rounded-md"
          alt={restaurant.restaurantName + " image"}
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-4 sm:gap-5 md:px-32">
        <div className="flex flex-col gap-3 sm:gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-lg sm:text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.length === 0 ? (
            <div className="text-gray-500 text-base sm:text-lg mt-2">
              No menu items available for this restaurant.
            </div>
          ) : (
            restaurant.menuItems.map((menuItem) => (
              <MenuItemComponent
                key={menuItem._id}
                menuItem={menuItem}
                addToCart={() => addToCart(menuItem)}
              />
            ))
          )}
        </div>
        {/* Checkout div */}
        <div className="mt-6 md:mt-0">
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                onCheckoutSave={onCheckoutSave}
                disabled={cartItems.length === 0}
                isLoading={isPending}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
