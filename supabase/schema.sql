-- ========================================================
-- AG Farm — Smart Watermelon Irrigation & Farming System
-- Supabase PostgreSQL Schema with Row Level Security (RLS)
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. FARMS TABLE
CREATE TABLE IF NOT EXISTS public.farms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    farm_name TEXT NOT NULL,
    location TEXT NOT NULL,
    area_hectares NUMERIC(5,2) DEFAULT 1.5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PLANTS TABLE (Watermelon Crop Management)
CREATE TABLE IF NOT EXISTS public.plants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE,
    plant_type TEXT NOT NULL DEFAULT 'Semangka Inul Hibrida (Citrullus lanatus)',
    planting_date DATE NOT NULL,
    growth_stage TEXT NOT NULL DEFAULT 'Vegetatif',
    target_moisture_min INTEGER DEFAULT 50,
    target_moisture_max INTEGER DEFAULT 70,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. SENSOR READINGS (ESP32 Telemetry)
CREATE TABLE IF NOT EXISTS public.sensor_readings (
    id BIGSERIAL PRIMARY KEY,
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE,
    soil_moisture NUMERIC(5,2) NOT NULL, -- in %
    temperature NUMERIC(5,2) NOT NULL,   -- in °C
    humidity NUMERIC(5,2) NOT NULL,      -- in %
    water_level NUMERIC(5,2) NOT NULL,   -- in %
    pump_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. WEATHER DATA (Weather Forecast & API Sync)
CREATE TABLE IF NOT EXISTS public.weather_data (
    id BIGSERIAL PRIMARY KEY,
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE,
    temperature NUMERIC(5,2) NOT NULL,
    humidity NUMERIC(5,2) NOT NULL,
    rainfall_probability INTEGER NOT NULL, -- 0-100%
    weather_condition TEXT NOT NULL,
    forecast_time TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. IRRIGATION LOGS (Execution History)
CREATE TABLE IF NOT EXISTS public.irrigation_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE,
    mode TEXT NOT NULL CHECK (mode IN ('Auto', 'Manual')),
    duration_seconds INTEGER NOT NULL,
    water_volume_liters NUMERIC(6,2) NOT NULL,
    decision TEXT NOT NULL,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Selesai',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. FUZZY RESULTS (Mamdani Evaluation Traces)
CREATE TABLE IF NOT EXISTS public.fuzzy_results (
    id BIGSERIAL PRIMARY KEY,
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE,
    soil_moisture NUMERIC(5,2) NOT NULL,
    temperature NUMERIC(5,2) NOT NULL,
    rain_probability INTEGER NOT NULL,
    water_need INTEGER NOT NULL, -- Defuzzified output %
    decision TEXT NOT NULL,
    recommended_duration_minutes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. SYSTEM SETTINGS
CREATE TABLE IF NOT EXISTS public.system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE UNIQUE,
    auto_mode BOOLEAN DEFAULT TRUE,
    min_moisture_threshold INTEGER DEFAULT 45,
    max_pump_duration_minutes INTEGER DEFAULT 10,
    notification_enabled BOOLEAN DEFAULT TRUE,
    flow_rate_lpm NUMERIC(4,2) DEFAULT 2.5,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sensor_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.irrigation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fuzzy_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage their own farm data
CREATE POLICY "Users can view their own profile" ON public.users FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can manage their own farms" ON public.farms FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access plants in their farms" ON public.plants FOR ALL USING (farm_id IN (SELECT id FROM public.farms WHERE user_id = auth.uid()));
CREATE POLICY "Users can read sensor data from their farms" ON public.sensor_readings FOR ALL USING (farm_id IN (SELECT id FROM public.farms WHERE user_id = auth.uid()));
CREATE POLICY "Users can read weather data" ON public.weather_data FOR ALL USING (farm_id IN (SELECT id FROM public.farms WHERE user_id = auth.uid()));
CREATE POLICY "Users can access irrigation logs" ON public.irrigation_logs FOR ALL USING (farm_id IN (SELECT id FROM public.farms WHERE user_id = auth.uid()));
CREATE POLICY "Users can access fuzzy logs" ON public.fuzzy_results FOR ALL USING (farm_id IN (SELECT id FROM public.farms WHERE user_id = auth.uid()));
CREATE POLICY "Users can manage system settings" ON public.system_settings FOR ALL USING (farm_id IN (SELECT id FROM public.farms WHERE user_id = auth.uid()));
