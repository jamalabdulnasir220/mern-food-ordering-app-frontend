import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetMyUser } from "@/api/authRouter";
import { User, UtensilsCrossed, ClipboardList, LogOut, Heart } from "lucide-react";

const navLinkClass =
  "flex gap-3 items-center w-full py-3 px-5 rounded-xl text-base sm:text-lg font-semibold bg-white border border-orange-100 shadow-sm transition-all hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 group";

const iconClass =
  "text-orange-400 group-hover:text-orange-500 transition-colors w-6 h-6";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  const { currentUser } = useGetMyUser();

  return (
    <nav className="w-full flex flex-col gap-3 mt-6">
      {currentUser?.role === "customer" && (
        <Link to="/order-status" className={navLinkClass}>
          <ClipboardList className={iconClass} />
          <span>Order Status</span>
        </Link>
      )}
      {currentUser?.role === "customer" && (
        <Link to="/favorites" className={navLinkClass}>
          <Heart className={iconClass} />
          <span>My Favorites</span>
        </Link>
      )}
      {currentUser?.role === "restaurant_manager" && (
        <Link to="/manage-restaurant" className={navLinkClass}>
          <UtensilsCrossed className={iconClass} />
          <span>Manage Restaurant</span>
        </Link>
      )}
      <Link to="/user-profile" className={navLinkClass}>
        <User className={iconClass} />
        <span>User Profile</span>
      </Link>
      <Button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        className="flex gap-3 items-center w-full py-3 px-5 rounded-xl text-base sm:text-lg font-semibold bg-orange-500 text-white mt-4 shadow-md hover:bg-orange-600 hover:shadow-lg active:scale-95 transition-all justify-center"
      >
        <LogOut className="w-6 h-6 text-white opacity-80" />
        <span>Log Out</span>
      </Button>
    </nav>
  );
};

export default MobileNavLinks;
