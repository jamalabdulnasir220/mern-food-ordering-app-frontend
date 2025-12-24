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
        className={`
          flex flex-row items-center justify-between gap-1 sm:gap-2 md:gap-3
          border-2 rounded-full
          px-1.5 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3
          bg-white
          ${form.formState.errors.searchQuery ? "border-red-500" : ""}
        `}
      >
        <Search
          strokeWidth={2.5}
          size={20}
          className="ml-0.5 text-orange-500 hidden sm:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="
                    border-none shadow-none
                    text-xs
                    sm:text-sm
                    md:text-base
                    md:text-xl
                    focus-visible:ring-0
                    py-1 px-2
                    sm:py-2 sm:px-3
                  "
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          onClick={handleReset}
          type="button"
          variant={"outline"}
          className="
            rounded-full
            px-1.5 py-1
            text-xs
            sm:px-3 sm:py-2 sm:text-sm
            md:px-5 md:py-2 md:text-base
          "
        >
          Reset
        </Button>
        <Button
          type="submit"
          className="
            rounded-full bg-orange-500
            px-2 py-1
            text-xs
            sm:px-4 sm:py-2 sm:text-sm
            md:px-6 md:py-2 md:text-base
          "
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
