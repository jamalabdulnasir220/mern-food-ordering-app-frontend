import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};

const SORT_OPTIONS = [
  {
    name: "Best Match",
    value: "bestMatch",
  },
  {
    name: "Delivery Price",
    value: "deliveryPrice",
  },
  {
    name: "Estimated Delivery Time",
    value: "estimatedDeliveryTime",
  },
];

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.name ||
    SORT_OPTIONS[0].name;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <Button className="w-full" variant={"outline"}>
            Sort By: {selectedSortLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className="cursor-pointer"
              onClick={() => onChange(option.value)}
            >
              {option.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SortOptionDropdown;
