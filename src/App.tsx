import React, { useState } from 'react';
import { FarmProvider, useFarm } from './context/FarmContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { MascotMelo } from './components/MascotMelo';
import { NotificationDrawer } from './components/NotificationDrawer';
import { FuzzyDetailModal } from './components/FuzzyDetailModal';
import { WatermelonBackground } from './components/WatermelonBackground';
import { BottomNav } from './components/BottomNav';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { IrrigationPage } from './pages/IrrigationPage';
import { WeatherPage } from './pages/WeatherPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { isLoggedIn, currentPage, theme } = useFarm();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Auto-collapse sidebar on tablet viewports (768px - 1023px)
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 768 && width < 1024) {
        setIsSidebarCollapsed(true);
      } else if (width >= 1024) {
        setIsSidebarCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // If unauthenticated, display split screen LoginPage
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  // Render current page component matching final core navigation items
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
    <div className={`min-h-screen relative flex selection:bg-emerald-500 selection:text-white transition-colors duration-200 overflow-x-hidden ${
      theme === 'dark' ? 'dark bg-[#0A1120] text-slate-100' : 'bg-[#F4F8F5] text-slate-800'
    }`}>
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
      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative z-10 overflow-x-hidden">
        <Topbar
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onOpenNotifications={() => setIsNotificationOpen(true)}
        />

        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 pb-24 md:pb-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Persistent on Phones) */}
      <BottomNav onOpenSidebar={() => setIsMobileMenuOpen(true)} />

      {/* Overlays & Modals */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      <FuzzyDetailModal />
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
