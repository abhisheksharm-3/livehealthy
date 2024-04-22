import Footer from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  pH: z.coerce
    .number()
    .min(0)
    .max(14, { message: "pH must be between 0 and 14." }),
  Hardness: z.coerce
    .number()
    .min(0, { message: "Hardness must be a positive number." }),
  Solids: z.coerce
    .number()
    .min(0, { message: "Solids must be a positive number." }),
  Chloramines: z.coerce
    .number()
    .min(0, { message: "Chloramines must be a positive number." }),
  Sulfate: z.coerce
    .number()
    .min(0, { message: "Sulfate must be a positive number." }),
  Conductivity: z.coerce
    .number()
    .min(0, { message: "Conductivity must be a positive number." }),
  Organic_carbon: z.coerce
    .number()
    .min(0, { message: "Organic carbon must be a positive number." }),
  Trihalomethanes: z.coerce
    .number()
    .min(0, { message: "Trihalomethanes must be a positive number." }),
  Turbidity: z.coerce
    .number()
    .min(0, { message: "Turbidity must be a positive number." }),
});

const AnalyseScreen = () => {
  const [showResult, setShowResult] = useState(false);
  const [isPotable, setIsPotable] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // For demonstration purposes, let's assume water is safe if pH is between 6 and 8.
    const isSafeToDrink = values.pH >= 6 && values.pH <= 8;
    setIsPotable(isSafeToDrink);
    setShowResult(true);
    console.log(values);
  }
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-between">
      <NavbarComponent />
      {!showResult ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 overflow-scroll scrollbar-hide"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-16 mx-auto">
              <FormField
                control={form.control}
                name="pH"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>pH</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pH" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Hardness Field */}
              <FormField
                control={form.control}
                name="Hardness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hardness</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter hardness"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Solids Field */}
              <FormField
                control={form.control}
                name="Solids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Solids</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter solids"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Chloramines Field */}
              <FormField
                control={form.control}
                name="Chloramines"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chloramines</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter chloramines"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Sulfate Field */}
              <FormField
                control={form.control}
                name="Sulfate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sulfate</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter sulfate"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Conductivity Field */}
              <FormField
                control={form.control}
                name="Conductivity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conductivity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter conductivity"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Organic Carbon Field */}
              <FormField
                control={form.control}
                name="Organic_carbon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organic Carbon</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter organic carbon"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Trihalomethanes Field */}
              <FormField
                control={form.control}
                name="Trihalomethanes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trihalomethanes</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter trihalomethanes"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Turbidity Field */}
              <FormField
                control={form.control}
                name="Turbidity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Turbidity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter turbidity"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </form>
        </Form>
      ) : (
        <div className="text-center flex flex-col gap-4 items-center">
          <h2 className="text-2xl font-semibold">
            {isPotable
              ? "🚰 Good news! The water is as safe as a rubber ducky in a bubble bath! 🛁"
              : "😱 Uh-oh! Looks like the water isn't ready for a tea party just yet. 🍵"}
          </h2>
          {isPotable ? (
            <img
              src="/GIFS/safe.gif"
              alt="Safe Water GIF"
              className="w-[90%] rounded-md"
            />
          ) : (
            <img
              src="/GIFS/unsafe.gif"
              alt="Unsafe Water GIF"
              className="w-[90%] rounded-md"
            />
          )}
          <p className="text-lg">
            Thanks a million for your submission! We're on it like a fish on a
            bicycle. 🐟🚲
          </p>
          <Button
            onPress={() => {
              setShowResult(false);
            }}
            color="primary"
          >
            Click Here to Start a New Analysis! 🌊
          </Button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AnalyseScreen;
