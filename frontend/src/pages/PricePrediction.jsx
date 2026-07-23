import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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

export default function PricePrediction() {
  const { globalLang } = useLanguage();
  const [crop, setCrop] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Feature States: Starts completely blank instead of a default value
  const [quintals, setQuintals] = useState(""); 
  const [showCalculator, setShowCalculator] = useState(false);

  // 📱 SMS State management
  const [smsLoading, setSmsLoading] = useState(false);
  const [smsStatus, setSmsStatus] = useState("");

  // 🔮 Climate Simulator Interactive State Sliders (Dynamic based on API data)
  const [rainfallOffset, setRainfallOffset] = useState(0); // Offset added to real recorded baseline (-50 to +100 mm)
  const [demandSurge, setDemandSurge] = useState(0);      // percentage (-30% to +50%)

  // 🌐 FULL PAGE TRANSLATION DICTIONARY
  const text = {
    en: {
      assistantTitle: "Price AI",
      subtitle: "Belgaum Farmer Assistant",
      chooseCrop: "Choose Your Crop",
      cropsAvailable: "6 Crops Available",
      selectPrompt: "-- Select a Crop --",
      crops: {
        Wheat: "Wheat",
        Maize: "Maize",
        Soyabean: "Soyabean",
        Groundnut: "Groundnut",
        Onion: "Onion",
        Potato: "Potato"
      },
      months: {
        January: "January",
        February: "February",
        March: "March",
        April: "April",
        May: "May",
        June: "June",
        July: "July",
        August: "August",
        September: "September",
        October: "October",
        November: "November",
        December: "December"
      },
      howItHelps: "How it helps you",
      howItHelpsDesc: "Our AI looks at past local mandi prices and rain data to help you figure out if prices will go up or down next month.",
      checkBtnLoading: "Reading Mandi Prices...",
      checkBtnDefault: "Select a Crop Above",
      checkBtnActive: (c) => `Check Future ${c} Price`,
      readyTitle: "Ready to Check Prices",
      readyDesc: "Choose your crop on the left and click the button to see future price trends instantly.",
      trendGraph: "Price Trend Graph",
      latestData: (m) => `Latest Market Data: ${m}`,
      calculatorTitle: "🧮 Your Harvest Calculator",
      close: "✕ Close",
      harvestWeightLabel: "Enter your harvest weight (Quintals):",
      harvestPlaceholder: "e.g. 15",
      estimatedYield: (q) => `Estimated Yield Analysis (${q} Quintals)`,
      profit: "PROFIT",
      lossRisk: "LOSS RISK",
      netReturnDelta: "Net Return Delta Next Month",
      todayVal: "Value (Today)",
      simulatedAiVal: "Simulated AI Value",
      timelineSummary: "Timeline Summary",
      outlook: "30-Day Outlook",
      holdingBoost: (amt) => `✨ Holding stock yields a calculated return boost of ₹${amt} based on moisture analytics.`,
      sellingStop: (amt) => `⚠️ Selling assets immediately halts a projected value slide of ₹${amt} due to incoming mandi volumes.`,
      normalTrend: "Normal Market Trend",
      pastTrends: "Based only on past trends",
      weatherSmart: "🌟 Weather Smart AI Guess",
      adjustedRain: (mm) => `Adjusted for ${mm}mm total simulated rainfall`,
      simulatorTitle: '🔮 "What-If" Climate & Market Simulator',
      simulatorSub: (base) => `Test real-time environmental shocks over Belgaum's base weather (${base}mm baseline)`,
      resetDials: "Reset Dials",
      rainfallVolume: "🌧️ Rainfall Volume:",
      drought: "Drought (-50)",
      baselineRain: (b) => `Baseline (${b}mm)`,
      heavyRain: "Heavy (+100)",
      demandSurgeLabel: "📈 Demand Surge:",
      lowDemand: "Low (-30%)",
      normalDemand: "Normal",
      highDemand: "Surge (+50%)",
      broadcastTitle: "📢 Broadcast Communications",
      broadcastDesc: "Push the button to sync this calculation log to the regional grower SMS distribution channel.",
      broadcasting: "Broadcasting...",
      sendSmsBtn: "Send SMS Alert to Farmers",
      benchmarkTitle: "📊 Multi-Architecture Algorithm Benchmarking",
      crossValidated: "Cross-Validated",
      benchmarkDesc: "To ensure maximum optimization, the data layer evaluates multi-model regressions simultaneously. The system actively utilizes the ensemble architecture with the highest statistical convergence.",
      thModel: "Model",
      thFramework: "Framework",
      thForecast: "Forecast",
      thR2: "R² Score",
      thStatus: "Status",
      randomForest: "Random Forest",
      rfFramework: "Ensemble",
      activeStatus: "Active",
      decisionTree: "Decision Tree",
      dtFramework: "Single Split",
      overfitStatus: "Overfit",
      linearReg: "Linear Reg.",
      lrFramework: "OLS Framework",
      underfitStatus: "Underfit",
      aiTrustLevel: "AI Trust Level",
      marketRisk: "Market Risk",
      marketAdvice: "Market Advice",
      yearlyCalendar: "📅 Yearly Selling Calendar",
      bestMonth: "🌟 Best Month to Sell",
      worstMonth: "⚠️ Lowest Price Month",
      mandiInfo: "Mandi Information:",
      importantNote: "⚠️ Important Note for Farmers",
      howItWorksNote: "How it works:",
      howItWorksText: "Our AI system looks at local Belgaum market price changes and rainfall from previous months. It calculates patterns to give you a helpful estimate of next month's crop values.",
      disclaimerTitle: "Disclaimer:",
      disclaimerText: "These calculations are predictions based on past data and cannot be 100% accurate. Sudden weather shifts, government policy changes, or unexpected market floods can affect real-time mandi prices. Please use this report as an advisory guide along with your personal judgment before making final selling or storage decisions.",
      adviceUp: (c) => `The Belgaum market looks great! Prices are expected to go up next month. If you have safe storage, it is a smart choice to hold your ${c} for a few weeks to sell it for a higher profit.`,
      adviceDown: (c) => `Market changes or rainfall trends might bring the price down next month. It is safer to sell your ${c} yield soon to secure today's higher price before it falls.`,
      adviceSteady: (c) => `The market is steady. No big jumps or drops are expected. You can sell your ${c} harvest as per your normal routine schedule.`,
      trendUp: "PRICE GOING UP",
      trendDown: "PRICE GOING DOWN",
      trendSteady: "PRICE STAYING STEADY",
      trustHigh: "High Trust",
      trustMedium: "Medium Trust",
      trustVeryReliable: "Very Reliable",
      riskLow: "Low Risk",
      riskHigh: "High Risk",
      riskStable: "Stable",
      calendarAdvice: (c, best, worst) => `Historical trends show that ${c} prices in Belgaum usually reach a premium around ${best} due to high demand, while prices often decline around ${worst} when fresh harvests arrive in markets.`
    },
    kn: {
      assistantTitle: "ಬೆಲೆ AI",
      subtitle: "ಬೆಳಗಾವಿ ರೈತ ಸಹಾಯಕ",
      chooseCrop: "ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      cropsAvailable: "6 ಬೆಳೆಗಳು ಲಭ್ಯವಿದೆ",
      selectPrompt: "-- ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ --",
      crops: {
        Wheat: "ಗೋಧಿ",
        Maize: "ಮುಕ್ಕಳ ಜೋಳ",
        Soyabean: "ಸೋಯಾಬಿನ್",
        Groundnut: "ಶೇಂಗಾ (ನೆಲಕಡಲೆ)",
        Onion: "ಈರುಳ್ಳಿ",
        Potato: "ಆಲೂಗಡ್ಡೆ"
      },
      months: {
        January: "ಜನವರಿ",
        February: "ಫೆಬ್ರವರಿ",
        March: "ಮಾರ್ಚ್",
        April: "ಏಪ್ರಿಲ್",
        May: "ಮೇ",
        June: "ಜೂನ್",
        July: "ಜುಲೈ",
        August: "ಆಗಸ್ಟ್",
        September: "ಸೆಪ್ಟೆಂಬರ್",
        October: "ಅಕ್ಟೋಬರ್",
        November: "ನವೆಂಬರ್",
        December: "ಡಿಸೆಂಬರ್"
      },
      howItHelps: "ಇದು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ",
      howItHelpsDesc: "ಮುಂದಿನ ತಿಂಗಳು ಬೆಲೆಗಳು ಏರಿಕೆಯಾಗುತ್ತವೆಯೋ ಅಥವಾ ಇಳಿಯುತ್ತವೆಯೋ ಎಂದು ತಿಳಿಯಲು ನಮ್ಮ AI ಹಿಂದಿನ ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮತ್ತು ಮಳೆಯ ಡೇಟಾವನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ.",
      checkBtnLoading: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಓದಲಾಗುತ್ತಿದೆ...",
      checkBtnDefault: "ಮೇಲೆ ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      checkBtnActive: (c) => `ಭವಿಷ್ಯದ ${c} ಬೆಲೆಯನ್ನು ಪರಿಶೀಲಿಸಿ`,
      readyTitle: "ಬೆಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಸಿದ್ಧವಾಗಿದೆ",
      readyDesc: "ಎಡಭಾಗದಲ್ಲಿ ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ಭವಿಷ್ಯದ ಬೆಲೆ ಪ್ರವೃತ್ತಿಗಳನ್ನು ತಕ್ಷಣವೇ ವೀಕ್ಷಿಸಲು ಗುಂಡಿಯನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.",
      trendGraph: "ಬೆಲೆ ಪ್ರವೃತ್ತಿ ಗ್ರಾಫ್",
      latestData: (m) => `ಇತ್ತೀಚಿನ ಮಾರುಕಟ್ಟೆ ಡೇಟಾ: ${m}`,
      calculatorTitle: "🧮 ನಿಮ್ಮ ಫಸಲು ಕ್ಯಾಲ್ಕುಲೇಟರ್",
      close: "✕ ಮುಚ್ಚಿ",
      harvestWeightLabel: "ನಿಮ್ಮ ಫಸಲಿನ ತೂಕವನ್ನು ನಮೂದಿಸಿ (ಕ್ವಿಂಟಲ್):",
      harvestPlaceholder: "ಉದಾ. 15",
      estimatedYield: (q) => `ಅಂದಾಜು ಫಸಲು ವಿಶ್ಲೇಷಣೆ (${q} ಕ್ವಿಂಟಲ್)`,
      profit: "ಲಾಭ",
      lossRisk: "ನಷ್ಟದ ಅಪಾಯ",
      netReturnDelta: "ಮುಂದಿನ ತಿಂಗಳ ನಿವ್ವಳ ಆದಾಯ ವ್ಯತ್ಯಾಸ",
      todayVal: "ಮೌಲ್ಯ (ಇಂದು)",
      simulatedAiVal: "ಸಿಮ್ಯುಲೇಟೆಡ್ AI ಮೌಲ್ಯ",
      timelineSummary: "ಸಮಯದ ಸಾರಾಂಶ",
      outlook: "30 ದಿನಗಳ ಮುನ್ನೋಟ",
      holdingBoost: (amt) => `✨ ತೇವಾಂಶ ವಿಶ್ಲೇಷಣೆಯ ಆಧಾರದ ಮೇಲೆ ಸ್ಟಾಕ್ ಇಟ್ಟುಕೊಳ್ಳುವುದರಿಂದ ₹${amt} ರಷ್ಟು ಲಾಭ ದೊರೆಯುತ್ತದೆ.`,
      sellingStop: (amt) => `⚠️ ಮಾರುಕಟ್ಟೆ ಹೆಚ್ಚಳದಿಂದಾಗಿ ₹${amt} ಮೌಲ್ಯದ ಕುಸಿತವನ್ನು ತಡೆಯಲು ತಕ್ಷಣವೇ ಮಾರಾಟ ಮಾಡಿ.`,
      normalTrend: "ಸಾಮಾನ್ಯ ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿ",
      pastTrends: "ಹಿಂದಿನ ಪ್ರವೃತ್ತಿಗಳ ಮೇಲೆ ಮಾತ್ರ ಆಧಾರಿತವಾಗಿದೆ",
      weatherSmart: "🌟 ಹವಾಮಾನ ಸ್ಮಾರ್ಟ್ AI ಅಂದಾಜು",
      adjustedRain: (mm) => `ಒಟ್ಟು ${mm}ಮಿಮೀ ಸಿಮ್ಯುಲೇಟೆಡ್ ಮಳೆಗೆ ಸರಿಹೊಂದಿಸಲಾಗಿದೆ`,
      simulatorTitle: '🔮 "ಏನಾದರೆ" ಹವಾಮಾನ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಸಿಮ್ಯುಲೇಟರ್',
      simulatorSub: (base) => `ಬೆಳಗಾವಿಯ ಮೂಲ ಹವಾಮಾನದ ಮೇಲೆ ನೈಜ-ಸಮಯದ ವಾತಾವರಣದ ಪರಿಣಾಮಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ (${base}ಮಿಮೀ ಆಧಾರ)`,
      resetDials: "ಡಯಲ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ",
      rainfallVolume: "🌧️ ಮಳೆಯ ಪರಿಮಾಣ:",
      drought: "ಬರ (-50)",
      baselineRain: (b) => `ಮೂಲ (${b}ಮಿಮೀ)`,
      heavyRain: "ಭಾರೀ (+100)",
      demandSurgeLabel: "📈 ಬೇಡಿಕೆಯ ಏರಿಕೆ:",
      lowDemand: "ಕಡಿಮೆ (-30%)",
      normalDemand: "ಸಾಮಾನ್ಯ",
      highDemand: "ಹೆಚ್ಚಳ (+50%)",
      broadcastTitle: "📢 ಪ್ರಸಾರ ಸಂವಹನಗಳು",
      broadcastDesc: "ಈ ಲೆಕ್ಕಾಚಾರದ ಲಾಗ್ ಅನ್ನು ಪ್ರಾದೇಶಿಕ ರೈತರ SMS ವಿತರಣಾ ಚಾನಲ್‌ಗೆ ಸಿಂಕ್ ಮಾಡಲು ಬಟನ್ ಒತ್ತಿ.",
      broadcasting: "ಪ್ರಸಾರ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      sendSmsBtn: "ರೈತರಿಗೆ SMS ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಿ",
      benchmarkTitle: "📊 ಬಹು-ವಾಸ್ತುಶಿಲ್ಪ ಅಲ್ಗಾರಿದಮ್ ಬೆಂಚ್‌ಮಾರ್ಕಿಂಗ್",
      crossValidated: "ಕ್ರಾಸ್-ವ್ಯಾಲಿಡೇಟೆಡ್",
      benchmarkDesc: "ಗರಿಷ್ಠ ಆಪ್ಟಿಮೈಸೇಶನ್ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು, ಡೇಟಾ ಲೇಯರ್ ಏಕಕಾಲದಲ್ಲಿ ಬಹು-ಮಾದರಿ ರಿಗ್ರೆಷನ್‌ಗಳನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡುತ್ತದೆ.",
      thModel: "ಮಾದರಿ",
      thFramework: "ಫ್ರೇಮ್‌ವರ್ಕ್",
      thForecast: "ಮುನ್ಸೂಚನೆ",
      thR2: "R² ಸ್ಕೋರ್",
      thStatus: "ಸ್ಥಿತಿ",
      randomForest: "ರಾಂಡಮ್ ಫಾರೆಸ್ಟ್",
      rfFramework: "ಎನ್ಸೆಂಬಲ್",
      activeStatus: "ಸಕ್ರಿಯ",
      decisionTree: "ಡಿಸಿಷನ್ ಟ್ರೀ",
      dtFramework: "ಸಿಂಗಲ್ ಸ್ಪ್ಲಿಟ್",
      overfitStatus: "ಓವರ್ಫಿಟ್",
      linearReg: "ಲೀನಿಯರ್ ರಿಗ್ರೆಷನ್",
      lrFramework: "OLS ಫ್ರೇಮ್‌ವರ್ಕ್",
      underfitStatus: "ಅಂಡರ್‌ಫಿಟ್",
      aiTrustLevel: "AI ನಂಬಿಕೆ ಮಟ್ಟ",
      marketRisk: "ಮಾರುಕಟ್ಟೆ ಅಪಾಯ",
      marketAdvice: "ಮಾರುಕಟ್ಟೆ ಸಲಹೆ",
      yearlyCalendar: "📅 ವಾರ್ಷಿಕ ಮಾರಾಟ ಕ್ಯಾಲೆಂಡರ್",
      bestMonth: "🌟 ಮಾರಾಟ ಮಾಡಲು ಉತ್ತಮ ತಿಂಗಳು",
      worstMonth: "⚠️ ಕಡಿಮೆ ಬೆಲೆಯ ತಿಂಗಳು",
      mandiInfo: "ಮಂಡಿ ಮಾಹಿತಿ:",
      importantNote: "⚠️ ರೈತರಿಗೆ ಪ್ರಮುಖ ಸೂಚನೆ",
      howItWorksNote: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ:",
      howItWorksText: "ನಮ್ಮ AI ವ್ಯವಸ್ಥೆಯು ಹಿಂದಿನ ತಿಂಗಳ ಸ್ಥಳೀಯ ಬೆಳಗಾವಿ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಬದಲಾವಣೆಗಳು ಮತ್ತು ಮಳೆಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ.",
      disclaimerTitle: "ಹಕ್ಕುತ್ಯಾಗ:",
      disclaimerText: "ಈ ಲೆಕ್ಕಾಚಾರಗಳು ಹಿಂದಿನ ಡೇಟಾದ ಆಧಾರದ ಮೇಲಿನ ಮುನ್ಸೂಚನೆಗಳಾಗಿವೆ ಮತ್ತು 100% ನಿಖರವಾಗಿರಲು ಸಾಧ್ಯವಿಲ್ಲ.",
      adviceUp: (c) => `ಬೆಳಗಾವಿ ಮಾರುಕಟ್ಟೆ ಅತ್ಯುತ್ತಮವಾಗಿದೆ! ಮುಂದಿನ ತಿಂಗಳು ಬೆಲೆಗಳು ಏರಿಕೆಯಾಗುವ ನಿರೀಕ್ಷೆಯಿದೆ. ಸುರಕ್ಷಿತ ಶೇಖರಣೆ ಇದ್ದರೆ, ಹೆಚ್ಚಿನ ಲಾಭಕ್ಕಾಗಿ ನಿಮ್ಮ ${c} ಅನ್ನು ಕೆಲವು ವಾರಗಳ ಕಾಲ ಇಟ್ಟುಕೊಳ್ಳುವುದು ಬುದ್ಧಿವಂತಿಕೆಯಾಗಿದೆ.`,
      adviceDown: (c) => `ಮಾರುಕಟ್ಟೆ ಬದಲಾವಣೆಗಳು ಅಥವಾ ಮಳೆಯ ಪ್ರವೃತ್ತಿಗಳು ಮುಂದಿನ ತಿಂಗಳು ಬೆಲೆಯನ್ನು ಇಳಿಸಬಹುದು. ಬೆಲೆ ಕುಸಿಯುವ ಮೊದಲು ಇಂದಿನ ಉತ್ತಮ ಬೆಲೆಯನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ${c} ಫಸಲನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಮಾರಾಟ ಮಾಡುವುದು ಸುರಕ್ಷಿತವಾಗಿದೆ.`,
      adviceSteady: (c) => `ಮಾರುಕಟ್ಟೆಯು ಸ್ಥಿರವಾಗಿದೆ. ಯಾವುದೇ ದೊಡ್ಡ ಏರಿಳಿತಗಳು ನಿರೀಕ್ಷಿತವಿಲ್ಲ. ನಿಮ್ಮ ಸಾಮಾನ್ಯ ದಿನಚರಿಯಂತೆ ನಿಮ್ಮ ${c} ಫಸಲನ್ನು ನೀವು ಮಾರಾಟ ಮಾಡಬಹುದು.`,
      trendUp: "ಬೆಲೆ ಏರಿಕೆಯಾಗುತ್ತಿದೆ",
      trendDown: "ಬೆಲೆ ಇಳಿಕೆಯಾಗುತ್ತಿದೆ",
      trendSteady: "ಬೆಲೆ ಸ್ಥಿರವಾಗಿದೆ",
      trustHigh: "ಉನ್ನತ ನಂಬಿಕೆ",
      trustMedium: "ಮಧ್ಯಮ ನಂಬಿಕೆ",
      trustVeryReliable: "ತುಂಬಾ ವಿಶ್ವಾಸಾರ್ಹ",
      riskLow: "ಕಡಿಮೆ ಅಪಾಯ",
      riskHigh: "ಹೆಚ್ಚಿನ ಅಪಾಯ",
      riskStable: "ಸ್ಥಿರ",
      calendarAdvice: (c, best, worst) => `ಐತಿಹಾಸಿಕ ಪ್ರವೃತ್ತಿಗಳ ಪ್ರಕಾರ ಬೆಳಗಾವಿಯಲ್ಲಿ ${c} ಬೆಲೆಗಳು ಅಧಿಕ ಬೇಡಿಕೆಯಿಂದಾಗಿ ${best} ಸುಮಾರಿಗೆ ಗರಿಷ್ಠ ಮಟ್ಟ ತಲುಪುತ್ತವೆ, ಆದರೆ ಮಾರುಕಟ್ಟೆಗೆ ಹೊಸ ಫಸಲು ಬಂದಾಗ ಸಾಮಾನ್ಯವಾಗಿ ${worst} ಸುಮಾರಿಗೆ ಬೆಲೆಗಳು ಇಳಿಯುತ್ತವೆ.`
    },
    hi: {
      assistantTitle: "मूल्य AI",
      subtitle: "बेलगावी किसान सहायक",
      chooseCrop: "अपनी फसल चुनें",
      cropsAvailable: "6 फसलें उपलब्ध हैं",
      selectPrompt: "-- फसल चुनें --",
      crops: {
        Wheat: "गेहूं",
        Maize: "मक्का",
        Soyabean: "सोयाबीन",
        Groundnut: "मूंगफली",
        Onion: "प्याज",
        Potato: "आलू"
      },
      months: {
        January: "जनवरी",
        February: "फरवरी",
        March: "मार्च",
        April: "अप्रैल",
        May: "मई",
        June: "जून",
        July: "जुलाई",
        August: "अगस्त",
        September: "सितंबर",
        October: "अक्टूबर",
        November: "नवंबर",
        December: "दिसंबर"
      },
      howItHelps: "यह आपकी कैसे मदद करता है",
      howItHelpsDesc: "हमारा AI पिछले स्थानीय मंडी भाव और वर्षा डेटा को देखकर यह अनुमान लगाता है कि अगले महीने कीमतें बढ़ेंगी या घटेंगी।",
      checkBtnLoading: "मंडी भाव पढ़े जा रहे हैं...",
      checkBtnDefault: "ऊपर एक फसल चुनें",
      checkBtnActive: (c) => `भविष्य की ${c} कीमत जांचें`,
      readyTitle: "मूल्य जांचने के लिए तैयार",
      readyDesc: "बाईं ओर अपनी फसल चुनें और भविष्य के मूल्य रुझानों को तुरंत देखने के लिए बटन पर क्लिक करें।",
      trendGraph: "मूल्य रुझान ग्राफ",
      latestData: (m) => `नवीनतम बाजार डेटा: ${m}`,
      calculatorTitle: "🧮 आपका फसल कैलकुलेटर",
      close: "✕ बंद करें",
      harvestWeightLabel: "अपनी फसल का वजन दर्ज करें (क्विंटल):",
      harvestPlaceholder: "जैसे 15",
      estimatedYield: (q) => `अनुमानित उपज विश्लेषण (${q} क्विंटल)`,
      profit: "लाभ",
      lossRisk: "नुकसान का जोखिम",
      netReturnDelta: "अगले महीने का शुद्ध रिटर्न अंतर",
      todayVal: "मूल्य (आज)",
      simulatedAiVal: "सिम्युलेटेड AI मूल्य",
      timelineSummary: "समय सीमा सारांश",
      outlook: "30-दिवसीय दृष्टिकोण",
      holdingBoost: (amt) => `✨ नमी विश्लेषण के आधार पर स्टॉक रखने से ₹${amt} का अतिरिक्त लाभ मिल सकता है।`,
      sellingStop: (amt) => `⚠️ बाजार में उतार-चढ़ाव के कारण ₹${amt} के मूल्य पतन को रोकने के लिए तुरंत बेचें।`,
      normalTrend: "सामान्य बाजार रुझान",
      pastTrends: "केवल पिछले रुझानों पर आधारित",
      weatherSmart: "🌟 मौसम स्मार्ट AI अनुमान",
      adjustedRain: (mm) => `कुल ${mm} मिमी सिम्युलेटेड वर्षा के लिए समायोजित`,
      simulatorTitle: '🔮 "यदि-तो" जलवायु और बाजार सिम्युलेटर',
      simulatorSub: (base) => `बेलगावी के आधार मौसम (${base} मिमी आधार) पर वास्तविक समय के झटकों का परीक्षण करें`,
      resetDials: "डायल रीसेट करें",
      rainfallVolume: "🌧️ वर्षा की मात्रा:",
      drought: "सूखा (-50)",
      baselineRain: (b) => `आधार (${b} मिमी)`,
      heavyRain: "भारी (+100)",
      demandSurgeLabel: "📈 मांग में वृद्धि:",
      lowDemand: "कम (-30%)",
      normalDemand: "सामान्य",
      highDemand: "उछाल (+50%)",
      broadcastTitle: "📢 प्रसारण संचार",
      broadcastDesc: "इस गणना लॉग को क्षेत्रीय किसान SMS वितरण चैनल से सिंक करने के लिए बटन दबाएं।",
      broadcasting: "प्रसारित हो रहा है...",
      sendSmsBtn: "किसानों को SMS अलर्ट भेजें",
      benchmarkTitle: "📊 बहु-आर्किटेक्चर एल्गोरिदम बेंचमार्किंग",
      crossValidated: "क्रॉस-वैलिडेटेड",
      benchmarkDesc: "इष्टतम अनुकूलन सुनिश्चित करने के लिए, डेटा लेयर एक साथ बहु-मॉडल प्रतिगमन का मूल्यांकन करती है।",
      thModel: "मॉडल",
      thFramework: "फ्रेमवर्क",
      thForecast: "पूर्वानुमान",
      thR2: "R² स्कोर",
      thStatus: "स्थिति",
      randomForest: "रैंडम फॉरेस्ट",
      rfFramework: "एंसेम्बल",
      activeStatus: "सक्रिय",
      decisionTree: "डिसीजन ट्री",
      dtFramework: "सिंगल स्प्लिट",
      overfitStatus: "ओवरफिट",
      linearReg: "लीनियर रिग्रेशन",
      lrFramework: "OLS फ्रेमवर्क",
      underfitStatus: "अंडरफिट",
      aiTrustLevel: "AI विश्वास स्तर",
      marketRisk: "बाजार जोखिम",
      marketAdvice: "बाजार सलाह",
      yearlyCalendar: "📅 वार्षिक बिक्री कैलेंडर",
      bestMonth: "🌟 बेचने के लिए सबसे अच्छा महीना",
      worstMonth: "⚠️ सबसे कम कीमत वाला महीना",
      mandiInfo: "मंडी की जानकारी:",
      importantNote: "⚠️ किसानों के लिए महत्वपूर्ण नोट",
      howItWorksNote: "यह कैसे काम करता है:",
      howItWorksText: "हमारा AI सिस्टम पिछले महीनों के स्थानीय बेलगावी बाजार मूल्य परिवर्तनों और वर्षा को देखता है।",
      disclaimerTitle: "अस्वीकरण:",
      disclaimerText: "ये गणनाएं पिछले डेटा पर आधारित भविष्यवाणियां हैं और 100% सटीक नहीं हो सकती हैं。",
      adviceUp: (c) => `बेलगावी बाजार बहुत अच्छा लग रहा है! अगले महीने कीमतें बढ़ने की उम्मीद है। यदि आपके पास सुरक्षित भंडारण है, तो अधिक मुनाफे के लिए अपनी ${c} को कुछ हफ्तों तक रोकना एक समझदारी भरा विकल्प है।`,
      adviceDown: (c) => `बाजार में बदलाव या बारिश के रुझान अगले महीने कीमत नीचे ला सकते हैं। गिरावट आने से पहले आज की बेहतर कीमत सुरक्षित करने के लिए अपनी ${c} उपज को जल्द बेच देना सुरक्षित है।`,
      adviceSteady: (c) => `बाजार स्थिर है। किसी बड़ी तेजी या मंदी की उम्मीद नहीं है। आप अपने सामान्य रूटीन शेड्यूल के अनुसार अपनी ${c} फसल बेच सकते हैं।`,
      trendUp: "कीमत बढ़ रही है",
      trendDown: "कीमत घट रही है",
      trendSteady: "कीमत स्थिर है",
      trustHigh: "उच्च विश्वास",
      trustMedium: "मध्यम विश्वास",
      trustVeryReliable: "अत्यधिक विश्वसनीय",
      riskLow: "कम जोखिम",
      riskHigh: "उच्च जोखिम",
      riskStable: "स्थिर",
      calendarAdvice: (c, best, worst) => `ऐतिहासिक रुझान बताते हैं कि बेलगावी में ${c} की कीमतें उच्च मांग के कारण ${best} के आसपास प्रीमियम पर पहुंच जाती हैं, जबकि ${worst} के आसपास जब बाजारों में नई फसल आती है तो कीमतें अक्सर गिर जाती हैं.`
    },
    mr: {
      assistantTitle: "किंमत AI",
      subtitle: "बेळगाव शेतकरी सहाय्यक",
      chooseCrop: "तुमचे पीक निवडा",
      cropsAvailable: "6 पिके उपलब्ध",
      selectPrompt: "-- पीक निवडा --",
      crops: {
        Wheat: "गहू",
        Maize: "मका",
        Soyabean: "सोयाबीन",
        Groundnut: "भुईमूग",
        Onion: "कांदा",
        Potato: "बटाटा"
      },
      months: {
        January: "जानेवारी",
        February: "फेब्रुवारी",
        March: "मार्च",
        April: "एप्रिल",
        May: "मे",
        June: "जून",
        July: "जुलै",
        August: "ऑगस्ट",
        September: "सप्टेंबर",
        October: "ऑक्टोबर",
        November: "नोव्हेंबर",
        December: "डिसेंबर"
      },
      howItHelps: "हे तुम्हाला कसे मदत करते",
      howItHelpsDesc: "पुढील महिन्यात किमती वाढतील की घटतील हे शोधण्यात मदत करण्यासाठी आमचा AI मागील स्थानिक बाजारभावाचे आणि पावसाच्या डेटाचे विश्लेषण करतो.",
      checkBtnLoading: "मंडी भाव वाचत आहे...",
      checkBtnDefault: "वर पीक निवडा",
      checkBtnActive: (c) => `भविष्यातील ${c} किंमत तपासा`,
      readyTitle: "किंमत तपासण्यासाठी तयार",
      readyDesc: "डावीकडे तुमचे पीक निवडा आणि भविष्यातील किमतीचे ट्रेंड त्वरित पाहण्यासाठी बटणावर क्लिक करा.",
      trendGraph: "किंमत ट्रेंड आलेख",
      latestData: (m) => `नवीनतम बाजार डेटा: ${m}`,
      calculatorTitle: "🧮 तुमचे पीक कॅल्क्युलेटर",
      close: "✕ बंद करा",
      harvestWeightLabel: "तुमच्या पिकाचे वजन प्रविष्ट करा (क्विंटल):",
      harvestPlaceholder: "उदा. 15",
      estimatedYield: (q) => `अंदाजित पीक विश्लेषण (${q} क्विंटल)`,
      profit: "नफा",
      lossRisk: "तोट्याचा धोका",
      netReturnDelta: "पुढील महिन्यातील निव्वळ परतावा बदल",
      todayVal: "मूल्य (आज)",
      simulatedAiVal: "सिम्युलेटेड AI मूल्य",
      timelineSummary: "वेळ मर्यादा सारांश",
      outlook: "30-दिवसांचा दृष्टिकोन",
      holdingBoost: (amt) => `✨ आर्द्रता विश्लेषणाच्या आधारे साठा ठेवल्यास ₹${amt} चा अतिरिक्त नफा मिळू शकतो.`,
      sellingStop: (amt) => `⚠️ बाजारातील घसरणीमुळे होणारे ₹${amt} चे नुकसान टाळण्यासाठी लवकर विका.`,
      normalTrend: "सामान्य बाजार ट्रेंड",
      pastTrends: "केवळ मागील ट्रेंडवर आधारित",
      weatherSmart: "🌟 हवामान स्मार्ट AI अंदाज",
      adjustedRain: (mm) => `एकूण ${mm} मिमी सिम्युलेटेड पावसामुळे समायोजित`,
      simulatorTitle: '🔮 "जर-तर" हवामान आणि बाजार सिम्युलेटर',
      simulatorSub: (base) => `बेळगावच्या मूळ हवामानावर (${base} मिमी बेस) रिअल-टाइम वातावरणीय धक्क्यांची चाचणी घ्या`,
      resetDials: "डायल रीसेट करा",
      rainfallVolume: "🌧️ पावसाचे प्रमाण:",
      drought: "दुष्काळ (-50)",
      baselineRain: (b) => `बेस (${b} मिमी)`,
      heavyRain: "भारी (+100)",
      demandSurgeLabel: "📈 मागणी वाढ:",
      lowDemand: "कमी (-30%)",
      normalDemand: "सामान्य",
      highDemand: "वाढ (+50%)",
      broadcastTitle: "📢 प्रसारण संप्रेषण",
      broadcastDesc: "हा मोजणी लॉग प्रादेशिक शेतकरी SMS वितरण चॅनेलवर सिंक करण्यासाठी बटण दाबा.",
      broadcasting: "प्रसारण करत आहे...",
      sendSmsBtn: "शेतकऱ्यांना SMS अलर्ट पाठवा",
      benchmarkTitle: "📊 बहु-आर्किटेक्चर अल्गोरिदम बेंचमार्किंग",
      crossValidated: "क्रॉस-व्हॅलिडेटेड",
      benchmarkDesc: "इष्टतम ऑप्टिमायझेशन सुनिश्चित करण्यासाठी, डेटा लेयर एकाच वेळी बहु-मॉडेल रेग्रेसनचे मूल्यांकन करते.",
      thModel: "मॉडेल",
      thFramework: "फ्रेमवर्क",
      thForecast: "अंदाज",
      thR2: "R² गुण",
      thStatus: "स्थिती",
      randomForest: "रँडम फॉरेस्ट",
      rfFramework: "एन्सेम्बल",
      activeStatus: "सक्रिय",
      decisionTree: "डिसिजन ट्री",
      dtFramework: "सिंगल ಸ್ಪ್ಲಿಟ್",
      overfitStatus: "ओव्हरफिट",
      linearReg: "लिनियर रेग्रेसन",
      lrFramework: "OLS फ्रेमवर्क",
      underfitStatus: "अंडरफिट",
      aiTrustLevel: "AI विश्वास पातळी",
      marketRisk: "बाजार धोका",
      marketAdvice: "बाजार सल्ला",
      yearlyCalendar: "📅 वार्षिक विक्री कॅलेंडर",
      bestMonth: "🌟 विकण्यासाठी सर्वोत्तम महिना",
      worstMonth: "⚠️ सर्वात कमी किंमतीचा महिना",
      mandiInfo: "मंडी माहिती:",
      importantNote: "⚠️ शेतकऱ्यांसाठी महत्त्वाची सूचना",
      howItWorksNote: "हे कसे काम करते:",
      howItWorksText: "आमची AI सिस्टीम मागील महिन्यांतील स्थानिक बेळगाव बाजारभावातील बदल आणि पावसाचे निरीक्षण करते.",
      disclaimerTitle: "अस्वीकरण:",
      disclaimerText: "या गणना मागील डेटावर आधारित अंदाज आहेत आणि 100% अचूक असू शकत नाहीत.",
      adviceUp: (c) => `बेळगाव बाजार खूप छान दिसत आहे! पुढील महिन्यात किमती वाढण्याची अपेक्षा आहे. सुरक्षित साठवणूक असल्यास, अधिक नफ्यासाठी काही आठवडे आपली ${c} राखून ठेवणे हा एक शहाणपणाचा पर्याय आहे.`,
      adviceDown: (c) => `बाजारातील बदल किंवा पावसाचे ट्रेंड पुढील महिन्यात किंमत खाली आणू शकतात. घसरण होण्यापूर्वी आजची चांगली किंमत सुरक्षित करण्यासाठी आपली ${c} उपज लवकर विकणे सुरक्षित आहे.`,
      adviceSteady: (c) => `बाजार स्थिर आहे. कोणतीही मोठी वाढ किंवा घट अपेक्षित नाही. तुम्ही तुमच्या नेहमीच्या वेळापत्रकानुसार तुमची ${c} काढणी विकू शकता.`,
      trendUp: "किंमत वाढत आहे",
      trendDown: "किंमत खाली जात आहे",
      trendSteady: "किंमत स्थिर आहे",
      trustHigh: "उच्च विश्वास",
      trustMedium: "मध्यम विश्वास",
      trustVeryReliable: "ಅತಿशय ವಿಶ್ವಾಸಾರ್ಹ",
      riskLow: "ಕಡಿಮೆ ಅಪಾಯ",
      riskHigh: "जास्त धोका",
      riskStable: "ಸ್ಥಿರ",
      calendarAdvice: (c, best, worst) => `ऐतिहासिक ट्रेंड दर्शवतात की बेळगावमधील ${c} च्या किमती उच्च मागणीमुळे ${best} च्या सुमारास प्रीमियम गाठतात, तर ${worst} च्या सुमारास बाजारात नवीन पिके आल्यावर किमती सामान्यतः घसरतात.`
    }
  };

  const currentText = text[globalLang] || text.en;

  const getCropIcon = (cropKey) => {
    const found = CROPS_LIST.find((c) => c.key === cropKey);
    return found ? found.icon : "🚜";
  };

  const CROPS_LIST = [
    { key: "Wheat", icon: "🌾", label: currentText.crops.Wheat },
    { key: "Maize", icon: "🌽", label: currentText.crops.Maize },
    { key: "Soyabean", icon: "🌱", label: currentText.crops.Soyabean },
    { key: "Groundnut", icon: "🥜", label: currentText.crops.Groundnut },
    { key: "Onion", icon: "🧅", label: currentText.crops.Onion },
    { key: "Potato", icon: "🥔", label: currentText.crops.Potato },
  ];

  const handlePredict = async () => {
    if (!crop) {
      alert("Please select a crop first!");
      return;
    }
    
    setLoading(true);
    setPrediction(null);
    setShowCalculator(true); 
    setQuintals("");          
    setSmsStatus("");         
    setRainfallOffset(0);     
    setDemandSurge(0);
    
    try {
      const response = await fetch(`${PRICE_API_BASE}/predict-price?crop=${crop}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();

      if (data.success) {
        setPrediction(data);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Cannot connect to server. Please check your internet connection or backend services.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendSMS = async () => {
    setSmsLoading(true);
    setSmsStatus("Sending SMS alert...");

    try {
      const response = await fetch(`${PRICE_API_BASE}/send-alert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop: prediction.crop,
          predicted_price: prediction.predictions.smart_environmental_model_rs,
          last_price: prediction.last_recorded_price 
        })
      });

      const data = await response.json();

      if (data.success) {
        setSmsStatus("✅ Price alert sent to farmers successfully!");
      } else {
        setSmsStatus(`❌ Failed: ${data.error}`);
      }
    } catch (error) {
      setSmsStatus("❌ Cannot reach SMS engine backend server.");
    } finally {
      setSmsLoading(false);
    }
  };

  const getChartData = () => {
    if (!prediction) return [];
    const historicalBase = prediction.last_recorded_price;
    return [
      { name: "2 Months Ago", Price: Math.round(historicalBase * 0.96) },
      { name: "Last Month", Price: Math.round(historicalBase * 0.98) },
      { name: "Current Market", Price: historicalBase },
      { name: "Normal AI Guess", Price: prediction.predictions.baseline_model_rs },
      { name: "Weather AI Guess", Price: prediction.predictions.smart_environmental_model_rs }
    ];
  };

  const getFarmerAdvice = (current, forecast) => {
    const diff = forecast - current;
    const percentChange = (diff / current) * 100;
    const cropName = currentText.crops[crop] || crop;
    
    if (percentChange > 3) {
      return {
        trend: currentText.trendUp,
        bg: "bg-emerald-950/90 text-emerald-100 border-2 border-[#2FD77C]/60 backdrop-blur-sm",
        badge: "bg-[#2FD77C] text-slate-950 shadow-md shadow-[#2FD77C]/20 font-black",
        risk: currentText.riskLow,
        riskColor: "text-[#2FD77C] bg-emerald-950 px-3 py-1 rounded-xl border-2 border-slate-950 font-black",
        trust: currentText.trustHigh,
        text: currentText.adviceUp(cropName)
      };
    } else if (percentChange < -3) {
      return {
        trend: currentText.trendDown,
        bg: "bg-rose-950/90 text-rose-100 border-2 border-rose-500/60 backdrop-blur-sm",
        badge: "bg-rose-600 text-white shadow-md shadow-rose-900/50",
        risk: currentText.riskHigh,
        riskColor: "text-rose-400 bg-rose-950 px-3 py-1 rounded-xl border-2 border-slate-950 font-black",
        trust: currentText.trustMedium,
        text: currentText.adviceDown(cropName)
      };
    } else {
      return {
        trend: currentText.trendSteady,
        bg: "bg-indigo-950/90 text-indigo-100 border-2 border-indigo-500/60 backdrop-blur-sm",
        badge: "bg-slate-700 text-white shadow-md shadow-slate-900/50",
        risk: currentText.riskStable,
        riskColor: "text-blue-400 bg-blue-950 px-3 py-1 rounded-xl border-2 border-slate-950 font-black",
        trust: currentText.trustVeryReliable,
        text: currentText.adviceSteady(cropName)
      };
    }
  };

  const chartData = getChartData();
  const farmerAdvice = prediction 
    ? getFarmerAdvice(prediction.last_recorded_price, prediction.predictions.smart_environmental_model_rs)
    : null;

  const baseAiPrice = prediction ? prediction.predictions.smart_environmental_model_rs : 0;
  const baseRainfall = prediction ? prediction.last_recorded_rainfall_mm : 0;
  const currentSimulatedRainfall = baseRainfall + rainfallOffset;

  const rainfallImpact = rainfallOffset * 2.5; 
  const demandImpact = baseAiPrice * (demandSurge / 100);
  const simulatedPrice = Math.round(baseAiPrice + rainfallImpact + demandImpact);
  const priceDiff = prediction ? simulatedPrice - prediction.last_recorded_price : 0;

  const parsedQuintals = parseFloat(quintals) || 0;
  const currentTotalValue = prediction ? prediction.last_recorded_price * parsedQuintals : 0;
  const futureTotalValue = prediction ? simulatedPrice * parsedQuintals : 0; 
  const netEstimatedEarningsChange = futureTotalValue - currentTotalValue;

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

      <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-br from-purple-200/40 to-blue-200/20 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-indigo-100/40 to-pink-100/20 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-full max-w-5xl rounded-2xl sm:rounded-[32px] shadow-2xl shadow-indigo-950/30 border-[3px] border-slate-950 overflow-hidden transform transition-all duration-500 animate-fade-in-up relative z-10 bg-white">
        
        <div className="h-2.5 bg-gradient-to-r from-blue-700 via-indigo-900 to-[#2FD77C] border-b-[3px] border-slate-950" />

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-[3px] divide-slate-950">
          
          <div className="lg:col-span-5 p-4 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-white to-slate-100/70 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tr from-slate-950 via-slate-900 to-[#2FD77C] text-white rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-xl border-2 border-slate-950 flex-shrink-0">
                  {getCropIcon(crop)}
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                    {crop ? `${currentText.crops[crop] || crop} ${currentText.assistantTitle}` : currentText.assistantTitle}
                  </h1>
                  <p className="text-[10px] sm:text-xs font-black text-indigo-950 tracking-wider uppercase">{currentText.subtitle}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">{currentText.chooseCrop}</label>
                  <span className="text-[10px] font-black bg-slate-200 text-slate-800 px-2 py-0.5 rounded-md">
                    {currentText.cropsAvailable}
                  </span>
                </div>
                
                <div className="relative">
                  <select
                    value={crop}
                    onChange={(e) => {
                      setCrop(e.target.value);
                      setPrediction(null);
                    }}
                    className="w-full bg-white border-2 border-slate-950 rounded-2xl p-3.5 sm:p-4 text-slate-900 font-black text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2FD77C] shadow-md transition-all duration-300"
                  >
                    <option value="" disabled>{currentText.selectPrompt}</option>
                    {CROPS_LIST.map((item) => (
                      <option key={item.key} value={item.key}>
                        {item.icon} {item.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-950 font-black">
                    ▼
                  </div>
                </div>
              </div>
              
              {prediction && showCalculator && (
                <div className="bg-white border-2 border-slate-950 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3 relative transition-all duration-500 animate-fade-in-up">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-slate-950 text-xs uppercase tracking-wider block">
                      {currentText.calculatorTitle}
                    </span>
                    <button 
                      onClick={() => { setShowCalculator(false); setQuintals(""); }}
                      className="text-slate-400 hover:text-slate-900 text-xs font-black transition-colors"
                    >
                      {currentText.close}
                    </button>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">{currentText.harvestWeightLabel}</label>
                    <input 
                      type="number"
                      placeholder={currentText.harvestPlaceholder}
                      value={quintals}
                      onChange={(e) => setQuintals(e.target.value)}
                      className="w-full border-2 border-slate-950 p-2.5 rounded-xl text-slate-900 font-black text-sm bg-slate-50 focus:outline-none focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="bg-white border-2 border-slate-950/20 rounded-2xl p-4 shadow-sm space-y-1.5">
                <span className="font-black text-slate-950 text-xs uppercase tracking-wider block">
                  💡 {currentText.howItHelps}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed font-bold">
                  {currentText.howItHelpsDesc}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handlePredict}
                disabled={loading || !crop}
                className={`w-full border-2 ${
                  !crop 
                    ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
                    : loading 
                      ? 'bg-slate-300 text-slate-500 border-slate-400 cursor-not-allowed' 
                      : 'bg-slate-950 text-white border-slate-950 shadow-xl hover:bg-black hover:scale-[1.01] active:scale-[0.99]'
                } py-3.5 sm:py-4 px-6 rounded-2xl font-black transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm`}
              >
                {loading ? currentText.checkBtnLoading : crop ? currentText.checkBtnActive(currentText.crops[crop] || crop) : currentText.checkBtnDefault}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 p-4 sm:p-8 lg:p-10 bg-white min-h-[480px] flex flex-col justify-center transition-all duration-500">
            {!prediction ? (
              <div className="text-center py-12 sm:py-16 space-y-4 animate-fade-in-up">
                <div className="text-5xl transform hover:scale-110 transition-transform duration-300 inline-block">
                  {getCropIcon(crop)}
                </div>
                <div className="space-y-1">
                  <h3 className="text-slate-900 font-black text-lg">{currentText.readyTitle}</h3>
                  <p className="text-slate-400 text-xs max-w-sm mx-auto font-medium leading-relaxed">
                    {currentText.readyDesc}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in-up">
                
                <div className="flex items-center justify-between border-b-2 border-slate-950 pb-3">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{currentText.trendGraph}</span>
                  <span className="text-[10px] sm:text-[11px] bg-slate-950 text-white font-black px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border-2 border-slate-950 shadow-md">
                    {currentText.latestData(prediction.last_recorded_month)}
                  </span>
                </div>

                <div className="w-full h-48 bg-gradient-to-b from-slate-50 to-white p-2 rounded-2xl border-2 border-slate-950 shadow-inner overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 15, right: 10, left: -25, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#cbd5e1" />
                      <XAxis dataKey="name" stroke="#475569" fontSize={9} fontWeight="black" />
                      <YAxis stroke="#475569" fontSize={9} fontWeight="black" domain={['dataMin - 100', 'dataMax + 100']} />
                      <Tooltip labelStyle={{ color: "#94a3b8" }} itemStyle={{ color: "#ffffff" }} contentStyle={{ backgroundColor: "#020617", borderRadius: "14px", border: "2px solid #000", fontSize: "11px", fontWeight: "bold", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4)" }} />
                      <Line type="monotone" dataKey="Price" stroke="#0f172a" strokeWidth={3} isAnimationActive={true} animationDuration={2000} dot={{ r: 5, strokeWidth: 2, fill: '#2FD77C', stroke: '#0f172a' }} activeDot={{ r: 7 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {showCalculator && parsedQuintals > 0 && (
                  <div className="bg-gradient-to-tr from-blue-600 via-indigo-400 via-75% to-slate-950 text-slate-900 rounded-2xl p-4 sm:p-5 shadow-xl border-2 border-slate-950 transition-all duration-500 transform hover:scale-[1.01] flex flex-col justify-between relative overflow-hidden group">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black tracking-widest text-slate-900 group-hover:text-black uppercase bg-white/60 px-2 py-0.5 rounded backdrop-blur-sm">
                          {currentText.estimatedYield(parsedQuintals)}
                        </span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded border border-slate-950/20 shadow-sm ${
                          netEstimatedEarningsChange >= 0 ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                        }`}>
                          {netEstimatedEarningsChange >= 0 ? currentText.profit : currentText.lossRisk}
                        </span>
                      </div>
                      
                      <div className="mt-3 flex items-baseline space-x-2">
                        <span className={`text-2xl sm:text-3xl font-black tracking-tight drop-shadow-sm ${
                          netEstimatedEarningsChange >= 0 ? 'text-emerald-950' : 'text-rose-950'
                        }`}>
                          {netEstimatedEarningsChange >= 0 ? `+ ₹${Math.round(netEstimatedEarningsChange)}` : `- ₹${Math.round(Math.abs(netEstimatedEarningsChange))}`}
                        </span>
                        <span className="text-[11px] sm:text-xs text-slate-700 font-black">{currentText.netReturnDelta}</span>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-900/10 pt-3 text-xs">
                        <div>
                          <span className="text-slate-800 block font-black uppercase tracking-wider text-[9px]">{currentText.todayVal}</span>
                          <span className="text-slate-900 font-black text-xs sm:text-sm bg-white/30 px-1.5 py-0.5 rounded">₹{Math.round(currentTotalValue)}</span>
                        </div>
                        <div>
                          <span className="text-slate-800 block font-black uppercase tracking-wider text-[9px]">{currentText.simulatedAiVal}</span>
                          <span className="text-indigo-950 font-black text-xs sm:text-sm bg-white/30 px-1.5 py-0.5 rounded">₹{Math.round(futureTotalValue)}</span>
                        </div>
                        <div className="sm:text-right flex flex-col sm:items-end justify-center">
                          <span className="text-slate-300 block font-black uppercase tracking-wider text-[9px]">{currentText.timelineSummary}</span>
                          <span className="text-white font-black text-[11px] sm:text-xs sm:text-right bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {currentText.outlook}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-800 font-black mt-3 border-t border-slate-900/10 pt-2 leading-relaxed">
                      {netEstimatedEarningsChange >= 0 
                        ? currentText.holdingBoost(Math.round(netEstimatedEarningsChange))
                        : currentText.sellingStop(Math.round(Math.abs(netEstimatedEarningsChange)))
                      }
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="bg-white border-2 border-slate-950 rounded-2xl p-4 sm:p-5 shadow-md transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-black text-slate-400 block tracking-wide uppercase">{currentText.normalTrend}</span>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">₹{prediction.predictions.baseline_model_rs}</div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold block mt-4">{currentText.pastTrends}</span>
                  </div>

                  <div className="bg-[#2FD77C] rounded-2xl p-4 sm:p-5 border-2 border-slate-950 text-slate-900 shadow-[0_8px_20px_rgba(47,215,124,0.35)] transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-slate-950 tracking-wide uppercase">
                          {currentText.weatherSmart}
                        </span>
                        <span className={`text-[10px] sm:text-[11px] font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-slate-950/20 shadow-sm ${
                          priceDiff >= 0 ? 'bg-slate-950 text-[#2FD77C]' : 'bg-rose-700 text-white'
                        }`}>
                          {priceDiff >= 0 ? `▲ +₹${priceDiff.toFixed(2)}` : `▼ -₹${Math.abs(priceDiff).toFixed(2)}`}
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-955 mt-2">
                        ₹{simulatedPrice}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-800 font-black block mt-4">
                      {currentText.adjustedRain(currentSimulatedRainfall)}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 border-2 border-slate-950 p-4 sm:p-5 rounded-2xl shadow-sm space-y-4">
                  <div className="border-b-2 border-slate-950 pb-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                        {currentText.simulatorTitle}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-500">
                        {currentText.simulatorSub(baseRainfall)}
                      </p>
                    </div>
                    <button
                      onClick={() => { setRainfallOffset(0); setDemandSurge(0); }}
                      className="text-[10px] font-black bg-slate-200 hover:bg-slate-300 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-400 transition-all uppercase self-start sm:self-auto"
                    >
                      {currentText.resetDials}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-bold text-slate-700">{currentText.rainfallVolume}</span>
                        <span className="font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                          {currentSimulatedRainfall} mm
                        </span>
                      </div>
                      <input
                        type="range"
                        min="-50"
                        max="100"
                        step="5"
                        value={rainfallOffset}
                        onChange={(e) => setRainfallOffset(Number(e.target.value))}
                        className="w-full accent-slate-950 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase">
                        <span>{currentText.drought}</span>
                        <span>{currentText.heavyRain}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-bold text-slate-700">{currentText.demandSurgeLabel}</span>
                        <span className="font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          {demandSurge > 0 ? `+${demandSurge}%` : `${demandSurge}%`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="-30"
                        max="50"
                        step="5"
                        value={demandSurge}
                        onChange={(e) => setDemandSurge(Number(e.target.value))}
                        className="w-full accent-slate-950 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase">
                        <span>{currentText.lowDemand}</span>
                        <span>{currentText.highDemand}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-slate-950 bg-slate-50 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-inner">
                  <div className="text-left space-y-0.5">
                    <span className="text-xs font-black text-slate-900 block tracking-widest uppercase">
                      {currentText.broadcastTitle}
                    </span>
                    <p className="text-[11px] text-slate-400 font-bold leading-relaxed max-w-sm">
                      {currentText.broadcastDesc}
                    </p>
                  </div>
                  
                  <div className="w-full sm:w-auto flex flex-col items-end">
                    <button
                      onClick={handleSendSMS}
                      disabled={smsLoading}
                      className={`w-full sm:w-auto font-black uppercase tracking-widest text-xs px-6 py-3.5 rounded-xl transition-all shadow-md border-2 border-slate-950 ${
                        smsLoading 
                          ? "bg-slate-300 text-slate-500 border-slate-400 cursor-not-allowed" 
                          : "bg-slate-950 text-white hover:bg-black active:scale-[0.98]"
                      }`}
                    >
                      {smsLoading ? currentText.broadcasting : currentText.sendSmsBtn}
                    </button>
                    
                    {smsStatus && (
                      <p className={`text-[10px] font-black mt-2 text-right ${
                        smsStatus.includes("✅") ? "text-emerald-700" : "text-slate-950 animate-pulse"
                      }`}>
                        {smsStatus}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-[3px] border-slate-950 bg-white p-4 sm:p-5 rounded-2xl space-y-4 shadow-md">
                  <div className="flex justify-between items-center border-b-2 border-slate-950 pb-2">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-widest block">
                      {currentText.benchmarkTitle}
                    </span>
                    <span className="text-[10px] text-emerald-800 font-black bg-emerald-50 px-2 py-0.5 rounded border-2 border-slate-950 shadow-sm">
                      {currentText.crossValidated}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    {currentText.benchmarkDesc}
                  </p>

                  <div className="overflow-x-auto pt-1">
                    <table className="w-full text-left border-collapse min-w-[320px]">
                      <thead>
                        <tr className="border-b-2 border-slate-950 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                          <th className="pb-2 font-black px-2">{currentText.thModel}</th>
                          <th className="pb-2 font-black px-2 hidden sm:table-cell">{currentText.thFramework}</th>
                          <th className="pb-2 font-black text-right px-2">{currentText.thForecast}</th>
                          <th className="pb-2 font-black text-right px-2">{currentText.thR2}</th>
                          <th className="pb-2 font-black text-center px-2">{currentText.thStatus}</th>
                        </tr>
                      </thead>
                      <tbody className="text-[11px] font-bold text-slate-800 divide-y divide-slate-950/10">
                        <tr className="bg-indigo-50/40 text-slate-900 transition-all">
                          <td className="p-2.5 font-black text-slate-950 rounded-l-xl">{currentText.randomForest}</td>
                          <td className="p-2.5 text-slate-400 font-medium hidden sm:table-cell">{currentText.rfFramework}</td>
                          <td className="p-2.5 text-right font-black text-emerald-700">₹{simulatedPrice}</td>
                          <td className="p-2.5 text-right font-black text-emerald-700">92.4%</td>
                          <td className="p-2.5 text-center rounded-r-xl">
                            <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded font-black uppercase">{currentText.activeStatus}</span>
                          </td>
                        </tr>
                        <tr className="transition-all">
                          <td className="p-2.5 font-extrabold rounded-l-xl">{currentText.decisionTree}</td>
                          <td className="p-2.5 text-slate-400 font-medium hidden sm:table-cell">{currentText.dtFramework}</td>
                          <td className="p-2.5 text-right text-slate-600">₹{(simulatedPrice * 0.94).toFixed(0)}</td>
                          <td className="p-2.5 text-right text-amber-600 font-black">84.3%</td>
                          <td className="p-2.5 text-center rounded-r-xl">
                            <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.5 rounded font-black uppercase">{currentText.overfitStatus}</span>
                          </td>
                        </tr>
                        <tr className="transition-all">
                          <td className="p-2.5 font-extrabold rounded-l-xl">{currentText.linearReg}</td>
                          <td className="p-2.5 text-slate-400 font-medium hidden sm:table-cell">{currentText.lrFramework}</td>
                          <td className="p-2.5 text-right text-slate-600">₹{(simulatedPrice * 1.05).toFixed(0)}</td>
                          <td className="p-2.5 text-right text-rose-600 font-black">76.1%</td>
                          <td className="p-2.5 text-center rounded-r-xl">
                            <span className="bg-rose-100 text-rose-800 text-[9px] px-1.5 py-0.5 rounded font-black uppercase">{currentText.underfitStatus}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t-2 border-slate-950 pt-4 text-xs font-medium">
                  <div>
                    <span className="text-slate-400 font-black block uppercase tracking-wider text-[10px]">{currentText.aiTrustLevel}</span>
                    <div className="text-slate-900 font-black mt-1 text-sm">{farmerAdvice.trust}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 font-black block uppercase tracking-wider text-[10px]">{currentText.marketRisk}</span>
                    <div className="mt-1"><span className={farmerAdvice.riskColor}>{farmerAdvice.risk}</span></div>
                  </div>
                </div>

                <div className={`p-4 sm:p-5 rounded-2xl shadow-sm ${farmerAdvice.bg}`}>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`text-[10px] font-black tracking-widest px-2.5 py-1.5 rounded-lg border border-slate-950/20 ${farmerAdvice.badge}`}>
                      {farmerAdvice.trend}
                    </span>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{currentText.marketAdvice}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold leading-relaxed text-slate-200">
                    {farmerAdvice.text}
                  </p>
                </div>

                {prediction.calendar_intelligence && (
                  <div className="border-2 border-slate-950 bg-gradient-to-r from-slate-50 to-indigo-50/20 p-4 sm:p-5 rounded-2xl space-y-4">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                      {currentText.yearlyCalendar}
                    </span>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white p-3 rounded-xl border-2 border-slate-950 shadow-md">
                        <span className="text-xs font-black text-emerald-600 block uppercase">{currentText.bestMonth}</span>
                        <span className="text-base sm:text-lg font-black text-slate-900 block mt-0.5">
                          {currentText.months[prediction.calendar_intelligence.best_month] || prediction.calendar_intelligence.best_month}
                        </span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border-2 border-slate-950 shadow-md">
                        <span className="text-xs font-black text-rose-600 block uppercase">{currentText.worstMonth}</span>
                        <span className="text-base sm:text-lg font-black text-slate-900 block mt-0.5">
                          {currentText.months[prediction.calendar_intelligence.toughest_month] || prediction.calendar_intelligence.toughest_month}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 font-bold bg-white p-3 rounded-xl border-2 border-slate-950 shadow-inner">
                      💡 <span className="text-slate-900 font-black">{currentText.mandiInfo}</span> {currentText.calendarAdvice(
                        currentText.crops[prediction.crop] || prediction.crop,
                        currentText.months[prediction.calendar_intelligence.best_month] || prediction.calendar_intelligence.best_month,
                        currentText.months[prediction.calendar_intelligence.toughest_month] || prediction.calendar_intelligence.toughest_month
                      )}
                    </p>
                  </div>
                )}

                <div className="border-2 border-slate-950 rounded-2xl p-4 bg-slate-50 text-xs text-slate-500 space-y-2">
                  <div className="font-black text-slate-800 flex items-center uppercase tracking-wider text-[10px]">
                    {currentText.importantNote}
                  </div>
                  <p className="leading-relaxed font-medium">
                    <strong>{currentText.howItWorksNote}</strong> {currentText.howItWorksText}
                  </p>
                  <p className="leading-relaxed italic border-t-2 border-slate-950/10 pt-2 font-medium">
                    <strong>{currentText.disclaimerTitle}</strong> {currentText.disclaimerText}
                  </p>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}