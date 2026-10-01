import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  FileText, 
  User, 
  Share2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Activity,
  ArrowRight
} from 'lucide-react';
import { CONTACT_INFO } from '../data/testsData';

export default function ReportViewerModal({ isOpen, onClose, booking, contactInfo = CONTACT_INFO }) {
  if (!isOpen || !booking) return null;

  const info = contactInfo || CONTACT_INFO;
  const report = booking.report || {};

  const handlePrint = () => {
    window.print();
  };

  // Default parameters matching the official TAZ Diagnostic investigation sheet
  const defaultHaematology = [
    {
      parameter: 'Haemoglobin',
      result: report.results?.find(r => r.parameter?.toLowerCase().includes('haemoglobin') || r.parameter?.toLowerCase().includes('hemoglobin'))?.value || '12',
      unit: 'gms %',
      reference: 'Male: 14 - 17 gms %\nFemale: 12 - 15 gms %\nChild: 11.0 - 14.0 gms %'
    },
    {
      parameter: 'Total R.B.C. Count',
      result: report.results?.find(r => r.parameter?.toLowerCase().includes('r.b.c') || r.parameter?.toLowerCase().includes('rbc'))?.value || '542',
      unit: 'mil/cu.mm',
      reference: '4.5 - 5.5 mil/cu.mm'
    },
    {
      parameter: 'Total W.B.C. Count',
      result: report.results?.find(r => r.parameter?.toLowerCase().includes('w.b.c') || r.parameter?.toLowerCase().includes('wbc'))?.value || '5456',
      unit: '/cu.mm',
      reference: '4,000 - 11,000 /cu.mm'
    },
    {
      parameter: 'Platelet Count',
      result: report.results?.find(r => r.parameter?.toLowerCase().includes('platelet'))?.value || '465',
      unit: 'Lakhs/cu.mm',
      reference: '1.5 - 4.5 Lakhs/cu.mm'
    },
    {
      parameter: 'DC Count',
      result: '65',
      unit: '%',
      reference: 'Differential Leucocyte Count'
    },
    {
      parameter: 'Polymorphs',
      result: '651',
      unit: '%',
      reference: '40 - 75 %'
    },
    {
      parameter: 'Lymphocytes',
      result: '6+',
      unit: '%',
      reference: '20 - 45 %'
    },
    {
      parameter: 'Eosinophils',
      result: '56',
      unit: '%',
      reference: '1 - 6 %'
    },
    {
      parameter: 'Monocytes',
      result: '65',
      unit: '%',
      reference: '2 - 8 %'
    },
    {
      parameter: 'ESR',
      result: report.results?.find(r => r.parameter?.toLowerCase().includes('esr'))?.value || '—',
      unit: 'mm/1st hr',
      reference: 'Male: 0 - 15, Female: 0 - 20 (Westergren)'
    },
    {
      parameter: 'Bleeding Time',
      result: '—',
      unit: 'min:sec',
      reference: "2 - 7 mins (Duke's method)"
    },
    {
      parameter: 'Clotting Time',
      result: '—',
      unit: 'min:sec',
      reference: '3 - 8 mins (Lee-White method)'
    }
  ];

  const defaultBiochemistry = [
    {
      parameter: 'Fasting Blood Sugar',
      method: '( Method : GOD-POD )',
      result: report.results?.find(r => r.parameter?.toLowerCase().includes('fasting') || r.parameter?.toLowerCase().includes('fbs'))?.value || '—',
      unit: 'mg/dl',
      reference: '70 - 110 mg/dl'
    },
    {
      parameter: 'Post Prandial Blood Sugar',
      method: '( Method : GOD-POD )',
      result: report.results?.find(r => r.parameter?.toLowerCase().includes('post') || r.parameter?.toLowerCase().includes('ppbs'))?.value || '—',
      unit: 'mg/dl',
      reference: 'Up to 140 mg/dl'
    }
  ];

  const defaultSpecial = [
    {
      parameter: 'HbA1c',
      result: report.results?.find(r => r.parameter?.toLowerCase().includes('hba1c'))?.value || '—',
      unit: '%',
      reference: 'Normal: < 5.7%, Diabetic: ≥ 6.5%'
    }
  ];

  // If custom test results were added dynamically that don't match the standard three
  const customExtraResults = report.results?.filter(r => 
    !['haemoglobin', 'hemoglobin', 'rbc', 'wbc', 'platelet', 'esr', 'fasting', 'fbs', 'post', 'ppbs', 'hba1c'].some(key => 
      r.parameter?.toLowerCase().includes(key)
    )
  ) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-fadeIn print:p-0 print:bg-white">
      
      {/* Outer Modal Container (Responsive Width & Height) */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-2 sm:my-4 flex flex-col max-h-[96dvh] sm:max-h-[94vh] print:max-h-none print:shadow-none print:border-none print:m-0 print:rounded-none">
        
        {/* Top Floating Control Bar (Hidden in Print) */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-[#5B0A1A] via-[#7B1122] to-[#5B0A1A] text-white flex items-center justify-between print:hidden border-b border-[#400712] shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h3 className="text-xs sm:text-sm font-black font-display text-white tracking-wide flex items-center gap-1.5 truncate">
                <span className="truncate">Official TAZ Diagnostic Report</span>
                <span className="text-[9px] sm:text-[10px] bg-emerald-500 text-slate-950 font-extrabold px-1.5 py-0.2 rounded shrink-0">
                  VERIFIED
                </span>
              </h3>
              <p className="text-[10px] sm:text-[11px] text-rose-100 truncate">
                Patient: <strong className="text-white">{booking.patientName}</strong> • Ref: {booking.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white text-[#5B0A1A] hover:bg-rose-50 text-xs font-black flex items-center gap-1.5 shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden xs:inline sm:inline">Print / Save PDF</span>
              <span className="xs:hidden sm:hidden">Print</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              title="Close Report"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Medical Report Canvas */}
        <div className="p-2 sm:p-6 md:p-10 overflow-y-auto bg-white print:p-0 print:overflow-visible flex-grow">
          
          {/* Main A4 Bordered Sheet (Matching Exact Maroon Theme from Image) */}
          <div className="border-[2px] border-[#5B0A1A] p-3 sm:p-6 md:p-8 bg-white font-sans text-slate-900 shadow-sm print:shadow-none min-h-[950px] sm:min-h-[1050px] flex flex-col justify-between rounded-lg sm:rounded-none">
            
            <div>
              {/* Top Header Strip */}
              <div className="flex flex-wrap items-center justify-between border-b-2 border-[#5B0A1A] pb-1.5 mb-4 sm:mb-5 relative gap-2">
                {/* Lab Report Badge */}
                <div className="bg-[#5B0A1A] text-white px-3 sm:px-5 py-1 text-[11px] sm:text-xs md:text-sm font-black tracking-widest uppercase rounded-l-none rounded-r-md -ml-3 sm:-ml-6 md:-ml-8 shadow-xs">
                  LAB REPORT
                </div>

                {/* Center Core Values */}
                <div className="text-[10px] sm:text-xs font-black tracking-wider sm:tracking-widest text-[#5B0A1A] uppercase text-center font-display">
                  ACCURACY &nbsp;|&nbsp; TRUST &nbsp;|&nbsp; CARE
                </div>

                {/* Page Pill */}
                <div className="bg-[#5B0A1A] text-white px-3 sm:px-4 py-0.5 sm:py-1 text-[9px] sm:text-xs font-black tracking-wider uppercase rounded-full shadow-xs">
                  PAGE 1 OF 1
                </div>
              </div>

              {/* Clinic Brand & Header Details (Responsive Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center pb-4 sm:pb-5 mb-3 sm:mb-4 border-b md:border-b-0 border-slate-100">
                
                {/* Brand Logo & Name */}
                <div className="md:col-span-5 flex items-center gap-2.5 sm:gap-3">
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full border-2 border-[#5B0A1A] flex items-center justify-center shrink-0 bg-rose-50/50 p-1.5 sm:p-2 shadow-inner">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 text-[#5B0A1A]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 18h8" />
                      <path d="M3 22h18" />
                      <path d="M14 22a7 7 0 1 0 0-14h-1" />
                      <path d="M9 14h2" />
                      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
                      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
                    </svg>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl md:text-3xl font-black font-display tracking-tight text-[#5B0A1A]">
                        TAZ<sup className="text-[10px] sm:text-xs">®</sup>
                      </span>
                    </div>
                    <div className="text-[11px] sm:text-xs md:text-sm font-black tracking-[0.2em] sm:tracking-[0.25em] text-[#5B0A1A] uppercase">
                      DIAGNOSTIC
                    </div>
                    <div className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-slate-700 uppercase tracking-wide">
                      LABORATORY & DIAGNOSTIC CENTRE
                    </div>
                    <div className="text-[7.5px] sm:text-[8px] md:text-[9px] font-semibold text-slate-500 uppercase tracking-tight mt-0.5">
                      NABL ACCREDITED MEDICAL LAB | ISO 9001:2015
                    </div>
                  </div>
                </div>

                {/* Center Contact Coordinates */}
                <div className="md:col-span-4 text-[10px] sm:text-[11px] text-slate-700 space-y-0.5 sm:space-y-1 font-medium md:border-l md:border-r border-slate-200 md:px-3">
                  <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                    <Phone className="w-3 h-3 text-[#5B0A1A]" />
                    <span>{info.phone || '9440985131'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Mail className="w-3 h-3 text-[#5B0A1A]" />
                    <span>{info.email || 'tazdiagnostic@gmail.com'}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-600">
                    <MapPin className="w-3 h-3 text-[#5B0A1A] shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{info.address || 'Dr No: 8-200 RAJKUMAR SILKS, Main Road, Tallapudi, Rajahmundry-534341'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                    <Clock className="w-3 h-3 text-[#5B0A1A]" />
                    <span>24/7 Computerized Automated Lab</span>
                  </div>
                </div>

                {/* Right Trust Indicators */}
                <div className="md:col-span-3 flex flex-row md:flex-col justify-between md:justify-start text-[9.5px] sm:text-[10px] md:text-[11px] font-bold text-[#5B0A1A] gap-1.5 md:space-y-1.5 md:pl-2">
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm">🔬</span>
                    <span className="tracking-wide uppercase">ACCURATE RESULTS</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm">🛡️</span>
                    <span className="tracking-wide uppercase">TRUSTED CARE</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm">👥</span>
                    <span className="tracking-wide uppercase">HEALTHIER TOMORROW</span>
                  </div>
                </div>

              </div>

              {/* Maroon Title Ribbon */}
              <div className="bg-[#5B0A1A] text-white rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3 mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3 shadow-sm">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider font-display leading-tight">
                    COMPREHENSIVE CLINICAL LABORATORY INVESTIGATION REPORT
                  </h2>
                  <p className="text-[8px] sm:text-[9px] md:text-[10px] text-rose-200 tracking-wide mt-0.5">
                    DEPARTMENT OF PATHOLOGY & DIAGNOSTICS &nbsp;|&nbsp; COMPUTERIZED ANALYSIS
                  </p>
                </div>
              </div>

              {/* Patient Information Card */}
              <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/70 p-3 sm:p-4 mb-4 sm:mb-5 relative">
                <div className="absolute -top-2.5 sm:-top-3 left-3 sm:left-4 bg-[#5B0A1A] text-white px-2.5 sm:px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow-xs">
                  <User className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>PATIENT INFORMATION</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 sm:gap-y-2 gap-x-4 sm:gap-x-6 text-[11px] sm:text-xs pt-1 sm:pt-1.5">
                  {/* Left Column */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <div className="grid grid-cols-12">
                      <span className="col-span-5 sm:col-span-5 font-bold text-slate-700 flex items-center gap-1">
                        <span>🪪</span> Patient ID
                      </span>
                      <span className="col-span-7 sm:col-span-7 font-mono font-bold text-slate-900">: {booking.id || 'PAT001'}</span>
                    </div>

                    <div className="grid grid-cols-12">
                      <span className="col-span-5 sm:col-span-5 font-bold text-slate-700 flex items-center gap-1">
                        <span>👤</span> Patient Name
                      </span>
                      <span className="col-span-7 sm:col-span-7 font-black text-slate-900 text-xs sm:text-sm">: {booking.patientName || 'naus'}</span>
                    </div>

                    <div className="grid grid-cols-12">
                      <span className="col-span-5 sm:col-span-5 font-bold text-slate-700 flex items-center gap-1">
                        <span>👥</span> Age / Gender
                      </span>
                      <span className="col-span-7 sm:col-span-7 font-medium text-slate-800">: {booking.age || '45'} Yrs / {booking.gender || 'Male'}</span>
                    </div>

                    <div className="grid grid-cols-12">
                      <span className="col-span-5 sm:col-span-5 font-bold text-slate-700 flex items-center gap-1">
                        <span>📞</span> Phone
                      </span>
                      <span className="col-span-7 sm:col-span-7 font-semibold text-slate-800">: {booking.phone || '8983697767'}</span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <div className="grid grid-cols-12">
                      <span className="col-span-5 sm:col-span-5 font-bold text-slate-700 flex items-center gap-1">
                        <span>📄</span> Report Code
                      </span>
                      <span className="col-span-7 sm:col-span-7 font-mono font-bold text-slate-900">: {report.reportCode || 'REP001'}</span>
                    </div>

                    <div className="grid grid-cols-12">
                      <span className="col-span-5 sm:col-span-5 font-bold text-slate-700 flex items-center gap-1">
                        <span>📅</span> Report Date
                      </span>
                      <span className="col-span-7 sm:col-span-7 font-medium text-slate-800">
                        : {report.uploadedAt || booking.date || '28-Sep-2026'}
                      </span>
                    </div>

                    <div className="grid grid-cols-12">
                      <span className="col-span-5 sm:col-span-5 font-bold text-slate-700 flex items-center gap-1">
                        <span>🩺</span> Referred By
                      </span>
                      <span className="col-span-7 sm:col-span-7 font-medium text-slate-800">: {booking.doctorName || 'Self'}</span>
                    </div>

                    <div className="grid grid-cols-12 items-center">
                      <span className="col-span-5 sm:col-span-5 font-bold text-slate-700 flex items-center gap-1">
                        <span>⚡</span> Status
                      </span>
                      <div className="col-span-7 sm:col-span-7 flex items-center gap-1">
                        <span>:</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 font-extrabold text-[10px] sm:text-[11px] inline-flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span>Completed</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsive Results Table Wrapper */}
              <div className="overflow-x-auto -mx-1 sm:mx-0 pb-2">
                <div className="min-w-[480px] sm:min-w-full">
                  
                  {/* Table Column Headers */}
                  <div className="border-t-2 border-b-2 border-[#5B0A1A] py-1.5 sm:py-2 px-1 sm:px-2 grid grid-cols-12 text-[10px] sm:text-xs font-black text-[#5B0A1A] uppercase tracking-wider mb-2 sm:mb-3">
                    <div className="col-span-5">TEST DESCRIPTION</div>
                    <div className="col-span-2 text-center">RESULT</div>
                    <div className="col-span-2 text-center">UNITS</div>
                    <div className="col-span-3 text-left">BIOLOGICAL REFERENCE RANGES</div>
                  </div>

                  {/* SECTION 1: HAEMATOLOGY REPORT */}
                  <div className="mb-4 sm:mb-5">
                    <div className="text-center font-black text-xs sm:text-sm text-[#5B0A1A] uppercase tracking-widest py-1 mb-1.5 sm:mb-2">
                      HAEMATOLOGY REPORT
                    </div>

                    <div className="space-y-0.5 sm:space-y-1 text-[11px] sm:text-xs">
                      {defaultHaematology.map((row, idx) => (
                        <div key={idx} className="grid grid-cols-12 py-1 px-1 sm:px-2 hover:bg-rose-50/30 transition-colors items-start">
                          <div className="col-span-5 font-bold text-slate-900">
                            {row.parameter}
                          </div>
                          <div className="col-span-2 font-black text-slate-900 text-center flex items-center justify-center gap-1">
                            <span className="text-slate-400 font-normal">:</span>
                            <span>{row.result}</span>
                          </div>
                          <div className="col-span-2 text-slate-700 text-center font-medium">
                            {row.unit}
                          </div>
                          <div className="col-span-3 text-slate-600 text-[10px] sm:text-[11px] whitespace-pre-line leading-tight">
                            {row.reference}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 2: BIO-CHEMISTRY REPORT */}
                  <div className="mb-4 sm:mb-5">
                    <div className="text-center font-black text-xs sm:text-sm text-[#5B0A1A] uppercase tracking-widest py-1 mb-1.5 sm:mb-2">
                      BIO-CHEMISTRY REPORT
                    </div>

                    <div className="space-y-0.5 sm:space-y-1 text-[11px] sm:text-xs">
                      {defaultBiochemistry.map((row, idx) => (
                        <div key={idx} className="grid grid-cols-12 py-1 px-1 sm:px-2 hover:bg-rose-50/30 transition-colors items-start">
                          <div className="col-span-5">
                            <span className="font-bold text-slate-900">{row.parameter}</span>
                            {row.method && (
                              <div className="text-[9px] sm:text-[10px] text-slate-500 italic">{row.method}</div>
                            )}
                          </div>
                          <div className="col-span-2 font-black text-slate-900 text-center flex items-center justify-center gap-1">
                            <span className="text-slate-400 font-normal">:</span>
                            <span>{row.result}</span>
                          </div>
                          <div className="col-span-2 text-slate-700 text-center font-medium">
                            {row.unit}
                          </div>
                          <div className="col-span-3 text-slate-600 text-[10px] sm:text-[11px]">
                            {row.reference}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 3: SPECIAL INVESTIGATION REPORT */}
                  <div className="mb-4 sm:mb-6">
                    <div className="text-center font-black text-xs sm:text-sm text-[#5B0A1A] uppercase tracking-widest py-1 mb-1.5 sm:mb-2">
                      SPECIAL INVESTIGATION REPORT
                    </div>

                    <div className="space-y-0.5 sm:space-y-1 text-[11px] sm:text-xs">
                      {defaultSpecial.map((row, idx) => (
                        <div key={idx} className="grid grid-cols-12 py-1 px-1 sm:px-2 hover:bg-rose-50/30 transition-colors items-start">
                          <div className="col-span-5 font-bold text-slate-900">
                            {row.parameter}
                          </div>
                          <div className="col-span-2 font-black text-slate-900 text-center flex items-center justify-center gap-1">
                            <span className="text-slate-400 font-normal">:</span>
                            <span>{row.result}</span>
                          </div>
                          <div className="col-span-2 text-slate-700 text-center font-medium">
                            {row.unit}
                          </div>
                          <div className="col-span-3 text-slate-600 text-[10px] sm:text-[11px]">
                            {row.reference}
                          </div>
                        </div>
                      ))}

                      {/* Extra custom results if any were entered */}
                      {customExtraResults.map((row, idx) => (
                        <div key={'extra-' + idx} className="grid grid-cols-12 py-1 px-1 sm:px-2 hover:bg-rose-50/30 transition-colors items-start">
                          <div className="col-span-5 font-bold text-slate-900">
                            {row.parameter}
                          </div>
                          <div className="col-span-2 font-black text-slate-900 text-center flex items-center justify-center gap-1">
                            <span className="text-slate-400 font-normal">:</span>
                            <span>{row.value}</span>
                          </div>
                          <div className="col-span-2 text-slate-700 text-center font-medium">
                            {row.unit || '—'}
                          </div>
                          <div className="col-span-3 text-slate-600 text-[10px] sm:text-[11px]">
                            {row.normal || 'Standard Range'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Bottom Footer Section */}
            <div className="pt-3 sm:pt-4 mt-4 sm:mt-6">
              
              {/* End of Report Dotted Line */}
              <div className="border-t border-dashed border-[#5B0A1A] pt-2 mb-4 sm:mb-6 text-center text-[9px] sm:text-[10px] text-slate-500 font-medium tracking-wider">
                ------- End of the report -------
              </div>

              {/* Signatures & Accreditation */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 px-1 sm:px-2">
                <div className="text-[9px] sm:text-[10px] text-slate-400 text-center sm:text-left max-w-xs space-y-0.5">
                  <div>* Specimen processed on calibrated computerized multi-analyzers.</div>
                  <div>* Results relate only to the items tested.</div>
                  <div className="font-bold text-[#5B0A1A]">TAZ DIAGNOSTIC • TALLAPUDI</div>
                </div>

                {/* Signature Block Matching Image */}
                <div className="text-center space-y-0.5 sm:space-y-1">
                  {/* Handwritten Signature SVG */}
                  <div className="w-24 sm:w-28 mx-auto flex items-center justify-center text-[#5B0A1A]">
                    <svg viewBox="0 0 120 40" className="w-20 sm:w-24 h-7 sm:h-8 text-[#5B0A1A]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 25 C 20 10, 30 35, 45 20 C 55 10, 65 30, 80 15 C 90 25, 100 15, 110 25" />
                      <path d="M35 22 Q 50 5, 70 24" />
                    </svg>
                  </div>
                  <div className="text-[11px] sm:text-xs font-black text-slate-900">Lab Technician</div>
                  <div className="text-[10px] sm:text-[11px] font-black text-[#5B0A1A] tracking-wider uppercase">
                    TAZ DIAGNOSTICS
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
