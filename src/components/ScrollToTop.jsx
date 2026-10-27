import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className="hidden md:flex fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#2B6CB0] hover:bg-[#4A8AD0] active:scale-95 active:translate-y-0 text-white border border-[#F2B632]/40 shadow-[0_6px_18px_rgba(43,108,176,0.32)] items-center justify-center transition-all duration-200 hover:-translate-y-1 animate-fade-in cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6CB0]"
    >
      <ArrowUp size={20} />
    </button>
  );
};
