import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X } from 'lucide-react';
import { useBodyScrollLock, useDialogFocus } from '../hooks/useDialogAccessibility';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileDialogRef = React.useRef(null);

  // Switch navbar states only after the Hero's bottom crosses the header line.
  useEffect(() => {
    const heroEl = document.getElementById('home');
    if (!heroEl) return;

    const handleHeroBoundary = () => {
      const heroBottom = heroEl.getBoundingClientRect().bottom;
      setIsScrolled(heroBottom <= 80);
    };

    handleHeroBoundary();
    window.addEventListener('scroll', handleHeroBoundary, { passive: true });
    window.addEventListener('resize', handleHeroBoundary);
    window.addEventListener('site-language-change', handleHeroBoundary);
    return () => {
      window.removeEventListener('scroll', handleHeroBoundary);
      window.removeEventListener('resize', handleHeroBoundary);
      window.removeEventListener('site-language-change', handleHeroBoundary);
    };
  }, []);

  // Active section tracking with bottom-of-page awareness & header-offset alignment
  useEffect(() => {
    const handleScroll = () => {
      // 1. Detect bottom of page (ensures Contact is active at end of document)
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // 2. Calibrated scroll offset matching --hero-header-offset (88px + 8px buffer)
      const sections = ['home', 'about', 'products', 'benefits', 'tradition', 'bulk', 'contact'];
      const scrollPosition = window.scrollY + 96;

      // Reverse search: find the deepest section whose top has been scrolled past
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('site-language-change', handleScroll);
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('site-language-change', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Escape key listener to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useBodyScrollLock(mobileMenuOpen);
  useDialogFocus(mobileDialogRef, mobileMenuOpen, () => setMobileMenuOpen(false));

  /*const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };*/
  
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  setMobileMenuOpen(false);

  if (!element) {
    console.warn(`Section not found: #${id}`);
    return;
  }
  requestAnimationFrame(() => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
};


  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'products', label: t.nav.products },
    { id: 'benefits', label: t.nav.benefits },
    { id: 'tradition', label: t.nav.tradition },
    { id: 'bulk', label: t.nav.bulk || (language === 'en' ? 'Commercial Bulk' : 'மொத்த விற்பனை') },
    { id: 'contact', label: t.nav.contact }
  ];

  return (
    <>
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 sm:py-3.5 bg-transparent pointer-events-none'
            : 'py-0 bg-white/95 backdrop-blur-md border-b-2 border-[#F2B632]'
        }`}
      >
      {/* 1. Desktop Full Navbar (Unscrolled State over Hero) */}
      {!isScrolled && (
        <div className={`hidden lg:flex items-center justify-between h-16 lg:h-18 xl:h-20 max-w-7xl mx-auto w-full transition-all duration-300 ${
          language === 'ta' ? 'px-2 lg:px-2.5 xl:px-6 2xl:px-8' : 'px-3 sm:px-4 lg:px-4 xl:px-8'
        }`}>
          {/* Brand Logo */}
          <a
            aria-label="Satya D'Lite Home"
            className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] focus-visible:ring-offset-2 rounded-lg shrink-0 group"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            <img
              alt="Satya D'Lite Logo"
              className={`w-auto object-contain transition-transform duration-200 group-hover:scale-105 ${
                language === 'ta' ? 'h-7.5 lg:h-8 xl:h-10' : 'h-8 lg:h-8.5 xl:h-10'
              }`}
              src="/assets/logo.png"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className={`flex items-center font-medium ${
              language === 'ta'
                ? 'space-x-0.5 xl:space-x-1.5 2xl:space-x-3 text-[11px] xl:text-[12.5px] 2xl:text-sm'
                : 'space-x-0.5 lg:space-x-1 xl:space-x-2.5 2xl:space-x-4 text-[11.5px] lg:text-[12px] xl:text-[13px] 2xl:text-sm'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className={`group relative py-1.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] focus-visible:ring-offset-1 select-none ${
                    language === 'ta' ? 'px-1.5 xl:px-2.5' : 'px-2 xl:px-3'
                  } ${
                    isActive
                      ? 'text-[#2B6CB0] font-bold bg-[#EAF3FB]'
                      : 'text-[#516070] hover:text-[#2B6CB0] hover:bg-[#EAF3FB] hover:shadow-2xs'
                  }`}
                >
                  <span className="relative z-10 transition-colors duration-200">{link.label}</span>
                  {/* Antique Gold active indicator */}
                  {isActive && (
                    <span className="absolute bottom-1 left-2 xl:left-2.5 right-2 xl:right-2.5 h-[2px] bg-[#F2B632] rounded-full shadow-[0_1px_4px_rgba(242,182,50,0.4)] animate-fadeIn pointer-events-none" />
                  )}
                  {/* Noticeable Hover accent bar */}
                  {!isActive && (
                    <span className="absolute bottom-1 left-2 xl:left-2.5 right-2 xl:right-2.5 h-[1.5px] bg-[#F2B632] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out rounded-full pointer-events-none" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Language Toggle & CTA Button */}
          <div className={`flex items-center shrink-0 ${
            language === 'ta' ? 'space-x-1.5 xl:space-x-3' : 'space-x-2 xl:space-x-3.5'
          }`}>
            {/* Language Selector */}
            <div
              className="inline-flex items-center p-0.5 bg-[#EAF3FB] rounded-lg border border-[#D6E6F5] text-[10.5px] xl:text-xs font-semibold shrink-0"
              data-purpose="language-toggle"
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
                aria-label="Switch to English"
                className={`px-1.5 xl:px-2.5 py-0.5 xl:py-1 rounded transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] ${
                  language === 'en'
                    ? 'bg-white text-[#2B6CB0] shadow-xs font-bold border border-[#D6E6F5]'
                    : 'text-[#516070] hover:text-[#2B6CB0] hover:bg-[#D6E6F5]/50'
                }`}
                id="lang-btn-en"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                aria-pressed={language === 'ta'}
                aria-label="தமிழுக்கு மாறவும்"
                className={`px-1.5 xl:px-2.5 py-0.5 xl:py-1 rounded font-tamil transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] ${
                  language === 'ta'
                    ? 'bg-white text-[#2B6CB0] shadow-xs font-bold border border-[#D6E6F5]'
                    : 'text-[#516070] hover:text-[#2B6CB0] hover:bg-[#D6E6F5]/50'
                }`}
                id="lang-btn-ta"
              >
                தமிழ்
              </button>
            </div>

            {/* Primary CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className={`inline-flex items-center justify-center font-semibold rounded-lg bg-[#2B6CB0] text-white hover:bg-[#4A8AD0] hover:shadow-[0_4px_14px_rgba(43,108,176,0.25)] transition-all shadow-xs cursor-pointer btn-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] focus-visible:ring-offset-2 shrink-0 tracking-wider uppercase ${
                language === 'ta'
                  ? 'px-2 xl:px-3.5 py-1.5 xl:py-2 text-[10.5px] xl:text-xs'
                  : 'px-2.5 xl:px-4 py-1.5 xl:py-2 text-[11px] xl:text-xs'
              }`}
            >
              {t.nav.enquireNow || (language === 'en' ? 'Enquire Now' : 'விசாரிக்க')}
            </a>
          </div>
        </div>
      )}

      {/* 2. Desktop Minimized Floating Pill (Scrolled State past Hero) */}
      {isScrolled && (
        <div className="hidden lg:flex justify-center mx-auto transition-all duration-300 pointer-events-auto">
          <nav
            aria-label="Minimized Navigation"
            className={`inline-flex items-center py-1 bg-white/95 backdrop-blur-lg rounded-full border border-[#D6E6F5] shadow-[0_8px_30px_rgba(43,108,176,0.14)] transition-all duration-300 animate-fadeIn ${
              language === 'ta'
                ? 'px-2 xl:px-3 space-x-0.5 xl:space-x-1.5 text-[11px] xl:text-[12.5px]'
                : 'px-2.5 xl:px-3 space-x-0.5 xl:space-x-2 text-[12px] xl:text-[13px]'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className={`group relative py-1.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] focus-visible:ring-offset-1 select-none ${
                    language === 'ta' ? 'px-1.5 xl:px-2.5' : 'px-2 xl:px-3'
                  } ${
                    isActive
                      ? 'text-[#2B6CB0] font-bold bg-[#EAF3FB]'
                      : 'text-[#516070] font-medium hover:text-[#2B6CB0] hover:bg-[#EAF3FB] hover:shadow-2xs'
                  }`}
                >
                  <span className="relative z-10 transition-colors duration-200">{link.label}</span>
                  {/* Antique Gold active indicator */}
                  {isActive && (
                    <span className="absolute bottom-1 left-2 xl:left-2.5 right-2 xl:right-2.5 h-[2px] bg-[#F2B632] rounded-full shadow-[0_1px_4px_rgba(242,182,50,0.4)] animate-fadeIn pointer-events-none" />
                  )}
                  {/* Noticeable Hover accent bar */}
                  {!isActive && (
                    <span className="absolute bottom-1 left-2 xl:left-2.5 right-2 xl:right-2.5 h-[1.5px] bg-[#F2B632] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out rounded-full pointer-events-none" />
                  )}
                </a>
              );
            })}

            {/* Subtle Divider */}
            <span className="w-px h-4.5 bg-[#D6E6F5] mx-1 xl:mx-1.5 shrink-0" aria-hidden="true" />

            {/* Segmented Floating Language Toggle */}
            <div
              className="inline-flex items-center p-0.5 bg-[#EAF3FB] rounded-full border border-[#D6E6F5] text-[10px] xl:text-[11px] font-semibold shrink-0"
              data-purpose="floating-language-toggle"
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
                aria-label="Switch to English"
                className={`px-1.5 xl:px-2 py-0.5 rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] ${
                  language === 'en'
                    ? 'bg-white text-[#2B6CB0] shadow-xs font-bold border border-[#D6E6F5]'
                    : 'text-[#516070] hover:text-[#2B6CB0] hover:bg-[#D6E6F5]/50'
                }`}
                id="floating-lang-btn-en"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                aria-pressed={language === 'ta'}
                aria-label="தமிழுக்கு மாறவும்"
                className={`px-1.5 xl:px-2 py-0.5 rounded-full font-tamil transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] ${
                  language === 'ta'
                    ? 'bg-white text-[#2B6CB0] shadow-xs font-bold border border-[#D6E6F5]'
                    : 'text-[#516070] hover:text-[#2B6CB0] hover:bg-[#D6E6F5]/50'
                }`}
                id="floating-lang-btn-ta"
              >
                தமிழ்
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* 3. Mobile Header Bar (Always present on viewports < lg) */}
      <div
        className={`flex lg:hidden items-center justify-between transition-all duration-300 pointer-events-auto ${
          isScrolled
            ? 'h-13 sm:h-14 px-3 sm:px-4 mx-3 rounded-2xl bg-white/95 backdrop-blur-lg border border-[#D6E6F5] shadow-md'
            : 'h-16 px-4 sm:px-6 w-full'
        }`}
      >
        {/* Brand Logo */}
        <a
          aria-label="Satya D'Lite Home"
          className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] focus-visible:ring-offset-2 rounded-lg shrink-0"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
        >
          <img
            alt="Satya D'Lite Logo"
            className={`w-auto object-contain transition-all duration-300 ${
              isScrolled ? 'h-7 sm:h-8' : 'h-8 sm:h-9'
            }`}
            src="/assets/logo.png"
          />
        </a>

        {/* Mobile Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="inline-flex items-center p-0.5 bg-[#EAF3FB] rounded-lg border border-[#D6E6F5] text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
              aria-label="Switch to English"
              className={`min-h-11 min-w-11 px-2 py-0.5 rounded transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] ${
                language === 'en' ? 'bg-white text-[#2B6CB0] shadow-xs font-bold border border-[#D6E6F5]' : 'text-[#516070] hover:text-[#2B6CB0]'
              }`}
              id="mobile-header-lang-btn-en"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ta')}
              aria-pressed={language === 'ta'}
              aria-label="தமிழுக்கு மாறவும்"
              className={`min-h-11 min-w-11 px-2 py-0.5 rounded font-tamil transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] ${
                language === 'ta' ? 'bg-white text-[#2B6CB0] shadow-xs font-bold border border-[#D6E6F5]' : 'text-[#516070] hover:text-[#2B6CB0]'
              }`}
              id="mobile-header-lang-btn-ta"
            >
              தமிழ்
            </button>
          </div>
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="min-h-11 min-w-11 p-1.5 text-[#1B2A3A] hover:text-[#2B6CB0] hover:bg-[#EAF3FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] focus-visible:ring-offset-2 rounded-lg cursor-pointer transition-colors"
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#1B2A3A]/30 backdrop-blur-xs -z-10 lg:hidden transition-opacity duration-300 pointer-events-auto"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileDialogRef}
          className={`relative z-50 lg:hidden bg-white/98 backdrop-blur-xl border-b border-[#D6E6F5] px-5 py-4 space-y-2 shadow-2xl transition-all duration-300 pointer-events-auto ${
            isScrolled ? 'mx-3 mt-1.5 rounded-2xl border border-[#D6E6F5]' : ''
          }`}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className={`block min-h-11 px-3.5 py-2.5 rounded-lg text-sm cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] ${
                    isActive
                      ? 'font-bold text-[#2B6CB0] bg-[#EAF3FB] border-l-4 border-[#F2B632] shadow-2xs'
                      : 'font-medium text-[#1B2A3A] hover:text-[#2B6CB0] hover:bg-[#EAF3FB]/70'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Drawer Language Row */}
          <div className="pt-2.5 pb-1 border-t border-[#D6E6F5]/80 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#516070]">
              {language === 'en' ? 'Language / மொழி' : 'மொழி / Language'}
            </span>
            <div className="inline-flex items-center p-0.5 bg-[#EAF3FB] rounded-lg border border-[#D6E6F5] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
                aria-label="Switch to English"
                className={`min-h-11 min-w-11 px-2.5 py-1 rounded transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] ${
                  language === 'en'
                    ? 'bg-white text-[#2B6CB0] shadow-xs font-bold border border-[#D6E6F5]'
                    : 'text-[#516070] hover:text-[#2B6CB0]'
                }`}
                id="drawer-lang-btn-en"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                aria-pressed={language === 'ta'}
                aria-label="தமிழுக்கு மாறவும்"
                className={`min-h-11 min-w-11 px-2.5 py-1 rounded font-tamil transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] ${
                  language === 'ta'
                    ? 'bg-white text-[#2B6CB0] shadow-xs font-bold border border-[#D6E6F5]'
                    : 'text-[#516070] hover:text-[#2B6CB0]'
                }`}
                id="drawer-lang-btn-ta"
              >
                தமிழ்
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-[#D6E6F5]/80">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="block min-h-11 w-full text-center py-2.5 px-4 bg-[#2B6CB0] text-white rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-[#4A8AD0] transition-all cursor-pointer shadow-xs btn-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0] focus-visible:ring-offset-2"
            >
              {t.nav.enquireNow || (language === 'en' ? 'Enquire Now' : 'விசாரிக்க')}
            </a>
          </div>
        </div>
      )}
      </header>
      {/* Spacer matching full header height to preserve document flow */}
      <div className="h-16 lg:h-18 xl:h-20" aria-hidden="true" />
    </>
  );
};
