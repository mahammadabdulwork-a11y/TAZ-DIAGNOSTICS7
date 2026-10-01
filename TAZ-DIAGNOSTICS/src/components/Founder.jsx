import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  HeartHandshake, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Activity 
} from 'lucide-react';
import { CONTACT_INFO } from '../data/testsData';

export default function Founder({ onOpenBooking, contactInfo = CONTACT_INFO }) {
  const info = contactInfo || CONTACT_INFO;

  return (
    <section id="leadership" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-sky-50/30 border-y border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Diagnostic Leadership & Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
            Meet the Founder & <span className="text-sky-600">Managing Director</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Dedicated to bringing precision laboratory investigations, automated quality controls, and compassionate healthcare to the community.
          </p>
        </div>

        {/* Founder Showcase Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Founder Photo */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-sky-500 via-teal-500 to-indigo-500 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition duration-300"></div>
                
                <div className="relative w-64 sm:w-72 h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl bg-slate-100 border-2 border-white">
                  <img
                    src="/founder.jpg"
                    alt={`${info.founderName || 'Mahammad Abdul Rajak'} - Founder of Taz Diagnostic`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Photo Overlay Badge */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent p-4 text-center">
                    <div className="text-white font-extrabold text-base tracking-wide font-display">
                      {info.founderName || 'Mahammad Abdul Rajak'}
                    </div>
                    <div className="text-sky-300 text-xs font-semibold">
                      {info.founderTitle || 'Founder & Managing Director'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quality Credential Pill */}
              <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>24/7 Computerized Automated Lab</span>
              </div>
            </div>

            {/* Right Column: Founder Story & Leadership Message */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-widest font-sans">
                  Leadership Note
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 mt-1">
                  {info.founderName || 'Mahammad Abdul Rajak'}
                </h3>
                <p className="text-sm font-semibold text-slate-500">
                  {info.founderTitle || 'Founder & Head of Taz Diagnostic Center'}
                </p>
              </div>

              <div className="space-y-3.5 text-slate-700 text-sm leading-relaxed">
                <p>
                  "When we started <strong className="text-slate-900">Taz Diagnostic</strong>, our fundamental commitment was clear: every patient deserving a medical test must receive hospital-grade, 100% accurate, and computerized results without unreasonable hospital overheads or long waiting times."
                </p>
                <p>
                  "We have equipped our laboratory at Tallapudi, Rajahmundry with modern automated analyzers, barcode-tracked sample lines, and dedicated doorstep collection services so that your health checkups are smooth, timely, and dependable."
                </p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span><strong>24/7 Emergency</strong> Automated Testing</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span><strong>Doorstep Pickup:</strong> Free Home Draws</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span><strong>Direct Contact:</strong> {info.phoneDisplay || info.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span><strong>Email:</strong> {info.email}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${info.phone}`}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Director: {info.phoneDisplay || info.phone}</span>
                </a>

                <button
                  onClick={() => onOpenBooking()}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 transition-all flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span>Book Appointment / Home Draw</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
