import Footer from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MultiStepLoader as Loader } from "../components/ui/multi-step-loader";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type PredictionKey = 2 | 3 | 4 | 5 | 6 | 7 | 8;

const predictionMapping: { [key in PredictionKey]?: string } = {
  2: "Normal Weight",
  3: "Overweight Level I",
  4: "Overweight Level II",
  5: "Obesity Level I",
  6: "Insufficient Weight",
  7: "Obesity Level II",
  8: "Obesity Level III",
};

type ValueMapping = { label: string; values: { [key: number]: string } };
type DescriptiveLabels = {
  [key: string]: string | ValueMapping;
};

const descriptiveLabels: DescriptiveLabels = {
  Age: "Age",
  Gender: { label: "Gender", values: { 2: "Female", 3: "Male" } },
  Height: "Height (cm)",
  Weight: "Weight (kg)",
  CALC: {
    label: "Alcohol Consumption",
    values: { 2: "Never", 3: "Sometimes", 4: "Frequently", 5: "Almost Daily" },
  },
  FAVC: {
    label: "Frequent High-Calorie Food Intake",
    values: { 2: "No", 3: "Yes" },
  },
  FCVC: {
    label: "Vegetable Intake in Meals",
    values: { 1: "Never", 2: "Sometimes", 3: "Always" },
  },
  NCP: "Number of Main Meals per Day",
  SCC: { label: "Calorie Counting Habit", values: { 2: "No", 3: "Yes" } },
  SMOKE: { label: "Smoking Status", values: { 2: "No", 3: "Yes" } },
  CH2O: "Daily Water Intake (liters)",
  family_history_with_overweight: {
    label: "Family History of Overweight",
    values: { 2: "No", 3: "Yes" },
  },
  FAF: {
    label: "Weekly Physical Activity Frequency",
    values: { 0: "Never", 1: "Sometimes", 2: "Frequently", 3: "Daily" },
  },
  TUE: "Daily Technology Use (hours)",
  CAEC: {
    label: "Snacking Between Meals",
    values: { 2: "Never", 3: "Sometimes", 4: "Frequently", 5: "Always" },
  },
  MTRANS: {
    label: "Main Mode of Transportation",
    values: {
      2: "Car",
      3: "Motorbike",
      4: "Bicycle",
      5: "Public Transport",
      6: "Walking",
    },
  },
};

const formSchema = z.object({
  Age: z.coerce
    .number()
    .min(0, { message: "Age must be at least 0." })
    .max(120, { message: "Age must be no more than 120." }),
  Gender: z.coerce.number(),
  Height: z.coerce
    .number()
    .min(50, { message: "Height must be at least 50 cm." })
    .max(300, { message: "Height must be no more than 300 cm." }),
  Weight: z.coerce
    .number()
    .min(10, { message: "Weight must be at least 10 kg." })
    .max(500, { message: "Weight must be no more than 500 kg." }),
  CALC: z.coerce.number(),
  FAVC: z.coerce.number(),
  FCVC: z.coerce.number(),
  NCP: z.coerce
    .number()
    .min(1, { message: "NCP must be at least 1." })
    .max(6, { message: "NCP must be no more than 6." }), // Assuming 1-6 are valid codes
  SCC: z.coerce.number(),
  SMOKE: z.coerce.number(),
  CH2O: z.coerce
    .number()
    .min(0.1, { message: "CH2O must be at least 0.1 liters." })
    .max(20, { message: "CH2O must be no more than 20 liters." }),
  family_history_with_overweight: z.coerce.number(),
  FAF: z.coerce
    .number()
    .min(0, { message: "FAF must be at least 0 hours per week." })
    .max(50, { message: "FAF must be no more than 50 hours per week." }),
  TUE: z.coerce
    .number()
    .min(0, { message: "TUE must be at least 0 hours per day." })
    .max(24, { message: "TUE must be no more than 24 hours per day." }),
  CAEC: z.coerce.number(),
  MTRANS: z.coerce.number(),
});

const AnalyseScreen = () => {
  const [showResult, setShowResult] = useState(false);
  const [predictionLabel, setPredictionLabel] = useState<string>("");
  const [requestData, setRequestData] = useState({});
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  type dataType = z.infer<typeof formSchema>;

  const loadingStates = [
    {
      text: "Crunching some numbers...and maybe some lettuce too.",
    },
    {
      text: "Finding out if carrot sticks are better than mozzarella sticks.",
    },
    {
      text: "Running virtual laps around the server room.",
    },
    {
      text: "Consulting with my gym buddy...just kidding, it’s another algorithm.",
    },
    {
      text: "Deciphering your data, one snack at a time.",
    },
    {
      text: "On a coffee break—just like your metabolism.",
    },
    {
      text: "Flexing our analytical muscles.",
    },
    {
      text: "Are we there yet? Almost… Just a few bytes away!",
    },
    {
      text: "Hang tight! We’re almost done measuring your fitness data.",
    },
    {
      text: "Stepping on the data scale...hold tight.",
    },
    {
      text: "Adjusting our virtual fitness trackers.",
    },
    {
      text: "Tying the laces on our running algorithms.",
    },
    {
      text: "Pumping up the last set of your data reps.",
    },
    {
      text: "Your patience burns more calories than you think!",
    },
    {
      text: "Loading... and no, you can't skip this by pressing Alt+F4.",
    },
  ];

  // 2. Define a submit handler.
  const onSubmit = async (values: dataType) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/analyse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: { ...values } }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (
        result &&
        result.prediction_result &&
        result.prediction_result.length > 0
      ) {
        const predictionIndex = result.prediction_result[0];
        const predictionLabel =
          predictionMapping[predictionIndex as PredictionKey];
        setPredictionLabel(predictionLabel!);
        setShowResult(true);
      } else {
        throw new Error("Invalid prediction result");
      }

      setRequestData(values);
      console.log(result);
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setLoading(false); // End loading
    }
  };
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-between overflow-hidden pb-10 lg:pb-0">
      <Loader
        loadingStates={loadingStates}
        loading={loading}
        duration={3500}
        loop={false}
      />
      <NavbarComponent />
      {!showResult ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 overflow-scroll scrollbar-hide container pt-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-8">
              <FormField
                control={form.control}
                name="Age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="How many candles on your cake?"
                        {...field}
                        type="number"
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
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Your Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="3">Male</SelectItem>
                        <SelectItem value="2">Female</SelectItem>
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
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Altitude (Height in cm)"
                        {...field}
                        type="number"
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
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Gravity (Weight in Kg)"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="CALC"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How often do you drink alcohol?</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Cheers! How often?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2">Never</SelectItem>
                        <SelectItem value="3">Sometimes</SelectItem>
                        <SelectItem value="4">Frequently</SelectItem>
                        <SelectItem value="5">Almost Daily</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="FAVC"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Do you eat high caloric food frequently?
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Calorie Fest—Yay or Nay?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2">No</SelectItem>
                        <SelectItem value="3">Yes</SelectItem>
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
                    <FormLabel>
                      Do you usually eat vegetables in your meals?{" "}
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Greens on Your Plate?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Never</SelectItem>
                        <SelectItem value="2">Sometimes</SelectItem>
                        <SelectItem value="3">Always</SelectItem>
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
                    <FormLabel>
                      {" "}
                      How many main meals do you have daily?
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Meal Deal (How Many?)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SCC"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Do you monitor the calories you eat daily?{" "}
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Watching Those Numbers?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2">No</SelectItem>
                        <SelectItem value="3">Yes</SelectItem>
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
                    <FormLabel>Do you smoke?</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Puff or Pass? (Smoking)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2">No</SelectItem>
                        <SelectItem value="3">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="CH2O"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How much water do you drink daily?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Hydration Station (Liters)"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="family_history_with_overweight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Has a family member suffered or suffers from overweight?
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Genes Got Weight?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2">No</SelectItem>
                        <SelectItem value="3">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="FAF"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      How often do you have physical activity?{" "}
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sweat Score" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Never</SelectItem>
                        <SelectItem value="1">Sometimes</SelectItem>
                        <SelectItem value="2">Frequently</SelectItem>
                        <SelectItem value="3">Daily</SelectItem>
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
                    <FormLabel>
                      How much time do you use technological devices?
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tech Tally (Daily Hours)"
                        {...field}
                        type="number"
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
                    <FormLabel>Do you eat any food between meals?</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Between-Meal Bite Rate" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2">Never</SelectItem>
                        <SelectItem value="3">Sometimes</SelectItem>
                        <SelectItem value="4">Frequently</SelectItem>
                        <SelectItem value="5">Always</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="MTRANS"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Which transportation do you usually use?
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="How Do You Roll?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2">Car</SelectItem>
                        <SelectItem value="3">Motorbike</SelectItem>
                        <SelectItem value="4">Cycle</SelectItem>
                        <SelectItem value="5">Public Transport</SelectItem>
                        <SelectItem value="6">Walking</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" color="primary" isLoading={loading}>
              Start My Health Audit
            </Button>
          </form>
        </Form>
      ) : (
        <div className="text-center flex flex-col gap-4 items-center container py-6 overflow-hidden">
          {showResult && (
            <div className="w-screen flex flex-col items-center justify-between overflow-scroll pb-10 lg:pb-0 scrollbar-hide">
              <div className="container flex flex-col items-center justify-center flex-1 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">
                  Ready or not, here&apos;s what we&apos;ve crunched out for
                  you!
                </h1>

                {predictionLabel ? (
                  <h2
                    className={`text-2xl font-semibold text-center mb-4 ${
                      predictionLabel.includes("Obesity") ||
                      predictionLabel.includes("Overweight")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {predictionLabel.includes("Obesity") ||
                    predictionLabel.includes("Overweight")
                      ? "Warning Bells! 🚨 Time to rethink some habits."
                      : "You're in the Clear! 🌟 Keep up the Great Work!"}
                  </h2>
                ) : null}

                <p className="mb-6">
                  {predictionLabel
                    ? `Looks like you’re steering towards: ${predictionLabel} – ${
                        predictionLabel.includes("Obesity") ||
                        predictionLabel.includes("Overweight")
                          ? "Time for a course correction?"
                          : "Keep up the Great Work!"
                      }`
                    : "Loading your results... Please wait."}
                </p>

                {showResult && (
                  <div className="shadow-lg rounded-lg p-6 max-w-3xl w-full">
                    <h3 className="text-lg font-semibold mb-4">
                      Quick rewind: Here&apos;s the data you shared with us:
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                      {Object.entries(requestData).map(([key, value]) => {
                        const item = descriptiveLabels[key];
                        const label =
                          typeof item === "object" ? item.label : item;
                        const valueDescription =
                          typeof item === "object" &&
                          item.values &&
                          typeof value === "number"
                            ? item.values[value]
                            : value;
                        return (
                          <li key={key} className="rounded p-2">
                            <strong>{label || key}:</strong>{" "}
                            {String(valueDescription)}
                          </li>
                        );
                      })}
                    </ul>
                    <div className="mt-6">
                      <Button
                        onClick={() => {
                          setShowResult(false);
                          form.reset(); // Assuming resetForm is a function that resets the form
                        }}
                        color="warning"
                      >
                        Roll the Dice Again on Your Health Analysis!
                      </Button>
                    </div>
                  </div>
                )}

                {!showResult && (
                  <div className="text-center text-xl">
                    <p>Just a moment while we compute your health stats...</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AnalyseScreen;
