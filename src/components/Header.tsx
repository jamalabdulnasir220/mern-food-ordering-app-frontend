import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-3 px-2 sm:py-4 sm:px-0">
      <div className="container mx-auto flex justify-between items-center md:px-10">
        <Link to={"/"} className="hover:opacity-80 transition-opacity">
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
