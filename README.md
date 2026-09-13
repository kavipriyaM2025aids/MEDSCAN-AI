# MEDSCAN AI — Smart Medication Platform

An enterprise-grade commercial healthcare SaaS application powering instant OCR medicine recognition, AI clinical explanation, drug interaction verification, prescription scanning, and the breakthrough **Prescription-to-Pill Safety Engine**.

---

## 🌟 Core Features & Modules

### 1. Header & Role Portals
- **Branding**: Viewfinder scan icon with `MEDSCAN AI` and `SMART MEDICATION PLATFORM` subtitle.
- **Top Navigation**: Instant routing across Dashboard, AI Vision Scan, Lost Rx Recovery, Rx Scanner, Smart Inventory, Interactions, Pharmacies, Doctors, and Emergency.
- **Role Portal Bar**: Instant persona switching for `Patient Hub`, `Doctor Portal`, `Pharmacy Desk`, and `Admin Console`.
- **Theme Switcher**: Dark Navy & Pure White clinical modes.
- **Emergency Button**: High-urgency coral pill button with one-click paramedic hotlines.

### 2. AI Vision Scan & Feature Extraction
- **Drag & Drop / Camera Ingestion**: Upload blister packs, bottle labels, or test with instant demo presets (`Dolo 650`, `Amoxicillin 500mg`, `Augmentin 625 Duo`, `Pantocid 40`).
- **Computer Vision Feature Extraction Matrix**: 8-cell morphological analysis (`Shape & Form`, `Estimated Dimensions`, `Color & Spectrum`, `Imprint OCR`, `Surface Texture`, `Score Line / Notch`, `Manufacturer Logo Check`, `Packaging Format`).
- **Visual Match Confidence**: Dynamic gauge (`98% Match`).
- **Visual Keypoint Overlay & Master DB Matching**: Side-by-side specimen comparison with keypoint coordinates.
- **Audio Voice Synthesis**: Listen to medication monograph in English, Tamil, or Hindi.

### 3. Prescription-to-Pill Safety Engine (NEW Unique Differentiating Feature)
- **Prescription Mismatch Detection**: Cross-references Doctor's Rx script with scanned blister strips.
  - Detects **Strength Mismatches** (e.g. Prescribed Paracetamol 650mg TDS vs Scanned Paracetamol 500mg).
  - Side-by-side parameter comparison matrix (`✓ Match`, `⚠ Mismatch`, `✕ Critical Mismatch`).
- **Duplicate Active Ingredient Detector**: Visual tree connecting formulations (e.g., `Dolo 650` + `Cold Relief Tablet` both containing **Paracetamol**) to prevent hepatotoxicity and 4000mg/day overdose.
- **"Can I Take This Now?" Real-Time Clearance**: Evaluates current time, food buffer, scheduled doses, duplicate active ingredients, and interactions.
- **Unified Medication Safety Report**: Printable & transmissible clinical audit for physician verification.

### 4. Smart Audio Dosage Alarms (CITIZEN)
- **Floating Badge**: `🔔 ⚠️ Alarm Beep Alert: CITIZEN` in the bottom-right corner.
- **Dual-Frequency Synthesizer**: Web Audio API generated 880Hz / 1046Hz clinical chime.
- **Vocalized Reminders**: Speaks personalized dosage instructions in English, Tamil, and Hindi.

### 5. Multilingual Coverage (English, தமிழ், हिंदी)
- 100% complete UI translation across every button, navigation item, status badge, feature card, and AI pharmacist response.

### 6. Supporting Clinical Modules
- **Lost Rx Recovery**: Historical neural reconstruction of prescriptions from past scans and purchase timeline.
- **Rx Scanner**: Dedicated OCR reader with bounding box overlay and in-place field editing.
- **Smart Inventory**: Stock remaining counters, refill alerts, and expiration countdowns.
- **Drug Interactions**: Multi-drug matrix with severity categorization (`High`, `Moderate`, `Low`).
- **Pharmacies & Doctors**: Nearby GPS-based pharmacy reservation and certified doctor telehealth booking.
- **Emergency & Toxicity**: Rapid paramedic access, blood group passport, and toxicology first-aid protocols.
- **AI Clinical Pharmacist Assistant**: Conversational assistant with instant prompt chips and safety disclaimers.

---

## 🚀 Getting Started

### Run the Frontend (React + TypeScript + Vite)
```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Launch the Vite development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

To verify a production build:
```bash
npm run build
```

---
 switch languages between English, Tamil, and Hindi.

