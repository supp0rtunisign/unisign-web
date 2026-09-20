"use client";

import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";
import {
  Gamepad2,
  Sparkles,
  Trophy,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Edit2,
  Award,
  Flame,
  Zap
} from "lucide-react";

export default function GamesPage() {
  const { t } = useLanguage();
  const [activeGame, setActiveGame] = useState<"wordle" | "quiz" | "tracing">("wordle");

  // --- GAME 1: SIGN-LANGUAGE WORDLE ---
  const TARGET_WORD = "PEACE";
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState<"IN_PROGRESS" | "WON" | "LOST">("IN_PROGRESS");

  const handleKeyPress = (letter: string) => {
    if (gameStatus !== "IN_PROGRESS") return;

    if (letter === "ENTER") {
      if (currentGuess.length === 5) {
        const nextGuesses = [...guesses, currentGuess];
        setGuesses(nextGuesses);
        if (currentGuess === TARGET_WORD) {
          setGameStatus("WON");
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        } else if (nextGuesses.length >= 6) {
          setGameStatus("LOST");
        }
        setCurrentGuess("");
      }
    } else if (letter === "DELETE") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + letter);
    }
  };

  const resetWordle = () => {
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("IN_PROGRESS");
  };

  // --- GAME 2: KNOWLEDGE QUIZ ---
  const quizQuestions = [
    {
      question: "Which hand gesture represents 'Thank You' in sign language?",
      options: [
        "Hand moving from chin forward towards person",
        "Waving open palm side to side",
        "Two thumbs up pressed together",
        "Fist placed on chest"
      ],
      correct: 0,
      explanation: "To sign 'Thank You', touch your fingertips to your chin and move your hand forward towards the person."
    },
    {
      question: "What is the primary frontend state management stack for UniSign native app?",
      options: ["Redux", "Flutter & GetX", "MobX", "Zustand"],
      correct: 1,
      explanation: "UniSign uses Flutter combined with GetX for reactive state management."
    },
    {
      question: "How does UniSign process Sign-to-Text computer vision?",
      options: [
        "Uploading full raw video recordings to server",
        "Real-time 21 skeletal hand landmark tracking via Hugging Face AI",
        "Manual human operator entry",
        "Bluetooth smart gloves only"
      ],
      correct: 1,
      explanation: "UniSign uses 21-joint skeletal landmark tracking via Hugging Face AI models without storing raw video."
    }
  ];

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);

    if (optionIdx === quizQuestions[currentQuizIndex].correct) {
      setQuizScore(quizScore + 10);
    }
  };

  const nextQuizQuestion = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
      confetti({ particleCount: 100, spread: 70 });
    }
  };

  // --- GAME 3: TRACING ACTIVITIES ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeScore, setStrokeScore] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
  }, [activeGame]);

  const startTracing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const drawTrace = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    setStrokeScore((prev) => Math.min(100, prev + 2));
  };

  const stopTracing = () => {
    setIsDrawing(false);
  };

  const clearTracing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokeScore(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-cyan-400">
            <Gamepad2 className="w-3.5 h-3.5" /> GAMIFIED ACCESSIBLE EDUCATION
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
            Gamified Learning Arena
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Reinforce sign language vocabulary and motor muscle memory through Sign Wordle, Knowledge Quizzes, and Letter Tracing.
          </p>
        </div>

        {/* Game Mode Selector */}
        <div className="flex justify-center">
          <div className="glass-card p-1.5 rounded-2xl border border-slate-800 flex flex-wrap gap-2 max-w-xl w-full">
            <button
              onClick={() => setActiveGame("wordle")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                activeGame === "wordle"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" /> Sign Wordle
            </button>
            <button
              onClick={() => setActiveGame("quiz")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                activeGame === "quiz"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" /> Quizzes
            </button>
            <button
              onClick={() => setActiveGame("tracing")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                activeGame === "tracing"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Edit2 className="w-4 h-4 text-emerald-400" /> Canvas Tracing
            </button>
          </div>
        </div>

        {/* GAME 1: SIGN-LANGUAGE WORDLE */}
        {activeGame === "wordle" && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="glass-card rounded-3xl p-6 border border-slate-800 text-center space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">5-Letter Word Challenge</span>
                <button
                  onClick={resetWordle}
                  className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg text-xs flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Game
                </button>
              </div>

              {/* Wordle Grid */}
              <div className="space-y-2 py-2">
                {Array.from({ length: 6 }).map((_, rowIdx) => {
                  const guess = guesses[rowIdx] || (rowIdx === guesses.length ? currentGuess : "");
                  return (
                    <div key={rowIdx} className="flex justify-center gap-2">
                      {Array.from({ length: 5 }).map((_, colIdx) => {
                        const letter = guess[colIdx] || "";
                        const isSubmitted = rowIdx < guesses.length;
                        let bgColor = "bg-slate-950 border-slate-800";

                        if (isSubmitted) {
                          if (letter === TARGET_WORD[colIdx]) {
                            bgColor = "bg-emerald-600 border-emerald-500 text-white";
                          } else if (TARGET_WORD.includes(letter)) {
                            bgColor = "bg-amber-600 border-amber-500 text-white";
                          } else {
                            bgColor = "bg-slate-800 border-slate-700 text-slate-400";
                          }
                        }

                        return (
                          <div
                            key={colIdx}
                            className={`w-12 h-12 rounded-xl border-2 flex flex-col items-center justify-center font-extrabold text-lg transition-all ${bgColor}`}
                          >
                            <span>{letter}</span>
                            {letter && (
                              <span className="text-[8px] font-mono text-cyan-300">🤟</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Status Banner */}
              {gameStatus === "WON" && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold animate-bounce">
                  🎉 Congratulations! You guessed the sign word "PEACE"!
                </div>
              )}
              {gameStatus === "LOST" && (
                <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs font-bold">
                  Word was "{TARGET_WORD}". Better luck next time!
                </div>
              )}

              {/* Virtual On-Screen Keyboard */}
              <div className="space-y-1.5 pt-2">
                {["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((row, rIdx) => (
                  <div key={rIdx} className="flex justify-center gap-1">
                    {rIdx === 2 && (
                      <button
                        onClick={() => handleKeyPress("ENTER")}
                        className="px-2.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold"
                      >
                        ENTER
                      </button>
                    )}
                    {row.split("").map((char) => (
                      <button
                        key={char}
                        onClick={() => handleKeyPress(char)}
                        className="w-8 h-10 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg text-xs font-bold border border-slate-800"
                      >
                        {char}
                      </button>
                    ))}
                    {rIdx === 2 && (
                      <button
                        onClick={() => handleKeyPress("DELETE")}
                        className="px-2.5 py-2 bg-rose-950 hover:bg-rose-900 text-rose-300 rounded-lg text-[10px] font-bold border border-rose-800"
                      >
                        DEL
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GAME 2: KNOWLEDGE QUIZ */}
        {activeGame === "quiz" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-6">
              {!quizFinished ? (
                <>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      Question {currentQuizIndex + 1} of {quizQuestions.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-extrabold text-amber-300">Score: {quizScore} PTS</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">
                    {quizQuestions[currentQuizIndex].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {quizQuestions[currentQuizIndex].options.map((opt, oIdx) => {
                      let btnStyle = "bg-slate-900 border-slate-800 text-slate-200 hover:border-indigo-500";
                      if (selectedOption !== null) {
                        if (oIdx === quizQuestions[currentQuizIndex].correct) {
                          btnStyle = "bg-emerald-950/80 border-emerald-500 text-white font-bold";
                        } else if (oIdx === selectedOption) {
                          btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleAnswer(oIdx)}
                          className={`w-full p-4 rounded-xl text-xs text-left border transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Answer Explanation & Next Button */}
                  {selectedOption !== null && (
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                      <p className="text-xs text-slate-300">
                        <strong className="text-cyan-400">Explanation:</strong> {quizQuestions[currentQuizIndex].explanation}
                      </p>
                      <button
                        onClick={nextQuizQuestion}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                      >
                        Next Question →
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center space-y-5 py-4">
                  <Award className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
                  <h3 className="text-2xl font-black text-white">Quiz Completed!</h3>
                  <p className="text-sm text-slate-300">
                    Final Score: <span className="font-extrabold text-cyan-400">{quizScore} Points</span>
                  </p>
                  <button
                    onClick={() => {
                      setCurrentQuizIndex(0);
                      setSelectedOption(null);
                      setQuizScore(0);
                      setQuizFinished(false);
                    }}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* GAME 3: TRACING ACTIVITIES */}
        {activeGame === "tracing" && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="glass-card rounded-3xl p-6 border border-slate-800 text-center space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Letter Tracing Stroke Practice
                </span>
                <button
                  onClick={clearTracing}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-slate-800"
                >
                  Clear Canvas
                </button>
              </div>

              <p className="text-xs text-slate-400">
                Trace letter <strong className="text-white">"A"</strong> gesture path below using mouse or touch.
              </p>

              {/* Canvas Box */}
              <div className="relative w-full h-[300px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
                {/* Background Dotted Letter Guide */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                  <span className="text-9xl font-black font-mono text-cyan-300 tracking-widest">
                    A
                  </span>
                </div>

                <canvas
                  ref={canvasRef}
                  width={500}
                  height={300}
                  onMouseDown={startTracing}
                  onMouseMove={drawTrace}
                  onMouseUp={stopTracing}
                  onMouseLeave={stopTracing}
                  className="w-full h-full cursor-crosshair relative z-10"
                />
              </div>

              {/* Stroke Accuracy Meter */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Stroke Precision Accuracy:</span>
                <span className="font-extrabold text-cyan-400">{strokeScore}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
