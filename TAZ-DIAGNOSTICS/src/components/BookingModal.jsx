import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  CheckCircle2, 
  Home, 
  Building2, 
  ArrowRight, 
  Sparkles,
  Printer,
  Mic,
  Square,
  Play,
  Pause,
  Trash2,
  Volume2,
  UploadCloud,
  FileAudio,
  Search,
  Check,
  ShieldCheck,
  Clock,
  Layers,
  Flame,
  Droplets,
  HeartPulse,
  Activity,
  Sun
} from 'lucide-react';
import { MEDICAL_TESTS, HEALTH_PACKAGES, CONTACT_INFO } from '../data/testsData';

const TIME_SLOTS = [
  '06:30 AM - 08:00 AM (Fasting Preferred)',
  '08:00 AM - 09:30 AM (Fasting Preferred)',
  '09:30 AM - 11:00 AM (Regular / Post-Prandial)',
  '11:00 AM - 01:00 PM (General Diagnostic)',
  '04:00 PM - 06:00 PM (Evening Slot)',
  '06:00 PM - 08:30 PM (Evening Slot)',
  'Emergency 24/7 Priority Pickup'
];

const TEST_CATEGORIES = [
  { id: 'all', label: 'All Tests (18)' },
  { id: 'blood', label: '🩸 Hematology / CBC' },
  { id: 'diabetes-cardiac', label: '🩺 Diabetes & Heart' },
  { id: 'biochemistry', label: '🧪 Biochemistry / Organs' },
  { id: 'hormones', label: '🧬 Hormones & Thyroid' },
  { id: 'vitamins', label: '☀️ Vitamins & Bone' }
];

export default function BookingModal({ 
  isOpen, 
  onClose, 
  preselectedItem = null, 
  onBookingComplete, 
  activePatient = null,
  tests = MEDICAL_TESTS,
  packages = HEALTH_PACKAGES 
}) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('test'); // 'test' | 'package'
  const [selectedIds, setSelectedIds] = useState(['test-cbc']);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [testSearchQuery, setTestSearchQuery] = useState('');
  const [serviceMode, setServiceMode] = useState('home');
  
  const today = new Date().toISOString().split('T')[0];
  const [appointmentDate, setAppointmentDate] = useState(today);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);

  const [patientData, setPatientData] = useState({
    fullName: activePatient?.name || '',
    age: '',
    gender: 'Male',
    phone: activePatient?.phone || '',
    address: '',
    whatsappUpdates: true,
  });

  // Sync patient info if activePatient changes or modal opens
  useEffect(() => {
    if (activePatient && isOpen) {
      setPatientData(prev => ({
        ...prev,
        fullName: prev.fullName || activePatient.name || '',
        phone: prev.phone || activePatient.phone || ''
      }));
    }
  }, [activePatient, isOpen]);

  // Voice Note State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [voiceNoteData, setVoiceNoteData] = useState(null); // { audioUrl, base64Audio, duration }
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [audioError, setAudioError] = useState('');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const audioPlayerRef = useRef(null);

  const [bookingId, setBookingId] = useState('');

  // Preselected Item handler
  useEffect(() => {
    if (preselectedItem) {
      setSelectedIds([preselectedItem.id]);
      if (preselectedItem.id.startsWith('pkg')) {
        setSelectedType('package');
      } else {
        setSelectedType('test');
      }
    } else {
      if (selectedIds.length === 0) {
        setSelectedIds(['test-cbc']);
      }
    }
  }, [preselectedItem, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      stopRecording();
      setVoiceNoteData(null);
      setIsPlayingPreview(false);
      setTestSearchQuery('');
      setActiveCategoryFilter('all');
    }
  }, [isOpen]);

  // Toggle selection for multiple individual tests
  const toggleTestSelection = (testId) => {
    setSelectedIds(prev => {
      if (prev.includes(testId)) {
        if (prev.length === 1) return prev; // Keep at least one selected
        return prev.filter(id => id !== testId);
      } else {
        return [...prev, testId];
      }
    });
  };

  // Quick Select Presets
  const handleSelectPopularRoutine = () => {
    setSelectedType('test');
    setSelectedIds(['test-cbc', 'test-glucose-fasting', 'test-lipid', 'test-thyroid']);
  };

  const handleSelectAllVisible = (tests) => {
    const visibleIds = tests.map(t => t.id);
    setSelectedIds(prev => Array.from(new Set([...prev, ...visibleIds])));
  };

  const handleClearAllExceptOne = () => {
    setSelectedIds(['test-cbc']);
  };

  // Package Selection
  const handleSelectPackage = (pkgId) => {
    setSelectedIds([pkgId]);
  };

  const handleRemoveSelectedTest = (testId) => {
    if (selectedIds.length > 1) {
      setSelectedIds(prev => prev.filter(id => id !== testId));
    }
  };

  // Filtered Tests
  const testList = tests && tests.length > 0 ? tests : MEDICAL_TESTS;
  const packageList = packages && packages.length > 0 ? packages : HEALTH_PACKAGES;

  const filteredIndividualTests = testList.filter(t => {
    const matchesCategory = activeCategoryFilter === 'all' || t.category === activeCategoryFilter;
    const matchesQuery = !testSearchQuery.trim() || 
      t.title.toLowerCase().includes(testSearchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(testSearchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Calculate Selected Items and Totals
  const allAvailableItems = [...packageList, ...testList];
  const selectedItems = allAvailableItems.filter(item => selectedIds.includes(item.id));
  const totalPrice = selectedItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const totalOriginalPrice = selectedItems.reduce((sum, item) => sum + (Number(item.originalPrice) || 0), 0);
  const totalSavings = totalOriginalPrice > totalPrice ? totalOriginalPrice - totalPrice : 0;

  const combinedTitle = selectedItems.length === 1
    ? selectedItems[0].title
    : `${selectedItems.map(i => i.title.split('(')[0].trim()).join(' + ')} (${selectedItems.length} Tests)`;

  // Check if any selected item requires fasting
  const requiresFasting = selectedItems.some(item => 
    (item.fastingRequired && !item.fastingRequired.toLowerCase().includes('no fasting')) ||
    (item.fastingNote && !item.fastingNote.toLowerCase().includes('no fasting'))
  );

  // Voice Note Recording
  const startRecording = async () => {
    setAudioError('');
    audioChunksRef.current = [];
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setAudioError('Voice recording is not supported in this browser. You can upload an audio file below.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setVoiceNoteData({
            audioUrl: audioUrl,
            base64Audio: reader.result,
            duration: formatDuration(recordingTime)
          });
        };

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error('Microphone access error:', err);
      setAudioError('Microphone permission was denied. Please allow microphone access or upload an audio file.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  };

  const deleteVoiceNote = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    setIsPlayingPreview(false);
    setVoiceNoteData(null);
    setRecordingTime(0);
  };

  const handleAudioFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setVoiceNoteData({
          audioUrl: audioUrl,
          base64Audio: reader.result,
          duration: 'Uploaded Audio File',
          fileName: file.name
        });
      };
    }
  };

  const togglePreviewPlay = () => {
    if (!audioPlayerRef.current) return;
    if (isPlayingPreview) {
      audioPlayerRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlayingPreview(true);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!isOpen) return null;

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (selectedIds.length === 0) return;
      setStep(2);
    } else if (step === 2) {
      if (!patientData.fullName || !patientData.phone) return;
      const randomId = 'TAZ-' + Math.floor(100000 + Math.random() * 900000);
      setBookingId(randomId);
      
      const newBooking = {
        id: randomId,
        patientName: patientData.fullName,
        age: patientData.age,
        gender: patientData.gender,
        phone: patientData.phone,
        address: patientData.address,
        itemName: combinedTitle,
        price: totalPrice,
        date: appointmentDate,
        timeSlot: timeSlot,
        serviceMode: serviceMode,
        selectedTestCount: selectedItems.length,
        selectedTests: selectedItems.map(i => ({ title: i.title, price: i.price })),
        voiceNote: voiceNoteData ? {
          audioUrl: voiceNoteData.base64Audio || voiceNoteData.audioUrl,
          duration: voiceNoteData.duration || formatDuration(recordingTime),
          recordedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } : null,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      if (onBookingComplete) {
        onBookingComplete(newBooking);
      }

      setStep(3);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden my-6">
        
        {/* Top bar accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-sky-600 via-teal-500 to-amber-500"></div>

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black font-display text-slate-900">
                {step === 3 ? 'Appointment Confirmed!' : 'Book Diagnostic Tests / Packages'}
              </h3>
              <p className="text-xs text-slate-500">
                {step === 1 && 'Step 1 of 2: Multiple Test Selection & Appointment Time'}
                {step === 2 && 'Step 2 of 2: Patient Info & Voice Note'}
                {step === 3 && `Reference ID: ${bookingId}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 3 && (
          <div className="px-5 pt-3 flex items-center justify-between text-xs bg-slate-50/40 border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full font-bold ${step === 1 ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                1. Select Tests ({selectedItems.length})
              </span>
              <span className="text-slate-400">→</span>
              <span className={`px-2.5 py-0.5 rounded-full font-bold ${step === 2 ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                2. Details & Voice Note
              </span>
            </div>

            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <span>Total:</span>
              <span className="text-sm font-black font-display text-emerald-600">₹{totalPrice}</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[78vh] overflow-y-auto">
          
          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              
              {/* Category Switcher: Individual Tests vs Health Packages */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-extrabold text-slate-800">
                    Choose Selection Mode
                  </label>
                  <span className="text-[11px] font-semibold text-sky-700">
                    {selectedType === 'test' ? 'Select 1 or more tests' : 'Select a comprehensive package'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedType('test');
                      if (selectedIds.length === 0 || selectedIds[0].startsWith('pkg')) {
                        setSelectedIds(['test-cbc']);
                      }
                    }}
                    className={`py-2 px-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      selectedType === 'test'
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>🧪 Individual Tests (Multi-Select)</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-white/20">
                      18 Tests
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedType('package');
                      setSelectedIds([HEALTH_PACKAGES[0].id]);
                    }}
                    className={`py-2 px-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      selectedType === 'package'
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>📦 Health Packages</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-white/20">
                      5 Combos
                    </span>
                  </button>
                </div>
              </div>

              {/* MODE 1: MULTIPLE TEST SELECTION */}
              {selectedType === 'test' && (
                <div className="space-y-3">
                  
                  {/* Search and Action Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={testSearchQuery}
                        onChange={(e) => setTestSearchQuery(e.target.value)}
                        placeholder="Search tests (e.g. CBC, Sugar, Lipid, Thyroid, LFT)..."
                        className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500 font-medium"
                      />
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={handleSelectPopularRoutine}
                        className="px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-[11px] font-bold border border-sky-200 transition-colors"
                        title="Add CBC + Sugar + Lipid + Thyroid"
                      >
                        ⚡ Routine 4 Tests
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectAllVisible(filteredIndividualTests)}
                        className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-colors"
                      >
                        Select All
                      </button>
                      {selectedIds.length > 1 && (
                        <button
                          type="button"
                          onClick={handleClearAllExceptOne}
                          className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 text-[11px] font-bold transition-colors"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                    {TEST_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategoryFilter(cat.id)}
                        className={`px-2.5 py-1 rounded-full whitespace-nowrap font-bold transition-all ${
                          activeCategoryFilter === cat.id
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Multi-Select Interactive Test List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1.5 border border-slate-200 rounded-2xl bg-slate-50/50">
                    {filteredIndividualTests.map((test) => {
                      const isSelected = selectedIds.includes(test.id);
                      return (
                        <div
                          key={test.id}
                          onClick={() => toggleTestSelection(test.id)}
                          className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-2 select-none ${
                            isSelected
                              ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-400/30 shadow-xs'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div className={`mt-0.5 w-4 h-4 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                              isSelected
                                ? 'bg-sky-600 border-sky-600 text-white'
                                : 'bg-white border-slate-300'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>

                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-900 leading-tight">
                                {test.title.split('(')[0]}
                              </div>
                              <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                                <span className="truncate max-w-[120px]">{test.sampleType.split('(')[0]}</span>
                                {test.parametersCount > 1 && (
                                  <span className="text-sky-700 font-bold bg-sky-100 px-1.5 py-0.2 rounded">
                                    {test.parametersCount} Params
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-xs font-black text-slate-900">
                              {test.price > 0 ? `₹${test.price}` : 'Custom'}
                            </div>
                            {test.originalPrice > 0 && (
                              <div className="text-[9px] text-slate-400 line-through">₹{test.originalPrice}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {filteredIndividualTests.length === 0 && (
                      <div className="col-span-2 py-6 text-center text-xs text-slate-500">
                        No tests found matching "{testSearchQuery}". Try another keyword or clear filter.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* MODE 2: SPECIAL HEALTH PACKAGES */}
              {selectedType === 'package' && (
                <div className="space-y-2.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Select a Complete Health Screening Package
                  </label>
                  <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto p-1">
                    {packageList.map((pkg) => {
                      const isSelected = selectedIds.includes(pkg.id);
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => handleSelectPackage(pkg.id)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-400/20 shadow-xs'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="healthPackageRadio"
                              checked={isSelected}
                              onChange={() => {}}
                              className="text-sky-600 focus:ring-sky-500"
                            />
                            <div>
                              <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                                <span>{pkg.title}</span>
                                <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-bold">
                                  {pkg.testsCount}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1">{pkg.tagline}</div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-sm font-black font-display text-slate-900">₹{pkg.price}/-</div>
                            <div className="text-[10px] text-slate-400 line-through">₹{pkg.originalPrice}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 🛒 SELECTED TESTS BASKET / TRAY */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-sky-950 text-white border border-slate-800 shadow-md">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                  <span className="font-extrabold text-sky-300 flex items-center gap-1.5">
                    <span>Selected Tests in Order ({selectedItems.length})</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {totalSavings > 0 && (
                      <span className="text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800 font-bold">
                        Save ₹{totalSavings}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400">Total:</span>
                    <span className="text-lg font-black font-display text-emerald-400">₹{totalPrice}</span>
                  </div>
                </div>

                {/* Chips of chosen tests */}
                <div className="flex flex-wrap gap-1.5 mt-2.5 max-h-24 overflow-y-auto">
                  {selectedItems.map((item) => (
                    <span
                      key={item.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700 text-[11px] font-semibold"
                    >
                      <span className="truncate max-w-[150px] sm:max-w-[200px]">{item.title.split('(')[0]}</span>
                      <span className="text-emerald-400 font-bold">₹{item.price}</span>
                      {selectedItems.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSelectedTest(item.id);
                          }}
                          className="w-3.5 h-3.5 rounded-full hover:bg-red-500/40 text-slate-400 hover:text-red-300 flex items-center justify-center ml-0.5"
                          title="Remove test"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service Mode Preference */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Collection Preference
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <div
                    onClick={() => setServiceMode('home')}
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                      serviceMode === 'home'
                        ? 'border-sky-500 bg-sky-50/80 shadow-xs ring-2 ring-sky-400/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <Home className="w-4 h-4 text-sky-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Home Collection (Free)</div>
                      <div className="text-[10px] text-slate-500">Phlebotomist at doorstep</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setServiceMode('center')}
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                      serviceMode === 'center'
                        ? 'border-sky-500 bg-sky-50/80 shadow-xs ring-2 ring-sky-400/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Center Walk-in</div>
                      <div className="text-[10px] text-slate-500">Tallapudi Laboratory</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={today}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-sky-500"
                  >
                    {TIME_SLOTS.map((slot, sIdx) => (
                      <option key={sIdx} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
              >
                <span>Proceed to Patient Details & Voice Note ({selectedItems.length} Tests • ₹{totalPrice})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-4">
              
              {/* Summary Header of Selected Tests */}
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-sky-900">Selected Tests ({selectedItems.length}): </span>
                  <span className="text-slate-700 truncate max-w-[240px] inline-block align-bottom font-medium">
                    {selectedItems.map(i => i.title.split('(')[0]).join(', ')}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-black font-display text-sky-700">₹{totalPrice}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={patientData.fullName}
                    onChange={(e) => setPatientData({ ...patientData, fullName: e.target.value })}
                    placeholder="Enter patient full name"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Age (Years) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="120"
                    value={patientData.age}
                    onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
                    placeholder="e.g., 35"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Gender *
                  </label>
                  <select
                    value={patientData.gender}
                    onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none focus:border-sky-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (For WhatsApp Reports) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={patientData.phone}
                    onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                    placeholder="e.g., 9440985131"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {serviceMode === 'home' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Doorstep Address for Sample Collection *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <textarea
                      rows={2}
                      required
                      value={patientData.address}
                      onChange={(e) => setPatientData({ ...patientData, address: e.target.value })}
                      placeholder="Door No, Street, Landmark, Village/Town (Tallapudi / Gajaram / Chidipi / Kovvur)..."
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-sky-500 resize-none"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* 🎙️ PATIENT VOICE NOTE RECORDER SECTION */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-teal-50/50 to-indigo-50 border-2 border-sky-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-xs">
                      <Mic className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">
                        Leave a Voice Note for Lab Staff (Optional)
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Speak special instructions, prescribed tests, or doorstep directions
                      </div>
                    </div>
                  </div>
                  {voiceNoteData && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ✓ Audio Attached
                    </span>
                  )}
                </div>

                {/* Recorder Controls */}
                {!voiceNoteData ? (
                  <div className="mt-3 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-3">
                      {!isRecording ? (
                        <button
                          type="button"
                          onClick={startRecording}
                          className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
                          <Mic className="w-4 h-4" />
                          <span>Tap to Record Voice Note</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={stopRecording}
                          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center gap-2 shadow-md animate-pulse"
                        >
                          <Square className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                          <span>Stop Recording ({formatDuration(recordingTime)})</span>
                        </button>
                      )}

                      {/* File Upload Option */}
                      <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-300 transition-colors flex items-center gap-1.5">
                        <UploadCloud className="w-4 h-4 text-sky-600" />
                        <span>Upload Audio File</span>
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={handleAudioFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {isRecording && (
                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                        <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
                        <span>Recording in progress... {formatDuration(recordingTime)}. Speak into your device microphone.</span>
                      </div>
                    )}

                    {audioError && (
                      <div className="text-[11px] font-semibold text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                        {audioError}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Audio Playback Preview */
                  <div className="mt-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={togglePreviewPlay}
                        className="w-9 h-9 rounded-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center shadow-sm shrink-0"
                      >
                        {isPlayingPreview ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>

                      <div>
                        <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                          <Volume2 className="w-3.5 h-3.5 text-sky-600" />
                          <span>Voice Note ({voiceNoteData.duration})</span>
                        </div>
                        <div className="text-[10px] text-emerald-700 font-semibold">
                          Will be sent directly to Admin & Pathologist workspace
                        </div>
                      </div>

                      <audio
                        ref={audioPlayerRef}
                        src={voiceNoteData.audioUrl}
                        onEnded={() => setIsPlayingPreview(false)}
                        className="hidden"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={deleteVoiceNote}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete / Re-record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="whatsappCheck"
                  checked={patientData.whatsappUpdates}
                  onChange={(e) => setPatientData({ ...patientData, whatsappUpdates: e.target.checked })}
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <label htmlFor="whatsappCheck" className="text-xs text-slate-700 cursor-pointer font-medium">
                  Send PDF reports & appointment tracking on WhatsApp
                </label>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Booking ({selectedItems.length} Tests • ₹{totalPrice})</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: BOOKING CONFIRMATION SLIP */}
          {step === 3 && (
            <div className="text-center space-y-4 animate-fade-in py-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-black font-display text-slate-900">Booking Confirmed!</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Scheduled with <strong className="text-sky-700">Taz Diagnostic Center</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 font-mono">
                  <span className="text-slate-500 font-sans">Booking Ref:</span>
                  <span className="text-sky-700 font-bold">{bookingId}</span>
                </div>
                
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-slate-500">Selected Tests ({selectedItems.length}):</span>
                    <span className="text-slate-900 font-bold text-right max-w-[280px]">
                      {combinedTitle}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5 pl-2 border-l-2 border-sky-300">
                    {selectedItems.map((item) => (
                      <span key={item.id} className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-semibold">
                        {item.title.split('(')[0]} (₹{item.price})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-500">Patient:</span>
                  <span className="text-slate-900 font-bold">{patientData.fullName} ({patientData.age}y, {patientData.gender})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Date & Slot:</span>
                  <span className="text-emerald-700 font-bold">{appointmentDate} | {timeSlot.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Collection Mode:</span>
                  <span className="text-amber-700 font-bold">{serviceMode === 'home' ? 'Free Doorstep Sample Draw' : 'Center Walk-in'}</span>
                </div>
                
                {voiceNoteData && (
                  <div className="flex justify-between items-center bg-sky-50 p-2 rounded-lg border border-sky-200">
                    <span className="text-sky-800 font-bold flex items-center gap-1">
                      <Mic className="w-3.5 h-3.5 text-sky-600" /> Patient Voice Note:
                    </span>
                    <span className="text-emerald-700 font-bold">Attached ({voiceNoteData.duration})</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <span className="text-slate-500 font-bold">Total Amount:</span>
                  <span className="text-base font-black text-slate-900 font-display">
                    ₹{totalPrice} <span className="text-[10px] text-emerald-600 font-normal">(Pay at sample collection)</span>
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-950 space-y-0.5">
                <div className="font-bold flex items-center gap-1 text-amber-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Fasting & Preparation Guidelines:
                </div>
                <p className="text-[11px] text-amber-900">
                  {requiresFasting 
                    ? 'One or more selected tests require fasting. Please maintain 8-12 hours fasting (water permitted) prior to sample collection.' 
                    : 'No specific fasting required. Normal diet and fluid intake permitted.'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-300"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-1/2 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
