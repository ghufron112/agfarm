import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Volume1, 
  Play, 
  Pause, 
  Music, 
  Sparkles, 
  Radio, 
  Sliders, 
  X, 
  ChevronUp, 
  ChevronDown, 
  Disc,
  Headphones
} from 'lucide-react';
import { 
  ambientAudio, 
  AMBIENT_TRACKS, 
  AmbientTrackId, 
  AmbientState 
} from '../utils/ambientAudio';

export const AmbientAudioPlayer: React.FC = () => {
  const [state, setState] = useState<AmbientState>(ambientAudio.getState());
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomeToast, setShowWelcomeToast] = useState(false);
  const [visualizerValues, setVisualizerValues] = useState<number[]>([15, 25, 40, 20, 10, 30]);
  const animFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    // Subscribe to engine state
    const unsubscribe = ambientAudio.subscribe((newState) => {
      setState(newState);
    });

    // Check if toast was dismissed before
    const hasSeenToast = localStorage.getItem('agfarm_audio_toast_seen');
    if (!hasSeenToast) {
      const timer = setTimeout(() => {
        setShowWelcomeToast(true);
      }, 2500);
      return () => {
        clearTimeout(timer);
        unsubscribe();
      };
    }

    return () => unsubscribe();
  }, []);

  // Equalizer visualizer loop when playing
  useEffect(() => {
    if (!state.isPlaying || state.isMuted) {
      setVisualizerValues([12, 12, 12, 12, 12, 12]);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const updateVisualizer = () => {
      const data = ambientAudio.getVisualizerData();
      if (data && data.length >= 6) {
        // Map 6 bins to height percentage
        const heights = [
          Math.max(15, Math.min(100, (data[0] / 255) * 100)),
          Math.max(20, Math.min(100, (data[1] / 255) * 110)),
          Math.max(25, Math.min(100, (data[2] / 255) * 120)),
          Math.max(20, Math.min(100, (data[3] / 255) * 115)),
          Math.max(15, Math.min(100, (data[4] / 255) * 105)),
          Math.max(15, Math.min(100, (data[5] / 255) * 95)),
        ];
        setVisualizerValues(heights);
      }
      animFrameRef.current = requestAnimationFrame(updateVisualizer);
    };

    animFrameRef.current = requestAnimationFrame(updateVisualizer);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [state.isPlaying, state.isMuted]);

  const handleTogglePlay = () => {
    ambientAudio.togglePlay();
    if (showWelcomeToast) {
      setShowWelcomeToast(false);
      localStorage.setItem('agfarm_audio_toast_seen', 'true');
    }
  };

  const handleSelectTrack = (trackId: AmbientTrackId) => {
    ambientAudio.setTrack(trackId);
    if (!state.isPlaying) {
      ambientAudio.play();
    }
  };

  const handleDismissToast = () => {
    setShowWelcomeToast(false);
    localStorage.setItem('agfarm_audio_toast_seen', 'true');
  };

  return (
    <>
      {/* 1. COMPACT TOPBAR TRIGGER PILL */}
      <div className="relative" ref={containerRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-xs ${
            state.isPlaying && !state.isMuted
              ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-600/70 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/20'
              : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
          title="Backsound Suasana Kebun Semangka"
        >
          {/* Animated Equalizer Wave Bars */}
          <div className="flex items-end gap-0.5 h-3.5 w-3.5 pb-0.5 shrink-0">
            {visualizerValues.slice(0, 4).map((h, i) => (
              <span
                key={i}
                className={`w-0.5 rounded-full transition-all duration-100 ${
                  state.isPlaying && !state.isMuted 
                    ? 'bg-emerald-500 dark:bg-emerald-400' 
                    : 'bg-slate-400 dark:bg-slate-500'
                }`}
                style={{ height: `${state.isPlaying && !state.isMuted ? h : 25}%` }}
              />
            ))}
          </div>

          <span className="hidden md:inline truncate max-w-[130px]">
            {state.trackInfo.title}
          </span>

          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold uppercase ${
            state.isPlaying && !state.isMuted
              ? 'bg-emerald-600 text-white animate-pulse'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
          }`}>
            {state.isPlaying && !state.isMuted ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* 2. EXPANDABLE FLOATING CONTROLLER MODAL / DROPDOWN */}
        {isOpen && (
          <div className="absolute right-0 top-12 z-50 w-[340px] sm:w-[380px] glass-card rounded-[28px] p-5 shadow-2xl border border-white/95 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    AG Farm Ambient Backsound 🍉
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-400">Musik relaksasi suasana kebun</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Currently Playing Hero Box */}
            <div className="my-3.5 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-900/90 to-teal-950/90 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className={`text-2xl ${state.isPlaying && !state.isMuted ? 'animate-spin-slow' : ''}`}>
                  {state.trackInfo.icon}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 block">
                    {state.isPlaying ? (state.isMuted ? 'TERBUNGKAM (MUTED)' : 'SEDANG MEMUTAR') : 'JEDA (PAUSED)'}
                  </span>
                  <h5 className="text-xs font-bold text-white truncate max-w-[170px]">
                    {state.trackInfo.title}
                  </h5>
                  <span className="text-[10px] text-emerald-200/80 block truncate max-w-[170px]">
                    {state.trackInfo.subtitle}
                  </span>
                </div>
              </div>

              {/* Big Play / Pause Button */}
              <button
                onClick={handleTogglePlay}
                className="w-11 h-11 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40 transition-all active:scale-95 shrink-0"
                title={state.isPlaying ? 'Jeda Backsound' : 'Putar Backsound'}
              >
                {state.isPlaying && !state.isMuted ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                )}
              </button>
            </div>

            {/* Equalizer Frequency Visualization Wave */}
            <div className="h-9 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 px-4 flex items-end justify-between gap-1.5 pb-1.5 mb-3.5 border border-slate-200/60 dark:border-slate-700/60">
              {visualizerValues.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center h-full">
                  <div
                    className={`w-full rounded-t-md transition-all duration-100 ${
                      state.isPlaying && !state.isMuted
                        ? 'bg-gradient-to-t from-emerald-600 to-teal-400'
                        : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                    style={{ height: `${state.isPlaying && !state.isMuted ? val : 15}%` }}
                  />
                </div>
              ))}
            </div>

            {/* Track Selector List */}
            <div className="space-y-1.5 mb-4">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Pilih Suasana Backsound:
              </span>
              {AMBIENT_TRACKS.map((t) => {
                const isSelected = state.currentTrackId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTrack(t.id)}
                    className={`w-full p-2.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                        : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-lg shrink-0">{t.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold truncate block">{t.title}</span>
                        {isSelected && state.isPlaying && !state.isMuted && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 truncate block">
                        {t.subtitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Volume Control Slider & Mute */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <button
                onClick={() => ambientAudio.toggleMute()}
                className={`p-1.5 rounded-xl transition-colors ${
                  state.isMuted
                    ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                title={state.isMuted ? 'Bunyikan' : 'Mute'}
              >
                {state.isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : state.volume > 0.5 ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <Volume1 className="w-4 h-4" />
                )}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={state.isMuted ? 0 : state.volume}
                onChange={(e) => ambientAudio.setVolume(parseFloat(e.target.value))}
                className="flex-1 accent-emerald-600 cursor-pointer h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"
              />

              <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300 w-9 text-right">
                {state.isMuted ? '0%' : `${Math.round(state.volume * 100)}%`}
              </span>
            </div>

            <p className="mt-2.5 text-center text-[10px] text-slate-400 dark:text-slate-400">
              💡 Sintesis audio Web Audio prosedural • Mengalir tanpa jeda &amp; hemat kuota
            </p>
          </div>
        )}
      </div>

      {/* 3. FIRST-TIME WELCOME TOAST NOTIFICATION */}
      {showWelcomeToast && !state.isPlaying && (
        <div className="fixed bottom-6 left-6 z-40 max-w-sm glass-card rounded-2xl p-4 shadow-2xl border border-emerald-300 dark:border-emerald-700 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/30 text-lg">
              🎵
            </div>
            <div className="space-y-1 flex-1">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                Biar Nggak Bosen, Putar Backsound Kebun! 🍉
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                Nikmati musik relaksasi alam, kicau burung pagi, dan Lo-Fi agro selagi memantau kebun semangka.
              </p>
              <div className="flex items-center gap-2 pt-1.5">
                <button
                  onClick={handleTogglePlay}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Nyalakan Musik</span>
                </button>
                <button
                  onClick={handleDismissToast}
                  className="px-2.5 py-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-semibold"
                >
                  Nanti Saja
                </button>
              </div>
            </div>
            <button
              onClick={handleDismissToast}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
