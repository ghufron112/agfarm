import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  NavPage, 
  SensorData, 
  FuzzyDecision, 
  IrrigationLog, 
  NotificationItem, 
  WeatherForecastDay,
  ResearchComparisonItem 
} from '../types';
import { 
  initialSensorData, 
  initialWeatherForecast, 
  initialIrrigationLogs, 
  initialNotifications,
  researchComparisonData
} from '../data/mockData';
import { evaluateFuzzyIrrigation, FuzzyRuleTrace } from '../data/fuzzyLogic';

interface UserProfile {
  name: string;
  role: string;
  email: string;
  farmName: string;
  location: string;
  areaHa: number;
  plantVariety: string;
  plantAgeHst: number;
  growthStage: string;
  avatarUrl: string;
}

interface FarmContextType {
  // Navigation & Auth
  currentPage: NavPage;
  setCurrentPage: (page: NavPage) => void;
  isLoggedIn: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  user: UserProfile;
  updateUser: (data: Partial<UserProfile>) => void;

  // Real-time IoT & Demo Mode
  sensorData: SensorData;
  setSensorData: React.Dispatch<React.SetStateAction<SensorData>>;
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;

  // Fuzzy Decision
  fuzzyDecision: FuzzyDecision;
  fuzzyTraces: FuzzyRuleTrace[];
  isFuzzyModalOpen: boolean;
  setIsFuzzyModalOpen: (open: boolean) => void;

  // Irrigation Control
  irrigationMode: 'AUTO' | 'MANUAL';
  setIrrigationMode: (m: 'AUTO' | 'MANUAL') => void;
  manualDurationSeconds: number;
  setManualDurationSeconds: (sec: number) => void;
  isPumpActive: boolean;
  pumpRemainingSeconds: number;
  startWatering: (durationSeconds?: number) => void;
  stopWatering: () => void;

  // Data & History
  irrigationLogs: IrrigationLog[];
  addIrrigationLog: (log: IrrigationLog) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;
  weatherForecast: WeatherForecastDay[];
  researchData: ResearchComparisonItem[];

  // Mascot Melo Interaction
  mascotMood: 'idle' | 'happy' | 'worried' | 'rainy';
  mascotMessage: string;
  showMascotDialog: boolean;
  setShowMascotDialog: (show: boolean) => void;
  triggerMascotGreeting: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Real-time condition simulation for Melo AI & testing
  simulateSensorCondition: (condition: 'drought' | 'rain' | 'ideal' | 'hot_dry') => void;
}

const defaultUser: UserProfile = {
  name: 'Ali Ghufron',
  role: 'Pemilik Kebun',
  email: 'alighufron.agritech@gmail.com',
  farmName: 'Kebun Semangka Batuampar',
  location: 'Desa Batuampar, Kec. Guluk-Guluk, Kab. Sumenep, Madura',
  areaHa: 1.5,
  plantVariety: 'Semangka Inul Hibrida (Citrullus lanatus)',
  plantAgeHst: 35,
  growthStage: 'Vegetatif',
  avatarUrl: '/assets/user_avatar.jpg'
};

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<NavPage>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [sensorData, setSensorData] = useState<SensorData>(initialSensorData);
  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('agfarm_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // fallback if storage access restricted
    }
    return 'light';
  });

  // Synchronize dark class to html document and localStorage
  useEffect(() => {
    try {
      localStorage.setItem('agfarm_theme', theme);
    } catch {
      // ignore
    }
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  // Irrigation Controls
  const [irrigationMode, setIrrigationMode] = useState<'AUTO' | 'MANUAL'>('AUTO');
  const [manualDurationSeconds, setManualDurationSeconds] = useState<number>(60);
  const [isPumpActive, setIsPumpActive] = useState<boolean>(false);
  const [pumpRemainingSeconds, setPumpRemainingSeconds] = useState<number>(0);

  // Logs & Notifications
  const [irrigationLogs, setIrrigationLogs] = useState<IrrigationLog[]>(initialIrrigationLogs);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [isFuzzyModalOpen, setIsFuzzyModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mascot state
  const [showMascotDialog, setShowMascotDialog] = useState<boolean>(false);
  const [mascotMessage, setMascotMessage] = useState<string>(
    'Halo Mas Ali! Saya Melo 🍉, kebun semangka Anda hari ini dalam kondisi prima dan kelembapan tanah sangat terjaga!'
  );

  // Dynamic Fuzzy Computation
  const { decision: fuzzyDecision, traces: fuzzyTraces } = evaluateFuzzyIrrigation(
    sensorData.soil_moisture,
    sensorData.temperature,
    sensorData.weather_probability
  );

  // Mascot mood computed from current farm state
  const mascotMood: 'idle' | 'happy' | 'worried' | 'rainy' = isPumpActive
    ? 'happy'
    : sensorData.soil_moisture < 45
    ? 'worried'
    : sensorData.weather_probability >= 70
    ? 'rainy'
    : 'idle';

  // Demo Mode live sensor simulation
  useEffect(() => {
    if (!demoMode) return;

    const interval = setInterval(() => {
      setSensorData((prev) => {
        // Subtle drift in temperature and humidity
        const tempDelta = (Math.random() - 0.5) * 0.4;
        const newTemp = Math.min(36, Math.max(26, Number((prev.temperature + tempDelta).toFixed(1))));

        const humDelta = (Math.random() - 0.5) * 0.6;
        const newHum = Math.min(85, Math.max(55, Math.round(prev.humidity + humDelta)));

        // If pump is active, moisture increases gradually
        let newMoisture = prev.soil_moisture;
        if (isPumpActive) {
          newMoisture = Math.min(85, prev.soil_moisture + 1);
        } else {
          // Slowly natural evaporation
          if (Math.random() > 0.7) {
            newMoisture = Math.max(40, prev.soil_moisture - 0.2);
          }
        }

        return {
          ...prev,
          temperature: newTemp,
          humidity: newHum,
          soil_moisture: Number(newMoisture.toFixed(1)),
          last_updated: 'Beberapa detik yang lalu'
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [demoMode, isPumpActive]);

  // Pump countdown timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPumpActive && pumpRemainingSeconds > 0) {
      timer = setInterval(() => {
        setPumpRemainingSeconds((prev) => {
          if (prev <= 1) {
            // Pump finished
            setIsPumpActive(false);
            setSensorData((s) => ({
              ...s,
              pump_status: false,
              water_volume_today: Number((s.water_volume_today + 3.2).toFixed(1)),
              weekly_water_usage: Number((s.weekly_water_usage + 3.2).toFixed(1))
            }));

            // Add completed log
            const now = new Date();
            const newLog: IrrigationLog = {
              id: `LOG-${Date.now().toString().slice(-4)}`,
              date: `${now.getDate()} Okt 2026`,
              time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
              mode: irrigationMode === 'AUTO' ? 'Auto' : 'Manual',
              duration_seconds: manualDurationSeconds,
              water_volume_liters: 3.2,
              decision: 'Selesai',
              reason: 'Penyiraman selesai dan tanah mencapai kelembapan ideal',
              status: 'Selesai'
            };
            setIrrigationLogs((logs) => [newLog, ...logs]);

            // Add notification
            const newNotif: NotificationItem = {
              id: `notif-${Date.now()}`,
              title: 'Penyiraman Berhasil Selesai 💧',
              message: `Pompa selesai beroperasi selama ${manualDurationSeconds} detik. 3.2 L air dialirkan ke zona akar semangka.`,
              type: 'success',
              timestamp: 'Baru saja',
              read: false
            };
            setNotifications((n) => [newNotif, ...n]);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPumpActive, pumpRemainingSeconds, manualDurationSeconds, irrigationMode]);

  const startWatering = (durationSeconds?: number) => {
    const sec = durationSeconds || manualDurationSeconds;
    setIsPumpActive(true);
    setPumpRemainingSeconds(sec);
    setSensorData((s) => ({ ...s, pump_status: true }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Pompa Irigasi Tetes Aktif ⚡',
      message: `Pompa mulai menyiram tanaman semangka selama ${sec} detik.`,
      type: 'info',
      timestamp: 'Baru saja',
      read: false
    };
    setNotifications((n) => [notif, ...n]);
  };

  const stopWatering = () => {
    setIsPumpActive(false);
    setPumpRemainingSeconds(0);
    setSensorData((s) => ({ ...s, pump_status: false }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Penyiraman Dihentikan',
      message: 'Pompa irigasi tetes telah dimatikan secara manual.',
      type: 'warning',
      timestamp: 'Baru saja',
      read: false
    };
    setNotifications((n) => [notif, ...n]);
  };

  const login = (email: string, _pass: string) => {
    setIsLoggedIn(true);
    setUser((prev) => ({
      ...prev,
      email: email || prev.email
    }));
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const updateUser = (data: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const addIrrigationLog = (log: IrrigationLog) => {
    setIrrigationLogs((prev) => [log, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const triggerMascotGreeting = () => {
    setShowMascotDialog(true);
    if (isPumpActive) {
      setMascotMessage('Wah segarnya! Air sedang mengalir ke akar semangka melalui selang tetes! 🌱💧');
    } else if (sensorData.soil_moisture < 45) {
      setMascotMessage('Tanah agak kering nih Mas Ali (kelembapan di bawah 45%). Disarankan mulai menyiram sebentar!');
    } else if (sensorData.weather_probability >= 65) {
      setMascotMessage('Cuaca diprediksi hujan hari ini! Sistem Fuzzy Logic menunda penyiraman agar hemat air dan akar tidak busuk. 🌦️');
    } else {
      setMascotMessage('Kondisi semangka prima! Kelembapan 62% berada di zona ideal vegetatif (50-70%). Pertahankan ya!');
    }
  };

  const simulateSensorCondition = (condition: 'drought' | 'rain' | 'ideal' | 'hot_dry') => {
    if (condition === 'drought') {
      setSensorData((prev) => ({
        ...prev,
        soil_moisture: 33.5,
        temperature: 34.8,
        humidity: 52,
        weather_probability: 10,
        last_updated: 'Baru saja (Simulasi Kekeringan)'
      }));
      setNotifications((n) => [{
        id: `sim-${Date.now()}`,
        title: '⚠️ Uji Simulasi: Tanah Kering (33.5%)',
        message: 'Kondisi tanah kritis disimulasikan. Sistem Fuzzy Logic merekomendasikan Penyiraman Otomatis.',
        type: 'warning',
        timestamp: 'Baru saja',
        read: false
      }, ...n]);
    } else if (condition === 'rain') {
      setSensorData((prev) => ({
        ...prev,
        soil_moisture: 68.0,
        temperature: 26.5,
        humidity: 88,
        weather_probability: 85,
        last_updated: 'Baru saja (Simulasi Hujan Lebat)'
      }));
      setNotifications((n) => [{
        id: `sim-${Date.now()}`,
        title: '🌧️ Uji Simulasi: Hujan Lebat (85%)',
        message: 'Potensi hujan tinggi disimulasikan. Sistem Fuzzy Logic menunda penyiraman otomatis.',
        type: 'info',
        timestamp: 'Baru saja',
        read: false
      }, ...n]);
    } else if (condition === 'ideal') {
      setSensorData((prev) => ({
        ...prev,
        soil_moisture: 62.4,
        temperature: 29.5,
        humidity: 65,
        weather_probability: 25,
        last_updated: 'Baru saja (Simulasi Kondisi Ideal)'
      }));
      setNotifications((n) => [{
        id: `sim-${Date.now()}`,
        title: '🍉 Uji Simulasi: Kondisi Ideal (62.4%)',
        message: 'Sensor dikembalikan ke kondisi optimal fase vegetatif semangka 35 HST.',
        type: 'success',
        timestamp: 'Baru saja',
        read: false
      }, ...n]);
    } else if (condition === 'hot_dry') {
      setSensorData((prev) => ({
        ...prev,
        soil_moisture: 42.0,
        temperature: 35.5,
        humidity: 50,
        weather_probability: 15,
        last_updated: 'Baru saja (Simulasi Panas Terik)'
      }));
    }
  };

  return (
    <FarmContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isLoggedIn,
        login,
        logout,
        user,
        updateUser,
        sensorData,
        setSensorData,
        demoMode,
        setDemoMode,
        theme,
        setTheme,
        fuzzyDecision,
        fuzzyTraces,
        isFuzzyModalOpen,
        setIsFuzzyModalOpen,
        irrigationMode,
        setIrrigationMode,
        manualDurationSeconds,
        setManualDurationSeconds,
        isPumpActive,
        pumpRemainingSeconds,
        startWatering,
        stopWatering,
        irrigationLogs,
        addIrrigationLog,
        notifications,
        markNotificationAsRead,
        markAllNotificationsRead,
        unreadNotificationsCount,
        weatherForecast: initialWeatherForecast,
        researchData: researchComparisonData,
        mascotMood,
        mascotMessage,
        showMascotDialog,
        setShowMascotDialog,
        triggerMascotGreeting,
        searchQuery,
        setSearchQuery,
        simulateSensorCondition
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
