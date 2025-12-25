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
    <div className="flex flex-row items-end gap-2">
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
              <Input {...field} placeholder="8.00" className="bg-white" />
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
        className="bg-red-500 max-h-fit mt-8" // Added margin top to align with inputs
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
