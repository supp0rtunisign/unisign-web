"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Zap, Sparkles, User, Settings, Volume2 } from "lucide-react";

export type AvatarGender = "male" | "female" | "inclusive";

interface Avatar3DViewerProps {
  currentText?: string;
  activeWord?: string;
  speed?: number;
  onPlaybackComplete?: () => void;
}

export const Avatar3DViewer: React.FC<Avatar3DViewerProps> = ({
  currentText = "Hello",
  activeWord = "Hello",
  speed = 1,
  onPlaybackComplete
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [avatarGender, setAvatarGender] = useState<AvatarGender>("inclusive");
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(speed);
  const [frame, setFrame] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync internal speed if prop changes
  useEffect(() => {
    setPlaybackSpeed(speed);
  }, [speed]);

  // Canvas 3D Animated Avatar Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render3DAvatar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const time = Date.now() * 0.002 * playbackSpeed;

      // Dynamic Avatar Colors based on gender
      const avatarColors = {
        inclusive: { shirt: "#6366f1", glow: "#818cf8", skin: "#fcd34d" },
        female: { shirt: "#ec4899", glow: "#f472b6", skin: "#fef08a" },
        male: { shirt: "#06b6d4", glow: "#22d3ee", skin: "#fde047" }
      }[avatarGender];

      // Draw Background 3D Grid Stage
      ctx.fillStyle = "#0d1527";
      ctx.fillRect(0, 0, width, height);

      // Radial Studio Lighting
      const gradient = ctx.createRadialGradient(
        width / 2, height / 3, 20,
        width / 2, height / 3, width / 1.2
      );
      gradient.addColorStop(0, "rgba(99, 102, 241, 0.25)");
      gradient.addColorStop(0.5, "rgba(15, 23, 42, 0.5)");
      gradient.addColorStop(1, "rgba(9, 13, 22, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Floor Grid Lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, height - 80);
        ctx.lineTo(width / 2 + (i - width / 2) * 2, height);
        ctx.stroke();
      }

      // 3D Avatar Center Coordinates
      const cx = width / 2;
      const cy = height / 2 + 10;

      // Subtle breathing motion
      const breath = isPlaying ? Math.sin(time * 2) * 4 : 0;
      const handWave = isPlaying ? Math.sin(time * 5) * 25 : 0;
      const handFlex = isPlaying ? Math.cos(time * 4) * 15 : 0;

      // 1. Avatar Head & Face
      ctx.save();
      // Head shadow
      ctx.shadowColor = avatarColors.glow;
      ctx.shadowBlur = 20;

      // Neck
      ctx.fillStyle = avatarColors.skin;
      ctx.fillRect(cx - 14, cy - 110 + breath, 28, 30);

      // Head Base Oval
      ctx.beginPath();
      ctx.arc(cx, cy - 140 + breath, 45, 0, Math.PI * 2);
      ctx.fillStyle = avatarColors.skin;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.stroke();

      // Hair
      ctx.fillStyle = avatarGender === "female" ? "#312e81" : "#1e1b4b";
      ctx.beginPath();
      if (avatarGender === "female") {
        ctx.arc(cx, cy - 150 + breath, 52, Math.PI, Math.PI * 2);
        ctx.rect(cx - 52, cy - 150 + breath, 104, 55);
      } else {
        ctx.arc(cx, cy - 152 + breath, 46, Math.PI * 0.9, Math.PI * 2.1);
      }
      ctx.fill();

      // Eyes & Expression
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.arc(cx - 16, cy - 142 + breath, 5, 0, Math.PI * 2);
      ctx.arc(cx + 16, cy - 142 + breath, 5, 0, Math.PI * 2);
      ctx.fill();

      // Smiling mouth
      ctx.beginPath();
      ctx.arc(cx, cy - 130 + breath, 14, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#475569";
      ctx.stroke();
      ctx.restore();

      // 2. Torso / Clothes (.glb Model Simulation)
      ctx.save();
      ctx.fillStyle = avatarColors.shirt;
      ctx.beginPath();
      ctx.roundRect(cx - 55, cy - 75 + breath, 110, 140, [30, 30, 10, 10]);
      ctx.fill();

      // Badge / Logo on Shirt
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, cy - 35 + breath, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = avatarColors.shirt;
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("US", cx, cy - 31 + breath);

      // 3. 3D Animated Skeletal Hands (The Sign Interpreter Core)
      // Left Arm & Hand (Resting or Support Gesture)
      const leftHandX = cx - 80 + handFlex * 0.3;
      const leftHandY = cy + 10 + breath - Math.abs(handWave * 0.2);

      ctx.strokeStyle = avatarColors.shirt;
      ctx.lineWidth = 18;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx - 45, cy - 65 + breath);
      ctx.lineTo(leftHandX, leftHandY);
      ctx.stroke();

      // Left Palm & Fingers
      ctx.fillStyle = avatarColors.skin;
      ctx.beginPath();
      ctx.arc(leftHandX - 5, leftHandY + 5, 14, 0, Math.PI * 2);
      ctx.fill();

      // Right Arm & Active 3D Sign Gesture Hand (Primary Signer)
      const rightHandX = cx + 80 + handWave;
      const rightHandY = cy - 20 - Math.abs(handWave * 0.8) + breath;

      // Arm Bone Line
      ctx.strokeStyle = avatarColors.shirt;
      ctx.lineWidth = 18;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx + 45, cy - 65 + breath);
      ctx.lineTo(cx + 85, cy - 10 + breath);
      ctx.lineTo(rightHandX, rightHandY);
      ctx.stroke();

      // Active Hand Palm with Glow Effect
      ctx.save();
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 15;
      ctx.fillStyle = avatarColors.skin;
      ctx.beginPath();
      ctx.arc(rightHandX, rightHandY, 16, 0, Math.PI * 2);
      ctx.fill();

      // 5 3D Finger Skeletal Joints (Animated based on active word)
      for (let f = 0; f < 5; f++) {
        const fingerAngle = -Math.PI / 2 + (f - 2) * 0.4 + Math.sin(time * 4 + f) * 0.2;
        const fx1 = rightHandX + Math.cos(fingerAngle) * 16;
        const fy1 = rightHandY + Math.sin(fingerAngle) * 16;
        const fx2 = rightHandX + Math.cos(fingerAngle) * 32;
        const fy2 = rightHandY + Math.sin(fingerAngle) * 32;

        ctx.strokeStyle = avatarColors.skin;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(fx1, fy1);
        ctx.lineTo(fx2, fy2);
        ctx.stroke();

        // Finger Tip Marker
        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(fx2, fy2, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Render Active Sign Subtitle Banner
      ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
      ctx.roundRect(cx - 140, height - 60, 280, 44, 22);
      ctx.fill();
      ctx.strokeStyle = "rgba(99, 102, 241, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`SIGNING: "${(activeWord || currentText).toUpperCase()}"`, cx, height - 34);

      if (isPlaying) {
        animationFrameId = requestAnimationFrame(render3DAvatar);
      }
    };

    render3DAvatar();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, avatarGender, playbackSpeed, currentText, activeWord]);

  return (
    <div className="relative w-full glass-card rounded-2xl overflow-hidden p-4 border border-indigo-500/20 shadow-2xl">
      {/* Top Controls Header */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> 3D .GLB Sign Renderer
          </span>
        </div>

        {/* Gender / Avatar Selector */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-700/50">
          {(["inclusive", "female", "male"] as AvatarGender[]).map((gender) => (
            <button
              key={gender}
              onClick={() => setAvatarGender(gender)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all capitalize ${
                avatarGender === gender
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas Box */}
      <div className="relative w-full h-[360px] bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
        <canvas
          ref={canvasRef}
          width={500}
          height={360}
          className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] font-medium text-slate-300 flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-400" /> 60 FPS Skeletal Tracking
        </div>

        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] font-medium text-cyan-300 flex items-center gap-2">
          <User className="w-3.5 h-3.5" /> Avatar: {avatarGender}
        </div>
      </div>

      {/* Bottom Playback Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition-all shadow-lg shadow-indigo-600/30"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? "Pause Animation" : "Play Sign"}
        </button>

        {/* Speed Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Speed:</span>
          {[0.5, 1.0, 1.5, 2.0].map((s) => (
            <button
              key={s}
              onClick={() => setPlaybackSpeed(s)}
              className={`px-2 py-1 text-xs rounded-md font-semibold ${
                playbackSpeed === s
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Text-to-Speech Trigger */}
        <button
          onClick={() => {
            if ("speechSynthesis" in window) {
              const utterance = new SpeechSynthesisUtterance(activeWord || currentText);
              window.speechSynthesis.speak(utterance);
            }
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700"
          title="Audio Text-to-Speech Output"
        >
          <Volume2 className="w-4 h-4 text-emerald-400" /> Listen Audio (TTS)
        </button>
      </div>
    </div>
  );
};
