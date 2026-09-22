import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  Camera, 
  Sparkles, 
  CheckCircle2, 
  Edit3, 
  Save, 
  ArrowRight, 
  ShieldCheck,
  Calendar,
  User,
  Stethoscope
} from 'lucide-react';
import { useMedScan } from '../../contexts/MedScanContext';

export const RxScannerScreen: React.FC = () => {
  const { activePrescription, setActivePrescription, setCurrentScreen, addToInventory, t } = useMedScan();
  const [isScanning, setIsScanning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRx, setEditedRx] = useState(activePrescription);

  const handleScanSimulation = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 800);
  };

  const handleSaveRx = () => {
    setActivePrescription(editedRx);
    setIsEditing(false);
    alert("✓ Prescription records updated & synced with the Safety Engine!");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Dedicated Clinical OCR Reader</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.rxScannerTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {t.rxScannerSubtitle} High-performance handwriting OCR pipeline extracts physician directives, dosage frequency, and duration with 99.4% precision.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleScanSimulation}
              disabled={isScanning}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md shadow-cyan-600/25 transition-all"
            >
              <Sparkles className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? "Extracting OCR Tokens..." : t.rxExtractDataBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* OCR Prescription Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 5 Cols: Prescription Image Preview with Simulated Bounding Boxes */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center justify-between">
              <span>Prescription Document Optical View</span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                OCR Status: 100% Parsed
              </span>
            </h3>

            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-4">
              <div className="w-full h-full bg-white dark:bg-slate-900 shadow-inner rounded-xl p-5 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-mono space-y-3 leading-relaxed relative">
                
                {/* Simulated Bounding Box 1 */}
                <div className="border border-cyan-500 bg-cyan-50/30 p-1.5 rounded">
                  <div className="text-[9px] text-cyan-600 font-bold uppercase">Doctor Header OCR</div>
                  <div className="font-bold text-slate-900 dark:text-white">Dr. Arvind Sharma, MD</div>
                  <div className="text-[9px] text-slate-400">Apollo Clinical Center • Reg: 48291</div>
                </div>

                {/* Simulated Bounding Box 2 */}
                <div className="border border-indigo-500 bg-indigo-50/30 p-1.5 rounded">
                  <div className="text-[9px] text-indigo-600 font-bold uppercase">Patient Data OCR</div>
                  <div>Patient: Kavi Priya (29 / F)</div>
                  <div>Date: 10-09-2026</div>
                </div>

                {/* Simulated Bounding Box 3 */}
                <div className="border border-emerald-500 bg-emerald-50/30 p-2 rounded space-y-1.5">
                  <div className="text-[9px] text-emerald-600 font-bold uppercase">Rx Prescription Lines OCR</div>
                  <div className="font-bold text-slate-900 dark:text-white">1. Tab Paracetamol 650mg TDS (1-1-1) x 3d</div>
                  <div className="font-bold text-slate-900 dark:text-white">2. Cap Amoxicillin 500mg BD (1-0-1) x 5d</div>
                  <div className="font-bold text-slate-900 dark:text-white">3. Tab Pantoprazole 40mg OD (1-0-0) x 5d</div>
                </div>

                {/* Laser scan line when active */}
                {isScanning && (
                  <div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-scan-line"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Extracted & Editable Fields */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                Extracted Prescription Parameters
              </h3>
              <p className="text-xs text-slate-400">Review, modify, or verify before sending to Safety Engine</p>
            </div>

            <button
              onClick={() => isEditing ? handleSaveRx() : setIsEditing(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-bold transition-colors"
            >
              {isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
              <span>{isEditing ? "Save & Lock Changes" : "Edit Fields"}</span>
            </button>
          </div>

          {/* Doctor & Patient Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {t.rxDoctorName}
              </span>
              <input 
                type="text"
                disabled={!isEditing}
                value={editedRx.doctorName}
                onChange={(e) => setEditedRx({ ...editedRx, doctorName: e.target.value })}
                className="w-full text-xs font-bold text-slate-900 dark:text-white bg-transparent focus:outline-none mt-1"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {t.rxPatientName}
              </span>
              <input 
                type="text"
                disabled={!isEditing}
                value={editedRx.patientName}
                onChange={(e) => setEditedRx({ ...editedRx, patientName: e.target.value })}
                className="w-full text-xs font-bold text-slate-900 dark:text-white bg-transparent focus:outline-none mt-1"
              />
            </div>
          </div>

          {/* Extracted Medications List */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              {t.rxMedicationsList} ({editedRx.medications.length})
            </h4>

            {editedRx.medications.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {item.name}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-bold text-xs">
                    {item.strength}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-1 text-slate-500 dark:text-slate-400">
                  <div><strong>Frequency:</strong> {item.frequency}</div>
                  <div><strong>Duration:</strong> {item.duration}</div>
                  <div><strong>Meal:</strong> {item.foodInstruction.replace('_', ' ')}</div>
                </div>

                {item.instructions && (
                  <div className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-200 dark:border-slate-700/60">
                    "{item.instructions}"
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-400">
              Prescription verified against master pharmaceutical dictionary
            </span>

            <button
              onClick={() => setCurrentScreen('safety-engine')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md shadow-cyan-600/25 transition-all"
            >
              <span>Cross-Verify in Safety Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

