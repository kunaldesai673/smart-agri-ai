import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // Helper to highlight the active menu item perfectly
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 shadow-md backdrop-blur-md bg-opacity-95 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Brand Identity Section */}
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white rounded-xl flex items-center justify-center text-xl shadow-md font-bold">
              🌱
            </div>
            <div>
              <span className="text-base font-black tracking-tight block text-slate-100">
                Smart Agri AI
              </span>
              <span className="text-[9px] font-bold text-emerald-400 block tracking-widest uppercase -mt-0.5">
                Belagavi Core
              </span>
            </div>
          </div>

          {/* Right Navigation Controls Links */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {[
              { path: "/", label: "Home", icon: "🏠" },
              { path: "/price-prediction", label: "Price Flow", icon: "📈" },
              { path: "/disease-detection", label: "Leaf Doctor", icon: "🍃" },
              { path: "/Crop-guide", label: "Crop Guide", icon: "📖" },
              { path: "/about", label: "About", icon: "ℹ️" }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-emerald-600/20 to-teal-600/20 text-emerald-400 border border-emerald-500/30 shadow-inner"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent"
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
}