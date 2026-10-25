import React, { useState } from 'react';
import { X, Brain, CheckCircle2, ChevronRight, Sliders, Info, Zap } from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { evaluateFuzzyIrrigation } from '../data/fuzzyLogic';

export const FuzzyDetailModal: React.FC = () => {
  const { isFuzzyModalOpen, setIsFuzzyModalOpen, sensorData } = useFarm();

  // Interactive sandbox sliders inside the modal for demonstration
  const [testSoil, setTestSoil] = useState<number>(sensorData.soil_moisture);
  const [testTemp, setTestTemp] = useState<number>(sensorData.temperature);
  const [testRain, setTestRain] = useState<number>(sensorData.weather_probability);

  if (!isFuzzyModalOpen) return null;

  // Run dynamic evaluation on current test values
  const { decision: testDecision, traces: testTraces } = evaluateFuzzyIrrigation(
    testSoil,
    testTemp,
    testRain
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white">
              <Brain className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight">Detail Inferensi Fuzzy Logic</h2>
              <p className="text-xs text-emerald-100 font-medium">
                Metode Mamdani: Sistem Pengambilan Keputusan Irigasi Cerdas Tanaman Semangka
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFuzzyModalOpen(false)}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Pipeline Flowchart */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 block mb-1">TAHAP 1</span>
              <p className="font-bold text-slate-800">Crisp Input</p>
              <p className="text-[11px] text-slate-500 mt-1">Sensor IoT & Cuaca</p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80">
              <span className="text-[10px] font-bold text-emerald-600 block mb-1">TAHAP 2</span>
              <p className="font-bold text-emerald-900">Fuzzifikasi</p>
              <p className="text-[11px] text-emerald-700 mt-1">Fungsi Keanggotaan</p>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200/80">
              <span className="text-[10px] font-bold text-blue-600 block mb-1">TAHAP 3</span>
              <p className="font-bold text-blue-900">Rule Base</p>
              <p className="text-[11px] text-blue-700 mt-1">27 Aturan Inferensi</p>
            </div>
            <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200/80">
              <span className="text-[10px] font-bold text-purple-600 block mb-1">TAHAP 4</span>
              <p className="font-bold text-purple-900">Defuzzifikasi</p>
              <p className="text-[11px] text-purple-700 mt-1">Metode Centroid</p>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200/80 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-rose-600 block mb-1">TAHAP 5</span>
              <p className="font-bold text-rose-900">Keputusan</p>
              <p className="text-[11px] text-rose-700 mt-1">Status Irigasi Tetes</p>
            </div>
          </div>

          {/* Interactive Simulation Sandbox */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-emerald-900">
                  Interactive Fuzzy Sandbox (Uji Simulasi Nilai Input)
                </h3>
              </div>
              <button
                onClick={() => {
                  setTestSoil(sensorData.soil_moisture);
                  setTestTemp(sensorData.temperature);
                  setTestRain(sensorData.weather_probability);
                }}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline"
              >
                Reset ke Data Aktual
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Slider 1: Soil */}
              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-2xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-slate-600">Kelembapan Tanah</span>
                  <span className="text-xs font-bold text-emerald-700">{testSoil}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={testSoil}
                  onChange={(e) => setTestSoil(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>Kering (0-45%)</span>
                  <span>Sedang (40-75%)</span>
                  <span>Basah (&gt;70%)</span>
                </div>
              </div>

              {/* Slider 2: Temp */}
              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-2xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-slate-600">Suhu Udara</span>
                  <span className="text-xs font-bold text-amber-600">{testTemp}°C</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="42"
                  step="0.5"
                  value={testTemp}
                  onChange={(e) => setTestTemp(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>Dingin (&lt;24)</span>
                  <span>Normal (24-34)</span>
                  <span>Panas (&gt;34)</span>
                </div>
              </div>

              {/* Slider 3: Rain */}
              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-2xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-slate-600">Peluang Hujan</span>
                  <span className="text-xs font-bold text-sky-600">{testRain}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={testRain}
                  onChange={(e) => setTestRain(Number(e.target.value))}
                  className="w-full accent-sky-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>Rendah (&lt;35)</span>
                  <span>Sedang (30-70)</span>
                  <span>Tinggi (&gt;65)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fuzzification Result & Memberships */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Membership Soil */}
            <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>μ Kelembapan Tanah</span>
                <span className="text-emerald-700 font-extrabold">{testSoil}%</span>
              </h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Kering:</span>
                  <span className="font-mono font-bold">{testDecision.memberships.soil.dry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sedang (Ideal):</span>
                  <span className="font-mono font-bold text-emerald-600">{testDecision.memberships.soil.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Basah:</span>
                  <span className="font-mono font-bold">{testDecision.memberships.soil.wet}</span>
                </div>
              </div>
            </div>

            {/* Membership Temp */}
            <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>μ Suhu Udara</span>
                <span className="text-amber-600 font-extrabold">{testTemp}°C</span>
              </h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Dingin:</span>
                  <span className="font-mono font-bold">{testDecision.memberships.temp.cold}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Normal:</span>
                  <span className="font-mono font-bold text-amber-600">{testDecision.memberships.temp.normal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Panas:</span>
                  <span className="font-mono font-bold">{testDecision.memberships.temp.hot}</span>
                </div>
              </div>
            </div>

            {/* Membership Rain */}
            <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>μ Peluang Hujan</span>
                <span className="text-sky-600 font-extrabold">{testRain}%</span>
              </h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Rendah:</span>
                  <span className="font-mono font-bold">{testDecision.memberships.rain.low}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sedang:</span>
                  <span className="font-mono font-bold">{testDecision.memberships.rain.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tinggi:</span>
                  <span className="font-mono font-bold text-sky-600">{testDecision.memberships.rain.high}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Rules Tracing (Top 4 Fired Rules) */}
          <div className="p-4 rounded-2xl border border-slate-200/80 bg-white">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Aturan Inferensi yang Aktif (Fired Rules)</span>
            </h4>
            <div className="space-y-2">
              {testTraces.slice(0, 4).map((tr) => (
                <div
                  key={tr.ruleIndex}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-bold text-[10px]">
                      R#{tr.ruleIndex}
                    </span>
                    <span className="text-slate-700 font-medium">IF {tr.condition}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-bold text-emerald-700">THEN Kebutuhan: {tr.outputTerm}</span>
                  </div>
                  <span className="font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px]">
                    α = {tr.weight.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Final Defuzzified Output & Decision Summary */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-700 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-emerald-700/20">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Hasil Defuzzifikasi Centroid
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black">Water Need: {testDecision.water_need}%</span>
                <span className="text-sm font-medium text-emerald-100">
                  ({testDecision.water_need < 35 ? 'Kebutuhan Rendah' : testDecision.water_need < 65 ? 'Kebutuhan Sedang' : 'Kebutuhan Tinggi'})
                </span>
              </div>
              <p className="text-xs text-emerald-100 max-w-md">
                {testDecision.reasons.join(' • ')}
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center shrink-0">
              <span className="text-[11px] font-bold text-emerald-200 block uppercase">Keputusan Akhir</span>
              <span className="text-xl font-black block mt-0.5">{testDecision.decision}</span>
              {testDecision.duration_minutes > 0 ? (
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-[11px] font-bold">
                  Durasi: {testDecision.duration_minutes} Menit
                </span>
              ) : (
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-rose-500/80 text-[11px] font-bold">
                  Pompa Tetap Nonaktif
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-600" />
            Formula inferensi Mamdani terkonfigurasi untuk varietas Semangka Inul (Citrullus lanatus)
          </p>
          <button
            onClick={() => setIsFuzzyModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
          >
            Tutup Detail
          </button>
        </div>
      </div>
    </div>
  );
};
