import { useEffect, useRef } from 'react';

let activeLocks = 0;
let savedStyles = null;
let savedScrollY = 0;

export function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    const body = document.body;
    const html = document.documentElement;

    if (activeLocks === 0) {
      savedScrollY = window.scrollY || window.pageYOffset || html.scrollTop || body.scrollTop || 0;
      const scrollbarWidth = Math.max(0, window.innerWidth - html.clientWidth);
      const currentPadding = Number.parseFloat(getComputedStyle(body).paddingRight) || 0;

      savedStyles = {
        bodyOverflow: body.style.overflow,
        bodyPaddingRight: body.style.paddingRight,
        htmlOverflow: html.style.overflow,
      };

      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      body.dataset.scrollLocked = 'true';
      if (scrollbarWidth) {
        body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
      }

      if (window.lenis && typeof window.lenis.stop === 'function') {
        window.lenis.stop();
      }
    }
    activeLocks += 1;

    return () => {
      activeLocks = Math.max(0, activeLocks - 1);
      if (activeLocks === 0 && savedStyles) {
        body.style.overflow = savedStyles.bodyOverflow;
        body.style.paddingRight = savedStyles.bodyPaddingRight;
        html.style.overflow = savedStyles.htmlOverflow;
        delete body.dataset.scrollLocked;
        const targetY = savedScrollY;
        savedStyles = null;

        if (window.lenis && typeof window.lenis.start === 'function') {
          window.lenis.start();
          if (typeof window.lenis.scrollTo === 'function') {
            window.lenis.scrollTo(targetY, { immediate: true });
          }
        }
        window.scrollTo(0, targetY);
      }
    };
  }, [active]);
}

export function useDialogFocus(ref, active, onClose) {
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = ref.current;
    if (!active || !dialog) return undefined;
    const previousFocus = document.activeElement;
    const getFocusable = () => [...dialog.querySelectorAll(
      'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
    )].filter((element) => !element.hasAttribute('hidden') && element.getAttribute('aria-hidden') !== 'true');
    const focusable = getFocusable();
    (focusable[0] || dialog).focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current?.();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = getFocusable();
      if (!items.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener('keydown', handleKeyDown);
    return () => {
      dialog.removeEventListener('keydown', handleKeyDown);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [active, ref]);
}
