import React, { useState, useRef } from 'react';
import { 
  Camera, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  X, 
  Phone, 
  User, 
  MapPin, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  RotateCw, 
  ZoomIn, 
  Trash2,
  Send,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { CONTACT_INFO } from '../data/testsData';

export default function PrescriptionScanner({ 
  isOpen, 
  onClose, 
  onPrescriptionSubmitted, 
  contactInfo = CONTACT_INFO,
  activePatient = null 
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [patientName, setPatientName] = useState(activePatient?.name || '');
  const [phone, setPhone] = useState(activePatient?.phone || '');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [serviceMode, setServiceMode] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRx, setSubmittedRx] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (fileObj) => {
    setFile(fileObj);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(fileObj);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const rotateImage = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const clearImage = () => {
    setFile(null);
    setPreviewUrl(null);
    setRotation(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!previewUrl && !notes.trim()) {
      alert('Please upload a prescription image or enter the test details.');
      return;
    }

    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    const rxId = 'TAZ-RX-' + Math.floor(1000 + Math.random() * 9000);
    const rxBookingRecord = {
      id: rxId,
      patientName: patientName || 'Prescription Patient',
      age: '-',
      gender: '-',
      phone: phone,
      address: address || (serviceMode === 'home' ? 'Address to be confirmed on call' : 'Diagnostic Lab Visit'),
      itemName: 'Doctor Prescription (Rx) Review & Quote',
      price: 0,
      date: new Date().toISOString().split('T')[0],
      timeSlot: 'Priority Lab Callback (within 15 mins)',
      serviceMode: serviceMode,
      status: 'pending',
      prescriptionImage: previewUrl,
      notes: notes,
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRx(rxBookingRecord);
      if (onPrescriptionSubmitted) {
        onPrescriptionSubmitted(rxBookingRecord);
      }
    }, 800);
  };

  const handleWhatsAppSend = () => {
    if (!submittedRx) return;
    const msg = `*TAZ DIAGNOSTIC - NEW PRESCRIPTION (Rx) UPLOAD*%0A%0A` +
      `*Rx Reference ID:* ${submittedRx.id}%0A` +
      `*Patient Name:* ${submittedRx.patientName}%0A` +
      `*Phone Number:* ${submittedRx.phone}%0A` +
      `*Service Mode:* ${submittedRx.serviceMode === 'home' ? '🏠 Home Sample Collection' : '🏥 Diagnostic Center Visit'}%0A` +
      `*Notes:* ${notes || 'Doctor Prescription Attached'}%0A%0A` +
      `_Please verify the prescription image, calculate the test cost & send back the booking confirmation!_`;
    
    window.open(`https://wa.me/${contactInfo.phone || '9440985131'}?text=${msg}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 relative">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black font-display tracking-tight">1-Click Doctor Prescription (Rx) Scanner</h3>
              <p className="text-xs text-sky-100">Upload doctor slip photo • Technician reviews in 15 mins</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content Body */}
        {!submittedRx ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Step 1: Upload or Snap Picture */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Upload or Take Photo of Doctor's Prescription
              </label>

              {!previewUrl ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-sky-300 hover:border-sky-500 rounded-3xl p-8 text-center bg-sky-50/50 hover:bg-sky-50 cursor-pointer transition-all flex flex-col items-center justify-center gap-3 group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    capture="environment"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-16 h-16 rounded-full bg-sky-100 group-hover:bg-sky-200 text-sky-600 flex items-center justify-center transition-all group-hover:scale-110">
                    <Camera className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 text-sm block">
                      Tap to Take Photo / Choose Prescription Image
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      Supports JPG, PNG, Mobile Camera Capture, or PDF (Max 10MB)
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 p-2 flex flex-col items-center">
                  <div className="relative max-h-64 overflow-hidden flex items-center justify-center w-full">
                    <img
                      src={previewUrl}
                      alt="Prescription Preview"
                      style={{ transform: `rotate(${rotation}deg)` }}
                      className="max-h-60 object-contain rounded-lg transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Image Controls */}
                  <div className="flex items-center gap-3 mt-3 pt-2 border-t border-slate-800 w-full justify-between px-2">
                    <div className="text-xs text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Prescription Loaded</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={rotateImage}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg flex items-center gap-1 border border-slate-700"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Rotate</span>
                      </button>
                      <button
                        type="button"
                        onClick={clearImage}
                        className="px-3 py-1 bg-rose-900/40 hover:bg-rose-900/60 text-rose-300 text-xs rounded-lg flex items-center gap-1 border border-rose-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Retake</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Patient Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit mobile number"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Service Mode Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Preferred Diagnostic Service Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setServiceMode('home')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    serviceMode === 'home'
                      ? 'bg-sky-50 border-sky-500 text-sky-900 font-bold ring-2 ring-sky-300'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                    🏠
                  </div>
                  <div className="text-xs">
                    <div className="font-bold">Home Blood Collection</div>
                    <div className="text-[10px] text-slate-500">Phlebotomist visits home</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceMode('lab')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    serviceMode === 'lab'
                      ? 'bg-sky-50 border-sky-500 text-sky-900 font-bold ring-2 ring-sky-300'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                    🏥
                  </div>
                  <div className="text-xs">
                    <div className="font-bold">Visit Lab Center</div>
                    <div className="text-[10px] text-slate-500">Main Road, Tallapudi</div>
                  </div>
                </button>
              </div>
            </div>

            {serviceMode === 'home' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Doorstep Collection Address / Landmark
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House No, Street, Landmark in Tallapudi / Rajahmundry..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Additional Notes / Specific Doctor Instructions (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Doctor said 12-hr fasting test, or urgent report needed"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading & Transmitting to Lab Technician...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Prescription for 15-Min Quick Review</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2.5">
                🔒 100% Confidential & Secure. Our Lab Technician will call you with the exact test list and best discounted pricing.
              </p>
            </div>

          </form>
        ) : (
          /* Confirmation State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold mb-2">
                Rx REF: {submittedRx.id}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Prescription Successfully Received!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{submittedRx.patientName}</strong>. Our senior lab technician is reviewing your doctor's slip and will contact you on <strong>+91 {submittedRx.phone}</strong> within 15 minutes with the discounted test estimate.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-800">
                  {submittedRx.serviceMode === 'home' ? '🏠 Doorstep Home Collection' : '🏥 Lab Center Visit'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-amber-600">Pending Technician Review</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Expected Response:</span>
                <span className="font-bold text-emerald-600">Within 15 Minutes</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={handleWhatsAppSend}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open Instant WhatsApp Chat</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
              >
                <span>Done</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
