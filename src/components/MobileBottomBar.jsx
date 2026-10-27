import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Package, Phone, Globe } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const MobileBottomBar = ({ selectedProductInterest = '' }) => {
  const { language, setLanguage } = useLanguage();
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappMessage = encodeURIComponent(
    language === 'en'
      ? `Hello Satya D'Lite team, I would like to inquire about ${selectedProductInterest || 'your coconut oil products'}.`
      : `வணக்கம், ${selectedProductInterest || "Satya D'Lite தயாரிப்புகள்"} பற்றிய விவரங்களை அறிய விரும்புகிறேன்.`
  );

  return (
    <div
      className="mobile-bottom-bar md:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-[calc(10px+env(safe-area-inset-bottom,0px))] pointer-events-none"
    >
      <div className="pointer-events-auto max-w-md mx-auto bg-white/95 backdrop-blur-md border border-[#D6E6F5] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] grid grid-cols-4 p-1.5 gap-1">
        {/* Products Shortcut */}
        <button
          type="button"
          onClick={() => scrollTo('products')}
          aria-label="View Products"
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-xl text-[#1B2A3A] active:scale-95 active:bg-slate-100 transition-all cursor-pointer focus:outline-none min-w-0"
        >
          <div className="w-8 h-8 rounded-full bg-[#EAF3FB] text-[#2B6CB0] border border-[#D6E6F5] flex items-center justify-center shrink-0">
            <Package size={16} />
          </div>
          <span className="text-[10px] font-bold truncate max-w-full">
            {language === 'en' ? 'Products' : 'தயாரிப்புகள்'}
          </span>
        </button>

        {/* WhatsApp Direct Inquiry */}
        <a
          href={`https://wa.me/919442206797?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Inquiry"
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-xl text-[#1B2A3A] active:scale-95 active:bg-slate-100 transition-all cursor-pointer focus:outline-none min-w-0"
        >
          <div className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#128C7E] border border-emerald-200 flex items-center justify-center shrink-0">
            <WhatsAppIcon size={16} />
          </div>
          <span className="text-[10px] font-bold truncate max-w-full">WhatsApp</span>
        </a>

        {/* Direct Call */}
        <a
          href="tel:04612346947"
          aria-label="Call Satya D'lite"
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-xl text-[#1B2A3A] active:scale-95 active:bg-slate-100 transition-all cursor-pointer focus:outline-none min-w-0"
        >
          <div className="w-8 h-8 rounded-full bg-[#EAF3FB] text-[#2B6CB0] border border-[#D6E6F5] flex items-center justify-center shrink-0">
            <Phone size={16} />
          </div>
          <span className="text-[10px] font-bold truncate max-w-full">
            {language === 'en' ? 'Call' : 'அழைக்க'}
          </span>
        </a>

        {/* 1-Tap Language Switcher */}
        <button
          type="button"
          onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
          aria-label="Toggle Language"
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-xl text-[#1B2A3A] active:scale-95 active:bg-slate-100 transition-all cursor-pointer focus:outline-none min-w-0"
        >
          <div className="w-8 h-8 rounded-full bg-[#2B6CB0] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Globe size={16} />
          </div>
          <span className="text-[10px] font-bold truncate max-w-full">
            {language === 'en' ? 'தமிழ்' : 'English'}
          </span>
        </button>
      </div>
    </div>
  );
};
