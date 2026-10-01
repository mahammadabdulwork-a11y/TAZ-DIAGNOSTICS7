import React from 'react';
import { Users, Target, Clock, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { LAB_STATS } from '../data/testsData';

export default function StatsBar() {
  const iconMap = {
    Users: Users,
    Target: Target,
    Clock: Clock,
    ShieldCheck: ShieldCheck,
  };

  return (
    <section className="relative z-20 -mt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {LAB_STATS.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || ShieldCheck;
              return (
                <div 
                  key={index} 
                  className={`flex flex-col items-center text-center ${index !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-2 text-sky-600">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-display text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-600 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quality Ribbon */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-slate-600 text-xs font-bold">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>100% NABL & ISO Standard Diagnostic Lines</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Sterile Single-Use Vacuum Venipuncture</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-sky-600" />
              <span>Qualified Pathologist Verification</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
