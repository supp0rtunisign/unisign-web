"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, Language } from "@/context/LanguageContext";
import {
  Globe,
  Sparkles,
  Menu,
  X,
  Download,
  ShieldAlert,
  UserX,
  BookOpen,
  Gamepad2,
  Edit3,
  Video
} from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("nav_home"), icon: Sparkles },
    { href: "/interpreter", label: t("nav_interpreter"), icon: Video },
    { href: "/courses", label: t("nav_courses"), icon: BookOpen },
    { href: "/games", label: t("nav_games"), icon: Gamepad2 },
    { href: "/whiteboard", label: t("nav_whiteboard"), icon: Edit3 },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  🤟
                </span>
              </div>
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                UniSign
              </span>
              <span className="block text-[10px] uppercase tracking-widest font-semibold text-cyan-400">
                3D & AI Inclusive Hub
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Language Switcher + Download App */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <Globe className="w-4 h-4 text-cyan-400 ml-2 mr-1" />
              {(["en", "hi", "gu"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-bold uppercase transition-all ${
                    language === lang
                      ? "bg-cyan-500 text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Download App CTA Button */}
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02]"
            >
              <Download className="w-4 h-4" />
              {t("nav_download_app")}
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-300 hover:text-white bg-slate-900 rounded-xl border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-800 bg-slate-950 p-4 space-y-3">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-slate-300 hover:bg-slate-900"
                    }`}
                  >
                    <Icon className="w-5 h-5 text-cyan-400" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {(["en", "hi", "gu"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1.5 text-xs rounded-lg font-bold uppercase ${
                      language === lang
                        ? "bg-cyan-500 text-slate-950"
                        : "text-slate-400"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <Link
                href="/delete-account"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-rose-400 hover:underline flex items-center gap-1"
              >
                <UserX className="w-3.5 h-3.5" /> Delete Account
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Download App Modal */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md glass-card rounded-3xl p-6 border border-indigo-500/30 text-center space-y-5">
            <button
              onClick={() => setDownloadModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center mx-auto">
              <Download className="w-8 h-8 text-cyan-400" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-white">Get UniSign Flutter App</h3>
              <p className="text-xs text-slate-400 mt-1">
                Native cross-platform performance powered by Flutter, Model Viewer Plus, and Firebase.
              </p>
            </div>

            {/* Mock QR Code */}
            <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto flex flex-col items-center justify-center border-4 border-indigo-500/30 shadow-inner">
              <div className="grid grid-cols-5 gap-1.5 w-36 h-36">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${
                      (i * 7) % 3 === 0 ? "bg-slate-950" : "bg-indigo-600"
                    } rounded-sm`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => alert("UniSign APK download starting...")}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl border border-slate-700 text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>🤖 Android APK</span>
              </button>
              <button
                onClick={() => alert("Redirecting to App Store...")}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>🍎 iOS App Store</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
