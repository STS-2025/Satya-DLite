export const motion = {
  easing: {
    oil: 'cubic-bezier(0.16, 1, 0.3, 1)',
    expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
    power: 'cubic-bezier(0.76, 0, 0.24, 1)',
    spring: 'cubic-bezier(0.22, 1.2, 0.36, 1)',
  },
  duration: { micro: 0.2, standard: 0.6, dramatic: 1, cinematic: 1.6 },
  stagger: { letters: 0.025, words: 0.06, lines: 0.1, cards: 0.12 },
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
