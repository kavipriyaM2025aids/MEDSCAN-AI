export type Language = 'en' | 'ta' | 'hi';

export type RolePortal = 'patient' | 'doctor' | 'pharmacy' | 'admin';

export type ScreenRoute = 
  | 'dashboard'
  | 'vision-scan'
  | 'safety-engine'
  | 'lost-rx'
  | 'rx-scanner'
  | 'inventory'
  | 'interactions'
  | 'pharmacies'
  | 'doctors'
  | 'emergency'
  | 'alarms'
  | 'assistant';

export interface FeatureExtraction {
  shapeForm: string;
  estDimensions: string;
  thickness?: string;
  colorSpectrum: string;
  imprintOcr: string;
  surfaceTexture: string;
  scoreLineNotch: string;
  mfrLogoCheck: string;
  packagingFormat: string;
  confidence: number;
}

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  brandName: string;
  strength: string;
  dosageForm: string;
  activeIngredients: string[];
  manufacturer: string;
  uses: string[];
  precautions: string[];
  commonSideEffects: string[];
  storageInfo: string;
  prescriptionSchedule: string; // e.g. "Schedule H Prescription Drug"
  category: string;
  foodInstructions: string;
  warnings: string[];
  features?: FeatureExtraction;
  referenceImage?: string;
}

export interface PrescriptionItem {
  name: string;
  genericName?: string;
  strength: string;
  dosageForm: string;
  frequency: string; // e.g. "1-0-1", "3 times daily"
  duration: string;  // e.g. "5 days"
  foodInstruction: 'before_food' | 'after_food' | 'with_food';
  instructions?: string;
}

export interface Prescription {
  id: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  licenseNumber: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  date: string;
  diagnosis: string;
  medications: PrescriptionItem[];
  rawOcrText?: string;
}

export type ComparisonStatus = 'MATCH' | 'WARNING' | 'CRITICAL_MISMATCH';

export interface ComparisonParameter {
  name: string;
  prescribed: string;
  scanned: string;
  status: 'match' | 'warning' | 'mismatch';
  details?: string;
}

export interface SafetyComparisonResult {
  id: string;
  timestamp: string;
  prescriptionId: string;
  prescribedItem: PrescriptionItem;
  scannedMedication: Medication;
  overallStatus: ComparisonStatus;
  headline: string;
  explanation: string;
  parameters: ComparisonParameter[];
  actionRecommendation: string;
  verifiedByAi: boolean;
}

export interface DuplicateIngredientResult {
  detected: boolean;
  medicineA: string;
  medicineB: string;
  sharedActiveIngredient: string;
  totalEstimatedDailyLoad?: string;
  safeDailyLimit?: string;
  severity: 'HIGH' | 'MODERATE';
  clinicalExplanation: string;
  recommendation: string;
}

export type CanTakeNowCategory = 
  | 'SAFE_TO_REVIEW' 
  | 'CAUTION' 
  | 'POTENTIAL_INTERACTION' 
  | 'VERIFY_WITH_PROFESSIONAL';

export interface CanTakeNowEvaluation {
  category: CanTakeNowCategory;
  headline: string;
  verdictDetail: string;
  scheduledTime: string;
  currentMedicationsCount: number;
  foodGuidance: string;
  factors: {
    duplicateIngredientChecked: boolean;
    foodTimingAligned: boolean;
    interactionRiskLow: boolean;
    scheduleAdherenceValid: boolean;
  };
  disclaimer: string;
}

export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'EXPIRING_SOON' | 'EXPIRED';

export interface InventoryItem {
  id: string;
  name: string;
  strength: string;
  dosageForm: string;
  countRemaining: number;
  totalPills: number;
  minThreshold: number;
  expiryDate: string;
  batchNumber: string;
  lastScannedDate: string;
  status: StockStatus;
  dosageFrequency: string;
  category: string;
  activeSalt: string;
}

export interface DrugInteraction {
  id: string;
  drug1: string;
  drug2: string;
  severity: 'HIGH' | 'MODERATE' | 'LOW';
  mechanism: string;
  clinicalAdvice: string;
  actionRequired: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  rating: number;
  reviewsCount: number;
  verifiedPartner: boolean;
  openNow: boolean;
  openHours: string;
  phone: string;
  unitPriceEstimate: string;
  deliveryTimeEstimate: string;
  stockAvailability: {
    medicineName: string;
    inStock: boolean;
    unitsAvailable: number;
    price: string;
  }[];
  lat: number;
  lng: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  hospital: string;
  experienceYears: number;
  rating: number;
  consultationFee: string;
  availableToday: boolean;
  nextSlot: string;
  languages: string[];
  telehealthAvailable: boolean;
}

export interface DosageReminder {
  id: string;
  medicineName: string;
  dose: string;
  time: string; // "09:00 AM", "02:00 PM", "09:00 PM"
  mealRelation: 'before_food' | 'after_food' | 'with_food';
  frequency: string;
  active: boolean;
  spokenAudioText?: string;
}

export interface ClinicalSafetyReport {
  id: string;
  generatedAt: string;
  patientName: string;
  prescriptionsAnalyzed: number;
  medicationsScanned: number;
  mismatchesDetected: number;
  duplicateIngredientsFound: number;
  interactionsIdentified: number;
  summaryStatus: 'ACTION_REQUIRED' | 'REVIEWED_SAFE';
  reportItems: {
    medicine: string;
    strength: string;
    safetyState: string;
    clinicalNote: string;
  }[];
  doctorSignatureStamp?: string;
}

