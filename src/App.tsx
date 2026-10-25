import React, { useState } from 'react';
import { FarmProvider, useFarm } from './context/FarmContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { MascotMelo } from './components/MascotMelo';
import { NotificationDrawer } from './components/NotificationDrawer';
import { FuzzyDetailModal } from './components/FuzzyDetailModal';
import { WatermelonBackground } from './components/WatermelonBackground';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { IrrigationPage } from './pages/IrrigationPage';
import { WeatherPage } from './pages/WeatherPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { isLoggedIn, currentPage } = useFarm();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // If unauthenticated, display split screen LoginPage
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  // Render current page component matching final 6 core navigation items
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'irigasi':
        return <IrrigationPage />;
      case 'cuaca':
        return <WeatherPage />;
      case 'analitik':
      case 'statistik':
      case 'perbandingan':
        return <AnalyticsPage />;
      case 'riwayat':
        return <HistoryPage />;
      case 'pengaturan':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen relative flex bg-[#FAFDFB] text-slate-800 selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Subtle Elegant Watermelon Background Layer */}
      <WatermelonBackground />

      {/* Sidebar Navigation */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative z-10">
        <Topbar
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onOpenNotifications={() => setIsNotificationOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Overlays & Modals */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      <FuzzyDetailModal />

      {/* Floating Animated Watermelon Companion */}
      <MascotMelo />
    </div>
  );
};

export function App() {
  return (
    <FarmProvider>
      <AppContent />
    </FarmProvider>
  );
}

export default App;
