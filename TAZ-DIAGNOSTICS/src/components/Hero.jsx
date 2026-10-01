import React, { useState } from 'react';
import { 
  Calendar, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Clock, 
  Droplets, 
  HeartPulse, 
  FileText,
  Zap,
  Sparkles,
  MapPin,
  PhoneCall
} from 'lucide-react';
import { CONTACT_INFO } from '../data/testsData';

export default function Hero({ onOpenBooking, onSearch, contactInfo = CONTACT_INFO, onOpenPrescriptionScanner }) {
  const info = contactInfo || CONTACT_INFO;
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero" className="relative py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-50/50 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Quality Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/80 text-sky-800 text-xs font-extrabold uppercase tracking-wide mb-4 border border-sky-200 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>24/7 Computerized Automated Diagnostic Laboratory</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black font-display tracking-tight text-slate-900 leading-[1.18] mb-4">
            Clinical Precision & <br className="hidden sm:inline" />
            <span className="text-sky-600">Automated Pathology</span> <br />
            You Can Trust 100%.
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-2xl font-normal leading-relaxed">
            Welcome to <strong className="text-slate-900 font-bold">Taz Diagnostic Center</strong> (Founded by <strong className="text-slate-900 font-bold">{info.founderName || 'Mahammad Abdul Rajak'}</strong>). We offer 24/7 computerized blood testing, specialized hormone assays, full body health packages, and hygienic doorstep sample pickup across <strong className="text-slate-900">Tallapudi, Rajahmundry</strong>.
          </p>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="w-full max-w-xl mb-6 p-1.5 rounded-2xl bg-white border-2 border-sky-300 shadow-md flex items-center gap-2 focus-within:border-sky-500 transition-all"
          >
            <div className="pl-3 text-sky-600">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tests (e.g., Post Delivery, CBC, Thyroid, Heart Advanced, Bone Health)..."
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none px-2 py-2"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-sm shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-6 w-full sm:w-auto">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Test / Home Pickup</span>
            </button>

            {onOpenPrescriptionScanner && (
              <button
                onClick={() => onOpenPrescriptionScanner()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95 border border-emerald-400/30"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>📸 Upload Doctor Slip (Rx)</span>
              </button>
            )}

            <a
              href={`tel:${info.phone}`}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-slate-300 hover:border-sky-500 flex items-center justify-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-sky-600" />
              <span>Call: {info.phoneDisplay || info.phone}</span>
            </a>
          </div>

          {/* Quick Jump Interactive Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <a
              href="#anatomy-explorer"
              className="px-3 py-1.5 rounded-xl bg-slate-900 text-sky-300 text-xs font-bold hover:bg-slate-800 flex items-center gap-1.5 transition-all border border-slate-700 shadow-sm"
            >
              <span>🫀 Anatomy Health Explorer</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="#custom-builder"
              className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5 transition-all border border-emerald-200 shadow-sm"
            >
              <span>🧮 Build Custom Package (Save 35%)</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-3 gap-3 pt-5 border-t border-slate-200 w-full max-w-xl text-xs text-slate-700 font-semibold">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free Doorstep Pickup</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600 shrink-0" />
              <span>WhatsApp Smart Reports</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
              <span>NABL Standard Lab</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Quality Laboratory Telemetry Hub Card */}
        <div className="lg:col-span-5 flex justify-center items-center">
          
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-sky-600 via-teal-500 to-amber-500"></div>

            {/* Hub Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                  <Activity className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-slate-900">Taz Computerized Lab Hub</h2>
                  <p className="text-[11px] text-slate-500">Tallapudi, Rajahmundry Center</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                24/7 OPEN
              </span>
            </div>

            {/* Founder Quick Snippet Card */}
            <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3.5">
              <img
                src="/founder.jpg"
                alt="Mahammad Abdul Rajak"
                className="w-12 h-12 rounded-xl object-cover object-top border border-slate-300 shrink-0 shadow-sm"
              />
              <div>
                <div className="text-xs font-bold text-slate-900">{CONTACT_INFO.founderName}</div>
                <div className="text-[11px] text-sky-600 font-semibold">{CONTACT_INFO.founderTitle}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Committed to Clinical Precision</div>
              </div>
            </div>

            {/* Live Testing Parameters Preview */}
            <div className="mt-4 p-3.5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-700 font-bold flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-600" /> Automated Hemogram Assay
                </span>
                <span className="text-emerald-600 font-mono font-bold text-[11px]">99.8% QC Verified</span>
              </div>
              
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-600 to-teal-500 w-[96%] rounded-full"></div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-[10px] text-slate-500">Hemoglobin</div>
                  <div className="font-extrabold text-sky-700 text-xs">14.8 g/dL</div>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-[10px] text-slate-500">Fasting Sugar</div>
                  <div className="font-extrabold text-emerald-700 text-xs">92 mg/dL</div>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-[10px] text-slate-500">Thyroid TSH</div>
                  <div className="font-extrabold text-indigo-700 text-xs">2.1 µIU/mL</div>
                </div>
              </div>
            </div>

            {/* Quick Contact Line */}
            <div className="mt-4 p-3 rounded-xl bg-slate-100 flex items-center justify-between text-xs text-slate-700">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-red-500" /> Tallapudi, Rajahmundry
              </span>
              <a href={`tel:${CONTACT_INFO.phone}`} className="font-bold text-sky-600 hover:underline">
                Call: {CONTACT_INFO.phone}
              </a>
            </div>

            {/* Direct Booking Trigger */}
            <button
              onClick={() => onOpenBooking()}
              className="mt-4 w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <span>Instant Test Reservation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
