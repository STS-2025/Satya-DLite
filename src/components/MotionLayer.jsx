import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';
import { useLenis } from '../hooks/useLenis';

export function MotionLayer() {
  useLenis();
  const [intro, setIntro] = useState(() => !prefersReducedMotion() && !sessionStorage.getItem('satya-intro-seen'));
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (intro) {
      const started = performance.now();
      let frame;
      const countUp = (now) => {
        setCount(Math.min(100, Math.round(((now - started) / 900) * 100)));
        if (now - started < 900) frame = requestAnimationFrame(countUp);
      };
      frame = requestAnimationFrame(countUp);
      const done = window.setTimeout(() => {
        sessionStorage.setItem('satya-intro-seen', '1');
        setIntro(false);
      }, 1450);
      const skip = (event) => {
        if (event.key === 'Escape' || event.key === 'Enter' || event.type === 'pointerdown') {
          window.clearTimeout(done);
          sessionStorage.setItem('satya-intro-seen', '1');
          setIntro(false);
        }
      };
      window.addEventListener('keydown', skip);
      window.addEventListener('pointerdown', skip, { once: true });
      return () => { window.clearTimeout(done); cancelAnimationFrame(frame); window.removeEventListener('keydown', skip); };
    }
  }, [intro]);

  useEffect(() => {
    let raf;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty('--scroll-progress', `${max > 0 ? scrollY / max : 0}`);
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return <>
    <div className="motion-progress" aria-hidden="true" />
    {intro && (
      <button
        className="brand-intro"
        onClick={() => {
          sessionStorage.setItem('satya-intro-seen', '1');
          setIntro(false);
        }}
        aria-label="Skip introduction"
      >
        <img
          src="/assets/satya-dlite-logo.png"
          alt="Satya D'Lite Logo"
          className="brand-intro-logo"
          width="340"
          height="114"
          loading="eager"
          decoding="sync"
        />
        <span className="brand-intro-caption">DAYAN ENTERPRISES &amp; CO.</span>
        <span className="brand-intro-line" />
        <span className="brand-intro-count">{count}</span>
      </button>
    )}
  </>;
}
