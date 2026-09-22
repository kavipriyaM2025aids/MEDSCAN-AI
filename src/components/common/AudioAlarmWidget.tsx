import React from 'react';
import { Bell, AlertTriangle, Volume2, X, Clock, CheckCircle, Play, ShieldAlert } from 'lucide-react';
import { useMedScan } from '../../contexts/MedScanContext';

export const AudioAlarmWidget: React.FC = () => {
  const { 
    showAlarmModal, 
    setShowAlarmModal, 
    reminders, 
    toggleReminder, 
    triggerAlarmBeep, 
    speakReminder,
    language,
    t 
  } = useMedScan();

  return (
    <>
      {/* Floating Bottom Right Pill (Exact design from screenshots 1, 2, 3, 4!) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => {
            setShowAlarmModal(true);
            triggerAlarmBeep();
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs tracking-wide shadow-lg shadow-cyan-600/30 transition-all transform hover:scale-105 active:scale-95 group"
        >
          <Bell className="w-4 h-4 animate-bounce" />
          <AlertTriangle className="w-4 h-4 text-amber-300" />
          <span>{t.alarmNotificationPill}</span>
        </button>
      </div>

      {/* Alarm Configuration & Audio Test Modal */}
      {showAlarmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowAlarmModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shadow-xs">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  {t.alarmModalTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.alarmModalSubtitle}
                </p>
              </div>
            </div>

            {/* Audio Test Bar */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-slate-800/80 dark:to-cyan-950/40 border border-cyan-100 dark:border-cyan-800/40 mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Volume2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    Dual Frequency Synthesizer (880Hz - 1046Hz)
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Web Speech Language: <strong className="uppercase">{language}</strong>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={triggerAlarmBeep}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Beep Chime</span>
                </button>
                <button
                  onClick={() => speakReminder()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Speak Alert</span>
                </button>
              </div>
            </div>

            {/* Scheduled Dosage Alarms List */}
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Today's Active Medication Schedule</span>
            </h4>

            <div className="space-y-3 mb-6">
              {reminders.map((rem) => (
                <div 
                  key={rem.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    rem.active 
                      ? 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 shadow-xs' 
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleReminder(rem.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        rem.active ? 'bg-emerald-500 text-white' : 'border border-slate-300 text-transparent'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        {rem.medicineName}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-cyan-600 dark:text-cyan-400">{rem.time}</span>
                        <span>•</span>
                        <span>{rem.dose}</span>
                        <span>•</span>
                        <span className="capitalize">{rem.mealRelation.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => speakReminder(rem.spokenAudioText)}
                    title="Listen to spoken audio reminder"
                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-cyan-100 dark:hover:bg-cyan-900 text-slate-600 dark:text-slate-300 hover:text-cyan-700 flex items-center justify-center transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Clinical Safety Notice */}
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 flex items-start gap-2.5 text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <div>
                <strong>Safety Clarification:</strong> Smart Audio Reminders inform users of their physician's pre-scheduled dosing windows. The system does not alter prescribed medical regimens.
              </div>
            </div>

            {/* Bottom Dismiss */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowAlarmModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
              >
                Close Alarms
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

