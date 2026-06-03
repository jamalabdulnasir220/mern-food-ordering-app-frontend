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
  // Note: isUserLoading (isPending) might be true if query is disabled (when not authenticated),
  // so we only check it if we are authenticated.
  const isActuallyLoading = isAuthLoading || isCheckoutLoading || (isAuthenticated && isUserLoading);

  if (isActuallyLoading) {
    return (
      <Button
        disabled
        className="flex w-full items-center justify-center gap-2 py-6 text-sm sm:text-base"
      >
        <Loader2 className="animate-spin w-5 h-5" />
        <span className="text-xs sm:text-base">Preparing checkout...</span>
      </Button>
    );
  }

  // If not authenticated
  if (!isAuthenticated) {
    return (
      <Button
        onClick={onLogin}
        className="w-full py-6 text-sm font-semibold sm:text-base"
      >
        <span className="text-xs sm:text-base">Sign up or Log in to checkout</span>
      </Button>
    );
  }

  // If authenticated but no user profile found after loading
  if (!currentUser) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-brand-muted p-3 sm:p-4">
        <UserCircle className="mb-1 h-8 w-8 text-brand" />
        <div className="text-center text-sm font-medium text-destructive sm:text-base">
          Could not load your profile.<br />
          <span className="text-xs sm:text-sm">
            Please try refreshing the page or logging out and in again.
          </span>
        </div>
        <Button
          onClick={onLogin}
          className="mt-1 px-3 py-1.5 text-xs sm:text-base"
        >
          Re-login
        </Button>
      </div>
    );
  }

  // Ready for checkout
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className="w-full py-6 text-sm font-bold shadow-md sm:text-base"
        >
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] bg-background px-2 py-3 sm:max-w-[425px] sm:px-6 sm:py-6 md:min-w-[700px]">
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
