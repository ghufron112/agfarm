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

  // Linguistic label helper
  const getSoilLabel = (m: number) => (m < 45 ? 'Kering' : m <= 70 ? 'Sedang' : 'Basah');
  const getTempLabel = (t: number) => (t < 26 ? 'Dingin' : t <= 33 ? 'Sedang' : 'Panas');
  const getRainLabel = (r: number) => (r < 35 ? 'Rendah' : r <= 60 ? 'Sedang' : 'Tinggi');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] shadow-2xl border border-slate-200/90 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-800">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Brain className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Fuzzy Decision Engine</h2>
              <p className="text-xs text-emerald-100 font-medium">
                Metode Mamdani: Sistem Pengambilan Keputusan Irigasi Cerdas Semangka
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFuzzyModalOpen(false)}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Section: Input Parameters (Section 10) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                1. Input Parameter
              </h3>
              <button
                onClick={() => {
                  setTestSoil(sensorData.soil_moisture);
                  setTestTemp(sensorData.temperature);
                  setTestRain(sensorData.weather_probability);
                }}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                Reset ke Data Aktual
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Soil */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-xs font-semibold text-emerald-800 block mb-1">Kelembapan Tanah</span>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-2xl font-black text-slate-900 font-mono">{testSoil}%</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                    {getSoilLabel(testSoil)}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={testSoil}
                  onChange={(e) => setTestSoil(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              {/* Temp */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
                <span className="text-xs font-semibold text-amber-800 block mb-1">Suhu Udara</span>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-2xl font-black text-slate-900 font-mono">{testTemp}°C</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                    {getTempLabel(testTemp)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="40"
                  step="0.5"
                  value={testTemp}
                  onChange={(e) => setTestTemp(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              {/* Rain */}
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
                <span className="text-xs font-semibold text-purple-800 block mb-1">Probabilitas Hujan</span>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-2xl font-black text-slate-900 font-mono">{testRain}%</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-200 text-purple-900">
                    {getRainLabel(testRain)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={testRain}
                  onChange={(e) => setTestRain(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Section: Fuzzification (Section 10) */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
              2. Fuzzifikasi (Derajat Keanggotaan μ)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Soil Memberships */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                <div className="flex justify-between font-bold pb-1 border-b border-slate-200">
                  <span className="text-slate-700">Kelembapan</span>
                  <span className="text-emerald-700">{getSoilLabel(testSoil)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>μ Kering:</span>
                  <span className="font-mono font-bold">{testDecision.memberships.soil.dry}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>μ Sedang (Ideal):</span>
                  <span className="font-mono font-bold text-emerald-700">{testDecision.memberships.soil.medium}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>μ Basah:</span>
                  <span className="font-mono font-bold">{testDecision.memberships.soil.wet}</span>
                </div>
              </div>

              {/* Temp Memberships */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                <div className="flex justify-between font-bold pb-1 border-b border-slate-200">
                  <span className="text-slate-700">Suhu</span>
                  <span className="text-amber-700">{getTempLabel(testTemp)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>μ Dingin:</span>
                  <span className="font-mono font-bold">{testDecision.memberships.temp.cold}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>μ Sedang / Normal:</span>
                  <span className="font-mono font-bold text-amber-700">{testDecision.memberships.temp.normal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>μ Panas:</span>
                  <span className="font-mono font-bold">{testDecision.memberships.temp.hot}</span>
                </div>
              </div>

              {/* Rain Memberships */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                <div className="flex justify-between font-bold pb-1 border-b border-slate-200">
                  <span className="text-slate-700">Hujan</span>
                  <span className="text-purple-700">{getRainLabel(testRain)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>μ Rendah:</span>
                  <span className="font-mono font-bold">{testDecision.memberships.rain.low}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>μ Sedang:</span>
                  <span className="font-mono font-bold">{testDecision.memberships.rain.medium}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>μ Tinggi:</span>
                  <span className="font-mono font-bold text-purple-700">{testDecision.memberships.rain.high}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Rule Evaluation (Section 10) */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>3. Rule Evaluation (Aturan Inferensi yang Aktif)</span>
            </h3>

            {/* Active Rule Visual Highlight */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/80 mb-3 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block mb-1">
                Aturan Dominan
              </span>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="font-bold text-slate-700">IF</span>
                <span className="px-2 py-1 rounded-md bg-white border border-emerald-200 text-emerald-900 font-bold">
                  kelembapan = {getSoilLabel(testSoil).toLowerCase()}
                </span>
                <span className="font-bold text-slate-700">AND</span>
                <span className="px-2 py-1 rounded-md bg-white border border-amber-200 text-amber-900 font-bold">
                  suhu = {getTempLabel(testTemp).toLowerCase()}
                </span>
                <span className="font-bold text-slate-700">AND</span>
                <span className="px-2 py-1 rounded-md bg-white border border-purple-200 text-purple-900 font-bold">
                  hujan = {getRainLabel(testRain).toLowerCase()}
                </span>
                <span className="font-bold text-emerald-700">THEN</span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-black">
                  water need = {testDecision.water_need < 35 ? 'rendah' : testDecision.water_need < 65 ? 'sedang' : 'tinggi'}
                </span>
              </div>
            </div>

            {/* List of active fired rules */}
            <div className="space-y-2">
              {testTraces.slice(0, 3).map((tr) => (
                <div
                  key={tr.ruleIndex}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 font-bold text-[10px]">
                      R#{tr.ruleIndex}
                    </span>
                    <span className="text-slate-700">IF {tr.condition}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-bold text-emerald-800">THEN {tr.outputTerm}</span>
                  </div>
                  <span className="font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px]">
                    α = {tr.weight.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Output & Final Decision (Section 10) */}
          <div className="p-6 rounded-[28px] bg-gradient-to-r from-emerald-700 via-green-700 to-teal-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-800/20">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-200">
                4. Output Defuzzifikasi (Centroid)
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono">
                Water Need: {testDecision.water_need}%
              </div>
              <p className="text-xs text-emerald-100 max-w-md">
                {testDecision.reasons.join(' • ')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-center shrink-0 min-w-48">
              <span className="text-[11px] font-bold text-emerald-200 block uppercase tracking-wider">
                Keputusan Akhir
              </span>
              <span className="text-xl font-black block mt-0.5">
                {testDecision.decision}
              </span>
              <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold ${
                testDecision.duration_minutes > 0 ? 'bg-cyan-400 text-slate-900' : 'bg-black/30 text-white'
              }`}>
                {testDecision.duration_minutes > 0 ? `Durasi: ${testDecision.duration_minutes} Menit` : 'Pompa OFF'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
            <Info className="w-3.5 h-3.5 text-emerald-600" />
            Parameter berbasis konfigurasi sistem &amp; kondisi nyata sensor IoT
          </p>
          <button
            onClick={() => setIsFuzzyModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
          >
            Tutup Modal
          </button>
        </div>
      </div>
    </div>
  );
};
