import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Plus, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  ArrowRight,
  Stethoscope
} from 'lucide-react';
import { useMedScan } from '../../contexts/MedScanContext';

export const InteractionsScreen: React.FC = () => {
  const { 
    selectedInteractionDrugs, 
    toggleInteractionDrug, 
    activeInteractions, 
    setCurrentScreen,
    t 
  } = useMedScan();

  const [customInput, setCustomInput] = useState('');

  const quickPills = [
    "Aspirin 81mg",
    "Paracetamol 650mg",
    "Ibuprofen 400mg",
    "Pantoprazole 40mg",
    "Gelusil Antacid",
    "Ciprofloxacin 500mg",
    "Amoxicillin 500mg"
  ];

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim() && !selectedInteractionDrugs.includes(customInput.trim())) {
      toggleInteractionDrug(customInput.trim());
      setCustomInput('');
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Multi-Agent Pharmacodynamic Matrix</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.interactionsTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {t.interactionsSubtitle} Select multiple medications to evaluate competitive enzyme inhibition, gastrointestinal chelation, and synergistic toxicity risks.
            </p>
          </div>
        </div>
      </div>

      {/* Drug Selection Input Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Selected Medications Chips */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Selected Medications ({selectedInteractionDrugs.length}):
            </span>
            {selectedInteractionDrugs.length > 0 && (
              <span className="text-xs text-slate-400">
                Click a tag to remove
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 min-h-[44px] p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700">
            {selectedInteractionDrugs.length === 0 ? (
              <span className="text-xs text-slate-400 italic">
                No medications selected. Click quick tags below or type to add...
              </span>
            ) : (
              selectedInteractionDrugs.map((drug) => (
                <span
                  key={drug}
                  onClick={() => toggleInteractionDrug(drug)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-200 text-xs font-bold cursor-pointer hover:bg-rose-100 hover:text-rose-700 transition-colors group"
                >
                  <span>{drug}</span>
                  <X className="w-3.5 h-3.5 text-cyan-500 group-hover:text-rose-600" />
                </span>
              ))
            )}
          </div>
        </div>

        {/* Input & Quick Add */}
        <div className="space-y-3 pt-2">
          <form onSubmit={handleAddCustom} className="flex gap-2">
            <input 
              type="text"
              placeholder="Type medicine name (e.g. Metformin 500mg)..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shrink-0"
            >
              Add Medicine
            </button>
          </form>

          {/* Quick Add Chips (From Requirement 13!) */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 block mb-2">
              {t.quickAddLabel}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {quickPills.map((pill) => {
                const isSelected = selectedInteractionDrugs.includes(pill);
                return (
                  <button
                    key={pill}
                    onClick={() => toggleInteractionDrug(pill)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    + {pill}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Interaction Analysis Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-between">
          <span>Interaction Analysis Results</span>
          <span className="text-xs font-semibold text-slate-400">
            {activeInteractions.length} Conflicts Identified
          </span>
        </h3>

        {activeInteractions.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="font-extrabold text-slate-900 dark:text-white text-sm">
              No High-Severity Interactions Detected
            </div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              The currently selected drugs do not exhibit known dangerous metabolic or absorption conflicts. Always verify combination timing with your physician.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeInteractions.map((item) => (
              <div 
                key={item.id}
                className={`p-6 sm:p-7 rounded-3xl border shadow-sm space-y-4 ${
                  item.severity === 'HIGH' 
                    ? 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
                    : 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      item.severity === 'HIGH' 
                        ? 'bg-rose-500 text-white' 
                        : 'bg-amber-500 text-white'
                    }`}>
                      {item.severity === 'HIGH' ? t.severityHigh : t.severityModerate}
                    </span>
                    <h4 className="font-extrabold text-base">
                      {item.drug1} + {item.drug2}
                    </h4>
                  </div>
                </div>

                <div className="text-xs space-y-1.5 leading-relaxed">
                  <div><strong>Mechanism:</strong> {item.mechanism}</div>
                  <div><strong>Clinical Guidance:</strong> {item.clinicalAdvice}</div>
                </div>

                <div className="pt-3 border-t border-rose-200/80 dark:border-rose-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="font-semibold text-rose-800 dark:text-rose-200">
                    Recommended Protocol: {item.actionRequired}
                  </div>
                  <button
                    onClick={() => setCurrentScreen('doctors')}
                    className="self-start sm:self-auto px-4 py-1.5 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Consult Doctor</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

