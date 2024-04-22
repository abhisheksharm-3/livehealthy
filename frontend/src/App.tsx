import { Route, Routes } from "react-router-dom";
import BaseLayout from "./BaseLayout";
import LandingScreen from "./screens/LandingScreen";
import AnalyseScreen from "./screens/AnalyseScreen";
import StatsScreen from "./screens/StatsScreen";
import AboutScreen from "./screens/AboutScreen";

const App = () => {
  return (
      <BaseLayout>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/analyse" element={<AnalyseScreen />} />
          <Route path="/stats" element={<StatsScreen />} />
          <Route path="/about" element={<AboutScreen />} />
        </Routes>
      </BaseLayout>
  );
};

export default App;
