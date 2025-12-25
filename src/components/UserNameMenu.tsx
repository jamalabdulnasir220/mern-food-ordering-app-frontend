import { CircleUserRound, LogOut, UserSquare, ClipboardList, UtensilsCrossed, Heart } from "lucide-react";
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

const UserNameMenu = () => {
  const { user, logout } = useAuth0();
  const { currentUser } = useGetMyUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center bg-white rounded-full px-3 py-1 font-bold gap-2 border border-orange-100 shadow-sm hover:shadow-md transition hover:text-orange-500 hover:border-orange-200 group">
        <CircleUserRound className="text-orange-500 group-hover:text-orange-600" size={24} />
        <span className="truncate max-w-40 text-xs sm:text-sm">{user?.email}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2 shadow-lg border-2 border-orange-100 rounded-xl px-1 py-1 bg-white">
        <DropdownMenuLabel className="flex flex-col mb-1">
          <span className="text-xs font-semibold text-gray-500">Signed in as</span>
          <span className="font-bold text-orange-600 truncate">{user?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {currentUser?.role === "restaurant_manager" && (
          <>
            <DropdownMenuItem asChild>
              <Link
                to={"/manager-dashboard"}
                className="flex items-center gap-2 font-medium text-gray-800 rounded-md px-2 py-2 hover:bg-orange-100 hover:text-orange-600 transition"
              >
                <UtensilsCrossed size={18} className="text-orange-500" />
                Manager Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {currentUser?.role === "customer" && (
          <>
            <DropdownMenuItem asChild>
              <Link
                to={"/order-status"}
                className="flex items-center gap-2 font-medium text-gray-800 rounded-md px-2 py-2 hover:bg-orange-100 hover:text-orange-600 transition"
              >
                <ClipboardList size={18} className="text-orange-500" />
                Order Status
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem asChild>
          <Link
            to={"/user-profile"}
            className="flex items-center gap-2 font-medium text-gray-800 rounded-md px-2 py-2 hover:bg-orange-100 hover:text-orange-600 transition"
          >
            <UserSquare size={18} className="text-orange-500" />
            User Profile
          </Link>
        </DropdownMenuItem>
        {currentUser?.role === "customer" && (
          <DropdownMenuItem asChild>
            <Link
              to={"/favorites"}
              className="flex items-center gap-2 font-medium text-gray-800 rounded-md px-2 py-2 hover:bg-orange-100 hover:text-orange-600 transition"
            >
              <Heart size={18} className="text-orange-500" />
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
            className="flex items-center gap-2 w-full justify-start font-semibold px-2 py-2 rounded-md bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white transition shadow"
            variant="ghost"
          >
            <LogOut size={18} className="text-orange-500 group-hover:text-white" />
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNameMenu;
