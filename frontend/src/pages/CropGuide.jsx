import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CropGuide() {
  const navigate = useNavigate();
  
  // Set the default selected crop card to display
  const [activeCrop, setActiveCrop] = useState("sugarcane");

  // Localized agricultural guide database for Belgaum region
  const cropGuides = {
    sugarcane: {
      name: "Sugarcane (Belagaum Region)",
      emoji: "🎋",
      color: "border-emerald-500 bg-emerald-50 text-emerald-800",
      varieties: "Co 86032, CoM 0265, Co 09004",
      spacing: "4 feet row-to-row spacing for optimal sunlight",
      timing: "October - November (Adsali) or January - February",
      water: "Heavy requirement. Drip irrigation recommended; avoid waterlogging during monsoons.",
      prevention: "Use disease-free sets. Intercrop with soybean or chickpeas to minimize Red Rot risks."
    },
    maize: {
      name: "Maize / Corn (Local APMC Zone)",
      emoji: "🌽",
      color: "border-amber-500 bg-amber-50 text-amber-800",
      varieties: "Deccan 103, Ganga 11, Bio-9681",
      spacing: "60 cm x 20 cm ridge-and-furrow method",
      timing: "June - July (Kharif) or October - November (Rabi)",
      water: "Moderate. Critical watering stages are during flowering and grain-filling phases.",
      prevention: "Rotate crops with legumes. Clean field borders to prevent Fall Armyworm infestations."
    },
    apple: {
      name: "Apple Orchards (High Elevation)",
      emoji: "🍎",
      color: "border-rose-500 bg-rose-50 text-rose-800",
      varieties: "Anna, Dorsett Golden (Low-chill varieties)",
      spacing: "3m x 3m grid for high-density setups",
      timing: "Planting during dormant winter phase (January - February)",
      water: "Consistent moisture needed during fruit development. Mulch roots to conserve water.",
      prevention: "Prune infected branches in winter. Spray lime-sulphur to combat Apple Scab vectors."
    },
    tomato: {
      name: "Tomato (Local Vegetable Belts)",
      emoji: "🍅",
      color: "border-orange-500 bg-orange-50 text-orange-800",
      varieties: "Arka Rakshak, Abhiman, Vaishnavi",
      spacing: "60 cm x 45 cm on raised nursery beds",
      timing: "May - June (Kharif) or October - November (Rabi)",
      water: "Requires regular, controlled intervals. Avoid overhead watering to reduce leaf mold bugs.",
      prevention: "Use staking to keep fruits off the muddy soil. Spray neem oil to keep whiteflies away."
    }
  };

  const currentGuide = cropGuides[activeCrop];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Feature Shortcuts Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={() => navigate("/disease-detection")}
            className="p-5 bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl shadow-md text-left transition-transform active:scale-[0.99] flex items-center justify-between group"
          >
            <div>
              <span className="text-2xl">🍃</span>
              <h3 className="font-black text-lg mt-1">Scan Sick Leaf</h3>
              <p className="text-emerald-100 text-xs mt-0.5">Check for plant diseases instantly</p>
            </div>
            <span className="text-xl opacity-60 group-hover:translate-x-1 transition-transform">➔</span>
          </button>

          <button 
            navigate
            onClick={() => navigate("/price-prediction")}
            className="p-5 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl shadow-md text-left transition-transform active:scale-[0.99] flex items-center justify-between group"
          >
            <div>
              <span className="text-2xl">📈</span>
              <h3 className="font-black text-lg mt-1">Mandi Price Flow</h3>
              <p className="text-slate-400 text-xs mt-0.5">Check future market price charts</p>
            </div>
            <span className="text-xl opacity-60 group-hover:translate-x-1 transition-transform">➔</span>
          </button>
        </div>

        {/* CROP SPECIFIC CARE HANDBOOK MODULE */}
        <div className="bg-white rounded-[24px] shadow-xl border border-slate-100 p-5 sm:p-7 space-y-6">
          
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
              💡 Crop Specific Care Guides
            </h2>
          </div>

          {/* Selector Switch Tabs Row */}
          <div className="grid grid-cols-4 gap-2">
            {Object.keys(cropGuides).map((key) => (
              <button
                key={key}
                onClick={() => setActiveCrop(key)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  activeCrop === key 
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold shadow-sm scale-[1.02]' 
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="text-xl sm:text-2xl">{cropGuides[key].emoji}</span>
                <span className="text-[10px] sm:text-xs font-black uppercase mt-1 tracking-wider hidden sm:block">
                  {key}
                </span>
              </button>
            ))}
          </div>

          {/* Active Guide Content Display Pane */}
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center space-x-2">
              <span className="text-xl">{currentGuide.emoji}</span>
              <h3 className="text-lg font-black text-slate-800">{currentGuide.name}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {/* Sowing Metric Card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5">
                <span className="font-black text-slate-700 block uppercase tracking-wide text-[11px] text-emerald-700">
                  🚜 Optimal Sowing Guidelines
                </span>
                <div>• <span className="font-bold text-slate-600">Top Varieties:</span> {currentGuide.varieties}</div>
                <div>• <span className="font-bold text-slate-600">Best Timing:</span> {currentGuide.timing}</div>
                <div>• <span className="font-bold text-slate-600">Row Spacing:</span> {currentGuide.spacing}</div>
              </div>

              {/* Maintenance Card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                <div className="space-y-1">
                  <span className="font-black text-slate-700 block uppercase tracking-wide text-[11px] text-blue-700">
                    💧 Irrigation & Fertilizer Management
                  </span>
                  <p className="text-slate-600 text-xs leading-relaxed">{currentGuide.water}</p>
                </div>

                <div className="space-y-1 border-t border-slate-200/60 pt-2">
                  <span className="font-black text-slate-700 block uppercase tracking-wide text-[11px] text-rose-700">
                    🛡️ Common Disease Prevention
                  </span>
                  <p className="text-slate-600 text-xs leading-relaxed">{currentGuide.prevention}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}