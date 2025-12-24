import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string().min(1, "search query cannot be empty"),
});

export type SearchForm = z.infer<typeof formSchema>;

interface Props {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
}

const SearchBar = ({ onSubmit, placeHolder, onReset, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  useEffect(() => {
    form.reset({
      searchQuery,
    });
  }, [form, searchQuery]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex flex-row items-center justify-between gap-2 md:gap-3 border-2 rounded-full px-2 py-2 md:p-3 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={24}
          className="ml-1 text-orange-500 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none text-base md:text-xl focus-visible:ring-0 py-2 px-2"
                  placeholder={placeHolder}
                  // Make input smaller for mobile, larger for desktop
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          onClick={handleReset}
          type="button"
          variant={"outline"}
          className="rounded-full px-3 py-2 text-sm md:px-5 md:py-2 md:text-base"
        >
          Reset
        </Button>
        <Button
          type="submit"
          className="rounded-full bg-orange-500 px-4 py-2 text-sm md:px-6 md:py-2 md:text-base"
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
