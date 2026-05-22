import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Importing all pages including your brand new Home landing page
import Home from "./pages/Home";
import PricePrediction from "./pages/PricePrediction";
import DiseaseDetection from "./pages/DiseaseDetection";
import CropGuide from "./pages/CropGuide";
import About from "./pages/About";

function App() {
  return (
    <>
      {/* Navbar always visible on all pages */}
      <Navbar />

      {/* Page Routing - Seamlessly mapping out your entire platform flow */}
      <Routes>
        {/* 1. Home is now your absolute first landing entrance page */}
        <Route path="/" element={<Home />} /> 
        
        {/* 2. Dashboard houses your Crop Specific Care & Sowing Guides */}
        <Route path="/crop-guide" element={<CropGuide />} />
        
        {/* 3. Matches your smart pricing model assistant */}
        <Route path="/price-prediction" element={<PricePrediction />} />
        
        {/* 4. Matches your deep learning leaf diagnostics doctor */}
        <Route path="/disease-detection" element={<DiseaseDetection />} />
        
        {/* 5. About info panel description block */}
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;