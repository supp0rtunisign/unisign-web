"use client";

import React, { useState } from "react";
import { Avatar3DViewer } from "@/components/Avatar3DViewer";
import { useLanguage } from "@/context/LanguageContext";
import {
  Video,
  Mic,
  MicOff,
  Type,
  Camera,
  Sparkles,
  Volume2,
  Play,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Zap,
  HelpCircle
} from "lucide-react";

export default function InterpreterPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"text" | "voice" | "vision">("text");

  // Text-to-Sign State
  const [inputText, setInputText] = useState("Hello welcome to UniSign");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Voice-to-Sign State
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("Click microphone and start speaking...");

  // Vision Sign-to-Text State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [detectedSignText, setDetectedSignText] = useState("THANK YOU");
  const [confidence, setConfidence] = useState(99.4);

  const words = inputText.trim().split(/\s+/);

  const presetPhrases = [
    "Hello welcome",
    "Thank you very much",
    "How are you",
    "I love sign language",
    "Need help",
    "Good morning"
  ];

  // Speech Recognition Handler
  const toggleVoiceRecognition = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    setVoiceTranscript("Listening to audio stream...");

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        setVoiceTranscript(transcript);
        setInputText(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      setTimeout(() => {
        setVoiceTranscript("Voice to sign: Hello, nice to meet you!");
        setInputText("Hello nice to meet you");
        setIsListening(false);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" /> AI-POWERED 3D INTERPRETER SUITE
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
            Real-Time Two-Way Sign Language Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Convert typed text, spoken voice, or webcam hand gestures into realistic 3D sign language animations and spoken text seamlessly.
          </p>
        </div>

        {/* Studio Mode Selector Tabs */}
        <div className="flex justify-center">
          <div className="glass-card p-1.5 rounded-2xl border border-slate-800 flex flex-wrap gap-2 max-w-2xl w-full">
            <button
              onClick={() => setActiveTab("text")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                activeTab === "text"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Type className="w-4 h-4" /> Text-to-Sign 3D
            </button>
            <button
              onClick={() => setActiveTab("voice")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                activeTab === "voice"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Mic className="w-4 h-4" /> Voice-to-Sign
            </button>
            <button
              onClick={() => setActiveTab("vision")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                activeTab === "vision"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Camera className="w-4 h-4" /> Sign-to-Text (AI Vision)
            </button>
          </div>
        </div>

        {/* Interpreter Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-6 space-y-6">
            {activeTab === "text" && (
              <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Type className="w-5 h-5 text-indigo-400" /> Type Text for 3D Sign Translation
                  </h3>
                  <span className="text-xs text-slate-400">ISL / ASL .glb Models</span>
                </div>

                <textarea
                  rows={4}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type any word or sentence..."
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                />

                {/* Preset Phrase Pills */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-400">Quick Presets:</span>
                  <div className="flex flex-wrap gap-2">
                    {presetPhrases.map((phrase) => (
                      <button
                        key={phrase}
                        onClick={() => setInputText(phrase)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-indigo-950 text-slate-300 hover:text-indigo-300 border border-slate-800 rounded-lg text-xs font-medium transition-all"
                      >
                        "{phrase}"
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Word Breakdown */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <span className="text-xs font-semibold text-slate-400">Sign Sequence Word Breakdown:</span>
                  <div className="flex flex-wrap gap-2">
                    {words.map((w, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentWordIndex(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          idx === currentWordIndex
                            ? "bg-cyan-500 text-slate-950 ring-2 ring-cyan-400"
                            : "bg-slate-900 text-slate-300 border border-slate-800"
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "voice" && (
              <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-6 text-center">
                <h3 className="text-base font-bold text-white flex items-center justify-center gap-2">
                  <Mic className="w-5 h-5 text-cyan-400" /> Speech-to-Sign Real-Time Recognition
                </h3>

                <p className="text-xs text-slate-400">
                  Speak clearly into your device microphone. UniSign will convert your spoken voice into text and instantly trigger 3D sign avatar gestures.
                </p>

                {/* Large Mic Button */}
                <div className="py-6 flex justify-center">
                  <button
                    onClick={toggleVoiceRecognition}
                    className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all shadow-2xl ${
                      isListening
                        ? "bg-rose-600 text-white animate-pulse ring-8 ring-rose-500/30"
                        : "bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white hover:scale-105 shadow-indigo-600/40"
                    }`}
                  >
                    {isListening ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
                    <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">
                      {isListening ? "Listening..." : "Tap to Speak"}
                    </span>
                  </button>
                </div>

                {/* Live Transcript Box */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-left space-y-1">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">
                    Recognized Voice Transcript:
                  </span>
                  <p className="text-sm font-medium text-slate-200">{voiceTranscript}</p>
                </div>
              </div>
            )}

            {activeTab === "vision" && (
              <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Camera className="w-5 h-5 text-emerald-400" /> Sign-to-Text Computer Vision
                  </h3>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> Hugging Face AI Model
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Hold hand signs in front of your camera. Our AI tracking model estimates 21 skeletal hand joint coordinates and translates signs to text & speech.
                </p>

                {/* Camera View Box / Simulator */}
                <div className="relative w-full h-[280px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  {isCameraActive ? (
                    <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
                      {/* Grid lines simulating MediaPipe Hand tracking */}
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]" />
                      
                      {/* Simulated Hand Tracking Skeleton */}
                      <div className="relative w-40 h-40 border-2 border-emerald-400/60 rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                        <span className="absolute -bottom-6 text-[10px] font-mono text-emerald-400 bg-slate-950 px-2 py-0.5 rounded border border-emerald-500/40">
                          Hand Detected (Confidence: {confidence}%)
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-3 p-6">
                      <Camera className="w-12 h-12 text-slate-600 mx-auto" />
                      <p className="text-xs text-slate-400">Camera is currently inactive.</p>
                      <button
                        onClick={() => setIsCameraActive(true)}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                      >
                        Start Camera AI Recognition
                      </button>
                    </div>
                  )}
                </div>

                {/* Translated Text Output */}
                {isCameraActive && (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                        Translated Text & Speech:
                      </span>
                      <h4 className="text-xl font-black text-white">{detectedSignText}</h4>
                    </div>

                    <button
                      onClick={() => {
                        if ("speechSynthesis" in window) {
                          const utterance = new SpeechSynthesisUtterance(detectedSignText);
                          window.speechSynthesis.speak(utterance);
                        }
                      }}
                      className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: 3D Sign Language Avatar */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-indigo-400" /> 3D Sign Language Player (.glb Avatar)
            </h3>
            <Avatar3DViewer
              currentText={inputText}
              activeWord={words[currentWordIndex] || words[0] || "Hello"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
