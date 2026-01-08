/**
 * Health analysis form component with progress indicator.
 */
import { useWatch } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  GENDER_OPTIONS,
  ALCOHOL_OPTIONS,
  YES_NO_OPTIONS,
  VEGETABLE_OPTIONS,
  ACTIVITY_OPTIONS,
  SNACKING_OPTIONS,
  TRANSPORT_OPTIONS,
} from "@/constants/form-options";
import type { AnalyseFormPropsType } from "@/types";

const TOTAL_FIELDS = 16;

export function AnalyseForm({
  form,
  onSubmit,
  isPending,
}: AnalyseFormPropsType) {
  const watchedValues = useWatch({ control: form.control });

  // Calculate progress
  const filledFields = Object.values(watchedValues).filter(
    (v) => v !== undefined && v !== null && String(v).trim() !== "",
  ).length;
  const progress = Math.round((filledFields / TOTAL_FIELDS) * 100);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-neutral-400">Form Progress</span>
            <span className="text-emerald-500 font-medium">{progress}%</span>
          </div>
          <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-lg text-white font-medium border-b border-neutral-800 pb-3">
            Basic Information
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="Age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    Age
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="25"
                      className="bg-neutral-900 border-neutral-800 focus:border-emerald-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    Gender
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-neutral-900 border-neutral-800">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GENDER_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    Height (m)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="1.75"
                      className="bg-neutral-900 border-neutral-800 focus:border-emerald-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    Weight (kg)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="70"
                      className="bg-neutral-900 border-neutral-800 focus:border-emerald-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Diet */}
        <div className="space-y-4">
          <h2 className="text-lg text-white font-medium border-b border-neutral-800 pb-3">
            Diet & Nutrition
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="FAVC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    High-Calorie Foods
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-neutral-900 border-neutral-800">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {YES_NO_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="FCVC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    Vegetable Intake
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-neutral-900 border-neutral-800">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {VEGETABLE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="NCP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    Meals per Day
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="3"
                      className="bg-neutral-900 border-neutral-800 focus:border-emerald-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CH2O"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    Water (L/day)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="2.0"
                      className="bg-neutral-900 border-neutral-800 focus:border-emerald-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CAEC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    Snacking
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-neutral-900 border-neutral-800">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SNACKING_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="SCC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    Calorie Counting
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-neutral-900 border-neutral-800">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {YES_NO_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Lifestyle */}
        <div className="space-y-4">
          <h2 className="text-lg text-white font-medium border-b border-neutral-800 pb-3">
            Lifestyle
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="FAF"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    Physical Activity
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-neutral-900 border-neutral-800">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ACTIVITY_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="TUE"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    Screen Time (hrs)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1"
                      min="0"
                      max="2"
                      step="0.1"
                      className="bg-neutral-900 border-neutral-800 focus:border-emerald-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="MTRANS"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    Transportation
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-neutral-900 border-neutral-800">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSPORT_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CALC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    Alcohol
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-neutral-900 border-neutral-800">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ALCOHOL_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="SMOKE"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    Smoking
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-neutral-900 border-neutral-800">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {YES_NO_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="family_history_with_overweight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400 text-sm">
                    Family History
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-neutral-900 border-neutral-800">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {YES_NO_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <Button
            type="submit"
            disabled={isPending || progress < 100}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {isPending ? "Analysing..." : "Get Analysis →"}
          </Button>
          {progress < 100 && (
            <span className="text-sm text-neutral-500">
              Complete all fields to continue
            </span>
          )}
        </div>
      </form>
    </Form>
  );
}
