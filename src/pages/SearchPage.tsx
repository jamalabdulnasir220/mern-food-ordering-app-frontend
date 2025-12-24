import { useSearchRestaurants } from "@/api/allRestaurants";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { type SearchForm } from "@/components/SearchBar";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchResultsCard from "@/components/SearchResultsCard";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, Search } from "lucide-react"; // Using lucide-react for icons

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState: SearchState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState: SearchState) => ({
      ...prevState,
      searchQuery: "",
      selectedCuisines: [],
      page: 1,
    }));
  };

  // Show loading animation if loading
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <Loader2 className="animate-spin h-12 w-12 text-orange-500 mb-4" />
        <span className="text-lg font-semibold text-gray-600">
          Searching for restaurants...
        </span>
      </div>
    );
  }

  // Show nice empty UI if there are 0 results, or if data not available
  if (!results?.data || !city || results.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gray-50 rounded-lg p-10">
        <Search className="h-14 w-14 text-orange-400 mb-4" />
        <div className="text-2xl font-bold text-gray-700 mb-2">
          No restaurants found
        </div>
        <div className="text-gray-500 text-base mb-4 text-center">
          {city
            ? `Try searching with a different name, cuisine, or adjust your filters for "${city}".`
            : "Please select a city or update your search terms."}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            className="inline-block px-6 py-2 bg-orange-500 hover:bg-orange-600 transition font-bold rounded text-white"
            onClick={resetSearch}
          >
            Reset Search
          </button>
          <button
            className="inline-block px-6 py-2 bg-gray-200 hover:bg-orange-100 transition font-bold rounded text-orange-600"
            onClick={() => navigate("/")}
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  // Main content if results exist
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prevState) => !prevState)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          onReset={resetSearch}
          placeHolder="Search by Cuisine or Restaurant Name"
        />
        <div className="flex items-center justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            onChange={(value) => setSortOption(value)}
            sortOption={searchState.sortOption}
          />
        </div>
        {results.data.map((restaurant) => (
          <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
