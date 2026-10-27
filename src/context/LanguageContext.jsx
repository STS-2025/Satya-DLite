import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteContent } from '../data/content';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Default to English, check localStorage if previously selected
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('sathya_dlite_lang');
    return saved === 'ta' || saved === 'en' ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('sathya_dlite_lang', language);
    document.documentElement.lang = language;
    if (language === 'ta') {
      document.body.classList.add('font-tamil');
      document.body.classList.remove('font-en');
      document.title = "SATYA D'LITE - தூய தேங்காய் எண்ணெய் உற்பத்தியாளர் தூத்துக்குடி | தயான் எண்டர்பிரைசஸ்";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', "தூத்துக்குடி தயான் என்டர்பிரைசஸ் & கோ தயாரிக்கும் SATYA D'LITE தூய தேங்காய் எண்ணெய் மற்றும் சத்யம் பஞ்ச தீப எண்ணெய். சில்லறை பாக்கெட்டுகள், பாட்டில்கள் மற்றும் 15 கிலோ மொத்த விற்பனை டின்கள்.");
      }
    } else {
      document.body.classList.add('font-en');
      document.body.classList.remove('font-tamil');
      document.title = "SATYA D'LITE - Pure Coconut Oil Manufacturer in Thoothukudi | Dayan Enterprises & Co";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', "Pure coconut oil and traditional Deepam oil manufacturer in Thoothukudi, Tamil Nadu by Dayan Enterprises & Co. Explore SATYA D'LITE retail pouches, bottles, and 15 kg bulk tins.");
      }
    }
  }, [language]);

  useEffect(() => {
    const description = document.querySelector('meta[name="description"]')?.content;
    const title = document.title;
    const locale = language === 'ta' ? 'ta_IN' : 'en_IN';
    const metadata = [
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
      ['meta[property="og:locale"]', locale],
      ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', description],
    ];

    metadata.forEach(([selector, content]) => {
      const element = document.querySelector(selector);
      if (element && content) element.setAttribute('content', content);
    });
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ta' : 'en'));
  };

  const setLang = (lang) => {
    if ((lang === 'en' || lang === 'ta') && lang !== language) {
      document.documentElement.classList.add('language-swapping');
      setLanguage(lang);
      window.setTimeout(() => {
        document.documentElement.classList.remove('language-swapping');
        window.dispatchEvent(new CustomEvent('site-language-change'));
      }, 320);
    }
  };

  const t = siteContent[language] || siteContent.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
