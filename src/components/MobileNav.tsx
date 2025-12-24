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
      <SheetContent className="space-y-3">
        <SheetTitle className="mt-5 flex">
          {isAuthenticated ? (
            <span className="flex items-center gap-2 font-bold">
              <CircleUserRound className="text-orange-500" />
              {user?.email}
            </span>
          ) : (
            <span>Welcome to QuickFork.com</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <>
              <Button
                onClick={() => navigate("/signup")}
                className="flex-1 font-bold bg-orange-500"
              >
                Sign Up
              </Button>
              <Button
                onClick={async () => await loginWithRedirect()}
                variant="outline"
                className="flex-1 font-bold border-orange-500 text-orange-500"
              >
                Log In
              </Button>
            </>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
