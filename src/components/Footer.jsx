import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp, Globe } from 'lucide-react';

export const Footer = ({ onSelectCategory }) => {
  const { language, setLanguage, t } = useLanguage();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (categoryId) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
    window.dispatchEvent(new CustomEvent('select-product-category', { detail: categoryId }));
    scrollTo('products');
  };

  const nav = t.nav || {};
  const contact = t.contact || {};

  const navLinks = [
    { id: 'home', label: nav.home || 'Home' },
    { id: 'about', label: nav.about || 'About Us' },
    { id: 'products', label: language === 'en' ? '15 Products Range' : '15 தயாரிப்புகள்' },
    { id: 'benefits', label: nav.benefits || 'Quality Merits' },
    { id: 'tradition', label: nav.tradition || 'Our Tradition' },
    { id: 'bulk', label: language === 'en' ? 'Commercial 15kg Tins' : '15 கிலோ வணிக டின்கள்' },
    { id: 'contact', label: nav.contact || 'Contact Us' }
  ];

  const productCategories = [
    {
      category: 'packets',
      label: language === 'en' ? 'Packets (5ml to 1000ml)' : 'பாக்கெட்டுகள் (5ml முதல் 1000ml)'
    },
    {
      category: 'bottles',
      label: language === 'en' ? 'Bottles (50ml to 1L)' : 'பாட்டில்கள் (50ml முதல் 1L)'
    },
    {
      category: 'dheepennai',
      label: language === 'en' ? 'Sathyam Pancha Deepam Oil' : 'சத்யம் பஞ்ச தீப எண்ணெய்'
    },
    {
      category: 'tins',
      label: language === 'en' ? 'Satya Delux 15kg Murugan Tin' : 'சத்யா டீலக்ஸ் 15 கிலோ முருகன் டின்'
    },
    {
      category: 'tins',
      label: language === 'en' ? 'Satya Delux Nayam 15kg Tin' : 'சத்யா டீலக்ஸ் நயம் 15 கிலோ டின்'
    }
  ];

  return (
    <footer className="bg-[#1F4F85] text-[#D6E6F5] border-t border-[#2B6CB0]" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 sm:pt-14 sm:pb-28 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Logo & Brand Statement (Col 1: 2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="bg-white inline-block p-2 rounded-lg mx-auto lg:mx-0 shadow-sm">
              <img
                src="/assets/logo.png"
                alt="Satya D'Lite Logo"
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-[#D6E6F5] leading-relaxed max-w-sm mx-auto lg:mx-0 text-center lg:text-left">
              {language === 'en'
                ? "Satya D'Lite cold-pressed coconut oils and Sathyam Pancha Deepam Pooja oils are manufactured with uncompromised traditional hygiene by Dayan Enterprises & Co., West Thoothukudi."
                : 'சத்யா டி\'லைட் தூய மரபு தேங்காய் எண்ணெய் மற்றும் சத்யம் பஞ்ச தீப பூஜை எண்ணெய்கள் தயான் என்டர்பிரைசஸ் & கோ ஆலை மூலம் சுகாதாரமாக தயாரிக்கப்படுகின்றன.'}
            </p>
            <p className={`text-xs max-w-sm mx-auto lg:mx-0 text-center lg:text-left ${language === 'ta' ? 'font-tamil text-[#F2B632]' : 'font-sans text-[#F2B632]'}`}>
              {language === 'ta'
                ? "தூய மரபு, அன்றாட நலம் — சத்யா டி'லைட் தேங்காய் எண்ணெய்."
                : "Pure Tradition, Everyday Wellness — Satya D'Lite Coconut Oil."}
            </p>

            {/* Language Switcher in Footer */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2">
              <Globe size={13} className="text-[#F2B632]" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
                className={`px-3 py-1.5 min-h-[36px] rounded text-xs font-semibold transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#F2B632] text-[#1F4F85] border border-[#F2B632]'
                    : 'text-[#D6E6F5] hover:text-white'
                }`}
              >
                English
              </button>
              <span className="text-[#2B6CB0]">|</span>
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                aria-pressed={language === 'ta'}
                className={`px-3 py-1.5 min-h-[36px] rounded text-xs font-semibold transition-colors cursor-pointer ${
                  language === 'ta'
                    ? 'bg-[#F2B632] text-[#1F4F85] border border-[#F2B632]'
                    : 'text-[#D6E6F5] hover:text-white'
                }`}
              >
                தமிழ்
              </button>
            </div>
          </div>

          {/* Navigation Links (Col 2: 1 col) */}
          <div className="space-y-3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white text-center lg:text-left w-full">
              {language === 'en' ? 'Navigation' : 'வழிகாட்டல்'}
            </h4>
            <ul className="space-y-1 text-xs text-[#D6E6F5] flex flex-col items-center lg:items-start w-full">
              {navLinks.map((link) => (
                <li key={link.id} className="w-full flex justify-center lg:justify-start">
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="hover:text-white transition-colors text-center lg:text-left cursor-pointer py-1.5 px-2 inline-flex items-center justify-center lg:justify-start rounded active:bg-[#2B6CB0]/20 min-h-[32px]"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories (Col 3: 1 col) */}
          <div className="space-y-3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white text-center lg:text-left w-full">
              {language === 'en' ? 'Product Categories' : 'தயாரிப்பு வகைகள்'}
            </h4>
            <ul className="space-y-1 text-xs text-[#D6E6F5] flex flex-col items-center lg:items-start w-full">
              {productCategories.map((item, idx) => (
                <li key={idx} className="w-full flex justify-center lg:justify-start">
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(item.category)}
                    className="hover:text-white transition-colors text-center lg:text-left cursor-pointer py-1.5 px-2 inline-flex items-center justify-center lg:justify-start rounded active:bg-[#2B6CB0]/20 min-h-[32px]"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Manufacturer Address & Verified FSSAI (Col 4: 1 col) */}
          <div className="space-y-3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white text-center lg:text-left w-full">
              {language === 'en' ? 'Manufacturer' : 'உற்பத்தியாளர்'}
            </h4>
            <p className="text-xs text-[#D6E6F5] leading-relaxed max-w-sm mx-auto lg:mx-0 text-center lg:text-left">
              <strong>{contact.companyName || 'Dayan Enterprises & Co.'}</strong>
              <br />
              4/95, Ettayapuram Road, West Thoothukudi - 628 002, Tamil Nadu, India.
            </p>
            <div className="pt-2 text-[11px] text-[#D6E6F5] space-y-1.5 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
              <p className="inline-flex items-center justify-center lg:justify-start gap-1">
                <span className="text-[#4A8AD0]">Landline:</span>{' '}
                <a href="tel:04612346947" className="hover:text-white transition-colors py-1 px-1.5 rounded active:bg-[#2B6CB0]/20">
                  0461-2346947
                </a>
              </p>
              <p className="inline-flex items-center justify-center lg:justify-start gap-1">
                <span className="text-[#4A8AD0]">Mobile:</span>{' '}
                <a href="tel:+919443145630" className="hover:text-white transition-colors py-1 px-1.5 rounded active:bg-[#2B6CB0]/20">
                  +91 9443145630
                </a>
              </p>
              <p className="text-[#D6E6F5] font-mono py-0.5">
                <span className="text-[#4A8AD0] font-sans">FSSAI:</span> 12418029000667
              </p>
            </div>
          </div>
        </div>

        {/* Legal Subfooter */}
        <div className="mt-12 pt-8 border-t border-[#2B6CB0] flex flex-col lg:flex-row items-center justify-between text-xs text-[#D6E6F5] gap-4 text-center lg:text-left">
          <p className="text-center lg:text-left">© 2026 Dayan Enterprises &amp; Co. / Satya D'Lite. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-4 text-center">
            <span className={`text-xs hidden md:inline ${language === 'ta' ? 'font-tamil text-[#F2B632]' : 'font-sans text-[#F2B632]'}`}>
              {language === 'ta'
                ? "சத்யா டி'லைட் — பாரம்பரிய தூய்மை, அன்றாட நலம்"
                : "Satya D'Lite — Pure Tradition, Everyday Wellness"}
            </span>
            <span className="text-[#4A8AD0] text-center">
              Developed by{' '}
              <a
                href="https://samudhratechsolutions.biz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D6E6F5] hover:text-white hover:underline transition-colors py-1 inline-block"
              >
                Samudhra Tech Solutions
              </a>
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-1 font-bold text-[#D6E6F5] hover:text-[#F2B632] transition-colors cursor-pointer py-1.5 px-2.5 rounded active:bg-[#2B6CB0]/20 min-h-[36px]"
            >
              <span>{language === 'en' ? 'Top' : 'மேலே'}</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
