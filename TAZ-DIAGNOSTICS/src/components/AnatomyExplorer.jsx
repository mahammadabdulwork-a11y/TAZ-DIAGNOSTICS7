import React, { useState } from 'react';
import { 
  Activity, 
  Heart, 
  Brain, 
  Flame, 
  Droplets, 
  Sun, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Sparkles,
  Info,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

const ORGANS_DATA = [
  {
    id: 'heart',
    name: 'Heart & Cardiovascular System',
    tagline: 'Cardiovascular Risk, Arterial Health & Cholesterol',
    icon: Heart,
    color: 'rose',
    accentColor: '#f43f5e',
    glowClass: 'bg-rose-500/10 text-rose-600 border-rose-200',
    badge: 'High Precision Cardiac Biomarkers',
    coordinates: { x: 50, y: 32 }, // percentage on body diagram
    symptoms: [
      'Chest tightness or mild exertion breathlessness',
      'High blood pressure (Hypertension)',
      'Family history of premature cardiac conditions',
      'Elevated stress levels & sedentary lifestyle'
    ],
    biomarkers: [
      { name: 'Lipid Profile (10 Parameters)', normal: 'Total Chol < 200 mg/dL, HDL > 40 mg/dL' },
      { name: 'hs-CRP (High Sensitivity CRP)', normal: '< 1.0 mg/L (Low Cardiac Risk)' },
      { name: 'Homocysteine (Vascular Health)', normal: '< 15 µmol/L' },
      { name: 'Apolipoproteins A1 & B', normal: 'Ratio < 0.8' }
    ],
    recommendedPackage: {
      title: 'Taz Heart Advanced (56 Parameters)',
      price: 2199,
      originalPrice: 3500,
      discount: '37% OFF',
      duration: '4 Hours',
      fasting: '10-12 Hrs Fasting Required'
    }
  },
  {
    id: 'thyroid',
    name: 'Thyroid & Endocrine Metabolism',
    tagline: 'Energy Regulation, Weight Balance & Hormones',
    icon: Flame,
    color: 'amber',
    accentColor: '#f59e0b',
    glowClass: 'bg-amber-500/10 text-amber-600 border-amber-200',
    badge: '4th-Gen CLIA Ultrasensitive Assays',
    coordinates: { x: 50, y: 20 },
    symptoms: [
      'Unexplained sudden weight gain or rapid weight loss',
      'Persistent sluggishness, fatigue & brain fog',
      'Excessive hair loss, brittle nails & dry skin',
      'Sensitivity to cold or heat fluctuations'
    ],
    biomarkers: [
      { name: 'Ultrasensitive TSH (3rd Gen)', normal: '0.45 - 4.50 µIU/mL' },
      { name: 'Free T3 (Triiodothyronine)', normal: '2.0 - 4.4 pg/mL' },
      { name: 'Free T4 (Thyroxine)', normal: '0.93 - 1.70 ng/dL' },
      { name: 'Anti-TPO (Thyroid Antibodies)', normal: '< 34 IU/mL' }
    ],
    recommendedPackage: {
      title: 'Taz Thyroid Total & Metabolism Panel',
      price: 499,
      originalPrice: 800,
      discount: '38% OFF',
      duration: '3 Hours',
      fasting: 'Early Morning Preferred'
    }
  },
  {
    id: 'liver',
    name: 'Liver & Biliary Function (LFT)',
    tagline: 'Detoxification, Metabolism & Enzyme Balance',
    icon: Activity,
    color: 'emerald',
    accentColor: '#10b981',
    glowClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    badge: '12-Parameter Automated Chemistry',
    coordinates: { x: 44, y: 44 },
    symptoms: [
      'Yellowish tint in eyes/skin or dark tea-colored urine (Jaundice signs)',
      'Chronic digestive sluggishness, nausea, or loss of appetite',
      'Upper right abdominal discomfort or fullness',
      'Frequent medication intake or alcohol consumption history'
    ],
    biomarkers: [
      { name: 'SGPT / ALT (Liver Enzyme)', normal: '< 45 U/L' },
      { name: 'SGOT / AST (Enzyme)', normal: '< 40 U/L' },
      { name: 'Total Bilirubin & Direct Bilirubin', normal: 'Total < 1.2 mg/dL' },
      { name: 'Serum Albumin & A/G Ratio', normal: 'Albumin 3.5 - 5.2 g/dL' }
    ],
    recommendedPackage: {
      title: 'Liver Function Test (LFT) 12 Parameters',
      price: 450,
      originalPrice: 700,
      discount: '35% OFF',
      duration: '3 Hours',
      fasting: '8-10 Hrs Fasting Required'
    }
  },
  {
    id: 'kidney',
    name: 'Kidneys & Renal Filtration (KFT/RFT)',
    tagline: 'Fluid Balance, Waste Filtration & Electrolytes',
    icon: Droplets,
    color: 'sky',
    accentColor: '#0ea5e9',
    glowClass: 'bg-sky-500/10 text-sky-600 border-sky-200',
    badge: 'Estimated GFR & Creatinine Clearance',
    coordinates: { x: 56, y: 50 },
    symptoms: [
      'Puffiness around the eyes or swelling in ankles/feet',
      'Changes in urine frequency, foaming, or nighttime urination',
      'Long-standing high blood pressure or uncontrolled diabetes',
      'Unexplained back flank pain'
    ],
    biomarkers: [
      { name: 'Serum Creatinine (Jaffe Kinetic)', normal: '0.6 - 1.2 mg/dL' },
      { name: 'Blood Urea Nitrogen (BUN)', normal: '7 - 20 mg/dL' },
      { name: 'Serum Uric Acid', normal: '3.5 - 7.2 mg/dL' },
      { name: 'eGFR (Filtration Rate)', normal: '> 90 mL/min/1.73m²' }
    ],
    recommendedPackage: {
      title: 'Kidney Function Test (KFT) Complete',
      price: 450,
      originalPrice: 750,
      discount: '40% OFF',
      duration: '3 Hours',
      fasting: 'Overnight Fasting Preferred'
    }
  },
  {
    id: 'pancreas',
    name: 'Pancreas & Blood Sugar (Diabetes)',
    tagline: 'Insulin Response & 90-Day Glycemic Control',
    icon: Flame,
    color: 'orange',
    accentColor: '#f97316',
    glowClass: 'bg-orange-500/10 text-orange-600 border-orange-200',
    badge: 'NGSP-Certified HPLC Gold Standard',
    coordinates: { x: 50, y: 41 },
    symptoms: [
      'Frequent thirst (Polydipsia) and increased urination (Polyuria)',
      'Sudden hunger pangs or tingling sensation in feet/hands',
      'Slow healing of minor cuts and recurrent skin infections',
      'Blurred vision or sudden afternoon energy crashes'
    ],
    biomarkers: [
      { name: 'HbA1c (90-Day Average Glucose)', normal: '< 5.7% (Non-Diabetic)' },
      { name: 'Fasting Blood Sugar (FBS)', normal: '70 - 99 mg/dL' },
      { name: 'Post Prandial Blood Sugar (PPBS)', normal: '< 140 mg/dL' },
      { name: 'Fasting Insulin & HOMA-IR', normal: '< 2.0 (Insulin Sensitive)' }
    ],
    recommendedPackage: {
      title: 'Taz Diabetes Complete Duo (HbA1c + FBS + PPBS)',
      price: 650,
      originalPrice: 1050,
      discount: '38% OFF',
      duration: '2 Hours',
      fasting: '8-10 Hrs Fasting for FBS'
    }
  },
  {
    id: 'bones',
    name: 'Bones, Joints & Vitamin Vitality',
    tagline: 'Bone Density, Calcium Absorption & Muscle Strength',
    icon: Sun,
    color: 'yellow',
    accentColor: '#eab308',
    glowClass: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
    badge: 'Chemiluminescent 25-OH Vitamin Assay',
    coordinates: { x: 50, y: 68 },
    symptoms: [
      'Persistent joint stiffness, knee pain or morning ache',
      'Deep bone pain, lower back discomfort, and muscle cramps',
      'Lack of sunlight exposure due to indoor office work',
      'Frequent fatigue and recurring muscle spasms'
    ],
    biomarkers: [
      { name: 'Vitamin D3 (25-Hydroxy D3)', normal: '30 - 100 ng/mL (Optimal)' },
      { name: 'Vitamin B12 (Active Cyanocobalamin)', normal: '211 - 911 pg/mL' },
      { name: 'Serum Calcium (Total)', normal: '8.8 - 10.2 mg/dL' },
      { name: 'Serum Uric Acid & RA Factor', normal: 'Uric Acid < 7.0 mg/dL' }
    ],
    recommendedPackage: {
      title: 'Taz Bone & Vitamin Essential Duo (D3 + B12 + Calcium)',
      price: 999,
      originalPrice: 1650,
      discount: '39% OFF',
      duration: '4 Hours',
      fasting: 'No Fasting Required'
    }
  },
  {
    id: 'blood',
    name: 'Hematology, Blood & Immune Cells',
    tagline: 'Oxygen Transport, Infection Defense & Platelet Reserve',
    icon: Droplets,
    color: 'red',
    accentColor: '#ef4444',
    glowClass: 'bg-red-500/10 text-red-600 border-red-200',
    badge: '5-Part Differential Laser Flow Cytometry',
    coordinates: { x: 38, y: 28 },
    symptoms: [
      'Pale skin, dizziness, or recurring headaches (Anemia signs)',
      'Frequent fevers, throat infections, or slow recovery',
      'Unexplained bruising or bleeding gums',
      'Post-fever or dengue platelet count monitoring'
    ],
    biomarkers: [
      { name: 'Hemoglobin (Hb)', normal: 'Male: 13.5-17.5 | Female: 12.0-15.5 g/dL' },
      { name: 'Total WBC Count (Leukocytes)', normal: '4,000 - 11,000 cells/cu.mm' },
      { name: 'Platelet Count (Thrombocytes)', normal: '1.5 - 4.5 Lakhs/cu.mm' },
      { name: 'ESR (Erythrocyte Sedimentation Rate)', normal: '< 20 mm/hr' }
    ],
    recommendedPackage: {
      title: 'Complete Blood Count (CBC) with ESR (28 Parameters)',
      price: 350,
      originalPrice: 500,
      discount: '30% OFF',
      duration: '2 Hours',
      fasting: 'No Fasting Required'
    }
  }
];

export default function AnatomyExplorer({ onOpenBooking }) {
  const [selectedOrganId, setSelectedOrganId] = useState('heart');
  const activeOrgan = ORGANS_DATA.find(o => o.id === selectedOrganId) || ORGANS_DATA[0];

  return (
    <section id="anatomy-explorer" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden border-t border-b border-slate-800">
      
      {/* Background High-Tech Grid & Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>Interactive Health Explorer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-4">
            Explore Your Body & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Targeted Biomarkers
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Click any organ system below to inspect vital pathology biomarkers, identify early warning symptoms, and book targeted diagnostic testing with certified 24/7 accuracy.
          </p>
        </div>

        {/* Organ Selector Navigation Pills (Mobile & Desktop) */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar justify-start lg:justify-center">
          {ORGANS_DATA.map((organ) => {
            const Icon = organ.icon;
            const isSelected = organ.id === selectedOrganId;
            return (
              <button
                key={organ.id}
                onClick={() => setSelectedOrganId(organ.id)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 whitespace-nowrap transition-all duration-300 border ${
                  isSelected
                    ? 'bg-sky-600 text-white border-sky-400 shadow-lg shadow-sky-600/30 scale-105'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white hover:border-slate-600'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-sky-400'}`} />
                <span>{organ.name.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Main Display: Visual Anatomy System + Diagnostic Telemetry Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Visual Human Body Map & Interactive Hotspots */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col items-center justify-center relative shadow-2xl overflow-hidden min-h-[460px]">
            
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>Interactive Anatomy Map</span>
            </div>

            {/* Futuristic Body Silhouette Container */}
            <div className="relative w-full max-w-[280px] h-[380px] flex items-center justify-center my-4">
              
              {/* Human Figure Silhouette SVG */}
              <svg 
                viewBox="0 0 200 400" 
                className="w-full h-full text-slate-700/60 drop-shadow-[0_0_15px_rgba(2,132,199,0.2)]"
                fill="currentColor"
              >
                {/* Head & Neck */}
                <circle cx="100" cy="35" r="22" className="opacity-80" />
                <path d="M92 57 L108 57 L112 70 L88 70 Z" className="opacity-70" />
                {/* Torso & Shoulders */}
                <path d="M60 75 C70 70, 130 70, 140 75 L155 140 L138 190 L132 230 L68 230 L62 190 L45 140 Z" className="opacity-85" />
                {/* Arms */}
                <path d="M45 78 L25 150 L20 220 L32 225 L40 160 L58 90 Z" className="opacity-60" />
                <path d="M155 78 L175 150 L180 220 L168 225 L160 160 L142 90 Z" className="opacity-60" />
                {/* Legs */}
                <path d="M72 232 L68 330 L62 385 L88 385 L92 330 L96 235 Z" className="opacity-75" />
                <path d="M128 232 L132 330 L138 385 L112 385 L108 330 L104 235 Z" className="opacity-75" />
              </svg>

              {/* Dynamic Hotspot Pins for Each Organ */}
              {ORGANS_DATA.map((organ) => {
                const isSelected = organ.id === selectedOrganId;
                const Icon = organ.icon;
                return (
                  <button
                    key={organ.id}
                    onClick={() => setSelectedOrganId(organ.id)}
                    style={{
                      left: `${organ.coordinates.x}%`,
                      top: `${organ.coordinates.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className={`absolute z-20 group p-2 rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'bg-sky-500 text-white ring-4 ring-sky-400/40 scale-125 shadow-lg shadow-sky-500/50'
                        : 'bg-slate-800 text-sky-400 border border-slate-600 hover:scale-110 hover:bg-sky-600 hover:text-white'
                    }`}
                    title={organ.name}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="sr-only">{organ.name}</span>
                    
                    {/* Pulsing ring on selected */}
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-50"></span>
                    )}
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-slate-400 text-center mt-2">
              Tap any organ pin or category above to reveal in-depth clinical pathology data.
            </p>
          </div>

          {/* Right Column: In-Depth Diagnostic Telemetry & Package Action Card */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between shadow-2xl relative">
            
            <div>
              {/* Header Badge & Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide border ${activeOrgan.glowClass}`}>
                  {activeOrgan.badge}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Report in {activeOrgan.recommendedPackage.duration}</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-display text-white mb-1.5">
                {activeOrgan.name}
              </h3>
              <p className="text-sky-300 font-medium text-sm mb-6">
                {activeOrgan.tagline}
              </p>

              {/* Two Column Grid: Symptoms to Watch + Key Biomarkers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                {/* Early Warning Symptoms */}
                <div className="bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-slate-700/60">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Symptoms to Monitor</span>
                  </div>
                  <ul className="space-y-2">
                    {activeOrgan.symptoms.map((symptom, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Vital Biomarkers & Normal Biological Intervals */}
                <div className="bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-slate-700/60">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider mb-3">
                    <Activity className="w-4 h-4" />
                    <span>Tested Biomarkers & Reference</span>
                  </div>
                  <div className="space-y-2.5">
                    {activeOrgan.biomarkers.map((bio, idx) => (
                      <div key={idx} className="border-b border-slate-700/40 pb-1.5 last:border-0 last:pb-0">
                        <div className="text-xs sm:text-sm font-semibold text-white">{bio.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">Ref: {bio.normal}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Action Strip: Direct 1-Click Package Booking */}
            <div className="pt-5 border-t border-slate-800 bg-slate-950/60 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 rounded-b-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400 font-medium">Recommended Diagnostic Panel</div>
                <div className="text-base sm:text-lg font-bold text-white">{activeOrgan.recommendedPackage.title}</div>
                <div className="flex items-center gap-2.5 mt-1">
                  <span className="text-2xl font-extrabold text-emerald-400">₹{activeOrgan.recommendedPackage.price}</span>
                  <span className="text-xs text-slate-500 line-through">₹{activeOrgan.recommendedPackage.originalPrice}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    {activeOrgan.recommendedPackage.discount}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenBooking({
                  title: activeOrgan.recommendedPackage.title,
                  price: activeOrgan.recommendedPackage.price,
                  duration: activeOrgan.recommendedPackage.duration,
                  fastingRequired: activeOrgan.recommendedPackage.fasting,
                  sampleType: 'Blood / Serum Sample'
                })}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all hover:scale-105 active:scale-95 shrink-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Checkup</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
