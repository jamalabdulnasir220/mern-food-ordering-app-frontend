import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import DetailSection from "./DetailSection";
import { Separator } from "@/components/ui/separator";
import CuisineSection from "./CuisineSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import { ButtonLoading } from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  restaurantName: z.string().min(1, "restaurant name is required"),
  city: z.string().min(1, "city is required"),
  country: z.string().min(1, "country is required"),
  deliveryPrice: z.coerce.number().min(1, "delivery price is required"),
  estimatedDeliveryTime: z.coerce.number().min(1, {
    message: "estimated delivery time is required",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select at least one item",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce.number().min(1, "price is required"),
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
    // resolver: zodResolver(formSchema),
    resolver: zodResolver(
      formSchema
    ) as unknown as Resolver<RestaurantFormData>,
    defaultValues: {
      restaurantName: "",
      city: "",
      country: "",
      deliveryPrice: 0,
      estimatedDeliveryTime: 0,
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = (formDataJSON: RestaurantFormData) => {
    // TODO: convert formDataJSON to new FormData object
    const formData = new FormData();

    formData.append("restaurantName", formDataJSON.restaurantName);
    formData.append("city", formDataJSON.city);
    formData.append("country", formDataJSON.country);

    // 1GHC == 100Pesewas, so we convert it to pesewas

    formData.append(
      "deliveryPrice",
      (formDataJSON.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJSON.estimatedDeliveryTime.toString()
    );

    formDataJSON.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    formDataJSON.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    formData.append("imageFile", formDataJSON.imageFile);

    onsave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailSection />
        <Separator />
        <CuisineSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <ButtonLoading /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
