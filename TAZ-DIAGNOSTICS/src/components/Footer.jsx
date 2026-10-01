import React from 'react';
import { 
  Activity, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ArrowUp,
  Droplets
} from 'lucide-react';
import { CONTACT_INFO } from '../data/testsData';

export default function Footer({ onOpenBooking, onOpenAdmin, contactInfo = CONTACT_INFO }) {
  const info = contactInfo || CONTACT_INFO;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs pt-14 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-black">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-lg font-black font-display text-white tracking-tight">
                TAZ <span className="text-sky-400">DIAGNOSTIC</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Certified computerized automated diagnostic laboratory founded by <strong className="text-white">{info.founderName || 'Mahammad Abdul Rajak'}</strong>. Delivering automated 5-part hematology, clinical biochemistry, and specialized health checkup packages with 100% precision.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-500/30 font-bold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> 24/7 Computerized Automated Lab
              </span>
            </div>
          </div>

          {/* Diagnostic Services */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Pathology Services
            </h4>
            <ul className="space-y-1.5">
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Complete Blood Count (CBC 28)</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Thyroid Profile (T3, T4, TSH)</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Lipid Profile+ Complete (10)</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">HbA1c Glycated Hemoglobin</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Liver Function Test (LFT 11)</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Kidney Function Test (KFT 9)</a></li>
            </ul>
          </div>

          {/* Special Health Packages */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Taz Health Packages
            </h4>
            <ul className="space-y-1.5">
              <li><a href="#packages" className="hover:text-sky-400 transition-colors">Taz Post Delivery Health Check</a></li>
              <li><a href="#packages" className="hover:text-sky-400 transition-colors">Taz Heart Advanced Package</a></li>
              <li><a href="#packages" className="hover:text-sky-400 transition-colors">Taz Bone And Muscle Health</a></li>
              <li><a href="#packages" className="hover:text-sky-400 transition-colors">Taz Fertility Female Check</a></li>
              <li><a href="#packages" className="hover:text-sky-400 transition-colors">Taz Fertility Male Check</a></li>
              <li><a href="#packages" className="hover:text-sky-400 transition-colors">Free Home Sample Pickup</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Contact & Location
            </h4>
            <div className="space-y-1.5">
              <a href={`tel:${info.phone}`} className="flex items-center gap-1.5 text-sky-400 font-bold hover:underline">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{info.phoneDisplay || info.phone}</span>
              </a>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{info.email}</span>
              </div>
              <div className="flex items-start gap-1.5 text-slate-300 pt-1">
                <MapPin className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                <span>{info.address}</span>
              </div>
              <button
                onClick={() => onOpenBooking()}
                className="mt-2 w-full py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                Book Doorstep Pickup
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
          <p className="text-xs text-center sm:text-left">
            © {new Date().getFullYear()} <strong className="text-white">Taz Diagnostic Center</strong> (Managing Director: {info.founderName || 'Mahammad Abdul Rajak'}). All Rights Reserved.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-white text-xs transition-colors border border-slate-700"
            >
              <ShieldCheck className="w-3 h-3 text-sky-400" />
              <span>Admin Portal / Staff Dashboard</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors border border-slate-700"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-sky-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
