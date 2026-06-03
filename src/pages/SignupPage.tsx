import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { UtensilsCrossed, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const SignupPage = () => {
  const { loginWithRedirect } = useAuth0();
  const [selectedRole, setSelectedRole] = useState<
    "customer" | "restaurant_manager" | null
  >(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!selectedRole) {
      return;
    }

    localStorage.setItem("signup_role", selectedRole);

    await loginWithRedirect({
      appState: {},
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-brand-muted/80 via-background to-background px-4 py-10">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-2xl border-brand-border shadow-lg">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Logo size="lg" showText={true} />
          </div>
          <CardTitle className="text-3xl font-bold text-brand">
            Join GhanaBite
          </CardTitle>
          <CardDescription className="mt-2 text-base">
            Choose how you want to use GhanaBite
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => setSelectedRole("customer")}
              className={cn(
                "rounded-xl border-2 p-5 text-left transition hover:shadow-md",
                selectedRole === "customer"
                  ? "border-brand bg-brand-muted"
                  : "border-border bg-card hover:border-brand/50",
              )}
            >
              <div className="mb-3 flex items-center gap-3">
                <ShoppingCart className="text-brand" size={32} aria-hidden />
                <h3 className="text-xl font-bold text-foreground">Order Food</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Browse restaurants, place orders, and get food delivered.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole("restaurant_manager")}
              className={cn(
                "rounded-xl border-2 p-5 text-left transition hover:shadow-md",
                selectedRole === "restaurant_manager"
                  ? "border-brand bg-brand-muted"
                  : "border-border bg-card hover:border-brand/50",
              )}
            >
              <div className="mb-3 flex items-center gap-3">
                <UtensilsCrossed className="text-brand" size={32} aria-hidden />
                <h3 className="text-xl font-bold text-foreground">
                  Manage Restaurant
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Add your restaurant, manage menus, and receive orders.
              </p>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleSignup}
              disabled={!selectedRole}
              className="w-full py-6 text-lg font-bold"
            >
              {selectedRole === "customer"
                ? "Continue as Customer"
                : selectedRole === "restaurant_manager"
                  ? "Continue as Restaurant Manager"
                  : "Choose an account type"}
            </Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="font-bold text-brand hover:underline"
              >
                Log in
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
