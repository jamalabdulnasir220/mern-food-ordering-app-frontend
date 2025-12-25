import SearchBar, { type SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetMyUser } from "@/api/authRouter";

const Homepage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const { currentUser } = useGetMyUser();

  // Redirect managers and admins to their respective dashboards
  if (currentUser?.role === "restaurant_manager") {
      navigate("/manager-dashboard");
      return null;
  }

  if (currentUser?.role === "admin") {
      navigate("/admin");
      return null;
  }

  const handleSearchBarSubmit = (searchFormValue: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValue.searchQuery}`,
    });
  };



  return (
    <div className="flex flex-col gap-12 mx-2 sm:mx-4 md:mx-5"> {/* Adjust horizontal padding */}
      {/* The first DIV */}
      <div className="px-2 sm:px-6 md:px-32 flex flex-col gap-5 bg-white rounded-lg shadow-md py-6 sm:py-8 text-center -mt-12 sm:-mt-16">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-orange-600">
          Savor Authentic Ghanaian Flavors <br /> Order from top restaurants near you!
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
          From fragrant jollof rice and spicy waakye to steaming fufu and rich light soup, discover the best of Ghana’s culinary heritage delivered hot and fresh to your door. Whether you crave classic favorites or want to try something new, enjoy the taste of Ghana right at home.
        </p>
        <span className="text-base sm:text-lg md:text-xl">
          Your next Ghanaian meal is just a click away!
        </span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchBarSubmit}
          onReset={() => {}}
        />
        {!isAuthenticated && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-4 w-full px-1">
            <Button
              onClick={() => navigate("/signup")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 sm:px-6 py-2 text-sm sm:text-base w-full sm:w-auto"
            >
              Sign Up to Order Food
            </Button>
            <span className="text-gray-500 text-sm sm:text-base">or</span>
            <Button
              onClick={() => navigate("/signup")}
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50 font-bold px-4 sm:px-6 py-2 text-sm sm:text-base w-full sm:w-auto"
            >
              Sign Up as Restaurant Manager
            </Button>
          </div>
        )}
      </div>
      {/* The div containing app download links */}
      <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center text-center gap-4 bg-white rounded-lg shadow-md w-full md:max-w-xl p-4 sm:p-6 md:p-8">
          <span className="font-bold text-xl sm:text-2xl md:text-3xl tracking-tighter text-orange-600">
            Discover Tasty Meals Near You!
          </span>
          <span className="text-sm sm:text-base md:text-lg text-gray-600">
            Explore a world of flavors from your favorite local restaurants, freshly prepared and delivered right to your door.
            <br />
            Fast, easy, and delicious every time you order.
          </span>
          <div className="mt-4 flex flex-col gap-2 items-center w-full">
            <span className="text-orange-400 font-semibold text-sm sm:text-base">
              Amazing offers &amp; new restaurants added weekly!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
