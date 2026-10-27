import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const HERO_CARD_SLIDES = [
  {
    src: '/assets/catalogue/Logo_design.png',
    alt: {
      en: "Satya D'Lite Company Logo in a Luxury Background",
      ta: 'சத்யா டிலைட் '
    },
    objectPosition: 'center center'
  },
  {
    src: '/assets/catalogue/hero_slider_coconut.png',
    alt: {
      en: "Satya D'Lite coconut oil bottles with coconuts and a traditional brass lamp",
      ta: 'சத்யா டிலைட் தேங்காய் எண்ணெய் பாட்டில்கள், தேங்காய்கள் மற்றும் பாரம்பரிய பித்தளை விளக்கு'
    },
    objectPosition: 'center center'
  },
  {
    src: '/assets/catalogue/hero_slider_deepam.png',
    alt: {
      en: 'Sathyam Deepam oil in a traditional devotional setting',
      ta: 'பாரம்பரிய வழிபாட்டு சூழலில் சத்யம் தீப எண்ணெய்'
    },
    objectPosition: 'center 28%'
  },
  {
    src: '/assets/catalogue/hero_slider_pouch.png',
    alt: {
      en: "Satya D'Lite coconut oil pouches in a kitchen setting",
      ta: 'சமையலறைச் சூழலில் சத்யா டிலைட் தேங்காய் எண்ணெய் பவுச்கள்'
    },
    objectPosition: 'center 35%'
  }
];

export const Hero = () => {
  const { language, t } = useLanguage();
  const hero = t?.hero || {};
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreferenceChange = (event) => setPrefersReducedMotion(event.matches);
    motionPreference.addEventListener('change', handleMotionPreferenceChange);
    return () => motionPreference.removeEventListener('change', handleMotionPreferenceChange);
  }, []);

  useEffect(() => {
    HERO_CARD_SLIDES.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setActiveHeroSlide((current) => (current + 1) % HERO_CARD_SLIDES.length);
      }
    }, 5500);

    return () => window.clearInterval(timer);
  }, [activeHeroSlide, prefersReducedMotion]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trustPoints = hero.trustPoints || (language === 'en' ? [
    '100% Pure Copra',
    'Hygienic Extraction',
    'Zero Adulteration',
    'Batch-Coded Packs'
  ] : [
    '100% தூய கொப்பரை',
    'சுகாதாரமான தயாரிப்பு',
    'கலப்படமற்ற தூய்மை',
    'பாதுகாப்பான பேக்கிங்'
  ]);

  // Clean arrow from story label if present in content
  const storyLabel = (hero.ourStory
    ? hero.ourStory.replace('→', '').trim()
    : (language === 'en' ? 'Our Story' : 'எங்கள் கதை'));

  return (
    <section
      className="relative bg-white pt-8 pb-14 sm:pt-10 sm:pb-16 md:pt-16 md:pb-24 border-b border-[#D6E6F5] overflow-hidden"
      id="home"
    >
      {/* Restrained Ambient Decorative Lighting */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(242,182,50,0.05),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(circle,rgba(43,108,176,0.03),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Text Column: Progressive Staggered Narrative */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left">
            {/* 1. Subtle Factual Badge (Delay: 0ms, Duration: 500ms) */}
            <div className="hero-reveal-badge inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white border border-[#D6E6F5] text-[#1B2A3A] text-[11px] sm:text-xs font-semibold tracking-wide shadow-xs chip-interactive max-w-full">
              <span className="hero-badge-dot shrink-0" aria-hidden="true" />
              <span className="leading-snug text-left truncate sm:whitespace-nowrap">
                {hero.badge || (language === 'en'
                  ? 'Pure South Indian Cold-Pressed Oils • FSSAI Lic. 12418029000667'
                  : 'தென்னிந்திய தூய மரபு எண்ணெய் • FSSAI உரிமம்: 12418029000667')}
              </span>
            </div>

            {/* 2. Editorial Headline (Delay: 180ms, Duration: 700ms) */}
            <h1
              className={`hero-reveal-title text-[#2B6CB0] break-words ${
                language === 'ta'
                  ? 'text-2xl sm:text-3xl md:text-4xl xl:text-[2.75rem] font-bold leading-[1.3]'
                  : 'text-3xl sm:text-4xl md:text-5xl xl:text-[3.25rem] font-editorial font-normal leading-[1.18]'
              }`}
            >
              <span className="block">
                {hero.titleStart || (language === 'en' ? 'Purity You Can Trust.' : 'பாரம்பரிய தூய்மை.')}
              </span>
              <span
                className={`block text-[#F2B632] mt-1 sm:mt-1.5 ${
                  language === 'en' ? 'italic font-editorial font-normal' : 'font-bold'
                }`}
              >
                {hero.titleHighlight || (language === 'en' ? 'Heritage in Every Drop.' : 'எங்கள் குடும்பத்தின் அடையாளம்.')}
              </span>
            </h1>

            {/* 3. Descriptive Body Copy (Delay: 350ms, Duration: 600ms) */}
            <p className="hero-reveal-desc text-sm sm:text-base text-[#516070] leading-relaxed max-w-xl font-sans">
              {hero.description || (language === 'en'
                ? 'Dayan Enterprises & Co. crafts unadulterated cold-pressed coconut oil and sacred deepam oil, milled from selected sun-dried copra for wholesome kitchens, daily personal care, and devotional prayer rituals across Southern India.'
                : 'தயான் என்டர்பிரைசஸ் & கோ தயாரிக்கும் கலப்படமற்ற தூய தேங்காய் எண்ணெய் மற்றும் சத்யம் பஞ்ச தீப எண்ணெய். சமையல், கூந்தல் பராமரிப்பு மற்றும் புனிதமான வழிபாட்டிற்காக தூத்துக்குடியில் பாரம்பரிய முறையில் தயாரிக்கப்படுகிறது.')}
            </p>

            {/* 4. Dual CTAs (Staggered: 500ms & 620ms, Duration: 500ms) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 sm:pt-2 w-full sm:w-auto">
              <a
                className="hero-reveal-cta-1 hero-btn-primary inline-flex justify-center items-center min-h-[46px] px-6 sm:px-7 py-3 text-xs uppercase tracking-wider font-bold rounded-lg bg-[#2B6CB0] text-white hover:bg-[#4A8AD0] shadow-sm cursor-pointer text-center"
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('products');
                }}
              >
                {hero.ctaButton || (language === 'en' ? 'Explore Our Products' : 'எங்கள் தயாரிப்புகள்')}
              </a>
              <a
                className="hero-reveal-cta-2 hero-btn-secondary inline-flex justify-center items-center min-h-[46px] px-6 sm:px-7 py-3 text-xs uppercase tracking-wider font-semibold rounded-lg bg-white border border-[#D6E6F5] text-[#1B2A3A] hover:bg-[#EAF3FB] cursor-pointer text-center"
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('about');
                }}
              >
                {hero.secondaryCta || (language === 'en' ? "About Satya D'Lite" : 'எங்களைப் பற்றி')}
              </a>
            </div>

            {/* 5. Factual Trust Strip (Delay: 740ms, Duration: 500ms) */}
            <div className="hero-reveal-trust pt-5 sm:pt-6 border-t border-[#D6E6F5] grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs font-medium text-[#1B2A3A]">
              {trustPoints.map((point, idx) => (
                <div key={idx} className="flex items-start sm:items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 min-w-[6px] min-h-[6px] max-w-[6px] max-h-[6px] rounded-full bg-[#F2B632] shrink-0 mt-1 sm:mt-0" aria-hidden="true" />
                  <span className="text-[11px] sm:text-xs leading-tight sm:leading-snug break-words">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Showcase Stage: Progressive Brand Presentation */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* 6. Product Stage Display Panel (Delay: 250ms, Duration: 800ms) */}
            <div className="hero-reveal-stage relative rounded-2xl bg-gradient-to-b from-[#FFFFFF] via-[#EAF3FB] to-[#EAF3FB] border border-[#D6E6F5] shadow-[0_12px_36px_-10px_rgba(43,108,176,0.1)] overflow-hidden group">
              {/* Brand Logo Design Showcase: Fills Available Showcase Space Edge-to-Edge */}
              <div
                className="hero-reveal-product-1 relative w-full aspect-[16/10] overflow-hidden cursor-pointer"
                role="group"
                aria-roledescription={language === 'en' ? 'carousel' : 'படச்சுழற்சி'}
                aria-label={language === 'en' ? 'Satya D’Lite featured products' : 'சத்யா டிலைட் சிறப்பு தயாரிப்புகள்'}
              >
                {HERO_CARD_SLIDES.map((slide, index) => {
                  const isActive = activeHeroSlide === index;
                  return (
                    <img
                      key={slide.src}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      src={slide.src}
                      alt={isActive ? slide.alt[language] : ''}
                      aria-hidden={!isActive}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      decoding="async"
                      draggable="false"
                      style={{
                        objectPosition: slide.objectPosition || 'center center',
                        opacity: isActive ? 1 : 0,
                        transform: isActive && !prefersReducedMotion ? 'scale(1.03)' : 'scale(1)',
                        transition: prefersReducedMotion ? 'none' : 'opacity 900ms ease-in-out, transform 5600ms linear'
                      }}
                    />
                  );
                })}
                <button
                  type="button"
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer border-0 bg-transparent"
                  onClick={() => scrollToSection('products')}
                  aria-label={language === 'en' ? "Explore Satya D'Lite products" : 'சத்யா டிலைட் தயாரிப்புகளைப் பார்க்கவும்'}
                />
                <div
                  className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/10 px-1.5 py-1"
                  role="group"
                  aria-label={language === 'en' ? 'Choose a featured image' : 'சிறப்பு படத்தைத் தேர்ந்தெடுக்கவும்'}
                >
                  {HERO_CARD_SLIDES.map((slide, index) => (
                    <button
                      key={slide.src}
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F2B632]"
                      onClick={() => setActiveHeroSlide(index)}
                      aria-label={language === 'en' ? `Show image ${index + 1} of ${HERO_CARD_SLIDES.length}` : `${HERO_CARD_SLIDES.length} படங்களில் ${index + 1}வது படத்தைக் காட்டு`}
                      aria-pressed={activeHeroSlide === index}
                    >
                      <span
                        className={`block h-2.5 rounded-full transition-all duration-300 ${
                          activeHeroSlide === index ? 'w-5 bg-[#F2B632]' : 'w-2.5 bg-white/90'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
                {/* Subtle studio glow on image border */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
              </div>

              {/* 8. Supporting Manufacturer Caption Strip (Delay: 980ms, Duration: 600ms) */}
              <div className="hero-reveal-caption relative z-10 bg-white/95 backdrop-blur-xs p-3 sm:p-3.5 border-t border-[#D6E6F5] flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 shadow-2xs">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#1B2A3A] leading-snug">
                    {hero.millingLocation || (language === 'en' ? 'Milled & Packaged in West Thoothukudi' : 'மேற்கு தூத்துக்குடியில் தயாரிக்கப்பட்டது')}
                  </p>
                  <p className="text-[11px] text-[#516070] leading-snug mt-0.5">
                    {hero.millingManufacturer || (language === 'en' ? 'Dayan Enterprises & Co. • Tamil Nadu, India' : 'தயான் என்டர்பிரைசஸ் & கோ • தமிழ்நாடு, இந்தியா')}
                  </p>
                </div>
                <a
                  className="self-end sm:self-center shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-[#2B6CB0] hover:text-[#F2B632] transition-colors cursor-pointer group py-1"
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('about');
                  }}
                >
                  <span>{storyLabel}</span>
                  <span className="hero-text-arrow text-xs transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
