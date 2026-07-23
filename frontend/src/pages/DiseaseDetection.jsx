import { useState } from "react";
import { useLanguage } from "../LanguageContext"; // 👈 Import global language hook

// 🌐 CLOUD FIX: Automatically checks if you are running locally or on the live web
const LEAF_API_BASE = window.location.hostname === "localhost"
  ? "http://127.0.0.1:5001"
  : "https://smart-agri-ai-backend.onrender.com";

export default function DiseaseDetection() {
  const { globalLang } = useLanguage(); // 👈 Access global language state
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null); 
  const [loading, setLoading] = useState(false);

  // 🌐 FULL PAGE TRANSLATION DICTIONARY
  const text = {
    en: {
      title: "Crop Health Doctor",
      subtitle: "Plant Leaf Scanning Core",
      inputMode: "Select Input Mode",
      openCamera: "Open Camera",
      takePhoto: "Take live photo",
      fromGallery: "From Gallery",
      savedFile: "Choose saved file",
      howWorksTitle: "How this works:",
      howWorksDesc: "Tap Open Camera to snap a picture of a crop leaf with your phone, or select an image file from your device storage.",
      scanBtnLoading: "Scanning Crop Health...",
      scanBtnDefault: "Scan Your Plant",
      waitingTitle: "Waiting for Leaf Image",
      waitingDesc: "Please use the camera or gallery option on the left to add a crop leaf picture for analysis.",
      previewTitle: "Selected Image Preview",
      previewDesc: "Ready to check for disease vectors. Click \"Scan Your Plant\" on the left.",
      aiReport: "AI Diagnostic Report",
      detectedCondition: "Detected Crop Condition",
      matchFound: "Match Found",
      notLeaf: "⚠ Not a plant leaf image",
      notLeafDesc: "Please upload a clear, focused photo of an Apple, Potato, or Tomato crop leaf for analysis.",
      lowConfidence: "Low confidence result. Please try taking another photo in clearer daylight."
    },
    kn: {
      title: "ಬೆಳೆ ಆರೋಗ್ಯ ವೈದ್ಯರು",
      subtitle: "ಸಸ್ಯ ಎಲೆ ಸ್ಕ್ಯಾನಿಂಗ್ ಕೋರ್",
      inputMode: "ಇನ್‌ಪುಟ್ ಮೋಡ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      openCamera: "ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ",
      takePhoto: "ಲೈವ್ ಫೋಟೋ ತೆಗೆಯಿರಿ",
      fromGallery: "ಗ್ಯಾಲರಿಯಿಂದ",
      savedFile: "ಉಳಿಸಿದ ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ",
      howWorksTitle: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ:",
      howWorksDesc: "ನಿಮ್ಮ ಫೋನ್‌ನೊಂದಿಗೆ ಬೆಳೆ ಎಲೆಯ ಚಿತ್ರವನ್ನು ಸೆರೆಹಿಡಿಯಲು 'ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ' ಟ್ಯಾಪ್ ಮಾಡಿ, ಅಥವಾ ನಿಮ್ಮ ಸಾಧನದ ಸಂಗ್ರಹಣೆಯಿಂದ ಇಮೇಜ್ ಫೈಲ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      scanBtnLoading: "ಬೆಳೆ ಆರೋಗ್ಯವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      scanBtnDefault: "ನಿಮ್ಮ ಸಸ್ಯವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      waitingTitle: "ಎಲೆಯ ಚಿತ್ರಕ್ಕಾಗಿ ಕಾಯಲಾಗುತ್ತಿದೆ",
      waitingDesc: "ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಬೆಳೆ ಎಲೆಯ ಚಿತ್ರವನ್ನು ಸೇರಿಸಲು ದಯವಿಟ್ಟು ಎಡ್ಭಾಗದಲ್ಲಿರುವ ಕ್ಯಾಮೆರಾ ಅಥವಾ ಗ್ಯಾಲರಿ ಆಯ್ಕೆಯನ್ನು ಬಳಸಿ.",
      previewTitle: "ಆರಿಸಿದ ಚಿತ್ರದ ಮುನ್ನೋಟ",
      previewDesc: "ರೋಗದ ವಾಹಕಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಸಿದ್ಧವಾಗಿದೆ. ಎಡಭಾಗದಲ್ಲಿರುವ \"ನಿಮ್ಮ ಸಸ್ಯವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ\" ಕ್ಲಿಕ್ ಮಾಡಿ.",
      aiReport: "AI ರೋಗನಿರ್ಣಯ ವರದಿ",
      detectedCondition: "ಪತ್ತೆಯಾದ ಬೆಳೆ ಸ್ಥಿತಿ",
      matchFound: "ಹೊಂದಾಣಿಕೆ ಕಂಡುಬಂದಿದೆ",
      notLeaf: "⚠ ಸಸ್ಯದ ಎಲೆಯ ಚಿತ್ರವಲ್ಲ",
      notLeafDesc: "ವಿಶ್ಲೇಷಣೆಗಾಗಿ ದಯವಿಟ್ಟು ಆಪಲ್, ಆಲೂಗಡ್ಡೆ ಅಥವಾ ಟೊಮೆಟೊ ಬೆಳೆ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
      lowConfidence: "ಕಡಿಮೆ ವಿಶ್ವಾಸಾರ್ಹತೆಯ ಫಲಿತಾಂಶ. ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟ ಹಗಲಿನಲ್ಲಿ ಮತ್ತೊಂದು ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಲು ಪ್ರಯತ್ನಿಸಿ."
    },
    hi: {
      title: "फसल स्वास्थ्य डॉक्टर",
      subtitle: "प्लांट लीफ स्कैनिंग कोर",
      inputMode: "इनपुट मोड चुनें",
      openCamera: "कैमरा खोलें",
      takePhoto: "लाइव फोटो लें",
      fromGallery: "गैलरी से",
      savedFile: "सहेजी गई फ़ाइल चुनें",
      howWorksTitle: "यह कैसे काम करता है:",
      howWorksDesc: "अपने फोन से फसल की पत्ती की तस्वीर लेने के लिए 'कैमरा खोलें' पर टैप करें, या अपने डिवाइस स्टोरेज से इमेज फाइल चुनें।",
      scanBtnLoading: "फसल के स्वास्थ्य को स्कैन किया जा रहा है...",
      scanBtnDefault: "अपने पौधे को स्कैन करें",
      waitingTitle: "पत्ती की छवि की प्रतीक्षा है",
      waitingDesc: "विश्लेषण के लिए फसल की पत्ती की तस्वीर जोड़ने के लिए कृपया बाईं ओर कैमरा या गैलरी विकल्प का उपयोग करें।",
      previewTitle: "चयनित छवि पूर्वावलोकन",
      previewDesc: "रोग वाहकों की जांच के लिए तैयार। बाईं ओर \"अपने पौधे को स्कैन करें\" पर क्लिक करें।",
      aiReport: "AI निदान रिपोर्ट",
      detectedCondition: "पता लगाई गई फसल की स्थिति",
      matchFound: "मैच मिला",
      notLeaf: "⚠ पौधे की पत्ती की छवि नहीं है",
      notLeafDesc: "विश्लेषण के लिए कृपया सेब, आलू या टमाटर की फसल के पत्ते की स्पष्ट, केंद्रित तस्वीर अपलोड करें।",
      lowConfidence: "कम विश्वास परिणाम। कृपया साफ दिन की रोशनी में दूसरी फोटो लेने का प्रयास करें।"
    },
    mr: {
      title: "पीक आरोग्य डॉक्टर",
      subtitle: "प्लांट लीफ स्कॅनिंग कोर",
      inputMode: "इनपुट मोड निवडा",
      openCamera: "कॅमेरा उघडा",
      takePhoto: "थेट फोटो काढा",
      fromGallery: "गॅलरीमधून",
      savedFile: "जतन केलेली फाइल निवडा",
      howWorksTitle: "हे कसे कार्य करते:",
      howWorksDesc: "तुमच्या फोनने पिकाच्या पानाचा फोटो काढण्यासाठी 'कॅमेरा उघडा' वर टॅप करा किंवा तुमच्या डिव्हाइस स्टोरेजमधून इमेज फाइल निवडा.",
      scanBtnLoading: "पिकाचे आरोग्य स्कॅन करत आहे...",
      scanBtnDefault: "तुमची वनस्पती स्कॅन करा",
      waitingTitle: "पानाच्या प्रतिमेची प्रतीक्षा करत आहे",
      waitingDesc: "विश्लेषणासाठी पिकाच्या पानाचा फोटो जोडण्यासाठी कृपया डावीकडील कॅमेरा किंवा गॅलरी पर्याय वापरा.",
      previewTitle: "निवडलेला प्रतिमा पूर्वावलोकन",
      previewDesc: "रोग वाहक तपासण्यासाठी तयार. डावीकडील \"तुमची वनस्पती स्कॅन करा\" वर क्लिक करा.",
      aiReport: "AI निदान अहवाल",
      detectedCondition: "शोधलेली पिकाची स्थिती",
      matchFound: "जुळवणी आढळली",
      notLeaf: "⚠ वनस्पतींच्या पानाची प्रतिमा नाही",
      notLeafDesc: "विश्लेषणासाठी कृपया सफरचंद, बटाटा किंवा टोमॅटोच्या पिकाच्या पानाचा स्पष्ट फोटो अपलोड करा.",
      lowConfidence: "कमी आत्मविश्वासाचा निकाल. कृपया स्पष्ट सूर्यप्रकाशात दुसरा फोटो काढण्याचा प्रयत्न करा."
    }
  };

  const currentText = text[globalLang] || text.en;

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
      const res = await fetch(`${LEAF_API_BASE}/predict`, {
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
      setResult({ error: "Cannot connect to server. Please check your internet or cloud service status." });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#eef2ff] via-[#f5f3ff] to-[#faf5ff] text-slate-900 font-sans antialiased relative flex items-center justify-center p-4 sm:p-8 overflow-x-hidden selection:bg-purple-200">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Canva-style ambient gradient glow effects outside the main box */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/40 to-blue-200/20 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-100/40 to-pink-100/20 blur-[100px] pointer-events-none rounded-full" />

      {/* Main Structural Layout Wrapper */}
      <div className="w-full max-w-5xl rounded-[32px] shadow-2xl shadow-indigo-950/20 border-[3px] border-slate-950 overflow-hidden bg-white/90 backdrop-blur-xl relative z-10 animate-fade-in-up">
        
        {/* Top Gradient Accent Bar */}
        <div className="h-2.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 border-b-[3px] border-slate-950" />

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-[3px] divide-slate-950">
          
          {/* LEFT SIDE: Image Source Controls (5 Columns) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-white/95 to-slate-100/75 backdrop-blur-sm">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-slate-900 via-slate-800 to-emerald-600 text-white rounded-2xl flex items-center justify-center border-2 border-slate-950 text-2xl shadow-md">
                  🍃
                </div>
                <div>
                  <h1 className="text-xl font-black text-slate-900">{currentText.title}</h1>
                  <p className="text-xs font-bold text-indigo-600 tracking-wider uppercase">{currentText.subtitle}</p>
                </div>
              </div>

              <hr className="border-slate-950/20 my-4" />

              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  {currentText.inputMode}
                </span>

                {/* DUAL MODE SELECTION CONTAINER */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* OPTION 1: MOBILE / DIRECT CAMERA CAPTURE */}
                  <label className="flex flex-col items-center justify-center p-4 bg-white border-2 border-slate-950 rounded-2xl hover:border-emerald-600 cursor-pointer text-center transition-all shadow-sm group">
                    <span className="text-2xl group-hover:scale-110 transition-transform">📸</span>
                    <span className="text-xs font-black text-slate-900 mt-1.5">{currentText.openCamera}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">{currentText.takePhoto}</span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImage}
                      className="hidden"
                    />
                  </label>

                  {/* OPTION 2: GALLERY SELECT */}
                  <label className="flex flex-col items-center justify-center p-4 bg-white border-2 border-slate-950 rounded-2xl hover:border-emerald-600 cursor-pointer text-center transition-all shadow-sm group">
                    <span className="text-2xl group-hover:scale-110 transition-transform">📁</span>
                    <span className="text-xs font-black text-slate-900 mt-1.5">{currentText.fromGallery}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">{currentText.savedFile}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      className="hidden"
                    />
                  </label>

                </div>

                {/* Farmer-Friendly Guide Card */}
                <div className="bg-white border-2 border-slate-950/20 rounded-2xl p-4 shadow-2xs text-xs text-slate-500 space-y-2">
                  <span className="font-bold text-slate-800 block uppercase tracking-wide">{currentText.howWorksTitle}</span>
                  <p className="font-medium">{currentText.howWorksDesc}</p>
                </div>
              </div>
            </div>

            {/* Scan Submission Button */}
            <div className="mt-6 lg:mt-0">
              <button
                onClick={detectDisease}
                disabled={loading}
                className={`w-full border-2 border-slate-950 ${
                  loading ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-slate-950 hover:bg-black text-white active:scale-[0.99]'
                } py-4 px-4 rounded-2xl font-black shadow-lg transition-all uppercase tracking-widest text-xs sm:text-sm`}
              >
                {loading ? currentText.scanBtnLoading : currentText.scanBtnDefault}
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Visual Previews & Multi-Lingual Diagnostics Output (7 Columns) */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-white min-h-[420px] flex flex-col justify-center">
            
            {/* Case A: Initial State */}
            {!preview && !result && (
              <div className="text-center py-12 space-y-2">
                <div className="text-4xl">🔍</div>
                <h3 className="text-slate-900 font-bold text-base">{currentText.waitingTitle}</h3>
                <p className="text-slate-400 text-xs max-w-xs mx-auto font-medium">{currentText.waitingDesc}</p>
              </div>
            )}

            {/* Case B: Image selected, ready to scan */}
            {preview && !result && (
              <div className="space-y-4 text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block text-left">{currentText.previewTitle}</span>
                <div className="w-full max-h-64 rounded-2xl overflow-hidden border-2 border-slate-950 flex items-center justify-center bg-slate-50 shadow-inner p-2">
                  <img src={preview} alt="preview" className="max-h-60 rounded-xl object-contain mx-auto" />
                </div>
                <p className="text-xs text-slate-500 italic font-medium">{currentText.previewDesc}</p>
              </div>
            )}

            {/* Case C: Output Diagnostics Core Render */}
            {result && (
              <div className="space-y-5">
                {result.error ? (
                  <div className="bg-rose-50 border-2 border-slate-950 p-4 rounded-2xl text-center">
                    <p className="text-rose-800 font-black">⚠️ {result.error}</p>
                  </div>
                ) : result.type === "disease" ? (
                  <div className="space-y-5 animate-fade-in-up">
                    
                    {/* Top Diagnostic Status Line */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-950 pb-3 gap-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{currentText.aiReport}</span>
                    </div>

                    {/* Image Snapshot and Analysis Card block */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-2xl overflow-hidden border-2 border-slate-950 bg-slate-50 flex items-center justify-center p-2 h-36 shadow-2xs">
                        <img src={preview} alt="Analyzed Crop Leaf" className="max-h-32 rounded-xl object-contain" />
                      </div>

                      <div className="bg-emerald-50 border-2 border-slate-950 rounded-2xl p-4 flex flex-col justify-center shadow-2xs">
                        <span className="text-[10px] font-bold text-emerald-800 block uppercase tracking-wide">{currentText.detectedCondition}</span>
                        <div className="text-xl font-black text-slate-950 mt-1 uppercase tracking-tight leading-tight">
                          {result.full_data[globalLang]?.name || result.full_data['en'].name}
                        </div>
                        <span className="text-[11px] font-black text-emerald-800 mt-1.5 inline-flex items-center">
                          ✨ {result.confidence}% {currentText.matchFound}
                        </span>
                      </div>
                    </div>

                    {/* Core Information Split Fields */}
                    <div className="space-y-3">
                      
                      {/* Symptoms Container */}
                      <div className="bg-amber-50 border-2 border-slate-950 p-3.5 rounded-xl space-y-1">
                        <h4 className="text-amber-900 font-black text-xs uppercase tracking-wider flex items-center">
                          🔍 {globalLang === 'en' ? 'SYMPTOMS' : globalLang === 'hi' ? 'लक्षण' : globalLang === 'mr' ? 'लक्षणे' : 'ಲಕ್ಷಣಗಳು'}
                        </h4>
                        <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">{result.full_data[globalLang]?.symptoms || result.full_data['en'].symptoms}</p>
                      </div>

                      {/* Cure Treatment Container */}
                      <div className="bg-emerald-50 border-2 border-slate-950 p-3.5 rounded-xl space-y-1">
                        <h4 className="text-emerald-900 font-black text-xs uppercase tracking-wider flex items-center">
                          💊 {globalLang === 'en' ? 'CURE' : globalLang === 'hi' ? 'उपचार' : globalLang === 'mr' ? 'उपाय' : 'ಚಿಕಿತ್ಸೆ'}
                        </h4>
                        <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">{result.full_data[globalLang]?.cure || result.full_data['en'].cure}</p>
                      </div>

                      {/* Preventive Care Container */}
                      <div className="bg-slate-50 border-2 border-slate-950 p-3.5 rounded-xl space-y-1">
                        <h4 className="text-slate-800 font-black text-xs uppercase tracking-wider flex items-center">
                          🛡️ {globalLang === 'en' ? 'PREVENTION' : globalLang === 'hi' ? 'बचाव' : globalLang === 'mr' ? 'प्रतिबंध' : 'ಮುನ್ನೆಚ್ಚರಿಕೆ'}
                        </h4>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">{result.full_data[globalLang]?.prevention || result.full_data['en'].prevention}</p>
                      </div>

                    </div>
                  </div>
                ) : result.type === "not_leaf" ? (
                  <div className="bg-amber-50 border-2 border-slate-950 p-5 rounded-2xl text-center space-y-1">
                    <p className="text-amber-900 font-black text-base">{currentText.notLeaf}</p>
                    <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">{currentText.notLeafDesc}</p>
                  </div>
                ) : (
                  <div className="bg-slate-50 border-2 border-slate-950 p-5 rounded-2xl text-center">
                    <p className="text-slate-700 font-bold text-sm">{currentText.lowConfidence}</p>
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