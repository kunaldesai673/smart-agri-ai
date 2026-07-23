import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext"; // 👈 Import global language hook

export default function Home() {
  const navigate = useNavigate();
  const { globalLang } = useLanguage(); // 👈 Access global language state
  const [hoveredCard, setHoveredCard] = useState(null);

  const text = {
    en: {
      welcome: "Smart Agri AI",
      subtitle: "A clean, data-driven digital assistant built specifically for farmers in the Belgaum region. Select a tool below to begin your analysis.",
      priceTitle: "Mandi Price Flow",
      priceDesc: "Track and predict local crop market rates. Our platform merges historical transactional logs with rainfall metrics to project future commodity trends.",
      priceBtn: "Check Price Trends ➔",
      priceBadge: "Market Data",
      leafTitle: "Crop Leaf Doctor",
      leafDesc: "Diagnose plant health problems instantly. Take or upload a photo of a crop leaf to scan for active disease signatures and view targeted cures.",
      leafBtn: "Scan Crop Health ➔",
      leafBadge: "AI Diagnostics"
    },
    kn: {
      welcome: "Smart Agri AI",
      subtitle: "ಬೆಳಗಾವಿ ಪ್ರಾಂತ್ಯದ ಕೃಷಿಕರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾದ ಸರಳ ಮತ್ತು ಡೇಟಾ-ಚಾಲಿತ ಡಿಜಿಟಲ್ ಸಹಾಯಕ. ನಿಮ್ಮ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಪ್ರಾರಂಭಿಸಲು ಕೆಳಗಿನ ಉಪಕರಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      priceTitle: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಹರಿವು",
      priceDesc: "ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ದರಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ಮುನ್ಸೂಚನೆ ಪಡೆಯಿರಿ. ಭವಿಷ್ಯದ ಬೆಲೆ ಪ್ರವೃತ್ತಿಗಳನ್ನು ಲೆಕ್ಕಹಾಕಲು ನಮ್ಮ ವ್ಯವಸ್ಥೆಯು ಮಳೆ ಮಾದರಿಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ.",
      priceBtn: "ಬೆಲೆ ಪ್ರವೃತ್ತಿ ಪರಿಶೀಲಿಸಿ ➔",
      priceBadge: "ಮಾರುಕಟ್ಟೆ ಡೇಟಾ",
      leafTitle: "ಬೆಳೆ ಎಲೆ ವೈದ್ಯರು",
      leafDesc: "ಬೆಳೆ ಆರೋಗ್ಯದ ಸಮಸ್ಯೆಗಳನ್ನು ತಕ್ಷಣವೇ ಪತ್ತೆಹಚ್ಚಿ. ರೋಗದ ಲಕ್ಷಣಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ಮತ್ತು ಸೂಕ್ತ ಪರಿಹಾರಗಳನ್ನು ನೋಡಲು ಎಲೆಯ ಫೋಟೋವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ.",
      leafBtn: "ಬೆಳೆ ಆರೋಗ್ಯ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ➔",
      leafBadge: "AI ರೋಗನಿರ್ಣಯ"
    },
    hi: {
      welcome: "Smart Agri AI",
      subtitle: "बेलगावी क्षेत्र के किसानों के लिए विशेष रूप से बनाया गया एक सरल और डेटा-संचालित डिजिटल सहायक। अपना विश्लेषण शुरू करने के लिए नीचे एक टूल चुनें।",
      priceTitle: "मंडी मूल्य प्रवाह",
      priceDesc: "स्थानीय मंडी दरों को ट्रैक और अनुमानित करें। यह प्लेटफॉर्म भविष्य के रुझानों का अनुमान लगाने के लिए ऐतिहासिक डेटा को वर्षा चक्र के साथ जोड़ता है।",
      priceBtn: "मूल्य रुझान जांचें ➔",
      priceBadge: "बाजार डेटा",
      leafTitle: "फसल पत्ता डॉक्टर",
      leafDesc: "पौधों के स्वास्थ्य की समस्याओं का तुरंत निदान करें। सक्रिय रोग के लक्षणों को स्कैन करने और उपचार देखने के लिए फसल की पत्ती का फोटो लें या अपलोड करें।",
      leafBtn: "स्वास्थ्य को स्कैन करें ➔",
      leafBadge: "AI निदान"
    },
    mr: {
      welcome: "Smart Agri AI",
      subtitle: "बेळगाव परिसरातील शेतकऱ्यांसाठी खास तयार केलेला एक सोपा आणि डेटा-आधारित डिजिटल सहाय्यक. आपले विश्लेषण सुरू करण्यासाठी खालील साधन निवडा.",
      priceTitle: "मंडी भाव प्रवाह",
      priceDesc: "स्थानिक बाजारभावाचा मागोवा घ्या आणि अंदाज लावा. भविष्यातील किमती कल मोजण्यासाठी आमची प्रणाली पावसाच्या नमुन्यांसह जुन्या नोंदी तपासते.",
      priceBtn: "किमतींचे ट्रेंड तपासा ➔",
      priceBadge: "बाजार डेटा",
      leafTitle: "पीक पान डॉक्टर",
      leafDesc: "झाडांच्या आरोग्याची समस्या त्वरित शोधा. रोगाचे प्रमाण स्कॅन करण्यासाठी आणि त्याचे उपाय शोधण्यासाठी पिकाच्या पाण्याचा फोटो काढा किंवा अपलोड करा.",
      leafBtn: "आरोग्य स्कॅन करा ➔",
      leafBadge: "AI निदान"
    }
  };

  const current = text[globalLang] || text.en;

  const getCardStyle = (cardName) => {
    // Disable hover scaling on mobile screens for cleaner touch interactions
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return { transform: "none", zIndex: 1 };
    }
    if (hoveredCard === null) {
      return { transform: "scale(1)", zIndex: 1 };
    }
    if (hoveredCard === cardName) {
      return { transform: "scale(1.02) translateY(-2px)", zIndex: 10 };
    }
    return { transform: "scale(0.98)", zIndex: 1 };
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#eef2ff] via-[#f5f3ff] to-[#faf5ff] text-slate-900 font-sans antialiased relative flex flex-col justify-between overflow-x-hidden selection:bg-purple-200">
      
      {/* SOFT AMBIENT GLOW EFFECTS (Resized for mobile to prevent overflow) */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-br from-purple-200/40 to-blue-200/20 blur-[80px] sm:blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-gradient-to-tr from-indigo-100/40 to-pink-100/20 blur-[80px] sm:blur-[100px] pointer-events-none rounded-full" />

      {/* TOP COMPACT BRAND BAR */}
      <header className="max-w-5xl mx-auto w-full pt-4 sm:pt-8 px-4 sm:px-6 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2 bg-white/75 backdrop-blur-md border border-white/80 px-3 py-1.5 rounded-2xl shadow-xs transition-transform duration-300 hover:scale-105">
          <span className="text-emerald-600 animate-pulse text-xs">🍃</span>
          <span className="text-xs font-black tracking-tight text-slate-900 uppercase">
            Smart Agri AI
          </span>
        </div>
      </header>

      {/* MAIN CONTAINER BOX */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 my-auto py-6 sm:py-4 relative z-10 flex flex-col justify-center flex-grow">
        
        {/* HERO STATEMENT */}
        <div className="max-w-2xl mx-auto pb-6 sm:pb-8 text-center space-y-3">
          <h1 className="text-2xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight flex items-center justify-center gap-2 sm:gap-3">
            <span className="inline-block text-emerald-600 animate-[bounce_2s_infinite] text-3xl sm:text-4xl">🍃</span>
            <span>{current.welcome}</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-base max-w-lg mx-auto leading-relaxed font-medium px-2">
            {current.subtitle}
          </p>
        </div>

        {/* BENTO CONTAINER GRID */}
        <main className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 w-full items-stretch">
          
          {/* CARD A: MANDI PRICE FLOW */}
          <div 
            onMouseEnter={() => setHoveredCard("price")}
            onMouseLeave={() => setHoveredCard(null)}
            style={getCardStyle("price")}
            className="md:col-span-6 bg-white/80 backdrop-blur-xl border border-white/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 ease-out flex flex-col justify-between group"
          >
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-lg sm:text-xl shadow-xs group-hover:scale-110 transition-transform duration-500">
                  📈
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg">
                  {current.priceBadge}
                </span>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">{current.priceTitle}</h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {current.priceDesc}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate("/price-prediction")}
              className="mt-6 sm:mt-8 w-full bg-slate-900 hover:bg-black text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all duration-300 tracking-wide shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              {current.priceBtn}
            </button>
          </div>

          {/* CARD B: CROP LEAF DOCTOR */}
          <div 
            onMouseEnter={() => setHoveredCard("leaf")}
            onMouseLeave={() => setHoveredCard(null)}
            style={getCardStyle("leaf")}
            className="md:col-span-6 bg-white/80 backdrop-blur-xl border border-white/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 ease-out flex flex-col justify-between group"
          >
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-lg sm:text-xl shadow-xs group-hover:scale-110 transition-transform duration-500">
                  🍃
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                  {current.leafBadge}
                </span>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">{current.leafTitle}</h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {current.leafDesc}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate("/disease-detection")}
              className="mt-6 sm:mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all duration-300 tracking-wide shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              {current.leafBtn}
            </button>
          </div>

        </main>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-purple-100/60 py-4 sm:py-6 px-4 sm:px-6 bg-white/40 backdrop-blur-md relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] font-medium text-slate-500 gap-2 text-center sm:text-left">
          <span>Belagavi Agricultural Analytics Core • 2026</span>
          <span className="font-mono bg-white/70 border border-white/60 px-2.5 py-1 rounded-md text-slate-700 shadow-2xs">React 18 + Tailwind UI</span>
        </div>
      </footer>

    </div>
  );
}