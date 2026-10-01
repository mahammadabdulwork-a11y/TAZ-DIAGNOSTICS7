import React from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  QrCode, 
  CheckCircle, 
  Activity, 
  Microscope, 
  FileCheck
} from 'lucide-react';

export default function TechnologyAdvantage() {
  const techFeatures = [
    {
      icon: Microscope,
      title: 'Automated 5-Part Analyzers',
      description: 'Zero human touch automated hematology & chemistry lines eliminate sample mix-ups and pre-analytical errors.',
      tag: 'Zero Error'
    },
    {
      icon: Activity,
      title: 'Chemiluminescence (CLIA)',
      description: 'Ultra-sensitive 4th-generation CLIA platform for precise thyroid, fertility hormones, Troponin, and vitamin assays.',
      tag: 'CLIA Precision'
    },
    {
      icon: QrCode,
      title: 'Barcoded Specimen Chain',
      description: 'Every vacutainer tube is assigned a unique biometric barcode, tracked at temperature-monitored checkpoints.',
      tag: '100% Tracking'
    },
    {
      icon: Smartphone,
      title: 'WhatsApp Smart Reports',
      description: 'Interactive PDF with color-coded normal/abnormal visual gauges, reference values, and instant download.',
      tag: 'Same Day'
    }
  ];

  return (
    <section id="technology" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200">
            <Microscope className="w-4 h-4 text-sky-600" />
            <span>Automated Laboratory Quality Systems</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
            The <span className="text-sky-600">Taz Diagnostic</span> Quality Advantage
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            We operate computerized automated pathology lines with continuous internal calibrators and certified reference controls.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {techFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white text-sky-800 border border-slate-200">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>NABL Standard QC Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Smart Report Preview */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-3.5">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-4 h-4" /> Next-Gen Smart Diagnostic Reports
              </span>
              <h3 className="text-2xl font-black font-display text-slate-900">
                Understand Your Results at a Glance
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Clear, visual, color-coded pathology reports delivered directly to your WhatsApp with biological reference ranges and doctor insights.
              </p>
              
              <ul className="space-y-2 pt-1 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  <span><strong>Visual Range Gauge:</strong> Clear Green (Normal) vs Alert indicator</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span><strong>WhatsApp Instant PDF:</strong> Direct download without waiting</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span><strong>QR Verification:</strong> Scan to verify certified authenticity</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md p-5 rounded-2xl bg-white border border-slate-200 shadow-md space-y-3.5">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                    <span className="text-xs font-bold text-slate-900">Sample Smart Report Preview</span>
                  </div>
                  <span className="text-[10px] font-mono text-sky-600 font-bold">ID: TAZ-2026-9882</span>
                </div>

                {/* Param 1: Hemoglobin */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>Hemoglobin (Hb)</span>
                    <span className="text-emerald-600">14.8 g/dL (Normal)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
                    <div className="w-1/4 bg-amber-200"></div>
                    <div className="w-1/2 bg-emerald-500 relative">
                      <div className="absolute right-4 top-0 bottom-0 w-1 bg-white"></div>
                    </div>
                    <div className="w-1/4 bg-rose-200"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>11.0 (Low)</span>
                    <span>13.0 - 17.0 g/dL Target</span>
                    <span>18.0 (High)</span>
                  </div>
                </div>

                {/* Param 2: Fasting Glucose */}
                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>Fasting Blood Glucose</span>
                    <span className="text-sky-600">92 mg/dL (Optimal)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
                    <div className="w-1/3 bg-emerald-500 relative">
                      <div className="absolute right-6 top-0 bottom-0 w-1 bg-white"></div>
                    </div>
                    <div className="w-1/3 bg-amber-200"></div>
                    <div className="w-1/3 bg-rose-200"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>70 - 99 Optimal</span>
                    <span>100 - 125 Prediabetes</span>
                    <span>126+ Alert</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="inline-block text-[11px] text-sky-800 font-bold bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                    ✓ Verified by Senior Pathologist MD
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
