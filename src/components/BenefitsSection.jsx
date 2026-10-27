import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Droplets,
  Smile,
  Utensils,
  Heart,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

const CATEGORY_ICONS = [Droplets, Smile, Utensils, Heart];

export const BenefitsSection = () => {
  const { language, t } = useLanguage();
  const benefits = t.benefits || {};
  const [sectionRef, isVisible] = useScrollReveal();

  const [toggledIndex, setToggledIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(null);

  const defaultCategories = [
    {
      id: 'hair',
      title:
        language === 'en'
          ? 'Hair Care & Scalp Conditioning'
          : 'கூந்தல் & கேச பராமரிப்பு',
      badge: language === 'en' ? 'Hair Grooming' : 'கூந்தல் பராமரிப்பு',
      desc:
        language === 'en'
          ? 'Penetrates hair shafts to replenish natural moisture, smooth dry ends, and provide healthy shine.'
          : 'கூந்தல் வேர்களுக்குள் சென்று இயற்கை ஈரப்பதத்தை பாதுகாத்து, முடி உதிர்வை தடுத்து பளபளப்பை தருகிறது.',
      points:
        language === 'en'
          ? [
              'Nourishes hair roots and conditions dry scalps',
              'Controls everyday frizz and split ends naturally',
              'Serves as an effective pre-shampoo deep conditioning treatment',
              'Leaves hair manageable with a clean natural shine'
            ]
          : [
              'கூந்தல் வேர்களுக்கு ஊட்டமளித்து வறட்சியை போக்குகிறது',
              'முடி பிளவு மற்றும் உதிர்தலை இயற்கையாக கட்டுப்படுத்துகிறது',
              'குளியலுக்கு முன் சிறந்த இயற்கை கண்டிஷனராக செயல்படுகிறது',
              'பிசுபிசுப்பு இல்லாமல் கூந்தலுக்கு இயற்கையான பொலிவை தருகிறது'
            ],
      highlightBadge:
        language === 'en' ? 'Natural Hair Nourishment' : 'கூந்தல் பராமரிப்பு',
      highlightQuote:
        language === 'en'
          ? 'Deeply conditions roots & controls everyday frizz naturally'
          : 'வேர்க்கால்களை பலப்படுத்தி, உச்சந்தலை வறட்சியை போக்கும் தூய எண்ணெய்'
    },
    {
      id: 'skin',
      title:
        language === 'en' ? 'Skin Care & Hydration' : 'சருமம் & ஈரப்பதம்',
      badge: language === 'en' ? 'Skin Care' : 'சரும பராமரிப்பு',
      desc:
        language === 'en'
          ? 'A pure and gentle moisturizer that locks in hydration without synthetic chemicals or artificial fragrances.'
          : 'ரசாயனங்கள் மற்றும் செயற்கை வாசனை இல்லாத, சருமத்திற்கு இதமளிக்கும் இயற்கை மாய்ஸ்சரைசர்.',
      points:
        language === 'en'
          ? [
              'Deeply hydrates rough, dry patches and cracked heels',
              'Acts as a gentle, chemical-free evening makeup remover',
              'Safe and gentle for regular infant and body massage',
              'Restores skin softness after bathing or outdoor sun exposure'
            ]
          : [
              'சரும வறட்சி மற்றும் பாத வெடிப்புகளுக்கு உடனடி நிவாரணம் தருகிறது',
              'இரவில் முகத்தில் உள்ள மேக்கப்பை நீக்க பாதுகாப்பான வழி',
              'குழந்தைகளுக்கான மென்மையான உடல் மசாஜிற்கு உகந்தது',
              'குளியலுக்குப் பின் சருமத்தின் இயற்கை மென்மையை பாதுகாக்கிறது'
            ],
      highlightBadge:
        language === 'en' ? 'Gentle Skin Hydration' : 'சரும ஈரப்பதம்',
      highlightQuote:
        language === 'en'
          ? 'Locks in moisture naturally without artificial chemicals'
          : 'வேதிப்பொருட்கள் அற்ற தூய இயற்கை சரும பாதுகாப்பு'
    },
    {
      id: 'cooking',
      title:
        language === 'en' ? 'Culinary Taste & Cooking' : 'சமையல் & இயற்கை சுவை',
      badge: language === 'en' ? 'Culinary Cooking' : 'பாரம்பரிய சமையல்',
      desc:
        language === 'en'
          ? 'Brings the rich aroma and wholesome taste of authentic South Indian cuisine to your daily meals.'
          : 'தென் இந்திய உணவுகளுக்குரிய பிரத்யேக மணத்தையும் இயற்கை சத்துக்களையும் அன்றாட உணவில் சேர்க்கிறது.',
      points:
        language === 'en'
          ? [
              'Rich in naturally occurring Medium Chain Fatty Acids (MCTs)',
              'Delivers classic coastal aroma for sambar, avial, and poriyal',
              'Stable cooking medium suitable for tempering and frying',
              'Light, digestible, and completely free from trans fats'
            ]
          : [
              'எளிதில் ஜீரணமாகும் நடுத்தர கொழுப்பு அமிலங்கள் (MCTs) நிறைந்தது',
              'சாம்பார், அவியல், பொரியல் ஆகியவற்றிற்கு உன்னதமான மணம் தருகிறது',
              'தாளிப்பு மற்றும் வறுவலுக்கு ஏற்ற பாதுகாப்பான சமையல் எண்ணெய்',
              'டிரான்ஸ் ஃபேட் மற்றும் கொலஸ்ட்ரால் இல்லாதது'
            ],
      highlightBadge:
        language === 'en' ? 'Authentic Culinary Taste' : 'பாரம்பரிய சமையல் சுவை',
      highlightQuote:
        language === 'en'
          ? 'Adds wholesome flavor and aroma to traditional recipes'
          : 'தென்னிந்திய உணவு வகைகளுக்கு பாரம்பரிய மணம் & சுவை'
    },
    {
      id: 'wellness',
      title:
        language === 'en'
          ? 'Traditional Daily Wellness'
          : 'அன்றாட பாரம்பரிய நல்வாழ்வு',
      badge: language === 'en' ? 'Daily Wellness' : 'தினசரி நல்வாழ்வு',
      desc:
        language === 'en'
          ? 'Integral to morning self-care rituals for oral freshness and full-body relaxation.'
          : 'காலை நேர சுயபராமரிப்பு மற்றும் உடல் அமைதிக்கு உதவும் பாரம்பரிய வீட்டு மருத்துவம்.',
      points:
        language === 'en'
          ? [
              'Traditional morning oil pulling for oral hygiene and fresh breath',
              'Promotes clean digestive balance in daily cooking',
              'Natural and soothing for therapeutic body massages',
              'An accessible natural staple for the entire family'
            ]
          : [
              'காலையில் ஆயில் புல்லிங் செய்வதால் வாய் புத்துணர்ச்சியும் ஈறு பலமும் பெறலாம்',
              'அன்றாட உணவில் எளிதான செரிமானத்திற்கு உதவுகிறது',
              'உடலுக்கு இதமளிக்கும் தளர்வு மசாஜிற்கு ஏற்றது',
              'முழு குடும்பத்திற்குமான எளிய இயற்கை வளம்'
            ],
      highlightBadge:
        language === 'en' ? 'Daily Family Wellness' : 'குடும்ப நல்வாழ்வு',
      highlightQuote:
        language === 'en'
          ? 'Traditional oil pulling and complete household wellness'
          : 'ஆயில் புல்லிங் மற்றும் அன்றாட முழுமையான நலம்'
    }
  ];

  const categories =
    Array.isArray(benefits.categories) && benefits.categories.length === 4
      ? benefits.categories
      : defaultCategories;

  /*const handleCardClick = (idx) => {
    setToggledIndex((prev) => (prev === idx ? null : idx));
  };*/
  const handleCardClick = (idx) => {
  setToggledIndex((prev) => {
    if (prev === idx) {
      return null;
    }
    return idx;
  });
};

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className={`stage2-section-space bg-[#EAF3FB] border-b border-[#D6E6F5] reveal-init ${
        isVisible ? 'reveal-active' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F2B632] block mb-2">
            {benefits.eyebrow ||
              (language === 'en' ? 'Wholesome Daily Living' : 'இயற்கை நற்குணங்கள்')}
          </span>
          <h2 className="stage2-section-title type-section-heading text-[#2B6CB0]">
            {benefits.heading ||
              (language === 'en'
                ? 'Wholesome Qualities of Pure Coconut Oil'
                : 'தூய தேங்காய் எண்ணெயின் நற்குணங்கள்')}
          </h2>
          <p className="stage2-intro-copy text-[#516070] mt-2.5 max-w-2xl mx-auto">
            {benefits.subheading ||
              (language === 'en'
                ? 'A versatile natural staple for culinary taste, hair nourishment, and daily household wellness.'
                : 'சுவையான சமையல், கூந்தல் வேர் ஊட்டச்சத்து மற்றும் அன்றாட ஆரோக்கியத்திற்கான இயற்கை பொக்கிஷம்.')}
          </p>
        </div>

        {/* 2-Column Balanced Grid of 4 Compact Expand-on-Hover Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
          {categories.map((cat, idx) => {
            const IconComp = CATEGORY_ICONS[idx] || Droplets;
            const isExpanded =
              toggledIndex === idx || hoveredIndex === idx || focusedIndex === idx;

            return (
              <div
                key={cat.id || idx}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                aria-label={`${cat.title} - ${cat.badge}`}
                onClick={() => handleCardClick(idx)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setFocusedIndex(idx)}
                onBlur={() => setFocusedIndex(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(idx);
                  }
                }}
                className={`benefit-topic-card relative p-4 sm:p-5 lg:p-6 cursor-pointer select-none transition-all ${
                  isExpanded ? 'is-expanded' : ''
                }`}
              >
                {/* Compact Resting Header: Icon, Badge, Main Title, and Expand Chevron */}
                <div className="flex items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    {/* Icon Container */}
                    <div className="benefit-icon-box benefit-transition w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#FFFFFF] text-[#2B6CB0] border border-[#D6E6F5]">
                      <IconComp size={22} strokeWidth={2} />
                    </div>

                    {/* Topic Main Title & Category Badge */}
                    <div className="min-w-0 flex-1">
                      <span className="benefit-card-badge benefit-transition text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#D99E1F] block">
                        {cat.badge}
                      </span>
                      <h3 className="benefit-card-title benefit-transition text-base sm:text-lg font-editorial font-normal text-[#2B6CB0] leading-snug mt-0.5">
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  {/* Expand / Collapse Chevron Indicator */}
                  <div
                    aria-hidden="true"
                    className="benefit-chevron benefit-transition w-8 h-8 rounded-full border border-[#D6E6F5] bg-white flex items-center justify-center text-[#2B6CB0] shrink-0"
                  >
                    <ChevronDown size={16} strokeWidth={2.2} />
                  </div>
                </div>

                {/* Expandable Body: Description, 4 Supporting Points, and Highlight Quote */}
                <div className="benefit-expandable-wrapper">
                  <div className="benefit-expandable-inner">
                    {/* Subtle Separation Divider */}
                    <div className="benefit-divider benefit-transition border-t border-[#D6E6F5] mt-4 pt-4" />

                    {/* Long Description */}
                    <p className="benefit-card-desc benefit-transition text-xs sm:text-[13px] text-[#516070] leading-relaxed">
                      {cat.desc}
                    </p>

                    {/* 4 Individual Benefit Points */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3.5">
                      {cat.points?.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2
                            size={15}
                            className="benefit-point-icon benefit-transition text-[#2B6CB0] mt-0.5 shrink-0"
                          />
                          <span className="benefit-point-item benefit-transition text-xs sm:text-[13px] text-[#1B2A3A] leading-snug">
                            {pt}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Quote & Quality Highlight Seal */}
                    {cat.highlightQuote && (
                      <div className="benefit-transition bg-[#1F4F85]/60 border border-[#F2B632]/35 rounded-xl p-3 sm:p-3.5 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                        <div className="inline-flex items-center gap-2 text-xs text-[#FFFFFF] italic font-editorial">
                          <Sparkles size={13} className="text-[#F2B632] shrink-0" />
                          <span>“{cat.highlightQuote}”</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#F2B632] shrink-0">
                          <ShieldCheck size={14} className="text-[#F2B632] shrink-0" />
                          <span>
                            {language === 'en'
                              ? '100% Pure Cold-Filtered'
                              : '100% தூய இயற்கை எண்ணெய்'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coconut Image Quality Assurance Banner */}
        <div className="mt-8 lg:mt-12 rounded-2xl overflow-hidden border border-[#D6E6F5] bg-white shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left: Coconut Image Asset */}
            <div className="lg:col-span-5 relative h-48 sm:h-56 lg:h-full min-h-[200px] overflow-hidden bg-[#EAF3FB]">
              <img
                src="/assets/hero_coconut.jpg"
                alt="SATYA D'LITE Pure Cold-Filtered Coconut Oil & Natural Copra"
                className="w-full h-full object-cover object-[52%_36%]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right: Quality Merits & Agricultural Purity Statement */}
            <div className="lg:col-span-7 p-5 sm:p-7 lg:p-8">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F2B632] mb-1.5">
                <Sparkles size={14} className="text-[#F2B632] shrink-0" />
                <span>
                  {language === 'en'
                    ? 'Natural Agricultural Purity'
                    : 'இயற்கை விவசாயத் தூய்மை'}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-editorial font-normal text-[#2B6CB0] mb-2 leading-snug">
                {language === 'en'
                  ? 'Pure, Wholesome Goodness for Every Family'
                  : 'ஒவ்வொரு குடும்பத்திற்குமான தூய இயற்கை நலம்'}
              </h3>
              <p className="text-xs sm:text-sm text-[#516070] leading-relaxed mb-4">
                {language === 'en'
                  ? 'SATYA D\'LITE coconut oil is cold-filtered strictly from hand-selected sun-dried copras. Zero paraffin, zero artificial chemicals, and zero chemical bleaching.'
                  : 'சத்யா டி\'லைட் தேங்காய் எண்ணெய் வெயிலில் உலர்த்திய சிறந்த கொப்பரைகளிலிருந்து நவீன முறையில் வடிகட்டப்படுகிறது. பாராஃபின் மற்றும் செயற்கை ரசாயனங்கள் அற்றது.'}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold text-[#2B6CB0]">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#F2B632] shrink-0" />
                  <span>
                    {language === 'en'
                      ? '100% Pure Cold-Filtered'
                      : '100% தூய இயற்கை எண்ணெய்'}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#F2B632] shrink-0" />
                  <span>
                    {language === 'en'
                      ? 'Sun-Dried Copra Extraction'
                      : 'மரபு கொப்பரை பிழிதல்'}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#F2B632] shrink-0" />
                  <span>
                    {language === 'en'
                      ? 'Food-Grade Certified'
                      : 'உணவுத் தர சான்றளிக்கப்பட்டது'}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Agricultural Product Disclaimer */}
        <p className="text-xs text-[#516070] italic text-center mt-6">
          {benefits.disclaimer ||
            (language === 'en'
              ? "*SATYA D'LITE coconut oil is a natural agricultural food product. Information is based on traditional cultural practices."
              : '*SATYA D\'LITE தேங்காய் எண்ணெய் தூய இயற்கை உணவுத் தயாரிப்பாகும். பாரம்பரிய நற்குணங்களின் அடிப்படையில் விவரிக்கப்பட்டுள்ளது.')}
        </p>
      </div>
    </section>
  );
};
