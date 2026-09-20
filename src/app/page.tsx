"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Avatar3DViewer } from "@/components/Avatar3DViewer";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  Video,
  Mic,
  Camera,
  BookOpen,
  Gamepad2,
  Edit3,
  Globe,
  Cpu,
  Download,
  ArrowRight,
  CheckCircle2,
  UserCheck,
  ShieldCheck,
  Zap,
  HelpCircle,
  Play,
  Layers,
  ChevronRight,
  X
} from "lucide-react";

export default function Home() {
  const { t } = useLanguage();
  const [heroText, setHeroText] = useState("Hello welcome");
  const [showGuidedTour, setShowGuidedTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const tourSteps = [
    {
      title: "1. AI 3D Sign Interpreter",
      description: "Converts text, voice, and hand webcam gestures into smooth 3D skeletal avatar animations.",
      icon: Video
    },
    {
      title: "2. Inclusive Educational Courses",
      description: "Master ISL & ASL Alphabets, Numbers, Vocab builder, and custom visual Maths for All.",
      icon: BookOpen
    },
    {
      title: "3. Gamified Practice & Wordle",
      description: "Practice vocabulary with Sign-Language Wordle, quizzes, and canvas letter tracing.",
      icon: Gamepad2
    },
    {
      title: "4. Digital Whiteboard & TTS",
      description: "Express visually on digital whiteboard and convert translated signs into audible speech.",
      icon: Edit3
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text & CTA */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-cyan-400">
              <Sparkles className="w-4 h-4 text-cyan-400" /> {t("hero_badge")}
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              {t("hero_title")}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t("hero_subtitle")}
            </p>

            {/* Tagline Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs font-medium">
              <span className="px-3 py-1 bg-slate-900/90 rounded-lg border border-slate-800 text-cyan-300">
                ✨ Bridging Silence with 3D Innovation
              </span>
              <span className="px-3 py-1 bg-slate-900/90 rounded-lg border border-slate-800 text-indigo-300">
                🤟 Empowering Communication, One Sign at a Time
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/interpreter"
                className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-2xl font-extrabold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.03] flex items-center gap-2"
              >
                <Video className="w-4 h-4" /> {t("hero_cta_interpreter")}
              </Link>
              <Link
                href="/courses"
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" /> {t("hero_cta_courses")}
              </Link>
              <button
                onClick={() => setShowGuidedTour(true)}
                className="px-4 py-3.5 bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 rounded-2xl font-bold text-xs transition-all flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4" /> {t("hero_cta_onboarding")}
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/60 text-center lg:text-left">
              <div>
                <h4 className="text-xl sm:text-2xl font-black text-white">99.4%</h4>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">{t("stat_accuracy")}</p>
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-black text-white">500+</h4>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">{t("stat_gestures")}</p>
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-black text-white">3 Languages</h4>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">{t("stat_languages")}</p>
              </div>
            </div>
          </div>

          {/* Right Hero: Live 3D Avatar Interactive Preview */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Live Interactive 3D Model Sandbox
              </span>
              <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2.5 py-1 rounded-md border border-indigo-800 font-mono">
                Model Viewer Plus (.glb)
              </span>
            </div>

            <Avatar3DViewer currentText={heroText} activeWord={heroText} />

            {/* Interactive Hero Input */}
            <div className="glass-card p-3 rounded-2xl border border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={heroText}
                onChange={(e) => setHeroText(e.target.value)}
                placeholder="Type text to animate 3D avatar..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => setHeroText("Thank you")}
                className="px-3 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shrink-0"
              >
                Try "Thank you"
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 1: AI-POWERED 3D SIGN INTERPRETER SUITE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
            Feature 1 • Core Interpreter Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            AI-Powered 3D Sign Language Interpreter
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Break communication barriers with real-time text-to-sign, voice recognition, and AI computer vision gesture translation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Text-to-Sign */}
          <div className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t("interp_text_title")}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t("interp_text_desc")}</p>
            <Link
              href="/interpreter"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
            >
              Open 3D Interpreter Studio <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Voice-to-Sign */}
          <div className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t("interp_voice_title")}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t("interp_voice_desc")}</p>
            <Link
              href="/interpreter"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
            >
              Try Voice Recognition <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: Sign-to-Text */}
          <div className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t("interp_cv_title")}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t("interp_cv_desc")}</p>
            <Link
              href="/interpreter"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
            >
              Launch Webcam AI Vision <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE 2: COMPREHENSIVE COURSES & MATHS FOR ALL */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
            Feature 2 • Education Suite
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Comprehensive Educational Courses
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Specialized learning modules designed for deaf students, schools, and hearing individuals alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950 text-indigo-400 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t("course_alphabets_title")}</h3>
            <p className="text-xs text-slate-400">{t("course_alphabets_desc")}</p>
            <Link href="/courses" className="text-xs font-bold text-cyan-400 flex items-center gap-1">
              Start Alphabets A-Z <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 text-cyan-400 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t("course_vocab_title")}</h3>
            <p className="text-xs text-slate-400">{t("course_vocab_desc")}</p>
            <Link href="/courses" className="text-xs font-bold text-cyan-400 flex items-center gap-1">
              Browse Vocab Builder <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-emerald-400 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t("course_maths_title")}</h3>
            <p className="text-xs text-slate-400">{t("course_maths_desc")}</p>
            <Link href="/courses" className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              Explore Maths for All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE 3 & 4: GAMIFIED LEARNING & ACCESSIBILITY TOOLS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gamified Card */}
          <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30">
              <Gamepad2 className="w-4 h-4" /> Gamified Learning Experience
            </div>
            <h3 className="text-2xl font-extrabold text-white">Sign-Language Wordle & Quizzes</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Practice sign vocabulary with our unique Sign Wordle game, test comprehension with interactive quizzes, and practice letter tracing strokes.
            </p>
            <Link
              href="/games"
              className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30"
            >
              Play Sign Wordle & Games
            </Link>
          </div>

          {/* Accessibility Whiteboard & TTS Card */}
          <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
              <Edit3 className="w-4 h-4" /> Advanced Accessibility Tools
            </div>
            <h3 className="text-2xl font-extrabold text-white">Digital Whiteboard & TTS</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built-in canvas whiteboard for visual explanations, text-to-speech engine enabling deaf users to "speak" aloud, and multilingual support for EN, HI, and GU.
            </p>
            <Link
              href="/whiteboard"
              className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-600/30"
            >
              Open Digital Whiteboard
            </Link>
          </div>
        </div>
      </section>

      {/* TECHNICAL STACK ("HOW IT WORKS") SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
            Technical Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t("stack_title")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Built on high-performance cross-platform engineering for fast, seamless rendering across Web, Android, and iOS.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-2xl">📱</span>
            <h4 className="text-xs font-bold text-white">Frontend Framework</h4>
            <p className="text-[11px] text-slate-400">{t("stack_frontend")}</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-2xl">🧊</span>
            <h4 className="text-xs font-bold text-white">3D Rendering</h4>
            <p className="text-[11px] text-slate-400">{t("stack_3d")}</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-2xl">🤖</span>
            <h4 className="text-xs font-bold text-white">AI / ML Model</h4>
            <p className="text-[11px] text-slate-400">{t("stack_ai")}</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-2xl">🔥</span>
            <h4 className="text-xs font-bold text-white">Cloud Backend</h4>
            <p className="text-[11px] text-slate-400">{t("stack_backend")}</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-2xl">✨</span>
            <h4 className="text-xs font-bold text-white">Graphics & Shimmers</h4>
            <p className="text-[11px] text-slate-400">{t("stack_graphics")}</p>
          </div>
        </div>
      </section>

      {/* SHOWCASEVIEW ONBOARDING TOUR MODAL */}
      {showGuidedTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md glass-card rounded-3xl p-6 border border-indigo-500/40 text-center space-y-5">
            <button
              onClick={() => setShowGuidedTour(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-400">
              {React.createElement(tourSteps[tourStep].icon, { className: "w-7 h-7" })}
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                Interactive ShowcaseView Tour ({tourStep + 1} / {tourSteps.length})
              </span>
              <h3 className="text-xl font-extrabold text-white">{tourSteps[tourStep].title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {tourSteps[tourStep].description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3">
              <button
                disabled={tourStep === 0}
                onClick={() => setTourStep(tourStep - 1)}
                className="px-4 py-2 bg-slate-900 text-slate-300 disabled:opacity-40 rounded-xl text-xs font-bold"
              >
                Previous
              </button>

              {tourStep < tourSteps.length - 1 ? (
                <button
                  onClick={() => setTourStep(tourStep + 1)}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  onClick={() => setShowGuidedTour(false)}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  Get Started!
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
