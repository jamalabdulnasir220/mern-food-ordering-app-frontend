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
import { useLocation, useNavigate } from "react-router-dom";
import MobileNavLinks from "./MobileNavLinks";
import ThemeToggle from "./ThemeToggle";

const MobileNav = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-brand"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[min(100vw-2rem,320px)] space-y-3 bg-card px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between">
          <SheetTitle className="mt-0 text-base font-semibold text-foreground">
            Menu
          </SheetTitle>
          <ThemeToggle />
        </div>
        {isAuthenticated ? (
          <span className="flex items-center gap-2 text-sm font-bold text-foreground">
            <CircleUserRound className="h-5 w-5 text-brand" aria-hidden />
            <span className="truncate">{user?.email}</span>
          </span>
        ) : (
          <p className="text-sm text-muted-foreground">Welcome to GhanaBite</p>
        )}
        <Separator />
        <SheetDescription asChild>
          <div className="flex flex-col gap-4">
            {isAuthenticated ? (
              <MobileNavLinks />
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => navigate("/signup")}
                  className="w-full font-bold"
                >
                  Sign Up
                </Button>
                <Button
                  onClick={async () =>
                    await loginWithRedirect({
                      appState: { returnTo: pathname },
                    })
                  }
                  variant="outline"
                  className="w-full border-brand font-bold text-brand"
                >
                  Log In
                </Button>
              </div>
            )}
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
