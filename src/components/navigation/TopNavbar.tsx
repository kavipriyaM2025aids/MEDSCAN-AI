import React, { useState } from 'react';
import { 
  Scan, 
  FileText, 
  Clock, 
  Package, 
  ShieldAlert, 
  Store, 
  Stethoscope, 
  ChevronDown, 
  AlertTriangle, 
  Moon, 
  Sun, 
  Globe, 
  Sparkles,
  CheckCircle2,
  BellRing,
  LayoutDashboard
} from 'lucide-react';
import { useMedScan } from '../../contexts/MedScanContext';
import { ScreenRoute, Language } from '../../types/medscan';

export const TopNavbar: React.FC = () => {
  const { 
    currentScreen, 
    setCurrentScreen, 
    language, 
    setLanguage, 
    darkMode, 
    toggleDarkMode,
    t
  } = useMedScan();

  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navItems: { id: ScreenRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: t.navDashboard, icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'vision-scan', label: t.navVisionScan, icon: <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5"><div className="w-1.5 h-1.5 rounded-full bg-current"></div><div className="w-1.5 h-1.5 rounded-full bg-current"></div><div className="w-1.5 h-1.5 rounded-full bg-current"></div><div className="w-1.5 h-1.5 rounded-full bg-current"></div></div> },
    { id: 'lost-rx', label: t.navLostRx, icon: <Clock className="w-4 h-4" /> },
    { id: 'rx-scanner', label: t.navRxScanner, icon: <FileText className="w-4 h-4" /> },
    { id: 'inventory', label: t.navInventory, icon: <Package className="w-4 h-4" /> },
    { id: 'interactions', label: t.navInteractions, icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'pharmacies', label: t.navPharmacies, icon: <Store className="w-4 h-4" /> },
    { id: 'doctors', label: t.navDoctors, icon: <Stethoscope className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-2">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setCurrentScreen('dashboard')}
          className="flex items-center gap-3 cursor-pointer select-none shrink-0"
        >
          {/* Cyan rounded square with viewfinder corner marks */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center p-2 shadow-md shadow-cyan-500/20 text-white relative">
            <Scan className="w-5 h-5 stroke-[2.5]" />
            <div className="absolute inset-1 border border-white/40 rounded-lg pointer-events-none"></div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                MEDSCAN <span className="text-cyan-600 dark:text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-[9px] font-bold tracking-[0.16em] uppercase text-cyan-600 dark:text-cyan-400 -mt-0.5">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Main Desktop Navigation Items */}
        <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 shadow-xs border border-cyan-200/60 dark:border-cyan-800/60'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                <span className={isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* More Modules Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                currentScreen === 'safety-engine' || currentScreen === 'alarms' || currentScreen === 'assistant'
                  ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/60'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
              }`}
            >
              <span>{t.navMoreModules}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMoreOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setIsMoreOpen(false)}
              >
                <button
                  onClick={() => { setCurrentScreen('safety-engine'); setIsMoreOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center gap-3 hover:bg-cyan-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {t.navSafetyEngine}
                      <span className="text-[9px] bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 px-1.5 py-0.5 rounded-full uppercase">NEW</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal">Rx-to-Pill Safety Engine</span>
                  </div>
                </button>

                <button
                  onClick={() => { setCurrentScreen('alarms'); setIsMoreOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center gap-3 hover:bg-cyan-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <BellRing className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{t.navAlarms}</div>
                    <span className="text-[10px] text-slate-400 font-normal">Smart Audio Alarms</span>
                  </div>
                </button>

                <button
                  onClick={() => { setCurrentScreen('assistant'); setIsMoreOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center gap-3 hover:bg-cyan-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{t.navAssistant}</div>
                    <span className="text-[10px] text-slate-400 font-normal">AI Clinical Pharmacist</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right Side Actions: Emergency, Theme, Language, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Emergency Pill Button (Exact Coral/Red style from screenshot!) */}
          <button
            onClick={() => setCurrentScreen('emergency')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-sm transition-all transform active:scale-95 ${
              currentScreen === 'emergency' 
                ? 'bg-rose-700 ring-2 ring-rose-300' 
                : 'bg-rose-500 hover:bg-rose-600'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 fill-white/20 animate-pulse" />
            <span>{t.navEmergency}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Multilingual Selector (EN / TA / HI) */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="uppercase">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangOpen && (
              <div 
                className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 py-1.5 z-50 text-xs"
                onMouseLeave={() => setIsLangOpen(false)}
              >
                <button
                  onClick={() => { setLanguage('en'); setIsLangOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-cyan-50 dark:hover:bg-slate-800 ${
                    language === 'en' ? 'font-bold text-cyan-600' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>English</span>
                  {language === 'en' && <span className="text-[10px] text-cyan-600">✓</span>}
                </button>
                <button
                  onClick={() => { setLanguage('ta'); setIsLangOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-cyan-50 dark:hover:bg-slate-800 ${
                    language === 'ta' ? 'font-bold text-cyan-600' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>தமிழ் (Tamil)</span>
                  {language === 'ta' && <span className="text-[10px] text-cyan-600">✓</span>}
                </button>
                <button
                  onClick={() => { setLanguage('hi'); setIsLangOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-cyan-50 dark:hover:bg-slate-800 ${
                    language === 'hi' ? 'font-bold text-cyan-600' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>हिंदी (Hindi)</span>
                  {language === 'hi' && <span className="text-[10px] text-cyan-600">✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* User Profile Badge (Exact 'G Guest' style from screenshots 1-4) */}
          <div className="flex items-center gap-1.5 pl-1">
            <div className="w-7 h-7 rounded-full bg-cyan-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              G
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-slate-700 dark:text-slate-200">
              Guest
            </span>
          </div>

        </div>

      </div>

      {/* Mobile Navigation Scrollbar */}
      <div className="xl:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => setCurrentScreen('safety-engine')}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
            currentScreen === 'safety-engine' ? 'bg-cyan-600 text-white' : 'text-cyan-700 bg-cyan-50 dark:bg-slate-800 dark:text-cyan-400'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{t.navSafetyEngine}</span>
        </button>
      </div>
    </header>
  );
};

