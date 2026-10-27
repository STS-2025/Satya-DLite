import { useEffect, useRef } from 'react';

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return undefined;
    let disposed = false;
    let teardown;
    const start = async () => {
      const [lenisModule, gsapModule, triggerModule] = await Promise.all([
        import('lenis'), import('gsap'), import('gsap/ScrollTrigger'),
      ]);
      if (disposed || reduceMotion.matches) return;
      const Lenis = lenisModule.default;
      const { gsap } = gsapModule;
      const { ScrollTrigger } = triggerModule;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ autoRaf: false, smoothWheel: true, syncTouch: false, lerp: 0.085, wheelMultiplier: 0.85 });
      lenisRef.current = lenis;
      window.lenis = lenis;
      if (document.body.dataset.scrollLocked === 'true') {
        lenis.stop();
      }
      const tick = (time) => lenis.raf(time * 1000);
      const refresh = () => ScrollTrigger.refresh();
      let refreshTimer;
      const scheduleRefresh = () => {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(refresh, 120);
      };
      const onScroll = () => ScrollTrigger.update();
      const onVisibility = () => document.hidden ? lenis.stop() : lenis.start();
      lenis.on('scroll', onScroll);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      document.addEventListener('site-language-change', scheduleRefresh);
      window.addEventListener('resize', scheduleRefresh, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
      document.fonts?.ready.then(scheduleRefresh);
      const images = [...document.querySelectorAll('img')].filter((image) => !image.complete);
      images.forEach((image) => image.addEventListener('load', scheduleRefresh, { once: true }));
      scheduleRefresh();
      teardown = () => {
        window.clearTimeout(refreshTimer);
        lenis.off('scroll', onScroll);
        lenis.destroy();
        lenisRef.current = null;
        if (window.lenis === lenis) {
          window.lenis = null;
        }
        gsap.ticker.remove(tick);
        document.removeEventListener('site-language-change', scheduleRefresh);
        window.removeEventListener('resize', scheduleRefresh);
        document.removeEventListener('visibilitychange', onVisibility);
        images.forEach((image) => image.removeEventListener('load', scheduleRefresh));
      };
    };
    start();
    return () => {
      disposed = true;
      teardown?.();
    };
  }, []);

  return lenisRef;
}
