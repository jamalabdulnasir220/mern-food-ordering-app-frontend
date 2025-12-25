import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";
import { Link } from "react-router-dom";
import { useGetMyUser } from "@/api/authRouter";
import { BadgeCheck, ShieldCheck } from "lucide-react";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { currentUser } = useGetMyUser();

  return (
    <nav className="flex items-center gap-3">
      {isAuthenticated ? (
        <>
          {currentUser?.role === "customer" && (
            <Link
              to={"/order-status"}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-orange-100 text-orange-600 font-semibold transition 
                         hover:bg-orange-200 hover:text-orange-700 shadow-sm"
            >
              <BadgeCheck className="w-5 h-5 text-orange-500" />
              <span>Order Status</span>
            </Link>
          )}
          {currentUser?.role === "admin" && (
            <Link
              to={"/admin"}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-orange-100 text-orange-600 font-semibold transition 
                         hover:bg-orange-200 hover:text-orange-700 shadow-sm"
            >
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              <span>Admin Dashboard</span>
            </Link>
          )}
          <UserNameMenu />
        </>
      ) : (
        <>
          <Link
            to={"/signup"}
            className="px-4 py-2 rounded-lg bg-orange-500 text-white font-bold shadow-sm transition 
                       hover:bg-orange-600 hover:text-white border border-orange-500"
          >
            Sign Up
          </Link>
          <Button
            variant="outline"
            className="px-4 py-2 rounded-lg font-bold border-orange-500 text-orange-500 bg-white 
                       hover:bg-orange-100 hover:text-orange-600 transition shadow-sm"
            onClick={async () => await loginWithRedirect()}
          >
            Login
          </Button>
        </>
      )}
    </nav>
  );
};

export default MainNav;
