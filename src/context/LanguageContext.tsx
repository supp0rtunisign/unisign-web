"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi" | "gu";

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    gu: string;
  };
}

export const dictionary: Translations = {
  // Navigation
  nav_home: { en: "Home", hi: "मुख्य पृष्ठ", gu: "મુખ્ય પૃષ્ઠ" },
  nav_interpreter: { en: "3D Interpreter", hi: "3D दुभाषिया", gu: "3D દુભાષિયા" },
  nav_courses: { en: "Courses", hi: "पाठ्यक्रम", gu: "કોર્સ" },
  nav_games: { en: "Games", hi: "खेल", gu: "રમતો" },
  nav_whiteboard: { en: "Whiteboard", hi: "डिजिटल व्हाइटबोर्ड", gu: "ડિજિટલ વ્હાઇટબોર્ડ" },
  nav_privacy: { en: "Privacy Policy", hi: "गोपनीयता नीति", gu: "ગોપનીયતા નીતિ" },
  nav_delete_account: { en: "Delete Account", hi: "खाता हटाएं", gu: "એકાઉન્ટ કાઢી નાખો" },
  nav_download_app: { en: "Download App", hi: "ऐप डाउनलोड करें", gu: "એપ્લિકેશન ડાઉનલોડ કરો" },

  // Hero Section
  hero_badge: { en: "AI-POWERED 3D SIGN LANGUAGE PLATFORM", hi: "एआई संचालित 3D सांकेतिक भाषा मंच", gu: "AI-સંચાલિત 3D સંકેત ભાષા પ્લેટફોર્મ" },
  hero_title: { en: "Bridging Silence with 3D Innovation.", hi: "3D नवाचार के साथ मौन को जोड़ना।", gu: "3D નાવતર સાધનો સાથે મૌનને જોડવું." },
  hero_subtitle: {
    en: "Empowering Communication, One Sign at a Time. UniSign combines real-time AI recognition, 3D animated avatars, and gamified courses for the deaf and mute community.",
    hi: "संचार को सशक्त बनाना, एक समय में एक संकेत। UniSign बधिर और मूक समुदाय के लिए AI पहचान, 3D अवतार और गेमिफाइड पाठ्यक्रम जोड़ता है।",
    gu: "સંચારને સશક્ત બનાવવો, એક સમયે એક સંકેત. UniSign બધિર અને મૂક સમુદાય માટે AI ઓળખ, 3D અવતાર અને ગેમિફાઇડ કોર્સ પૂરા પાડે છે."
  },
  hero_cta_interpreter: { en: "Try Live 3D Interpreter", hi: "लाइव 3D दुभाषिया आजमाएं", gu: "લાઇવ 3D દુભાષિયા અજમાવો" },
  hero_cta_courses: { en: "Explore Courses", hi: "पाठ्यक्रम देखें", gu: "કોર્સ બ્રાઉઝ કરો" },
  hero_cta_onboarding: { en: "Guided Tour", hi: "गाइडेड टूर", gu: "માર્ગદર્શિત પ્રવાસ" },

  // Stats
  stat_accuracy: { en: "AI Sign Accuracy", hi: "AI सांकेतिक सटीकता", gu: "AI સાઇન સચોટતા" },
  stat_gestures: { en: "3D Sign Gestures", hi: "3D संकेत मुद्राएं", gu: "3D સંકેત હાવભાવ" },
  stat_languages: { en: "Languages Supported", hi: "समर्थित भाषाएं", gu: "સમર્થિત ભાષાઓ" },

  // Interpreter Features
  interp_text_title: { en: "Text-to-Sign Animation", hi: "टेक्स्ट-टू-साइन एनीमेशन", gu: "ટેક્સ્ટ-ટુ-સાઇન એનિમેશન" },
  interp_text_desc: {
    en: "Converts typed text into smooth, realistic 3D sign language animations using professional .glb models.",
    hi: "टाइप किए गए पाठ को पेशेवर .glb मॉडल का उपयोग करके 3D सांकेतिक एनीमेशन में बदलता है।",
    gu: "ટાઇપ કરેલા ટેક્સ્ટને પ્રોફેશનલ .glb મોડેલોનો ઉપયોગ કરીને 3D સાઇન એનિમેશનમાં રૂપાંતરિત કરે છે."
  },
  interp_voice_title: { en: "Voice-to-Sign", hi: "वॉयस-टू-साइन", gu: "વોઇસ-ટુ-સાઇન" },
  interp_voice_desc: {
    en: "Integrated speech recognition allows users to speak into the app and see corresponding signs in real-time.",
    hi: "एकीकृत भाषण पहचान उपयोगकर्ताओं को ऐप में बोलने और वास्तविक समय में संकेत देखने की अनुमति देती है।",
    gu: "સંકલિત સ્પીચ રેકગ્નિશન વપરાશકર્તાઓને બોલવાની અને વાસ્તવિક સમયમાં સંકેતો જોવાની મંજૂરી આપે છે."
  },
  interp_cv_title: { en: "Sign-to-Text (Computer Vision)", hi: "साइन-टू-टेक्स्ट (कंप्यूटर विजन)", gu: "સાઇન-ટુ-ટેક્સ્ટ (કમ્પ્યુટર વિઝન)" },
  interp_cv_desc: {
    en: "Uses AI to translate captured images or videos of hand signs back into text and audible speech.",
    hi: "हाथ के संकेतों की छवियों या वीडियो को वापस पाठ और आवाज में अनुवाद करने के लिए AI का उपयोग करता है।",
    gu: "હાથના સંકેતોની છબીઓ અથવા વિડિઓઝને ટેક્સ્ટ અને ઓડિયોમાં ભાષાંતરિત કરવા માટે AI નો ઉપયોગ કરે છે."
  },

  // Courses
  course_alphabets_title: { en: "Interactive Alphabets & Numbers", hi: "इंटरएक्टिव वर्णमाला और नंबर", gu: "ઇન્ટરેક્ટિવ અક્ષરો અને નંબરો" },
  course_alphabets_desc: { en: "Specialized modules to learn the foundations of Indian & Universal Sign Language.", hi: "सांकेतिक भाषा की नींव सीखने के लिए विशेष मॉड्यूल।", gu: "સંકેત ભાષાના પાયાને શીખવા માટેના ખાસ મોડ્યુલો." },
  course_vocab_title: { en: "Vocabulary Builder", hi: "शब्दावली निर्माता", gu: "વોકેબ્યુલરી બિલ્ડર" },
  course_vocab_desc: { en: "Curated collection of daily-life phrases organized by categories (Greetings, Emergency, Family).", hi: "श्रेणियों द्वारा आयोजित दैनिक जीवन के वाक्यांशों का क्यूरेटेड संग्रह।", gu: "કેટેગરીઝ દ્વારા ગોઠવાયેલા દૈનિક જીવનના શબ્દોનો સંગ્રહ." },
  course_maths_title: { en: "Maths for All", hi: "सभी के लिए गणित", gu: "સૌ માટે ગણિત" },
  course_maths_desc: { en: "Custom-tailored mathematics courses designed specifically for visual sign accessibility.", hi: "दृश्य पहुंच के लिए विशेष रूप से डिज़ाइन किए गए गणित पाठ्यक्रम।", gu: "દ્રશ્ય સરળતા માટે ખાસ રચાયેલ ગણિતના કોર્સ." },

  // Games
  game_wordle_title: { en: "Sign-Language Wordle", hi: "साइन-लैंग्वेज वर्डल", gu: "સાઇન-લેંગ્વેજ વર્ડલ" },
  game_wordle_desc: { en: "A unique twist on the popular word game using sign symbols to practice vocabulary.", hi: "शब्दावली का अभ्यास करने के लिए सांकेतिक प्रतीकों का उपयोग करके लोकप्रिय शब्द खेल का अनूठा मोड़।", gu: "વોકેબ્યુલરી પ્રેક્ટિસ કરવા માટે સંકેત પ્રતીકોનો ઉપયોગ કરતી ગેમ." },
  game_quiz_title: { en: "Knowledge Quizzes", hi: "ज्ञान प्रश्नोत्तरी", gu: "જ્ઞાન ક્વિઝ" },
  game_quiz_desc: { en: "Interactive competitions and quizzes to track learning progress and keep users motivated.", hi: "सीखने की प्रगति को ट्रैक करने के लिए इंटरैक्टिव क्विज़।", gu: "શીખવાની પ્રગતિ ટ્રેક કરવા માટે ઇન્ટરેક્ટિવ ક્વિઝ." },
  game_trace_title: { en: "Tracing Activities", hi: "ट्रेसिंग गतिविधियां", gu: "ટ્રેસિંગ પ્રવૃત્તિઓ" },
  game_trace_desc: { en: "Guided tracing for letters and numbers to reinforce visual & muscle memory.", hi: "दृश्य स्मृति को मजबूत करने के लिए अक्षरों और संख्याओं के लिए निर्देशित ट्रेसिंग।", gu: "દ્રશ્ય સ્મૃતિ મજબૂત કરવા અક્ષરો અને નંબરો માટે માર્ગદર્શિત ટ્રેસિંગ." },

  // Tech Stack
  stack_title: { en: "Technical Architecture & How it Works", hi: "तकनीकी वास्तुकला और यह कैसे काम करता है", gu: "તકનીકી આર્કિટેક્ચર અને તે કેવી રીતે કાર્ય કરે છે" },
  stack_frontend: { en: "Frontend Engine: Flutter & GetX (Reactive State Management)", hi: "फ्रंटएंड इंजन: फ़्लटर और गेटएक्स", gu: "ફ્રન્ટએન્ડ એન્જિન: ફ્લટર અને GetX" },
  stack_3d: { en: "3D Rendering: Model Viewer Plus (.glb Avatar Support)", hi: "3D रेंडरिंग: मॉडल व्यूअर प्लस (.glb मॉडल)", gu: "3D રેન્ડરિંગ: મોડલ વ્યૂઅર પ્લસ (.glb સપોર્ટ)" },
  stack_ai: { en: "AI/ML Integration: Custom Hugging Face Sign Recognition API", hi: "एआई/एमएल: हगिंग फेस साइन रिकग्निशन एपीआई", gu: "AI/ML: હગિંગ ફેસ સાઇન રેકગ્નિશન API" },
  stack_backend: { en: "Cloud Infrastructure: Firebase Cloud Messaging & Analytics", hi: "क्लाउड इन्फ्रास्ट्रक्चर: फायरबेस", gu: "ક્લાઉડ ઇન્ફ્રાસ્ટ્રક્ચર: ફાયરબેઝ" },
  stack_graphics: { en: "Graphics & UI: Lottie Animations & Shimmer Skeleton Effects", hi: "ग्राफिक्स: लॉटी एनीमेशन और शिमर प्रभाव", gu: "ગ્રાફિક્સ: લોટી એનિમેશન અને શિમર ઇફેક્ટ્સ" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("unisign_lang") as Language;
    if (saved && (saved === "en" || saved === "hi" || saved === "gu")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("unisign_lang", lang);
  };

  const t = (key: string): string => {
    if (dictionary[key]) {
      return dictionary[key][language] || dictionary[key]["en"];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
