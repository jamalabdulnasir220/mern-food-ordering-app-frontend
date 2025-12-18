import { useSearchRestaurants } from "@/api/allRestaurants";
import SearchBar, { type SearchForm } from "@/components/SearchBar";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchResultsCard from "@/components/SearchResultsCard";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState: SearchState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState: SearchState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };

  if (isLoading) {
    return <span>Loading....</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found.</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">Insert cuisines here :)</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          onReset={resetSearch}
          placeHolder="Search by Cuisine or Restaurant Name"
        />
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultsCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
