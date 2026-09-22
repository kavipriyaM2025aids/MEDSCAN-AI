import React from 'react';
import { User, Stethoscope, Store, ShieldCheck } from 'lucide-react';
import { useMedScan } from '../../contexts/MedScanContext';
import { RolePortal } from '../../types/medscan';

export const RolePortalBar: React.FC = () => {
  const { rolePortal, setRolePortal, t } = useMedScan();

  const portals: { id: RolePortal; label: string; icon: React.ReactNode; colorClass: string; activeClass: string }[] = [
    { 
      id: 'patient', 
      label: t.rolePatient, 
      icon: <User className="w-3.5 h-3.5" />,
      colorClass: 'text-cyan-700 bg-cyan-50/80 hover:bg-cyan-100/70 dark:bg-cyan-950/40 dark:text-cyan-300',
      activeClass: 'bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-900 dark:text-cyan-200'
    },
    { 
      id: 'doctor', 
      label: t.roleDoctor, 
      icon: <Stethoscope className="w-3.5 h-3.5" />,
      colorClass: 'text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100/70 dark:bg-emerald-950/40 dark:text-emerald-300',
      activeClass: 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300 dark:bg-emerald-900 dark:text-emerald-200'
    },
    { 
      id: 'pharmacy', 
      label: t.rolePharmacy, 
      icon: <Store className="w-3.5 h-3.5" />,
      colorClass: 'text-amber-700 bg-amber-50/80 hover:bg-amber-100/70 dark:bg-amber-950/40 dark:text-amber-300',
      activeClass: 'bg-amber-100 text-amber-800 ring-1 ring-amber-300 dark:bg-amber-900 dark:text-amber-200'
    },
    { 
      id: 'admin', 
      label: t.roleAdmin, 
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      colorClass: 'text-purple-700 bg-purple-50/80 hover:bg-purple-100/70 dark:bg-purple-950/40 dark:text-purple-300',
      activeClass: 'bg-purple-100 text-purple-800 ring-1 ring-purple-300 dark:bg-purple-900 dark:text-purple-200'
    },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-800/60 py-2.5 px-4 sm:px-6">
      <div className="max-w-[1600px] mx-auto flex items-center gap-3 overflow-x-auto">
        <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 shrink-0">
          {t.rolePortalLabel}
        </span>
        <div className="flex items-center gap-2">
          {portals.map((portal) => {
            const isActive = rolePortal === portal.id;
            return (
              <button
                key={portal.id}
                onClick={() => setRolePortal(portal.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isActive ? portal.activeClass : portal.colorClass
                }`}
              >
                <span>{portal.icon}</span>
                <span>{portal.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

