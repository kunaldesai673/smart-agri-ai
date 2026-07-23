import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext";

// 🌐 ADAPTIVE API BASE: Targets local Flask server on Port 5002 locally, or your live Render backend in production
const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname.startsWith("192.168.") ||
  window.location.hostname.startsWith("10.");

const PRICE_API_BASE = isLocal
  ? `http://${window.location.hostname}:5002`
  : "https://smart-agri-aiml-5a0i.onrender.com";

export default function CropHistoricalData() {
  const { globalLang } = useLanguage();
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [viewMode, setViewMode] = useState("by-crop");
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 🌐 FULL PAGE TRANSLATION DICTIONARY
  const text = {
    en: {
      title: "Historical Crop Price Records",
      subtitle: "Belgaum APMC Mandi Data Archive (2020 - 2026)",
      viewByCrop: "🌾 Single Crop",
      viewByMonth: "🗓️ By Month",
      loadingText: "Loading Mandi Price Database...",
      retryLoad: "Retry Load",
      selectCropLabel: "Select Crop",
      searchMonthLabel: "Search Month / Year",
      searchPlaceholder: "e.g. 2024 or July",
      totalMonthsRecorded: "Total Months Recorded",
      rows: "Rows",
      avgPrice: "Average Price",
      highestPrice: "Highest Price",
      lowestPrice: "Lowest Price",
      tableMonthYear: "Month & Year",
      tableWholesalePrice: "Price (₹)",
      tablePrevPrice: "Prev Month",
      tableShift: "Shift",
      tableRainfall: "Rain (mm)",
      selectTargetMonth: "Select Target Month & Year",
      marketPrice: "Market Price",
      perQuintal: "/ Quintal",
      rainfall: "🌧️ Rainfall:",
      crops: {
        Wheat: "Wheat",
        Maize: "Maize",
        Soyabean: "Soyabean",
        Groundnut: "Groundnut",
        Onion: "Onion",
        Potato: "Potato"
      },
      errors: {
        emptyDataset: "Historical dataset is empty or invalid format.",
        connectionError: "Cannot connect to backend server. Please check your internet connection."
      }
    },
    kn: {
      title: "ಐತಿಹಾಸಿಕ ಬೆಳೆ ಬೆಲೆ ದಾಖಲೆಗಳು",
      subtitle: "ಬೆಳಗಾವಿ APMC ಮಂಡಿ ಡೇಟಾ ಆರ್ಕೈವ್ (2020 - 2026)",
      viewByCrop: "🌾 ಒಂದೇ ಬೆಳೆ",
      viewByMonth: "🗓️ ತಿಂಗಳ ಪ್ರಕಾರ",
      loadingText: "ಮಂಡಿ ಬೆಲೆ ಡೇಟಾಬೇಸ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
      retryLoad: "ಪುನಃ ಪ್ರಯತ್ನಿಸಿ",
      selectCropLabel: "ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      searchMonthLabel: "ತಿಂಗಳು / ವರ್ಷ ಹುಡುಕಿ",
      searchPlaceholder: "ಉದಾ. 2024 ಅಥವಾ ಜುಲೈ",
      totalMonthsRecorded: "ದಾಖಲಾದ ಒಟ್ಟು ತಿಂಗಳುಗಳು",
      rows: "ಸಾಲುಗಳು",
      avgPrice: "ಸರಾಸರಿ ಬೆಲೆ",
      highestPrice: "ಅತ್ಯಧಿಕ ಬೆಲೆ",
      lowestPrice: "ಕನಿಷ್ಠ ಬೆಲೆ",
      tableMonthYear: "ತಿಂಗಳು ಮತ್ತು ವರ್ಷ",
      tableWholesalePrice: "ಬೆಲೆ (₹)",
      tablePrevPrice: "ಹಿಂದಿನ ತಿಂಗಳು",
      tableShift: "ಬದಲಾವಣೆ",
      tableRainfall: "ಮಳೆ (ಮಿಮೀ)",
      selectTargetMonth: "ಗುರಿ ತಿಂಗಳು ಮತ್ತು ವರ್ಷವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      marketPrice: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ",
      perQuintal: "/ ಕ್ವಿಂಟಲ್",
      rainfall: "🌧️ ಮಳೆ:",
      crops: {
        Wheat: "ಗೋಧಿ",
        Maize: "ಮುಕ್ಕಳ ಜೋಳ",
        Soyabean: "ಸೋಯಾಬಿನ್",
        Groundnut: "ಶೇಂಗಾ (ನೆಲಕಡಲೆ)",
        Onion: "ಈರುಳ್ಳಿ",
        Potato: "ಆಲೂಗಡ್ಡೆ"
      },
      errors: {
        emptyDataset: "ಐತಿಹಾಸಿಕ ಡೇಟಾಸೆಟ್ ಖಾಲಿಯಾಗಿದೆ ಅಥವಾ ಅಮಾನ್ಯ ಸ್ವರೂಪದಲ್ಲಿದೆ.",
        connectionError: "ಬ್ಯಾಕೆಂಡ್ ಸರ್ವರ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ."
      }
    },
    hi: {
      title: "ऐतिहासिक फसल मूल्य रिकॉर्ड",
      subtitle: "बेलगावी एपीएमसी मंडी डेटा संग्रह (2020 - 2026)",
      viewByCrop: "🌾 एकल फसल",
      viewByMonth: "🗓️ महीने के अनुसार",
      loadingText: "मंडी मूल्य डेटाबेस लोड हो रहा है...",
      retryLoad: "पुनः प्रयास करें",
      selectCropLabel: "फसल चुनें",
      searchMonthLabel: "माह / वर्ष खोजें",
      searchPlaceholder: "जैसे 2024 या जुलाई",
      totalMonthsRecorded: "दर्ज कुल महीने",
      rows: "पंक्तियाँ",
      avgPrice: "औसत मूल्य",
      highestPrice: "सर्वोच्च मूल्य",
      lowestPrice: "न्यूनतम मूल्य",
      tableMonthYear: "माह और वर्ष",
      tableWholesalePrice: "मूल्य (₹)",
      tablePrevPrice: "पिछला माह",
      tableShift: "बदलाव",
      tableRainfall: "वर्षा (मिमी)",
      selectTargetMonth: "लक्ष्य माह और वर्ष चुनें",
      marketPrice: "बाजार मूल्य",
      perQuintal: "/ क्विंटल",
      rainfall: "🌧️ वर्षा:",
      crops: {
        Wheat: "गेहूं",
        Maize: "मक्का",
        Soyabean: "सोयाबीन",
        Groundnut: "मूंगफली",
        Onion: "प्याज",
        Potato: "आलू"
      },
      errors: {
        emptyDataset: "ऐतिहासिक डेटासेट खाली है या अमान्य प्रारूप में है।",
        connectionError: "बैकएंड सर्वर से कनेक्ट नहीं किया जा सकता। कृपया इंटरनेट कनेक्शन जांचें।"
      }
    },
    mr: {
      title: "ऐतिहासिक पीक किंमत नोंदी",
      subtitle: "बेळगाव APMC मंडी डेटा संग्रह (2020 - 2026)",
      viewByCrop: "🌾 एका पिकाद्वारे",
      viewByMonth: "🗓️ महिन्यानुसार",
      loadingText: "मंडी किंमत डेटाबेस लोड होत आहे...",
      retryLoad: "पुन्हा प्रयत्न करा",
      selectCropLabel: "पीक निवडा",
      searchMonthLabel: "महिना / वर्ष शोधा",
      searchPlaceholder: "उदा. 2024 किंवा जुलै",
      totalMonthsRecorded: "नोंदणीकृत एकूण महिने",
      rows: "ओळी",
      avgPrice: "सरासरी किंमत",
      highestPrice: "सर्वाधिक किंमत",
      lowestPrice: "सर्वात कमी किंमत",
      tableMonthYear: "महिना आणि वर्ष",
      tableWholesalePrice: "किंमत (₹)",
      tablePrevPrice: "मागील महिना",
      tableShift: "बदल",
      tableRainfall: "पाऊस (मिमी)",
      selectTargetMonth: "लक्ष्य महिना आणि वर्ष निवडा",
      marketPrice: "बाजारभाव",
      perQuintal: "/ क्विंटल",
      rainfall: "🌧️ पाऊस:",
      crops: {
        Wheat: "गहू",
        Maize: "मका",
        Soyabean: "सोयाबीन",
        Groundnut: "भुईमूग",
        Onion: "कांदा",
        Potato: "बटाटा"
      },
      errors: {
        emptyDataset: "ऐतिहासिक डेटासेट रिकामा आहे किंवा अवैध स्वरूपात आहे.",
        connectionError: "बॅकएंड सर्व्हरशी कनेक्ट करू शकत नाही. कृपया इंटरनेट कनेक्शन तपासा."
      }
    }
  };

  const currentText = text[globalLang] || text.en;

  const CROPS_LIST = [
    { key: "Wheat", icon: "🌾", label: currentText.crops.Wheat },
    { key: "Maize", icon: "🌽", label: currentText.crops.Maize },
    { key: "Soyabean", icon: "🌱", label: currentText.crops.Soyabean },
    { key: "Groundnut", icon: "🥜", label: currentText.crops.Groundnut },
    { key: "Onion", icon: "🧅", label: currentText.crops.Onion },
    { key: "Potato", icon: "🥔", label: currentText.crops.Potato },
  ];

  useEffect(() => {
    fetchHistoricalData();
  }, []);

  const fetchHistoricalData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${PRICE_API_BASE}/historical-data`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Server returned status code ${response.status}`);
      }
      
      const result = await response.json();

      const dataset = Array.isArray(result) 
        ? result 
        : Array.isArray(result?.data) 
          ? result.data 
          : null;

      if (dataset && dataset.length > 0) {
        setRawData(dataset);
        if (dataset[0]?.Month_Year) {
          setSelectedMonthYear(dataset[0].Month_Year);
        }
      } else {
        setError(result?.error || currentText.errors.emptyDataset);
      }
    } catch (err) {
      console.error("Error fetching historical dataset:", err);
      setError(currentText.errors.connectionError);
    } finally {
      setLoading(false);
    }
  };

  const safeData = Array.isArray(rawData) ? rawData : [];
  const uniqueMonths = Array.from(new Set(safeData.map((d) => d?.Month_Year))).filter(Boolean);

  const cropRecords = safeData.filter(
    (item) => item?.Crop && item.Crop.toString().toLowerCase() === selectedCrop.toLowerCase()
  );

  const filteredCropRecords = cropRecords.filter((item) =>
    item?.Month_Year ? item.Month_Year.toString().toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  const prices = cropRecords.map((r) => parseFloat(r?.Price)).filter((p) => !isNaN(p));
  const avgPrice = prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const minPrice = prices.length ? Math.min(...prices) : 0;

  const monthRecords = safeData.filter(
    (item) => item?.Month_Year === selectedMonthYear
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#eef2ff] via-[#f5f3ff] to-[#faf5ff] text-slate-900 font-sans antialiased relative flex items-center justify-center p-2 sm:p-6 overflow-x-hidden selection:bg-purple-200">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-br from-purple-200/40 to-blue-200/20 blur-[85px] sm:blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-gradient-to-tr from-indigo-100/40 to-pink-100/20 blur-[85px] sm:blur-[100px] pointer-events-none rounded-full" />

      <div className="w-full max-w-6xl rounded-2xl sm:rounded-[32px] shadow-2xl shadow-indigo-950/20 border-[3px] border-slate-950 overflow-hidden bg-white/85 backdrop-blur-xl relative z-10 animate-fade-in-up">
        
        <div className="h-2.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 border-b-[3px] border-slate-950" />

        <div className="p-4 sm:p-10 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-slate-950 pb-5">
            <div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl">📜</span>
                <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {currentText.title}
                </h1>
              </div>
              <p className="text-[10px] sm:text-xs font-bold text-indigo-600 tracking-wider uppercase mt-1">
                {currentText.subtitle}
              </p>
            </div>

            <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-950 shadow-inner self-stretch sm:self-auto justify-center">
              <button
                onClick={() => setViewMode("by-crop")}
                className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === "by-crop"
                    ? "bg-slate-950 text-white shadow-md border-2 border-slate-950"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {currentText.viewByCrop}
              </button>
              <button
                onClick={() => setViewMode("by-month")}
                className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === "by-month"
                    ? "bg-slate-950 text-white shadow-md border-2 border-slate-950"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {currentText.viewByMonth}
              </button>
            </div>
          </div>

          {loading && (
            <div className="text-center py-20 space-y-3">
              <div className="text-4xl animate-bounce">⏳</div>
              <p className="text-slate-900 font-bold text-sm uppercase tracking-wider">
                {currentText.loadingText}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-rose-100 border-2 border-slate-950 p-4 sm:p-5 rounded-2xl text-rose-900 font-bold text-xs flex flex-col sm:flex-row justify-between items-center gap-3 shadow-md">
              <span>⚠️ {error}</span>
              <button
                onClick={fetchHistoricalData}
                className="bg-slate-950 text-white px-4 py-2 rounded-xl text-[10px] uppercase font-bold hover:bg-black"
              >
                {currentText.retryLoad}
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              {viewMode === "by-crop" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-6 space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                        {currentText.selectCropLabel}
                      </label>
                      <div className="relative">
                        <select
                          value={selectedCrop}
                          onChange={(e) => setSelectedCrop(e.target.value)}
                          className="w-full bg-white border-2 border-slate-950 rounded-2xl p-3 sm:p-3.5 text-slate-900 font-bold text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                        >
                          {CROPS_LIST.map((c) => (
                            <option key={c.key} value={c.key}>
                              {c.icon} {c.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-900 font-bold">
                          ▼
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-6 space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                        {currentText.searchMonthLabel}
                      </label>
                      <input
                        type="text"
                        placeholder={currentText.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border-2 border-slate-950 p-3 rounded-2xl text-slate-900 font-bold text-sm bg-slate-50 focus:outline-none focus:bg-white shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-slate-50 border-2 border-slate-950 p-3 sm:p-4 rounded-2xl">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        {currentText.totalMonthsRecorded}
                      </span>
                      <span className="text-lg sm:text-xl font-black text-slate-900">{cropRecords.length} {currentText.rows}</span>
                    </div>

                    <div className="bg-emerald-50 border-2 border-slate-950 p-3 sm:p-4 rounded-2xl">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                        {currentText.avgPrice}
                      </span>
                      <span className="text-lg sm:text-xl font-black text-emerald-950">₹{avgPrice} / Q</span>
                    </div>

                    <div className="bg-blue-50 border-2 border-slate-950 p-3 sm:p-4 rounded-2xl">
                      <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
                        {currentText.highestPrice}
                      </span>
                      <span className="text-lg sm:text-xl font-black text-blue-950">₹{maxPrice} / Q</span>
                    </div>

                    <div className="bg-amber-50 border-2 border-slate-950 p-3 sm:p-4 rounded-2xl">
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                        {currentText.lowestPrice}
                      </span>
                      <span className="text-lg sm:text-xl font-black text-amber-950">₹{minPrice} / Q</span>
                    </div>
                  </div>

                  <div className="border-2 border-slate-950 rounded-2xl overflow-hidden shadow-md">
                    <div className="max-h-[460px] overflow-y-auto overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[340px]">
                        <thead className="sticky top-0 bg-slate-950 text-white text-xs font-bold uppercase tracking-wider">
                          <tr>
                            <th className="p-3 sm:p-3.5">{currentText.tableMonthYear}</th>
                            <th className="p-3 sm:p-3.5 text-right">{currentText.tableWholesalePrice}</th>
                            <th className="p-3 sm:p-3.5 text-right">{currentText.tablePrevPrice}</th>
                            <th className="p-3 sm:p-3.5 text-right">{currentText.tableShift}</th>
                            <th className="p-3 sm:p-3.5 text-right">{currentText.tableRainfall}</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs font-medium divide-y divide-slate-200">
                          {filteredCropRecords.map((row, idx) => {
                            const changeM = parseFloat(row?.Change_M) || 0;
                            const isPositive = changeM >= 0;

                            return (
                              <tr key={idx} className="hover:bg-slate-100 transition-colors">
                                <td className="p-3 sm:p-3.5 font-bold text-slate-900 whitespace-nowrap">{row?.Month_Year || "N/A"}</td>
                                <td className="p-3 sm:p-3.5 text-right font-bold text-slate-950 text-xs sm:text-sm whitespace-nowrap">
                                  ₹{row?.Price ?? "N/A"}
                                </td>
                                <td className="p-3 sm:p-3.5 text-right text-slate-500 whitespace-nowrap">
                                  {row?.Prev_Month ? `₹${row.Prev_Month}` : "-"}
                                </td>
                                <td className="p-3 sm:p-3.5 text-right font-bold whitespace-nowrap">
                                  <span className={`px-2 py-0.5 rounded border border-slate-950/20 text-[10px] ${
                                    isPositive ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"
                                  }`}>
                                    {isPositive ? `▲ +${changeM}%` : `▼ ${changeM}%`}
                                  </span>
                                </td>
                                <td className="p-3 sm:p-3.5 text-right text-slate-700 whitespace-nowrap">
                                  {row?.Rainfall_mm != null ? `${row.Rainfall_mm} mm` : "0 mm"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {viewMode === "by-month" && (
                <div className="space-y-6">
                  <div className="w-full sm:max-w-md space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                      {currentText.selectTargetMonth}
                    </label>
                    <div className="relative">
                      <select
                        value={selectedMonthYear}
                        onChange={(e) => setSelectedMonthYear(e.target.value)}
                        className="w-full bg-white border-2 border-slate-950 rounded-2xl p-3 sm:p-3.5 text-slate-900 font-bold text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                      >
                        {uniqueMonths.map((m) => (
                          <option key={m} value={m}>
                            🗓️ {m}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-900 font-bold">
                        ▼
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {CROPS_LIST.map((cropObj) => {
                      const record = monthRecords.find(
                        (r) => r?.Crop && r.Crop.toString().toLowerCase() === cropObj.key.toLowerCase()
                      );

                      const price = record && record.Price != null ? record.Price : "N/A";
                      const changeM = record ? parseFloat(record.Change_M) || 0 : 0;
                      const rainfall = record && record.Rainfall_mm != null ? record.Rainfall_mm : 0;
                      const isUp = changeM >= 0;

                      return (
                        <div
                          key={cropObj.key}
                          className="border-2 border-slate-950 rounded-2xl p-4 sm:p-5 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between border-b-2 border-slate-950 pb-3 gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xl sm:text-2xl">{cropObj.icon}</span>
                                <span className="font-bold text-slate-900 text-sm sm:text-base">
                                  {cropObj.label}
                                </span>
                              </div>
                              <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-950 truncate max-w-[120px]">
                                {selectedMonthYear || "Selected"}
                              </span>
                            </div>

                            <div className="mt-4 flex items-baseline justify-between">
                              <div>
                                <span className="text-[10px] font-bold text-slate-400 block uppercase">
                                  {currentText.marketPrice}
                                </span>
                                <div className="text-xl sm:text-2xl font-black text-slate-950 mt-0.5">
                                  ₹{price} <span className="text-xs text-slate-500 font-bold">{currentText.perQuintal}</span>
                                </div>
                              </div>

                              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-950/20 shadow-sm ${
                                isUp ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"
                              }`}>
                                {isUp ? `▲ +${changeM}%` : `▼ ${changeM}%`}
                              </span>
                            </div>
                          </div>

                          <div className="mt-5 pt-3 border-t border-slate-200 flex justify-between items-center text-xs font-bold text-slate-600">
                            <span>{currentText.rainfall}</span>
                            <span className="font-bold text-slate-900">{rainfall} mm</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}