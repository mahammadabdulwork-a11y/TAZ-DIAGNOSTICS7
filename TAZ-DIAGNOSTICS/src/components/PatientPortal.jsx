import React, { useState, useEffect } from 'react';
import { 
  User, 
  Phone, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  MessageSquare,
  LogOut,
  AlertCircle,
  Activity,
  ArrowLeft,
  Mic,
  Bike,
  Building,
  Check,
  Printer,
  Eye,
  Droplets,
  Sparkles
} from 'lucide-react';
import { CONTACT_INFO } from '../data/testsData';
import ReportViewerModal from './ReportViewerModal';

export default function PatientPortal({ 
  bookings = [], 
  onOpenBooking, 
  onBackToHome, 
  activePatient = null, 
  onLogout,
  contactInfo = CONTACT_INFO 
}) {
  const info = contactInfo || CONTACT_INFO;
  const [phoneNumber, setPhoneNumber] = useState(activePatient?.phone || '');
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(activePatient?.phone));
  const [currentUserPhone, setCurrentUserPhone] = useState(activePatient?.phone || '');
  const [viewingReportBooking, setViewingReportBooking] = useState(null);

  useEffect(() => {
    if (activePatient?.phone) {
      setCurrentUserPhone(activePatient.phone);
      setIsLoggedIn(true);
    }
  }, [activePatient]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (!cleanPhone) return;
    
    setCurrentUserPhone(cleanPhone);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPhoneNumber('');
    setCurrentUserPhone('');
    if (onLogout) {
      onLogout();
    }
  };

  // Filter bookings for this patient
  const patientBookings = bookings.filter((b) => {
    if (!currentUserPhone) return false;
    const cleanBPhone = b.phone ? b.phone.replace(/[^0-9]/g, '') : '';
    return cleanBPhone.includes(currentUserPhone) || currentUserPhone.includes(cleanBPhone);
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-sky-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Website</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-600">Taz Patient Health & Report Vault</span>
          </div>
        </div>

        {!isLoggedIn ? (
          /* Simplified Patient Mobile Login Form */
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto shadow-sm">
              <User className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Patient Self-Service</span>
              <h2 className="text-2xl font-black font-display text-slate-900 mt-1">
                View My Reports & Test Status
              </h2>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Enter your 10-digit mobile number to track technician arrival, lab status, and download verified PDF reports.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Registered Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g., 9440985131"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <span>Access My Records & Reports</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-center text-slate-500 pt-2">
                Need assistance? Call Lab Helpdesk: <strong className="text-slate-900">{info.phoneDisplay || info.phone}</strong>
              </div>
            </form>
          </div>
        ) : (
          /* Patient Dashboard View */
          <div className="space-y-6">
            
            {/* Patient Header Bar */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-black">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900">
                    Welcome, {activePatient?.name || 'Patient'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Showing records for mobile: <strong className="text-slate-900 font-mono text-sm">{currentUserPhone}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book New Test</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 border border-slate-200"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            </div>

            {/* Bookings & Reports List */}
            {patientBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
                <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">No Active Bookings Found for "{currentUserPhone}"</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                    You haven't scheduled any tests yet. Click below to book diagnostic tests with doorstep blood sample pickup!
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => onOpenBooking()}
                    className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs"
                  >
                    Book a Diagnostic Test
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200"
                  >
                    Switch Mobile Number
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-600" />
                  <span>Your Diagnostic Tests & Reports ({patientBookings.length})</span>
                </h3>

                {patientBookings.map((b) => {
                  const status = b.status || 'pending';
                  const isHome = b.serviceMode === 'home';
                  const hasReport = Boolean(b.report || status === 'completed');

                  return (
                    <div
                      key={b.id}
                      className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md space-y-5 transition-all hover:border-sky-300"
                    >
                      {/* Top Booking Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
                            Ref: {b.id}
                          </span>
                          <span className="text-xs font-bold text-slate-600">
                            Patient: <strong className="text-slate-900">{b.patientName}</strong> ({b.age}y, {b.gender})
                          </span>
                        </div>

                        {/* Status Alert Badge */}
                        <div>
                          {status === 'pending' && (
                            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                              <span>Awaiting Lab Review</span>
                            </span>
                          )}

                          {status === 'on_the_way' && (
                            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-sky-100 text-sky-900 border border-sky-300 flex items-center gap-1.5 animate-pulse">
                              <Bike className="w-4 h-4 text-sky-600" />
                              <span>Phlebotomist On The Way!</span>
                            </span>
                          )}

                          {status === 'lab_ready' && (
                            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1.5">
                              <Building className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Technician Waiting at Lab</span>
                            </span>
                          )}

                          {status === 'processing' && (
                            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-900 border border-indigo-300 flex items-center gap-1.5">
                              <Droplets className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                              <span>Sample in Automated Lab</span>
                            </span>
                          )}

                          {status === 'completed' && (
                            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500 text-white flex items-center gap-1.5 shadow-xs">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Report Ready & Verified</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 🚀 REAL-TIME 4-STEP TRACKER PROGRESS BAR */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs">
                          
                          {/* Step 1 */}
                          <div className="space-y-1">
                            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto font-bold shadow-xs">
                              <Check className="w-4 h-4" />
                            </div>
                            <div className="font-bold text-slate-900">1. Booked</div>
                            <div className="text-[10px] text-slate-500 hidden sm:block">Slot Confirmed</div>
                          </div>

                          {/* Step 2 */}
                          <div className="space-y-1">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto font-bold transition-all ${
                              status === 'on_the_way' || status === 'lab_ready' || status === 'processing' || status === 'completed'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-200 text-slate-500'
                            }`}>
                              {status === 'on_the_way' || status === 'lab_ready' || status === 'processing' || status === 'completed' ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                '2'
                              )}
                            </div>
                            <div className={`font-bold ${status === 'on_the_way' || status === 'lab_ready' ? 'text-sky-700 font-extrabold' : 'text-slate-700'}`}>
                              {isHome ? '2. En Route' : '2. Lab Ready'}
                            </div>
                            <div className="text-[10px] text-slate-500 hidden sm:block">
                              {isHome ? 'Phlebotomist Doorstep' : 'Walk-in Active'}
                            </div>
                          </div>

                          {/* Step 3 */}
                          <div className="space-y-1">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto font-bold transition-all ${
                              status === 'processing' || status === 'completed'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-200 text-slate-500'
                            }`}>
                              {status === 'processing' || status === 'completed' ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                '3'
                              )}
                            </div>
                            <div className={`font-bold ${status === 'processing' ? 'text-indigo-700 font-extrabold' : 'text-slate-700'}`}>
                              3. Lab Testing
                            </div>
                            <div className="text-[10px] text-slate-500 hidden sm:block">Automated Analyzers</div>
                          </div>

                          {/* Step 4 */}
                          <div className="space-y-1">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto font-bold transition-all ${
                              hasReport
                                ? 'bg-emerald-600 text-white shadow-xs ring-4 ring-emerald-200'
                                : 'bg-slate-200 text-slate-500'
                            }`}>
                              {hasReport ? <Check className="w-4 h-4" /> : '4'}
                            </div>
                            <div className={`font-bold ${hasReport ? 'text-emerald-700 font-black' : 'text-slate-500'}`}>
                              4. Report Ready
                            </div>
                            <div className="text-[10px] text-slate-500 hidden sm:block">PDF Downloadable</div>
                          </div>

                        </div>
                      </div>

                      {/* 📢 LIVE NOTIFICATION BANNER ACCORDING TO LAB DISPATCH */}
                      {status === 'on_the_way' && (
                        <div className="p-3.5 rounded-2xl bg-sky-50 border-2 border-sky-300 flex items-center gap-3 text-xs text-sky-950 font-medium animate-fade-in">
                          <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Bike className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-extrabold text-sky-900">
                              Trained Phlebotomist is On The Way to Your Doorstep!
                            </div>
                            <div className="text-[11px] text-sky-800">
                              Please keep yourself prepared for hygienic blood sample collection at {b.address || 'your address'}.
                            </div>
                          </div>
                        </div>
                      )}

                      {status === 'lab_ready' && (
                        <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-center gap-3 text-xs text-emerald-950 font-medium animate-fade-in">
                          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Building className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-extrabold text-emerald-900">
                              Lab Technician is Ready & Waiting for You at Tallapudi Center!
                            </div>
                            <div className="text-[11px] text-emerald-800">
                              Walk in at {info.address || 'Tallapudi Main Road'}. Show Ref ID: <strong className="font-mono">{b.id}</strong> at reception.
                            </div>
                          </div>
                        </div>
                      )}

                      {status === 'processing' && (
                        <div className="p-3.5 rounded-2xl bg-indigo-50 border-2 border-indigo-300 flex items-center gap-3 text-xs text-indigo-950 font-medium animate-fade-in">
                          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Activity className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-extrabold text-indigo-900">
                              Sample Received & Currently Testing in 24/7 Automated Lab!
                            </div>
                            <div className="text-[11px] text-indigo-800">
                              Results are being analyzed on computerized automated multi-analyzers. Digital report will be ready shortly.
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Test / Health Package</div>
                          <div className="text-sm font-extrabold text-slate-900 mt-0.5">{b.itemName}</div>
                          <div className="text-emerald-700 font-black text-xs mt-1">₹{b.price} Payable</div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Date & Preferred Slot</div>
                          <div className="text-xs font-bold text-slate-900 mt-0.5">{b.date}</div>
                          <div className="text-slate-600 font-semibold text-[11px] mt-0.5">{b.timeSlot}</div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Collection Mode</div>
                          <div className="text-xs font-bold text-sky-800 mt-0.5">
                            {isHome ? '🏠 Free Doorstep Sample Draw' : '🏢 Center Walk-in (Tallapudi)'}
                          </div>
                          {b.address && (
                            <div className="text-slate-600 text-[11px] truncate mt-0.5">📍 {b.address}</div>
                          )}
                        </div>
                      </div>

                      {/* Attached Voice Note Indicator */}
                      {b.voiceNote && (
                        <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                            <Mic className="w-4 h-4 text-sky-600" />
                            <span>Your Voice Note to Lab ({b.voiceNote.duration || 'Audio Note'})</span>
                          </div>
                          <audio controls src={b.voiceNote.audioUrl} className="h-8 max-w-full sm:w-56" />
                        </div>
                      )}

                      {/* Report Download & Action Bar */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>WhatsApp dispatch linked to: <strong>{b.phone}</strong></span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {/* 📄 VIEW & DOWNLOAD OFFICIAL MEDICAL REPORT BUTTON */}
                          {hasReport ? (
                            <button
                              type="button"
                              onClick={() => setViewingReportBooking(b)}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md transition-all hover:scale-105 active:scale-95"
                            >
                              <FileText className="w-4 h-4" />
                              <span>View & Download Report (PDF)</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => window.print()}
                              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>Print Booking Slip</span>
                            </button>
                          )}

                          <a
                            href={`https://wa.me/91${info.phone}?text=Hello%20Taz%20Diagnostic,%20I%20am%20inquiring%20about%20my%20test%20report%20${b.id}%20for%20${encodeURIComponent(b.patientName)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                            <span>WhatsApp Helpdesk</span>
                          </a>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </div>

      {/* Report Viewer & Download Modal */}
      {viewingReportBooking && (
        <ReportViewerModal
          isOpen={Boolean(viewingReportBooking)}
          onClose={() => setViewingReportBooking(null)}
          booking={viewingReportBooking}
          contactInfo={info}
        />
      )}

    </div>
  );
}
