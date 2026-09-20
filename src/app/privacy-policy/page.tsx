"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Eye, Mic, Camera, Lock, CheckCircle2, UserX, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header Title Banner */}
        <div className="glass-card rounded-3xl p-8 border border-indigo-500/20 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
            UniSign Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Last Updated: September 20, 2026 • Fulfilling Apple App Store, Google Play Store, and Global Accessibility Standards.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <Camera className="w-6 h-6 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Camera Privacy</h3>
            <p className="text-xs text-slate-400">
              Webcam video feeds used for Sign-to-Text AI recognition are processed in real-time. We never store or upload raw video footage.
            </p>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <Mic className="w-6 h-6 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Voice Data</h3>
            <p className="text-xs text-slate-400">
              Voice-to-Sign audio streams use ephemeral browser APIs solely for text conversion and sign animation generation.
            </p>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <Lock className="w-6 h-6 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">No Ad Selling</h3>
            <p className="text-xs text-slate-400">
              UniSign is built for accessible education. Your personal data and learning metrics are never sold to third-party advertisers.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-8 text-sm leading-relaxed text-slate-300">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" /> 1. Information We Collect
            </h2>
            <p className="text-xs text-slate-400">
              UniSign collects minimal information necessary to deliver 3D sign language interpretation and gamified courses:
            </p>
            <ul className="list-disc list-inside text-xs space-y-1 text-slate-400 pl-2">
              <li><strong className="text-slate-200">Account Profile:</strong> Email address, avatar preferences, and preferred language (English, Hindi, Gujarati).</li>
              <li><strong className="text-slate-200">Learning Progress:</strong> Completed lessons, quiz scores, Wordle streaks, and whiteboard creations stored via Firebase Cloud Firestore.</li>
              <li><strong className="text-slate-200">Technical Device Data:</strong> Device model, OS version (Flutter/Android/iOS/Web), crash logs via Firebase Analytics.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" /> 2. AI Computer Vision & Camera Usage
            </h2>
            <p className="text-xs text-slate-400">
              When using the Sign-to-Text feature, UniSign requests temporary camera access to detect hand landmark gestures using Hugging Face AI models. Hand landmark vectors are evaluated locally or in transient RAM; images or video recordings are discarded immediately and never persisted.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> 3. Data Protection & Security
            </h2>
            <p className="text-xs text-slate-400">
              All communications between the UniSign Flutter App / Next.js Web frontend, Hugging Face AI APIs, and Firebase Cloud backends are encrypted using TLS 1.3 / HTTPS protocols.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <UserX className="w-5 h-5 text-rose-400" /> 4. Your Rights & Account Deletion
            </h2>
            <p className="text-xs text-slate-400">
              You maintain full ownership of your data. You may inspect, modify, or permanently delete your account and all associated records at any time through our self-service portal:
            </p>
            <div className="pt-2">
              <Link
                href="/delete-account"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded-xl text-xs font-bold transition-all"
              >
                <UserX className="w-4 h-4" /> Go to Account Deletion Request Portal
              </Link>
            </div>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-800">
            <h2 className="text-sm font-bold text-white">Contact Privacy Officer</h2>
            <p className="text-xs text-slate-400">
              If you have any questions regarding this Privacy Policy, please email us at <a href="mailto:privacy@unisign.org" className="text-cyan-400 hover:underline">privacy@unisign.org</a> or visit our mobile support hub.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
