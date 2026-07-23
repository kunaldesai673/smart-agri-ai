import { useLanguage } from "../LanguageContext";

export default function About() {
  const { globalLang } = useLanguage();

  // 🌐 FULL PAGE TRANSLATION DICTIONARY
  const text = {
    en: {
      title: "About Smart Agri AI",
      subtitle: "Belgaum Region Agricultural Intelligence & Project Documentation",
      sec1Title: "1. Project Overview & Background",
      sec1Desc: "Farming is hard work, and unpredictability makes it tougher. In the Belgaum region, hardworking farming families often face major financial losses due to two main reasons: sudden crop leaf diseases that ruin harvests, and sudden drops in mandi market prices. Smart Agri AI is a simple, smart digital assistant built specifically to help farmers solve these problems using modern technology.",
      sec2Title: "2. How We Implemented Our Project",
      sec2Sub: "The project is divided into clear technical layers working together between the user interface and the backend server:",
      tableLayer: "System Layer",
      tableDetails: "Implementation Details & Technology Used",
      frontendLayer: "Frontend Interface",
      frontendDesc: "Built using React 18 and styled with Tailwind CSS. It features a clean bento-grid layout, multi-language support (English, Kannada, Hindi, and Marathi), and smooth interactive components designed for both mobile phones in fields and desktop browsers.",
      backendLayer: "Backend Server",
      backendDesc: "Powered by a Python Flask server running locally or on cloud deployment. It handles data communication, processes user requests, executes machine learning models, and manages regional SMS broadcast channels.",
      aiDoctorLayer: "Crop Leaf Doctor (AI Diagnostics)",
      aiDoctorDesc: "Uses deep learning image classification to scan uploaded photos of crop leaves. It detects active disease signatures and instantly outputs targeted cures and plant health advice.",
      priceLayer: "Mandi Price Flow (Forecasting Engine)",
      priceDesc: "Merges historical Belgaum APMC transaction logs with rainfall records. It evaluates multi-model regressions (Random Forest and Decision Tree) to project 30-day future price trends and calculate harvest storage returns.",
      sec3Title: "3. How to Use the Platform",
      step1Title: "Step 1: Choose Your Language",
      step1Desc: "Select English, Kannada, Hindi, or Marathi from the top language bar so all information appears in your preferred dialect.",
      step2Title: "Step 2: Select a Tool",
      step2DescText1: "Click on ",
      step2DescLink1: "Mandi Price Flow",
      step2DescText2: " to check future crop rates and calculate total yield value, or click ",
      step2DescLink2: "Crop Leaf Doctor",
      step2DescText3: " to diagnose sick plants.",
      step3Title: "Step 3: Gain Insights & Share Alerts",
      step3Desc: "Review future trends, check best months to sell your produce, and broadcast price updates directly to local farmer SMS groups.",
      sec4Title: "4. Key Advantages & Benefits",
      adv1Title: "Instant Problem Solving:",
      adv1Desc: " Farmers get immediate answers in seconds right from their phones instead of waiting days for expert advice.",
      adv2Title: "Better Profit Decisions:",
      adv2Desc: " Weather-adjusted price predictions help growers decide whether to sell immediately or hold their crop safely for higher profits.",
      adv3Title: "Simple & Accessible:",
      adv3Desc: " Designed with clear visual indicators and local languages so anyone can use it without technical training.",
      footerBadge: "Presentation Ready",
      footerText: "🌱 Built with dedication for the farming communities of the Belgaum Region • 2026"
    },
    kn: {
      title: "ಸ್ಮಾರ್ಟ್ ಅಗ್ರಿ AI ಬಗ್ಗೆ",
      subtitle: "ಬೆಳಗಾವಿ ಪ್ರಾಂತ್ಯದ ಕೃಷಿ ಗುಪ್ತಚರ ಮತ್ತು ಯೋಜನಾ ದಸ್ತಾವೇಜನ್ನು",
      sec1Title: "1. ಯೋಜನೆಯ ಅವಲೋಕನ ಮತ್ತು ಹಿನ್ನೆಲೆ",
      sec1Desc: "ಕೃಷಿಯು ಕಷ್ಟಕರವಾದ ಕೆಲಸ, ಮತ್ತು ಅನಿಶ್ಚಿತತೆಯು ಅದನ್ನು ಇನ್ನಷ್ಟು ಕಷ್ಟಕರವಾಗಿಸುತ್ತದೆ. ಬೆಳಗಾವಿ ಪ್ರಾಂತ್ಯದಲ್ಲಿ, ಕಷ್ಟಪಟ್ಟು ಕೆಲಸ ಮಾಡುವ ರೈತ ಕುಟುಂಬಗಳು ಮುಖ್ಯವಾಗಿ ಎರಡು ಕಾರಣಗಳಿಂದ ದೊಡ್ಡ ಆರ್ಥಿಕ ನಷ್ಟವನ್ನು ಎದುರಿಸುತ್ತವೆ: ಬೆಳೆಗಳನ್ನು ನಾಶಪಡಿಸುವ ಹಠಾತ್ ಎಲೆ ರೋಗಗಳು ಮತ್ತು ಮಂಡಿ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳಲ್ಲಿನ ಹಠಾತ್ ಕುಸಿತ. ಸ್ಮಾರ್ಟ್ ಅಗ್ರಿ AI ಆಧುನಿಕ ತಂತ್ರಜ್ಞಾನವನ್ನು ಬಳಸಿ ಈ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ರೈತರಿಗೆ ಸಹಾಯ ಮಾಡಲು ನಿರ್ಮಿಸಲಾದ ಸರಳ, ಸ್ಮಾರ್ಟ್ ಡಿಜಿಟಲ್ ಸಹಾಯಕವಾಗಿದೆ.",
      sec2Title: "2. ನಾವು ನಮ್ಮ ಯೋಜನೆಯನ್ನು ಹೇಗೆ ಜಾರಿಗೆ ತಂದಿದ್ದೇವೆ",
      sec2Sub: "ಬಳಕೆದಾರರ ಇಂಟರ್ಫೇಸ್ ಮತ್ತು ಬ್ಯಾಕೆಂಡ್ ಸರ್ವರ್ ನಡುವೆ ಒಟ್ಟಾಗಿ ಕೆಲಸ ಮಾಡುವ ಸ್ಪಷ್ಟ ತಾಂತ್ರಿಕ ಪದರಗಳಾಗಿ ಯೋಜನೆಯನ್ನು ವಿಂಗಡಿಸಲಾಗಿದೆ:",
      tableLayer: "ಸಿಸ್ಟಮ್ ಲೇಯರ್",
      tableDetails: "বাimplementation ವಿವರಗಳು ಮತ್ತು ಬಳಸಿದ ತಂತ್ರಜ್ಞಾನ",
      frontendLayer: "ಫ್ರಂಟ್‌ಎಂಡ್ ಇಂಟರ್ಫೇಸ್",
      frontendDesc: "React 18 ಬಳಸಿ ನಿರ್ಮಿಸಲಾಗಿದೆ ಮತ್ತು Tailwind CSS ನೊಂದಿಗೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ಇದು ಕ್ಲೀನ್ ಬೆಂಟೋ-ಗ್ರಿಡ್ ಲೇಔಟ್, ಬಹು-ಭಾಷಾ ಬೆಂಬಲ (ಇಂಗ್ಲಿಷ್, ಕನ್ನಡ, ಹಿಂದಿ ಮತ್ತು ಮರಾಠಿ) ಮತ್ತು ಮೊಬೈಲ್ ಹಾಗೂ ಡೆಸ್ಕ್‌ಟಾಪ್‌ಗಳಿಗಾಗಿ ಸುಗಮ ಸಂವಾದಾತ್ಮಕ ಘಟಕಗಳನ್ನು ಹೊಂದಿದೆ.",
      backendLayer: "ಬ್ಯಾಕೆಂಡ್ ಸರ್ವರ್",
      backendDesc: "ಸ್ಥಳೀಯವಾಗಿ ಅಥವಾ ಕ್ಲೌಡ್ ನಿಯೋಜನೆಯಲ್ಲಿ ಚಾಲನೆಯಲ್ಲಿರುವ ಪೈಥಾನ್ ಫ್ಲಾಸ್ಕ್ ಸರ್ವರ್‌ನಿಂದ ನಡೆಸಲ್ಪಡುತ್ತದೆ. ಇದು ಡೇಟಾ ಸಂವಹನವನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ, ವಿನಂತಿಗಳನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತದೆ ಮತ್ತು ಯಂತ್ರ ಕಲಿಕೆಯ ಮಾದರಿಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.",
      aiDoctorLayer: "ಬೆಳೆ ಎಲೆ ವೈದ್ಯರು (AI ರೋಗನಿರ್ಣಯ)",
      aiDoctorDesc: "ಬೆಳೆಯ ಎಲೆಗಳ ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಫೋಟೋಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ಡೀಪ್ ಲರ್ನಿಂಗ್ ಇಮೇಜ್ ವರ್ಗೀಕರಣವನ್ನು ಬಳಸುತ್ತದೆ. ಇದು ಸಕ್ರಿಯ ರೋಗ ಲಕ್ಷಣಗಳನ್ನು ಪತ್ತೆ ಮಾಡುತ್ತದೆ ಮತ್ತು ಚಿಕಿತ್ಸೆಯ ಸಲಹೆಯನ್ನು ನೀಡುತ್ತದೆ.",
      priceLayer: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಹರಿವು (ಮುನ್ಸೂಚನೆ ಎಂಜಿನ್)",
      priceDesc: "ಐತಿಹಾಸಿಕ ಬೆಳಗಾವಿ APMC ವಹಿವಾಟು ದಾಖಲೆಗಳನ್ನು ಮಳೆಯ ದಾಖಲೆಗಳೊಂದಿಗೆ ವಿಲೀನಗೊಳಿಸುತ್ತದೆ. ಇದು 30 ದಿನಗಳ ಭವಿಷ್ಯದ ಬೆಲೆ ಪ್ರವೃತ್ತಿಗಳನ್ನು ಅಂದಾಜು ಮಾಡಲು ಮಲ್ಟಿ-ಮಾದರಿ ರಿಗ್ರೆಷನ್‌ಗಳನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡುತ್ತದೆ.",
      sec3Title: "3. ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಅನ್ನು ಹೇಗೆ ಬಳಸುವುದು",
      step1Title: "ಹಂತ 1: ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      step1Desc: "ಎಲ್ಲಾ ಮಾಹಿತಿಯು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ಕಾಣಿಸಿಕೊಳ್ಳಲು ಮೇಲಿನ ಭಾಷಾ ಪಟ್ಟಿಯಿಂದ ಇಂಗ್ಲಿಷ್, ಕನ್ನಡ, ಹಿಂದಿ ಅಥವಾ ಮರಾಠಿ ಆಯ್ಕೆಮಾಡಿ.",
      step2Title: "ಹಂತ 2: ಉಪಕರಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      step2DescText1: "ಭವಿಷ್ಯದ ಬೆಳೆ ದರಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಮತ್ತು ಒಟ್ಟು ಫಸಲಿನ ಮೌಲ್ಯವನ್ನು ಲೆಕ್ಕಹಾಕಲು ",
      step2DescLink1: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಹರಿವು",
      step2DescText2: " ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ, ಅಥವಾ ರೋಗಪೀಡಿತ ಸಸ್ಯಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ",
      step2DescLink2: "ಬೆಳೆ ಎಲೆ ವೈದ್ಯರು",
      step2DescText3: " ಬಳಸಿ.",
      step3Title: "ಹಂತ 3: ಒಳನೋಟಗಳನ್ನು ಪಡೆದುಕೊಳ್ಳಿ ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
      step3Desc: "ಭವಿಷ್ಯದ ಪ್ರವೃತ್ತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ಮಾರಾಟ ಮಾಡಲು ಉತ್ತಮ ತಿಂಗಳುಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸ್ಥಳೀಯ ರೈತರ SMS ಗುಂಪುಗಳಿಗೆ ನೇರವಾಗಿ ಬೆಲೆ ನವೀಕರಣಗಳನ್ನು ಪ್ರಸಾರ ಮಾಡಿ.",
      sec4Title: "4. ಪ್ರಮುಖ ಅನುಕೂಲಗಳು ಮತ್ತು ಪ್ರಯೋಜನಗಳು",
      adv1Title: "ತ್ವರಿತ ಸಮಸ್ಯೆ ಪರಿಹಾರ:",
      adv1Desc: " ತಜ್ಞರ ಸಲಹೆಗಾಗಿ ದಿನಗಳವರೆಗೆ ಕಾಯುವ ಬದಲು ರೈತರು ತಮ್ಮ ಫೋನ್‌ಗಳಿಂದಲೇ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ತಕ್ಷಣದ ಉತ್ತರಗಳನ್ನು ಪಡೆಯುತ್ತಾರೆ.",
      adv2Title: "ಉತ್ತಮ ಲಾಭದ ನಿರ್ಧಾರಗಳು:",
      adv2Desc: " ಹವಾಮಾನ-ಹೊಂದಾಣಿಕೆಯ ಬೆಲೆ ಮುನ್ಸೂಚನೆಗಳು ತಕ್ಷಣ ಮಾರಾಟ ಮಾಡಬೇಕೆ ಅಥವಾ ಹೆಚ್ಚಿನ ಲಾಭಕ್ಕಾಗಿ ಸುರಕ್ಷಿತವಾಗಿಡಬೇಕೆ ಎಂದು ನಿರ್ಧರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
      adv3Title: "ಸರಳ ಮತ್ತು ಸುಲಭ:",
      adv3Desc: " ಸ್ಪಷ್ಟ ದೃಶ್ಯ ಸೂಚಕಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಭಾಷೆಗಳೊಂದಿಗೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ ಇದರಿಂದ ಯಾರೂ ಬೇಕಾದರೂ ತಾಂತ್ರಿಕ ತರಬೇತಿ ಇಲ್ಲದೆ ಬಳಸಬಹುದು.",
      footerBadge: "ಪ್ರಸ್ತುತಿಗೆ ಸಿದ್ಧವಾಗಿದೆ",
      footerText: "🌱 ಬೆಳಗಾವಿ ಪ್ರಾಂತ್ಯದ ಕೃಷಿ ಸಮುದಾಯಗಳಿಗಾಗಿ ಸಮರ್ಪಣೆಯಿಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ • 2026"
    },
    hi: {
      title: "Smart Agri AI के बारे में",
      subtitle: "बेलगावी क्षेत्र की कृषि बुद्धिमत्ता और प्रोजेक्ट दस्तावेज़ीकरण",
      sec1Title: "1. प्रोजेक्ट का अवलोकन और पृष्ठभूमि",
      sec1Desc: "खेती एक कठिन काम है, और अनिश्चितता इसे और कठिन बना देती है। बेलगावी क्षेत्र में, मेहनती किसान परिवारों को मुख्य रूप से दो कारणों से भारी वित्तीय नुकसान का सामना करना पड़ता है: फसल के पत्तों की अचानक बीमारियां जो फसल को नष्ट कर देती हैं, और मंडी बाजार की कीमतों में अचानक गिरावट। Smart Agri AI एक सरल, स्मार्ट डिजिटल सहायक है जिसे विशेष रूप से आधुनिक तकनीक का उपयोग करके किसानों को इन समस्याओं को हल करने में मदद करने के लिए बनाया गया है।",
      sec2Title: "2. हमने अपने प्रोजेक्ट को कैसे लागू किया",
      sec2Sub: "प्रोजेक्ट को उपयोगकर्ता इंटरफ़ेस और बैकएंड सर्वर के बीच एक साथ काम करने वाली स्पष्ट तकनीकी परतों में विभाजित किया गया है:",
      tableLayer: "सिस्टम लेयर",
      tableDetails: "कार्यान्वयन विवरण और प्रयुक्त तकनीक",
      frontendLayer: "फ्रंटएंड इंटरफेस",
      frontendDesc: "React 18 का उपयोग करके निर्मित और Tailwind CSS के साथ स्टाइल किया गया। इसमें एक साफ बेंटो-ग्रिड लेआउट, बहु-भाषा समर्थन (अंग्रेजी, कन्नड़, हिंदी और मराठी), और मोबाइल और डेस्कटॉप दोनों के लिए डिज़ाइन किए गए इंटरैक्टिव घटक हैं।",
      backendLayer: "बैकएंड सर्वर",
      backendDesc: "स्थानीय रूप से या क्लाउड पर चलने वाले पायथन फ्लास्क सर्वर द्वारा संचालित। यह डेटा संचार को संभालता है, उपयोगकर्ता अनुरोधों को संसाधित करता है, और मशीन लर्निंग मॉडल निष्पादित करता है।",
      aiDoctorLayer: "फसल पत्ता डॉक्टर (AI निदान)",
      aiDoctorDesc: "फसल के पत्तों की अपलोड की गई तस्वीरों को स्कैन करने के लिए डीप लर्निंग इमेज वर्गीकरण का उपयोग करता है। यह सक्रिय रोग लक्षणों का पता लगाता है और लक्षित उपचार आउटपुट करता है।",
      priceLayer: "मंडी मूल्य प्रवाह (पूर्वानुमान इंजन)",
      priceDesc: "ऐतिहासिक बेलगावी एपीएमसी लेनदेन लॉग को वर्षा रिकॉर्ड के साथ मिलाता है। यह 30-दिन के भविष्य के मूल्य रुझानों का अनुमान लगाने और फसल भंडारण रिटर्न की गणना करने के लिए मॉडल का मूल्यांकन करता है।",
      sec3Title: "3. प्लेटफॉर्म का उपयोग कैसे करें",
      step1Title: "चरण 1: अपनी भाषा चुनें",
      step1Desc: "शीर्ष भाषा बार से अंग्रेजी, कन्नड़, हिंदी या मराठी चुनें ताकि सभी जानकारी आपकी पसंदीदा भाषा में दिखाई दे।",
      step2Title: "चरण 2: एक टूल चुनें",
      step2DescText1: "भविष्य की फसल दरों की जांच करने और कुल उपज मूल्य की गणना करने के लिए ",
      step2DescLink1: "मंडी मूल्य प्रवाह",
      step2DescText2: " पर क्लिक करें, या बीमार पौधों का निदान करने के लिए ",
      step2DescLink2: "फसल पत्ता डॉक्टर",
      step2DescText3: " पर क्लिक करें।",
      step3Title: "चरण 3: अंतर्दृष्टि प्राप्त करें और अलर्ट साझा करें",
      step3Desc: "भविष्य के रुझानों की समीक्षा करें, अपनी उपज बेचने के लिए सबसे अच्छे महीनों की जाँच करें, और स्थानीय किसान एसएमएस समूहों को सीधे मूल्य अपडेट प्रसारित करें।",
      sec4Title: "4. मुख्य लाभ और फायदे",
      adv1Title: "त्वरित समस्या समाधान:",
      adv1Desc: " विशेषज्ञ की सलाह के लिए दिनों तक इंतजार करने के बजाय किसानों को अपने फोन से सेकंडों में तत्काल उत्तर मिलते हैं।",
      adv2Title: "बेहतर लाभ निर्णय:",
      adv2Desc: " मौसम-समायोजित मूल्य पूर्वानुमान उत्पादकों को यह तय करने में मदद करते हैं कि तुरंत बेचना है या उच्च मुनाफे के लिए फसल को सुरक्षित रखना है।",
      adv3Title: "सरल और सुलभ:",
      adv3Desc: " स्पष्ट दृश्य संकेतकों और स्थानीय भाषाओं के साथ डिज़ाइन किया गया है ताकि कोई भी बिना तकनीकी प्रशिक्षण के इसका उपयोग कर सके।",
      footerBadge: "प्रस्तुति के लिए तैयार",
      footerText: "🌱 बेलगावी क्षेत्र के किसान समुदायों के लिए समर्पण के साथ निर्मित • 2026"
    },
    mr: {
      title: "Smart Agri AI बद्दल",
      subtitle: "बेळगाव प्रदेश कृषी बुद्धिमत्ता आणि प्रकल्प दस्तऐवजीकरण",
      sec1Title: "1. प्रकल्पाचे सिंहावलोकन आणि पार्श्वभूमी",
      sec1Desc: "शेती हे कष्टाचे काम आहे आणि अनिश्चिततेमुळे ते अधिक कठीण होते. बेळगाव प्रदेशात, मेहनती शेतकरी कुटुंबांना प्रामुख्याने दोन कारणांमुळे मोठ्या आर्थिक नुकसानीचा सामना करावा लागतो: पिकाची पाने खराब करणारे अचानक उद्भवणारे रोग आणि मंडी बाजारभावातील अचानक घट. आधुनिक तंत्रज्ञानाचा वापर करून शेतकऱ्यांना या समस्या सोडवण्यास मदत करण्यासाठी Smart Agri AI हा एक साधा, स्मार्ट डिजिटल सहाय्यक तयार केला आहे.",
      sec2Title: "2. आम्ही आमचा प्रकल्प कसा अंमलात आणला",
      sec2Sub: "वापरकर्ता इंटरफेस आणि बॅकएंड सर्व्हर दरम्यान एकत्र काम करणाऱ्या स्पष्ट तांत्रिक थरांमध्ये प्रकल्पाची विभागणी केली आहे:",
      tableLayer: "सिस्टम लेयर",
      tableDetails: "अंमलबजावणी तपशील आणि वापरलेले तंत्रज्ञान",
      frontendLayer: "फ्रंटएंड इंटरफेस",
      frontendDesc: "React 18 वापरून तयार केले आणि Tailwind CSS सह स्टाइल केले. यात स्वच्छ बेंटो-ग्रिड लेआउट, बहु-भाषा समर्थन (इंग्रजी, कन्नड, हिंदी आणि मराठी) आणि मोबाइल आणि डेस्कटॉपसाठी सुलभ घटक आहेत.",
      backendLayer: "बॅकएंड सर्व्हर",
      backendDesc: "स्थानिक पातळीवर किंवा क्लाउडवर चालणाऱ्या पायथन फ्लास्क सर्व्हरद्वारे समर्थित. हे डेटा संप्रेषण हाताळते, विनंत्यांवर प्रक्रिया करते आणि मशीन लर्निंग मॉडेल्स चालवते.",
      aiDoctorLayer: "पीक पान डॉक्टर (AI निदान)",
      aiDoctorDesc: "पिकाच्या पानांचे अपलोड केलेले फोटो स्कॅन करण्यासाठी डीप लर्निंग इमेज वर्गीकरण वापरते. हे सक्रिय रोगाची लक्षणे शोधते आणि लक्षित उपचारांची शिफारस करते.",
      priceLayer: "मंडी भाव प्रवाह (अंदाज इंजिन)",
      priceDesc: "ऐतिहासिक बेळगाव APMC व्यवहार नोंदी पावसाच्या रेकॉर्डसह एकत्र करते. हे ३० दिवसांच्या भविष्यातील किमतीचे ट्रेंड अंदाज करण्यासाठी आणि पीक साठवणुकीचा परतावा मोजण्यासाठी मूल्यमापन करते.",
      sec3Title: "3. प्लॅटफॉर्म कसा वापर करावा",
      step1Title: "पाऊल 1: तुमची भाषा निवडा",
      step1Desc: "सर्व माहिती तुमच्या पसंतीच्या भाषेत दिसण्यासाठी शीर्ष भाषा बारमधून इंग्रजी, कन्नड, हिंदी किंवा मराठी निवडा.",
      step2Title: "पाऊल 2: साधन निवडा",
      step2DescText1: "भविष्यातील पिकांचे दर तपासण्यासाठी आणि एकूण उत्पादनाचे मूल्य मोजण्यासाठी ",
      step2DescLink1: "मंडी भाव प्रवाह",
      step2DescText2: " वर क्लिक करा, किंवा आजारी वनस्पतींचे निदान करण्यासाठी ",
      step2DescLink2: "पीक पान डॉक्टर",
      step2DescText3: " वापरा.",
      step3Title: "पाऊल 3: अंतर्दृष्टी मिळवा आणि अलर्ट शेअर करा",
      step3Desc: "भविष्यातील ट्रेंडचे पुनरावलोकन करा, तुमचे उत्पादन विकण्यासाठी सर्वोत्तम महिने तपासा आणि थेट स्थानिक शेतकरी SMS गटांना किंमत अद्यतने पाठवा.",
      sec4Title: "4. मुख्य फायदे आणि लाभ",
      adv1Title: "त्वरित समस्या निवारण:",
      adv1Desc: " तज्ञांच्या सल्ल्यासाठी दिवसांची वाट पाहण्याऐवजी शेतकऱ्यांना त्यांच्या फोनवरून काही सेकंदात त्वरित उत्तरे मिळतात.",
      adv2Title: "उत्तम नफा निर्णय:",
      adv2Desc: " हवामान-जुळवून घेतलेले किंमत अंदाज उत्पादकांना ताबडतोब विकायचे की जास्त नफ्यासाठी पीक सुरक्षित ठेवायचे हे ठरवण्यास मदत करतात.",
      adv3Title: "साधे आणि सुलभ:",
      adv3Desc: " स्पष्ट दृश्य निर्देशक आणि स्थानिक भाषांसह डिझाइन केलेले आहे जेणेकरून तांत्रिक प्रशिक्षणाशिवाय कोणीही ते वापरू शकेल.",
      footerBadge: "प्रदर्शनासाठी तयार",
      footerText: "🌱 बेळगाव परिसरातील शेतकरी समुदायांसाठी समर्पणाने निर्मित • 2026"
    }
  };

  const currentText = text[globalLang] || text.en;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#eef2ff] via-[#f5f3ff] to-[#faf5ff] text-slate-900 font-sans antialiased relative flex items-center justify-center p-4 sm:p-8 overflow-x-hidden selection:bg-purple-200">
      
      {/* Canva-style ambient gradient glow effects outside the main box */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/40 to-blue-200/20 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-100/40 to-pink-100/20 blur-[100px] pointer-events-none rounded-full" />

      {/* Main Structural Layout Wrapper */}
      <div className="w-full max-w-4xl rounded-[32px] shadow-2xl shadow-indigo-950/20 border-[3px] border-slate-950 overflow-hidden bg-white/90 backdrop-blur-xl relative z-10 animate-fade-in-up">
        
        {/* Dynamic Bold Color Strip */}
        <div className="h-2.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 border-b-[3px] border-slate-950" />

        <div className="p-6 sm:p-10 space-y-8 max-h-[85vh] overflow-y-auto">
          
          {/* Header Title Section */}
          <div className="text-center space-y-2 border-b-2 border-slate-950 pb-6">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{currentText.title}</h1>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              {currentText.subtitle}
            </p>
          </div>

          {/* Section 1: Project Overview */}
          <div className="space-y-3">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span>📌</span> {currentText.sec1Title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {currentText.sec1Desc}
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* Section 2: How We Implemented Our Project (Long Format Table Structure) */}
          <div className="space-y-4">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span>⚙️</span> {currentText.sec2Title}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {currentText.sec2Sub}
            </p>

            <div className="border-2 border-slate-950 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-950 text-white text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 w-1/3 border-r border-slate-800">{currentText.tableLayer}</th>
                    <th className="p-3.5">{currentText.tableDetails}</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-medium divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900 border-r border-slate-200 bg-slate-50/50">
                      {currentText.frontendLayer}
                    </td>
                    <td className="p-3.5 text-slate-600 leading-relaxed">
                      {currentText.frontendDesc}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900 border-r border-slate-200 bg-slate-50/50">
                      {currentText.backendLayer}
                    </td>
                    <td className="p-3.5 text-slate-600 leading-relaxed">
                      {currentText.backendDesc}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900 border-r border-slate-200 bg-slate-50/50">
                      {currentText.aiDoctorLayer}
                    </td>
                    <td className="p-3.5 text-slate-600 leading-relaxed">
                      {currentText.aiDoctorDesc}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900 border-r border-slate-200 bg-slate-50/50">
                      {currentText.priceLayer}
                    </td>
                    <td className="p-3.5 text-slate-600 leading-relaxed">
                      {currentText.priceDesc}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Section 3: How to Use */}
          <div className="space-y-4">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span>📖</span> {currentText.sec3Title}
            </h2>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 border-2 border-slate-950 p-4 rounded-xl space-y-1">
                <span className="font-black text-slate-900 block text-sm">{currentText.step1Title}</span>
                <p className="text-slate-600">{currentText.step1Desc}</p>
              </div>
              <div className="bg-slate-50 border-2 border-slate-950 p-4 rounded-xl space-y-1">
                <span className="font-black text-slate-900 block text-sm">{currentText.step2Title}</span>
                <p className="text-slate-600">
                  {currentText.step2DescText1}<strong>{currentText.step2DescLink1}</strong>{currentText.step2DescText2}<strong>{currentText.step2DescLink2}</strong>{currentText.step2DescText3}
                </p>
              </div>
              <div className="bg-slate-50 border-2 border-slate-950 p-4 rounded-xl space-y-1">
                <span className="font-black text-slate-900 block text-sm">{currentText.step3Title}</span>
                <p className="text-slate-600">{currentText.step3Desc}</p>
              </div>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Section 4: Advantages */}
          <div className="space-y-4">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span>🌟</span> {currentText.sec4Title}
            </h2>
            <div className="space-y-2.5">
              <div className="flex items-start space-x-3 bg-white border border-slate-200 p-3.5 rounded-xl">
                <span className="text-emerald-600 font-bold">✓</span>
                <p className="text-xs sm:text-sm text-slate-600">
                  <span className="font-bold text-slate-900">{currentText.adv1Title}</span>{currentText.adv1Desc}
                </p>
              </div>

              <div className="flex items-start space-x-3 bg-white border border-slate-200 p-3.5 rounded-xl">
                <span className="text-emerald-600 font-bold">✓</span>
                <p className="text-xs sm:text-sm text-slate-600">
                  <span className="font-bold text-slate-900">{currentText.adv2Title}</span>{currentText.adv2Desc}
                </p>
              </div>

              <div className="flex items-start space-x-3 bg-white border border-slate-200 p-3.5 rounded-xl">
                <span className="text-emerald-600 font-bold">✓</span>
                <p className="text-xs sm:text-sm text-slate-600">
                  <span className="font-bold text-slate-900">{currentText.adv3Title}</span>{currentText.adv3Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Presentation Note Footer */}
          <div className="bg-slate-900 text-white border-2 border-slate-950 p-4 rounded-2xl text-center text-xs space-y-1">
            <p className="font-black text-[#2FD77C] uppercase tracking-widest text-[10px]">{currentText.footerBadge}</p>
            <p className="text-slate-300">{currentText.footerText}</p>
          </div>

        </div>
      </div>
    </div>
  );
}