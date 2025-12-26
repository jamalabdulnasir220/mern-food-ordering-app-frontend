import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import Logo from "./Logo";
import { useGetMyUser } from "@/api/authRouter";

const Header = () => {
  const { currentUser } = useGetMyUser();

  const getLogoLink = () => {
    if (currentUser?.role === "restaurant_manager") {
      return "/manager-dashboard";
    }
    if (currentUser?.role === "admin") {
      return "/admin";
    }
    return "/";
  };

  return (
    <div className="py-3 px-2 sm:py-4 sm:px-0">
      <div className="container mx-auto flex justify-between items-center md:px-10">
        <Link to={getLogoLink()} className="hover:opacity-80 transition-opacity">
          <Logo size="md" showText={true} />
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
