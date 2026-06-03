import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetMyUser } from "@/api/authRouter";
import {
  User,
  UtensilsCrossed,
  ClipboardList,
  LogOut,
  Heart,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinkClass =
  "flex w-full items-center gap-3 rounded-xl border border-brand-border bg-card px-4 py-3 text-base font-semibold text-foreground shadow-sm transition hover:border-brand hover:bg-brand-muted hover:text-brand sm:text-lg";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  const { currentUser } = useGetMyUser();

  return (
    <nav className="mt-4 flex w-full flex-col gap-2">
      {currentUser?.role === "restaurant_manager" && (
        <>
          <Link to="/manager-dashboard" className={navLinkClass}>
            <LayoutDashboard className="h-5 w-5 text-brand" aria-hidden />
            <span>Dashboard</span>
          </Link>
          <Link to="/manage-restaurant" className={navLinkClass}>
            <UtensilsCrossed className="h-5 w-5 text-brand" aria-hidden />
            <span>Manage Restaurant</span>
          </Link>
        </>
      )}
      {currentUser?.role === "customer" && (
        <Link to="/order-status" className={navLinkClass}>
          <ClipboardList className="h-5 w-5 text-brand" aria-hidden />
          <span>Order Status</span>
        </Link>
      )}
      {currentUser?.role === "customer" && (
        <Link to="/favorites" className={navLinkClass}>
          <Heart className="h-5 w-5 text-brand" aria-hidden />
          <span>My Favorites</span>
        </Link>
      )}
      {currentUser?.role === "admin" && (
        <Link to="/admin" className={navLinkClass}>
          <ShieldCheck className="h-5 w-5 text-brand" aria-hidden />
          <span>Admin Dashboard</span>
        </Link>
      )}
      <Link to="/user-profile" className={navLinkClass}>
        <User className="h-5 w-5 text-brand" aria-hidden />
        <span>User Profile</span>
      </Link>
      <Button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        className={cn(
          "mt-2 w-full justify-center gap-3 py-3 font-semibold sm:text-lg",
        )}
      >
        <LogOut className="h-5 w-5" aria-hidden />
        <span>Log Out</span>
      </Button>
    </nav>
  );
};

export default MobileNavLinks;
