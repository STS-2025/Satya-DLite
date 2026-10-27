import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useBodyScrollLock, useDialogFocus } from '../hooks/useDialogAccessibility';

const getProductBackground = (category) => {
  switch (category) {
    case 'dheepennai':
      return '/assets/background/deepam-oil-background.png';
    case 'tins':
      return '/assets/background/bulk-tins-background.png';
    case 'packets':
    case 'bottles':
    default:
      return '/assets/background/coconut-oil-background.png';
  }
};

export const ProductDetailModal = ({ product, isOpen, onClose, onInquire }) => {
  const { language, t } = useLanguage();
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useBodyScrollLock(isOpen);
  useDialogFocus(dialogRef, isOpen, onClose);

  if (!isOpen || !product) return null;

  const bgImage = getProductBackground(product.category);

  const whatsappMessage = encodeURIComponent(
    language === 'en'
      ? `Hello SATYA D'LITE team, I would like to inquire about ${product.name} (${product.size}). Please share pricing and bulk availability.`
      : `வணக்கம் சத்யா டிலைட், ${product.name} (${product.size}) தயாரிப்பு பற்றிய விலை மற்றும் விவரங்களை அறிய விரும்புகிறேன்.`
  );

  return (
    <div
      ref={dialogRef}
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[60] overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn overscroll-contain"
      id="product-modal"
      role="dialog"
      data-lenis-prevent
      onClick={onClose}
    >
      <div
        className="relative bg-white border border-[#D6E6F5] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl transition-all animate-modal-pop overscroll-contain"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          aria-label={t.catalogue?.closeModal || 'Close dialog'}
          className="absolute top-4 right-4 min-h-11 min-w-11 flex items-center justify-center text-slate-400 hover:text-slate-700 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer z-20"
          onClick={onClose}
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Left: Product Image Stage with Environmental Background Backdrop */}
          <div className="relative rounded-xl overflow-hidden bg-[#EAF3FB] border border-[#D6E6F5] aspect-square flex items-center justify-center p-6 shadow-inner group">
            {/* Authentic Environmental Backdrop */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-300 group-hover:opacity-40"
              style={{ backgroundImage: `url(${bgImage})` }}
              aria-hidden="true"
            />
            {/* Subtle Gradient Wash to preserve bottle label clarity */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/30 to-white/60 pointer-events-none" />

            {/* Product Image */}
            <img
              alt={product.name}
              className="relative z-10 h-full w-auto object-contain product-shadow-deep transition-transform duration-300 group-hover:scale-105"
              id="modal-img"
              src={product.image}
            />
          </div>

          {/* Right: Product Details & Specifications */}
          <div className="space-y-3 text-left">
            <span
              className="inline-block px-2.5 py-0.5 bg-[#EAF3FB] text-[#2B6CB0] border border-[#D6E6F5] text-xs font-bold rounded uppercase tracking-wider chip-interactive"
              id="modal-badge"
            >
              {product.categoryLabel || product.category}
            </span>

            <h3
              className={`leading-snug ${
                language === 'en'
                  ? 'font-editorial font-normal text-2xl text-[#2B6CB0]'
                  : 'font-sans font-bold text-xl text-[#2B6CB0]'
              }`}
              id="modal-title"
            >
              {product.name}
            </h3>

            <p className="text-xs text-[#516070] leading-relaxed line-clamp-3">
              {product.fullDesc || product.shortDesc}
            </p>

            {/* Specifications Box */}
            <div className="space-y-2 text-xs text-[#516070] border-t border-b border-[#D6E6F5] py-3">
              <p>
                <strong className="text-[#1B2A3A] font-semibold">
                  {language === 'en' ? 'Pack Specification:' : 'பேக் விவரம்:'}
                </strong>{' '}
                <span id="modal-sizes">{product.size}</span>
              </p>
              <p>
                <strong className="text-[#1B2A3A] font-semibold">
                  {language === 'en' ? 'Category / Type:' : 'வகைப்பாடு:'}
                </strong>{' '}
                <span id="modal-notes">{product.categoryLabel}</span>
              </p>
              <p>
                <strong className="text-[#1B2A3A] font-semibold">
                  {language === 'en' ? 'Manufacturer:' : 'தயாரிப்பாளர்:'}
                </strong>{' '}
                <span>Dayan Enterprises & Co., West Thoothukudi</span>
              </p>
              <p>
                <strong className="text-[#1B2A3A] font-semibold">
                  {language === 'en' ? 'FSSAI License:' : 'FSSAI உரிமம்:'}
                </strong>{' '}
                <span className="font-mono font-medium text-[#2B6CB0]">12418029000667</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                className="btn-premium block min-h-11 w-full text-center py-2.5 bg-[#2B6CB0] hover:bg-[#4A8AD0] text-white text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
                onClick={() => {
                  onClose();
                  if (onInquire) onInquire(product.name);
                }}
              >
                {t.catalogue?.inquireBtn || (language === 'en' ? 'Enquire For This Product' : 'விவரம் கேட்க')}
              </button>

              <a
                href={`https://wa.me/919442206797?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium flex min-h-11 items-center justify-center gap-2 w-full text-center py-2.5 bg-white border border-[#D6E6F5] hover:bg-[#EAF3FB] text-[#1B2A3A] text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <WhatsAppIcon size={15} className="text-[#25D366]" />
                <span>{language === 'en' ? 'WhatsApp Inquiry' : 'வாட்ஸ்அப் விசாரணை'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
