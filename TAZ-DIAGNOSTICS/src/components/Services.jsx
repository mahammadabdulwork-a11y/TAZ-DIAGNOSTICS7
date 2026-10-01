import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Droplets, 
  HeartPulse, 
  ShieldCheck, 
  Search, 
  Clock, 
  Calendar, 
  Check, 
  Activity, 
  Info,
  Flame,
  Sun
} from 'lucide-react';
import { CATEGORIES, MEDICAL_TESTS } from '../data/testsData';

export default function Services({ onBookTest, externalSearch = '', onClearSearch, tests = MEDICAL_TESTS }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(externalSearch);

  React.useEffect(() => {
    if (externalSearch !== undefined) {
      setSearchQuery(externalSearch);
    }
  }, [externalSearch]);

  const iconMap = {
    Sparkles,
    Droplets,
    HeartPulse,
    ShieldCheck,
    Activity,
    Flame,
    Sun
  };

  const filteredTests = useMemo(() => {
    const list = tests || MEDICAL_TESTS;
    return list.filter((test) => {
      const matchesCategory = activeCategory === 'all' || test.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        test.title.toLowerCase().includes(query) ||
        test.description.toLowerCase().includes(query) ||
        test.sampleType.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, tests]);

  return (
    <section id="services" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200">
            <Droplets className="w-4 h-4 text-sky-600" />
            <span>Pathology & Blood Tests</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
            Individual <span className="text-sky-600">Diagnostic Tests</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Over 200+ blood investigations, organ function panels, and hormone tests with verified same-day reporting.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full lg:w-auto">
            {CATEGORIES.map((cat) => {
              const Icon = iconMap[cat.icon] || Droplets;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:text-sky-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-sky-600'}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="w-full lg:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tests, CBC, Thyroid, Lipid..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-sky-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  if (onClearSearch) onClearSearch();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-800 font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Tests Grid */}
        {filteredTests.length === 0 ? (
          <div className="bg-slate-50 rounded-2xl p-10 text-center border border-slate-200 my-6">
            <Info className="w-10 h-10 text-sky-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">No Diagnostic Tests Found</h3>
            <p className="text-slate-500 text-xs mt-1">
              Try searching with another term or reset filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                if (onClearSearch) onClearSearch();
              }}
              className="mt-3 px-4 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => {
              const Icon = iconMap[test.icon] || Droplets;
              return (
                <div
                  key={test.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Icon + Parameter Count */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        {test.popular && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300">
                            POPULAR
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {test.parametersCount} Parameters
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base sm:text-lg font-bold font-display text-slate-900">
                      {test.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {test.description}
                    </p>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-slate-100 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>TAT: <strong className="text-slate-900">{test.duration}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Droplets className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="truncate">{test.sampleType}</span>
                      </div>
                    </div>

                    {/* Fasting & Features */}
                    <div className="mt-2.5 text-[11px] text-amber-700 font-semibold">
                      • {test.fastingRequired}
                    </div>

                    <div className="mt-2 space-y-1">
                      {test.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Price & CTA */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Lab Price</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black font-display text-slate-900">₹{test.price}</span>
                        <span className="text-xs text-slate-400 line-through">₹{test.originalPrice}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1 py-0.5 rounded border border-emerald-300">
                          {test.discount}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onBookTest(test)}
                      className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all shadow-sm"
                    >
                      Book Test
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
