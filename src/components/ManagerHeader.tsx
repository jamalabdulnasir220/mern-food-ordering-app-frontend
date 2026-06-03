import { Link } from "react-router-dom";
import Logo from "./Logo";
import UserNameMenu from "./UserNameMenu";
import ThemeToggle from "./ThemeToggle";

const ManagerHeader = () => {
  return (
    <header className="border-b-2 border-brand bg-card py-3 sm:py-4">
      <div className="container mx-auto flex items-center justify-between gap-2 px-2 md:px-10">
        <Link
          to="/manage-restaurant"
          className="min-w-0 shrink transition-opacity hover:opacity-80"
        >
          <Logo size="md" showText={true} />
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <UserNameMenu />
        </div>
      </div>
    </header>
  );
};

export default ManagerHeader;
