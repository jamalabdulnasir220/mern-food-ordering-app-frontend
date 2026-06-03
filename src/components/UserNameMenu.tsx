import {
  CircleUserRound,
  LogOut,
  UserSquare,
  ClipboardList,
  UtensilsCrossed,
  Heart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useGetMyUser } from "@/api/authRouter";

const menuLinkClass =
  "flex items-center gap-2 rounded-md px-2 py-2 font-medium text-foreground transition hover:bg-brand-muted hover:text-brand";

const UserNameMenu = () => {
  const { user, logout } = useAuth0();
  const { currentUser } = useGetMyUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex max-w-[11rem] items-center gap-2 rounded-full border border-brand-border bg-card px-2 py-1 font-bold shadow-sm transition hover:border-brand hover:shadow-md sm:max-w-[10rem] sm:px-3">
        <CircleUserRound
          className="shrink-0 text-brand group-hover:text-brand/90"
          size={22}
          aria-hidden
        />
        <span className="truncate text-xs sm:text-sm">{user?.email}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-56 rounded-xl border border-brand-border bg-popover p-1 shadow-lg">
        <DropdownMenuLabel className="mb-1 flex flex-col">
          <span className="text-xs font-semibold text-muted-foreground">
            Signed in as
          </span>
          <span className="truncate font-bold text-brand">{user?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {currentUser?.role === "restaurant_manager" && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/manager-dashboard" className={menuLinkClass}>
                <UtensilsCrossed size={18} className="text-brand" aria-hidden />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/manage-restaurant" className={menuLinkClass}>
                <UtensilsCrossed size={18} className="text-brand" aria-hidden />
                Manage Restaurant
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {currentUser?.role === "customer" && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/order-status" className={menuLinkClass}>
                <ClipboardList size={18} className="text-brand" aria-hidden />
                Order Status
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem asChild>
          <Link to="/user-profile" className={menuLinkClass}>
            <UserSquare size={18} className="text-brand" aria-hidden />
            User Profile
          </Link>
        </DropdownMenuItem>
        {currentUser?.role === "customer" && (
          <DropdownMenuItem asChild>
            <Link to="/favorites" className={menuLinkClass}>
              <Heart size={18} className="text-brand" aria-hidden />
              My Favorites
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            variant="ghost"
            className="w-full justify-start font-semibold text-brand hover:bg-brand-muted"
          >
            <LogOut size={18} className="mr-2" aria-hidden />
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNameMenu;
