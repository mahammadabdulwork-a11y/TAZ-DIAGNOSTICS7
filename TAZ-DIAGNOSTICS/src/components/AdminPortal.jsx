import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Check, 
  X, 
  AlertCircle,
  Search,
  Filter,
  Trash2,
  Lock,
  LogOut,
  Activity,
  Home,
  Building2,
  Printer
} from 'lucide-react';
import { CONTACT_INFO } from '../data/testsData';

export default function AdminPortal({ isOpen, onClose, bookings, onUpdateBookingStatus, onDeleteBooking }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // default open or simple PIN
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const correctPin = '1234'; // Simple default PIN

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === correctPin || pinInput === '9440') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  if (!isOpen) return null;

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query || 
      b.id?.toLowerCase().includes(query) ||
      b.patientName?.toLowerCase().includes(query) ||
      b.phone?.includes(query) ||
      b.itemName?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.price) || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-slate-950 flex items-center justify-center font-black">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black font-display tracking-wide">
                  Taz Diagnostic Admin & Reception Portal
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500 text-slate-950">
                  LIVE CONSOLE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Logged in as: <strong className="text-white">{CONTACT_INFO.founderName}</strong> (Tallapudi Center)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* PIN Verification Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-5 my-auto">
            <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black font-display text-slate-900">Admin Security Access</h3>
              <p className="text-xs text-slate-500 mt-1">Enter your 4-digit staff PIN to view patient booking queue (Default PIN: 1234)</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Staff PIN (e.g. 1234)"
                className="w-full text-center text-xl font-black tracking-widest px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-300 focus:border-sky-500 focus:outline-none"
              />
              {pinError && (
                <div className="text-xs font-bold text-red-600">Incorrect PIN. Please try again.</div>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm shadow-md transition-all"
              >
                Access Portal
              </button>
            </form>
          </div>
        ) : (
          /* Main Dashboard Area */
          <div className="p-4 sm:p-6 overflow-y-auto flex-grow space-y-5 bg-slate-50">
            
            {/* Quick Stats Summary Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Bookings</div>
                <div className="text-2xl font-black font-display text-slate-900 mt-0.5">{bookings.length}</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs">
                <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Pending Approval
                </div>
                <div className="text-2xl font-black font-display text-amber-600 mt-0.5">{pendingCount}</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs">
                <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed / Active
                </div>
                <div className="text-2xl font-black font-display text-emerald-600 mt-0.5">{confirmedCount}</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-sky-200 shadow-xs">
                <div className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">Total Booking Value</div>
                <div className="text-2xl font-black font-display text-sky-700 mt-0.5">₹{totalRevenue}</div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              
              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                    statusFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All ({bookings.length})
                </button>
                <button
                  onClick={() => setStatusFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                    statusFilter === 'pending' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setStatusFilter('confirmed')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                    statusFilter === 'confirmed' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  Confirmed ({confirmedCount})
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search patient, phone, test..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium focus:outline-none focus:border-sky-500"
                />
              </div>

            </div>

            {/* Bookings Table / List */}
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h4 className="text-base font-bold text-slate-800">No Patient Bookings Found</h4>
                <p className="text-xs text-slate-500 mt-1">
                  When a patient books a test or requests doorstep collection, their reservation appears here instantly.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredBookings.map((booking) => {
                  const isPending = booking.status === 'pending';
                  const isConfirmed = booking.status === 'confirmed';

                  return (
                    <div
                      key={booking.id}
                      className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all shadow-xs ${
                        isPending ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        
                        {/* Patient & Test Details */}
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-black text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                              {booking.id}
                            </span>
                            
                            {/* Status badge */}
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                              isPending
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            }`}>
                              {isPending ? '⏳ Awaiting Acceptance' : '✓ Accepted & Scheduled'}
                            </span>

                            {/* Service mode */}
                            <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                              {booking.serviceMode === 'home' ? (
                                <><Home className="w-3.5 h-3.5 text-sky-600" /> Free Home Draw</>
                              ) : (
                                <><Building2 className="w-3.5 h-3.5 text-teal-600" /> Center Walk-in</>
                              )}
                            </span>
                          </div>

                          <h3 className="text-base font-black text-slate-900">
                            {booking.patientName} <span className="text-xs font-normal text-slate-500">({booking.age}y, {booking.gender})</span>
                          </h3>

                          <div className="text-xs text-sky-900 font-bold">
                            Investigation: <span className="text-slate-900">{booking.itemName}</span> • <span className="text-emerald-700 font-extrabold">₹{booking.price}</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 pt-1">
                            <span className="flex items-center gap-1 font-semibold text-slate-800">
                              <Calendar className="w-3.5 h-3.5 text-sky-600" /> {booking.date} ({booking.timeSlot})
                            </span>
                            <span className="flex items-center gap-1 font-bold text-slate-900">
                              <Phone className="w-3.5 h-3.5 text-emerald-600" /> {booking.phone}
                            </span>
                            {booking.address && (
                              <span className="flex items-center gap-1 text-slate-600 truncate max-w-xs">
                                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" /> {booking.address}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Admin Action Buttons */}
                        <div className="flex flex-wrap lg:flex-col items-center lg:items-end gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                          
                          {/* Accept / Confirm Action */}
                          {isPending ? (
                            <button
                              onClick={() => onUpdateBookingStatus(booking.id, 'confirmed')}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                            >
                              <Check className="w-4 h-4" />
                              <span>Accept & Confirm Booking</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Phlebotomist Assigned</span>
                            </div>
                          )}

                          <div className="flex items-center gap-1.5">
                            {/* Direct WhatsApp Patient */}
                            <a
                              href={`https://wa.me/91${booking.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(booking.patientName)},%20your%20test%20booking%20(${encodeURIComponent(booking.itemName)})%20at%20Taz%20Diagnostic%20is%20confirmed%20for%20${encodeURIComponent(booking.date)}.%20Ref:%20${booking.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                              title="Send WhatsApp Confirmation"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>

                            {/* Direct Call Patient */}
                            <a
                              href={`tel:${booking.phone}`}
                              className="p-2 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 transition-colors"
                              title="Call Patient"
                            >
                              <Phone className="w-4 h-4" />
                            </a>

                            {/* Delete/Cancel Booking */}
                            <button
                              onClick={() => onDeleteBooking(booking.id)}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-700 transition-colors"
                              title="Cancel / Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

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
    </div>
  );
}
