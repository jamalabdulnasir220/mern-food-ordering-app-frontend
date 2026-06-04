import type { User } from "@/types";

export function getHomePathForRole(role?: User["role"]): string {
  if (role === "restaurant_manager") {
    return "/manager-dashboard";
  }
  if (role === "admin") {
    return "/admin";
  }
  return "/";
}
