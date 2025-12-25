import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

interface Props {
  index: number;
  removeMenuItem: () => void;
}

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr_auto] gap-3 md:gap-2 items-end border-b pb-4 md:pb-2 md:border-b-0">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Cheese Pizza"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price (GHC) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} type="number" step="0.01" min="0" placeholder="8.00" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name={`menuItems.${index}.imageFile`}
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Image
            </FormLabel>
            <FormControl>
               <Input
                  {...fieldProps}
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) => {
                    onChange(
                      event.target.files ? event.target.files[0] : null
                    );
                  }}
                />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 w-full md:w-auto md:max-h-fit"
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
