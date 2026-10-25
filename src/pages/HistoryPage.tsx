import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  Clock, 
  Droplets,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const HistoryPage: React.FC = () => {
  const { irrigationLogs } = useFarm();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modeFilter, setModeFilter] = useState<'ALL' | 'Auto' | 'Manual'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Selesai' | 'Ditunda'>('ALL');

  // Filter logs
  const filteredLogs = irrigationLogs.filter((log) => {
    const matchesSearch = 
      log.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.decision.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.date.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMode = modeFilter === 'ALL' || log.mode === modeFilter;
    const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;

    return matchesSearch && matchesMode && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ['ID', 'Tanggal', 'Waktu', 'Mode', 'Durasi (detik)', 'Volume (L)', 'Keputusan', 'Alasan', 'Status'];
    const rows = filteredLogs.map((l) => [
      `"${l.id}"`,
      `"${l.date}"`,
      `"${l.time}"`,
      `"${l.mode}"`,
      `"${l.duration_seconds}"`,
      `"${l.water_volume_liters}"`,
      `"${l.decision}"`,
      `"${l.reason}"`,
      `"${l.status}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', 'riwayat_irigasi_semangka_agfarm.csv');
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
            <span className="text-2xl">📜</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Riwayat &amp; Log Irigasi Tetes
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Catatan telemetri lengkap seluruh aksi penyiraman otomatis Fuzzy Logic dan kontrol manual.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs shrink-0 active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Export Riwayat (.CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-[28px] p-5.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari alasan, tanggal, atau keputusan..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700 placeholder:text-slate-400"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Mode Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setModeFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                modeFilter === 'ALL' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Semua Mode
            </button>
            <button
              onClick={() => setModeFilter('Auto')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                modeFilter === 'Auto' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Auto
            </button>
            <button
              onClick={() => setModeFilter('Manual')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                modeFilter === 'Manual' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Manual
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                statusFilter === 'ALL' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Semua Status
            </button>
            <button
              onClick={() => setStatusFilter('Selesai')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                statusFilter === 'Selesai' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-500'
              }`}
            >
              Menyiram
            </button>
            <button
              onClick={() => setStatusFilter('Ditunda')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                statusFilter === 'Ditunda' ? 'bg-slate-700 text-white shadow-2xs' : 'text-slate-500'
              }`}
            >
              Ditunda
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="glass-card rounded-[32px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-4 px-5">Waktu &amp; Tanggal</th>
                <th className="py-4 px-4">Mode</th>
                <th className="py-4 px-4">Durasi</th>
                <th className="py-4 px-4">Volume Air</th>
                <th className="py-4 px-4">Keputusan</th>
                <th className="py-4 px-5">Alasan / Catatan Sensor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-5">
                    <span className="font-bold text-slate-800 block">{log.time}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{log.date}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      log.mode === 'Auto' ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {log.mode}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                    {log.duration_seconds > 0 ? `${log.duration_seconds} detik` : '0 menit'}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-700">
                    {log.water_volume_liters > 0 ? `${log.water_volume_liters} L` : '0 L'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      log.decision === 'Selesai'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {log.decision}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-600 max-w-md">
                    {log.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
