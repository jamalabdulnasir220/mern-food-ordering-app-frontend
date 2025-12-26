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
import type { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z
  .object({
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
        imageFile: z.instanceof(File).optional(),
        imageUrl: z.string().optional(),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image url or image file must be provided",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant | null;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
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

  useEffect(() => {
    if (!restaurant) {
      return;
    }
    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );

    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
      imageUrl: item.imageUrl,
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [restaurant, form]);

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
      if (menuItem.imageUrl) {
        formData.append(`menuItems[${index}][imageUrl]`, menuItem.imageUrl);
      }
      if (menuItem.imageFile instanceof File) {
        formData.append(`menuItems[${index}][imageFile]`, menuItem.imageFile);
      }
    });

    if (formDataJSON.imageFile) {
      formData.append("imageFile", formDataJSON.imageFile);
    }
    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 sm:space-y-8 bg-gray-50 p-4 sm:p-6 md:p-10 rounded-lg"
      >
        <DetailSection />
        <Separator />
        <CuisineSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <ButtonLoading /> : <Button type="submit" className="w-full sm:w-auto">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
