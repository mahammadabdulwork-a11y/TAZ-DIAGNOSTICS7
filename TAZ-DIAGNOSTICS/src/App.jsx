import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import AnatomyExplorer from './components/AnatomyExplorer';
import CustomPackageBuilder from './components/CustomPackageBuilder';
import Packages from './components/Packages';
import Services from './components/Services';
import Founder from './components/Founder';
import About from './components/About';
import TechnologyAdvantage from './components/TechnologyAdvantage';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import PrescriptionScanner from './components/PrescriptionScanner';
import PatientPortal from './components/PatientPortal';
import AdminPage from './components/AdminPage';
import EntryGate from './components/EntryGate';
import { MessageSquare, Calendar, Camera, Sparkles } from 'lucide-react';
import { MEDICAL_TESTS, HEALTH_PACKAGES, CONTACT_INFO } from './data/testsData';

const INITIAL_BOOKINGS = [
  {
    id: 'TAZ-892415',
    patientName: 'K. Venkata Rao',
    age: '58',
    gender: 'Male',
    phone: '9848123456',
    address: 'Opp. Ram Mandir, Main Road, Tallapudi',
    itemName: 'Taz Heart Advanced (56 Parameters)',
    price: 2199,
    date: new Date().toISOString().split('T')[0],
    timeSlot: '07:00 AM - 08:30 AM',
    serviceMode: 'home',
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: 'TAZ-634901',
    patientName: 'P. Lavanya Kumari',
    age: '28',
    gender: 'Female',
    phone: '9490123789',
    address: 'Near Raj Kumar Silks, Tallapudi, Rajahmundry',
    itemName: 'Taz Post Delivery Health Check (56 Parameters)',
    price: 2599,
    date: new Date().toISOString().split('T')[0],
    timeSlot: '08:30 AM - 09:30 AM',
    serviceMode: 'home',
    status: 'confirmed',
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  // Active User session (Patient or Admin)
  const [activeUser, setActiveUser] = useState(() => {
    try {
      const saved = localStorage.getItem('taz_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Dynamic Tests State
  const [tests, setTests] = useState(() => {
    try {
      const saved = localStorage.getItem('taz_custom_tests');
      return saved ? JSON.parse(saved) : MEDICAL_TESTS;
    } catch {
      return MEDICAL_TESTS;
    }
  });

  // Dynamic Packages State
  const [packages, setPackages] = useState(() => {
    try {
      const saved = localStorage.getItem('taz_custom_packages');
      return saved ? JSON.parse(saved) : HEALTH_PACKAGES;
    } catch {
      return HEALTH_PACKAGES;
    }
  });

  // Dynamic Contact & Center Info State
  const [contactInfo, setContactInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('taz_custom_contact');
      return saved ? JSON.parse(saved) : CONTACT_INFO;
    } catch {
      return CONTACT_INFO;
    }
  });

  // Navigation view: 'home' | 'patient' | 'admin'
  const [currentView, setCurrentView] = useState(() => {
    return activeUser?.role === 'admin' ? 'admin' : 'home';
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [preselectedItem, setPreselectedItem] = useState(null);
  const [activeSearch, setActiveSearch] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync state to localStorage
  useEffect(() => {
    if (activeUser) {
      try {
        localStorage.setItem('taz_active_user', JSON.stringify(activeUser));
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.removeItem('taz_active_user');
    }
  }, [activeUser]);

  useEffect(() => {
    try {
      localStorage.setItem('taz_custom_tests', JSON.stringify(tests));
    } catch (e) {
      console.error(e);
    }
  }, [tests]);

  useEffect(() => {
    try {
      localStorage.setItem('taz_custom_packages', JSON.stringify(packages));
    } catch (e) {
      console.error(e);
    }
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem('taz_custom_contact', JSON.stringify(contactInfo));
    } catch (e) {
      console.error(e);
    }
  }, [contactInfo]);

  // Sync with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setCurrentView('admin');
      } else if (hash === '#patient') {
        setCurrentView('patient');
      } else if (hash === '#home' || hash === '#hero' || !hash) {
        setCurrentView('home');
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Bookings state with localStorage persistence
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('taz_diagnostic_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('taz_diagnostic_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Auth Handlers
  const handlePatientLogin = (patientInfo) => {
    setActiveUser(patientInfo);
    setCurrentView('home');
    window.location.hash = '';
    showToast(`Welcome, ${patientInfo.name}! Connected to Taz Diagnostic.`);
  };

  const handleAdminLogin = (adminInfo) => {
    setActiveUser(adminInfo);
    setCurrentView('admin');
    window.location.hash = 'admin';
    showToast(`Welcome Admin Mahammad Abdul Rajak! Accessing Master Control.`);
  };

  const handleLogout = () => {
    setActiveUser(null);
    setCurrentView('home');
    window.location.hash = '';
    localStorage.removeItem('taz_active_user');
    showToast('Signed out successfully.');
  };

  // ---------------- ADMIN CRUD OPERATIONS ----------------
  const handleAddTest = (newTest) => {
    setTests(prev => [newTest, ...prev]);
    showToast(`Test "${newTest.title}" added successfully!`);
  };

  const handleUpdateTest = (updatedTest) => {
    setTests(prev => prev.map(t => t.id === updatedTest.id ? updatedTest : t));
    showToast(`Test "${updatedTest.title}" updated (₹${updatedTest.price})!`);
  };

  const handleDeleteTest = (testId) => {
    setTests(prev => prev.filter(t => t.id !== testId));
    showToast('Test removed from catalog.');
  };

  const handleAddPackage = (newPkg) => {
    setPackages(prev => [newPkg, ...prev]);
    showToast(`Package "${newPkg.title}" added successfully!`);
  };

  const handleUpdatePackage = (updatedPkg) => {
    setPackages(prev => prev.map(p => p.id === updatedPkg.id ? updatedPkg : p));
    showToast(`Package "${updatedPkg.title}" updated (₹${updatedPkg.price})!`);
  };

  const handleDeletePackage = (pkgId) => {
    setPackages(prev => prev.filter(p => p.id !== pkgId));
    showToast('Health Package removed.');
  };

  const handleUpdateContactInfo = (newInfo) => {
    setContactInfo(newInfo);
    showToast('Lab profile and contact settings saved!');
  };

  const handleResetAllData = () => {
    setTests(MEDICAL_TESTS);
    setPackages(HEALTH_PACKAGES);
    setContactInfo(CONTACT_INFO);
    localStorage.removeItem('taz_custom_tests');
    localStorage.removeItem('taz_custom_packages');
    localStorage.removeItem('taz_custom_contact');
    showToast('All tests, pricing, and settings restored to factory defaults!');
  };

  // View Navigation
  const handleNavigateView = (view) => {
    setCurrentView(view);
    window.location.hash = view === 'home' ? '' : view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (item = null) => {
    setPreselectedItem(item);
    setIsBookingOpen(true);
  };

  const handleBookTest = (test) => {
    setPreselectedItem(test);
    setIsBookingOpen(true);
  };

  const handleBookPackage = (pkg) => {
    setPreselectedItem(pkg);
    setIsBookingOpen(true);
  };

  const handleBookingComplete = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
    showToast(`New Booking ${newBooking.id} received for ${newBooking.patientName}! Logged into Admin Queue.`);
  };

  const handlePrescriptionSubmitted = (rxBooking) => {
    setBookings(prev => [rxBooking, ...prev]);
    showToast(`Prescription ${rxBooking.id} received! Our Lab Technician will review and contact you within 15 mins.`);
  };

  const handleUpdateBookingStatus = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    showToast(`Booking ${id} status updated to ${newStatus.toUpperCase()}!`);
  };

  const handleAttachReport = (id, reportData) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'completed', report: reportData } : b));
    showToast(`Diagnostic Report uploaded and released for booking ${id}! Patient can now view & download.`);
  };

  const handleDeleteBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    showToast(`Booking ${id} removed.`);
  };

  const handleSearch = (query) => {
    setActiveSearch(query);
    if (currentView !== 'home') {
      setCurrentView('home');
    }
  };

  const handleInquirySubmit = (formData) => {
    const quickBooking = {
      id: 'TAZ-INQ-' + Math.floor(1000 + Math.random() * 9000),
      patientName: formData.name || activeUser?.name || 'Inquiry Patient',
      age: '-',
      gender: '-',
      phone: formData.phone || activeUser?.phone || '',
      address: formData.message || '-',
      itemName: formData.testRequired || 'Doorstep Collection / Callback Request',
      price: 0,
      date: new Date().toISOString().split('T')[0],
      timeSlot: 'Callback Requested',
      serviceMode: formData.serviceType || 'home',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [quickBooking, ...prev]);
    showToast(`Inquiry for ${quickBooking.patientName} received! Added to Admin queue.`);
  };

  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  // IF NO ACTIVE USER SESSION, SHOW AUTHENTICATION ENTRY GATE
  if (!activeUser) {
    return (
      <EntryGate
        onPatientLogin={handlePatientLogin}
        onAdminLogin={handleAdminLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-sky-500 selection:text-white relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 p-4 rounded-2xl bg-slate-900 border border-sky-400 text-white shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenPrescriptionScanner={() => setIsPrescriptionOpen(true)}
        onSearchOpen={() => {
          if (currentView !== 'home') setCurrentView('home');
          setTimeout(() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onNavigateView={handleNavigateView}
        currentView={currentView}
        pendingCount={pendingCount}
        activeUser={activeUser}
        onLogout={handleLogout}
        contactInfo={contactInfo}
      />

      {/* VIEW 1: PATIENT PORTAL & REPORTS */}
      {currentView === 'patient' && (
        <main className="flex-grow">
          <PatientPortal
            bookings={bookings}
            onOpenBooking={() => handleOpenBooking()}
            onBackToHome={() => handleNavigateView('home')}
            activePatient={activeUser.role === 'patient' ? activeUser : null}
            onLogout={handleLogout}
          />
        </main>
      )}

      {/* VIEW 2: MASTER ADMIN CONTROL ROOM */}
      {currentView === 'admin' && (
        <main className="flex-grow">
          <AdminPage
            bookings={bookings}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onAttachReport={handleAttachReport}
            onDeleteBooking={handleDeleteBooking}
            onBackToHome={() => handleNavigateView('home')}
            activeUser={activeUser}
            onLogout={handleLogout}
            tests={tests}
            onAddTest={handleAddTest}
            onUpdateTest={handleUpdateTest}
            onDeleteTest={handleDeleteTest}
            packages={packages}
            onAddPackage={handleAddPackage}
            onUpdatePackage={handleUpdatePackage}
            onDeletePackage={handleDeletePackage}
            contactInfo={contactInfo}
            onUpdateContactInfo={handleUpdateContactInfo}
            onResetAllData={handleResetAllData}
          />
        </main>
      )}

      {/* VIEW 3: MAIN LANDING PAGE */}
      {currentView === 'home' && (
        <main className="flex-grow">
          <Hero
            onOpenBooking={() => handleOpenBooking()}
            onOpenPrescriptionScanner={() => setIsPrescriptionOpen(true)}
            onSearch={handleSearch}
            contactInfo={contactInfo}
          />

          <StatsBar />

          {/* Breakthrough Feature 1: Interactive Human Body Anatomy Health Explorer */}
          <AnatomyExplorer
            onOpenBooking={handleOpenBooking}
          />

          {/* Breakthrough Feature 2: Build-Your-Own Package Smart Cost & Bundle Calculator */}
          <CustomPackageBuilder
            onOpenBooking={handleOpenBooking}
            tests={tests}
          />

          <Packages
            onBookPackage={handleBookPackage}
            packages={packages}
          />

          <Services
            onBookTest={handleBookTest}
            externalSearch={activeSearch}
            onClearSearch={() => setActiveSearch('')}
            tests={tests}
          />

          {/* Dedicated Founder Section */}
          <Founder
            onOpenBooking={() => handleOpenBooking()}
            contactInfo={contactInfo}
          />

          <About
            onOpenBooking={() => handleOpenBooking()}
          />

          <TechnologyAdvantage />

          <Testimonials />

          <Contact
            onSubmitInquiry={handleInquirySubmit}
            contactInfo={contactInfo}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => handleNavigateView('admin')}
        contactInfo={contactInfo}
      />

      {/* Patient Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedItem={preselectedItem}
        onBookingComplete={handleBookingComplete}
        activePatient={activeUser.role === 'patient' ? activeUser : null}
        tests={tests}
        packages={packages}
      />

      {/* Breakthrough Feature 3: 1-Click Doctor Prescription (Rx) Photo Scanner Modal */}
      <PrescriptionScanner
        isOpen={isPrescriptionOpen}
        onClose={() => setIsPrescriptionOpen(false)}
        onPrescriptionSubmitted={handlePrescriptionSubmitted}
        contactInfo={contactInfo}
        activePatient={activeUser.role === 'patient' ? activeUser : null}
      />

      {/* Floating Speed Dial */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Prescription Upload Quick Button */}
        <button
          onClick={() => setIsPrescriptionOpen(true)}
          className="px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-xl flex items-center gap-2 transition-all hover:scale-105 border border-emerald-400/40"
          title="Upload Doctor's Prescription"
        >
          <Camera className="w-4 h-4 text-white" />
          <span className="hidden sm:inline">📸 Upload Rx Slip</span>
          <span className="sm:hidden">Rx Slip</span>
        </button>

        {/* WhatsApp Direct */}
        <a
          href={`https://wa.me/91${contactInfo.phone || '9440985131'}?text=Hello%20Taz%20Diagnostic,%20I%20am%20${encodeURIComponent(activeUser?.name || 'Patient')}%20and%20want%20to%20inquire%20about%20a%20test`}
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-6 h-6 fill-white text-emerald-600" />
          <span className="sr-only">WhatsApp Chat</span>
        </a>

        {/* Quick Booking Button */}
        <button
          onClick={() => handleOpenBooking()}
          className="px-4 py-2.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-black text-xs shadow-xl flex items-center gap-2 transition-all hover:scale-105"
        >
          <Calendar className="w-4 h-4 text-white" />
          <span className="hidden sm:inline">Book Test / Doorstep Draw</span>
          <span className="sm:hidden">Book Now</span>
        </button>
      </div>

    </div>
  );
}
