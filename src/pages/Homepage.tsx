import SearchBar, { type SearchForm } from "@/components/SearchBar";
import PopularCities from "@/components/PopularCities";
import FeatureHighlights from "@/components/FeatureHighlights";
import PageLoader from "@/components/ui/page-loader";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetMyUser } from "@/api/authRouter";
import { useEffect } from "react";

const Homepage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const { currentUser, isPending } = useGetMyUser();

  useEffect(() => {
    if (!isAuthenticated || isPending || !currentUser) {
      return;
    }
    if (currentUser.role === "restaurant_manager") {
      navigate("/manager-dashboard", { replace: true });
    } else if (currentUser.role === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, currentUser, isPending, navigate]);

  if (
    isAuthenticated &&
    (isPending ||
      currentUser?.role === "restaurant_manager" ||
      currentUser?.role === "admin")
  ) {
    return <PageLoader label="Loading your account..." />;
  }

  const handleSearchBarSubmit = (searchFormValue: SearchForm) => {
    navigate({
      pathname: `/search/${encodeURIComponent(searchFormValue.searchQuery.trim())}`,
    });
  };

  const firstName =
    currentUser?.name?.split(" ")[0] ||
    user?.given_name ||
    user?.name?.split(" ")[0];

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 sm:gap-12">
      <section
        aria-labelledby="search-heading"
        className="relative z-10 -mt-10 rounded-2xl border border-brand-border bg-card p-5 shadow-xl sm:-mt-14 sm:p-8 md:-mt-20"
      >
        {isAuthenticated && currentUser?.role === "customer" && firstName ? (
          <p className="mb-2 text-center text-sm font-medium text-brand">
            Welcome back, {firstName}
          </p>
        ) : null}
        <h2
          id="search-heading"
          className="text-center text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl"
        >
          Find restaurants in your city
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm text-muted-foreground sm:text-base">
          Search by city or town to browse menus, compare delivery times, and
          order your next meal.
        </p>
        <div className="mt-5 sm:mt-6">
          <SearchBar
            placeHolder="e.g. Accra, Kumasi, Tamale"
            onSubmit={handleSearchBarSubmit}
            onReset={() => {}}
          />
        </div>
        <div className="mt-5">
          <PopularCities />
        </div>
        {!isAuthenticated && (
          <div className="mt-6 flex flex-col items-center gap-3 border-t border-border pt-6 sm:flex-row sm:justify-center">
            <Button
              onClick={() => navigate("/signup")}
              className="w-full font-bold sm:w-auto"
            >
              Sign up to order
            </Button>
            <span className="text-sm text-muted-foreground">or</span>
            <Button
              onClick={() => navigate("/signup")}
              variant="outline"
              className="w-full border-brand font-bold text-brand hover:bg-brand-muted sm:w-auto"
            >
              List your restaurant
            </Button>
          </div>
        )}
      </section>

      <FeatureHighlights />
    </div>
  );
};

export default Homepage;
