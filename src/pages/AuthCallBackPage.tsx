import {
  createMyUserWithToken,
  fetchMyUserWithToken,
  type CreateUserRequest,
} from "@/api/authRouter";
import type { User } from "@/types";
import { resolvePostAuthPath } from "@/lib/postAuthNavigation";
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

  navigate(resolvePostAuthPath(result.role, returnTo), { replace: true });
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
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
        <h1 className="mb-2 text-xl font-bold text-foreground">
          Sign in could not be completed
        </h1>
        <p className="mb-6 max-w-md text-muted-foreground">{errorMessage}</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <Link
            to="/"
            className="rounded-lg bg-brand px-4 py-2 font-semibold text-brand-foreground hover:bg-brand/90"
          >
            Back to home
          </Link>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg border border-brand px-4 py-2 font-semibold text-brand hover:bg-brand-muted"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <svg
        className="mb-4 h-10 w-10 animate-spin text-brand"
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
      <span className="text-lg font-medium text-muted-foreground">
        Setting up your GhanaBite account...
      </span>
    </div>
  );
};

export default AuthCallBackPage;
