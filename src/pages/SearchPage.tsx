import { useSearchRestaurants } from "@/api/allRestaurants";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { type SearchForm } from "@/components/SearchBar";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchResultsCard from "@/components/SearchResultsCard";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PageLoader from "@/components/ui/page-loader";
import { Button } from "@/components/ui/button";

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
    return <PageLoader label="Searching for restaurants..." />;
  }

  // Show nice empty UI if there are 0 results, or if data not available
  if (!results?.data || !city || results.data.length === 0) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-brand-border bg-card p-6 sm:p-10">
        <Search className="mb-4 h-12 w-12 text-brand sm:h-14 sm:w-14" aria-hidden />
        <h2 className="text-lg font-bold text-foreground sm:text-2xl">
          No restaurants found
        </h2>
        <p className="mb-6 mt-2 max-w-md text-center text-sm text-muted-foreground sm:text-base">
          {city
            ? `We couldn't find matches in "${city}". Try another city, cuisine, or clear your filters.`
            : "Enter a city or town to start browsing."}
        </p>
        <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
          <Button className="font-bold" onClick={resetSearch}>
            Clear filters
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  // Main content if results exist
  return (
    <div className="grid grid-cols-1 gap-5 pb-6 lg:grid-cols-[250px_1fr]">
      {city && (
        <p className="col-span-full text-sm text-muted-foreground lg:hidden">
          Showing results for{" "}
          <span className="font-semibold text-brand">{city}</span>
        </p>
      )}
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prevState) => !prevState)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-4 sm:gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          onReset={resetSearch}
          placeHolder="Search by Cuisine or Restaurant Name"
        />
        <div className="flex items-center justify-between flex-col gap-2 sm:gap-3 lg:flex-row">
          <SearchResultInfo
            total={results.pagination.total}
            city={city}
            // className="text-sm sm:text-base"
          />
          <SortOptionDropdown
            onChange={(value) => setSortOption(value)}
            sortOption={searchState.sortOption}
          />
        </div>
        {results.data.map((restaurant) => (
          <div key={restaurant._id} className="pb-1">
            <SearchResultsCard restaurant={restaurant} />
          </div>
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
