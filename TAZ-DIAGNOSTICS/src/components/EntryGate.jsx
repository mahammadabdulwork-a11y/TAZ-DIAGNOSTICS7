import React, { useState } from 'react';
import { 
  Activity, 
  User, 
  Phone, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Droplets,
  HeartPulse,
  MapPin,
  Clock
} from 'lucide-react';
import { CONTACT_INFO } from '../data/testsData';

export default function EntryGate({ onPatientLogin, onAdminLogin }) {
  const [role, setRole] = useState('patient'); // 'patient' | 'admin'
  
  // Patient form state
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientError, setPatientError] = useState('');

  // Admin form state
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  const handlePatientSubmit = (e) => {
    e.preventDefault();
    setPatientError('');

    const cleanName = patientName.trim();
    const cleanPhone = patientPhone.replace(/[^0-9]/g, '');

    if (!cleanName) {
      setPatientError('Please enter your full name.');
      return;
    }

    if (cleanPhone.length < 10) {
      setPatientError('Please enter a valid 10-digit mobile number.');
      return;
    }

    onPatientLogin({
      role: 'patient',
      name: cleanName,
      phone: cleanPhone,
      loggedInAt: new Date().toISOString()
    });
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setAdminError('');

    const u = adminUsername.trim().toLowerCase();
    const p = adminPassword.trim();

    const isUserValid = u === 'taz@18' || u === 'admin' || u === '9440985131';
    const isPassValid = p === 'Sofiya@2010' || p === '1234';

    if (isUserValid && isPassValid) {
      onAdminLogin({
        role: 'admin',
        name: 'Mahammad Abdul Rajak (Admin)',
        username: adminUsername.trim(),
        loggedInAt: new Date().toISOString()
      });
    } else {
      setAdminError('Invalid Admin Credentials. Please check User ID and Password.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white flex flex-col justify-between relative overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Background Glowing Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-sky-500/20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl pointer-events-none"></div>

      {/* Top Brand Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-400 text-white flex items-center justify-center font-black shadow-lg">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black font-display tracking-tight text-white flex items-center gap-1.5">
              TAZ <span className="text-sky-400">DIAGNOSTIC</span>
            </div>
            <div className="text-[11px] font-bold text-sky-200/80 flex items-center gap-1">
              <Droplets className="w-3 h-3 text-sky-400" /> 24/7 Computerized Automated Pathology Lab
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
          <MapPin className="w-3.5 h-3.5 text-red-400" />
          <span>Main Road, Tallapudi, Rajahmundry</span>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="max-w-md w-full mx-auto my-8 z-10">
        <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 relative overflow-hidden">
          
          {/* Top color ribbon */}
          <div className="h-1.5 w-full bg-gradient-to-r from-sky-600 via-teal-500 to-amber-500 absolute top-0 left-0"></div>

          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 mb-6">
            <button
              type="button"
              onClick={() => {
                setRole('patient');
                setPatientError('');
                setAdminError('');
              }}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                role === 'patient'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Patient Entry</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole('admin');
                setPatientError('');
                setAdminError('');
              }}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                role === 'admin'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Admin Staff</span>
            </button>
          </div>

          {/* PATIENT ENTRY VIEW */}
          {role === 'patient' && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-2.5">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900">
                  Welcome to Taz Diagnostic
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your Name and Mobile Number to explore tests, health packages, and book doorstep sample pickup.
                </p>
              </div>

              {patientError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {patientError}
                </div>
              )}

              <form onSubmit={handlePatientSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g., Abdul Raheem"
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (For WhatsApp Reports) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="e.g., 9440985131"
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-98"
                >
                  <span>Enter & Explore Main Website</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Patient feature badges */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Free Doorstep Pickup</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant WhatsApp Reports</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>24/7 Automated Lab</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Multi-Test Booking</span>
                </div>
              </div>
            </div>
          )}

          {/* ADMIN ENTRY VIEW */}
          {role === 'admin' && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2.5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900">
                  Staff & Admin Portal
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Laboratory management, booking queue, patient voice notes & digital report release.
                </p>
              </div>

              {adminError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {adminError}
                </div>
              )}

              <form onSubmit={handleAdminSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Admin User ID *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      placeholder="Enter Admin User (Taz@18)"
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Admin Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Enter Password (Sofiya@2010)"
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-98"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Access Admin Workspace</span>
                </button>
              </form>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                Authorized Laboratory Personnel Only
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="max-w-5xl mx-auto w-full text-center text-xs text-slate-400 font-medium z-10">
        <div>
          © {new Date().getFullYear()} <strong className="text-white">Taz Diagnostic Center</strong> • Managing Director: <strong className="text-sky-300">{CONTACT_INFO.founderName}</strong>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">
          Tallapudi • Gajaram • Chidipi • Kovvur | Direct Support: {CONTACT_INFO.phoneDisplay}
        </div>
      </div>

    </div>
  );
}
