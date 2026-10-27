import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

const inquiryMessage = (interest, language) => interest
  ? language === 'en'
    ? `I would like to inquire about ${interest}. Please share details.`
    : `${interest} பற்றிய விவரங்களை அறிய விரும்புகிறேன்.`
  : '';

export const ContactSection = ({ selectedProductInterest, onClearSelectedProductInterest }) => {
  const { language, t } = useLanguage();
  const contact = t.contact || {};
  const formText = contact.form || {};

  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    email: '',
    productInterest: selectedProductInterest || 'General Brand Inquiry',
    message: inquiryMessage(selectedProductInterest, language)
  });

  const [pendingInterest, setPendingInterest] = useState('');
  const [prefillDismissed, setPrefillDismissed] = useState(false);
  const editedRef = useRef(false);

  useEffect(() => {
    const handleProductSelection = (event) => {
      const interest = event.detail;
      setPrefillDismissed(false);
      if (editedRef.current) {
        setPendingInterest(interest);
        return;
      }
      setPendingInterest('');
      setFormData((prev) => ({ ...prev, productInterest: interest, message: inquiryMessage(interest, language) }));
    };
    const handleLanguageChange = () => {
      if (!selectedProductInterest || editedRef.current) return;
      setFormData((prev) => ({
        ...prev,
        productInterest: selectedProductInterest,
        message: inquiryMessage(selectedProductInterest, language)
      }));
    };
    window.addEventListener('select-product-for-inquiry', handleProductSelection);
    window.addEventListener('site-language-change', handleLanguageChange);
    return () => {
      window.removeEventListener('select-product-for-inquiry', handleProductSelection);
      window.removeEventListener('site-language-change', handleLanguageChange);
    };
  }, [language, selectedProductInterest]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submissionLockRef = useRef(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    editedRef.current = true;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'productInterest' && value !== selectedProductInterest) {
      setPendingInterest('');
      onClearSelectedProductInterest?.();
    }
  };

  const applyPendingInterest = () => {
    if (!pendingInterest) return;
    setFormData((prev) => ({ ...prev, productInterest: pendingInterest, message: inquiryMessage(pendingInterest, language) }));
    setPendingInterest('');
  };

  const clearPrefill = () => {
    setPrefillDismissed(true);
    if (!editedRef.current) setFormData((prev) => ({ ...prev, productInterest: 'General Brand Inquiry', message: '' }));
    onClearSelectedProductInterest?.();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submissionLockRef.current) return;
    submissionLockRef.current = true;
    setIsSubmitting(true);

    setTimeout(() => {
      submissionLockRef.current = false;
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const handleReset = () => {
    editedRef.current = false;
    setPendingInterest('');
    setFormData({
      name: '',
      contactInfo: '',
      email: '',
      productInterest: formText.productOptions?.[0] || 'General Brand Inquiry',
      message: ''
    });
    setIsSubmitted(false);
  };

  const whatsappMessage = encodeURIComponent(
    language === 'en'
      ? `Hello Dayan Enterprises, my name is ${formData.name || 'Customer'}. I would like to inquire about ${formData.productInterest || 'SATYA D\'LITE coconut oil products'}.`
      : `வணக்கம் தயான் என்டர்பிரைசஸ், எனது பெயர் ${formData.name || 'வாடிக்கையாளர்'}. ${formData.productInterest || 'சத்யா டிலைட் தயாரிப்புகள்'} பற்றிய விவரங்களை அறிய விரும்புகிறேன்.`
  );

  return (
    <section
      id="contact"
      className="stage2-section-space scroll-mt-16 sm:scroll-mt-20 bg-[#EAF3FB] border-b border-[#D6E6F5] overflow-hidden relative"
    >
      {/* Subtle Ambient Decorative Glow */}
      <div
        className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(242,182,50,0.08)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-[92vw] sm:w-[92vw] lg:w-[93vw] xl:w-[94vw] max-w-[1440px] mx-auto relative z-10 px-2 sm:px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span
            className={`type-eyebrow text-[#F2B632] font-bold tracking-widest uppercase block mb-1.5 sm:mb-2 text-[11px] sm:text-xs ${
              language === 'ta' ? 'font-tamil' : 'font-sans'
            }`}
          >
            {contact.eyebrow || (language === 'en' ? 'Direct Channel Desk' : 'நேரடித் தொடர்பு மையம்')}
          </span>
          <h2
            className={`stage2-section-title ${language === 'ta' ? '' : 'type-section-heading'} text-[#2B6CB0] ${
              language === 'ta' ? 'font-tamil font-bold' : 'font-editorial font-normal'
            }`}
          >
            {contact.heading || (language === 'en' ? 'Contact Us' : 'தொடர்பு கொள்ள')}
          </h2>
          <p
            className={`stage2-intro-copy text-[#516070] mt-2 sm:mt-2.5 max-w-xl mx-auto ${
              language === 'ta' ? 'font-tamil' : 'font-sans'
            }`}
          >
            {contact.subheading ||
              (language === 'en'
                ? 'Have questions about our products, dealership inquiries, or bulk orders? Reach out to our team in Thoothukudi.'
                : 'எங்கள் தயாரிப்புகள் அல்லது டீலர்ஷிப் விசாரணைகளுக்கு தூத்துக்குடி அலுவலகத்தை தொடர்பு கொள்ளவும்.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
          {/* Left Column (5 cols): Verified Direct Office Contacts Card */}
          <div className="lg:col-span-5">
            <div
              tabIndex={0}
              role="region"
              aria-label={language === 'en' ? 'Direct Office Contacts' : 'நேரடி அலுவலகத் தொடர்பு'}
              className="contact-info-card p-6 sm:p-7 lg:p-8 cursor-default select-none overflow-hidden"
            >
              {/* Antique-Gold Top Accent Edge */}
              <div className="contact-transition contact-card-accent-bar absolute top-0 inset-x-0 h-[3px] pointer-events-none" />

              {/* Card Heading */}
              <div className="mb-6">
                <span
                  className={`contact-transition contact-card-eyebrow text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest block mb-1 ${
                    language === 'ta' ? 'font-tamil' : 'font-sans'
                  }`}
                >
                  {language === 'en' ? 'Headquarters & Factory' : 'தலைமையகம் & ஆலை'}
                </span>
                <h3
                  className={`contact-transition contact-card-title text-xl sm:text-2xl font-bold leading-snug ${
                    language === 'ta' ? 'font-tamil' : 'font-editorial'
                  }`}
                >
                  {language === 'en' ? 'Direct Office Contacts' : 'நேரடி அலுவலகத் தொடர்பு'}
                </h3>
              </div>

              {/* Contact Groups with Restrained Dividers */}
              <div className="space-y-4 sm:space-y-5">
                {/* Mill Office & Landline */}
                <div className="flex items-start gap-3.5">
                  <div className="contact-transition contact-icon-box w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Phone size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`contact-transition contact-row-label text-[11px] font-bold uppercase tracking-wider ${
                        language === 'ta' ? 'font-tamil' : 'font-sans'
                      }`}
                    >
                      {contact.phoneLabel || (language === 'en' ? 'Mill Office & Landline' : 'நிலையான தொலைபேசி')}
                    </p>
                    <a
                      href="tel:04612346947"
                      className="contact-transition contact-row-value text-sm sm:text-[15px] font-bold hover:underline mt-0.5 inline-block"
                    >
                      (0461) 2346947
                    </a>
                    <p
                      className={`contact-transition contact-row-subtext text-xs mt-0.5 ${
                        language === 'ta' ? 'font-tamil' : 'font-sans'
                      }`}
                    >
                      {contact.hoursText || (language === 'en' ? 'Mon–Sat, 9:00 AM – 7:00 PM IST' : 'திங்கள் – சனி: காலை 9:00 – இரவு 7:00')}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="contact-transition contact-card-divider border-t" />

                {/* Mobile & WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="contact-transition contact-icon-box w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <WhatsAppIcon size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`contact-transition contact-row-label text-[11px] font-bold uppercase tracking-wider ${
                        language === 'ta' ? 'font-tamil' : 'font-sans'
                      }`}
                    >
                      {contact.cellLabel || (language === 'en' ? 'Mobile & WhatsApp' : 'கைபேசி / வாட்ஸ்அப்')}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
                      <a
                        href="tel:+919442206797"
                        className="contact-transition contact-row-value text-sm sm:text-[15px] font-bold hover:underline"
                      >
                        +91 94422 06797
                      </a>
                      <span className="contact-transition contact-row-subtext text-xs">/</span>
                      <a
                        href="tel:+919443145630"
                        className="contact-transition contact-row-value text-sm sm:text-[15px] font-bold hover:underline"
                      >
                        +91 94431 45630
                      </a>
                    </div>
                    <p
                      className={`contact-transition contact-row-subtext text-xs mt-0.5 ${
                        language === 'ta' ? 'font-tamil' : 'font-sans'
                      }`}
                    >
                      {language === 'en'
                        ? 'Direct Commercial & Wholesale Support'
                        : 'வணிக மற்றும் மொத்த விற்பனை ஆதரவு'}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="contact-transition contact-card-divider border-t" />

                {/* Email Address */}
                <div className="flex items-start gap-3.5">
                  <div className="contact-transition contact-icon-box w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Mail size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`contact-transition contact-row-label text-[11px] font-bold uppercase tracking-wider ${
                        language === 'ta' ? 'font-tamil' : 'font-sans'
                      }`}
                    >
                      {contact.emailLabel || (language === 'en' ? 'Email Address' : 'மின்னஞ்சல் முகவரி')}
                    </p>
                    <a
                      href="mailto:dayanenterprises2000@gmail.com"
                      className="contact-transition contact-row-value text-sm sm:text-[15px] font-bold hover:underline mt-0.5 inline-block"
                    >
                      {contact.emailText || 'dayanenterprises2000@gmail.com'}
                    </a>
                  </div>
                </div>

                {/* Divider */}
                <div className="contact-transition contact-card-divider border-t" />

                {/* Manufacturing Works & Address */}
                <div className="flex items-start gap-3.5">
                  <div className="contact-transition contact-icon-box w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`contact-transition contact-row-label text-[11px] font-bold uppercase tracking-wider ${
                        language === 'ta' ? 'font-tamil' : 'font-sans'
                      }`}
                    >
                      {contact.addressLabel || (language === 'en' ? 'Manufacturing Works' : 'ஆலை மற்றும் அலுவலக முகவரி')}
                    </p>
                    <p
                      className={`contact-transition contact-row-value text-xs sm:text-sm font-medium leading-relaxed mt-1 ${
                        language === 'ta' ? 'font-tamil' : 'font-sans'
                      }`}
                    >
                      <strong className="block text-sm sm:text-[15px] font-bold mb-0.5">Dayan Enterprises &amp; Co.</strong>
                      4/95, Ettayapuram Road, West Thoothukudi,
                      <br />
                      Tamil Nadu, India — 628 002
                    </p>
                    <div className="mt-2.5">
                      <span className="contact-transition contact-fssai-badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-semibold">
                        <span>FSSAI Lic. No.</span>
                        <span className="font-mono font-bold">12418029000667</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Commercial & Retail Enquiry Form Card */}
          <div className="lg:col-span-7">
            <div className="contact-form-card p-6 sm:p-8 lg:p-9 overflow-hidden">
              {/* Antique-Gold Top Accent Edge */}
              <div className="contact-card-accent-bar absolute top-0 inset-x-0 h-[3px] pointer-events-none" />

              <h3
                className={`text-xl sm:text-2xl text-[#2B6CB0] leading-snug ${
                  language === 'ta' ? 'font-tamil font-bold' : 'font-editorial font-normal'
                }`}
              >
                {formText.title || (language === 'en' ? 'Send Us an Inquiry' : 'செய்தி அனுப்புங்கள்')}
              </h3>
              <p
                className={`text-xs sm:text-[13px] text-[#516070] mt-1 mb-6 leading-relaxed ${
                  language === 'ta' ? 'font-tamil' : 'font-sans'
                }`}
              >
                {formText.subtitle ||
                  (language === 'en'
                    ? 'Fill out the form below and our team will get back to you promptly.'
                    : 'கீழே உள்ள படிவத்தை பூர்த்தி செய்யுங்கள். எங்கள் குழுவினர் விரைவில் உங்களைத் தொடர்பு கொள்வார்கள்.')}
              </p>

              {isSubmitted ? (
                <div role="status" aria-live="polite" className="p-8 rounded-2xl bg-[#EAF3FB] border border-[#D6E6F5] text-[#1B2A3A] text-center flex flex-col items-center gap-3 animate-fade-in shadow-xs">
                  <div className="w-14 h-14 rounded-full bg-[#2B6CB0]/10 text-[#2B6CB0] border border-[#2B6CB0]/20 flex items-center justify-center">
                    <CheckCircle2 size={30} />
                  </div>
                  <h4
                    className={`text-lg font-bold text-[#2B6CB0] ${
                      language === 'ta' ? 'font-tamil' : 'font-editorial'
                    }`}
                  >
                    {formText.successTitle ||
                      (language === 'en' ? 'Inquiry Received Successfully' : 'செய்தி பெறப்பட்டது')}
                  </h4>
                  <p
                    className={`text-xs sm:text-sm text-[#516070] max-w-md leading-relaxed ${
                      language === 'ta' ? 'font-tamil' : 'font-sans'
                    }`}
                  >
                    {formText.successMessage ||
                      (language === 'en'
                        ? "Thank you for contacting SATYA D'LITE. A representative from Dayan Enterprises & Co will contact you shortly."
                        : 'SATYA D\'LITE-ஐ தொடர்பு கொண்டதற்கு நன்றி. தயான் என்டர்பிரைசஸ் பிரதிநிதி விரைவில் உங்களைத் தொடர்புகொள்வார்.')}
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="contact-submit-btn mt-3 min-h-11 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    {formText.sendAnother || (language === 'en' ? 'Send Another Inquiry' : 'மற்றொரு செய்தியை அனுப்புக')}
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {selectedProductInterest && !prefillDismissed && formData.productInterest === selectedProductInterest && (
                    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#D6E6F5] bg-[#EAF3FB] px-3 py-2 text-sm" aria-live="polite">
                      <span className="text-[#1B2A3A]">
                        {language === 'en' ? 'Enquiring about:' : 'விசாரிக்கும் தயாரிப்பு:'} <strong className="text-[#2B6CB0]">{selectedProductInterest}</strong>
                      </span>
                      <button type="button" onClick={clearPrefill} className="min-h-11 rounded-md px-3 text-[#2B6CB0] underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0]">
                        {language === 'en' ? 'Remove' : 'நீக்கு'}
                      </button>
                    </div>
                  )}
                  {pendingInterest && (
                    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#D6E6F5] bg-[#EAF3FB] px-3 py-2 text-sm" aria-live="polite">
                      <span>{language === 'en' ? 'A new product is selected. Your entered message is unchanged.' : 'புதிய தயாரிப்பு தேர்ந்தெடுக்கப்பட்டது. நீங்கள் உள்ளிட்ட செய்தி மாற்றப்படவில்லை.'}</span>
                      <button type="button" onClick={applyPendingInterest} className="min-h-11 rounded-md bg-[#2B6CB0] hover:bg-[#4A8AD0] px-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B632]">
                        {language === 'en' ? 'Use new selection' : 'புதிய தேர்வைப் பயன்படுத்து'}
                      </button>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-xs font-bold uppercase tracking-wider text-[#1B2A3A] mb-1.5 ${
                          language === 'ta' ? 'font-tamil' : 'font-sans'
                        }`}
                        htmlFor="user-name"
                      >
                        {formText.nameLabel || (language === 'en' ? 'Your Full Name' : 'உங்கள் முழு பெயர்')}{' '}
                        <span className="text-[#F2B632] font-bold">*</span>
                      </label>
                      <input
                        className="contact-form-input min-h-11 w-full text-sm rounded-xl px-3.5 py-2.5"
                        id="user-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        placeholder={formText.namePlaceholder || (language === 'en' ? 'Enter your full name' : 'முழு பெயரை உள்ளிடவும்')}
                        required
                        aria-required="true"
                        type="text"
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-xs font-bold uppercase tracking-wider text-[#1B2A3A] mb-1.5 ${
                          language === 'ta' ? 'font-tamil' : 'font-sans'
                        }`}
                        htmlFor="user-phone"
                      >
                        {formText.contactLabel || (language === 'en' ? 'Phone Number or Email' : 'தொலைபேசி எண் அல்லது மின்னஞ்சல்')}{' '}
                        <span className="text-[#F2B632] font-bold">*</span>
                      </label>
                      <input
                        className="contact-form-input min-h-11 w-full text-sm rounded-xl px-3.5 py-2.5"
                        id="user-phone"
                        name="contactInfo"
                        value={formData.contactInfo}
                        onChange={handleChange}
                        autoComplete="on"
                        placeholder={formText.contactPlaceholder || (language === 'en' ? 'e.g. +91 94422 06797' : 'எ.கா. +91 94422 06797')}
                        required
                        aria-required="true"
                        type="text"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-xs font-bold uppercase tracking-wider text-[#1B2A3A] mb-1.5 ${
                        language === 'ta' ? 'font-tamil' : 'font-sans'
                      }`}
                      htmlFor="user-email"
                    >
                      {language === 'en' ? 'Email Address (Optional)' : 'மின்னஞ்சல் முகவரி (விரும்பினால்)'}
                    </label>
                    <input
                      className="contact-form-input min-h-11 w-full text-sm rounded-xl px-3.5 py-2.5"
                      id="user-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      placeholder="name@business.com"
                      type="email"
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-xs font-bold uppercase tracking-wider text-[#1B2A3A] mb-1.5 ${
                        language === 'ta' ? 'font-tamil' : 'font-sans'
                      }`}
                      htmlFor="productInterest"
                    >
                      {formText.productInterestLabel || (language === 'en' ? 'Product Category of Interest' : 'விருப்பமான தயாரிப்பு வகை')}
                    </label>
                    <select
                      className="contact-form-input min-h-11 w-full text-sm rounded-xl px-3.5 py-2.5 cursor-pointer"
                      id="productInterest"
                      name="productInterest"
                      value={formData.productInterest}
                      onChange={handleChange}
                    >
                      {formData.productInterest &&
                        !(formText.productOptions || []).includes(formData.productInterest) && (
                          <option value={formData.productInterest}>
                            {formData.productInterest}
                          </option>
                        )}
                      {(formText.productOptions || [
                        'General Brand Inquiry',
                        'Packets (5ml, 50ml, 100ml, 500ml, 1000ml)',
                        'Bottles (50ml, 100ml, 200ml, 500ml, 1000ml)',
                        'Deepam Oil (200ml, 500ml, 1 Litre)',
                        '15kg Commercial Bulk Tins',
                        'Wholesale Dealership / Stockist'
                      ]).map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-xs font-bold uppercase tracking-wider text-[#1B2A3A] mb-1.5 ${
                        language === 'ta' ? 'font-tamil' : 'font-sans'
                      }`}
                      htmlFor="user-message"
                    >
                      {formText.messageLabel || (language === 'en' ? 'Order Volume / Location Notes' : 'ஆர்டர் அளவு / ஊர் விவரம்')}{' '}
                      <span className="text-[#F2B632] font-bold">*</span>
                    </label>
                    <textarea
                      className="contact-form-input w-full text-sm rounded-xl px-3.5 py-2.5 resize-y min-h-[90px]"
                      id="user-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={
                        formText.messagePlaceholder ||
                        (language === 'en'
                          ? 'Specify desired quantity (cases, tins, pouches), city/district, or distribution region...'
                          : 'உங்கள் கேள்விகள் அல்லது மொத்த விற்பனை தேவைகளை எழுதவும்...')
                      }
                      rows={3}
                      required
                      aria-required="true"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      className="contact-submit-btn flex-1 py-3.5 px-6 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 min-h-[48px]"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      <span>
                        {isSubmitting
                          ? formText.submitting || (language === 'en' ? 'Sending Inquiry...' : 'அனுப்பப்படுகிறது...')
                          : formText.submitBtn || (language === 'en' ? 'Submit Inquiry' : 'விசாரணையை அனுப்புக')}
                      </span>
                      <Send size={15} />
                    </button>

                    <a
                      href={`https://wa.me/919442206797?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-whatsapp-btn inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider font-bold cursor-pointer min-h-[48px]"
                    >
                      <WhatsAppIcon size={16} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
