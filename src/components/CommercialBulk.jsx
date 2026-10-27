import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Check, Phone, FileText } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const CommercialBulk = ({ onSelectProductForInquiry }) => {
  const { language, t } = useLanguage();
  const bulk = t.bulk || {};
  const [sectionRef, isVisible] = useScrollReveal();

  const tins = [
    {
      id: 'tin-15kg-kolumbu',
      name: 'SATYA DELUX Kolumbu Thengai Ennai',
      displayName: bulk.tin1Title || 'Satya Delux 15kg',
      badge: bulk.tin1Sub || (language === 'en' ? 'Kolumbu Coconut Oil' : 'கொழும்பு தேங்காய் எண்ணெய்'),
      image: '/assets/catalogue/New_tin2.png',
      alt: 'SATYA DELUX Kolumbu Thengai Ennai 15kg Tin - Lord Murugan Artwork'
    },
    {
      id: 'tin-15kg-nayam',
      name: 'SATYA DELUX Nayam Thengaai Ennai',
      displayName: bulk.tin2Title || 'Satya Delux Nayam',
      badge: bulk.tin2Sub || (language === 'en' ? 'Nayam Coconut Oil' : 'நயம் தேங்காய் எண்ணெய்'),
      image: '/assets/catalogue/New_TIn1.png',
      alt: 'SATYA DELUX Nayam Thengaai Ennai 15kg Tin - Green Label'
    }
  ];

  const points = bulk.points || [
    language === 'en' ? 'Direct Manufacturer Dispatch' : 'நேரடி ஆலை விநியோகம்',
    language === 'en' ? '15 Kgs Nett Heavy Square Steel Tin' : '15 கிலோ உறுதியான சதுர ஸ்டீல் டின்',
    language === 'en'
      ? 'Batch Coded & FSSAI Lic. 12418029000667'
      : 'பேட்ச் குறியீடு & FSSAI உரிமம்: 12418029000667',
    language === 'en'
      ? 'Wholesale GST Invoicing & Quotations'
      : 'மொத்த GST விலைப்பட்டியல் & கொட்டேஷன்'
  ];

  const handleTinInquiry = (tinName) => {
    if (onSelectProductForInquiry) {
      onSelectProductForInquiry(tinName);
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const whatsappBulkMessage = encodeURIComponent(
    language === 'en'
      ? 'Hello Dayan Enterprises, I would like to request a wholesale quotation for 15kg Commercial Bulk Tins (Kolumbu / Nayam).'
      : 'வணக்கம் தயான் என்டர்பிரைசஸ், 15 கிலோ வணிக டின்களுக்கான (கொழும்பு / நயம்) மொத்த விலைப்பட்டியல் அறிய விரும்புகிறேன்.'
  );

  return (
    <section
      className={`stage2-section-space bg-[#EAF3FB] border-b border-[#D6E6F5] reveal-init ${
        isVisible ? 'reveal-active' : ''
      }`}
      id="bulk"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1F4F85] rounded-2xl p-6 sm:p-10 lg:p-12 border border-[#2B6CB0] shadow-xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Side-by-Side Showcase of both 15kg Tins with Warehouse Environmental Backdrop */}
            <div className="lg:col-span-6">
              <div className="relative bg-white rounded-xl border border-[#D6E6F5] p-5 sm:p-6 shadow-xs text-[#1B2A3A] overflow-hidden">
                {/* Commercial Warehouse Environmental Backdrop */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-65 pointer-events-none"
                  style={{ backgroundImage: "url('/assets/background/bulk-tins-background.png')" }}
                  aria-hidden="true"
                />

                <div className="relative z-10 grid grid-cols-2 gap-4 items-stretch">
                  {tins.map((tin) => (
                    <div
                      key={tin.id}
                      className="bulk-tin-card flex flex-col items-center text-center p-3 rounded-lg border border-[#D6E6F5] hover:border-[#2B6CB0]/50 transition-all bg-white/95 backdrop-blur-xs card-lift"
                    >
                      <div className="bulk-tin-image-frame h-44 sm:h-52 w-full flex items-center justify-center p-2 bg-[#ebf8ff] rounded-lg border border-[#D6E6F5] img-zoom-stage">
                        <img
                          src={tin.image}
                          alt={tin.alt}
                          className="h-full w-auto object-contain rounded drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <span
                        className={`mt-2.5 text-xs sm:text-[13px] font-normal text-[#2B6CB0] line-clamp-1 ${
                          language === 'en' ? 'font-editorial text-sm' : 'font-sans font-bold'
                        }`}
                      >
                        {tin.displayName}
                      </span>
                      <span className="text-[11px] text-[#F2B632] font-medium line-clamp-1 mb-3 chip-interactive font-sans">
                        {tin.badge}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleTinInquiry(tin.name)}
                        className="bulk-tin-enquire btn-premium mt-auto min-h-11 w-full flex items-center justify-center py-2 px-2 bg-[#2B6CB0] hover:bg-[#4A8AD0] text-white text-[11px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer shadow-xs font-sans"
                      >
                        {language === 'en' ? 'Enquire' : 'விசாரிக்க'}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 mt-4 pt-3 border-t border-[#D6E6F5] text-center text-xs text-[#516070] font-medium font-sans">
                  {bulk.packagingCaption ||
                    'Dayan Enterprises & Co. • 15 Kgs Nett Sealed Commercial Square Canisters'}
                </div>
              </div>
            </div>

            {/* Wholesale Proposition Content */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F2B632]/20 border border-[#F2B632]/40 text-[#F2B632] text-xs font-bold uppercase tracking-wider chip-interactive font-sans">
                  {bulk.eyebrow || 'Commercial Bulk Supply'}
                </span>
                <h2 className="stage2-section-title type-section-heading text-white mt-2">
                  {bulk.heading ||
                    'Commercial 15kg Tins for Bakeries, Sweet Makers & Wholesalers'}
                </h2>
                <p className="stage2-intro-copy text-[#D6E6F5] mt-2">
                  {bulk.subheading ||
                    'Dayan Enterprises & Co. delivers dependable, directly dispatched 15 Kgs Nett commercial square tin canisters for institutional kitchens, traditional confectioners, and regional edible oil stockists.'}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-[#D6E6F5]">
                {points.map((point, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#F2B632]/20 text-[#F2B632] flex items-center justify-center shrink-0">
                      <Check size={13} className="font-bold stroke-[3]" />
                    </span>
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>

              {/* B2B Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleTinInquiry(
                      'SATYA DELUX Kolumbu Thengai Ennai (15 kg Bulk Tin)'
                    )
                  }
                  className="bulk-action-quote btn-premium inline-flex justify-center items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-bold rounded-lg bg-[#F2B632] text-[#1B2A3A] hover:bg-[#D99E1F] transition-colors shadow-xs cursor-pointer"
                >
                  <FileText size={15} />
                  <span>{bulk.requestQuoteBtn || 'Request Bulk Quotation'}</span>
                </button>

                <a
                  href={bulk.phone || 'tel:04612346947'}
                  className="bulk-action-call btn-premium inline-flex justify-center items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
                >
                  <Phone size={15} className="text-[#F2B632]" />
                  <span>{bulk.callDeskBtn || 'Call Mill Desk: (0461) 2346947'}</span>
                </a>

                <a
                  href={`https://wa.me/919442206797?text=${whatsappBulkMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bulk-action-whatsapp btn-premium inline-flex justify-center items-center gap-1.5 px-4 py-3 text-xs font-semibold rounded-lg bg-[#25D366]/20 text-[#68D391] hover:bg-[#25D366]/30 transition-colors"
                  aria-label="Inquire on WhatsApp"
                >
                  <WhatsAppIcon size={15} />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
