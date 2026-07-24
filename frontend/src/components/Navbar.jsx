import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

export default function Navbar() {
  const location = useLocation();
  const { globalLang } = useLanguage();

  // Helper to highlight the active menu item perfectly
  const isActive = (path) => location.pathname === path;

  // Multi-language labels for the navbar links
  const navText = {
    en: { home: "Home", price: "Price Flow", leaf: "Leaf Doctor", historic: "Historic Data", about: "About" },
    kn: { home: "ಮುಖಪುಟ", price: "ಬೆಲೆ ಹರಿವು", leaf: "ಎಲೆ ವೈದ್ಯರು", historic: "ಐತಿಹಾಸಿಕ ಡೇಟಾ", about: "ಬಗ್ಗೆ" },
    hi: { home: "होम", price: "मूल्य प्रवाह", leaf: "लीफ डॉक्टर", historic: "ऐतिहासिक डेटा", about: "परिचय" },
    mr: { home: "मुख्यपृष्ठ", price: "भाव प्रवाह", leaf: "पान डॉक्टर", historic: "ऐतिहासिक डेटा", about: "माहिती" }
  };

  const t = navText[globalLang] || navText.en;

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 shadow-md backdrop-blur-md bg-opacity-95 transition-all">
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-1">
          
          {/* Left Brand Identity Section */}
          <Link to="/" className="flex items-center space-x-2 shrink-0 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-md font-bold group-hover:scale-105 transition-transform">
              🌱
            </div>
            <div>
              <span className="text-sm sm:text-base font-black tracking-tight block text-slate-100">
                Smart Agri AI
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold text-emerald-400 block tracking-widest uppercase -mt-0.5">
                Belagaum Core
              </span>
            </div>
          </Link>

          {/* Navigation Links (Without Inline Language Selector) */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {[
              { path: "/", label: t.home, icon: "🏠" },
              { path: "/price-prediction", label: t.price, icon: "📈" },
              { path: "/disease-detection", label: t.leaf, icon: "🍃" },
              { path: "/historical-data", label: t.historic, icon: "📜" },
              { path: "/about", label: t.about, icon: "ℹ️" }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-2 sm:px-3 py-2 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-emerald-600/20 to-teal-600/20 text-emerald-400 border border-emerald-500/30 shadow-inner"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent"
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
}