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
import { useMemo } from "react";

interface Props {
  index: number;
  removeMenuItem: () => void;
}

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control, watch } = useFormContext();

  const imageFile = watch(`menuItems.${index}.imageFile`);
  const imageUrl = watch(`menuItems.${index}.imageUrl`);

  const preview = useMemo(() => {
    if (imageFile instanceof File) {
      return URL.createObjectURL(imageFile);
    }
    return imageUrl;
  }, [imageFile, imageUrl]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr_1fr_auto] gap-3 md:gap-2 items-end border-b pb-4 md:pb-2 md:border-b-0">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1 text-sm font-medium text-gray-700">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Cheese Pizza"
                className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500"
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
            <FormLabel className="flex items-center gap-1 text-sm font-medium text-gray-700">
              Price (GHC) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                step="0.01"
                min="0"
                placeholder="8.00"
                className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`menuItems.${index}.imageFile`}
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1 text-sm font-medium text-gray-700">
              Image
            </FormLabel>
            <FormControl>
              <Input
                {...fieldProps}
                className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 file:bg-orange-50 file:text-orange-700 file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-2 file:hover:bg-orange-100 cursor-pointer"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(event) => {
                  onChange(event.target.files ? event.target.files[0] : null);
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex justify-center items-center h-10 w-full md:w-20 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
            No Image
          </span>
        )}
      </div>

      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full md:w-auto md:max-h-fit transition-colors shadow-sm"
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
