import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AboutBrand = () => {
  const { language, t } = useLanguage();
  const about = t.about || {};
  const [sectionRef, isVisible] = useScrollReveal();

  const defaultPillars = [
    {
      title: language === 'en' ? 'Careful Copra Grading' : 'உயர்தர கொப்பரை தேர்வு',
      desc:
        language === 'en'
          ? 'Sourced from mature sun-dried coconuts to ensure optimal aroma and natural oil richness.'
          : 'இயற்கை மணமும் சத்துக்களும் நிறைந்த முதிர்ந்த கொப்பரைகள் மட்டுமே உற்பத்திக்கு பயன்படுகின்றன.'
    },
    {
      title: language === 'en' ? 'Hygienic Processing' : 'சுகாதாரமான வடிகட்டல்',
      desc:
        language === 'en'
          ? 'Filtered through modern food-grade systems preserving wholesome natural nutrients.'
          : 'இயற்கை சத்துக்கள் அழியாமல் நவீன உணவுத் தர இயந்திரங்கள் மூலம் வடிகட்டப்படுகிறது.'
    },
    {
      title: language === 'en' ? 'Zero Mineral Oils' : 'மினரல் ஆயில் அற்றது',
      desc:
        language === 'en'
          ? 'Free from paraffin, chemical bleaching agents, artificial additives, and preservatives.'
          : 'எவ்வித பாராஃபின், ரசாயன ப்ளீச்சிங் அல்லது செயற்கை பாதுகாப்பிகள் சேர்க்கப்படுவதில்லை.'
    },
    {
      title: language === 'en' ? 'Versatile Household Essential' : 'குடும்பத்தின் அன்றாட தேவை',
      desc:
        language === 'en'
          ? 'Formulated for wholesome culinary preparation, hair grooming, and family wellness.'
          : 'சுவையான சமையல் மற்றும் அன்றாட உடல் பராமரிப்பிற்கு பாதுகாப்பான இயற்கை எண்ணெய்.'
    }
  ];

  const pillars =
    Array.isArray(about.pillars) && about.pillars.length === 4
      ? about.pillars
      : defaultPillars;

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`stage2-section-space relative bg-white border-b border-[#D6E6F5] overflow-hidden reveal-init ${
        isVisible ? 'reveal-active' : ''
      }`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-9 sm:mb-12">
          {about.eyebrow && (
            <span className="text-xs font-bold uppercase tracking-widest text-[#F2B632] block mb-2">
              {about.eyebrow}
            </span>
          )}
          <h2 className="stage2-section-title type-section-heading text-[#2B6CB0] mb-3">
            {about.heading || (language === 'en' ? "About SATYA D'LITE" : 'SATYA D\'LITE பற்றி')}
          </h2>

          <p className="stage2-intro-copy text-[#516070]">
            {about.leadText}
          </p>
        </div>

        {/* Top Row: Warm Ivory 50-Year Heritage Card (5 cols) + White Manufacturer Story Card (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column (5 cols): Warm Ivory & White 50-Year Heritage Card */}
          <div className="lg:col-span-5">
            <div
              tabIndex={0}
              aria-label={
                language === 'en'
                  ? '50 Years Heritage Story by Dayan Enterprises & Co'
                  : 'தயான் என்டர்பிரைசஸ் & கோ 50 ஆண்டுகால பாரம்பரிய வரலாறு'
              }
              className="about-heritage-card stage2-card-padding relative w-full rounded-3xl text-[#1B2A3A] cursor-default select-none overflow-hidden"
            >
              {/* Top Manufacturer Line */}
              <div className="about-transition about-mfg-text inline-flex items-center gap-2 text-xs font-bold text-[#2B6CB0] mb-4">
                <ShieldCheck size={15} className="text-[#F2B632] shrink-0" />
                <span>
                  {language === 'en'
                    ? 'Manufactured by Dayan Enterprises & Co'
                    : 'தயான் என்டர்பிரைசஸ் & கோ தயாரிப்பு'}
                </span>
              </div>

              {/* 50-Year Heritage Inner Highlight Box */}
              <div className="about-transition about-heritage-inner rounded-2xl p-4 sm:p-5 flex items-start gap-4 mb-5">
                {/* 50 YEARS Badge Wrapper with Hover Crossfade */}
                <div className="about-transition about-badge-wrapper relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 shadow-xs border border-[#F2B632]/30">
                  {/* Default State: Compact Forest Green 50 YEARS Badge */}
                  <div className="about-badge-default absolute inset-0 bg-[#2B6CB0] text-white flex flex-col items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-extrabold leading-none tracking-tight text-white">
                      {about.heritageYears || '50'}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mt-1 text-[#D6E6F5]">
                      {about.heritageUnit || (language === 'en' ? 'Years' : 'ஆண்டுகள்')}
                    </span>
                  </div>

                  {/* Hover State: Supplied Gold-and-Green 50 Years Anniversary Artwork */}
                  <div className="about-badge-artwork absolute inset-0 bg-[#1F4F85] flex items-center justify-center">
                    <img
                      src="/assets/50-years-anniversary.jpg"
                      alt={
                        language === 'en'
                          ? 'Satya DLite 50 Years Golden Anniversary Emblem'
                          : "சத்யா டி'லைட் 50 ஆண்டுகள் பொன்விழா சின்னம்"
                      }
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width="80"
                      height="80"
                    />
                  </div>
                </div>

                {/* Heritage Heading & Text */}
                <div className="min-w-0 flex-1">
                  <div className="about-transition about-legacy-badge inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#2B6CB0] mb-1">
                    <Award size={13} className="text-[#F2B632] shrink-0" />
                    <span>
                      {about.heritageBadge ||
                        (language === 'en'
                          ? 'Enduring Legacy of Trust'
                          : 'நம்பிக்கையின் பொன்மரபு')}
                    </span>
                  </div>

                  <h3 className="about-transition about-legacy-heading font-editorial text-lg sm:text-xl font-normal text-[#1B2A3A] mb-1 leading-snug">
                    {about.heritageHeading ||
                      (language === 'en'
                        ? '50 Years of Heritage'
                        : '50 ஆண்டுகால பாரம்பரியம்')}
                  </h3>

                  <p className="about-transition about-legacy-text text-xs sm:text-[13px] text-[#516070] leading-relaxed">
                    {about.heritageText ||
                      (language === 'en'
                        ? 'Five decades of tradition, dedication, and a commitment to quality.'
                        : 'ஐந்து தசாப்தங்களாகத் தொடரும் பாரம்பரியம், அர்ப்பணிப்பு மற்றும் தரத்திற்கான உறுதிப்பாடு.')}
                  </p>
                </div>
              </div>

              {/* Natural-Flow Pull Quote on Clean White Surface with Antique Gold Left Accent */}
              <div className="about-transition about-quote-box rounded-2xl p-4 sm:p-5">
                <blockquote className="about-transition about-quote-text font-editorial text-sm sm:text-[15px] italic font-normal text-[#2B6CB0] leading-relaxed mb-1.5">
                  “{about.quote ||
                    (language === 'en'
                      ? 'Quality, purity, and customer trust are the foundations of every bottle and packet we pack.'
                      : 'தரமும், தூய்மையும், வாடிக்கையாளர்களின் நம்பிக்கையுமே எங்கள் ஒவ்வொரு பாட்டில் மற்றும் பாக்கெட்டின் அடையாளம்.')}”
                </blockquote>
                <cite className="about-transition about-quote-author not-italic text-[11px] font-semibold text-[#516070] block">
                  — {about.quoteAuthor ||
                    (language === 'en'
                      ? 'Dayan Enterprises & Co, Thoothukudi'
                      : 'தயான் என்டர்பிரைசஸ் & கோ, தூத்துக்குடி')}
                </cite>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): White Manufacturer Narrative Card */}
          <div className="lg:col-span-7 min-w-0">
            <div
              tabIndex={0}
              aria-label={
                language === 'en'
                  ? 'Pure, Honest Coconut Oil Introduction'
                  : 'தூய தேங்காய் எண்ணெய் அறிமுகம்'
              }
              className="about-intro-card stage2-card-padding relative rounded-3xl cursor-default select-none"
            >
              <h3 className="about-transition about-intro-heading font-editorial text-xl sm:text-2xl lg:text-3xl font-normal text-[#2B6CB0] leading-snug mb-3.5">
                {language === 'en'
                  ? 'Pure, Honest Coconut Oil for Everyday Household Living'
                  : 'அன்றாட குடும்ப நல்வாழ்விற்கான தூய தேங்காய் எண்ணெய்'}
              </h3>

              <div className="space-y-3.5 text-sm sm:text-[15px] leading-relaxed">
                <p className="about-transition about-intro-p">{about.p1}</p>
                <p className="about-transition about-intro-p">{about.p2}</p>
              </div>

              {/* Trust Highlights Strip */}
              <div className="about-transition about-trust-strip mt-5 pt-4 border-t flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-[#1B2A3A]">
                <span className="about-transition about-trust-item inline-flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="about-transition about-trust-icon text-[#2B6CB0] shrink-0" />
                  <span>{language === 'en' ? 'Sun-Dried Copra' : 'வெயிலில் உலர்த்திய கொப்பரை'}</span>
                </span>
                <span className="about-transition about-trust-item inline-flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="about-transition about-trust-icon text-[#2B6CB0] shrink-0" />
                  <span>{language === 'en' ? 'Zero Mineral Oil' : 'மினரல் ஆயில் அற்றது'}</span>
                </span>
                <span className="about-transition about-trust-item inline-flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="about-transition about-trust-icon text-[#2B6CB0] shrink-0" />
                  <span>{language === 'en' ? '100% Vegetarian' : '100% சைவம்'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: 4 Production Standards (Warm Ivory Cards with Antique Gold Top Accent Edge) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-6 lg:mt-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              tabIndex={0}
              aria-label={pillar.title}
              className="about-pillar-card relative rounded-2xl p-5 pt-6 cursor-default flex flex-col select-none overflow-hidden"
            >
              {/* Antique-Gold Top Accent Edge */}
              <div className="about-transition about-pillar-accent absolute top-0 inset-x-0 h-[3px] pointer-events-none" />

              <span className="text-xs font-extrabold tracking-wider text-[#F2B632] mb-1.5 block">
                0{index + 1}
              </span>
              <h4 className="about-transition about-pillar-title text-sm sm:text-[15px] font-extrabold text-[#2B6CB0] mb-1.5 leading-snug">
                {pillar.title}
              </h4>
              <p className="about-transition about-pillar-desc text-xs sm:text-[13px] text-[#516070] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
