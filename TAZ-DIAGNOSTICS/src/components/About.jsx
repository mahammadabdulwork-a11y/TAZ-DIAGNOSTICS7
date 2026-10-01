import React, { useState } from 'react';
import { 
  Sparkles, 
  Microscope, 
  Heart, 
  Clock, 
  CheckCircle2,
  Stethoscope,
  ChevronRight,
  Droplets,
  ShieldCheck
} from 'lucide-react';
import { TIMELINE_MILESTONES, CONTACT_INFO } from '../data/testsData';

export default function About({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      icon: Microscope,
      title: 'Automated 5-Part Hematology',
      desc: 'Zero-human-touch 5-part cell counting for precision differential WBC, platelet indices, and hemoglobin.',
    },
    {
      icon: Droplets,
      title: 'CLIA Immunoassay Precision',
      desc: 'Chemiluminescence testing for ultra-sensitive thyroid, fertility hormones, Troponin, and vitamin levels.',
    },
    {
      icon: Heart,
      title: 'Compassionate Doorstep Service',
      desc: 'Hygienic single-use vacuum venipuncture kits with punctual, empathetic phlebotomists for families.',
    },
    {
      icon: Clock,
      title: '24/7 Computerized Testing',
      desc: 'Round-the-clock emergency lab operation with rapid turnaround for critical parameters.',
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Our Heritage & Purpose</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
            Trust & Clinical Excellence at <span className="text-sky-600">Taz Diagnostic</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Founded by <strong className="text-slate-900 font-bold">{CONTACT_INFO.founderName}</strong> at Tallapudi, Rajahmundry to deliver automated diagnostic testing at transparent and fair rates.
          </p>
        </div>

        {/* 2-Column Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-md">
              <h3 className="text-xl font-bold font-display text-slate-900 mb-3 flex items-center gap-2.5">
                <Stethoscope className="w-5 h-5 text-sky-600" />
                The Mission Behind Every Diagnostic Report
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                At <strong className="text-slate-900">Taz Diagnostic Center</strong>, we recognize that accurate laboratory diagnosis forms the bedrock of clinical medical decisions.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Whether you visit our center at <strong className="text-slate-900">{CONTACT_INFO.landmark}</strong> or request our home collection service, every specimen is barcoded, multi-level verified by pathologists, and analyzed on automated platforms.
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5 pt-5 border-t border-slate-100 font-medium">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% NABL Quality Standards</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Senior Pathologist Review</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sterile Vacuum Tube Collections</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant WhatsApp Report Delivery</span>
                </div>
              </div>
            </div>

            {/* Leadership Quote */}
            <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm italic text-slate-800 leading-relaxed font-medium">
                  "Behind every blood sample is a human life, a family, and an anxious heart awaiting clarity. Our clinical vow is precision without compromise."
                </p>
                <div className="mt-1.5 text-xs font-bold text-sky-800">
                  — {CONTACT_INFO.founderName}, Founder of Taz Diagnostic
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-3.5">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 text-sky-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Timeline Milestones */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Evolution of Excellence</span>
              <h3 className="text-xl font-black font-display text-slate-900 mt-0.5">Taz Diagnostic Journey</h3>
            </div>
            <button
              onClick={() => onOpenBooking()}
              className="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold transition-all flex items-center gap-1.5 w-fit"
            >
              <span>Book with Taz</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {TIMELINE_MILESTONES.map((item, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl border transition-all ${
                  activeTab === idx 
                    ? 'bg-sky-50/60 border-sky-400 shadow-sm' 
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => setActiveTab(idx)}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-black font-display text-sky-600">{item.year}</span>
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
