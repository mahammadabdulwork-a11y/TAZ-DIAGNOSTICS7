import React, { useState, useRef } from 'react';
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
  Printer, 
  ArrowLeft, 
  DollarSign, 
  Download,
  Mic,
  Volume2,
  Play,
  Pause,
  Headphones,
  Edit3,
  Plus,
  Save,
  RotateCcw,
  Sparkles,
  Layers,
  Droplets,
  Tag,
  Flame,
  Sun,
  HeartPulse,
  Settings,
  Bike,
  Building,
  CheckCheck,
  FileText,
  Upload,
  FileCheck,
  Eye,
  FileSpreadsheet,
  History,
  UserCheck,
  Bell,
  VolumeX,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Send
} from 'lucide-react';
import { CATEGORIES, CONTACT_INFO } from '../data/testsData';
import ReportViewerModal from './ReportViewerModal';

export default function AdminPage({ 
  bookings, 
  onUpdateBookingStatus, 
  onAttachReport,
  onDeleteBooking, 
  onBackToHome, 
  activeUser = null, 
  onLogout,
  tests = [],
  onAddTest,
  onUpdateTest,
  onDeleteTest,
  packages = [],
  onAddPackage,
  onUpdatePackage,
  onDeletePackage,
  contactInfo = {},
  onUpdateContactInfo,
  onResetAllData
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(activeUser?.role === 'admin'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  // Admin Active Tab: 'bookings' | 'patient_history' | 'tests' | 'packages' | 'settings'
  const [adminTab, setAdminTab] = useState('bookings');

  // Bookings filter state
  const [bookingSearchQuery, setBookingSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeAudioBookingId, setActiveAudioBookingId] = useState(null);

  // Patient Medical History Directory State
  const [patientHistorySearch, setPatientHistorySearch] = useState('');
  const [expandedPatientKey, setExpandedPatientKey] = useState(null);
  const [audioNotificationEnabled, setAudioNotificationEnabled] = useState(true);

  // Report Upload / Generator Modal State
  const [uploadingReportForBooking, setUploadingReportForBooking] = useState(null);
  const [viewingReportBooking, setViewingReportBooking] = useState(null);
  const [reportModalTab, setReportModalTab] = useState('upload_file'); // 'upload_file' | 'digital_entry'
  const [reportFormData, setReportFormData] = useState({
    fileName: '',
    fileUrl: '',
    uploadedAt: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    remarks: 'All automated internal quality controls (IQC) verified within acceptable standard deviations. Specimen processed on calibrated computerized multi-analyzers.',
    results: []
  });

  // Tests manager state
  const [testSearchQuery, setTestSearchQuery] = useState('');
  const [testCategoryFilter, setTestCategoryFilter] = useState('all');
  const [editingTest, setEditingTest] = useState(null); // test object or 'new'
  const [testFormData, setTestFormData] = useState({
    title: '',
    category: 'blood',
    description: '',
    duration: '2 Hours',
    sampleType: 'Blood Sample',
    fastingRequired: 'No Fasting Required',
    price: '',
    originalPrice: '',
    parametersCount: 1,
    popular: false
  });

  // Packages manager state
  const [editingPackage, setEditingPackage] = useState(null); // package object or 'new'
  const [packageFormData, setPackageFormData] = useState({
    title: '',
    tagline: '',
    testsCount: '50+ Tests',
    price: '',
    originalPrice: '',
    fastingNote: '10-12 Hours Fasting Required',
    features: ['Computerized Automated multi-analyzer', 'Same Day Digital Report', 'Free Home Collection']
  });
  const [featureInput, setFeatureInput] = useState('');

  // Settings form state
  const [settingsFormData, setSettingsFormData] = useState({
    founderName: contactInfo.founderName || 'Mahammad Abdul Rajak',
    founderTitle: contactInfo.founderTitle || 'Founder & Managing Director',
    phone: contactInfo.phone || '9440985131',
    phoneDisplay: contactInfo.phoneDisplay || '+91 9440985131',
    email: contactInfo.email || 'tazdiagnostic@gmail.com',
    address: contactInfo.address || 'Dr No: 8-200 RAJKUMAR SILKS, Near Raj Kumar Silks Street, Main Road, Tallapudi, Rajahmundry-534341, Andhra Pradesh',
    landmark: contactInfo.landmark || 'Near Raj Kumar Silks Street, Main Road, Tallapudi',
    hours: contactInfo.hours || '24/7 Computerized Automated Lab (Round-the-clock emergency services)',
    homeCollectionHours: contactInfo.homeCollectionHours || '6:30 AM – 9:00 PM (Daily)'
  });
  const [saveSettingsSuccess, setSaveSettingsSuccess] = useState(false);

  const audioPlayerRef = useRef(null);

  // Helper to generate clinical test parameter template
  const getDefaultParametersForBooking = (booking) => {
    const item = (booking.itemName || '').toLowerCase();
    if (item.includes('lipid') || item.includes('cholesterol') || item.includes('cardiac')) {
      return [
        { name: 'Total Cholesterol', value: '168', unit: 'mg/dL', range: '125 - 200', status: 'Normal' },
        { name: 'Triglycerides', value: '135', unit: 'mg/dL', range: '50 - 150', status: 'Normal' },
        { name: 'HDL Cholesterol (Good)', value: '48', unit: 'mg/dL', range: '40 - 60', status: 'Normal' },
        { name: 'LDL Cholesterol (Bad)', value: '93', unit: 'mg/dL', range: '< 100', status: 'Normal' },
        { name: 'VLDL Cholesterol', value: '27', unit: 'mg/dL', range: '10 - 30', status: 'Normal' }
      ];
    }
    if (item.includes('sugar') || item.includes('diabet') || item.includes('glucose') || item.includes('hba1c')) {
      return [
        { name: 'Fasting Blood Sugar (FBS)', value: '92', unit: 'mg/dL', range: '70 - 100', status: 'Normal' },
        { name: 'Post Prandial Blood Sugar (PPBS)', value: '126', unit: 'mg/dL', range: '70 - 140', status: 'Normal' },
        { name: 'HbA1c (Glycated Hemoglobin)', value: '5.4', unit: '%', range: '4.0 - 5.6', status: 'Normal' },
        { name: 'Average Estimated Blood Glucose', value: '108', unit: 'mg/dL', range: '90 - 120', status: 'Normal' }
      ];
    }
    if (item.includes('thyroid') || item.includes('tsh') || item.includes('t3')) {
      return [
        { name: 'Total Triiodothyronine (T3)', value: '1.25', unit: 'ng/mL', range: '0.8 - 2.0', status: 'Normal' },
        { name: 'Total Thyroxine (T4)', value: '8.4', unit: 'ug/dL', range: '5.1 - 14.1', status: 'Normal' },
        { name: 'Thyroid Stimulating Hormone (TSH)', value: '2.35', unit: 'uIU/mL', range: '0.27 - 4.20', status: 'Normal' }
      ];
    }
    if (item.includes('kidney') || item.includes('renal') || item.includes('kft') || item.includes('creatinine')) {
      return [
        { name: 'Serum Creatinine', value: '0.92', unit: 'mg/dL', range: '0.7 - 1.3', status: 'Normal' },
        { name: 'Blood Urea Nitrogen (BUN)', value: '14.5', unit: 'mg/dL', range: '6 - 20', status: 'Normal' },
        { name: 'Serum Uric Acid', value: '4.8', unit: 'mg/dL', range: '3.5 - 7.2', status: 'Normal' },
        { name: 'Serum Sodium', value: '139', unit: 'mEq/L', range: '135 - 145', status: 'Normal' },
        { name: 'Serum Potassium', value: '4.2', unit: 'mEq/L', range: '3.5 - 5.1', status: 'Normal' }
      ];
    }
    if (item.includes('liver') || item.includes('lft') || item.includes('hepatic') || item.includes('bilirubin')) {
      return [
        { name: 'Total Bilirubin', value: '0.85', unit: 'mg/dL', range: '0.2 - 1.2', status: 'Normal' },
        { name: 'Direct Bilirubin', value: '0.22', unit: 'mg/dL', range: '0.0 - 0.3', status: 'Normal' },
        { name: 'SGOT (AST)', value: '26', unit: 'U/L', range: '5 - 40', status: 'Normal' },
        { name: 'SGPT (ALT)', value: '28', unit: 'U/L', range: '7 - 56', status: 'Normal' },
        { name: 'Alkaline Phosphatase (ALP)', value: '82', unit: 'U/L', range: '44 - 147', status: 'Normal' },
        { name: 'Total Protein', value: '7.1', unit: 'g/dL', range: '6.4 - 8.3', status: 'Normal' }
      ];
    }
    // Default Complete Hemogram (CBC)
    return [
      { name: 'Haemoglobin (Hb)', value: '14.2', unit: 'g/dL', range: '13.0 - 17.0', status: 'Normal' },
      { name: 'Total WBC Count', value: '7,400', unit: '/cu.mm', range: '4,000 - 11,000', status: 'Normal' },
      { name: 'Platelet Count', value: '2.6', unit: 'Lakhs/cu.mm', range: '1.5 - 4.5', status: 'Normal' },
      { name: 'RBC Count', value: '4.85', unit: 'mill/cu.mm', range: '4.5 - 5.9', status: 'Normal' },
      { name: 'Packed Cell Volume (PCV)', value: '43.2', unit: '%', range: '40 - 50', status: 'Normal' },
      { name: 'ESR (1st Hour)', value: '12', unit: 'mm/hr', range: '0 - 15', status: 'Normal' }
    ];
  };

  const handleOpenReportModal = (booking) => {
    setUploadingReportForBooking(booking);
    if (booking.report) {
      setReportFormData({
        fileName: booking.report.fileName || '',
        fileUrl: booking.report.fileUrl || '',
        uploadedAt: booking.report.uploadedAt || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        remarks: booking.report.remarks || 'All automated internal quality controls (IQC) verified within acceptable standard deviations.',
        results: booking.report.results || getDefaultParametersForBooking(booking)
      });
      setReportModalTab(booking.report.fileUrl ? 'upload_file' : 'digital_entry');
    } else {
      setReportFormData({
        fileName: '',
        fileUrl: '',
        uploadedAt: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        remarks: 'All automated internal quality controls (IQC) verified within acceptable standard deviations. Specimen processed on calibrated computerized multi-analyzers.',
        results: getDefaultParametersForBooking(booking)
      });
      setReportModalTab('upload_file');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB limit. Please upload a PDF or image under 15MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setReportFormData(prev => ({
        ...prev,
        fileName: file.name,
        fileUrl: uploadEvent.target?.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAndPublishReport = (e) => {
    e.preventDefault();
    if (!uploadingReportForBooking) return;

    const bookingId = uploadingReportForBooking.id;
    const reportData = {
      fileName: reportFormData.fileName || `Taz_Lab_Report_${bookingId}.pdf`,
      fileUrl: reportFormData.fileUrl || null,
      uploadedAt: reportFormData.uploadedAt || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      remarks: reportFormData.remarks || 'All automated internal quality controls (IQC) verified within acceptable standard deviations.',
      results: reportFormData.results && reportFormData.results.length > 0 ? reportFormData.results : null
    };

    if (onAttachReport) {
      onAttachReport(bookingId, reportData);
    } else if (onUpdateBookingStatus) {
      onUpdateBookingStatus(bookingId, 'completed');
    }

    setUploadingReportForBooking(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const inputUser = username.trim().toLowerCase();
    const inputPass = password.trim();

    const isUserValid = inputUser === 'taz@18' || inputUser === 'admin' || inputUser === '9440985131';
    const isPassValid = inputPass === 'Sofiya@2010' || inputPass === '1234';

    if (isUserValid && isPassValid) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    if (onLogout) {
      onLogout();
    }
  };

  // ---------------- TEST EDIT / ADD HANDLERS ----------------
  const handleOpenNewTestModal = () => {
    setTestFormData({
      title: '',
      category: 'blood',
      description: '',
      duration: '2 Hours',
      sampleType: 'Blood Sample',
      fastingRequired: 'No Fasting Required',
      price: '',
      originalPrice: '',
      parametersCount: 1,
      popular: false
    });
    setEditingTest('new');
  };

  const handleOpenEditTestModal = (test) => {
    setTestFormData({
      id: test.id,
      title: test.title || '',
      category: test.category || 'blood',
      description: test.description || '',
      duration: test.duration || '2 Hours',
      sampleType: test.sampleType || 'Blood Sample',
      fastingRequired: test.fastingRequired || 'No Fasting Required',
      price: test.price ?? '',
      originalPrice: test.originalPrice ?? '',
      parametersCount: test.parametersCount || 1,
      popular: Boolean(test.popular)
    });
    setEditingTest(test);
  };

  const handleSaveTestForm = (e) => {
    e.preventDefault();
    if (!testFormData.title || testFormData.price === '') return;

    const numPrice = Number(testFormData.price) || 0;
    const numOrig = Number(testFormData.originalPrice) || (numPrice > 0 ? Math.round(numPrice * 1.3) : 0);
    const discount = numOrig > numPrice ? `${Math.round(((numOrig - numPrice) / numOrig) * 100)}% OFF` : '';

    if (editingTest === 'new') {
      const newId = 'test-' + Date.now();
      const newTest = {
        ...testFormData,
        id: newId,
        price: numPrice,
        originalPrice: numOrig,
        discount,
        features: ['Automated Precision Analyzer', 'Same Day Digital Report', 'Free Home Collection']
      };
      if (onAddTest) onAddTest(newTest);
    } else {
      const updatedTest = {
        ...editingTest,
        ...testFormData,
        price: numPrice,
        originalPrice: numOrig,
        discount
      };
      if (onUpdateTest) onUpdateTest(updatedTest);
    }

    setEditingTest(null);
  };

  // ---------------- PACKAGE EDIT / ADD HANDLERS ----------------
  const handleOpenNewPackageModal = () => {
    setPackageFormData({
      title: '',
      tagline: '',
      testsCount: '50+ Tests',
      price: '',
      originalPrice: '',
      fastingNote: '10-12 Hours Fasting Required',
      features: ['Automated 5-Part Cell Counter', 'CLIA 4th Gen Hormone Assays', 'Full Electrolyte Panel', 'Doctor Consultation Included']
    });
    setEditingPackage('new');
  };

  const handleOpenEditPackageModal = (pkg) => {
    setPackageFormData({
      id: pkg.id,
      title: pkg.title || '',
      tagline: pkg.tagline || '',
      testsCount: pkg.testsCount || '',
      price: pkg.price ?? '',
      originalPrice: pkg.originalPrice ?? '',
      fastingNote: pkg.fastingNote || '',
      features: Array.isArray(pkg.features) ? [...pkg.features] : []
    });
    setEditingPackage(pkg);
  };

  const handleAddFeatureToPackage = () => {
    if (featureInput.trim()) {
      setPackageFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeatureFromPackage = (index) => {
    setPackageFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSavePackageForm = (e) => {
    e.preventDefault();
    if (!packageFormData.title || packageFormData.price === '') return;

    const numPrice = Number(packageFormData.price) || 0;
    const numOrig = Number(packageFormData.originalPrice) || (numPrice > 0 ? Math.round(numPrice * 1.4) : 0);
    const discount = numOrig > numPrice ? `${Math.round(((numOrig - numPrice) / numOrig) * 100)}% OFF` : '';

    if (editingPackage === 'new') {
      const newId = 'pkg-' + Date.now();
      const newPkg = {
        ...packageFormData,
        id: newId,
        price: numPrice,
        originalPrice: numOrig,
        discount
      };
      if (onAddPackage) onAddPackage(newPkg);
    } else {
      const updatedPkg = {
        ...editingPackage,
        ...packageFormData,
        price: numPrice,
        originalPrice: numOrig,
        discount
      };
      if (onUpdatePackage) onUpdatePackage(updatedPkg);
    }

    setEditingPackage(null);
  };

  // ---------------- SETTINGS HANDLER ----------------
  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (onUpdateContactInfo) {
      onUpdateContactInfo(settingsFormData);
      setSaveSettingsSuccess(true);
      setTimeout(() => setSaveSettingsSuccess(false), 3000);
    }
  };

  // Filter Bookings with stage matching
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = 
      statusFilter === 'all' || 
      b.status === statusFilter ||
      (statusFilter === 'active_dispatch' && (b.status === 'on_the_way' || b.status === 'lab_ready')) ||
      (statusFilter === 'completed' && (b.status === 'completed' || Boolean(b.report)));

    const query = bookingSearchQuery.toLowerCase();
    const matchesSearch = !query || 
      b.id?.toLowerCase().includes(query) ||
      b.patientName?.toLowerCase().includes(query) ||
      b.phone?.includes(query) ||
      b.itemName?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  // Filter Tests
  const filteredTests = tests.filter((t) => {
    const matchesCategory = testCategoryFilter === 'all' || t.category === testCategoryFilter;
    const query = testSearchQuery.toLowerCase();
    const matchesSearch = !query ||
      t.title?.toLowerCase().includes(query) ||
      t.description?.toLowerCase().includes(query) ||
      t.sampleType?.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const pendingCount = bookings.filter(b => b.status === 'pending' || !b.status).length;
  const enRouteCount = bookings.filter(b => b.status === 'on_the_way' || b.status === 'lab_ready').length;
  const processingCount = bookings.filter(b => b.status === 'processing').length;
  const completedCount = bookings.filter(b => b.status === 'completed' || Boolean(b.report)).length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.price) || 0), 0);

  // Group bookings by unique patient for Patient History Directory
  const patientsHistoryMap = {};
  bookings.forEach(b => {
    const rawPhone = b.phone ? b.phone.replace(/[^0-9]/g, '') : '';
    const key = rawPhone || (b.patientName ? b.patientName.trim().toLowerCase() : 'unknown');
    if (!patientsHistoryMap[key]) {
      patientsHistoryMap[key] = {
        key: key,
        phone: b.phone || '',
        name: b.patientName || 'Patient',
        age: b.age || '-',
        gender: b.gender || '-',
        address: b.address || '-',
        totalSpent: 0,
        encounters: []
      };
    }
    patientsHistoryMap[key].encounters.push(b);
    patientsHistoryMap[key].totalSpent += (Number(b.price) || 0);
    if (b.age && b.age !== '-') patientsHistoryMap[key].age = b.age;
    if (b.gender && b.gender !== '-') patientsHistoryMap[key].gender = b.gender;
    if (b.address && b.address !== '-' && b.address !== 'Diagnostic Lab Visit') patientsHistoryMap[key].address = b.address;
  });

  const patientsList = Object.values(patientsHistoryMap);
  const filteredPatients = patientsList.filter(p => {
    const q = patientHistorySearch.toLowerCase();
    return p.name.toLowerCase().includes(q) ||
           p.phone.includes(q) ||
           p.encounters.some(e => (e.itemName && e.itemName.toLowerCase().includes(q)) || (e.id && e.id.toLowerCase().includes(q)));
  });

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-sky-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Website</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-600">Taz Lab Master Control Room</span>
          </div>
        </div>

        {!isAuthenticated ? (
          /* Admin Login Gate */
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-sky-400 flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider font-sans">
                Authorized Staff Only
              </span>
              <h2 className="text-2xl font-black font-display text-slate-900 mt-1">
                Admin Control Room Login
              </h2>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Log in to edit test prices, manage health packages, and manage patient bookings.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Admin User ID
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter User ID (Taz@18)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password (Sofiya@2010)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Invalid username or password. Please try again.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Log In to Master Control</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Master Admin Workspace */
          <div className="space-y-6">
            
            {/* Top Workspace Header */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 text-slate-950 flex items-center justify-center font-black">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight">
                      Taz Diagnostic Master Control
                    </h1>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-400 text-slate-950">
                      MASTER ADMIN
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Managing Director: <strong className="text-white">{contactInfo.founderName || 'Mahammad Abdul Rajak'}</strong> • {contactInfo.landmark || 'Tallapudi'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {pendingCount > 0 && (
                  <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-black flex items-center gap-2 animate-pulse">
                    <Bell className="w-3.5 h-3.5 text-amber-400" />
                    <span>{pendingCount} New Action Required</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setAudioNotificationEnabled(!audioNotificationEnabled)}
                  className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
                    audioNotificationEnabled 
                      ? 'bg-sky-950 text-sky-400 border-sky-800' 
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                  title={audioNotificationEnabled ? 'Sound alerts enabled' : 'Sound alerts muted'}
                >
                  {audioNotificationEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Admin Management Tabs (5 Tabs) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300">
              <button
                type="button"
                onClick={() => setAdminTab('bookings')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                  adminTab === 'bookings'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>Bookings ({bookings.length})</span>
                {pendingCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black text-[10px]">
                    {pendingCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('patient_history')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                  adminTab === 'patient_history'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <History className="w-4 h-4 text-indigo-600" />
                <span>Patient History ({patientsList.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('tests')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                  adminTab === 'tests'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Droplets className="w-4 h-4 text-emerald-600" />
                <span>Tests ({tests.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('packages')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                  adminTab === 'packages'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Packages ({packages.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('settings')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1 ${
                  adminTab === 'settings'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Settings className="w-4 h-4 text-slate-700" />
                <span>Lab Settings</span>
              </button>
            </div>

            {/* ==================== TAB 1: BOOKINGS QUEUE ==================== */}
            {adminTab === 'bookings' && (
              <div className="space-y-6">
                
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Total Queue</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-slate-900 mt-1">
                      {bookings.length}
                    </div>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200 bg-amber-50/40 shadow-xs">
                    <div className="text-[11px] font-bold text-amber-700 uppercase">Pending Approval</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-amber-700 mt-1">
                      {pendingCount}
                    </div>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sky-200 bg-sky-50/40 shadow-xs">
                    <div className="text-[11px] font-bold text-sky-700 uppercase">En Route / In Lab</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-sky-700 mt-1">
                      {enRouteCount + processingCount}
                    </div>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 shadow-xs">
                    <div className="text-[11px] font-bold text-emerald-700 uppercase">Reports Ready</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-emerald-700 mt-1">
                      {completedCount}
                    </div>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={bookingSearchQuery}
                      onChange={(e) => setBookingSearchQuery(e.target.value)}
                      placeholder="Search patient, phone, Ref ID..."
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs font-bold">
                    <button
                      onClick={() => setStatusFilter('all')}
                      className={`px-3 py-1.5 rounded-xl transition-colors shrink-0 ${statusFilter === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      All ({bookings.length})
                    </button>
                    <button
                      onClick={() => setStatusFilter('pending')}
                      className={`px-3 py-1.5 rounded-xl transition-colors shrink-0 ${statusFilter === 'pending' ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      Pending ({pendingCount})
                    </button>
                    <button
                      onClick={() => setStatusFilter('active_dispatch')}
                      className={`px-3 py-1.5 rounded-xl transition-colors shrink-0 ${statusFilter === 'active_dispatch' ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      En Route / Ready ({enRouteCount})
                    </button>
                    <button
                      onClick={() => setStatusFilter('processing')}
                      className={`px-3 py-1.5 rounded-xl transition-colors shrink-0 ${statusFilter === 'processing' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      Testing in Lab ({processingCount})
                    </button>
                    <button
                      onClick={() => setStatusFilter('completed')}
                      className={`px-3 py-1.5 rounded-xl transition-colors shrink-0 ${statusFilter === 'completed' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      Reports Ready ({completedCount})
                    </button>
                  </div>
                </div>

                {/* Bookings List Cards */}
                <div className="space-y-4">
                  {filteredBookings.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
                      No bookings found matching current filters.
                    </div>
                  ) : (
                    filteredBookings.map((b) => {
                      const status = b.status || 'pending';
                      const isPending = status === 'pending';
                      const isOnTheWay = status === 'on_the_way';
                      const isLabReady = status === 'lab_ready';
                      const isProcessing = status === 'processing';
                      const isCompleted = status === 'completed' || Boolean(b.report);
                      const isHome = b.serviceMode === 'home';

                      return (
                        <div
                          key={b.id}
                          className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4"
                        >
                          {/* Top Row: Ref ID, Status, and Direct Actions */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-black text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
                                {b.id}
                              </span>
                              <span className="text-xs text-slate-400">
                                {new Date(b.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {b.date}
                              </span>

                              {/* Live Status Badge */}
                              {isPending && (
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-amber-600" />
                                  <span>Pending Lab Review</span>
                                </span>
                              )}
                              {isOnTheWay && (
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-sky-100 text-sky-900 border border-sky-300 flex items-center gap-1 animate-pulse">
                                  <Bike className="w-3.5 h-3.5 text-sky-600" />
                                  <span>Phlebotomist On The Way</span>
                                </span>
                              )}
                              {isLabReady && (
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                                  <Building className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Technician Ready at Lab</span>
                                </span>
                              )}
                              {isProcessing && (
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-100 text-indigo-900 border border-indigo-300 flex items-center gap-1 animate-pulse">
                                  <Droplets className="w-3.5 h-3.5 text-indigo-600" />
                                  <span>Sample Testing In Lab</span>
                                </span>
                              )}
                              {isCompleted && (
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Report Verified & Released</span>
                                </span>
                              )}
                            </div>

                            {/* Status Workflow Action Buttons */}
                            <div className="flex flex-wrap items-center gap-2">
                              {/* Step 1: Initial Dispatch / Tech Ready */}
                              {isPending && isHome && (
                                <button
                                  type="button"
                                  onClick={() => onUpdateBookingStatus(b.id, 'on_the_way')}
                                  className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-black flex items-center gap-1.5 shadow-xs transition-transform hover:scale-105"
                                  title="Notify patient that technician is en route to their address"
                                >
                                  <Bike className="w-3.5 h-3.5" />
                                  <span>Dispatch Phlebotomist (On the Way)</span>
                                </button>
                              )}

                              {isPending && !isHome && (
                                <button
                                  type="button"
                                  onClick={() => onUpdateBookingStatus(b.id, 'lab_ready')}
                                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow-xs transition-transform hover:scale-105"
                                  title="Notify walk-in patient that technician is ready at the lab"
                                >
                                  <Building className="w-3.5 h-3.5" />
                                  <span>Mark Tech Ready at Lab</span>
                                </button>
                              )}

                              {/* Step 2: Mark Sample in Lab / Processing */}
                              {(isOnTheWay || isLabReady) && (
                                <button
                                  type="button"
                                  onClick={() => onUpdateBookingStatus(b.id, 'processing')}
                                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center gap-1.5 shadow-xs transition-transform hover:scale-105"
                                  title="Blood collected, now analyzing in automated multi-analyzer"
                                >
                                  <Droplets className="w-3.5 h-3.5" />
                                  <span>Sample In Lab (Processing)</span>
                                </button>
                              )}

                              {/* Step 3: Attach / Upload & Complete Medical Report */}
                              <button
                                type="button"
                                onClick={() => handleOpenReportModal(b)}
                                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
                                title="Upload or generate clinical laboratory report for patient"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                <span>{isCompleted ? 'Update / Re-Upload Report' : 'Upload / Generate Report'}</span>
                              </button>

                              {/* Step 4: Preview Report if Available */}
                              {isCompleted && (
                                <button
                                  type="button"
                                  onClick={() => setViewingReportBooking(b)}
                                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-400 text-xs font-black flex items-center gap-1.5 shadow-xs transition-transform hover:scale-105"
                                  title="View published medical report"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>View Report</span>
                                </button>
                              )}

                              {!isPending && (
                                <button
                                  type="button"
                                  onClick={() => onUpdateBookingStatus(b.id, 'pending')}
                                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-bold"
                                  title="Reset status back to Pending"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => onDeleteBooking(b.id)}
                                className="p-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                                title="Delete Booking"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Middle Row: Patient, Phone, Test, Mode */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                            <div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase">Patient Name</div>
                              <div className="font-bold text-slate-900 text-sm mt-0.5">{b.patientName}</div>
                              <div className="text-slate-500 font-medium">{b.age} Yrs • {b.gender}</div>
                            </div>

                            <div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase">Contact Phone</div>
                              <a href={`tel:${b.phone}`} className="font-bold text-sky-600 hover:underline flex items-center gap-1 mt-0.5">
                                <Phone className="w-3 h-3" />
                                <span>{b.phone}</span>
                              </a>
                              <a
                                href={`https://wa.me/91${b.phone}?text=Hello%20${encodeURIComponent(b.patientName)},%20this%20is%20Taz%20Diagnostic%20regarding%20your%20booking%20${b.id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-1 mt-0.5"
                              >
                                <MessageSquare className="w-2.5 h-2.5" />
                                <span>Message on WhatsApp</span>
                              </a>
                            </div>

                            <div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase">Booked Test / Package</div>
                              <div className="font-bold text-slate-900 mt-0.5 line-clamp-1">{b.itemName}</div>
                              <div className="text-emerald-600 font-extrabold">₹{b.price} Payable</div>
                            </div>

                            <div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase">Appointment & Mode</div>
                              <div className="font-bold text-slate-900 mt-0.5">{b.date}</div>
                              <div className="text-slate-600">{b.timeSlot?.split('(')[0]}</div>
                              <div className="text-[11px] font-bold text-sky-700">
                                {isHome ? '🏠 Home Collection' : '🏢 Center Walk-in'}
                              </div>
                            </div>
                          </div>

                          {/* Voice Note Section */}
                          {b.voiceNote && (
                            <div className="p-3 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0">
                                  <Mic className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                                    <span>Patient Voice Instruction Attached</span>
                                    <span className="text-[10px] font-bold text-sky-700 bg-white px-1.5 py-0.2 rounded border border-sky-200">
                                      {b.voiceNote.duration || 'Audio'}
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-slate-500">Recorded by patient during booking</div>
                                </div>
                              </div>

                              <audio controls src={b.voiceNote.audioUrl} className="h-8 max-w-full sm:w-60" />
                            </div>
                          )}

                          {/* Uploaded Doctor Prescription (Rx) Section */}
                          {b.prescriptionImage && (
                            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs font-black text-emerald-900">
                                  <FileText className="w-4 h-4 text-emerald-700" />
                                  <span>Doctor Prescription (Rx) Slip Attached</span>
                                </div>
                                <a
                                  href={b.prescriptionImage}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline flex items-center gap-1"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Open Full Image</span>
                                </a>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-4 items-start">
                                <a href={b.prescriptionImage} target="_blank" rel="noreferrer" className="shrink-0 group">
                                  <img
                                    src={b.prescriptionImage}
                                    alt="Doctor Prescription"
                                    className="w-32 h-32 object-cover rounded-xl border border-emerald-300 shadow-sm group-hover:scale-105 transition-transform"
                                  />
                                </a>
                                <div className="space-y-1.5 text-xs text-slate-700 flex-1">
                                  {b.notes && (
                                    <div className="p-2 bg-white rounded-lg border border-emerald-200 font-medium">
                                      <strong className="text-slate-900">Patient Note:</strong> {b.notes}
                                    </div>
                                  )}
                                  <div className="text-[11px] text-slate-600">
                                    💡 <em>Technician Tip:</em> Review the test names on the slip, then click <strong>"Message on WhatsApp"</strong> above to send the patient their customized quote and schedule their draw!
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {b.address && b.address !== '-' && (
                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                              <span className="font-medium">Doorstep Collection Address: <strong>{b.address}</strong></span>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

              </div>
            )}

            {/* ==================== TAB 2: PATIENT DIRECTORY & MEDICAL HISTORY ==================== */}
            {adminTab === 'patient_history' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Registered Patients</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-slate-900 mt-1">
                      {patientsList.length}
                    </div>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sky-200 bg-sky-50/40 shadow-xs">
                    <div className="text-[11px] font-bold text-sky-700 uppercase">Total Lab Encounters</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-sky-700 mt-1">
                      {bookings.length}
                    </div>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 shadow-xs">
                    <div className="text-[11px] font-bold text-emerald-700 uppercase">Lifetime Diagnostic Billing</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-emerald-700 mt-1">
                      ₹{bookings.reduce((acc, b) => acc + (Number(b.price) || 0), 0).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-indigo-200 bg-indigo-50/40 shadow-xs">
                    <div className="text-[11px] font-bold text-indigo-700 uppercase">Completed Lab Reports</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-indigo-700 mt-1">
                      {completedCount}
                    </div>
                  </div>
                </div>

                {/* Patient Search Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="relative w-full sm:w-96">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={patientHistorySearch}
                      onChange={(e) => setPatientHistorySearch(e.target.value)}
                      placeholder="Search patient name, mobile number, past test or ID..."
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 font-semibold"
                    />
                  </div>

                  <div className="text-xs text-slate-500 font-semibold">
                    Showing <strong>{filteredPatients.length}</strong> of <strong>{patientsList.length}</strong> Patient Profiles
                  </div>
                </div>

                {/* Patients History List */}
                <div className="space-y-4">
                  {filteredPatients.map((patient) => {
                    const isExpanded = expandedPatientKey === patient.key;

                    return (
                      <div
                        key={patient.key}
                        className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-200 hover:border-sky-300"
                      >
                        {/* Patient Summary Header */}
                        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start sm:items-center gap-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                              {patient.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-base font-black text-slate-900 font-display">
                                  {patient.name}
                                </h3>
                                <span className="text-xs font-bold text-slate-500">
                                  ({patient.age} Yrs • {patient.gender})
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-extrabold">
                                  {patient.encounters.length} {patient.encounters.length === 1 ? 'Visit' : 'Visits'}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                                <a href={`tel:${patient.phone}`} className="font-bold text-sky-600 hover:underline flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  <span>{patient.phone || 'No Phone'}</span>
                                </a>
                                {patient.address && patient.address !== '-' && (
                                  <span className="flex items-center gap-1 text-slate-600">
                                    <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                                    <span className="line-clamp-1">{patient.address}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <div className="text-right mr-2">
                              <div className="text-[10px] font-bold text-slate-400 uppercase">Lifetime Spend</div>
                              <div className="text-base font-black text-emerald-600">₹{patient.totalSpent}</div>
                            </div>

                            <a
                              href={`https://wa.me/91${patient.phone}?text=Hello%20${encodeURIComponent(patient.name)},%20this%20is%20Taz%20Diagnostic%20Center%20Tallapudi.%20We%20are%20reaching%20out%20with%20your%20diagnostic%20records%20and%20retest%20assistance.`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center gap-1.5 border border-emerald-200 transition-colors"
                              title="WhatsApp Patient"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span className="hidden md:inline">WhatsApp</span>
                            </a>

                            <button
                              type="button"
                              onClick={() => setExpandedPatientKey(isExpanded ? null : patient.key)}
                              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
                            >
                              <History className="w-3.5 h-3.5 text-sky-600" />
                              <span>{isExpanded ? 'Hide History' : `History (${patient.encounters.length})`}</span>
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        {/* Expanded Historical Timeline */}
                        {isExpanded && (
                          <div className="border-t border-slate-100 bg-slate-50/70 p-4 sm:p-5 space-y-3">
                            <div className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                              <Calendar className="w-3.5 h-3.5 text-sky-600" />
                              <span>Chronological Laboratory Investigations & Retest Timeline</span>
                            </div>

                            <div className="space-y-2.5">
                              {patient.encounters.map((enc) => (
                                <div
                                  key={enc.id}
                                  className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                                >
                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-mono text-xs font-bold text-sky-700">{enc.id}</span>
                                      <span className="text-slate-300">•</span>
                                      <span className="text-xs font-bold text-slate-800">{enc.date}</span>
                                      <span className="text-[10px] font-semibold text-slate-500">({enc.timeSlot?.split('(')[0]})</span>
                                      <span className={`px-2 py-0.2 rounded-full text-[10px] font-black uppercase ${
                                        enc.status === 'completed'
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : 'bg-amber-100 text-amber-800'
                                      }`}>
                                        {enc.status}
                                      </span>
                                    </div>
                                    <div className="text-xs font-bold text-slate-900 mt-1">{enc.itemName}</div>
                                    <div className="text-[11px] text-slate-500 mt-0.5">
                                      Service: {enc.serviceMode === 'home' ? '🏠 Doorstep Home Collection' : '🏥 Diagnostic Center'} • Bill: <strong>₹{enc.price}</strong>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => setViewingReportBooking(enc)}
                                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 font-bold text-xs flex items-center gap-1 transition-colors"
                                    >
                                      <FileText className="w-3.5 h-3.5" />
                                      <span>View Report</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => handleOpenReportModal(enc)}
                                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                                    >
                                      <Upload className="w-3.5 h-3.5" />
                                      <span>Edit / Generate</span>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {filteredPatients.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
                      No matching patient medical records found.
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ==================== TAB 3: TESTS & PRICING MANAGER ==================== */}
            {adminTab === 'tests' && (
              <div className="space-y-6">
                
                {/* Header Action Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-1">
                    <div className="relative w-full sm:w-72">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={testSearchQuery}
                        onChange={(e) => setTestSearchQuery(e.target.value)}
                        placeholder="Search tests to edit price or name..."
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <select
                      value={testCategoryFilter}
                      onChange={(e) => setTestCategoryFilter(e.target.value)}
                      className="w-full sm:w-48 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:border-sky-500"
                    >
                      <option value="all">All Categories ({tests.length})</option>
                      <option value="blood">🩸 Hematology & CBC</option>
                      <option value="diabetes-cardiac">🩺 Diabetes & Cardiac</option>
                      <option value="biochemistry">🧪 Biochemistry & Organs</option>
                      <option value="hormones">🧬 Hormones & Thyroid</option>
                      <option value="vitamins">☀️ Vitamins & Bone</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenNewTestModal}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Test</span>
                  </button>
                </div>

                {/* Tests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTests.map((test) => (
                    <div
                      key={test.id}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                              {test.category}
                            </span>
                            {test.popular && (
                              <span className="ml-1.5 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                                Popular
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditTestModal(test)}
                              className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold flex items-center gap-1 border border-sky-200 transition-colors"
                              title="Edit Test Details & Pricing"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span className="text-[11px]">Edit</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => onDeleteTest && onDeleteTest(test.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                              title="Delete Test"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <h3 className="text-sm font-extrabold text-slate-900 mt-2 line-clamp-1">
                          {test.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                          {test.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div className="space-y-0.5">
                          <div className="text-[11px] text-slate-500 font-medium">Sample: <strong className="text-slate-800">{test.sampleType?.split('(')[0]}</strong></div>
                          <div className="text-[10px] text-slate-400 font-medium">Turnaround: {test.duration || 'Same Day'}</div>
                        </div>

                        <div className="text-right">
                          <div className="text-base font-black font-display text-emerald-600">
                            ₹{test.price}/-
                          </div>
                          {test.originalPrice > 0 && (
                            <div className="text-[10px] text-slate-400 line-through">
                              ₹{test.originalPrice}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ==================== TAB 3: HEALTH PACKAGES MANAGER ==================== */}
            {adminTab === 'packages' && (
              <div className="space-y-6">
                
                {/* Header Action Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Health Packages Catalog</h3>
                    <p className="text-xs text-slate-500">Edit package pricing, features list, and add customized health bundles.</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenNewPackageModal}
                    className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md flex items-center gap-2 transition-all hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Package</span>
                  </button>
                </div>

                {/* Packages List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md space-y-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                            {pkg.testsCount || 'Full Panel'}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditPackageModal(pkg)}
                              className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold flex items-center gap-1 border border-sky-200 transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit Package</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => onDeletePackage && onDeletePackage(pkg.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                              title="Delete Package"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <h3 className="text-base font-black font-display text-slate-900 mt-2">
                          {pkg.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">{pkg.tagline}</p>

                        {pkg.features && Array.isArray(pkg.features) && (
                          <div className="mt-3 space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Included Investigations</div>
                            {pkg.features.slice(0, 4).map((f, fIdx) => (
                              <div key={fIdx} className="text-[11px] text-slate-700 flex items-center gap-1.5 font-medium">
                                <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span className="truncate">{f}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-xs text-slate-500 font-medium">
                          {pkg.fastingNote || 'Fasting Required'}
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-black font-display text-slate-900">
                            ₹{pkg.price}/-
                          </div>
                          {pkg.originalPrice > 0 && (
                            <div className="text-[10px] text-slate-400 line-through">
                              ₹{pkg.originalPrice}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ==================== TAB 4: LAB PROFILE & SETTINGS ==================== */}
            {adminTab === 'settings' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                <div>
                  <h2 className="text-xl font-black font-display text-slate-900">
                    Diagnostic Center Profile & Contact Settings
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Update phone numbers, physical center address in Tallapudi, founder info, and operating hours. All edits reflect immediately across the entire website.
                  </p>
                </div>

                {saveSettingsSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Lab Settings & Contact Information updated successfully!</span>
                  </div>
                )}

                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Managing Director / Founder Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsFormData.founderName}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, founderName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Founder Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsFormData.founderTitle}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, founderTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Primary Phone (10 digits) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={settingsFormData.phone}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Display Phone Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsFormData.phoneDisplay}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, phoneDisplay: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Official Email Desk *
                      </label>
                      <input
                        type="email"
                        required
                        value={settingsFormData.email}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Diagnostic Laboratory Address *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={settingsFormData.address}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, address: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:border-sky-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Landmark Description *
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsFormData.landmark}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, landmark: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Operating Hours *
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsFormData.hours}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, hours: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Home Collection Hours *
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsFormData.homeCollectionHours}
                        onChange={(e) => setSettingsFormData({ ...settingsFormData, homeCollectionHours: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Settings & Publish Changes</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to reset all custom edits, tests, and packages back to default values?')) {
                          if (onResetAllData) onResetAllData();
                        }
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs font-bold border border-slate-300 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore Factory Defaults</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        )}

      </div>

      {/* ==================== EDIT / ADD TEST MODAL ==================== */}
      {editingTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black font-display text-slate-900">
                {editingTest === 'new' ? 'Add New Diagnostic Test' : `Edit Test: ${editingTest.title}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingTest(null)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTestForm} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Test Title *
                </label>
                <input
                  type="text"
                  required
                  value={testFormData.title}
                  onChange={(e) => setTestFormData({ ...testFormData, title: e.target.value })}
                  placeholder="e.g., Complete Blood Count (CBC) with ESR"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={testFormData.price}
                    onChange={(e) => setTestFormData({ ...testFormData, price: e.target.value })}
                    placeholder="e.g., 350"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-emerald-600 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={testFormData.originalPrice}
                    onChange={(e) => setTestFormData({ ...testFormData, originalPrice: e.target.value })}
                    placeholder="e.g., 500"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={testFormData.category}
                    onChange={(e) => setTestFormData({ ...testFormData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:border-sky-500"
                  >
                    <option value="blood">Hematology & CBC</option>
                    <option value="diabetes-cardiac">Diabetes & Cardiac Risk</option>
                    <option value="biochemistry">Biochemistry & Organs</option>
                    <option value="hormones">Hormones & Thyroid</option>
                    <option value="vitamins">Vitamins & Bone</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Parameters Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={testFormData.parametersCount}
                    onChange={(e) => setTestFormData({ ...testFormData, parametersCount: Number(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sample Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={testFormData.sampleType}
                    onChange={(e) => setTestFormData({ ...testFormData, sampleType: e.target.value })}
                    placeholder="e.g., Blood Sample (EDTA)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Turnaround Duration
                  </label>
                  <input
                    type="text"
                    value={testFormData.duration}
                    onChange={(e) => setTestFormData({ ...testFormData, duration: e.target.value })}
                    placeholder="e.g., 2 Hours"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Fasting Requirement Note
                </label>
                <input
                  type="text"
                  value={testFormData.fastingRequired}
                  onChange={(e) => setTestFormData({ ...testFormData, fastingRequired: e.target.value })}
                  placeholder="e.g., 8-10 Hrs Fasting / No Fasting Required"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Medical Description
                </label>
                <textarea
                  rows={2}
                  value={testFormData.description}
                  onChange={(e) => setTestFormData({ ...testFormData, description: e.target.value })}
                  placeholder="Clinical significance and organ panel details..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="popularCheck"
                  checked={testFormData.popular}
                  onChange={(e) => setTestFormData({ ...testFormData, popular: e.target.checked })}
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <label htmlFor="popularCheck" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Mark as Popular / Recommended Test
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTest(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Test</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== EDIT / ADD PACKAGE MODAL ==================== */}
      {editingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black font-display text-slate-900">
                {editingPackage === 'new' ? 'Add New Health Package' : `Edit Package: ${editingPackage.title}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingPackage(null)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePackageForm} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Package Name *
                </label>
                <input
                  type="text"
                  required
                  value={packageFormData.title}
                  onChange={(e) => setPackageFormData({ ...packageFormData, title: e.target.value })}
                  placeholder="e.g., Taz Senior Citizen Full Body Check"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tagline / Highlights *
                </label>
                <input
                  type="text"
                  required
                  value={packageFormData.tagline}
                  onChange={(e) => setPackageFormData({ ...packageFormData, tagline: e.target.value })}
                  placeholder="e.g., Comprehensive Vital Organ & Diabetes Health Assessment"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={packageFormData.price}
                    onChange={(e) => setPackageFormData({ ...packageFormData, price: e.target.value })}
                    placeholder="e.g., 2199"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-black text-emerald-600 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={packageFormData.originalPrice}
                    onChange={(e) => setPackageFormData({ ...packageFormData, originalPrice: e.target.value })}
                    placeholder="e.g., 3499"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-400 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tests Count Badge
                  </label>
                  <input
                    type="text"
                    value={packageFormData.testsCount}
                    onChange={(e) => setPackageFormData({ ...packageFormData, testsCount: e.target.value })}
                    placeholder="e.g., 56 Tests"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Fasting Guidelines
                </label>
                <input
                  type="text"
                  value={packageFormData.fastingNote}
                  onChange={(e) => setPackageFormData({ ...packageFormData, fastingNote: e.target.value })}
                  placeholder="e.g., 10-12 Hours Fasting Required"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Package Features List */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Included Investigations / Bullets
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add test feature (e.g., Lipid Profile 10 Parameters)..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sky-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeatureToPackage();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddFeatureToPackage}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700"
                  >
                    + Add
                  </button>
                </div>

                <div className="space-y-1.5 max-h-32 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {packageFormData.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center justify-between gap-2 text-xs bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      <span className="truncate">{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeatureFromPackage(fIdx)}
                        className="text-red-500 hover:text-red-700 font-bold px-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPackage(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Package</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 3: REPORT UPLOAD & DIGITAL GENERATOR ==================== */}
      {uploadingReportForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black font-display text-slate-900 flex items-center gap-2">
                    <span>Attach & Publish Diagnostic Report</span>
                    <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded">
                      Ref: {uploadingReportForBooking.id}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Patient: <strong className="text-slate-900">{uploadingReportForBooking.patientName}</strong> • {uploadingReportForBooking.itemName}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setUploadingReportForBooking(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switch Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setReportModalTab('upload_file')}
                className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  reportModalTab === 'upload_file'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Upload className="w-4 h-4 text-emerald-600" />
                <span>Upload PDF / Image File</span>
              </button>

              <button
                type="button"
                onClick={() => setReportModalTab('digital_entry')}
                className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  reportModalTab === 'digital_entry'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 text-sky-600" />
                <span>Structured Digital Lab Sheet</span>
              </button>
            </div>

            <form onSubmit={handleSaveAndPublishReport} className="space-y-4">
              
              {/* TAB 1: DIRECT FILE ATTACHMENT */}
              {reportModalTab === 'upload_file' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/30 rounded-2xl p-6 text-center transition-colors">
                    <input
                      type="file"
                      id="reportFileInput"
                      accept="application/pdf,image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="reportFileInput" className="cursor-pointer block space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200 text-emerald-600 flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-bold text-slate-800">
                        {reportFormData.fileName ? (
                          <span className="text-emerald-700 font-extrabold flex items-center justify-center gap-1">
                            <CheckCheck className="w-4 h-4 text-emerald-600" />
                            <span>Attached: {reportFormData.fileName}</span>
                          </span>
                        ) : (
                          <span>Click to select PDF or Image Report from Lab Scanner / Computer</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Supports standard medical PDF files, scanned JPEGs, and PNG reports up to 15MB
                      </p>
                    </label>
                  </div>

                  {reportFormData.fileUrl && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                      <span className="font-bold truncate">File Ready: {reportFormData.fileName}</span>
                      <button
                        type="button"
                        onClick={() => setReportFormData(prev => ({ ...prev, fileName: '', fileUrl: '' }))}
                        className="text-red-600 font-bold hover:underline ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: STRUCTURED CLINICAL PARAMETERS */}
              {reportModalTab === 'digital_entry' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Clinical Investigation Parameters:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setReportFormData(prev => ({
                          ...prev,
                          results: getDefaultParametersForBooking(uploadingReportForBooking)
                        }));
                      }}
                      className="text-[11px] font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Auto-fill standard normal values</span>
                    </button>
                  </div>

                  <div className="max-h-56 overflow-y-auto space-y-2 p-2 bg-slate-50 rounded-2xl border border-slate-200">
                    {(reportFormData.results || []).map((row, rIdx) => (
                      <div key={rIdx} className="grid grid-cols-12 gap-1.5 items-center bg-white p-2 rounded-xl border border-slate-200 text-xs">
                        <div className="col-span-4">
                          <input
                            type="text"
                            value={row.name}
                            onChange={(e) => {
                              const updated = [...reportFormData.results];
                              updated[rIdx].name = e.target.value;
                              setReportFormData({ ...reportFormData, results: updated });
                            }}
                            placeholder="Parameter Name"
                            className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none"
                          />
                        </div>
                        <div className="col-span-3">
                          <input
                            type="text"
                            value={row.value}
                            onChange={(e) => {
                              const updated = [...reportFormData.results];
                              updated[rIdx].value = e.target.value;
                              setReportFormData({ ...reportFormData, results: updated });
                            }}
                            placeholder="Value"
                            className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black text-emerald-700 focus:outline-none"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="text"
                            value={row.unit}
                            onChange={(e) => {
                              const updated = [...reportFormData.results];
                              updated[rIdx].unit = e.target.value;
                              setReportFormData({ ...reportFormData, results: updated });
                            }}
                            placeholder="Unit"
                            className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 focus:outline-none"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="text"
                            value={row.range}
                            onChange={(e) => {
                              const updated = [...reportFormData.results];
                              updated[rIdx].range = e.target.value;
                              setReportFormData({ ...reportFormData, results: updated });
                            }}
                            placeholder="Range"
                            className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 focus:outline-none"
                          />
                        </div>
                        <div className="col-span-1 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = reportFormData.results.filter((_, idx) => idx !== rIdx);
                              setReportFormData({ ...reportFormData, results: updated });
                            }}
                            className="text-red-500 font-bold hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        const current = reportFormData.results || [];
                        setReportFormData({
                          ...reportFormData,
                          results: [...current, { name: '', value: '', unit: '', range: '', status: 'Normal' }]
                        });
                      }}
                      className="w-full py-1.5 rounded-xl border border-dashed border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      + Add Parameter Row
                    </button>
                  </div>
                </div>
              )}

              {/* Pathologist Clinical Remarks */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Clinical Remarks / Pathologist Verification Note
                </label>
                <textarea
                  rows={2}
                  value={reportFormData.remarks}
                  onChange={(e) => setReportFormData({ ...reportFormData, remarks: e.target.value })}
                  placeholder="Clinical interpretations, IQC checks, or doctor remarks..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Lab Director Verification Stamp Notice */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified by: <strong>{contactInfo.founderName || 'Mahammad Abdul Rajak'}</strong> (Managing Director)</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  NABL Standards
                </span>
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setUploadingReportForBooking(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black shadow-md flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95"
                >
                  <CheckCheck className="w-4 h-4" />
                  <span>Publish & Deliver to Patient Portal</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ==================== PREVIEW REPORT VIEWER MODAL ==================== */}
      {viewingReportBooking && (
        <ReportViewerModal
          isOpen={Boolean(viewingReportBooking)}
          onClose={() => setViewingReportBooking(null)}
          booking={viewingReportBooking}
          contactInfo={contactInfo}
        />
      )}

    </div>
  );
}

