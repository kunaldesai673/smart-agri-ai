import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("en");

  const text = {
    en: {
      welcome: "Welcome to Smart Agri AI",
      subtitle: "A clean, data-driven digital assistant built specifically for farmers in the Belagavi region. Select a tool below to begin your analysis.",
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
      welcome: "ಸ್ಮಾರ್ಟ್ ಅಗ್ರಿ AI ಗೆ ಸುಸ್ವಾಗत",
      subtitle: "ಬೆಳಗಾವಿ ಪ್ರಾಂತ್ಯದ ಕೃಷಿಕರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾದ ಸರಳ ಮತ್ತು ಡೇಟಾ-ಚಾಲಿತ ಡಿಜಿಟಲ್ ಸಹಾಯಕ. ನಿಮ್ಮ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಪ್ರಾರಂಭಿಸಲು ಕೆಳಗಿನ ಉಪಕರಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      priceTitle: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಹರಿವು",
      priceDesc: "ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ದರಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ಮುನ್ಸೂಚನೆ ಪಡೆಯಿರಿ. ಭವಿಷ್ಯದ ಬೆಲೆ ಪ್ರವृತ್ತಿಗಳನ್ನು ಲೆಕ್ಕಹಾಕಲು ನಮ್ಮ ವ್ಯವಸ್ಥೆಯು ಮಳೆ ಮಾದರಿಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ.",
      priceBtn: "ಬೆಲೆ ಪ್ರವೃತ್ತಿ ಪರಿಶೀಲಿಸಿ ➔",
      priceBadge: "ಮಾರುಕಟ್ಟೆ ಡೇಟಾ",
      leafTitle: "ಬೆಳೆ ಎಲೆ ವೈದ್ಯರು",
      leafDesc: "ಬೆಳೆ ಆರೋಗ್ಯದ ಸಮಸ್ಯೆಗಳನ್ನು ತಕ್ಷಣವೇ ಪತ್ತೆಹಚ್ಚಿ. ರೋಗದ ಲಕ್ಷಣಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ಮತ್ತು ಸೂಕ್ತ ಪರಿಹಾರಗಳನ್ನು ನೋಡಲು ಎಲೆಯ ಫೋಟೋವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ.",
      leafBtn: "ಬೆಳೆ ಆರೋಗ್ಯ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ➔",
      leafBadge: "AI ರೋಗನಿರ್ಣಯ"
    },
    hi: {
      welcome: "स्मार्ट एग्री AI में आपका स्वागत है",
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
      welcome: "स्मार्ट ॲग्री AI मध्ये आपले स्वागत आहे",
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

  const current = text[lang];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased relative selection:bg-emerald-100 flex flex-col justify-between">
      
      {/* CLEAN BACKGROUND DOT PATTERN (SUBTLE & PROFESSIONAL) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      {/* TOP COMPACT BRAND & LANGUAGE BAR */}
      <header className="max-w-4xl mx-auto w-full pt-8 px-6 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-black tracking-tight text-slate-800 uppercase">Smart Agri AI</span>
        </div>

        {/* NOTION-STYLE LANGUAGE SELECTOR */}
        <div className="bg-slate-100 p-0.5 rounded-xl flex items-center border border-slate-200">
          {["en", "kn", "hi", "mr"].map((item) => (
            <button
              key={item}
              onClick={() => setLang(item)}
              className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${
                lang === item
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/40"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      {/* HERO STATEMENT */}
      <div className="max-w-3xl mx-auto pt-16 pb-12 px-6 text-center space-y-3 relative z-10">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {current.welcome}
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
          {current.subtitle}
        </p>
      </div>

      {/* SPLIT MINIMALIST FEATURE CONTAINER */}
      <main className="max-w-4xl mx-auto w-full px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 flex-grow">
        
        {/* CARD A: MANDI PRICE FLOW */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xl shadow-inner">
                📈
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md">
                {current.priceBadge}
              </span>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-black text-slate-800 tracking-tight">{current.priceTitle}</h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                {current.priceDesc}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => navigate("/price-prediction")}
            className="mt-8 w-full bg-slate-900 hover:bg-black text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all tracking-wide shadow-sm"
          >
            {current.priceBtn}
          </button>
        </div>

        {/* CARD B: CROP LEAF DOCTOR */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xl shadow-inner">
                🍃
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-md">
                {current.leafBadge}
              </span>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-black text-slate-800 tracking-tight">{current.leafTitle}</h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                {current.leafDesc}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => navigate("/disease-detection")}
            className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all tracking-wide shadow-sm"
          >
            {current.leafBtn}
          </button>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] font-medium text-slate-400 gap-2">
          <span>Belagavi Agricultural Analytics Core • 2026</span>
          <span className="font-mono">React 18 + Tailwind UI</span>
        </div>
      </footer>

    </div>
  );
}