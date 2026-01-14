import { useGetRestaurant } from "@/api/allRestaurants";
import { useCreateCheckoutSession } from "@/api/orderRouter";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItemComponent from "@/components/MenuItemComponent";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import type { MenuItem, OrderCartItem } from "@/types";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Loader2,
  PackageSearch,
  Heart,
  UtensilsCrossed,
  MessageSquare,
} from "lucide-react";
import { useGetMyUser, useUpdateFavorites } from "@/api/authRouter";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";
import { useGetUserReview } from "@/api/reviewApi";
import { useAuth0 } from "@auth0/auth0-react";

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
  const location = useLocation();

  const { currentUser } = useGetMyUser();
  const { updateFavorites } = useUpdateFavorites();
  const { isAuthenticated } = useAuth0();
  const { review: userReview } = useGetUserReview(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const isFavorite = currentUser?.favorites?.includes(restaurantId || "");

  const toggleFavorite = async () => {
    if (!currentUser || !restaurantId) return;

    const newFavorites = isFavorite
      ? (currentUser.favorites || []).filter((id) => id !== restaurantId)
      : [...(currentUser.favorites || []), restaurantId];

    try {
      await updateFavorites(newFavorites);
      toast.success(
        isFavorite ? "Removed from favorites" : "Added to favorites"
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to update favorites");
    }
  };

  useEffect(() => {
    if (restaurant && location.state?.reorderItems && cartItems.length === 0) {
      const reorderItems = location.state.reorderItems;
      const newCartItems: CartItem[] = [];

      reorderItems.forEach((item: OrderCartItem) => {
        const menuItem = restaurant.menuItems.find(
          (m) => m._id === item.menuItemId
        );
        if (menuItem) {
          newCartItems.push({
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: parseInt(item.quantity),
          });
        }
      });

      if (newCartItems.length > 0) {
        setCartItems(newCartItems);
        sessionStorage.setItem(
          `cartItems-${restaurantId}`,
          JSON.stringify(newCartItems)
        );
        toast.info("Previous order items added to cart with current prices");
      }
    }
  }, [restaurant, location.state, restaurantId, cartItems.length]);

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
        phoneNumber: userFormData.phoneNumber,
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
          We couldn't find the restaurant you're looking for.
          <br />
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
      <div className="relative">
        <AspectRatio ratio={16 / 5}>
          <img
            src={restaurant.imageUrl}
            className="w-full h-full object-cover rounded-md"
            alt={restaurant.restaurantName + " image"}
          />
        </AspectRatio>
        <Button
          onClick={toggleFavorite}
          variant="secondary"
          className="absolute top-4 right-4 rounded-full p-2 bg-white/90 hover:bg-white shadow-md z-10"
        >
          <Heart
            className={`h-6 w-6 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
        </Button>
      </div>

      <div className="grid md:grid-cols-[4fr_2fr] gap-4 sm:gap-5 md:px-32">
        <div className="flex flex-col gap-3 sm:gap-4">
          <RestaurantInfo restaurant={restaurant} />

          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="menu" className="flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4" />
                Menu
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Reviews
                {restaurant.totalReviews && (
                  <span className="text-xs">({restaurant.totalReviews})</span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="menu" className="mt-4">
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
            </TabsContent>

            <TabsContent value="reviews" className="mt-4 space-y-6">
              {isAuthenticated && (
                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-bold mb-4">
                    {userReview ? "Update Your Review" : "Write a Review"}
                  </h3>
                  <ReviewForm
                    restaurantId={restaurant._id}
                    existingReview={userReview}
                  />
                </Card>
              )}
              {!isAuthenticated && (
                <Card className="p-4 sm:p-6 bg-orange-50 border-orange-200">
                  <p className="text-sm text-gray-600">
                    Please sign in to write a review.
                  </p>
                </Card>
              )}
              <div>
                <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>
                <ReviewsList restaurantId={restaurant._id} />
              </div>
            </TabsContent>
          </Tabs>
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
