import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  type UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/authRouter";
import { Loader2, UserCircle } from "lucide-react";

type Props = {
  onCheckoutSave: (userProfileData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean
};

const CheckoutButton = ({
  onCheckoutSave,
  disabled,
  isLoading: isCheckoutLoading,
}: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();
  const { pathname } = useLocation();

  const { currentUser, isPending: isUserLoading } = useGetMyUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  // Show a nice loading button when anything is loading
  if (isAuthLoading || isUserLoading || isCheckoutLoading) {
    return (
      <Button
        disabled
        className="flex-1 flex items-center justify-center gap-2 bg-orange-400 cursor-not-allowed"
      >
        <Loader2 className="animate-spin w-5 h-5" />
        Preparing checkout...
      </Button>
    );
  }

  // If not authenticated
  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-500 flex-1 font-semibold">
        Login to checkout
      </Button>
    );
  }

  // If authenticated but no user profile found after loading
  if (!currentUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2 p-2 bg-orange-50 rounded">
        <UserCircle className="text-orange-400 w-8 h-8 mb-1" />
        <div className="text-red-500 font-medium text-base text-center">
          Could not load your profile.<br />
          Please try refreshing the page or logging out and in again.
        </div>
        <Button onClick={onLogin} className="mt-1 bg-orange-500">
          Re-login
        </Button>
      </div>
    );
  }

  // Ready for checkout
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="flex-1 bg-orange-500 font-semibold">
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          isLoading={isUserLoading}
          onsave={onCheckoutSave}
          title="Confirm Delivery Details"
          buttonText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
