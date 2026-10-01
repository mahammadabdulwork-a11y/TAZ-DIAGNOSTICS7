import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  PhoneCall, 
  Calendar, 
  Menu, 
  X, 
  Clock, 
  ShieldCheck, 
  Search, 
  MapPin,
  Droplets,
  User,
  LogOut,
  FileText,
  Lock
} from 'lucide-react';
import { CONTACT_INFO } from '../data/testsData';

export default function Navbar({ 
  onOpenBooking, 
  onOpenPrescriptionScanner,
  onSearchOpen, 
  onNavigateView, 
  currentView = 'home',
  pendingCount = 0,
  activeUser = null,
  onLogout
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: '🫀 Anatomy Explorer', href: '#anatomy-explorer' },
    { name: '🧮 Custom Package', href: '#custom-builder' },
    { name: 'Packages', href: '#packages' },
    { name: 'Tests', href: '#services' },
    { name: 'About Lab', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Header Information & Patient Account Bar */}
      <div className="bg-slate-900 text-slate-200 py-2 px-4 text-xs font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center text-sky-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2"></span>
              24/7 Computerized Automated Lab
            </span>
            <span className="hidden md:inline-block text-slate-600">•</span>
            <span className="hidden md:inline-flex items-center text-slate-300">
              <MapPin className="w-3.5 h-3.5 mr-1 text-red-400" />
              Main Road, Tallapudi, Rajahmundry
            </span>
          </div>

          {/* Right User Bar */}
          <div className="flex items-center space-x-3 ml-auto">
            
            {/* Direct Hotline */}
            <a 
              href={`tel:${CONTACT_INFO.phone}`} 
              className="hidden sm:flex items-center text-white hover:text-sky-300 transition-colors font-bold bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-full border border-slate-700"
            >
              <PhoneCall className="w-3.5 h-3.5 mr-1 text-sky-400" />
              <span>{CONTACT_INFO.phoneDisplay}</span>
            </a>

            {/* Logged-in Patient Profile */}
            {activeUser && activeUser.role === 'patient' && (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-200">
                  <User className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-bold text-white max-w-[140px] truncate">{activeUser.name}</span>
                  <span className="text-[10px] text-slate-400">({activeUser.phone})</span>
                </div>

                <button
                  onClick={() => onNavigateView('patient')}
                  className={`flex items-center text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                    currentView === 'patient'
                      ? 'bg-sky-600 text-white border-sky-400 shadow-sm'
                      : 'bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 border-slate-700'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 mr-1 text-sky-400" />
                  <span>My Reports</span>
                </button>

                <button
                  onClick={onLogout}
                  className="flex items-center text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-800 transition-all"
                  title="Switch Patient or Logout"
                >
                  <LogOut className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Switch</span>
                </button>
              </div>
            )}

            {/* Logged-in Admin Profile */}
            {activeUser && activeUser.role === 'admin' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateView('admin')}
                  className={`flex items-center text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                    currentView === 'admin'
                      ? 'bg-amber-600 text-white border-amber-400 shadow-sm'
                      : 'bg-slate-800 text-amber-300 hover:text-white hover:bg-slate-700 border-slate-700'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-amber-400" />
                  <span>Admin Workspace</span>
                  {pendingCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black text-[10px]">
                      {pendingCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={onLogout}
                  className="flex items-center text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-800 transition-all"
                  title="Logout Admin"
                >
                  <LogOut className="w-3 h-3 mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* Fallback if no user */}
            {!activeUser && (
              <button
                onClick={onLogout}
                className="flex items-center text-xs font-bold px-3 py-1 rounded-full bg-sky-600 text-white hover:bg-sky-700 border border-sky-500 transition-all"
              >
                <User className="w-3.5 h-3.5 mr-1" />
                <span>Patient Login</span>
              </button>
            )}

          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md py-3'
            : 'bg-white py-4 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => onNavigateView('home')} 
            className="flex items-center space-x-3 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white flex items-center justify-center font-black shadow-md">
              <Activity className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight font-display text-slate-900 flex items-center gap-1.5">
                TAZ <span className="text-sky-600">DIAGNOSTIC</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-bold text-slate-700 -mt-0.5 flex items-center gap-1">
                <Droplets className="w-2.5 h-2.5 text-sky-700" /> 24/7 Computerized Automated Lab
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          {currentView === 'home' ? (
            <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-sky-600 hover:bg-white rounded-full transition-all duration-150"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => onNavigateView('home')}
                className="px-4 py-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-sky-600 bg-slate-100 hover:bg-white rounded-full border border-slate-200"
              >
                ← Return to Main Website
              </button>
            </div>
          )}

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-2.5">
            <button
              onClick={onSearchOpen}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-sky-600 border border-slate-200 transition-all"
              title="Search tests"
              aria-label="Search tests"
            >
              <Search className="w-4 h-4" />
            </button>
            {onOpenPrescriptionScanner && (
              <button
                onClick={onOpenPrescriptionScanner}
                className="px-3.5 py-2.5 text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                title="Upload Doctor's Slip"
              >
                <span>📸 Upload Rx</span>
              </button>
            )}
            <button
              onClick={() => onOpenBooking()}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-white rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Test</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center space-x-2">
            {onOpenPrescriptionScanner && (
              <button
                onClick={onOpenPrescriptionScanner}
                className="px-2.5 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 rounded-lg shadow-sm"
              >
                📸 Rx
              </button>
            )}
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 text-xs font-bold text-white rounded-lg bg-sky-600 shadow-sm"
            >
              Book Test
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:text-sky-600"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 mt-3 bg-white border-b border-slate-200 shadow-2xl">
            <div className="flex flex-col space-y-1.5">
              
              {/* Patient Profile / Jump Links for Mobile */}
              {activeUser && activeUser.role === 'patient' && (
                <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-sky-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{activeUser.name}</div>
                      <div className="text-[10px] text-slate-500">{activeUser.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigateView('patient');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-sky-600 text-white font-bold text-[11px]"
                    >
                      My Reports
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="p-1 rounded-lg bg-white border border-slate-300 text-slate-600 text-xs"
                      title="Switch Account"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {activeUser && activeUser.role === 'admin' && (
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <div className="text-xs font-bold text-amber-950">Admin Workspace Active</div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-bold text-[11px]"
                  >
                    Logout
                  </button>
                </div>
              )}

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateView('home');
                  }}
                  className="px-4 py-2 rounded-xl text-slate-700 hover:text-sky-600 hover:bg-sky-50 font-bold transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-slate-400 text-xs">→</span>
                </a>
              ))}

              <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 rounded-xl bg-sky-600 text-white font-bold text-center flex items-center justify-center gap-2 shadow-md"
                >
                  <Calendar className="w-4 h-4" /> Book Appointment / Doorstep Draw
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
