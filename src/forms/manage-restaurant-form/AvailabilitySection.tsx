import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AvailabilitySection = () => {
  const { control, watch, setValue } = useFormContext();

  const daysOpen: string[] = watch("daysOpen") || [];
  const isTemporarilyClosed: boolean = watch("isTemporarilyClosed") || false;

  const toggleDay = (day: string, checked: boolean) => {
    const current = new Set(daysOpen);
    if (checked) {
      current.add(day);
    } else {
      current.delete(day);
    }
    setValue("daysOpen", Array.from(current));
  };

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold">Hours & Availability</h2>
        <FormDescription>
          Set when your restaurant is open so customers know when they can
          order.
        </FormDescription>
      </div>

      <FormField
        control={control}
        name="isTemporarilyClosed"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-2 rounded-md border border-dashed border-gray-200 bg-white p-3">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            </FormControl>
            <div className="space-y-1">
              <FormLabel className="font-medium">
                Temporarily close restaurant
              </FormLabel>
              <FormDescription className="text-xs">
                When checked, your restaurant will show as closed even during
                normal opening hours.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <FormField
          control={control}
          name="openingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opening time</FormLabel>
              <FormControl>
                <Input
                  type="time"
                  className="bg-white"
                  {...field}
                  disabled={isTemporarilyClosed}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="closingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Closing time</FormLabel>
              <FormControl>
                <Input
                  type="time"
                  className="bg-white"
                  {...field}
                  disabled={isTemporarilyClosed}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <FormItem>
        <FormLabel>Open days</FormLabel>
        <FormDescription className="text-xs">
          Select the days your restaurant is normally open.
        </FormDescription>
        <div className="flex flex-wrap gap-2 mt-2">
          {DAYS.map((day) => {
            const checked = daysOpen.includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day, !checked)}
                className={`px-3 py-1 rounded-full border text-xs sm:text-sm ${
                  checked
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </FormItem>
    </div>
  );
};

export default AvailabilitySection;
