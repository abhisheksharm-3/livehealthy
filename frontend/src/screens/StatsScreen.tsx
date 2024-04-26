import Footer from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";

const StatsScreen = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-between pb-10 lg:pb-0">
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center flex-1 container px-4 pt-56 scrollbar-hide overflow-scroll">
        <h1 className="text-4xl font-bold mb-6">Global Health and Obesity Stats</h1>
        <div className="rounded-lg shadow-lg max-w-4xl p-6 text-white">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Body Mass Index (BMI)</h2>
            <p className="text-lg font-semibold">World Average: <span className="text-gray-200">25</span></p>
            <p className="text-base mb-2">The global average BMI is slightly above the recommended range (18.5 - 24.9), indicating a prevalent issue of overweight in the global population.</p>
            <p className="text-sm text-gray-300">A measure of body fat based on height and weight. Ideal range is 18.5 - 24.9.</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Blood Pressure</h2>
            <p className="text-lg font-semibold">Global Normal Average: <span className="text-gray-200">127/81 mmHg</span></p>
            <p className="text-base mb-2">On average, global blood pressure tends to be higher than the optimal level of 120/80 mmHg, pointing to increased risks of hypertension.</p>
            <p className="text-sm text-gray-300">Indicates heart health. Normal blood pressure is typically around 120/80 mmHg.</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Cholesterol</h2>
            <p className="text-lg font-semibold">Average Level Worldwide: <span className="text-gray-200">200 mg/dL</span></p>
            <p className="text-base mb-2">The global average for total cholesterol hovers around the high end of the desirable scale, which can be a major risk factor for heart disease.</p>
            <p className="text-sm text-gray-300">Total cholesterol level. Desirable is below 200 mg/dL.</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Blood Glucose</h2>
            <p className="text-lg font-semibold">Global Average: <span className="text-gray-200">104 mg/dL</span></p>
            <p className="text-base mb-2">This average is indicative of a rising prevalence of prediabetes and diabetes worldwide.</p>
            <p className="text-sm text-gray-300">Normal fasting value. Prediabetes starts at 100 mg/dL.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Fitness Score</h2>
            <p className="text-lg font-semibold">Global Average: <span className="text-gray-200">60/100</span></p>
            <p className="text-base mb-2">Reflects general fitness levels around the world, showing significant room for improvement in the global population’s physical activity and fitness.</p>
            <p className="text-sm text-gray-300">A composite score based on aerobic fitness, strength, and flexibility.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StatsScreen;
