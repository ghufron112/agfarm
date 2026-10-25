import { IrrigationLog, NotificationItem, ResearchComparisonItem, SensorData, WeatherForecastDay } from '../types';

export const initialSensorData: SensorData = {
  soil_moisture: 62,
  temperature: 31,
  humidity: 68,
  water_level: 78,
  pump_status: false,
  water_volume_today: 12.5,
  weekly_water_usage: 86.7,
  weather_probability: 65,
  weather_condition: 'Cerah Berawan',
  weather_temp: 31,
  last_updated: '10 detik yang lalu'
};

export const initialWeatherForecast: WeatherForecastDay[] = [
  {
    day: 'Hari ini',
    date: '25 Okt',
    condition: 'Cerah Berawan',
    icon: 'partly-cloudy',
    temp_min: 26,
    temp_max: 31,
    rain_probability: 65,
    humidity: 68,
    wind_speed: 12
  },
  {
    day: 'Besok',
    date: '26 Okt',
    condition: 'Hujan Ringan',
    icon: 'rain',
    temp_min: 28,
    temp_max: 32,
    rain_probability: 78,
    humidity: 82,
    wind_speed: 16
  },
  {
    day: 'Rabu',
    date: '27 Okt',
    condition: 'Hujan',
    icon: 'rain',
    temp_min: 27,
    temp_max: 31,
    rain_probability: 85,
    humidity: 86,
    wind_speed: 18
  },
  {
    day: 'Kamis',
    date: '28 Okt',
    condition: 'Berawan',
    icon: 'cloudy',
    temp_min: 26,
    temp_max: 30,
    rain_probability: 40,
    humidity: 74,
    wind_speed: 14
  },
  {
    day: 'Jumat',
    date: '29 Okt',
    condition: 'Cerah Berawan',
    icon: 'partly-cloudy',
    temp_min: 25,
    temp_max: 32,
    rain_probability: 30,
    humidity: 65,
    wind_speed: 10
  },
  {
    day: 'Sabtu',
    date: '30 Okt',
    condition: 'Cerah',
    icon: 'sunny',
    temp_min: 25,
    temp_max: 33,
    rain_probability: 15,
    humidity: 58,
    wind_speed: 11
  },
  {
    day: 'Minggu',
    date: '31 Okt',
    condition: 'Cerah Berawan',
    icon: 'partly-cloudy',
    temp_min: 26,
    temp_max: 32,
    rain_probability: 25,
    humidity: 62,
    wind_speed: 13
  }
];

export const weeklyIrrigationPerformance = [
  { date: '21/10', day: 'Sen', volume: 17.0, duration: 42 },
  { date: '22/10', day: 'Sel', volume: 26.0, duration: 65 },
  { date: '23/10', day: 'Rab', volume: 14.0, duration: 35 },
  { date: '24/10', day: 'Kam', volume: 16.5, duration: 40 },
  { date: '25/10', day: 'Jum', volume: 24.2, duration: 58 },
  { date: '26/10', day: 'Sab', volume: 29.0, duration: 70 },
  { date: '27/10', day: 'Min', volume: 12.5, duration: 30 }
];

export const initialIrrigationLogs: IrrigationLog[] = [
  {
    id: 'LOG-001',
    date: '27 Okt 2026',
    time: '08:45',
    mode: 'Auto',
    duration_seconds: 0,
    water_volume_liters: 0,
    decision: 'Ditunda',
    reason: 'Tanah cukup lembap (62%) + peluang hujan tinggi (65%)',
    status: 'Ditunda'
  },
  {
    id: 'LOG-002',
    date: '27 Okt 2026',
    time: '06:12',
    mode: 'Auto',
    duration_seconds: 0,
    water_volume_liters: 0,
    decision: 'Ditunda',
    reason: 'Kelembapan tanah stabil (64%), hujan diprediksi siang hari',
    status: 'Ditunda'
  },
  {
    id: 'LOG-003',
    date: '26 Okt 2026',
    time: '18:00',
    mode: 'Manual',
    duration_seconds: 60,
    water_volume_liters: 4.2,
    decision: 'Selesai',
    reason: 'Manual override pemilik kebun untuk penyegaran pupuk kocor',
    status: 'Selesai'
  },
  {
    id: 'LOG-004',
    date: '26 Okt 2026',
    time: '07:15',
    mode: 'Auto',
    duration_seconds: 180,
    water_volume_liters: 6.8,
    decision: 'Selesai',
    reason: 'Penyiraman ringan pagi hari (kelembapan 48%, suhu 27°C)',
    status: 'Selesai'
  },
  {
    id: 'LOG-005',
    date: '25 Okt 2026',
    time: '16:30',
    mode: 'Auto',
    duration_seconds: 300,
    water_volume_liters: 11.5,
    decision: 'Selesai',
    reason: 'Suhu panas 34°C, kelembapan turun ke 42%, cuaca cerah',
    status: 'Selesai'
  },
  {
    id: 'LOG-006',
    date: '24 Okt 2026',
    time: '08:00',
    mode: 'Auto',
    duration_seconds: 240,
    water_volume_liters: 9.2,
    decision: 'Selesai',
    reason: 'Penyiraman rutin pagi hari fase vegetatif tanaman',
    status: 'Selesai'
  },
  {
    id: 'LOG-007',
    date: '23 Okt 2026',
    time: '14:20',
    mode: 'Auto',
    duration_seconds: 0,
    water_volume_liters: 0,
    decision: 'Ditunda',
    reason: 'Terjadi hujan alami di Desa Batuampar, Guluk-Guluk',
    status: 'Ditunda'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Penyiraman Selesai',
    message: 'Pompa telah menyiram selama 60 detik dengan volume 4.2 L air pada zona semangka vegetatif.',
    type: 'success',
    timestamp: '10 menit yang lalu',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Prediksi Hujan Mendatang',
    message: 'Hujan diprediksi akan turun dalam kurun waktu 2 jam ke depan (Probabilitas 65%).',
    type: 'weather',
    timestamp: '45 menit yang lalu',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Keputusan Fuzzy Logic',
    message: 'Sistem otomatis menunda penyiraman terjadwal karena tanah masih lembap (62%) dan ada prediksi hujan.',
    type: 'fuzzy',
    timestamp: '2 jam yang lalu',
    read: false
  },
  {
    id: 'notif-4',
    title: 'Sensor ESP32 Diperbarui',
    message: 'Telemetri kelembapan tanah, suhu DHT22, dan level air tangki berhasil disinkronisasi.',
    type: 'info',
    timestamp: '3 jam yang lalu',
    read: true
  },
  {
    id: 'notif-5',
    title: 'Status Tangki Air',
    message: 'Level tangki air saat ini 78% (780 Liter dari kapasitas 1000 Liter). Kapasitas aman.',
    type: 'info',
    timestamp: '5 jam yang lalu',
    read: true
  }
];

export const researchComparisonData: ResearchComparisonItem[] = [
  {
    parameter: 'Total Penggunaan Air (L/Minggu)',
    threshold_method: 138.4,
    fuzzy_method: 108.6,
    fuzzy_weather_method: 86.7,
    unit: 'Liter',
    efficiency_note: 'Hemat 37.4% dibanding threshold konvensional'
  },
  {
    parameter: 'Total Durasi Aktif Pompa (Menit)',
    threshold_method: 345,
    fuzzy_method: 268,
    fuzzy_weather_method: 206,
    unit: 'Menit',
    efficiency_note: 'Mengurangi beban kerja pompa & konsumsi listrik 40.3%'
  },
  {
    parameter: 'Frekuensi Penyiraman (Siklus/Minggu)',
    threshold_method: 21,
    fuzzy_method: 15,
    fuzzy_weather_method: 9,
    unit: 'Kali',
    efficiency_note: 'Mencegah siklus nyala-mati pompa terlalu sering'
  },
  {
    parameter: 'Stabilitas Kelembapan Tanah Rata-Rata',
    threshold_method: '57.8%',
    fuzzy_method: '62.4%',
    fuzzy_weather_method: '64.1%',
    unit: '%',
    efficiency_note: 'Menjaga zona perakaran semangka pada batas ideal (60-70%)'
  },
  {
    parameter: 'Pencegahan Waterlogging (Kelebihan Air)',
    threshold_method: 'Rendah (Sering)',
    fuzzy_method: 'Sedang',
    fuzzy_weather_method: 'Sangat Tinggi (Nol)',
    unit: 'Level',
    efficiency_note: 'Secara cerdas membatalkan penyiraman jika akan turun hujan'
  },
  {
    parameter: 'Skor Efisiensi Keseluruhan (Water Efficiency Score)',
    threshold_method: '61 / 100',
    fuzzy_method: '80 / 100',
    fuzzy_weather_method: '95 / 100',
    unit: 'Poin',
    efficiency_note: 'Kombinasi Fuzzy + Weather menghasilkan efisiensi tertinggi'
  }
];

export const watermelonGrowthData = [
  { hst: 5, stage: 'Tanam', heightCm: 4.5, leaves: 3, fruitCount: 0, fruitDiameterCm: 0 },
  { hst: 10, stage: 'Tanam', heightCm: 8.2, leaves: 6, fruitCount: 0, fruitDiameterCm: 0 },
  { hst: 15, stage: 'Vegetatif', heightCm: 16.0, leaves: 12, fruitCount: 0, fruitDiameterCm: 0 },
  { hst: 20, stage: 'Vegetatif', heightCm: 25.5, leaves: 21, fruitCount: 0, fruitDiameterCm: 0 },
  { hst: 25, stage: 'Vegetatif', heightCm: 38.0, leaves: 34, fruitCount: 0, fruitDiameterCm: 0 },
  { hst: 30, stage: 'Vegetatif', heightCm: 52.4, leaves: 48, fruitCount: 0, fruitDiameterCm: 0 },
  { hst: 35, stage: 'Vegetatif (Hari Ini)', heightCm: 68.0, leaves: 62, fruitCount: 0, fruitDiameterCm: 0 },
  { hst: 42, stage: 'Berbunga (Proyeksi)', heightCm: 85.0, leaves: 78, fruitCount: 1, fruitDiameterCm: 2.5 },
  { hst: 55, stage: 'Pembentukan Buah (Proyeksi)', heightCm: 110.0, leaves: 95, fruitCount: 2, fruitDiameterCm: 12.0 },
  { hst: 70, stage: 'Panen (Proyeksi)', heightCm: 125.0, leaves: 102, fruitCount: 2, fruitDiameterCm: 24.5 }
];
