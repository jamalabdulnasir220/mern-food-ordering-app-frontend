import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";
import { Link, useLocation } from "react-router-dom";
import { useGetMyUser } from "@/api/authRouter";
import { BadgeCheck, ShieldCheck } from "lucide-react";

const navLinkClass =
  "flex items-center gap-1 rounded-lg bg-brand-muted px-3 py-2 text-sm font-semibold text-brand transition hover:bg-accent sm:px-4";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { currentUser } = useGetMyUser();
  const { pathname } = useLocation();

  return (
    <nav className="flex items-center gap-2 sm:gap-3">
      {isAuthenticated ? (
        <>
          {currentUser?.role === "customer" && (
            <Link to="/order-status" className={navLinkClass}>
              <BadgeCheck className="h-5 w-5" aria-hidden />
              <span className="hidden sm:inline">Order Status</span>
              <span className="sm:hidden">Orders</span>
            </Link>
          )}
          {currentUser?.role === "admin" && (
            <Link to="/admin" className={navLinkClass}>
              <ShieldCheck className="h-5 w-5" aria-hidden />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          )}
          <UserNameMenu />
        </>
      ) : (
        <>
          <Button asChild size="sm" className="font-bold sm:text-sm">
            <Link to="/signup">Sign Up</Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-brand font-bold text-brand hover:bg-brand-muted"
            onClick={async () =>
              await loginWithRedirect({
                appState: { returnTo: pathname },
              })
            }
          >
            Login
          </Button>
        </>
      )}
    </nav>
  );
};

export default MainNav;
