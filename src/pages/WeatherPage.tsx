import React from 'react';
import { 
  CloudSun, 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  MapPin, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const WeatherPage: React.FC = () => {
  const { weatherForecast, sensorData, user } = useFarm();

  // Exactly 3 days forecast: Hari ini, Besok, Lusa (Section 14)
  const threeDaysForecast = weatherForecast.slice(0, 3);

  const forecastData = [
    { label: 'Hari Ini', date: '27 Okt', temp: 31, rainProb: sensorData.weather_probability, condition: 'Cerah Berawan', icon: '⛅' },
    { label: 'Besok', date: '28 Okt', temp: 29, rainProb: 75, condition: 'Hujan Ringan', icon: '🌧️' },
    { label: 'Lusa', date: '29 Okt', temp: 32, rainProb: 20, condition: 'Cerah', icon: '☀️' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-[28px] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🌦️</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Prediksi Cuaca Kebun Semangka
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            {user.location} • Terhubung ke Stasiun BMKG &amp; Sensor IoT
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200">
          Sensor Cuaca: Online
        </span>
      </div>

      {/* Cuaca Hari Ini (Section 14) */}
      <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-700 text-white p-6 sm:p-8 shadow-xl shadow-sky-600/15">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-full bg-white/20 text-sky-100 text-xs font-bold">
              Cuaca Hari Ini (Senin, 27 Okt)
            </span>

            <div className="flex items-baseline gap-4">
              <span className="text-5xl sm:text-6xl font-black font-mono">
                {sensorData.temperature}°C
              </span>
              <div>
                <span className="text-xl font-extrabold block">Cerah Berawan</span>
                <span className="text-xs text-sky-100">Kelembapan Udara {sensorData.humidity}%</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-sky-50 leading-relaxed max-w-lg">
              {sensorData.weather_probability >= 60
                ? `Probabilitas hujan tinggi (${sensorData.weather_probability}%). Algoritma Fuzzy Logic otomatis menunda penyiraman untuk mencegah busuk akar semangka.`
                : `Probabilitas hujan rendah (${sensorData.weather_probability}%). Kondisi stabil untuk fotosintesis vegetatif.`}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center shrink-0 min-w-48">
            <span className="text-xs font-bold text-sky-100 uppercase tracking-wider block">
              Probabilitas Hujan
            </span>
            <span className="text-4xl font-black block my-1 font-mono">
              {sensorData.weather_probability}%
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white">
              {sensorData.weather_probability >= 60 ? 'Potensi Hujan Sore' : 'Cerah Stabil'}
            </span>
          </div>
        </div>
      </div>

      {/* Forecast 3 Hari: Hari Ini, Besok, Lusa (Section 14) */}
      <div className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">
            Prakiraan Cuaca 3 Hari (Hari Ini, Besok, Lusa)
          </h2>
          <p className="text-xs text-slate-400">
            Fokus informasi cuaca yang memengaruhi keputusan irigasi tanaman semangka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {forecastData.map((f, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-slate-900 text-sm">{f.label}</span>
                  <span className="text-xs text-slate-400 block">{f.date}</span>
                </div>
                <span className="text-2xl">{f.icon}</span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="text-2xl font-black text-slate-900 font-mono">{f.temp}°C</span>
                <span className="text-xs font-bold text-slate-600">{f.condition}</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 font-medium">
                <span className="text-slate-500">Peluang Hujan:</span>
                <span className="font-mono font-bold text-sky-700">{f.rainProb}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Grafik Kecil: Temperature & Rain Probability (Section 14) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Small Chart: Temperature */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span>Grafik Temperatur (°C)</span>
              <span>Rentang: 29°C - 32°C</span>
            </div>

            <div className="h-28 flex items-end justify-between gap-4 pt-4 px-3 border-b border-amber-200">
              {forecastData.map((f, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold text-amber-900">{f.temp}°C</span>
                  <div
                    className="w-full bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-md shadow-2xs"
                    style={{ height: `${((f.temp - 20) / 15) * 70}px` }}
                  />
                  <span className="text-[10px] font-semibold text-slate-500">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Small Chart: Rain Probability */}
          <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-200/80 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-sky-900">
              <span>Grafik Probabilitas Hujan (%)</span>
              <span>Faktor Penundaan Irigasi</span>
            </div>

            <div className="h-28 flex items-end justify-between gap-4 pt-4 px-3 border-b border-sky-200">
              {forecastData.map((f, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold text-sky-900">{f.rainProb}%</span>
                  <div
                    className="w-full bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-md shadow-2xs"
                    style={{ height: `${(f.rainProb / 100) * 70}px` }}
                  />
                  <span className="text-[10px] font-semibold text-slate-500">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
