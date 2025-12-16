import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailSection from "./DetailSection";

const formSchema = z.object({
  restaurantName: z.string().min(1, {
    message: "restaurant name is required",
  }),
  city: z.string().min(1, {
    message: "city is required",
  }),
  country: z.string().min(1, {
    message: "country is required",
  }),
  deliveryPrice: z.number().min(1, {
    message: "delivery price is required",
  }),
  estimatedDeliveryTime: z.number().min(1, {
    message: "estimated delivery time is required",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select at least one item",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.number().min(1, "price is required"),
    })
  ),
  imageFile: z.instanceof(File, { message: "image is required" }),
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onsave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onsave, isLoading }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = (formDataJSON: RestaurantFormData) => {
    // TODO: convert formDataJSON to new FormData object
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailSection />
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
