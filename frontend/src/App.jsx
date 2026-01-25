import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Background from "./components/Background";
import Welcome from "./pages/Welcome";
import Analyzer from "./pages/Analyzer";
import Results from "./pages/Results";

// ScrollToTop component to reset scroll on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Welcome />} />
        <Route path="/analyze" element={<Analyzer />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen text-slate-100 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden">
        <Background />
        <ScrollToTop />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;