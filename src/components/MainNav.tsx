import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";
import { Link } from "react-router-dom";
import { useGetMyUser } from "@/api/authRouter";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { currentUser } = useGetMyUser();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          {currentUser?.role === "customer" && (
            <Link
              to={"/order-status"}
              className="font-bold hover:text-orange-500"
            >
              Order Status
            </Link>
          )}
          <UserNameMenu />
        </>
      ) : (
        <>
          <Link
            to={"/signup"}
            className="font-bold hover:text-orange-500 hover:bg-white px-3 py-2 rounded"
          >
            Sign Up
          </Link>
          <Button
            variant={"ghost"}
            className="font-bold hover:text-orange-500 hover:bg-white"
            onClick={async () => await loginWithRedirect()}
          >
            Login
          </Button>
        </>
      )}
    </span>
  );
};

export default MainNav;
