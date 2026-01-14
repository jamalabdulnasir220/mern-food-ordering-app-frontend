import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  phoneNumber: z.string().optional(),
});

export type UserFormData = z.infer<typeof formSchema>;

interface UserProfileFormProps {
  onsave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  currentUser: User;
  title?: string;
  buttonText?: string;
}

const UserProfileForm = ({
  onsave,
  isLoading,
  currentUser,
  title = "User Profile Form",
  buttonText = "Submit",
}: UserProfileFormProps) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsave)}
        className="space-y-4 bg-gray-50 rounded-lg p-4 md:p-10"
      >
        <div>
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          <FormDescription className="text-sm md:text-base">
            View and change your profile information here.
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm md:text-base">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled
                  className="bg-white text-sm md:text-base"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm md:text-base">Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white text-sm md:text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm md:text-base">
                  Address Line 1
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white text-sm md:text-base" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm md:text-base">City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white text-sm md:text-base" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm md:text-base">Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white text-sm md:text-base" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm md:text-base">
                Phone Number (for SMS notifications)
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  placeholder="+1234567890"
                  className="bg-white text-sm md:text-base"
                />
              </FormControl>
              <FormDescription className="text-xs md:text-sm">
                Add your phone number to receive SMS notifications about your
                orders
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <ButtonLoading />
        ) : (
          <Button
            type="submit"
            className="bg-orange-500 text-sm md:text-base px-6 py-2"
          >
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
