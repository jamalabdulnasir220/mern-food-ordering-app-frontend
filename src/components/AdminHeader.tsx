import { Link } from "react-router-dom";
import Logo from "./Logo";
import UserNameMenu from "./UserNameMenu";

const AdminHeader = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-3 px-2 sm:py-4 sm:px-0 bg-slate-900 text-white">
      <div className="container mx-auto flex justify-between items-center md:px-10">
        <Link to="/admin" className="hover:opacity-80 transition-opacity">
          <Logo size="md" showText={true} />
        </Link>
        <div className="flex items-center gap-4">
            <span className="font-semibold text-orange-500">Admin Console</span>
            <UserNameMenu />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
