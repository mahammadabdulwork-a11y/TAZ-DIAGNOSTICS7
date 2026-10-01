import React, { useState } from 'react';
import { 
  MapPin, 
  PhoneCall, 
  Clock, 
  Send, 
  Sparkles, 
  MessageSquare, 
  Navigation, 
  CheckCircle2, 
  ShieldCheck,
  Building,
  Mail,
  ExternalLink
} from 'lucide-react';
import { CONTACT_INFO } from '../data/testsData';

export default function Contact({ onSubmitInquiry, contactInfo = CONTACT_INFO }) {
  const info = contactInfo || CONTACT_INFO;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    testRequired: '',
    message: '',
    serviceType: 'home-collection'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
    if (onSubmitInquiry) {
      onSubmitInquiry(formData);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200">
            <MapPin className="w-4 h-4 text-sky-600" />
            <span>Center Location & Contact Information</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
            Visit or Contact <span className="text-sky-600">Taz Diagnostic Center</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Walk into our laboratory at Tallapudi or schedule a trained phlebotomist to your doorstep for blood sample collection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Contact Cards */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Official Address */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3 border border-red-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-1">Diagnostic Center Address</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {info.address}
                </p>
                <div className="mt-2 text-[11px] text-sky-700 font-bold flex items-center gap-1">
                  <Navigation className="w-3 h-3" /> Landmark: {info.landmark}
                </div>
              </div>

              {/* Card 2: Phone Number */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3 border border-sky-100">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-1">Direct Helpdesk & Call</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Call for urgent bookings, test guidance, or home collection scheduling.
                </p>
                <div className="mt-2">
                  <a href={`tel:${info.phone}`} className="text-base font-black text-sky-600 hover:text-sky-700 hover:underline">
                    {info.phoneDisplay || info.phone}
                  </a>
                </div>
              </div>

              {/* Card 3: Email Address */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 border border-indigo-100">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-1">Official Email Desk</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Send doctor prescriptions or inquiries for corporate/family screenings.
                </p>
                <div className="mt-2">
                  <a href={`mailto:${info.email}`} className="text-xs font-bold text-indigo-600 hover:underline">
                    {info.email}
                  </a>
                </div>
              </div>

              {/* Card 4: Operating Hours */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 border border-amber-100">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-1">Operating Hours</h3>
                <div className="text-xs text-slate-700 space-y-1 mt-1 font-medium">
                  <div className="flex justify-between">
                    <span>Emergency Lab:</span>
                    <strong className="text-emerald-700 font-extrabold">24/7 Active</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Home Sample Pickup:</span>
                    <strong className="text-slate-900">{info.homeCollectionHours}</strong>
                  </div>
                </div>
              </div>

            </div>

            {/* Official Center Information Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-sky-600" />
                  <span className="text-sm font-extrabold text-slate-900">Taz Diagnostic - Tallapudi Center</span>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  24/7 Automated Lab
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-red-600" /> {info.address}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Contact: <strong className="text-slate-900">{info.phoneDisplay || info.phone}</strong> | Email: <strong className="text-slate-900">{info.email}</strong>
                  </div>
                </div>

                <a
                  href={`https://wa.me/91${info.phone}?text=Hello%20Taz%20Diagnostic,%20I%20want%20to%20inquire%20about%20a%20test`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shrink-0 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Callback & Booking Request Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl">
              <div className="mb-5">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Direct Callback Assistance
                </span>
                <h3 className="text-xl font-black font-display text-slate-900 mt-1">
                  Book Doorstep Pickup / Inquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Leave your number and our coordinator will call you back within 15 minutes.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2.5">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">Inquiry Received!</h4>
                  <p className="text-xs text-slate-700">
                    Thank you, <strong className="text-sky-700">{formData.name}</strong>. Our team will call <strong className="text-slate-900">{formData.phone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', testRequired: '', message: '', serviceType: 'home-collection' });
                    }}
                    className="mt-2 px-3.5 py-1.5 rounded-lg bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Service Preference Toggle */}
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, serviceType: 'home-collection' })}
                      className={`py-2 text-xs font-extrabold rounded-lg transition-all ${
                        formData.serviceType === 'home-collection'
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Home Collection (Free)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, serviceType: 'center-visit' })}
                      className={`py-2 text-xs font-extrabold rounded-lg transition-all ${
                        formData.serviceType === 'center-visit'
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Visit Center
                    </button>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Patient Name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g., 9440985131"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  {/* Test / Package Needed */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Test / Package Needed (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.testRequired}
                      onChange={(e) => setFormData({ ...formData, testRequired: e.target.value })}
                      placeholder="e.g., Post Delivery Package, Heart Advanced, CBC..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  {/* Address / Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Doorstep Address / Preferred Time
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g., Please arrange morning sample pickup at 7:30 AM..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:border-sky-500 resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request Callback / Home Collection</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Confidential & Private Medical Handling</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
