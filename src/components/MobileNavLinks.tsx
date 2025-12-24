import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetMyUser } from "@/api/authRouter";
import { User, Utensils, FileText, LogOut } from "lucide-react";

const navLinkClass =
  "flex gap-3 items-center w-full py-3 px-4 rounded-lg text-lg font-semibold transition-colors hover:bg-orange-100 hover:text-orange-600 active:scale-95";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  const { currentUser } = useGetMyUser();

  return (
    <nav className="w-full flex flex-col gap-2 mt-4">
      {currentUser?.role === "customer" && (
        <Link to="/order-status" className={navLinkClass}>
          <FileText className="text-orange-500" />
          Order Status
        </Link>
      )}
      {currentUser?.role === "restaurant_manager" && (
        <Link to="/manage-restaurant" className={navLinkClass}>
          <Utensils className="text-orange-500" />
          My Restaurant
        </Link>
      )}
      <Link to="/user-profile" className={navLinkClass}>
        <User className="text-orange-500" />
        User Profile
      </Link>
      <Button
        onClick={() => logout()}
        className="flex gap-3 items-center w-full py-3 px-4 rounded-lg text-lg font-semibold bg-orange-500 text-white mt-2 shadow hover:bg-orange-600 active:scale-95 transition"
      >
        <LogOut className="w-5 h-5" />
        Log Out
      </Button>
    </nav>
  );
};

export default MobileNavLinks;
