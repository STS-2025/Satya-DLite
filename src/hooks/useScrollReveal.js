import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight IntersectionObserver hook for smooth scroll reveals.
 * Fires once per element to prevent distracting repetitive replay.
 * Fully respects prefers-reduced-motion.
 */
export const useScrollReveal = (options = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(el);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options, isVisible]);

  return [ref, isVisible];
};

