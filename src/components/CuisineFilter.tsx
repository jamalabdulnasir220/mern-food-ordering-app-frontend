import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import type { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisineList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisineList);
  };

  const handleCuisinesReset = () => onChange([]);

  return (
    <div className="px-2 py-3 sm:px-4 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="text-sm sm:text-base font-semibold mb-2">Filter By Cuisine</div>
        <div
          onClick={handleCuisinesReset}
          className="text-xs sm:text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex" key={cuisine}>
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-xs sm:text-sm rounded-full px-3 py-2 sm:px-4 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={18} strokeWidth={3} className="mr-1" />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button
          onClick={onExpandedClick}
          variant={"link"}
          className="mt-4 flex-1 text-xs sm:text-sm px-0"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center gap-0.5">
              View Less <ChevronUp size={22} strokeWidth={3}/>
            </span>
          ) : (
            <span className="flex flex-row items-center gap-0.5">
              View More <ChevronDown size={22} strokeWidth={3}/>
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CuisineFilter;
