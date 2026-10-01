export const CONTACT_INFO = {
  phone: '9440985131',
  phoneDisplay: '+91 9440985131',
  email: 'tazdiagnostic@gmail.com',
  address: 'Dr No: 8-200 RAJKUMAR SILKS, Near Raj Kumar Silks Street, Main Road, Tallapudi, Rajahmundry-534341, Andhra Pradesh',
  landmark: 'Near Raj Kumar Silks Street, Main Road, Tallapudi',
  city: 'Tallapudi, Rajahmundry, Andhra Pradesh',
  hours: '24/7 Computerized Automated Lab (Round-the-clock emergency services)',
  homeCollectionHours: '6:30 AM – 9:00 PM (Daily)',
  founderName: 'Mahammad Abdul Rajak',
  founderTitle: 'Founder & Managing Director',
};

export const CATEGORIES = [
  { id: 'all', name: 'All Diagnostic Tests', icon: 'Sparkles' },
  { id: 'packages', name: 'Special Health Packages', icon: 'ShieldCheck' },
  { id: 'blood', name: 'Hematology & CBC', icon: 'Droplets' },
  { id: 'biochemistry', name: 'Biochemistry & Organ Panels', icon: 'Activity' },
  { id: 'hormones', name: 'Hormones & Fertility', icon: 'HeartPulse' },
  { id: 'diabetes-cardiac', name: 'Diabetes & Cardiac Risk', icon: 'Flame' },
  { id: 'vitamins', name: 'Vitamins & Bone Health', icon: 'Sun' },
];

export const MEDICAL_TESTS = [
  {
    id: 'test-cbc',
    title: 'Complete Blood Count (CBC) with ESR (28 Parameters)',
    category: 'blood',
    description: 'Automated 5-part differential hematology measuring RBC, Hemoglobin, Platelet count, MCV, MCH, MCHC, and ESR.',
    duration: '2 Hours',
    sampleType: 'Blood Sample (EDTA)',
    fastingRequired: 'No Fasting Required',
    price: 350,
    originalPrice: 500,
    discount: '30% OFF',
    popular: true,
    badgeColor: 'sky',
    icon: 'Droplets',
    parametersCount: 28,
    features: ['5-Part Cell Counter', 'Same Day Digital Report', 'Free Doctor Tele-Consult']
  },
  {
    id: 'test-glucose-fasting',
    title: 'Fasting Blood Sugar (FBS) & Post Prandial (PPBS) Duo',
    category: 'diabetes-cardiac',
    description: 'Accurate hexokinase automated plasma glucose estimation for fasting and 2-hour post-meal diabetes tracking.',
    duration: '1 Hour',
    sampleType: 'Fluoride Blood Sample',
    fastingRequired: '8-10 Hrs Fasting for FBS',
    price: 150,
    originalPrice: 250,
    discount: '40% OFF',
    popular: true,
    badgeColor: 'amber',
    icon: 'Flame',
    parametersCount: 2,
    features: ['Instant Results', 'Glycemic Status Evaluation', 'Free Home Collection']
  },
  {
    id: 'test-lipid',
    title: 'Lipid Profile+ Complete (10 Parameters)',
    category: 'diabetes-cardiac',
    description: 'Total Cholesterol, HDL, LDL, VLDL, Triglycerides, Non-HDL Cholesterol, TC/HDL Ratio, HDL/LDL Ratio, and TRIG/HDL Ratio.',
    duration: '4 Hours',
    sampleType: 'Blood Sample',
    fastingRequired: '10-12 Hrs Fasting Required',
    price: 550,
    originalPrice: 850,
    discount: '35% OFF',
    popular: true,
    badgeColor: 'emerald',
    icon: 'HeartPulse',
    parametersCount: 10,
    features: ['Automated Chemistry Assay', 'Cardiovascular Risk Gauge', 'Free Home Collection']
  },
  {
    id: 'test-thyroid',
    title: 'Thyroid Profile Total & Ultrasensitive (T3, T4, TSH)',
    category: 'hormones',
    description: 'High-precision Chemiluminescence Immunoassay (CLIA) measuring Triiodothyronine (T3), Thyroxine (T4), and Ultrasensitive TSH.',
    duration: '3 Hours',
    sampleType: 'Blood Sample',
    fastingRequired: 'Early Morning Preferred',
    price: 499,
    originalPrice: 800,
    discount: '38% OFF',
    popular: true,
    badgeColor: 'sky',
    icon: 'Activity',
    parametersCount: 3,
    features: ['CLIA 4th-Gen Precision', 'Sub-clinical Thyroid Detection', 'Instant Digital PDF']
  },
  {
    id: 'test-hba1c',
    title: 'HbA1c Glycated Hemoglobin & Average Blood Glucose',
    category: 'diabetes-cardiac',
    description: 'NGSP-certified HPLC gold standard measuring 90-day average blood glucose and Estimated Average Glucose (eAG).',
    duration: '2 Hours',
    sampleType: 'Blood Sample',
    fastingRequired: 'No Fasting Required (Can be given anytime)',
    price: 450,
    originalPrice: 700,
    discount: '36% OFF',
    popular: true,
    badgeColor: 'amber',
    icon: 'Flame',
    parametersCount: 2,
    features: ['Gold Standard HPLC Method', 'Micro-Vascular Risk Score', 'Same-Day Fast Delivery']
  },
  {
    id: 'test-lft',
    title: 'Liver Function Test (LFT - 11 Parameters)',
    category: 'biochemistry',
    description: 'Bilirubin (Total, Direct, Indirect), SGOT/AST, SGPT/ALT, Alkaline Phosphatase, Total Protein, Albumin, Globulin, and A:G Ratio.',
    duration: '4 Hours',
    sampleType: 'Blood Sample',
    fastingRequired: '8-10 Hrs Fasting',
    price: 650,
    originalPrice: 950,
    discount: '32% OFF',
    popular: false,
    badgeColor: 'sky',
    icon: 'Activity',
    parametersCount: 11,
    features: ['Enzyme Kinetics Analysis', 'Hepatic Health Screening', 'Same Day Delivery']
  },
  {
    id: 'test-kft',
    title: 'Kidney Function Test (KFT / RFT - 9 Parameters)',
    category: 'biochemistry',
    description: 'Blood Urea Nitrogen (BUN), Serum Creatinine, Uric Acid, Calcium, Phosphorus, BUN/Creatinine Ratio, and Electrolytes.',
    duration: '4 Hours',
    sampleType: 'Blood Sample',
    fastingRequired: 'Overnight Fasting Preferred',
    price: 650,
    originalPrice: 950,
    discount: '32% OFF',
    popular: false,
    badgeColor: 'sky',
    icon: 'Activity',
    parametersCount: 9,
    features: ['eGFR Glomerular Filtration Calc', 'Renal Function Assessment', 'Home Collection Available']
  },
  {
    id: 'test-electrolytes',
    title: 'Serum Electrolytes Profile (Sodium, Potassium, Chloride)',
    category: 'biochemistry',
    description: 'Ion Selective Electrode (ISE) direct electrolyte measurement for dehydration, blood pressure, and renal balance.',
    duration: '2 Hours',
    sampleType: 'Blood Sample',
    fastingRequired: 'No Fasting Required',
    price: 400,
    originalPrice: 650,
    discount: '38% OFF',
    popular: false,
    badgeColor: 'emerald',
    icon: 'Activity',
    parametersCount: 3,
    features: ['ISE Direct Assay', 'Emergency Turnaround', 'Hospital-Grade Accuracy']
  },
  {
    id: 'test-uric-acid',
    title: 'Serum Uric Acid (Joint Pain & Gout Screen)',
    category: 'biochemistry',
    description: 'Quantitative determination of serum uric acid levels for diagnosing gout, kidney stones, and joint inflammation.',
    duration: '2 Hours',
    sampleType: 'Blood Sample',
    fastingRequired: '4 Hrs Fasting Preferred',
    price: 180,
    originalPrice: 300,
    discount: '40% OFF',
    popular: false,
    badgeColor: 'sky',
    icon: 'Activity',
    parametersCount: 1,
    features: ['Rapid Uricase Method', 'Arthritis Early Warning', 'Instant WhatsApp Delivery']
  },
  {
    id: 'test-calcium-phosphorus',
    title: 'Serum Calcium & Phosphorus Bone Mineral Duo',
    category: 'vitamins',
    description: 'Essential minerals evaluating bone metabolism, parathyroid function, and neuromuscular stability.',
    duration: '3 Hours',
    sampleType: 'Blood Sample',
    fastingRequired: 'No Fasting Required',
    price: 300,
    originalPrice: 500,
    discount: '40% OFF',
    popular: false,
    badgeColor: 'amber',
    icon: 'Sun',
    parametersCount: 2,
    features: ['Bone Density Indicator', 'Rapid Turnaround', 'Home Draw Available']
  },
  {
    id: 'test-dengue-widal',
    title: 'Dengue NS1 Antigen + IgM/IgG & Widal Fever Duo',
    category: 'blood',
    description: 'Comprehensive acute fever screening for early Dengue NS1 virus detection, antibody response, and Typhoid Widal titers.',
    duration: '2 Hours',
    sampleType: 'Blood Sample',
    fastingRequired: 'No Fasting Required',
    price: 800,
    originalPrice: 1300,
    discount: '38% OFF',
    popular: true,
    badgeColor: 'rose',
    icon: 'Droplets',
    parametersCount: 4,
    features: ['Emergency Rapid Fever Panel', 'Early Dengue Antigen Detection', '24/7 Processing']
  },
  {
    id: 'test-ra-crp',
    title: 'Rheumatoid Arthritis (RA Factor) & High Sensitivity CRP',
    category: 'blood',
    description: 'Turbidimetric quantitative assay for autoimmune arthritis, systemic inflammation, and joint pain differential diagnosis.',
    duration: '3 Hours',
    sampleType: 'Blood Sample',
    fastingRequired: 'No Fasting Required',
    price: 550,
    originalPrice: 900,
    discount: '39% OFF',
    popular: false,
    badgeColor: 'sky',
    icon: 'Activity',
    parametersCount: 2,
    features: ['High Sensitivity Turbidimetry', 'Autoimmune Screening', 'Doctor Verified Report']
  },
  {
    id: 'test-vitamins',
    title: 'Vitamin D (25-OH Total) & Vitamin B12 Duo',
    category: 'vitamins',
    description: 'Immunoassay assessing bone mineral density cofactor (25-OH Vitamin D3) and nerve vitality biomarker (Vitamin B12).',
    duration: '5 Hours',
    sampleType: 'Blood Sample',
    fastingRequired: 'No Fasting Required',
    price: 1199,
    originalPrice: 2200,
    discount: '45% OFF',
    popular: true,
    badgeColor: 'amber',
    icon: 'Sun',
    parametersCount: 2,
    features: ['Immunity & Energy Profiling', 'Bone Density Health', 'Doctor Verified Report']
  },
  {
    id: 'test-iron',
    title: 'Iron Deficiency Profile (4 Parameters)',
    category: 'blood',
    description: 'Serum Iron, Total Iron Binding Capacity (TIBC), Unsaturated Iron Binding Capacity (UIBC), and % Transferrin Saturation.',
    duration: '4 Hours',
    sampleType: 'Blood Sample',
    fastingRequired: '10-12 Hrs Fasting',
    price: 600,
    originalPrice: 900,
    discount: '33% OFF',
    popular: false,
    badgeColor: 'emerald',
    icon: 'Droplets',
    parametersCount: 4,
    features: ['Anemia Differential Evaluation', 'Iron Reserve Tracking', 'Home Sample Pickup']
  },
  {
    id: 'test-hormones-fertility',
    title: 'Prolactin, LH & FSH Reproductive Hormone Trio',
    category: 'hormones',
    description: 'Chemiluminescence evaluation of pituitary gonadotropins (LH, FSH) and Prolactin for menstrual and fertility investigations.',
    duration: '4 Hours',
    sampleType: 'Blood Sample',
    fastingRequired: 'Morning Sample Recommended',
    price: 850,
    originalPrice: 1400,
    discount: '39% OFF',
    popular: false,
    badgeColor: 'rose',
    icon: 'HeartPulse',
    parametersCount: 3,
    features: ['4th-Gen CLIA Immunoassay', 'Hormonal Imbalance Profiling', 'Confidential Handling']
  },
  {
    id: 'test-beta-hcg',
    title: 'Beta HCG Quantitative Pregnancy & Vitality Marker',
    category: 'hormones',
    description: 'Ultra-sensitive quantitative blood assay for accurate early pregnancy confirmation, gestational tracking, and ectopic monitoring.',
    duration: '2 Hours',
    sampleType: 'Blood Sample',
    fastingRequired: 'No Fasting Required',
    price: 450,
    originalPrice: 750,
    discount: '40% OFF',
    popular: false,
    badgeColor: 'sky',
    icon: 'HeartPulse',
    parametersCount: 1,
    features: ['Quantitative Precision', 'Early Gestation Detection', 'Same Day WhatsApp PDF']
  },
  {
    id: 'test-urine',
    title: 'Complete Urine Routine & Microscopic Examination (CUE)',
    category: 'biochemistry',
    description: 'Complete physical, chemical (Protein, Sugar, Ketones, Bilirubin, Urobilinogen), and microscopic (Pus cells, RBCs, Casts, Crystals) analysis.',
    duration: '2 Hours',
    sampleType: 'Clean Catch Midstream Urine',
    fastingRequired: 'Early Morning Preferred',
    price: 200,
    originalPrice: 350,
    discount: '43% OFF',
    popular: false,
    badgeColor: 'sky',
    icon: 'Activity',
    parametersCount: 18,
    features: ['Automated Strip & Microscopy', 'UTI & Kidney Health Check', 'Instant Result Delivery']
  },
  {
    id: 'test-custom-prescription',
    title: 'Doctor Prescription / Other Custom Tests (Specify in Note / Voice)',
    category: 'all',
    description: 'Have a doctor prescription or need a specific test not listed above? Select this and record your voice note or write test details.',
    duration: 'Same Day',
    sampleType: 'As Advised by Doctor',
    fastingRequired: 'Will be guided by lab coordinator',
    price: 0,
    originalPrice: 0,
    discount: 'Custom',
    popular: true,
    badgeColor: 'emerald',
    icon: 'Sparkles',
    parametersCount: 1,
    features: ['Voice Note Support', 'Doctor Prescription Upload', 'Free Home Draw Callback']
  }
];

export const HEALTH_PACKAGES = [
  {
    id: 'pkg-post-delivery',
    title: 'Taz Post Delivery Health Check',
    flyerHeadline: 'Your delivery is just the 1st milestone. Recovery is next with Taz.',
    badge: 'NEW MOTHER RECOVERY',
    tagline: 'Comprehensive 56-Parameter Postpartum Recovery & Hormonal Wellness Suite',
    statCallout: '1 In Every 5 New Mothers In India Battles Postpartum Depression.',
    price: 2599,
    originalPrice: 6500,
    discount: '60% OFF',
    popular: true,
    accentColor: 'rose',
    testsCount: '56 Parameters',
    reportsIn: 'Same Day Delivery',
    fastingNote: '10-12 hrs fasting is essential',
    parameterGroups: [
      {
        groupName: 'Thyroid Profile',
        count: 3,
        items: ['Free Triiodothyronine (FT3)', 'Free Thyroxine (FT4)', 'TSH - Ultrasensitive']
      },
      {
        groupName: 'Lipid Profile+',
        count: 10,
        items: ['Total Cholesterol', 'HDL Cholesterol - Direct', 'LDL Cholesterol - Direct', 'LDL/HDL Ratio', 'Non-HDL Cholesterol', 'TC/HDL Cholesterol Ratio', 'Triglycerides', 'VLDL Cholesterol', 'HDL/LDL Ratio', 'TRIG/HDL Ratio']
      },
      {
        groupName: 'Liver Profile',
        count: 3,
        items: ['SGOT / SGPT Ratio', 'Aspartate Aminotransferase (SGOT)', 'Alanine Transaminase (SGPT)']
      },
      {
        groupName: 'Diabetes Profile',
        count: 2,
        items: ['HbA1c', 'Average Blood Glucose (ABG)']
      },
      {
        groupName: 'Vitamin Profile',
        count: 3,
        items: ['25-OH Vitamin D (Total)', 'Vitamin B-12', 'Folate']
      },
      {
        groupName: 'Iron Deficiency',
        count: 4,
        items: ['Iron', '% Transferrin Saturation', 'Total Iron Binding Capacity (TIBC)', 'Unsat. Iron-binding Capacity (UIBC)']
      },
      {
        groupName: 'Vital Minerals & Renal',
        count: 3,
        items: ['Calcium', 'Magnesium', 'Creatinine - Serum']
      },
      {
        groupName: 'Complete Blood Count',
        count: 28,
        items: ['CBC Complete Hemogram (28 Parameters)']
      }
    ],
    perks: ['Free Doorstep Sample Collection', '100% Sterile Single-Use Vacutainer Kits', 'Instant Digital WhatsApp Report']
  },
  {
    id: 'pkg-heart-advanced',
    title: 'Taz Heart Advanced',
    flyerHeadline: 'Let Your Heart Beat Healthy with Taz',
    badge: 'ADVANCED CARDIAC',
    tagline: '56-Parameter Early Cardiac Risk, Artery Health & Metabolic Screening',
    statCallout: 'Heart Diseases are the leading cause of death in India. Nearly 1 in 3 Deaths in India are caused by Cardiovascular Diseases.',
    price: 2199,
    originalPrice: 5800,
    discount: '62% OFF',
    popular: true,
    accentColor: 'rose',
    testsCount: '56 Parameters',
    reportsIn: 'Same Day Delivery',
    fastingNote: '10-12 hrs fasting is essential',
    parameterGroups: [
      {
        groupName: 'Cardiac Risk Markers',
        count: 6,
        items: ['High sensitivity c-reactive protein (hs-crp)', 'Lipoprotein (a) [lp(a)]', 'Apo b / apo a1 ratio (apo b/a1)', 'Apolipoprotein - a1 (apo-a1)', 'Apolipoprotein - b (apo-b)', 'Homocysteine']
      },
      {
        groupName: 'Lipid Profile+',
        count: 10,
        items: ['Total Cholesterol', 'HDL Cholesterol - Direct', 'LDL Cholesterol - Direct', 'LDL/HDL Ratio', 'Non-HDL Cholesterol', 'TC/HDL Cholesterol Ratio', 'Triglycerides', 'VLDL Cholesterol', 'HDL/LDL Ratio', 'TRIG/HDL Ratio']
      },
      {
        groupName: 'Heart Attack Risk Marker',
        count: 1,
        items: ['Troponin I Heart Attack Risk (ACTNI)']
      },
      {
        groupName: 'Kidney Profile',
        count: 7,
        items: ['BUN/Serum Creatinine Ratio', 'Blood Urea Nitrogen', 'Calcium', 'Serum Creatinine', 'Uric Acid', 'Urea (Calculated)', 'Urea / SR. Creatinine Ratio']
      },
      {
        groupName: 'Diabetes Profile',
        count: 2,
        items: ['HbA1c', 'Average blood glucose (ABG)']
      },
      {
        groupName: 'Serum Electrolytes',
        count: 2,
        items: ['Chloride', 'Sodium']
      },
      {
        groupName: 'Complete Blood Count',
        count: 28,
        items: ['CBC Complete Hemogram (28 Parameters)']
      }
    ],
    perks: ['Free Home Sample Pickup', 'Atherosclerosis & Stroke Risk Indicators', 'Fast-Track Lab Processing']
  },
  {
    id: 'pkg-bone-muscle',
    title: 'Taz Bone And Muscle Health',
    flyerHeadline: 'Boost Your Strength From the Inside. Check Your Bones & Muscles with Taz.',
    badge: 'BONE & JOINT VITALITY',
    tagline: '41-Parameter Bone Density, Muscle Fatigue & Mineral Balance Evaluation',
    statCallout: 'Common Triggers: Nutritional Deficiency, Dietary Issues, Inadequate Sunlight Exposure, Chronic Stress',
    price: 1999,
    originalPrice: 4900,
    discount: '59% OFF',
    popular: false,
    accentColor: 'amber',
    testsCount: '41 Parameters',
    reportsIn: 'Same Day Delivery',
    fastingNote: 'Valid till limited period',
    parameterGroups: [
      {
        groupName: 'Vitamin D Profile',
        count: 3,
        items: ['Vitamin D total', 'Vitamin D2', 'Vitamin D3']
      },
      {
        groupName: 'Serum Albumin-Globulin Ratio',
        count: 4,
        items: ['Serum Alb/Globulin Ratio', 'Protein - Total', 'Albumin - Serum', 'Serum Globulin']
      },
      {
        groupName: 'Essential Bone Minerals',
        count: 3,
        items: ['Phosphorous', 'Magnesium', 'Calcium']
      },
      {
        groupName: 'Hormone & Muscle Enzymes',
        count: 3,
        items: ['Intact Parathyroid Hormone (PTH)', 'Creatinine Phosphokinase (Muscle/Brain - CPK)', 'Myoglobin']
      },
      {
        groupName: 'Complete Blood Count',
        count: 28,
        items: ['CBC Complete Hemogram (28 Parameters)']
      }
    ],
    perks: ['Free Doorstep Collection', 'Early Osteoporosis & Muscle Breakdown Detection', 'Doctor Verified Report']
  },
  {
    id: 'pkg-fertility-female',
    title: 'Taz Fertility Female Check',
    flyerHeadline: 'Mood... Energy.... Fertility.... Everything starts with hormones. Check them in time with Taz.',
    badge: 'FEMALE HORMONAL HEALTH',
    tagline: '35-Parameter Reproductive Hormone & Ovarian Reserve Evaluation',
    statCallout: 'Key Signs to Check: Hair Loss, Fatigue, Weight Changes, Mood Swings, Irregular Cycles',
    price: 2999,
    originalPrice: 6800,
    discount: '56% OFF',
    popular: true,
    accentColor: 'rose',
    testsCount: '35 Parameters',
    reportsIn: 'Same Day Delivery',
    fastingNote: 'Recommended on Day 2-3 of menstrual cycle or as advised by physician',
    parameterGroups: [
      {
        groupName: 'Key Female Hormones',
        count: 6,
        items: ['TSH - Ultrasensitive', 'Follicle Stimulating Hormone (FSH)', 'Luteinising Hormone (LH)', 'Prolactin (PRL)', 'Anti Mullerian Hormone (AMH - Ovarian Reserve)', 'Progesterone']
      },
      {
        groupName: 'Androgens & Adrenal',
        count: 1,
        items: ['DHEA - Sulphate (DHEAS)']
      },
      {
        groupName: 'Complete Blood Count',
        count: 28,
        items: ['CBC Complete Hemogram (28 Parameters)']
      }
    ],
    perks: ['Confidential & Private Processing', 'CLIA High-Sensitivity Testing', 'Free Home Sample Pickup']
  },
  {
    id: 'pkg-fertility-male',
    title: 'Taz Fertility Male Check',
    flyerHeadline: 'Mood... Energy.... Fertility.... Everything starts with hormones. Check them in time with Taz.',
    badge: 'MALE HORMONAL HEALTH',
    tagline: '33-Parameter Testosterone, Energy & Reproductive Hormone Assessment',
    statCallout: 'Key Signs to Check: Hair Loss, Fatigue, Low Energy, Mood Swings, Muscle Loss',
    price: 1199,
    originalPrice: 3200,
    discount: '62% OFF',
    popular: false,
    accentColor: 'sky',
    testsCount: '33 Parameters',
    reportsIn: 'Same Day Delivery',
    fastingNote: 'Early morning sample preferred (between 7 AM – 10 AM)',
    parameterGroups: [
      {
        groupName: 'Key Male Hormones',
        count: 5,
        items: ['TSH - Ultrasensitive', 'Follicle Stimulating Hormone (FSH)', 'Luteinising Hormone (LH)', 'Prolactin (PRL)', 'Testosterone Total']
      },
      {
        groupName: 'Complete Blood Count',
        count: 28,
        items: ['CBC Complete Hemogram (28 Parameters)']
      }
    ],
    perks: ['Free Home Sample Pickup', 'Automated Immunoassay', 'Doctor-Reviewed Report']
  }
];

export const TIMELINE_MILESTONES = [
  {
    year: '2012',
    title: 'Foundation by Mahammad Abdul Rajak',
    description: 'Established at Tallapudi, Rajahmundry with a vision to deliver hospital-grade computerized automated laboratory testing at honest, fair pricing.',
    icon: 'Building2'
  },
  {
    year: '2017',
    title: '100% NABL Quality Standards',
    description: 'Standardized automated biochemistry lines, barcode patient sample tracking, and daily internal QC calibrations.',
    icon: 'Award'
  },
  {
    year: '2022',
    title: 'Doorstep Phlebotomy Fleet Expansion',
    description: 'Pioneered free home sample collection with sterile single-use vacuum kits across Tallapudi, Rajahmundry, and surrounding regions.',
    icon: 'Zap'
  },
  {
    year: '2026',
    title: '24/7 Automated Testing & Smart WhatsApp Delivery',
    description: 'Round-the-clock emergency lab operation and instant color-coded smart reports delivered on WhatsApp.',
    icon: 'Sparkles'
  }
];

export const LAB_STATS = [
  { value: '250,000+', label: 'Patients Tested', icon: 'Users', color: 'sky' },
  { value: '99.85%', label: 'Clinical Precision Rate', icon: 'Target', color: 'emerald' },
  { value: '24/7', label: 'Computerized Automated Lab', icon: 'Clock', color: 'sky' },
  { value: '100%', label: 'NABL Quality Standards', icon: 'ShieldCheck', color: 'rose' },
];

export const TESTIMONIALS = [
  {
    name: 'M. Teja',
    role: 'Patient - Tallapudi',
    comment: 'Taz Diagnostic provided exceptional doorstep blood collection in Tallapudi. The phlebotomist was on time with sterile vacutainer needles and I received my computerized 56-parameter report on WhatsApp the same afternoon.',
    rating: 5,
    city: 'Tallapudi',
    verified: true
  },
  {
    name: 'Venkat',
    role: 'Patient - Gajaram',
    comment: 'Booked the Taz Heart Advanced package from Gajaram. Very convenient home sample pickup, accurate automated results, and the most affordable pricing in our area. Highly recommend!',
    rating: 5,
    city: 'Gajaram',
    verified: true
  },
  {
    name: 'Haneef',
    role: 'Patient - Chidipi',
    comment: 'We regularly get our family routine tests and blood sugar profiles done through Taz Diagnostic in Chidipi. Mr. Mahammad Abdul Rajak\'s team ensures 100% precision and prompt report dispatch.',
    rating: 5,
    city: 'Chidipi',
    verified: true
  },
  {
    name: 'Maleen',
    role: 'Patient - Kovvur',
    comment: 'Fast doorstep sample pickup right in Kovvur. The sterile single-use vacuum kit and automated laboratory testing gave us total peace of mind. Direct WhatsApp PDF report was very convenient!',
    rating: 5,
    city: 'Kovvur',
    verified: true
  }
];
