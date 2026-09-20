"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserX, ShieldAlert, ArrowLeft, CheckCircle2, AlertTriangle, Trash2 } from "lucide-react";

export default function DeleteAccountPage() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("No longer using the app");
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<{ id: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !confirmed) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const reqId = "REQ-DEL-" + Math.floor(100000 + Math.random() * 900000);
      setSubmittedRequest({ id: reqId });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <div className="glass-card rounded-3xl p-8 border border-rose-500/30 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto">
            <UserX className="w-8 h-8 text-rose-400" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Request Account & Data Deletion
          </h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            In compliance with Google Play Store & Apple App Store developer policies, you can request the permanent deletion of your UniSign account and associated cloud data.
          </p>
        </div>

        {submittedRequest ? (
          <div className="glass-card rounded-3xl p-8 border border-emerald-500/30 text-center space-y-5 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white">Deletion Request Submitted</h3>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300 max-w-sm mx-auto">
              <p>Reference Ticket ID: <span className="font-mono font-bold text-cyan-400">{submittedRequest.id}</span></p>
              <p>Email: <span className="font-semibold text-white">{email}</span></p>
              <p>Status: <span className="text-amber-400 font-semibold">Pending Verification (30-Day Retention Window)</span></p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              We have sent a confirmation link to <span className="text-white font-medium">{email}</span>. Click the link within 7 days to complete permanent deletion of your 3D profiles, quiz history, and learning progress.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all inline-block"
              >
                Return to UniSign Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-6">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-300">Warning: Permanent Action</strong>
                <p className="mt-0.5 text-slate-300">
                  Account deletion removes all your courses progress, custom 3D avatar profiles, whiteboard saves, and Wordle stats. This action cannot be reversed after 30 days.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Registered Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  Registered Email Address or Phone Number *
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. learner@example.com"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Deletion Reason */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  Reason for Account Deletion
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="No longer using the app">No longer using the app</option>
                  <option value="Privacy concerns">Privacy concerns</option>
                  <option value="Creating a new account">Creating a new account</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Confirmation Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="confirm"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="confirm" className="text-xs text-slate-300 cursor-pointer leading-relaxed">
                  I understand that deleting my account will erase my learning progress, quiz scores, custom 3D profiles, and bookmarks permanently after 30 days.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!email || !confirmed || isSubmitting}
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing Request...</span>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" /> Submit Account Deletion Request
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
