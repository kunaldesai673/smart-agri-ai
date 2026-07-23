import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext";
import Navbar from "./components/Navbar";
import FloatingLanguageSelector from "./components/FloatingLanguageSelector"; // 👈 Global floating widget

import Home from "./pages/Home";
import PricePrediction from "./pages/PricePrediction";
import DiseaseDetection from "./pages/DiseaseDetection";
import CropHistoricalData from "./pages/CropHistoricalData";
import About from "./pages/About";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative selection:bg-purple-200">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/historical-data" element={<CropHistoricalData />} />
              <Route path="/price-prediction" element={<PricePrediction />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>

          {/* 🌐 Global Floating Language Selector (Appears on every page!) */}
          <FloatingLanguageSelector />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;