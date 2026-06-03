import { Link } from "react-router-dom";
import Logo from "./Logo";
import UserNameMenu from "./UserNameMenu";
import ThemeToggle from "./ThemeToggle";

const AdminHeader = () => {
  return (
    <header className="border-b-2 border-brand bg-card py-3 text-foreground sm:py-4">
      <div className="container mx-auto flex items-center justify-between gap-2 px-2 md:px-10">
        <Link to="/admin" className="min-w-0 shrink transition-opacity hover:opacity-80">
          <Logo size="md" showText={true} />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden font-semibold text-brand sm:inline">
            Admin Console
          </span>
          <ThemeToggle />
          <UserNameMenu />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
