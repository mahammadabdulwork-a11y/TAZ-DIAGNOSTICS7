import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  Activity, 
  Flame,
  Tag
} from 'lucide-react';
import { HEALTH_PACKAGES } from '../data/testsData';

export default function Packages({ onBookPackage, packages = HEALTH_PACKAGES }) {
  const packageList = packages && packages.length > 0 ? packages : HEALTH_PACKAGES;
  const [expandedPackageId, setExpandedPackageId] = useState(packageList[0]?.id || null);

  const toggleExpand = (id) => {
    setExpandedPackageId(expandedPackageId === id ? null : id);
  };

  return (
    <section id="packages" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Certified Diagnostic Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
            Special <span className="text-sky-600">Taz Health Packages</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            All investigations analyzed on computerized automated multi-analyzers with 100% NABL quality assurance and free doorstep sample collection.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {packageList.map((pkg) => {
            const isExpanded = expandedPackageId === pkg.id;
            const isPostDelivery = pkg.id === 'pkg-post-delivery';
            const isHeart = pkg.id === 'pkg-heart-advanced';

            return (
              <div
                key={pkg.id}
                className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 ${
                  isPostDelivery || isHeart
                    ? 'border-2 border-sky-400 shadow-xl'
                    : 'border-slate-200 shadow-md hover:border-sky-300 hover:shadow-lg'
                }`}
              >
                {/* Top Badge & Flyer Price Pill */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-wide uppercase bg-sky-100 text-sky-800 border border-sky-200">
                    {pkg.badge}
                  </span>

                  {/* Red Price Tag matching Flyer @ ₹2599/- */}
                  <div className="badge-flyer-price px-3.5 py-1 rounded-full text-xs font-black tracking-wider flex items-center gap-1 shadow-md">
                    <span>@ ₹{pkg.price}/-</span>
                  </div>
                </div>

                {/* Title & Flyer Headline */}
                <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 mt-1">
                  {pkg.title} <span className="text-sm font-bold text-sky-700">({pkg.testsCount})</span>
                </h3>
                <p className="text-xs sm:text-sm text-sky-700 font-bold mt-1">
                  {pkg.flyerHeadline}
                </p>

                {/* Flyer Callout Box */}
                {pkg.statCallout && (
                  <div className="mt-3.5 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-950 font-medium">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{pkg.statCallout}</span>
                  </div>
                )}

                {/* Fasting & Turnaround Time Strip */}
                <div className="grid grid-cols-2 gap-2 mt-4 py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span>Report: <strong className="text-slate-900">{pkg.reportsIn}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold truncate">
                    <Activity className="w-3.5 h-3.5 text-red-500" />
                    <span className="truncate text-red-700">{pkg.fastingNote}</span>
                  </div>
                </div>

                {/* Parameter Groups Breakdown */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Test Parameters Breakdown:
                    </span>
                    <button
                      onClick={() => toggleExpand(pkg.id)}
                      className="text-xs font-extrabold text-sky-600 hover:text-sky-800 flex items-center gap-1 bg-sky-50 hover:bg-sky-100 px-2.5 py-1 rounded-lg border border-sky-200 transition-colors"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View All Parameters'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Summary Profile Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.parameterGroups.map((grp, gIdx) => (
                      <span
                        key={gIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-bold flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                        <span>{grp.groupName} ({grp.count})</span>
                      </span>
                    ))}
                  </div>

                  {/* Expanded Parameter List */}
                  {isExpanded && (
                    <div className="mt-3.5 pt-3.5 border-t border-slate-200 space-y-3 max-h-72 overflow-y-auto pr-1">
                      {pkg.parameterGroups.map((grp, gIdx) => (
                        <div key={gIdx} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                          <div className="text-xs font-extrabold text-sky-800 mb-1.5 flex items-center justify-between">
                            <span>{grp.groupName}</span>
                            <span className="text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                              {grp.count} Parameters
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-700">
                            {grp.items.map((item, iIdx) => (
                              <div key={iIdx} className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span className="truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Added Perks */}
                <div className="mt-4 pt-3.5 border-t border-slate-200 space-y-1">
                  {pkg.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="text-xs text-slate-700 font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing & Booking CTA */}
                <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Package Rate</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black font-display text-slate-900">₹{pkg.price}</span>
                      <span className="text-xs text-slate-400 line-through">₹{pkg.originalPrice}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">
                        {pkg.discount}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onBookPackage(pkg)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shrink-0"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Package</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
