import React, { useState } from 'react';
import { 
  Droplets, 
  Play, 
  Square, 
  Brain, 
  Clock, 
  Activity, 
  CheckCircle2, 
  Gauge, 
  Sliders,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { IsometricDripView } from '../components/IsometricDripView';

export const IrrigationPage: React.FC = () => {
  const { 
    isPumpActive, 
    pumpRemainingSeconds, 
    startWatering, 
    stopWatering, 
    irrigationMode, 
    setIrrigationMode, 
    sensorData,
    fuzzyDecision,
    setIsFuzzyModalOpen
  } = useFarm();

  const [durationMinutes, setDurationMinutes] = useState<number>(3);
  const estimatedVolumeLiters = (durationMinutes * 2.5).toFixed(1);

  const handleStart = () => {
    startWatering(durationMinutes * 60);
  };

  return (
    <div className="space-y-6">
      {/* Page Header (Section 13) */}
      <div className="glass-card rounded-[28px] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">💧</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Smart Irrigation
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Pusat kendali irigasi tetes cerdas tanaman semangka dengan otomasi Fuzzy Logic &amp; kontrol manual pompa.
          </p>
        </div>

        {/* System Mode Toggle (AUTO / MANUAL) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl shrink-0 border border-slate-200/80">
          <button
            onClick={() => setIrrigationMode('AUTO')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              irrigationMode === 'AUTO'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AUTO (Fuzzy Logic)
          </button>
          <button
            onClick={() => setIrrigationMode('MANUAL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              irrigationMode === 'MANUAL'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            MANUAL (Kontrol Pompa)
          </button>
        </div>
      </div>

      {/* Main Grid: Control & Auto/Manual Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Mode Details & Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Mode Card */}
          {irrigationMode === 'AUTO' ? (
            /* AUTO MODE (Section 13) */
            <div className="glass-card rounded-[32px] p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center ring-1 ring-emerald-500/20">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                      System Mode: AUTO
                    </span>
                    <h2 className="text-lg font-black text-slate-900">Fuzzy Logic Active</h2>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Sistem Berjalan
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sistem menentukan keputusan dan durasi penyiraman secara otomatis berdasarkan 3 variabel utama:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">VARIABEL 1</span>
                  <div className="font-extrabold text-slate-800 text-sm">Kelembapan Tanah</div>
                  <div className="text-xl font-black text-emerald-600 font-mono mt-1">
                    {sensorData.soil_moisture}%
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Sensor Kapasitif</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">VARIABEL 2</span>
                  <div className="font-extrabold text-slate-800 text-sm">Suhu Lingkungan</div>
                  <div className="text-xl font-black text-amber-600 font-mono mt-1">
                    {sensorData.temperature}°C
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Sensor DHT22</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">VARIABEL 3</span>
                  <div className="font-extrabold text-slate-800 text-sm">Probabilitas Hujan</div>
                  <div className="text-xl font-black text-purple-600 font-mono mt-1">
                    {sensorData.weather_probability}%
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Weather Forecast API</span>
                </div>
              </div>

              {/* Status Output Fuzzy */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    Hasil Keputusan Saat Ini
                  </span>
                  <div className="text-xl font-black text-emerald-950 mt-0.5">
                    {fuzzyDecision.decision}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Water Need: <strong>{fuzzyDecision.water_need}%</strong> • {fuzzyDecision.reasons.join(', ')}
                  </p>
                </div>

                <button
                  onClick={() => setIsFuzzyModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-xs"
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>Lihat Detail Aturan</span>
                </button>
              </div>
            </div>
          ) : (
            /* MANUAL MODE (Section 13) */
            <div className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center ring-1 ring-teal-500/20">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                      System Mode: MANUAL
                    </span>
                    <h2 className="text-lg font-black text-slate-900">Kontrol Pompa Manual</h2>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isPumpActive ? 'bg-cyan-100 text-cyan-800 animate-pulse' : 'bg-slate-100 text-slate-600'
                }`}>
                  Pompa: {isPumpActive ? 'ON' : 'OFF'}
                </span>
              </div>

              {/* Big Action Button (▶ Mulai Menyiram / ■ Hentikan Penyiraman) */}
              {isPumpActive ? (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 text-white text-center space-y-3 shadow-lg shadow-rose-600/25">
                  <span className="text-xs uppercase font-extrabold text-rose-100 tracking-wider">
                    Penyiraman Sedang Berlangsung
                  </span>
                  <div className="text-5xl font-black font-mono">
                    {String(Math.floor(pumpRemainingSeconds / 60)).padStart(2, '0')}:
                    {String(pumpRemainingSeconds % 60).padStart(2, '0')}
                  </div>
                  <p className="text-xs text-rose-100">
                    Debit: 2.5 L/menit dialirkan ke zona perakaran semangka.
                  </p>
                  <button
                    onClick={stopWatering}
                    className="px-8 py-3.5 rounded-xl bg-white text-rose-700 hover:bg-rose-50 text-sm font-black shadow-md transition-all active:scale-95 flex items-center gap-2 mx-auto"
                  >
                    <Square className="w-4 h-4 fill-rose-700" />
                    <span>■ Hentikan Penyiraman</span>
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white text-center space-y-4 shadow-lg shadow-emerald-600/20">
                  <span className="text-xs uppercase font-extrabold text-emerald-100 tracking-wider">
                    Pompa Standby (Siap Digunakan)
                  </span>
                  <div className="text-2xl font-black">
                    Penyiraman Presisi Tanaman Semangka
                  </div>
                  <p className="text-xs text-emerald-100 max-w-md mx-auto">
                    Pilih durasi penyiraman dan tekan tombol di bawah untuk mengaktifkan pompa irigasi tetes.
                  </p>
                  <button
                    onClick={handleStart}
                    className="px-8 py-3.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-sm font-extrabold shadow-md transition-all active:scale-95 flex items-center gap-2.5 mx-auto"
                  >
                    <Play className="w-4 h-4 fill-emerald-800" />
                    <span>▶ Mulai Menyiram</span>
                  </button>
                </div>
              )}

              {/* Duration Selector */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Pilih Durasi Pompa</span>
                  <span className="text-emerald-700 font-extrabold font-mono">
                    {durationMinutes} Menit ({durationMinutes * 60} Detik)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  disabled={isPumpActive}
                  className="w-full accent-emerald-600 disabled:opacity-50"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>1 Menit (2.5 L)</span>
                  <span>5 Menit (12.5 L)</span>
                  <span>10 Menit (25.0 L)</span>
                </div>
              </div>
            </div>
          )}

          {/* Telemetry Summary Cards: Durasi, Status Pompa, Volume Air */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card rounded-2xl p-4 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">STATUS POMPA</span>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isPumpActive ? 'bg-cyan-500 animate-ping' : 'bg-slate-400'}`} />
                <span className="text-base font-extrabold text-slate-900 font-mono">
                  {isPumpActive ? 'AKTIF (MENYIRAM)' : 'OFF (STANDBY)'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Relay ESP32 Pin D23</span>
            </div>

            <div className="glass-card rounded-2xl p-4 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">SISA DURASI</span>
              <div className="text-base font-extrabold text-slate-900 font-mono">
                {isPumpActive ? `${pumpRemainingSeconds} detik` : `${durationMinutes * 60} detik`}
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Timer Otomatis</span>
            </div>

            <div className="glass-card rounded-2xl p-4 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">VOLUME AIR DIALIRKAN</span>
              <div className="text-base font-extrabold text-sky-700 font-mono">
                {isPumpActive ? '2.5 L/m (Flow Aktif)' : `${sensorData.water_volume_today} L Hari Ini`}
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Flow Sensor Hall-Effect</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): 3D Isometric View */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-[32px] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌿</span>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Visualisasi Drip Irrigation
                </h3>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                Bedengan 1.5 Ha
              </span>
            </div>

            <IsometricDripView />

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Emitter irigasi tetes 30 cm antar tanaman semangka</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tekanan operasional 1.2 bar dengan filter screen 120 mesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
