import React, { useState } from 'react';
import { 
  BarChart3, 
  Droplets, 
  TrendingDown, 
  Clock, 
  FlaskConical, 
  Award, 
  FileSpreadsheet, 
  CheckCircle2, 
  Calendar,
  Layers,
  Activity,
  Info
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { generateResearchPDF } from '../utils/pdfExport';

export const AnalyticsPage: React.FC = () => {
  const { sensorData, researchData, demoMode, user } = useFarm();
  const [activeTab, setActiveTab] = useState<'irigasi' | 'riset'>('irigasi');
  const [filterPeriod, setFilterPeriod] = useState<'7' | '30'>('7');

  const historyPoints = [
    { day: 'Sen', date: '21 Okt', moisture: 58, usage: 14.2, duration: 28, count: 2 },
    { day: 'Sel', date: '22 Okt', moisture: 64, usage: 16.5, duration: 35, count: 2 },
    { day: 'Rab', date: '23 Okt', moisture: 60, usage: 8.4, duration: 18, count: 1 },
    { day: 'Kam', date: '24 Okt', moisture: 62, usage: 12.0, duration: 25, count: 2 },
    { day: 'Jum', date: '25 Okt', moisture: 59, usage: 15.2, duration: 32, count: 2 },
    { day: 'Sab', date: '26 Okt', moisture: 65, usage: 11.0, duration: 22, count: 1 },
    { day: 'Min', date: '27 Okt', moisture: 62, usage: 9.4, duration: 20, count: 2 },
  ];

  const handleExportCSV = () => {
    const headers = ['Parameter', 'Threshold (A)', 'Fuzzy Logic (B)', 'Fuzzy + Weather (C)', 'Satuan', 'Catatan'];
    const rows = researchData.map(d => [
      `"${d.parameter}"`,
      `"${d.threshold_method}"`,
      `"${d.fuzzy_method}"`,
      `"${d.fuzzy_weather_method}"`,
      `"${d.unit}"`,
      `"${d.efficiency_note}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'agfarm_penelitian_komparasi_metode.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="glass-card rounded-[28px] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">📊</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {activeTab === 'irigasi' ? 'Analitik Irigasi Semangka' : 'Perbandingan Metode Penelitian (Skripsi)'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {activeTab === 'irigasi'
              ? 'Evaluasi kuantitatif kelembapan tanah, konsumsi air, dan frekuensi penyiraman.'
              : 'Data komparatif metode Threshold vs Fuzzy Logic vs Fuzzy + Weather untuk analisis skripsi.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl shrink-0 border border-slate-200/80">
          <button
            onClick={() => setActiveTab('irigasi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'irigasi'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-emerald-600" />
            <span>Analitik Irigasi</span>
          </button>
          <button
            onClick={() => setActiveTab('riset')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'riset'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Perbandingan Metode</span>
          </button>
        </div>
      </div>

      {activeTab === 'irigasi' ? (
        /* TAB 1: ANALITIK IRIGASI */
        <div className="space-y-6">
          {/* Top 3 Summary Cards (User prompt Section 15) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Total Air */}
            <div className="glass-card rounded-[24px] p-6 relative overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Total Penggunaan Air
              </span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">86.7 L</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
                  <TrendingDown className="w-3 h-3" /> 22%
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Akumulasi air irigasi tetes 7 hari terakhir. Lebih hemat berkat penundaan saat potensi hujan.
              </p>
            </div>

            {/* Total Penyiraman */}
            <div className="glass-card rounded-[24px] p-6 relative overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Total Penyiraman
              </span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">12 kali</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  Rata-rata 1.7x/hari
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Penyiraman terjadwal dan adaptif otomatis sesuai kondisi kelembapan zona perakaran.
              </p>
            </div>

            {/* Rata-rata Durasi */}
            <div className="glass-card rounded-[24px] p-6 relative overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Rata-rata Durasi
              </span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">4.5 menit</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  Presisi
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Durasi pompa optimal mencegah limpasan berlebih (runoff) dan genangan di bedengan semangka.
              </p>
            </div>
          </div>

          {/* Charts Row: Penggunaan Air & Kelembapan Tanah */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Penggunaan Air */}
            <div className="glass-card rounded-[28px] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-sky-600" />
                    <span>Konsumsi Air Harian (Liter)</span>
                  </h3>
                  <p className="text-xs text-slate-400">Tren penggunaan air 7 hari terakhir</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-100">
                  Total: 86.7 L
                </span>
              </div>

              <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-100">
                {historyPoints.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                    <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.usage}L
                    </span>
                    <div
                      className="w-full bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-lg transition-all duration-300 group-hover:from-sky-700 group-hover:to-sky-500 shadow-xs"
                      style={{ height: `${(item.usage / 20) * 130}px` }}
                      title={`${item.day}: ${item.usage} Liter`}
                    />
                    <span className="text-[11px] font-semibold text-slate-500">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Rata-rata: <strong>12.4 L / hari</strong></span>
                <span className="text-emerald-700 font-semibold">✓ Di bawah batas boros (20 L/hari)</span>
              </div>
            </div>

            {/* Chart 2: Kelembapan Tanah & Frekuensi */}
            <div className="glass-card rounded-[28px] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span>Kelembapan Tanah (%) &amp; Frekuensi</span>
                  </h3>
                  <p className="text-xs text-slate-400">Target rentang ideal semangka: 50% - 70%</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                  Rata-rata: 61.4%
                </span>
              </div>

              <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-100">
                {historyPoints.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                    <span className="text-[10px] font-bold text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.moisture}%
                    </span>
                    <div
                      className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-lg transition-all duration-300 group-hover:from-emerald-700 group-hover:to-teal-500 shadow-xs"
                      style={{ height: `${(item.moisture / 80) * 130}px` }}
                      title={`${item.day}: Kelembapan ${item.moisture}% (${item.count}x siram)`}
                    />
                    <span className="text-[11px] font-semibold text-slate-500">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Zona Aman Kelembapan: <strong>40% - 70%</strong></span>
                <span className="text-emerald-700 font-semibold">100% Waktu di Zona Ideal</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2: RESEARCH ANALYTICS (PERBANDINGAN METODE SKRIPSI) */
        <div className="space-y-6">
          {/* Research Banner with Demo Badge Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold text-[10px]">
                {demoMode ? 'DEMO DATA PENELITIAN' : 'DATA PENELITIAN AKTUAL'}
              </span>
              <span>
                Data uji komparatif 3 metode irigasi pada varietas Semangka Inul Hibrida di Desa Batuampar, Sumenep.
              </span>
            </div>
            <button
              onClick={() => generateResearchPDF(researchData, user)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs transition-all flex items-center gap-2 shadow-md shadow-emerald-700/20 active:scale-95 group"
              title="Klik untuk membuka pratinjau dan menyimpan laporan evaluasi skripsi dalam format PDF berwarna"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-200 group-hover:scale-110 transition-transform" />
              <span>Export Laporan Riset (PDF)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-950/30 text-emerald-100 font-bold">
                Warna
              </span>
            </button>
          </div>

          {/* 3 Methods Overview Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Method A */}
            <div className="glass-card rounded-[24px] p-5.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  METODE A (BASELINE)
                </span>
                <span className="text-[11px] font-bold text-slate-400">Konvensional</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Threshold Statis</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pompa hidup mati hanya berdasarkan ambang batas tunggal kelembapan tanah (50%). Tanpa memperhitungkan suhu atau potensi hujan.
              </p>
              <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Air:</span>
                  <span className="font-bold text-slate-800">138.4 L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Durasi Pompa:</span>
                  <span className="font-bold text-slate-800">550 Menit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Frekuensi:</span>
                  <span className="font-bold text-slate-800">28 Kali</span>
                </div>
              </div>
            </div>

            {/* Method B */}
            <div className="glass-card rounded-[24px] p-5.5 space-y-2.5 border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  METODE B
                </span>
                <span className="text-[11px] font-bold text-blue-600">Smart Logic</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Fuzzy Logic Mamdani</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Inferensi Fuzzy dengan input kelembapan tanah dan suhu udara untuk menghitung kebutuhan air variabel secara dinamis.
              </p>
              <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Air:</span>
                  <span className="font-bold text-blue-700">108.6 L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Durasi Pompa:</span>
                  <span className="font-bold text-blue-700">420 Menit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Frekuensi:</span>
                  <span className="font-bold text-blue-700">19 Kali</span>
                </div>
              </div>
            </div>

            {/* Method C (AG Farm) */}
            <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 text-white rounded-[24px] p-5.5 shadow-lg shadow-emerald-700/20 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/20 text-white">
                  METODE C (AG FARM)
                </span>
                <span className="text-[11px] font-extrabold text-emerald-200 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Paling Efisien
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white">Fuzzy + Prediksi Cuaca</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Mengintegrasikan sensor kelembapan tanah, suhu udara, dan prediksi probabilitas hujan cuaca untuk penundaan cerdas.
              </p>
              <div className="pt-2 border-t border-white/20 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-emerald-200">Total Air:</span>
                  <span className="font-black text-white">86.7 L (Hemat 37.3%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-200">Durasi Pompa:</span>
                  <span className="font-bold text-white">340 Menit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-200">Frekuensi:</span>
                  <span className="font-bold text-white">12 Kali</span>
                </div>
              </div>
            </div>
          </div>

          {/* Research Comparison Table (User prompt Section 16) */}
          <div className="glass-card rounded-[28px] p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                Tabel Evaluasi Komparatif Kinerja Irigasi (Pengujian 30 Hari)
              </h2>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Varietas: Semangka Inul (Citrullus lanatus)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Parameter Uji</th>
                    <th className="py-3 px-3 font-semibold text-slate-700">Threshold (A)</th>
                    <th className="py-3 px-3 font-semibold text-blue-700">Fuzzy Logic (B)</th>
                    <th className="py-3 px-3 bg-emerald-50/80 text-emerald-900 font-extrabold">
                      Fuzzy + Weather (C)
                    </th>
                    <th className="py-3 px-3">Catatan Efisiensi &amp; Analisis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {researchData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-800">
                        {row.parameter}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600">
                        {row.threshold_method} {row.unit !== 'Level' && row.unit !== 'Poin' && row.unit !== '%' ? row.unit : ''}
                      </td>
                      <td className="py-3 px-3 font-mono text-blue-700 font-semibold">
                        {row.fuzzy_method} {row.unit !== 'Level' && row.unit !== 'Poin' && row.unit !== '%' ? row.unit : ''}
                      </td>
                      <td className="py-3 px-3 font-mono text-emerald-800 font-extrabold bg-emerald-50/40">
                        {row.fuzzy_weather_method} {row.unit !== 'Level' && row.unit !== 'Poin' && row.unit !== '%' ? row.unit : ''}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          {row.efficiency_note}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
