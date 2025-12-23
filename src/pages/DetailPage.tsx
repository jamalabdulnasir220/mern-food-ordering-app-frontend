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
      // Check if item is already in the cart
      const existingCartItem = prevState.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;
      // if item is already in the cart, update the quantity
      if (existingCartItem) {
        updatedCartItems = prevState.map((item) => {
          return item._id === menuItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      } else {
        // if not add it as a new cart item.
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

    console.log("User form Data", userFormData);
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

  if (isLoading || !restaurant) {
    return <h1>Loading......</h1>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="w-full h-full object-cover rounded-md"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItemComponent
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        {/* Checkout div */}
        <div>
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
