import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

interface Props {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
}

const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="mt-2 flex flex-row items-center space-y-0 space-x-2 rounded-lg border border-border bg-card px-2 py-2">
      <FormControl>
        <Checkbox
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, cuisine]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== cuisine),
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal text-foreground">
        {cuisine}
      </FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;
