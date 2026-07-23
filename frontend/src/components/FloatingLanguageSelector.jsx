import { useState } from "react";
import { useLanguage } from "../LanguageContext";

export default function FloatingLanguageSelector() {
  const { globalLang, setGlobalLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
    { code: 'kn', label: 'ಕನ್ನಡ', flag: '🇮🇳' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white/95 backdrop-blur-xl border-2 border-slate-950 rounded-2xl shadow-2xl p-2 w-48 space-y-1">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1">
            Select Language
          </div>
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setGlobalLang(l.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-black rounded-xl border-2 transition-all ${
                globalLang === l.code
                  ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-950/20 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </span>
              {globalLang === l.code && <span>✓</span>}
            </button>
          ))}
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-950 text-white rounded-full flex items-center justify-center border-2 border-slate-950 shadow-2xl hover:scale-105 active:scale-95 transition-all text-xl font-black group"
        title="Change Language"
      >
        <span className="group-hover:rotate-12 transition-transform">🌐</span>
      </button>
    </div>
  );
}