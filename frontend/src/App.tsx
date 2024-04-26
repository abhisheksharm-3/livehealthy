// App.js
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import Loader from './components/Loader';

// Lazy load the route components
const LandingScreen = React.lazy(() => import('./screens/LandingScreen'));
const AnalyseScreen = React.lazy(() => import('./screens/AnalyseScreen'));
const StatsScreen = React.lazy(() => import('./screens/StatsScreen'));
const AboutScreen = React.lazy(() => import('./screens/AboutScreen'));

const App = () => {
  return (
    <BaseLayout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/analyse" element={<AnalyseScreen />} />
          <Route path="/stats" element={<StatsScreen />} />
          <Route path="/about" element={<AboutScreen />} />
        </Routes>
      </Suspense>
    </BaseLayout>
  );
};

export default App;