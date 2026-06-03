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

const fileInputClass =
  "cursor-pointer file:mr-2 file:rounded-md file:border-0 file:bg-brand-muted file:px-2 file:py-1 file:text-sm file:font-semibold file:text-brand hover:file:bg-accent sm:file:mr-4 sm:file:px-4 sm:file:py-2";

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
    <div className="grid grid-cols-1 items-end gap-4 rounded-xl border border-border bg-muted/30 p-4 md:grid-cols-[2fr_1fr_2fr_auto_auto] md:gap-2 md:border-0 md:bg-transparent md:p-0">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Cheese Pizza" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Price (GHC) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                step="0.01"
                min="0"
                placeholder="8.00"
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
            <FormLabel className="text-sm font-medium">Image</FormLabel>
            <FormControl>
              <Input
                {...fieldProps}
                className={fileInputClass}
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

      <div className="flex h-20 w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-muted md:h-10 md:w-20">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            No image
          </span>
        )}
      </div>

      <Button
        type="button"
        variant="destructive"
        onClick={removeMenuItem}
        className="w-full font-bold md:w-auto"
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
