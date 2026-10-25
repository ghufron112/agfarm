export type NavPage = 
  | 'dashboard' 
  | 'irigasi' 
  | 'cuaca' 
  | 'analitik' 
  | 'riwayat' 
  | 'pengaturan'
  // Legacy aliases for backward compatibility if referenced
  | 'statistik' 
  | 'perbandingan';

export type GrowthStage = 
  | 'Tanam' 
  | 'Vegetatif' 
  | 'Berbunga' 
  | 'Pembentukan Buah' 
  | 'Panen';

export interface SensorData {
  soil_moisture: number; // in %
  temperature: number; // in °C
  humidity: number; // in %
  water_level: number; // in %
  pump_status: boolean;
  water_volume_today: number; // in L
  weekly_water_usage: number; // in L
  weather_probability: number; // in %
  weather_condition: string;
  weather_temp: number;
  last_updated: string;
}

export interface FuzzyDecision {
  water_need: number; // 0 - 100%
  decision: 'Tidak Menyiram' | 'Penyiraman Ditunda' | 'Penyiraman Ringan' | 'Penyiraman Sedang' | 'Penyiraman Tinggi';
  duration_minutes: number;
  reasons: string[];
  memberships: {
    soil: { dry: number; medium: number; wet: number };
    temp: { cold: number; normal: number; hot: number };
    rain: { low: number; medium: number; high: number };
  };
}

export interface IrrigationLog {
  id: string;
  date: string;
  time: string;
  mode: 'Auto' | 'Manual';
  duration_seconds: number;
  water_volume_liters: number;
  decision: string;
  reason: string;
  status: 'Selesai' | 'Ditunda' | 'Berjalan';
}

export interface WeatherForecastDay {
  day: string;
  date: string;
  condition: string;
  icon: string;
  temp_min: number;
  temp_max: number;
  rain_probability: number;
  humidity: number;
  wind_speed: number;
}

export interface ResearchComparisonItem {
  parameter: string;
  threshold_method: string | number;
  fuzzy_method: string | number;
  fuzzy_weather_method: string | number;
  unit: string;
  efficiency_note: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'danger' | 'weather' | 'fuzzy';
  timestamp: string;
  read: boolean;
}
