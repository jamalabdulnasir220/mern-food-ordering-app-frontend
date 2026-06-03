import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string().min(1, "Enter a city or town to search"),
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
    form.reset({ searchQuery: "" });
    onReset?.();
  };

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`
          flex flex-row items-center justify-between gap-1 rounded-full border-2 bg-card shadow-sm transition-shadow
          px-1.5 py-1 focus-within:border-brand focus-within:shadow-md
          sm:gap-2 sm:px-3 sm:py-2 md:gap-3 md:px-4 md:py-3
          ${form.formState.errors.searchQuery ? "border-destructive" : "border-brand-border"}
        `}
      >
        <Search
          strokeWidth={2.5}
          size={20}
          className="ml-0.5 shrink-0 text-brand"
          aria-hidden
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none bg-transparent px-2 py-1 text-xs shadow-none focus-visible:ring-0 sm:px-3 sm:py-2 sm:text-sm md:text-base"
                  placeholder={placeHolder}
                  aria-label={placeHolder}
                />
              </FormControl>
              <FormMessage className="px-3 text-xs" />
            </FormItem>
          )}
        />
        <Button
          onClick={handleReset}
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full text-xs sm:text-sm"
        >
          Reset
        </Button>
        <Button type="submit" size="sm" className="rounded-full text-xs sm:text-sm">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
