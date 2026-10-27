import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Leaf, Award, HeartHandshake } from 'lucide-react';

const FEATURE_ICONS = [ShieldCheck, Leaf, Award, HeartHandshake];

export const WhyChooseUs = () => {
  const { t } = useLanguage();
  const whyUs = t.whyChooseUs;

  return (
    <section
      id="why-us"
      className="relative py-14 sm:py-18 lg:py-20 bg-[#EAF3FB] border-b border-[#D6E6F5] overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-9 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2B6CB0] tracking-tight mb-2.5">
            {whyUs.heading}
          </h2>

          <p className="text-sm sm:text-base text-[#516070] leading-relaxed">
            {whyUs.subheading}
          </p>
        </div>

        {/* 4-Column White Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {whyUs.features.map((feature, idx) => {
            const IconComponent = FEATURE_ICONS[idx] || ShieldCheck;
            return (
              <div
                key={idx}
                className="group rounded-2xl bg-white border border-[#D6E6F5] hover:border-[#4A8AD0] p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs hover:shadow-[0_10px_24px_-10px_rgba(43,108,176,0.16)] flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EAF3FB] border border-[#D6E6F5] text-[#2B6CB0] group-hover:bg-[#2B6CB0] group-hover:text-white group-hover:border-[#2B6CB0] flex items-center justify-center mb-4 transition-colors">
                  <IconComponent size={20} />
                </div>

                <h3 className="text-sm sm:text-[15px] font-extrabold text-[#2B6CB0] mb-2 leading-snug">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#516070] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
