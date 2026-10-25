import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Zap, Droplet, Gauge, Activity } from 'lucide-react';

export const IsometricDripView: React.FC = () => {
  const { isPumpActive, pumpRemainingSeconds, sensorData } = useFarm();

  return (
    <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 border border-slate-100/80 shadow-inner group">
      {/* Base 3D Isometric Image */}
      <img
        src="/assets/drip_isometric.jpg"
        alt="Sistem Irigasi Tetes Pintar"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />

      {/* Dynamic Animated Water Flow SVG Overlay */}
      {isPumpActive && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Main pipe flow path from tank through pump to field */}
          <path
            d="M 22 55 L 26 62 L 34 58 L 50 50 L 62 44 L 80 58 L 65 74 L 48 64"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="animate-water-pipe opacity-90 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          />
          {/* Lateral drip lines across soil beds */}
          <path
            d="M 50 50 L 68 62"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.2"
            className="animate-water-pipe opacity-85"
          />
          <path
            d="M 62 44 L 80 56"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.2"
            className="animate-water-pipe opacity-85"
          />
        </svg>
      )}

      {/* Animated Water Droplets & Ripples on Emitters */}
      {isPumpActive && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* Emitter 1 */}
          <div className="absolute top-[52%] left-[62%] -translate-x-1/2 -translate-y-1/2">
            <span className="block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-drip-1 shadow-md shadow-cyan-400" />
            <span className="absolute -inset-1 rounded-full border border-cyan-300 animate-ripple" />
          </div>

          {/* Emitter 2 */}
          <div className="absolute top-[62%] left-[54%] -translate-x-1/2 -translate-y-1/2">
            <span className="block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-drip-2 shadow-md shadow-cyan-400" />
            <span className="absolute -inset-1 rounded-full border border-cyan-300 animate-ripple" />
          </div>

          {/* Emitter 3 */}
          <div className="absolute top-[70%] left-[68%] -translate-x-1/2 -translate-y-1/2">
            <span className="block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-drip-3 shadow-md shadow-cyan-400" />
            <span className="absolute -inset-1 rounded-full border border-cyan-300 animate-ripple" />
          </div>

          {/* Emitter 4 */}
          <div className="absolute top-[58%] left-[78%] -translate-x-1/2 -translate-y-1/2">
            <span className="block w-2 h-2 rounded-full bg-cyan-400 animate-drip-1 shadow-md shadow-cyan-400" />
            <span className="absolute -inset-1 rounded-full border border-cyan-300 animate-ripple" />
          </div>

          {/* Emitter 5 */}
          <div className="absolute top-[48%] left-[72%] -translate-x-1/2 -translate-y-1/2">
            <span className="block w-2 h-2 rounded-full bg-cyan-400 animate-drip-2 shadow-md shadow-cyan-400" />
          </div>
        </div>
      )}

      {/* Floating Interactive Badge Overlays */}
      {/* 1. Water Tank Badge */}
      <div className="absolute top-[18%] left-[6%] bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-white rounded-lg px-2 py-1 text-[10px] font-semibold flex items-center gap-1.5 shadow-lg">
        <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
        <span>Tangki: {sensorData.water_level}% (780 L)</span>
      </div>

      {/* 2. Pump Status Badge */}
      <div className={`absolute top-[48%] left-[24%] backdrop-blur-md rounded-lg px-2.5 py-1 text-[11px] font-bold flex items-center gap-1.5 shadow-xl transition-all border ${
        isPumpActive 
          ? 'bg-emerald-500 text-white border-emerald-300 animate-pulse-glow'
          : 'bg-slate-900/85 text-slate-300 border-slate-700'
      }`}>
        <Zap className={`w-3.5 h-3.5 ${isPumpActive ? 'text-amber-200 fill-amber-200' : 'text-slate-400'}`} />
        <span>Pompa ({isPumpActive ? 'ON' : 'OFF'})</span>
        {isPumpActive && (
          <span className="ml-1 px-1.5 py-0.2 rounded-full bg-black/30 text-[10px] font-mono">
            {pumpRemainingSeconds}s
          </span>
        )}
      </div>

      {/* 3. ESP32 Controller Badge */}
      <div className="absolute top-[12%] left-[44%] bg-slate-900/85 backdrop-blur-md border border-slate-700/70 text-emerald-400 rounded-lg px-2 py-1 text-[10px] font-semibold flex items-center gap-1.5 shadow-lg">
        <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
        <span>ESP32 Ready</span>
      </div>

      {/* Bottom overlay footer */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
        <div className="bg-slate-900/85 backdrop-blur-md border border-slate-700/80 px-2.5 py-1 rounded-lg text-[10px] font-medium text-slate-200 flex items-center gap-1.5">
          <Droplet className={`w-3 h-3 ${isPumpActive ? 'text-cyan-400 animate-bounce' : 'text-slate-400'}`} />
          <span>Irigasi Tetes Semangka</span>
        </div>

        <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold backdrop-blur-md ${
          isPumpActive 
            ? 'bg-cyan-500/90 text-white border border-cyan-400' 
            : 'bg-slate-800/80 text-slate-300 border border-slate-700'
        }`}>
          {isPumpActive ? '💧 Air Mengalir (2.5 L/m)' : '⏹ Siaga Standby'}
        </div>
      </div>
    </div>
  );
};
