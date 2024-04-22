import Footer from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";

const StatsScreen = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-between">
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-bold mb-6">Water Quality Stats</h1>
        <div className="p-6 rounded-lg shadow-md max-w-md">
          <div className="mb-4">
            <p className="text-lg font-semibold">pH Level: <span className="text-gray-400">7.2</span></p>
            <p className="text-sm text-gray-300">A measure of how acidic or basic the water is. Ideally between 6.5 - 8.5</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Temperature: <span className="text-gray-400">20°C</span></p>
            <p className="text-sm text-gray-300">The temperature of the water. Varies depending on the environment.</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Turbidity: <span className="text-gray-400">5 NTU</span></p>
            <p className="text-sm text-gray-300">A measure of water clarity. Higher turbidity can indicate pollution.</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Dissolved Oxygen: <span className="text-gray-400">8 mg/L</span></p>
            <p className="text-sm text-gray-300">The amount of oxygen dissolved in the water. Crucial for aquatic life.</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Total Dissolved Solids: <span className="text-gray-400">150 ppm</span></p>
            <p className="text-sm text-gray-300">The total amount of dissolved substances in the water. Higher levels may indicate pollution.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StatsScreen;
