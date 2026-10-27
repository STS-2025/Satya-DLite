import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ProductDetailModal } from './ProductDetailModal';
import { ArrowRight, X, Layers } from 'lucide-react';
import { useBodyScrollLock, useDialogFocus } from '../hooks/useDialogAccessibility';

const CATEGORY_BACKGROUNDS = {
  packets: '/assets/background/coconut-oil-background.png',
  bottles: '/assets/background/coconut-oil-background.png',
  dheepennai: '/assets/background/deepam-oil-background.png',
  tins: '/assets/background/bulk-tins-background.png'
};

const REPRESENTATIVE_PRODUCT_IDS = {
  packets: 'packet_5ml',
  bottles: 'bottle-500ml',
  dheepennai: 'dheepennai-round-500ml',
  tins: 'tin-15kg-kolumbu'
};

export const ProductsSection = ({
  onSelectProductForInquiry,
  selectedCategory = 'all',
  onCategoryChange
}) => {
  const { language, t } = useLanguage();
  const catalogue = t.catalogue || {};
  const products = catalogue.products || [];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeCategoryOverride, setActiveCategoryOverride] = useState(null);
  const [isRangeModalExplicitOpen, setIsRangeModalExplicitOpen] = useState(false);
  const rangeDialogRef = React.useRef(null);

  const activeRangeCategory = activeCategoryOverride || (selectedCategory !== 'all' ? selectedCategory : null);
  const isRangeModalOpen = isRangeModalExplicitOpen || (Boolean(selectedCategory) && selectedCategory !== 'all');

  const handleOpenRange = useCallback((categoryId) => {
    setActiveCategoryOverride(categoryId);
    setIsRangeModalExplicitOpen(true);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  }, [onCategoryChange]);

  const handleCloseRangeModal = useCallback(() => {
    setActiveCategoryOverride(null);
    setIsRangeModalExplicitOpen(false);
    if (onCategoryChange) {
      onCategoryChange('all');
    }
  }, [onCategoryChange]);

  const handleSwitchCategory = useCallback((categoryId) => {
    const nextCategory = categoryId === 'all' ? null : categoryId;
    setActiveCategoryOverride(nextCategory);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  }, [onCategoryChange]);

  const handleOpenDetails = useCallback((product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
  }, []);

  const handleInquire = useCallback((productName) => {
    if (onSelectProductForInquiry) {
      setIsRangeModalExplicitOpen(false);
      setActiveCategoryOverride(null);
      setIsDetailModalOpen(false);
      if (onCategoryChange) {
        onCategoryChange('all');
      }
      onSelectProductForInquiry(productName);
    }
  }, [onCategoryChange, onSelectProductForInquiry]);

  // Listen for category selection events from Footer or Navbar
  useEffect(() => {
    const handleCategoryEvent = (e) => {
      const categoryId = e.detail;
      if (categoryId) {
        setActiveCategoryOverride(categoryId);
        setIsRangeModalExplicitOpen(true);
        if (onCategoryChange) {
          onCategoryChange(categoryId);
        }
      }
    };

    window.addEventListener('select-product-category', handleCategoryEvent);
    return () => {
      window.removeEventListener('select-product-category', handleCategoryEvent);
    };
  }, [onCategoryChange]);

  useBodyScrollLock(isRangeModalOpen);
  useDialogFocus(rangeDialogRef, isRangeModalOpen, handleCloseRangeModal);

  // Keyboard navigation: Escape key closes the range modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isDetailModalOpen) {
          setIsDetailModalOpen(false);
        } else if (isRangeModalOpen) {
          handleCloseRangeModal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRangeModalOpen, isDetailModalOpen, handleCloseRangeModal]);

  // Define 4 Category Showcases
  const categoryShowcases = useMemo(() => {
    return [
      {
        id: 'packets',
        title: language === 'en' ? 'Coconut Oil Pouches' : 'தேங்காய் எண்ணெய் பவுச்கள்',
        categoryTag: language === 'en' ? 'Pouch Packs' : 'பவுச் பேக்குகள்',
        badge: language === 'en' ? '5 Sizes • 5 ml to 1 Litre' : '5 அளவுகள் • 5 மிலி முதல் 1 லிட்டர்',
        countBadge: language === 'en' ? '5 Sizes' : '5 அளவுகள்',
        subtitle:
          catalogue.categories?.packets?.subtitle ||
          (language === 'en'
            ? 'Flexible multi-layer barrier pouches designed for culinary freshness, convenient storage, and easy bottle refills.'
            : 'சமையலறை புத்துணர்ச்சி, எளிதான சேமிப்பு மற்றும் பாட்டில் ரீஃபில் பயன்பாட்டிற்கு ஏற்ற பல அடுக்கு பவுச் பேக்குகள்.'),
        background: CATEGORY_BACKGROUNDS.packets,
        representativeId: REPRESENTATIVE_PRODUCT_IDS.packets,
        ctaText: language === 'en' ? 'Explore 5 Sizes' : '5 அளவுகளைக் காண்க'
      },
      {
        id: 'bottles',
        title: language === 'en' ? 'Coconut Oil Bottles' : 'தேங்காய் எண்ணெய் பாட்டில்கள்',
        categoryTag: language === 'en' ? 'PET Bottles' : 'PET பாட்டில்கள்',
        badge: language === 'en' ? '5 Sizes • 50 ml to 1 Litre' : '5 அளவுகள் • 50 மிலி முதல் 1 லிட்டர்',
        countBadge: language === 'en' ? '5 Sizes' : '5 அளவுகள்',
        subtitle:
          catalogue.categories?.bottles?.subtitle ||
          (language === 'en'
            ? 'Ergonomic, shatter-resistant flip-top and fluted bottles crafted for everyday hair care, skincare, and kitchen use.'
            : 'அன்றாட தலைமுடி பராமரிப்பு, சரும பாதுகாப்பு மற்றும் சமையலறைக்கு ஏற்ற உறுதியான ஃப்ளிப்-டாப் பாட்டில்கள்.'),
        background: CATEGORY_BACKGROUNDS.bottles,
        representativeId: REPRESENTATIVE_PRODUCT_IDS.bottles,
        ctaText: language === 'en' ? 'Explore 5 Sizes' : '5 அளவுகளைக் காண்க'
      },
      {
        id: 'dheepennai',
        title: language === 'en' ? 'Pooja Deepam Oil' : 'பாரம்பரிய தீப எண்ணெய்',
        categoryTag: language === 'en' ? 'Pooja Blend' : 'புனித தீப எண்ணெய்',
        badge: language === 'en' ? '3 Sacred Sizes • 200 ml to 1 Litre' : '3 புனித அளவுகள் • 200 மிலி முதல் 1 லிட்டர்',
        countBadge: language === 'en' ? '3 Sizes' : '3 அளவுகள்',
        subtitle:
          catalogue.categories?.dheepennai?.subtitle ||
          (language === 'en'
            ? 'Traditional 5-oil blend formulated specifically for auspicious temple rituals, brass Kuthu Vilakku, and home prayer lamps.'
            : 'திருக்கோவில் வழிபாடுகள், பித்தளை குத்துவிளக்குகள் மற்றும் இல்லத்து பூஜை அறைகளுக்கான 5 எண்ணெய்களின் புனித கலவை.'),
        background: CATEGORY_BACKGROUNDS.dheepennai,
        representativeId: REPRESENTATIVE_PRODUCT_IDS.dheepennai,
        ctaText: language === 'en' ? 'Explore 3 Sizes' : '3 அளவுகளைக் காண்க'
      },
      {
        id: 'tins',
        title: language === 'en' ? 'Bulk Tin Cans' : 'வணிக மொத்த டின்கள்',
        categoryTag: language === 'en' ? '15 kg Metal Tins' : '15 கிலோ மெட்டல் டின்கள்',
        badge: language === 'en' ? '2 Commercial Grades • 15 kg' : '2 வணிக வகைகள் • 15 கிலோ',
        countBadge: language === 'en' ? '2 Variants' : '2 வகைகள்',
        subtitle:
          catalogue.categories?.tins?.subtitle ||
          (language === 'en'
            ? 'Heavy-duty 15 kg rectangular metal tins of pure SATYA DELUX coconut oil designed for commercial kitchens, catering, wholesale retail, and bulk storage.'
            : 'உணவகங்கள், கேட்டரிங், மொத்த விற்பனை மற்றும் பெரிய குடும்பங்களின் சமையல் தேவைக்கான 15 கிலோ சத்யா டீலக்ஸ் தூய தேங்காய் எண்ணெய் உலோக டின்கள்.'),
        background: CATEGORY_BACKGROUNDS.tins,
        representativeId: REPRESENTATIVE_PRODUCT_IDS.tins,
        ctaText: language === 'en' ? 'Explore 2 Variants' : '2 வகைகளைக் காண்க'
      }
    ];
  }, [language, catalogue.categories]);

  // Helper to get representative product for a showcase card
  const getRepresentativeProduct = (showcase) => {
    return (
      products.find((p) => p.id === showcase.representativeId) ||
      products.find((p) => p.category === showcase.id) ||
      products[0]
    );
  };

  // Products filtered for range modal
  const rangeProducts =
    !activeRangeCategory || activeRangeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeRangeCategory);

  const activeCategoryMeta = useMemo(() => {
    return categoryShowcases.find((c) => c.id === activeRangeCategory) || null;
  }, [categoryShowcases, activeRangeCategory]);

  return (
    <section
      id="products"
      className="stage2-section-space bg-white border-b border-[#D6E6F5] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F2B632]">
            {language === 'en' ? 'Pure Grade Product Offerings' : 'உயர்தர தயாரிப்பு வரிசை'}
          </span>
          <h2 className="stage2-section-title type-section-heading text-[#2B6CB0] mt-2">
            {language === 'en'
              ? 'Our Four Product Categories'
              : 'எங்கள் நான்கு தயாரிப்பு வரிசைகள்'}
          </h2>
          <p className="stage2-intro-copy text-[#516070] mt-3 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Milled from sun-dried Thoothukudi copra with zero chemical additives. Select any category to explore all certified sizes and packaging specifications.'
              : 'ரசாயன கலப்பற்ற சூரிய ஒளியில் உலர்ந்த தூத்துக்குடி கொப்பரையிலிருந்து நேரடியாக தயாரிக்கப்படுகிறது. அனைத்து அளவுகளையும் விவரங்களையும் காண ஒரு வகையைத் தேர்ந்தெடுக்கவும்.'}
          </p>
        </div>

        {/* 4 Category Showcase Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {categoryShowcases.map((cat) => {
            const representativeProduct = getRepresentativeProduct(cat);
            const imageSrc = representativeProduct?.image || '';

            return (
              <div
                key={cat.id}
                role="button"
                tabIndex={0}
                aria-label={`${cat.title} - ${cat.badge}. ${cat.ctaText}`}
                onClick={() => handleOpenRange(cat.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenRange(cat.id);
                  }
                }}
                className="category-showcase-card group p-5 sm:p-6 flex flex-col justify-between cursor-pointer focus:outline-none"
              >
                <div>
                  {/* Category Image Stage with Prepared Authentic Background */}
                  <div className="cat-stage relative h-64 sm:h-72 w-full rounded-xl overflow-hidden flex items-center justify-center p-4 mb-5 border border-[#D6E6F5] bg-[#EAF3FB] shadow-inner">
                    {/* Background Backdrop Layer */}
                    <div
                      className="cat-bg-layer absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${cat.background})` }}
                      aria-hidden="true"
                    />
                    {/* Atmospheric wash overlay: softens bottom edge into card surface without bleaching background */}
                    <div className="cat-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

                    {/* Prominent Count Pill Badge at Top-Right */}
                    <div className="absolute top-3.5 right-3.5 z-20">
                      <span className="cat-badge cat-transition inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white text-[#2B6CB0] border border-[#D6E6F5] shadow-xs">
                        {cat.countBadge}
                      </span>
                    </div>

                    {/* Representative Product Cutout (No color inversion filters!) */}
                    <img
                      src={imageSrc}
                      alt={cat.title}
                      className="cat-img relative z-10 h-full w-auto max-h-[88%] object-contain product-shadow"
                      loading="lazy"
                    />
                  </div>

                  {/* Range Meta Eyebrow */}
                  <span className="cat-range-meta cat-transition block text-[11px] font-bold uppercase tracking-wider text-[#2B6CB0] mb-1 font-sans">
                    {cat.badge}
                  </span>

                  {/* Category Title */}
                  <h3
                    className={`cat-title cat-transition text-xl sm:text-2xl font-normal text-[#1B2A3A] leading-snug line-clamp-1 ${
                      language === 'en' ? 'font-editorial' : 'font-sans font-bold'
                    }`}
                  >
                    {cat.title}
                  </h3>

                  {/* Category Description */}
                  <p className="cat-desc cat-transition text-xs text-[#516070] mt-2 line-clamp-3 leading-relaxed font-sans min-h-[50px]">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Card Action Affordance */}
                <div className="mt-6 pt-4 border-t border-[#D6E6F5]">
                  <div className="cat-btn cat-transition w-full py-2.5 px-4 rounded-lg bg-white border border-[#D6E6F5] text-[#2B6CB0] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 font-sans shadow-xs">
                    <span>{cat.ctaText}</span>
                    <ArrowRight className="cat-btn-arrow cat-transition w-4 h-4 shrink-0" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Catalog Access Banner */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => handleOpenRange('all')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EAF3FB] hover:bg-[#D6E6F5] border border-[#D6E6F5] text-[#2B6CB0] text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
          >
            <Layers className="w-4 h-4 text-[#F2B632]" />
            <span>
              {language === 'en'
                ? `View Complete Range (${products.length} Products)`
                : `முழுமையான தயாரிப்பு பட்டியல் (${products.length} தயாரிப்புகள்)`}
            </span>
          </button>
        </div>
      </div>

      {/* ====================================================================
          Category Full Range Modal Dialog
          Preserves all 15 product records, including both 15kg tins
         ==================================================================== */}
      {isRangeModalOpen && (
        <div
          ref={rangeDialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="range-modal-heading"
          className="fixed inset-0 z-50 overflow-hidden bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 lg:p-6 animate-fadeIn overscroll-contain range-modal-backdrop"
          data-lenis-prevent
          onClick={handleCloseRangeModal}
        >
          <div
            className="relative bg-[#FFFFFF] border border-[#D6E6F5] rounded-2xl max-w-4xl w-full max-h-[85dvh] flex flex-col shadow-2xl overflow-hidden transition-all animate-modal-pop overscroll-contain range-modal-dialog"
            style={{ maxHeight: '85dvh' }}
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="shrink-0 relative bg-gradient-to-r from-[#1F4F85] via-[#2B6CB0] to-[#1F4F85] text-white px-4 py-4 sm:px-6 sm:py-5 lg:px-7 lg:py-5">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                aria-label={t.catalogue?.closeModal || 'Close dialog'}
                onClick={handleCloseRangeModal}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 min-h-11 min-w-11 flex items-center justify-center text-white/80 hover:text-white p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-30"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-w-3xl pr-10">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F2B632]">
                  {language === 'en' ? 'Product Variant Range' : 'தயாரிப்பு வரிசை விவரம்'}
                </span>
                <h3
                  id="range-modal-heading"
                  className={`text-xl sm:text-2xl lg:text-3xl font-normal text-white mt-0.5 sm:mt-1 ${
                    language === 'en' ? 'font-editorial' : 'font-sans font-bold'
                  }`}
                >
                  {activeCategoryMeta
                    ? activeCategoryMeta.title
                    : language === 'en'
                    ? 'All SATYA D’LITE Products'
                    : 'அனைத்து சத்யா டிலைட் தயாரிப்புகள்'}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#D6E6F5] mt-1 sm:mt-1.5 leading-snug sm:leading-relaxed font-sans max-w-2xl">
                  {activeCategoryMeta
                    ? activeCategoryMeta.subtitle
                    : language === 'en'
                    ? 'Explore all 15 pure copra oil packages, deepam blends, and bulk commercial tins produced by Dayan Enterprises & Co.'
                    : 'தயான் என்டர்பிரைசஸ் & கோ தயாரிக்கும் அனைத்து 15 தேங்காய் எண்ணெய், தீப எண்ணெய் மற்றும் 15 கிலோ வணிக டின்கள்.'}
                </p>
              </div>

              {/* In-Modal Category Switcher Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-white/15">
                <button
                  type="button"
                  onClick={() => handleSwitchCategory('all')}
                  className={`min-h-11 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    !activeRangeCategory || activeRangeCategory === 'all'
                      ? 'bg-[#F2B632] text-[#1F4F85] border-[#F2B632] shadow-sm'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  {language === 'en' ? `All (${products.length})` : `அனைத்தும் (${products.length})`}
                </button>
                {categoryShowcases.map((cat) => {
                  const isActive = activeRangeCategory === cat.id;
                  const catCount = products.filter((p) => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSwitchCategory(cat.id)}
                      className={`min-h-11 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#F2B632] text-[#1F4F85] border-[#F2B632] shadow-sm'
                          : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {cat.title} ({catCount})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Body: Single-column List of Horizontal Variant Cards */}
            <div
              className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-3.5 sm:p-5 lg:p-6 overscroll-contain range-modal-scroll-body"
              style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
              data-lenis-prevent
            >
              <div className="flex flex-col gap-3 sm:gap-3.5 w-full">
                {rangeProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl border border-[#D6E6F5] p-2.5 sm:p-3.5 flex flex-row items-center gap-3 sm:gap-4 md:gap-5 hover:border-[#2B6CB0] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group relative"
                  >
                    {/* Left: Product Image Stage (approx 30–35% on desktop, dedicated softly tinted container) */}
                    <div className="w-[30%] sm:w-[32%] md:w-[32%] lg:w-[33%] max-w-[120px] sm:max-w-[230px] md:max-w-[265px] shrink-0 h-28 sm:h-32 md:h-36 flex items-center justify-center p-2 sm:p-3 bg-[#FFFFFF] border border-[#D6E6F5] rounded-lg overflow-hidden group-hover:bg-[#EAF3FB] transition-colors relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-auto max-h-full max-w-full object-contain product-shadow relative z-10 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Right: Variant Details & Actions (remaining 65–70%) */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5 sm:py-1">
                      <div>
                        {/* Size & Category Badge Row */}
                        <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px] font-sans">
                          <div className="flex items-center gap-2">
                            <span className="inline-block bg-[#EAF3FB] text-[#2B6CB0] text-[10.5px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded border border-[#D6E6F5]">
                              {product.size}
                            </span>
                            <span className="text-[#516070] font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider">
                              {product.categoryLabel || product.category}
                            </span>
                          </div>
                        </div>

                        {/* Product Name */}
                        <h4
                          className={`text-sm sm:text-base md:text-lg text-[#2B6CB0] group-hover:text-[#4A8AD0] transition-colors leading-snug line-clamp-1 mt-1 sm:mt-1.5 ${
                            language === 'en' ? 'font-editorial font-bold sm:font-normal' : 'font-sans font-bold text-sm sm:text-base'
                          }`}
                        >
                          {product.name}
                        </h4>

                        {/* Short Description */}
                        <p className="text-[11px] sm:text-xs text-[#516070] mt-0.5 sm:mt-1 line-clamp-2 leading-tight sm:leading-relaxed font-sans">
                          {product.shortDesc}
                        </p>
                      </div>

                      {/* Action Buttons Row */}
                      <div className="mt-2 sm:mt-2.5 pt-2 border-t border-[#D6E6F5] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenDetails(product)}
                            className="min-h-11 px-3 py-2 sm:px-4 sm:py-1.5 text-center text-[10.5px] sm:text-xs font-bold uppercase tracking-wider rounded bg-white hover:bg-[#EAF3FB] border border-[#D6E6F5] text-[#1B2A3A] transition-colors cursor-pointer font-sans"
                          >
                            {language === 'en' ? 'Details' : 'விவரங்கள்'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleInquire(product.name)}
                            className="min-h-11 px-3.5 py-2 sm:px-4 sm:py-1.5 text-center text-[10.5px] sm:text-xs font-bold uppercase tracking-wider rounded bg-[#2B6CB0] hover:bg-[#4A8AD0] text-white transition-colors cursor-pointer shadow-xs font-sans"
                          >
                            {language === 'en' ? 'Enquire' : 'விசாரிக்க'}
                          </button>
                        </div>

                        <span className="hidden sm:inline-block text-[11px] text-[#516070] font-sans font-medium">
                          {language === 'en' ? 'FSSAI Certified' : 'FSSAI சான்றளிக்கப்பட்டது'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="shrink-0 px-4 py-2.5 sm:px-6 sm:py-3 bg-[#EAF3FB] border-t border-[#D6E6F5] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-[#516070] font-sans">
              <div>
                <strong className="text-[#2B6CB0] font-semibold">
                  {language === 'en' ? 'Authentic Quality:' : 'உயர்தர உத்தரவாதம்:'}
                </strong>{' '}
                {language === 'en'
                  ? 'All products bottled and packed under FSSAI Lic. 12418029000667.'
                  : 'அனைத்து தயாரிப்புகளும் FSSAI உரிமம் 12418029000667 கீழ் தயாரிக்கப்படுகிறது.'}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCloseRangeModal}
                  className="min-h-11 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white hover:bg-slate-50 border border-[#D6E6F5] text-[#1B2A3A] font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Back to Overview' : 'திரும்பிச் செல்க'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Individual Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        onInquire={handleInquire}
      />
    </section>
  );
};
