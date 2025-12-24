import { Link } from "react-router-dom";

interface Props {
  total: number;
  city: string;
}

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="px-2 py-1 font-bold flex flex-col gap-2 justify-between lg:items-center lg:flex-row">
      <span className="text-base sm:text-lg md:text-xl font-bold">
        {total} Restaurants found in {city}
        <Link
          to={"/"}
          className="ml-1 text-xs sm:text-sm font-semibold underline cursor-pointer text-blue-500"
        >
          Change Location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
