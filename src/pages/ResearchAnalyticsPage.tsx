import React from 'react';
import { 
  FlaskConical, 
  Award, 
  TrendingDown, 
  CheckCircle2, 
  Download, 
  FileSpreadsheet, 
  Sparkles,
  BarChart,
  Layers
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const ResearchAnalyticsPage: React.FC = () => {
  const { researchData } = useFarm();

  const handleExportCSV = () => {
    const headers = ['Parameter', 'Metode A (Threshold)', 'Metode B (Fuzzy)', 'Metode C (Fuzzy + Cuaca AG Farm)', 'Satuan', 'Catatan Efisiensi'];
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
    link.setAttribute('download', 'agfarm_evaluasi_skripsi_efisiensi.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 sm:p-7 rounded-[32px]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🔬</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Research Analytics — Perbandingan Efisiensi Irigasi
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Analisis komparatif 3 metode pengendalian irigasi tetes untuk keperluan validasi Tugas Akhir / Skripsi.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm shrink-0 active:scale-95"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export Data Riset (.CSV)</span>
        </button>
      </div>

      {/* 3 Methods Overview Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Method A */}
        <div className="glass-card rounded-[28px] p-6 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              METODE A (BASELINE)
            </span>
            <span className="text-xs font-bold text-slate-400">Konvensional</span>
          </div>
          <h3 className="text-base font-extrabold text-slate-900">Threshold Kelembapan</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Pompa menyala kaku on/off setiap kali sensor kelembapan tanah berada di bawah ambang batas statis (50%).
          </p>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Total Air:</span>
            <span className="font-bold text-slate-800">138.4 L / minggu</span>
          </div>
        </div>

        {/* Method B */}
        <div className="glass-card rounded-[28px] p-6 border-blue-200/80 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              METODE B
            </span>
            <span className="text-xs font-bold text-blue-600">Smart Basic</span>
          </div>
          <h3 className="text-base font-extrabold text-slate-900">Fuzzy Logic Mamdani</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Menyesuaikan durasi debit pompa berdasarkan 2 variabel: kelembapan tanah dan suhu lingkungan aktual.
          </p>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Total Air:</span>
            <span className="font-bold text-blue-700">108.6 L / minggu</span>
          </div>
        </div>

        {/* Method C (AG Farm) */}
        <div className="bg-gradient-to-br from-emerald-600 to-green-700 text-white rounded-[28px] p-6 shadow-xl shadow-emerald-700/25 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md">
              METODE C (AG FARM PROPOSAL)
            </span>
            <span className="text-xs font-extrabold text-emerald-200 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Terbaik
            </span>
          </div>
          <h3 className="text-base font-extrabold text-white">Fuzzy Logic + Prediksi Cuaca</h3>
          <p className="text-xs text-emerald-100 leading-relaxed">
            Kombinasi sensor kelembapan, suhu udara, serta probabilitas presipitasi hujan cuaca untuk penundaan irigasi cerdas.
          </p>
          <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs">
            <span className="text-emerald-200">Total Air:</span>
            <span className="font-black text-white text-sm">86.7 L / minggu</span>
          </div>
        </div>
      </div>

      {/* Main Comparison Table */}
      <div className="glass-card rounded-[32px] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900">
            Tabel Evaluasi Komparatif Kinerja Irigasi (Periode Pengujian 30 Hari)
          </h2>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Validasi Lapangan: Desa Batuampar, Sumenep
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-3">Parameter Uji</th>
                <th className="py-3.5 px-3">Metode A (Threshold)</th>
                <th className="py-3.5 px-3">Metode B (Fuzzy)</th>
                <th className="py-3.5 px-3 bg-emerald-50/80 text-emerald-900 font-extrabold">
                  Metode C (AG Farm)
                </th>
                <th className="py-3.5 px-3">Catatan Efisiensi &amp; Analisis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {researchData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-slate-800">
                    {row.parameter}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-slate-600">
                    {row.threshold_method} {row.unit !== 'Level' && row.unit !== 'Poin' && row.unit !== '%' ? row.unit : ''}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-blue-700 font-semibold">
                    {row.fuzzy_method} {row.unit !== 'Level' && row.unit !== 'Poin' && row.unit !== '%' ? row.unit : ''}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-emerald-800 font-extrabold bg-emerald-50/40">
                    {row.fuzzy_weather_method} {row.unit !== 'Level' && row.unit !== 'Poin' && row.unit !== '%' ? row.unit : ''}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
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

      {/* Water Efficiency Score Summary Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Kesimpulan Riset Skripsi
          </div>
          <h3 className="text-xl sm:text-2xl font-black">
            Integrasi Prediksi Cuaca pada Fuzzy Logic Meningkatkan Penghematan Air Hingga 37.4%
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Tanaman semangka sangat rentan terhadap overwatering. Dengan mempertimbangkan probabilitas hujan, AG Farm tidak hanya menghemat air dan listrik, tetapi juga menjaga stabilitas kelembapan tanah di batas optimal 60-70% tanpa risiko genangan.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center shrink-0 min-w-[200px]">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 block mb-1">
            Water Efficiency Score
          </span>
          <span className="text-5xl font-black text-white">95</span>
          <span className="text-sm font-bold text-slate-400"> / 100</span>
          <span className="block mt-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            Kategori: Sangat Unggul (Grade A+)
          </span>
        </div>
      </div>
    </div>
  );
};
