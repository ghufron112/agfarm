import React, { useState } from 'react';
import { 
  CloudSun, 
  CloudRain, 
  Sun, 
  Cloud, 
  Wind, 
  Droplets, 
  Eye, 
  Compass, 
  AlertCircle,
  Sparkles,
  MapPin
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const WeatherPage: React.FC = () => {
  const { weatherForecast, sensorData, user } = useFarm();
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);

  const selectedForecast = weatherForecast[selectedDayIdx] || weatherForecast[0];

  const getWeatherIcon = (cond: string) => {
    if (cond.includes('Hujan')) {
      return <CloudRain className="w-8 h-8 text-sky-500 animate-bounce" />;
    }
    if (cond.includes('Berawan')) {
      return <CloudSun className="w-8 h-8 text-amber-500" />;
    }
    return <Sun className="w-8 h-8 text-amber-500 animate-spin-slow" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 sm:p-7 rounded-[32px]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🌦️</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Weather &amp; Forecast Kebun Semangka
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-600" />
            Desa Batuampar, Kec. Guluk-Guluk, Kab. Sumenep, Jawa Timur (Stasiun Meteorologi Lokal &amp; API)
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
          <span>Stasiun Cuaca: Terhubung</span>
        </div>
      </div>

      {/* Main Hero Weather Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-600 text-white p-6 sm:p-8 shadow-xl shadow-sky-500/15">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Animated clouds in background */}
        <div className="absolute top-4 right-16 opacity-30 animate-cloud pointer-events-none">
          <Cloud className="w-24 h-24 text-white" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-100">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                {selectedForecast.day} • {selectedForecast.date}
              </span>
              <span>{user.location}</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="p-4 rounded-3xl bg-white/15 backdrop-blur-md border border-white/25">
                {getWeatherIcon(selectedForecast.condition)}
              </div>
              <div>
                <div className="text-5xl sm:text-6xl font-black tracking-tight">
                  {selectedForecast.temp_max}°C
                </div>
                <div className="text-base sm:text-lg font-bold text-sky-100 mt-1">
                  {selectedForecast.condition}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-sky-50/90 leading-relaxed max-w-lg">
              {selectedForecast.rain_probability >= 60 ? (
                <>
                  Peluang presipitasi tinggi ({selectedForecast.rain_probability}%). Algoritma Fuzzy Logic akan
                  otomatis <strong>menunda penyiraman</strong> untuk mencegah busuk akar tanaman semangka.
                </>
              ) : (
                <>
                  Kondisi cuaca stabil cerah berawan dengan kelembapan udara {selectedForecast.humidity}%.
                  Cocok untuk fotosintesis optimal fase vegetatif semangka.
                </>
              )}
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
              <div className="flex items-center gap-2 text-sky-100 text-xs mb-1">
                <CloudRain className="w-4 h-4 text-cyan-200" />
                <span>Peluang Hujan</span>
              </div>
              <div className="text-2xl font-black">{selectedForecast.rain_probability}%</div>
              <span className="text-[10px] text-sky-100">
                {selectedForecast.rain_probability > 50 ? 'Tinggi (Siaga)' : 'Rendah'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
              <div className="flex items-center gap-2 text-sky-100 text-xs mb-1">
                <Droplets className="w-4 h-4 text-cyan-200" />
                <span>Kelembapan Udara</span>
              </div>
              <div className="text-2xl font-black">{selectedForecast.humidity}%</div>
              <span className="text-[10px] text-sky-100">Relatif lembap</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
              <div className="flex items-center gap-2 text-sky-100 text-xs mb-1">
                <Wind className="w-4 h-4 text-cyan-200" />
                <span>Kecepatan Angin</span>
              </div>
              <div className="text-2xl font-black">{selectedForecast.wind_speed} km/h</div>
              <span className="text-[10px] text-sky-100">Arah Tenggara</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
              <div className="flex items-center gap-2 text-sky-100 text-xs mb-1">
                <Sun className="w-4 h-4 text-amber-200" />
                <span>Indeks UV</span>
              </div>
              <div className="text-2xl font-black">6.4 (Moderat)</div>
              <span className="text-[10px] text-sky-100">Radiasi optimal</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Horizontal Cards */}
      <div className="glass-card rounded-[32px] p-6 sm:p-7 space-y-4">
        <h2 className="text-sm sm:text-base font-bold text-slate-900">
          Prakiraan Cuaca 7 Hari Mendatang (Guluk-Guluk, Sumenep)
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weatherForecast.map((item, idx) => {
            const isSelected = selectedDayIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedDayIdx(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-center group ${
                  isSelected
                    ? 'bg-sky-50 border-sky-400 shadow-sm ring-2 ring-sky-400/20'
                    : 'bg-slate-50/70 border-slate-100 hover:bg-slate-100/80'
                }`}
              >
                <span className="text-xs font-bold text-slate-700 block mb-0.5">{item.day}</span>
                <span className="text-[10px] text-slate-400 block mb-2">{item.date}</span>
                <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform">
                  {getWeatherIcon(item.condition)}
                </div>
                <div className="text-sm font-extrabold text-slate-800">
                  {item.temp_max}° <span className="text-slate-400 font-normal text-xs">{item.temp_min}°</span>
                </div>
                <div className="mt-2 text-[10px] font-bold text-sky-600 flex items-center justify-center gap-1">
                  <CloudRain className="w-3 h-3" />
                  {item.rain_probability}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Agronomic Recommendation for Watermelon Farm */}
      <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-extrabold text-emerald-950">
            Rekomendasi Agronomi Semangka Berdasarkan Cuaca
          </h3>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Tanaman semangka fase vegetatif (35 HST) memerlukan drainase tanah yang baik dan tidak menyukai genangan air.
            Dengan adanya prediksi hujan 65% - 85% dalam 48 jam ke depan, <strong>irigasi otomatis ditunda secara cerdas</strong> guna menghemat air dan mencegah penyakit jamur busuk daun (*Downy mildew*).
          </p>
        </div>
      </div>
    </div>
  );
};
