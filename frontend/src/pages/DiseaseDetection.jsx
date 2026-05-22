import { useState } from "react";

export default function DiseaseDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en'); 

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const oldPreview = preview;
    const newPreview = URL.createObjectURL(file);

    if (oldPreview) {
      URL.revokeObjectURL(oldPreview);
    }

    setImage(file);
    setPreview(newPreview);
    setResult(null); 
  };

  const detectDisease = async () => {
    if (!image) {
      alert("Please upload or capture an image first!");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("http://127.0.0.1:5001/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setResult(data);
      } else {
        setResult({ error: data.error || "Prediction failed" });
      }
    } catch (err) {
      console.error("Error:", err);
      setResult({ error: "Server error or CORS issue" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans antialiased">
      <div className="bg-white rounded-[24px] shadow-xl w-full max-w-5xl border border-slate-100 overflow-hidden">
        
        {/* Top Premium Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-600" />

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          
          {/* LEFT SIDE: Image Source Controls (5 Columns) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-slate-50/50">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100 text-2xl shadow-sm">
                  🍃
                </div>
                <div>
                  <h1 className="text-xl font-black text-slate-800">Crop Health Doctor</h1>
                  <p className="text-xs font-bold text-slate-400 tracking-wide uppercase">Plant Leaf Scanning Core</p>
                </div>
              </div>

              <hr className="border-slate-200/60 my-4" />

              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Select Input Mode
                </span>

                {/* DUAL MODE SELECTION CONTAINER */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* OPTION 1: LIVE CAMERA CAPTURE */}
                  <label className="flex flex-col items-center justify-center p-4 bg-white border-2 border-dashed border-slate-300 rounded-xl hover:border-emerald-500 cursor-pointer text-center transition-all shadow-sm group">
                    <span className="text-2xl group-hover:scale-110 transition-transform">📸</span>
                    <span className="text-xs font-bold text-slate-700 mt-1.5">Open Camera</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Take live photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment" // Forces the mobile device to activate the back camera directly
                      onChange={handleImage}
                      className="hidden"
                    />
                  </label>

                  {/* OPTION 2: GALLERY SELECT */}
                  <label className="flex flex-col items-center justify-center p-4 bg-white border-2 border-dashed border-slate-300 rounded-xl hover:border-emerald-500 cursor-pointer text-center transition-all shadow-sm group">
                    <span className="text-2xl group-hover:scale-110 transition-transform">📁</span>
                    <span className="text-xs font-bold text-slate-700 mt-1.5">From Gallery</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Choose saved file</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      className="hidden"
                    />
                  </label>

                </div>

                {/* Farmer-Friendly Guide Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-xs text-slate-500 space-y-2">
                  <span className="font-bold text-slate-700 block uppercase tracking-wide">How this works:</span>
                  <p>Tap <span className="font-semibold text-slate-700">Open Camera</span> to photograph a sick leaf directly in your field, or pull an existing picture from your phone memory.</p>
                </div>
              </div>
            </div>

            {/* Scan Submission Button */}
            <div className="mt-6 lg:mt-0">
              <button
                onClick={detectDisease}
                disabled={loading}
                className={`w-full ${
                  loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99]'
                } text-white py-4 px-4 rounded-xl font-bold shadow-md transition-all uppercase tracking-wider text-sm`}
              >
                {loading ? "Scanning Crop Health..." : "Scan Your Plant"}
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Visual Previews & Multi-Lingual Diagnostics Output (7 Columns) */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-white min-h-[420px] flex flex-col justify-center">
            
            {/* Case A: Initial State (No File & No Results) */}
            {!preview && !result && (
              <div className="text-center py-12 space-y-2">
                <div className="text-4xl">🔍</div>
                <h3 className="text-slate-700 font-bold">Waiting for Leaf Image</h3>
                <p className="text-slate-400 text-xs max-w-xs mx-auto">Please use the camera or gallery option on the left to add a crop leaf picture for analysis.</p>
              </div>
            )}

            {/* Case B: Image selected, ready to hit scan button */}
            {preview && !result && (
              <div className="space-y-4 text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block text-left">Selected Image Preview</span>
                <div className="w-full max-h-64 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center bg-slate-50 shadow-inner p-2">
                  <img src={preview} alt="preview" className="max-h-60 rounded-xl object-contain mx-auto" />
                </div>
                <p className="text-xs text-slate-400 italic">Ready to check for disease vectors. Click "Scan Your Plant" on the left.</p>
              </div>
            )}

            {/* Case C: Output Diagnostics Core Render */}
            {result && (
              <div className="space-y-5">
                {result.error ? (
                  <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-center">
                    <p className="text-rose-700 font-bold">⚠️ {result.error}</p>
                  </div>
                ) : result.type === "disease" ? (
                  <div className="space-y-5">
                    
                    {/* Top Diagnostic Status Line */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Diagnostic Report</span>
                      
                      {/* LANGUAGE TOGGLE SYSTEM WRAPPER */}
                      <div className="flex flex-wrap gap-1.5 justify-start sm:justify-end">
                        {[
                          { code: 'en', label: 'English' },
                          { code: 'hi', label: 'हिंदी' },
                          { code: 'mr', label: 'मराठी' },
                          { code: 'kn', label: 'ಕನ್ನಡ' }
                        ].map((l) => (
                          <button
                            key={l.code}
                            onClick={() => setLang(l.code)}
                            className={`px-3 py-1 text-[11px] font-bold rounded-full border transition-all ${
                              lang === l.code 
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            {l.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Image Snapshot and Analysis Card block */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center p-2 h-36 shadow-inner">
                        <img src={preview} alt="Analyzed Crop Leaf" className="max-h-32 rounded-lg object-contain" />
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-center shadow-sm">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wide">Detected Crop Condition</span>
                        <div className="text-xl font-black text-rose-700 mt-1 uppercase tracking-tight leading-tight">
                          {result.full_data[lang].name}
                        </div>
                        <span className="text-[11px] font-bold text-emerald-700 mt-1.5 inline-flex items-center">
                          ✨ {result.confidence}% Match Found
                        </span>
                      </div>
                    </div>

                    {/* Core Information Split Fields (Symptoms, Cure, Prevention) */}
                    <div className="space-y-3">
                      
                      {/* Symptoms Container */}
                      <div className="bg-amber-50/70 border border-amber-200/60 p-3.5 rounded-xl space-y-1">
                        <h4 className="text-amber-800 font-bold text-xs uppercase tracking-wider flex items-center">
                          🔍 {lang === 'en' ? 'SYMPTOMS' : lang === 'hi' ? 'लक्षण' : lang === 'mr' ? 'लक्षणे' : 'ಲಕ್ಷಣಗಳು'}
                        </h4>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">{result.full_data[lang].symptoms}</p>
                      </div>

                      {/* Cure Treatment Container */}
                      <div className="bg-emerald-50/70 border border-emerald-200/60 p-3.5 rounded-xl space-y-1">
                        <h4 className="text-emerald-800 font-bold text-xs uppercase tracking-wider flex items-center">
                          💊 {lang === 'en' ? 'CURE' : lang === 'hi' ? 'उपचार' : lang === 'mr' ? 'उपाय' : 'ಚಿಕಿತ್ಸೆ'}
                        </h4>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">{result.full_data[lang].cure}</p>
                      </div>

                      {/* Preventive Care Container */}
                      <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
                        <h4 className="text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center">
                          🛡️ {lang === 'en' ? 'PREVENTION' : lang === 'hi' ? 'बचाव' : lang === 'mr' ? 'प्रतिबंध' : 'ಮುನ್ನೆಚ್ಚರಿಕೆ'}
                        </h4>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">{result.full_data[lang].prevention}</p>
                      </div>

                    </div>
                  </div>
                ) : result.type === "not_leaf" ? (
                  <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-center space-y-1">
                    <p className="text-amber-800 font-black text-base">⚠ Not a plant leaf image</p>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">Please upload a clear, focused photo of an Apple, Potato, or Tomato crop leaf for analysis.</p>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-center">
                    <p className="text-slate-500 font-medium text-sm">Low confidence result. Please try taking another photo in clearer daylight.</p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}