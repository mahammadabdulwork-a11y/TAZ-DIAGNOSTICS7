import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Check, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  ArrowRight, 
  Percent, 
  Home, 
  Clock, 
  Droplets, 
  Search, 
  Layers,
  ChevronRight,
  Flame
} from 'lucide-react';
import { MEDICAL_TESTS } from '../data/testsData';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Tests' },
  { id: 'blood', label: '🩸 Hematology' },
  { id: 'diabetes-cardiac', label: '❤️ Heart & Diabetes' },
  { id: 'biochemistry', label: '🧪 Liver & Kidney' },
  { id: 'hormones', label: '🧬 Thyroid & Hormones' },
  { id: 'vitamins', label: '☀️ Vitamins & Bone' }
];

export default function CustomPackageBuilder({ onOpenBooking, tests = MEDICAL_TESTS }) {
  const [selectedTestIds, setSelectedTestIds] = useState(['test-cbc', 'test-thyroid']);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered available tests
  const filteredTests = useMemo(() => {
    return tests.filter(test => {
      const matchesCat = activeCategory === 'all' || test.category === activeCategory;
      const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (test.description && test.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [tests, activeCategory, searchQuery]);

  // Selected test objects
  const selectedTests = useMemo(() => {
    return tests.filter(t => selectedTestIds.includes(t.id));
  }, [tests, selectedTestIds]);

  // Calculation Logic
  const count = selectedTests.length;
  const rawTotal = selectedTests.reduce((acc, t) => acc + (t.price || 0), 0);

  // Dynamic Bundle Discount Tiers
  let discountPercent = 0;
  let tierLabel = 'Standard Price';
  let tierColor = 'text-slate-600 bg-slate-100';

  if (count >= 6) {
    discountPercent = 35;
    tierLabel = '🏆 Master Health Tier: 35% OFF + Free Home Collection';
    tierColor = 'text-amber-700 bg-amber-100 border-amber-300';
  } else if (count >= 4) {
    discountPercent = 25;
    tierLabel = '🥈 Super Saver Tier: 25% OFF';
    tierColor = 'text-teal-700 bg-teal-100 border-teal-300';
  } else if (count >= 2) {
    discountPercent = 15;
    tierLabel = '🥉 Smart Combo Tier: 15% OFF';
    tierColor = 'text-sky-700 bg-sky-100 border-sky-300';
  }

  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const finalPayable = Math.max(0, rawTotal - discountAmount);
  const isFreeHomePickup = count >= 6;

  const toggleTest = (id) => {
    setSelectedTestIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const removeTest = (id) => {
    setSelectedTestIds(prev => prev.filter(item => item !== id));
  };

  const clearAll = () => {
    setSelectedTestIds([]);
  };

  const handleBookCustomPackage = () => {
    if (selectedTests.length === 0) return;
    const compositeTitle = `Custom Health Bundle (${selectedTests.length} Tests: ${selectedTests.map(t => t.title.split('(')[0].trim()).join(', ')})`;
    
    onOpenBooking({
      id: 'CUSTOM-BUNDLE-' + Math.floor(1000 + Math.random() * 9000),
      title: compositeTitle,
      price: finalPayable,
      originalPrice: rawTotal,
      discount: discountPercent > 0 ? `${discountPercent}% OFF Bundle` : 'Standard Price',
      duration: 'Same-Day Fast Processing',
      fastingRequired: selectedTests.some(t => t.fastingRequired && t.fastingRequired.toLowerCase().includes('fasting'))
        ? 'Overnight Fasting Required (Tests include fasting parameters)'
        : 'No Fasting Required',
      sampleType: 'Blood & Serum Sample (Doorstep Collection)',
      selectedTestsList: selectedTests
    });
  };

  return (
    <section id="custom-builder" className="py-16 sm:py-24 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Smart Bundle Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-slate-900 mb-4">
            Build Your Own <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Custom Health Package
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select the exact pathology tests you need. Our smart engine automatically calculates bundled multi-test discounts—saving you up to <strong>35% + Free Doorstep Sample Pickup</strong>.
          </p>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Test Catalog & Selector */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl">
            
            {/* Search & Category Filter */}
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tests to add (e.g. CBC, Thyroid, HbA1c, Vitamin D3, Lipid)..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {CATEGORY_TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                      activeCategory === tab.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Test Selection List */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {filteredTests.map((test) => {
                const isSelected = selectedTestIds.includes(test.id);
                return (
                  <div
                    key={test.id}
                    onClick={() => toggleTest(test.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-sky-50/70 border-sky-400 shadow-sm ring-1 ring-sky-300'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 shrink-0 transition-all border ${
                        isSelected 
                          ? 'bg-sky-600 text-white border-sky-600' 
                          : 'bg-white border-slate-300 text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <span>{test.title}</span>
                          {test.parametersCount && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              {test.parametersCount} Params
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {test.description}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1.5 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-sky-500" />
                            {test.duration}
                          </span>
                          <span>•</span>
                          <span>{test.fastingRequired}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base font-extrabold text-slate-900">₹{test.price}</div>
                      {test.originalPrice && (
                        <div className="text-xs text-slate-400 line-through">₹{test.originalPrice}</div>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredTests.length === 0 && (
                <div className="text-center py-10 text-slate-400 text-sm">
                  No matching tests found. Try searching with a different term.
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Live Smart Savings Meter & Itemized Summary */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            
            {/* Smart Bundle Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-400/80 shadow-2xl relative overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2 font-black text-slate-900 text-lg">
                  <Sparkles className="w-5 h-5 text-sky-600" />
                  <span>Your Custom Bundle</span>
                </div>
                {count > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {/* Dynamic Tier Banner */}
              <div className={`p-3 rounded-2xl border text-xs font-bold mb-6 flex items-center gap-2 ${tierColor}`}>
                <Percent className="w-4 h-4 shrink-0" />
                <span>{tierLabel}</span>
              </div>

              {/* Discount Progress Bar Meter */}
              <div className="mb-6 bg-slate-100 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Bundle Discount Progress</span>
                  <span className="text-sky-600">{count} Tests Selected</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, (count / 6) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-1.5">
                  <span>2 Tests: 15% OFF</span>
                  <span>4 Tests: 25% OFF</span>
                  <span>6+ Tests: 35% OFF + Free Home Collection</span>
                </div>
              </div>

              {/* Selected Tests Pills */}
              <div className="space-y-2 max-h-48 overflow-y-auto mb-6 pr-1">
                {selectedTests.map(test => (
                  <div key={test.id} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-800 truncate pr-2">{test.title}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-bold text-slate-900">₹{test.price}</span>
                      <button
                        onClick={() => removeTest(test.id)}
                        className="text-slate-400 hover:text-rose-600 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {selectedTests.length === 0 && (
                  <div className="text-center py-6 text-slate-400 text-xs italic">
                    No tests added yet. Click any test on the left to start building your bundle.
                  </div>
                )}
              </div>

              {/* Financial Calculation Summary */}
              <div className="border-t border-slate-200 pt-4 space-y-2 mb-6 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Total Standard Price:</span>
                  <span className="font-semibold text-slate-900">₹{rawTotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Bundle Discount ({discountPercent}%):</span>
                    <span>- ₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Doorstep Sample Collection:</span>
                  <span className={isFreeHomePickup ? "text-emerald-600 font-bold" : "text-slate-900"}>
                    {isFreeHomePickup ? "FREE (Saved ₹150)" : "Free on 6+ tests"}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-black text-slate-900">Final Total:</span>
                    <div className="text-[11px] text-slate-500">Includes all processing & digital report</div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-sky-600">₹{finalPayable}</span>
                    {discountAmount > 0 && (
                      <div className="text-xs font-bold text-emerald-600">You Save ₹{discountAmount}!</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Book Custom Bundle CTA */}
              <button
                disabled={selectedTests.length === 0}
                onClick={handleBookCustomPackage}
                className="w-full py-4 bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 disabled:opacity-50 text-white font-extrabold text-base rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-sky-600/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Book This Custom Bundle</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="text-center mt-3 text-[11px] text-slate-400 font-medium">
                ⚡ Certified Phlebotomist Doorstep Pickup in Tallapudi & Rajahmundry
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
