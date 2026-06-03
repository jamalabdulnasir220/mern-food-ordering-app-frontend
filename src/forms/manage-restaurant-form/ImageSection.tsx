import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";

const fileInputClass =
  "cursor-pointer file:mr-4 file:rounded-md file:border-0 file:bg-brand-muted file:px-4 file:py-2 file:font-semibold file:text-brand hover:file:bg-accent";

const ImageSection = () => {
  const { control, watch } = useFormContext();

  const imageFile = watch("imageFile");
  const imageUrl = watch("imageUrl");

  const preview = useMemo(() => {
    if (imageFile instanceof File) {
      return URL.createObjectURL(imageFile);
    }
    return imageUrl;
  }, [imageFile, imageUrl]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">Image</h2>
        <FormDescription>
          Add an image for your restaurant listing. A new upload replaces the
          existing one.
        </FormDescription>
      </div>

      <div className="flex w-full flex-col gap-6 md:w-[60%] lg:w-[50%]">
        {preview && (
          <AspectRatio
            ratio={16 / 9}
            className="overflow-hidden rounded-lg border border-border bg-muted shadow-sm"
          >
            <img
              src={preview}
              alt="Restaurant preview"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        )}
        <FormField
          control={control}
          name="imageFile"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...fieldProps}
                  className={fileInputClass}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) =>
                    onChange(event.target.files ? event.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
