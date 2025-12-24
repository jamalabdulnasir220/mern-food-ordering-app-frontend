import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3 px-4 py-6 sm:px-8 sm:py-8">
        <SheetTitle className="mt-3 flex">
          {isAuthenticated ? (
            <span className="flex items-center gap-2 font-bold text-sm sm:text-base">
              <CircleUserRound className="text-orange-500" size={22} />
              <span className="truncate">{user?.email}</span>
            </span>
          ) : (
            <span className="text-base sm:text-lg font-semibold text-gray-800">
              Welcome to GhanaBite.com
            </span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <div className="pb-2">
              <MobileNavLinks />
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={() => navigate("/signup")}
                className="flex-1 font-bold bg-orange-500 text-sm py-2"
              >
                Sign Up
              </Button>
              <Button
                onClick={async () => await loginWithRedirect()}
                variant="outline"
                className="flex-1 font-bold border-orange-500 text-orange-500 text-sm py-2"
              >
                Log In
              </Button>
            </div>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
