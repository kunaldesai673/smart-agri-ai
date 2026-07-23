export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#F4FAF7] via-[#FCFCFE] to-[#F1F3FB] font-sans antialiased text-slate-800">
      
      {/* Background Soft Light Blurs */}
      <div className="absolute top-[-10%] left-[-10%] h-[450px] w-[450px] rounded-full bg-emerald-400/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[450px] w-[450px] rounded-full bg-indigo-400/10 blur-[100px] pointer-events-none" />

      {/* 🌙 PREMIUM DARK NAV BAR */}
      <nav className="bg-[#0F172A] text-white px-6 py-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#10B981] rounded-xl flex items-center justify-center text-base shadow-sm">🌿</div>
            <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Smart Agri AI
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-wider uppercase text-slate-400">
            <a href="#home" className="hover:text-white transition-colors flex items-center gap-1.5">🏠 Home</a>
            <a href="#predict" className="text-[#10B981] flex items-center gap-1.5">📈 Price Prediction</a>
            <a href="#doctor" className="hover:text-white transition-colors flex items-center gap-1.5">🌿 Disease Detection</a>
            <a href="#guide" className="hover:text-white transition-colors flex items-center gap-1.5">📚 Crop Guide</a>
            <a href="#dashboard" className="hover:text-white transition-colors flex items-center gap-1.5">📊 Dashboard</a>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 font-bold">⛅ 29°C</span>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs shadow-inner">👤</div>
          </div>
        </div>
      </nav>

      {/* DYNAMIC INJECTED VIEW CONTENT LAYER */}
      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">
        {children}
      </div>
    </div>
  );
}