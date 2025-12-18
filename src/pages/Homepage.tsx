import landingPageImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { type SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleSearchBarSubmit = (searchFormValue: SearchForm) => {
    navigate({ 
      pathname: `/search/${searchFormValue.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12 mx-5">
      {/* The first DIV */}
      <div className="md:px-32 flex flex-col gap-5 bg-white rounded-lg shadow-md py-8 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeway today!
        </h1>
        <span className="text-xl">Food is just a click away!</span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchBarSubmit}
          onReset={() => {}}
        />
      </div>
      {/* The div containing app download links */}
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingPageImage} alt="landing page image" />
        <div className="flex flex-col justify-center items-center text-center gap-4">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeway even faster!
          </span>
          <span>
            Download the QuickFork App for faster ordering and personalized
            recommendation.
          </span>
          <img src={appDownloadImage} alt="app download image" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
