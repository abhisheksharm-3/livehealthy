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
  const [isHealthResult, setHealthResult] = useState({});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/analyse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data": {
              "Age": 30,
              "CAEC": 2,
              "CALC": 2,
              "CH2O": 3,
              "FAF": 4,
              "FAVC": 2,
              "FCVC": 3,
              "Gender": 2,
              "Height": 175,
              "MTRANS": 4,
              "NCP": 3,
              "SCC": 3,
              "SMOKE": 2,
              "TUE": 1,
              "Weight": 65,
              "family_history_with_overweight": 2
          }
      })
      });

      const result = await response.json();
      setHealthResult(result);
      setShowResult(true);
      console.log(result);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
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
        <div className="space-y-4 max-w-2xl text-black">
    <h2 className="text-2xl font-semibold text-center">Analysis Report</h2>
    <ul className="list-disc bg-white shadow-md rounded-lg p-4">
      {Object.entries(isHealthResult).map(([key, value]) => (
        <li key={key}>
          <strong>{key.replace(/_/g, ' ')}:</strong> {value.toString()}
        </li>
      ))}
    </ul>
    <Button onClick={() => setShowResult(false)} color="primary">
      New Analysis
    </Button>
  </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AnalyseScreen;
