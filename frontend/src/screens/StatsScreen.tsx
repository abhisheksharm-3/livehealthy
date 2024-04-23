import Footer from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";

const StatsScreen = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-between">
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-bold mb-6">Health and Obesity Stats</h1>
        <div className="p-6 rounded-lg shadow-md max-w-md">
          <div className="mb-4">
            <p className="text-lg font-semibold">Body Mass Index (BMI): <span className="text-gray-400">24</span></p>
            <p className="text-sm text-gray-300">A measure of body fat based on height and weight. Ideal range is 18.5 - 24.9</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Blood Pressure: <span className="text-gray-400">120/80 mmHg</span></p>
            <p className="text-sm text-gray-300">Indicates heart health. Normal blood pressure is typically around 120/80 mmHg.</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Cholesterol: <span className="text-gray-400">190 mg/dL</span></p>
            <p className="text-sm text-gray-300">Total cholesterol level. Desirable is below 200 mg/dL.</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Blood Glucose: <span className="text-gray-400">90 mg/dL</span></p>
            <p className="text-sm text-gray-300">Normal fasting value. Prediabetes starts at 100 mg/dL.</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Fitness Score: <span className="text-gray-400">75/100</span></p>
            <p className="text-sm text-gray-300">A composite score based on aerobic fitness, strength, and flexibility.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StatsScreen;
