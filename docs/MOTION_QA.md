# Motion layer notes

## Tunable values

| Setting | Current value | Change it in |
| --- | --- | --- |
| Forest green | `#14402A` | `src/index.css` design tokens |
| Antique gold | `#D99B26` | `src/index.css` design tokens |
| Warm ivory | `#E8DFD1` | `src/index.css` design tokens |
| Oil pour easing | `cubic-bezier(0.16, 1, 0.3, 1)` | `src/lib/motion.js` and `--motion-oil` in `src/index.css` |
| Dramatic duration | `1000ms` | `src/lib/motion.js` and `--motion-dramatic` in `src/index.css` |
| Intro duration | `1450ms` | `src/components/MotionLayer.jsx` timeout |
| Parallax strength | `10px` (disabled on mobile) | `--parallax-strength` in `src/index.css` |
| Ambient particle count | `0` (no particle renderer active) | `--particle-count` in `src/index.css` |

## Manual QA checklist

- Switch EN/Tamil while midway through a section; confirm the page stays at the same scroll position.
- Open and close each product range and detail modal; verify Escape and focus behavior.
- Use Enquire from product and bulk variant actions; confirm the chosen item fills the contact form.
- Navigate with keyboard only and verify visible focus styling.
- Enable reduced motion and confirm the intro and custom cursor are disabled.
- Open the mobile drawer, dismiss it with Escape/outside click, and verify body scrolling is restored.
- Scroll the tradition section in and out and confirm the existing video play/pause behavior.
- Fast scroll, resize, and switch tabs; watch for stuck overlays or animation artifacts.
- Repeat language, modal, form, drawer, and video checks at desktop, tablet, and 360px mobile widths.

## Suggested next enhancements

- Add GSAP ScrollTrigger/Flip choreography and Lenis only after dependencies can be installed in this environment.
- Add a real reduced-cost hero shader after measuring its impact on mid-range mobile devices.
- Add automated visual regression captures for both languages and mobile breakpoints.
