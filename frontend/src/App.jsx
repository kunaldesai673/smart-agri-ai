import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext";
import Navbar from "./components/Navbar";
import FloatingLanguageSelector from "./components/FloatingLanguageSelector"; // 👈 Import the floating widget

import Home from "./pages/Home";
import PricePrediction from "./pages/PricePrediction";
import DiseaseDetection from "./pages/DiseaseDetection";
import CropHistoricalData from "./pages/CropHistoricalData";
import About from "./pages/About";

function App() {
  return (
    <LanguageProvider>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historical-data" element={<CropHistoricalData />} />
          <Route path="/price-prediction" element={<PricePrediction />} />
          <Route path="/disease-detection" element={<DiseaseDetection />} />
          <Route path="/about" element={<About />} />
        </Routes>
        
        {/* 🌐 Global Floating Language Selector (Appears on every page!) */}
        <FloatingLanguageSelector />
      </>
    </LanguageProvider>
  );
}

export default App;