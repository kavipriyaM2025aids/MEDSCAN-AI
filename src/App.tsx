import React from 'react';
import { MedScanProvider, useMedScan } from './contexts/MedScanContext';
import { TopNavbar } from './components/navigation/TopNavbar';
import { RolePortalBar } from './components/navigation/RolePortalBar';
import { AudioAlarmWidget } from './components/common/AudioAlarmWidget';
import { AIAssistantChat } from './components/common/AIAssistantChat';
import { ClinicalFooter } from './components/footer/ClinicalFooter';

// Screens
import { DashboardScreen } from './components/screens/DashboardScreen';
import { VisionScanScreen } from './components/screens/VisionScanScreen';
import { SafetyEngineScreen } from './components/screens/SafetyEngineScreen';
import { LostRxRecoveryScreen } from './components/screens/LostRxRecoveryScreen';
import { RxScannerScreen } from './components/screens/RxScannerScreen';
import { SmartInventoryScreen } from './components/screens/SmartInventoryScreen';
import { InteractionsScreen } from './components/screens/InteractionsScreen';
import { PharmaciesScreen } from './components/screens/PharmaciesScreen';
import { DoctorsScreen } from './components/screens/DoctorsScreen';
import { EmergencyScreen } from './components/screens/EmergencyScreen';
import { RolePortalsScreen } from './components/screens/RolePortalsScreen';

const MainContent: React.FC = () => {
  const { currentScreen, rolePortal } = useMedScan();

  const renderScreen = () => {
    // If not in standard patient view and looking at role specific consoles
    if (rolePortal !== 'patient' && currentScreen === 'dashboard') {
      return <RolePortalsScreen />;
    }

    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'vision-scan':
        return <VisionScanScreen />;
      case 'safety-engine':
        return <SafetyEngineScreen />;
      case 'lost-rx':
        return <LostRxRecoveryScreen />;
      case 'rx-scanner':
        return <RxScannerScreen />;
      case 'inventory':
        return <SmartInventoryScreen />;
      case 'interactions':
        return <InteractionsScreen />;
      case 'pharmacies':
        return <PharmaciesScreen />;
      case 'doctors':
        return <DoctorsScreen />;
      case 'emergency':
        return <EmergencyScreen />;
      case 'alarms':
        return <DashboardScreen />;
      case 'assistant':
        return <DashboardScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Top Main Navigation Bar */}
      <TopNavbar />

      {/* Role Portal Bar (Patient Hub, Doctor Portal, Pharmacy Desk, Admin Console) */}
      <RolePortalBar />

      {/* Main Page Body Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {renderScreen()}
      </main>

      {/* Floating Bottom-Right Smart Audio Alarm Widget (🔔 ⚠️ Alarm Beep Alert: CITIZEN) */}
      <AudioAlarmWidget />

      {/* Floating AI Clinical Pharmacist Assistant Widget */}
      <AIAssistantChat />

      {/* Dark Navy Clinical Footer */}
      <ClinicalFooter />
    </div>
  );
};

export default function App() {
  return (
    <MedScanProvider>
      <MainContent />
    </MedScanProvider>
  );
}