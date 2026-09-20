"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, UserX, Heart, Sparkles, Code2, Cpu } from "lucide-react";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-xl">
                🤟
              </div>
              <span className="text-2xl font-extrabold text-white">UniSign</span>
            </div>
            
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              UniSign is an inclusive learning platform designed to empower the deaf and mute community through 3D technology, real-time AI computer vision, and gamified education.
            </p>

            <div className="space-y-1.5 pt-2">
              <p className="text-xs font-semibold text-cyan-400 italic">"Bridging Silence with 3D Innovation."</p>
              <p className="text-xs font-semibold text-indigo-400 italic">"Empowering Communication, One Sign at a Time."</p>
              <p className="text-xs font-semibold text-emerald-400 italic">"The Inclusive Learning Hub for Sign Language."</p>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Platform Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/interpreter" className="hover:text-cyan-400 transition-colors">Text-to-Sign 3D</Link></li>
              <li><Link href="/interpreter" className="hover:text-cyan-400 transition-colors">Voice-to-Sign Speech</Link></li>
              <li><Link href="/interpreter" className="hover:text-cyan-400 transition-colors">Sign-to-Text (Computer Vision)</Link></li>
              <li><Link href="/courses" className="hover:text-cyan-400 transition-colors">Interactive Alphabets & Numbers</Link></li>
              <li><Link href="/courses" className="hover:text-cyan-400 transition-colors">Maths for All</Link></li>
            </ul>
          </div>

          {/* Gamified & Tools Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" /> Tools & Games
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/games" className="hover:text-cyan-400 transition-colors">Sign-Language Wordle</Link></li>
              <li><Link href="/games" className="hover:text-cyan-400 transition-colors">Knowledge Quizzes</Link></li>
              <li><Link href="/games" className="hover:text-cyan-400 transition-colors">Guided Tracing Activities</Link></li>
              <li><Link href="/whiteboard" className="hover:text-cyan-400 transition-colors">Digital Whiteboard</Link></li>
              <li><Link href="/courses" className="hover:text-cyan-400 transition-colors">Vocabulary Builder</Link></li>
            </ul>
          </div>

          {/* Privacy & Account Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Legal & Account
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/privacy-policy"
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/50 flex items-center gap-2 transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/delete-account"
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-rose-400 hover:text-rose-300 hover:border-rose-500/50 flex items-center gap-2 transition-all"
                >
                  <UserX className="w-4 h-4 text-rose-400" />
                  <span>Delete My Account</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Architecture Badges */}
        <div className="py-6 border-b border-slate-800/40 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-300">Technical Stack:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 bg-slate-900 rounded-md border border-slate-800 text-slate-300">Frontend: Flutter & GetX</span>
            <span className="px-2.5 py-1 bg-slate-900 rounded-md border border-slate-800 text-slate-300">3D: Model Viewer Plus (.glb)</span>
            <span className="px-2.5 py-1 bg-slate-900 rounded-md border border-slate-800 text-slate-300">AI: Hugging Face API</span>
            <span className="px-2.5 py-1 bg-slate-900 rounded-md border border-slate-800 text-slate-300">Backend: Firebase</span>
            <span className="px-2.5 py-1 bg-slate-900 rounded-md border border-slate-800 text-slate-300">Graphics: Lottie & Shimmer</span>
            <span className="px-2.5 py-1 bg-indigo-950 rounded-md border border-indigo-800 text-indigo-300">Web: Next.js 15</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} UniSign. Empowering accessibility everywhere.</p>
          <div className="flex items-center gap-2">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for the Deaf & Mute Community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
