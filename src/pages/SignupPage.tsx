import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UtensilsCrossed, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    // Store role in localStorage temporarily
    localStorage.setItem("signup_role", selectedRole);

    await loginWithRedirect({
      appState: {
        returnTo: "/auth-callback",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-orange-600">
            Join QuickFork
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Choose how you want to use QuickFork
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Customer Card */}
            <button
              onClick={() => setSelectedRole("customer")}
              className={`p-6 border-2 rounded-lg text-left transition-all hover:shadow-lg ${
                selectedRole === "customer"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <ShoppingCart className="text-orange-500" size={32} />
                <h3 className="text-xl font-bold">Order Food</h3>
              </div>
              <p className="text-gray-600">
                Sign up as a customer to browse restaurants, place orders, and
                have delicious food delivered to your door.
              </p>
            </button>

            {/* Restaurant Manager Card */}
            <button
              onClick={() => setSelectedRole("restaurant_manager")}
              className={`p-6 border-2 rounded-lg text-left transition-all hover:shadow-lg ${
                selectedRole === "restaurant_manager"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <UtensilsCrossed className="text-orange-500" size={32} />
                <h3 className="text-xl font-bold">Manage Restaurant</h3>
              </div>
              <p className="text-gray-600">
                Sign up as a restaurant manager to add your restaurant, manage
                menu items, and receive orders.
              </p>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleSignup}
              disabled={!selectedRole}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 text-lg"
            >
              Continue with{" "}
              {selectedRole === "customer" ? "Customer" : "Restaurant Manager"}{" "}
              Account
            </Button>
            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <button
                onClick={handleLogin}
                className="text-orange-500 font-bold hover:underline"
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
