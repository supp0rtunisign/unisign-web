"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  BookOpen,
  Sparkles,
  Search,
  Volume2,
  CheckCircle2,
  Lock,
  Zap,
  ArrowRight,
  Layers,
  Calculator,
  Grid
} from "lucide-react";

interface SignCard {
  id: string;
  char: string;
  word: string;
  category: string;
  signSymbol: string;
}

export default function CoursesPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"alphabets" | "vocab" | "maths">("alphabets");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCard, setActiveCard] = useState<SignCard | null>(null);

  // Alphabet A-Z Data
  const alphabets = Array.from({ length: 26 }, (_, i) => {
    const char = String.fromCharCode(65 + i);
    return {
      id: char,
      char,
      word: `Sign for ${char}`,
      category: "Alphabets",
      signSymbol: `🤟 ${char}`
    };
  });

  // Numbers 0-9 Data
  const numbers = Array.from({ length: 10 }, (_, i) => {
    return {
      id: `num-${i}`,
      char: `${i}`,
      word: `Number ${i}`,
      category: "Numbers",
      signSymbol: `🖐️ ${i}`
    };
  });

  // Vocabulary Data
  const vocabItems = [
    { id: "v1", char: "Hello", word: "Hello / Welcome", category: "Greetings", signSymbol: "👋" },
    { id: "v2", char: "Thanks", word: "Thank You", category: "Greetings", signSymbol: "🙏" },
    { id: "v3", char: "Family", word: "Family / Relatives", category: "Family", signSymbol: "👨‍👩‍👧‍👦" },
    { id: "v4", char: "Mother", word: "Mother / Mom", category: "Family", signSymbol: "👩" },
    { id: "v5", char: "Father", word: "Father / Dad", category: "Family", signSymbol: "👨" },
    { id: "v6", char: "Help", word: "Emergency Help", category: "Emergency", signSymbol: "🆘" },
    { id: "v7", char: "Doctor", word: "Doctor / Hospital", category: "Emergency", signSymbol: "🩺" },
    { id: "v8", char: "Water", word: "Water / Drink", category: "Daily Life", signSymbol: "💧" },
    { id: "v9", char: "Food", word: "Food / Eat", category: "Daily Life", signSymbol: "🍲" },
    { id: "v10", char: "School", word: "School / Education", category: "Education", signSymbol: "🏫" },
    { id: "v11", char: "Book", word: "Book / Read", category: "Education", signSymbol: "📖" },
    { id: "v12", char: "Love", word: "I Love You", category: "Greetings", signSymbol: "🤟" }
  ];

  // Maths Data
  const mathsModules = [
    { title: "Visual Sign Counting (1-20)", level: "Beginner", lessons: 8, progress: 100, status: "Completed" },
    { title: "Addition & Subtraction in Sign", level: "Intermediate", lessons: 12, progress: 65, status: "In Progress" },
    { title: "Fractions & Shapes Visual Signs", level: "Advanced", lessons: 10, progress: 0, status: "Locked" },
    { title: "Word Problems & Financial Sign Literacy", level: "Advanced", lessons: 15, progress: 0, status: "Locked" }
  ];

  const categories = ["All", "Greetings", "Family", "Emergency", "Daily Life", "Education"];

  const filteredVocab = vocabItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.word.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400">
            <BookOpen className="w-3.5 h-3.5" /> ACCESSIBLE EDUCATION HUB
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
            Comprehensive Educational Courses
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Master the foundation of Indian & Universal Sign Language with interactive alphabets, category-based vocabulary, and visual mathematics.
          </p>
        </div>

        {/* Course Module Navigation Tabs */}
        <div className="flex justify-center">
          <div className="glass-card p-1.5 rounded-2xl border border-slate-800 flex flex-wrap gap-2 max-w-2xl w-full">
            <button
              onClick={() => setActiveTab("alphabets")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                activeTab === "alphabets"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Grid className="w-4 h-4" /> Alphabets & Numbers
            </button>
            <button
              onClick={() => setActiveTab("vocab")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                activeTab === "vocab"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Layers className="w-4 h-4" /> Vocabulary Builder
            </button>
            <button
              onClick={() => setActiveTab("maths")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                activeTab === "maths"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Calculator className="w-4 h-4" /> Maths for All
            </button>
          </div>
        </div>

        {/* Module 1: Alphabets & Numbers */}
        {activeTab === "alphabets" && (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" /> Interactive Alphabets (A to Z)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
                {alphabets.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveCard(item);
                      speakText(`Letter ${item.char}`);
                    }}
                    className="glass-card glass-card-hover rounded-2xl p-4 text-center border border-slate-800 flex flex-col items-center justify-center gap-1 group"
                  >
                    <span className="text-2xl font-black text-indigo-400 group-hover:scale-110 transition-transform">
                      {item.char}
                    </span>
                    <span className="text-xs text-slate-400">Sign Gesture</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" /> Interactive Numbers (0 to 9)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {numbers.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveCard(item);
                      speakText(`Number ${item.char}`);
                    }}
                    className="glass-card glass-card-hover rounded-2xl p-5 text-center border border-slate-800 flex items-center justify-between group"
                  >
                    <span className="text-3xl font-black text-cyan-400">{item.char}</span>
                    <span className="text-xs font-semibold text-slate-300">Sign Card</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Module 2: Vocabulary Builder */}
        {activeTab === "vocab" && (
          <div className="space-y-6">
            {/* Search & Category Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-800">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search word or phrase..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Vocab Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredVocab.map((item) => (
                <div
                  key={item.id}
                  className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 space-y-4 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <span className="px-2.5 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800/60 rounded-lg text-[10px] font-bold uppercase">
                      {item.category}
                    </span>
                    <button
                      onClick={() => speakText(item.word)}
                      className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs"
                      title="TTS Pronunciation"
                    >
                      <Volume2 className="w-4 h-4 text-cyan-400" />
                    </button>
                  </div>

                  <div className="text-center py-2 space-y-1">
                    <span className="text-5xl block">{item.signSymbol}</span>
                    <h3 className="text-lg font-extrabold text-white mt-2">{item.word}</h3>
                  </div>

                  <button
                    onClick={() => setActiveCard(item)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-800"
                  >
                    View 3D Gesture Card
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Module 3: Maths for All */}
        {activeTab === "maths" && (
          <div className="space-y-6">
            <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-400" /> Custom Mathematics for Visual Accessibility
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Maths for All converts numbers, formulas, and visual logic into sign language gestures. Learn addition, subtraction, geometry, and financial literacy through step-by-step 3D animations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {mathsModules.map((mod, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{mod.level}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      mod.status === "Completed"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : mod.status === "In Progress"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-slate-800 text-slate-500"
                    }`}>
                      {mod.status}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white">{mod.title}</h3>
                  <p className="text-xs text-slate-400">{mod.lessons} interactive visual sign modules</p>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                      <span>Progress</span>
                      <span>{mod.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all"
                        style={{ width: `${mod.progress}%` }}
                      />
                    </div>
                  </div>

                  <button
                    disabled={mod.status === "Locked"}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    {mod.status === "Locked" ? (
                      <>
                        <Lock className="w-3.5 h-3.5" /> Module Locked
                      </>
                    ) : (
                      <>
                        Start Maths Lesson <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Card Detail Modal */}
        {activeCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="glass-card rounded-3xl p-6 max-w-sm w-full border border-indigo-500/40 text-center space-y-4">
              <span className="text-6xl block py-2">{activeCard.signSymbol}</span>
              <h3 className="text-2xl font-black text-white">{activeCard.word}</h3>
              <p className="text-xs text-slate-400">
                Perform gesture by forming hands clearly in front of chest.
              </p>
              <button
                onClick={() => setActiveCard(null)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Close Card
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
