import SearchBar, { type SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const DEFAULT_CITY = "accra";

const Homepage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  const handleSearchBarSubmit = (searchFormValue: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValue.searchQuery}`,
    });
  };

  const handleBrowseRestaurants = () => {
    navigate(`/search/${DEFAULT_CITY}`);
  };

  return (
    <div className="flex flex-col gap-12 mx-5">
      {/* The first DIV */}
      <div className="md:px-32 flex flex-col gap-5 bg-white rounded-lg shadow-md py-8 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Savor Authentic Ghanaian Flavors <br /> Order from top restaurants near you!
        </h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
          From fragrant jollof rice and spicy waakye to steaming fufu and rich light soup, discover the best of Ghana’s culinary heritage delivered hot and fresh to your door. Whether you crave classic favorites or want to try something new, enjoy the taste of Ghana right at home.
        </p>
        <span className="text-xl">Your next Ghanaian meal is just a click away!</span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchBarSubmit}
          onReset={() => {}}
        />
        {!isAuthenticated && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-4">
            <Button
              onClick={() => navigate("/signup")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2"
            >
              Sign Up to Order Food
            </Button>
            <span className="text-gray-500">or</span>
            <Button
              onClick={() => navigate("/signup")}
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50 font-bold px-6 py-2"
            >
              Sign Up as Restaurant Manager
            </Button>
          </div>
        )}
      </div>
      {/* The div containing app download links */}
      <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center text-center gap-4 bg-white rounded-lg shadow-md p-8 w-full md:max-w-xl">
          <span className="font-bold text-3xl tracking-tighter text-orange-600">
            Discover Tasty Meals Near You!
          </span>
          <span className="text-lg text-gray-600">
            Explore a world of flavors from your favorite local restaurants, freshly prepared and delivered right to your door.
            <br />
            Fast, easy, and delicious every time you order.
          </span>
          <div className="mt-4 flex flex-col gap-2 items-center">
            <span className="text-orange-400 font-semibold">Amazing offers &amp; new restaurants added weekly!</span>
            <Button
              onClick={handleBrowseRestaurants}
              className="inline-block bg-orange-500 text-white px-6 py-2 rounded font-bold hover:bg-orange-600 transition"
            >
              Browse Restaurants
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
