import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Plus, 
  AlertTriangle, 
  RefreshCw, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  Bell, 
  Scan,
  Store
} from 'lucide-react';
import { useMedScan } from '../../contexts/MedScanContext';
import { StockStatus, InventoryItem } from '../../types/medscan';

export const SmartInventoryScreen: React.FC = () => {
  const { 
    inventory, 
    updateStockCount, 
    removeInventoryItem, 
    addToInventory, 
    setCurrentScreen,
    t 
  } = useMedScan();

  const [activeFilter, setActiveFilter] = useState<'ALL' | StockStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMedName, setNewMedName] = useState('');
  const [newMedStrength, setNewMedStrength] = useState('500 mg');
  const [newMedCount, setNewMedCount] = useState('15');

  const filteredItems = inventory.filter((item) => {
    const matchesFilter = activeFilter === 'ALL' || item.status === activeFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.activeSalt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim()) return;
    addToInventory({
      name: newMedName,
      strength: newMedStrength,
      dosageForm: "Tablet",
      countRemaining: parseInt(newMedCount) || 10,
      totalPills: parseInt(newMedCount) || 10,
      category: "Prescription Medicine",
      activeSalt: newMedName
    });
    setNewMedName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Package className="w-3.5 h-3.5" />
              <span>Real-Time Medicine Stock Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.inventoryTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {t.inventorySubtitle} Automatic depletion tracking, expiration alert countdowns, and instant local pharmacy refill dispatch.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md shadow-cyan-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{t.btnAddMedicine}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'ALL'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {t.filterAll} ({inventory.length})
          </button>

          <button
            onClick={() => setActiveFilter('IN_STOCK')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'IN_STOCK'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {t.filterInStock} ({inventory.filter(i => i.status === 'IN_STOCK').length})
          </button>

          <button
            onClick={() => setActiveFilter('LOW_STOCK')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'LOW_STOCK'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {t.filterLowStock} ({inventory.filter(i => i.status === 'LOW_STOCK').length})
          </button>

          <button
            onClick={() => setActiveFilter('EXPIRING_SOON')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'EXPIRING_SOON'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {t.filterExpiring} ({inventory.filter(i => i.status === 'EXPIRING_SOON').length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input 
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-800 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

      </div>

      {/* Inventory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
          >
            {/* Status indicator bar */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 ${
              item.status === 'IN_STOCK' ? 'bg-emerald-500' :
              item.status === 'LOW_STOCK' ? 'bg-amber-500' :
              item.status === 'EXPIRING_SOON' ? 'bg-rose-500' : 'bg-slate-400'
            }`} />

            <div className="flex items-start justify-between gap-3 pt-1">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {item.category}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {item.name}
                </h3>
                <div className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">
                  {item.strength} • {item.dosageForm}
                </div>
              </div>

              {/* Status Badge */}
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                item.status === 'IN_STOCK' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                item.status === 'LOW_STOCK' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                item.status === 'EXPIRING_SOON' ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                {item.status.replace('_', ' ')}
              </span>
            </div>

            {/* Pill Count & Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Remaining Units:</span>
                <span className="font-extrabold text-slate-900 dark:text-white">
                  {item.countRemaining} / {item.totalPills} doses
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    item.status === 'IN_STOCK' ? 'bg-emerald-500' :
                    item.status === 'LOW_STOCK' ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, (item.countRemaining / item.totalPills) * 100)}%` }}
                />
              </div>
            </div>

            {/* Expiration & Frequency Details */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Expires On</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{item.expiryDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Dosage Schedule</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{item.dosageFrequency}</span>
              </div>
            </div>

            {/* Actions: Decrement/Increment, Refill, Remove */}
            <div className="flex items-center justify-between gap-2 pt-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateStockCount(item.id, -1)}
                  className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center"
                  title="Took 1 Dose"
                >
                  -
                </button>
                <button
                  onClick={() => updateStockCount(item.id, 1)}
                  className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center"
                  title="Add 1 Dose"
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-2">
                {(item.status === 'LOW_STOCK' || item.status === 'EXPIRING_SOON') && (
                  <button
                    onClick={() => setCurrentScreen('pharmacies')}
                    className="px-3 py-1.5 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs"
                  >
                    <Store className="w-3 h-3" />
                    <span>Refill</span>
                  </button>
                )}
                <button
                  onClick={() => removeInventoryItem(item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                  title="Remove Item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add Medicine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              Manual Inventory Addition
            </h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Medicine Brand Name
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Paracetamol, Augmentin"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Strength
                  </label>
                  <input 
                    type="text" 
                    value={newMedStrength}
                    onChange={(e) => setNewMedStrength(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Initial Count
                  </label>
                  <input 
                    type="number" 
                    value={newMedCount}
                    onChange={(e) => setNewMedCount(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold"
                >
                  Add to Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

