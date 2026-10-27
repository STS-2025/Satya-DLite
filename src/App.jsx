import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutBrand } from './components/AboutBrand';
import { CinematicStory } from './components/CinematicStory';
import { ProductsSection } from './components/ProductsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { TraditionStory } from './components/TraditionStory';
import { CommercialBulk } from './components/CommercialBulk';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { MobileBottomBar } from './components/MobileBottomBar';
import { MotionLayer } from './components/MotionLayer';

const LandingPageContent = () => {
  const { language } = useLanguage();
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSelectProductForInquiry = (productName) => {
    setSelectedProductForInquiry(productName);
    window.dispatchEvent(new CustomEvent('select-product-for-inquiry', { detail: productName }));
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearProductInterest = () => setSelectedProductForInquiry('');

  return (
    <div
      className={`min-h-screen flex flex-col bg-white text-[#1B2A3A] selection:bg-[#2B6CB0] selection:text-white ${
        language === 'ta' ? 'lang-ta' : 'lang-en'
      }`}
    >
      <MotionLayer />
      <a className="skip-to-content" href="#main-content">
        {language === 'en' ? 'Skip to content' : 'உள்ளடக்கத்திற்குச் செல்லவும்'}
      </a>
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Flow */}
      <main id="main-content" tabIndex={-1} className="flex-1 pb-20 md:pb-0">
        <Hero />
        <CinematicStory />
        <AboutBrand />
        <ProductsSection
          onSelectProductForInquiry={handleSelectProductForInquiry}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <BenefitsSection />
        <TraditionStory />
        <CommercialBulk onSelectProductForInquiry={handleSelectProductForInquiry} />
        <ContactSection
          selectedProductInterest={selectedProductForInquiry}
          onClearSelectedProductInterest={handleClearProductInterest}
        />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={setSelectedCategory} />

      {/* Floating Utilities */}
      <ScrollToTop />
      <MobileBottomBar selectedProductInterest={selectedProductForInquiry} />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <LandingPageContent />
    </LanguageProvider>
  );
}

export default App;
