import {
  createMyUserWithToken,
  fetchMyUserWithToken,
  type CreateUserRequest,
} from "@/api/authRouter";
import type { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navigateAfterAuth = (
  navigate: ReturnType<typeof useNavigate>,
  result: User,
  returnTo?: string,
) => {
  const needsProfile =
    !result.name ||
    !result.addressLine1 ||
    !result.city ||
    !result.country;

  if (needsProfile) {
    navigate("/user-profile", {
      replace: true,
      state: returnTo ? { returnTo } : undefined,
    });
    return;
  }

  if (returnTo && returnTo !== "/auth-callback") {
    navigate(returnTo, { replace: true });
  } else if (result.role === "restaurant_manager") {
    navigate("/manager-dashboard", { replace: true });
  } else if (result.role === "admin") {
    navigate("/admin", { replace: true });
  } else {
    navigate("/", { replace: true });
  }
};

const AuthCallBackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    isAuthenticated,
    isLoading,
    error: auth0Error,
    getAccessTokenSilently,
  } = useAuth0();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasHandledCallback = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlError =
      params.get("error_description") || params.get("error");
    if (urlError) {
      setErrorMessage(urlError);
      return;
    }

    if (auth0Error) {
      setErrorMessage(auth0Error.message);
      return;
    }

    if (isLoading || hasHandledCallback.current) {
      return;
    }

    const syncUserAndNavigate = async () => {
      if (!isAuthenticated || !user?.sub) {
        navigate("/", { replace: true });
        return;
      }

      const email = user.email;
      if (!email) {
        setErrorMessage(
          "We could not read your email from Auth0. Please ensure your account uses a verified email address.",
        );
        return;
      }

      hasHandledCallback.current = true;

      const raw = localStorage.getItem("signup_role");
      const signupRole =
        raw === "restaurant_manager" || raw === "customer" ? raw : null;
      const role = signupRole ?? "customer";

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          },
        });

        let result =
          await fetchMyUserWithToken(accessToken);

        if (!result) {
          const payload: CreateUserRequest = {
            auth0Id: user.sub,
            email,
            role,
          };
          result = await createMyUserWithToken(accessToken, payload);
        }

        if (signupRole) {
          localStorage.removeItem("signup_role");
        }

        const returnTo = location.state?.returnTo as string | undefined;
        navigateAfterAuth(navigate, result, returnTo);
      } catch (error) {
        console.error("Auth callback error:", error);
        hasHandledCallback.current = false;
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to finish signing you in. Please try again.",
        );
      }
    };

    syncUserAndNavigate();
  }, [
    user,
    isAuthenticated,
    isLoading,
    auth0Error,
    getAccessTokenSilently,
    navigate,
    location,
  ]);

  if (errorMessage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Sign in could not be completed
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">{errorMessage}</p>
        <div className="flex gap-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600"
          >
            Back to home
          </Link>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg border border-orange-500 text-orange-600 font-semibold hover:bg-orange-50"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

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
        Setting up your GhanaBite account...
      </span>
    </div>
  );
};

export default AuthCallBackPage;
