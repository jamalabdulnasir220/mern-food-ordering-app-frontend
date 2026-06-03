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
import { cn } from "@/lib/utils";

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
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Hours & Availability
        </h2>
        <FormDescription>
          Set when your restaurant is open so customers know when they can order.
        </FormDescription>
      </div>

      <FormField
        control={control}
        name="isTemporarilyClosed"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-3 rounded-lg border border-dashed border-border bg-muted p-3 sm:p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            </FormControl>
            <div className="space-y-1">
              <FormLabel className="font-medium text-foreground">
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

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="openingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opening time</FormLabel>
              <FormControl>
                <Input
                  type="time"
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
        <div className="mt-2 flex flex-wrap gap-2">
          {DAYS.map((day) => {
            const checked = daysOpen.includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day, !checked)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition sm:text-sm",
                  checked
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border bg-card text-foreground hover:border-brand-border",
                )}
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
