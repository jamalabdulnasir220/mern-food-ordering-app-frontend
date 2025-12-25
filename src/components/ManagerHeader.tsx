import { Link } from "react-router-dom";
import Logo from "./Logo";
import UserNameMenu from "./UserNameMenu";

const ManagerHeader = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-3 px-2 sm:py-4 sm:px-0 bg-white">
      <div className="container mx-auto flex justify-between items-center md:px-10">
        <Link to="/manage-restaurant" className="hover:opacity-80 transition-opacity">
          <Logo size="md" showText={true} />
        </Link>
        <UserNameMenu />
      </div>
    </div>
  );
};

export default ManagerHeader;
