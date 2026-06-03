import type { User } from "@/types";

const GENERIC_RETURN_PATHS = new Set([
  "/",
  "/auth-callback",
  "/signup",
  "/user-profile",
]);

/** Where to send the user after login/signup when no specific deep link applies. */
export function resolvePostAuthPath(
  role: User["role"],
  returnTo?: string,
): string {
  if (returnTo && !GENERIC_RETURN_PATHS.has(returnTo)) {
    return returnTo;
  }

  if (role === "restaurant_manager") {
    return "/manager-dashboard";
  }

  if (role === "admin") {
    return "/admin";
  }

  return "/";
}
