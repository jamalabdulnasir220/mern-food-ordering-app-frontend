import { useCreateMYUser } from "@/api/authRouter";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthCallBackPage = () => {
  const navigate = useNavigate();
 
  const { user } = useAuth0();
  const { createUser } = useCreateMYUser();

  const isUserCreated = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !isUserCreated.current) {
      // Get role from localStorage (set during signup) or default to customer
      const signupRole = localStorage.getItem("signup_role") as
        | "customer"
        | "restaurant_manager"
        | null;
      const role = signupRole || "customer"; // Default to customer if no role specified

      // Clear the stored role after reading it
      if (signupRole) {
        localStorage.removeItem("signup_role");
      }

      createUser({
        auth0Id: user.sub,
        email: user.email,
        role: role,
      });
      isUserCreated.current = true;

      // Navigate based on role after a short delay to ensure user is created
      setTimeout(() => {
        if (role === "restaurant_manager") {
          navigate("/manage-restaurant");
        } else {
          navigate("/");
        }
      }, 500);
    }
  }, [user, createUser, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <svg
        className="animate-spin h-10 w-10 text-orange-500 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span className="text-lg text-gray-700 font-medium">
        Setting up your QuickFork account...
      </span>
    </div>
  );
};

export default AuthCallBackPage;
