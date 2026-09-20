"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Edit3,
  Trash2,
  Download,
  Grid,
  RotateCcw,
  Palette,
  Sparkles,
  Type,
  Eraser
} from "lucide-react";

export default function WhiteboardPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#06b6d4");
  const [brushSize, setBrushSize] = useState(6);
  const [isEraser, setIsEraser] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  const colors = [
    "#06b6d4", // Cyan
    "#6366f1", // Indigo
    "#10b981", // Emerald
    "#ec4899", // Pink
    "#f59e0b", // Yellow
    "#ffffff", // White
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = isEraser ? "#090d16" : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `unisign-whiteboard-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-slate-800">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center justify-center md:justify-start gap-3">
              <Edit3 className="w-7 h-7 text-cyan-400" /> Digital Whiteboard Studio
            </h1>
            <p className="text-xs text-slate-400">
              Built-in visual teaching and drawing canvas for intuitive sign explanations & creative expression.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                showGrid
                  ? "bg-indigo-600 text-white border-indigo-500"
                  : "bg-slate-900 text-slate-400 border-slate-800"
              }`}
            >
              <Grid className="w-4 h-4" /> {showGrid ? "Grid On" : "Grid Off"}
            </button>
            <button
              onClick={clearCanvas}
              className="px-3 py-2 bg-slate-900 hover:bg-rose-950 text-rose-300 border border-slate-800 hover:border-rose-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="w-4 h-4" /> Clear Canvas
            </button>
            <button
              onClick={downloadCanvas}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Export PNG
            </button>
          </div>
        </div>

        {/* Drawing Tools Toolbar */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          {/* Color Palette */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Palette className="w-4 h-4 text-cyan-400" /> Color:
            </span>
            <div className="flex items-center gap-1.5">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setColor(c);
                    setIsEraser(false);
                  }}
                  style={{ backgroundColor: c }}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    color === c && !isEraser
                      ? "scale-125 ring-2 ring-white shadow-md"
                      : "opacity-80 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Brush Size Slider */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400">Brush Size:</span>
            <input
              type="range"
              min="2"
              max="30"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-28 accent-cyan-400 cursor-pointer"
            />
            <span className="text-xs font-mono text-cyan-300 w-6">{brushSize}px</span>
          </div>

          {/* Tool Modes */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEraser(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                !isEraser ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400"
              }`}
            >
              Pen Tool
            </button>
            <button
              onClick={() => setIsEraser(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                isEraser ? "bg-rose-600 text-white" : "bg-slate-900 text-slate-400"
              }`}
            >
              <Eraser className="w-3.5 h-3.5" /> Eraser
            </button>
          </div>
        </div>

        {/* Main Canvas Workspace */}
        <div className="relative w-full h-[600px] glass-card rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          )}

          <canvas
            ref={canvasRef}
            width={1200}
            height={600}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full h-full cursor-crosshair relative z-10"
          />
        </div>
      </div>
    </div>
  );
}
