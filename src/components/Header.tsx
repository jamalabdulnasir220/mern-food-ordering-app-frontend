import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
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
    <header className="sticky top-0 z-50 border-b border-brand-border/60 bg-card/90 py-3 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-card/75 sm:py-4">
      <div className="container mx-auto flex items-center justify-between gap-2 px-2 sm:px-4 md:px-10">
        <Link
          to={getLogoLink()}
          className="min-w-0 shrink rounded-md transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <Logo size="md" showText={true} />
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <div className="md:hidden">
            <MobileNav />
          </div>
          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
