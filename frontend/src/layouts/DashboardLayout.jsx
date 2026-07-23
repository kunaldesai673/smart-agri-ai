import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-[#F4FAF7] via-[#FCFCFE] to-[#F1F3FB] font-sans antialiased text-slate-800">
      
      {/* Background Soft Light Blurs (Resized for mobile safety) */}
      <div className="absolute top-[-10%] left-[-10%] h-[300px] sm:h-[450px] w-[300px] sm:w-[450px] rounded-full bg-emerald-400/10 blur-[85px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[300px] sm:h-[450px] w-[300px] sm:w-[450px] rounded-full bg-indigo-400/10 blur-[85px] sm:blur-[100px] pointer-events-none" />

      {/* 🌙 PREMIUM DARK NAV BAR */}
      <nav className="bg-[#0F172A] text-white px-4 sm:px-6 py-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Brand Identity */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-[#10B981] rounded-xl flex items-center justify-center text-base shadow-sm shrink-0">🌿</div>
            <span className="font-black text-base sm:text-lg tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent truncate">
              Smart Agri AI
            </span>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-xs font-bold tracking-wider uppercase text-slate-400">
            <a href="#home" className="hover:text-white transition-colors flex items-center gap-1.5">🏠 Home</a>
            <a href="#predict" className="text-[#10B981] flex items-center gap-1.5">📈 Price Prediction</a>
            <a href="#doctor" className="hover:text-white transition-colors flex items-center gap-1.5">🌿 Disease Detection</a>
            <a href="#guide" className="hover:text-white transition-colors flex items-center gap-1.5">📚 Crop Guide</a>
            <a href="#dashboard" className="hover:text-white transition-colors flex items-center gap-1.5">📊 Dashboard</a>
          </div>

          {/* Right Controls & Mobile Menu Toggle */}
          <div className="flex items-center space-x-3">
            <span className="text-xs bg-slate-800 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-700 font-bold whitespace-nowrap">⛅ 29°C</span>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs shadow-inner shrink-0">👤</div>
            
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs font-bold tracking-wider uppercase text-slate-300 animate-fade-in-up">
            <a 
              href="#home" 
              onClick={() => setIsMenuOpen(false)} 
              className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
            >
              🏠 Home
            </a>
            <a 
              href="#predict" 
              onClick={() => setIsMenuOpen(false)} 
              className="block px-3 py-2 rounded-lg bg-emerald-950/40 text-[#10B981] border border-emerald-500/20"
            >
              📈 Price Prediction
            </a>
            <a 
              href="#doctor" 
              onClick={() => setIsMenuOpen(false)} 
              className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
            >
              🌿 Disease Detection
            </a>
            <a 
              href="#guide" 
              onClick={() => setIsMenuOpen(false)} 
              className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
            >
              📚 Crop Guide
            </a>
            <a 
              href="#dashboard" 
              onClick={() => setIsMenuOpen(false)} 
              className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
            >
              📊 Dashboard
            </a>
          </div>
        )}
      </nav>

      {/* DYNAMIC INJECTED VIEW CONTENT LAYER */}
      <div className="relative z-10 max-w-7xl mx-auto p-3 sm:p-6 lg:p-10">
        {children}
      </div>
    </div>
  );
}