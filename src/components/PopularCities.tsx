import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const POPULAR_CITIES = [
  "Accra",
  "Kumasi",
  "Tamale",
  "Cape Coast",
  "Takoradi",
] as const;

const PopularCities = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <p className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
        <MapPin className="h-4 w-4 text-brand" aria-hidden />
        Popular cities
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {POPULAR_CITIES.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => navigate(`/search/${encodeURIComponent(city)}`)}
            className="rounded-full border border-brand-border bg-brand-muted px-4 py-1.5 text-sm font-semibold text-brand transition hover:border-brand hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularCities;
