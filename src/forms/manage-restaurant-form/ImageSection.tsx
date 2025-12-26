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
        <h2 className="text-xl sm:text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the
          search results. Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>

      <div className="flex flex-col gap-8 w-full md:w-[60%] lg:w-[50%]">
        {preview && (
          <AspectRatio ratio={16 / 9} className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <img
              src={preview}
              alt="Restaurant Preview"
              className="h-full w-full object-cover transition-opacity duration-300"
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
                  className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 file:bg-orange-50 file:text-orange-700 file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:hover:bg-orange-100 cursor-pointer"
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
