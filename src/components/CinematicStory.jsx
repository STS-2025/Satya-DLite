import React, { useState, useRef, useEffect } from 'react';

const CLIPS = [
  {
    id: 'coconut',
    videoSrc: '/assets/videos/Satyadlitevideo.mp4',
    posterSrc: '/assets/posters/coconut-oil-poster.png',
    title: "Satya D'Lite Cold-Filtered Pure Coconut Oil Flow"
  },
];

export const CinematicStory = () => {
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [hasReducedMotion, setHasReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const sectionRef = useRef(null);
  const videoRefs = useRef([]);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // Listen for reduced motion preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => setHasReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // IntersectionObserver to pause playback when out of viewport and resume when in viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play / Pause management based on visibility and active index
  useEffect(() => {
    if (hasReducedMotion) {
      videoRefs.current.forEach((video) => {
        if (video && !video.paused) {
          video.pause();
        }
      });
      return;
    }

    const currentVideo = videoRefs.current[activeClipIndex];
    const inactiveVideo = videoRefs.current[1 - activeClipIndex];

    if (isSectionVisible) {
      if (currentVideo) {
        currentVideo.muted = true;
        const playPromise = currentVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Handled gracefully (e.g. autoplay restriction or abort)
          });
        }
      }
    } else {
      if (currentVideo && !currentVideo.paused) {
        currentVideo.pause();
      }
    }

    if (inactiveVideo && !inactiveVideo.paused) {
      inactiveVideo.pause();
    }
  }, [activeClipIndex, isSectionVisible, hasReducedMotion]);

  // Handler for clip completion: transitions to next clip seamlessly with zero blank frame
  const handleClipEnded = (clipIndex) => {
    if (clipIndex !== activeClipIndex) return;

    const nextIndex = (clipIndex + 1) % CLIPS.length;
    const nextVideo = videoRefs.current[nextIndex];

    if (nextVideo && !hasReducedMotion) {
      nextVideo.currentTime = 0;
      nextVideo.muted = true;
      const playPromise = nextVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }

    setActiveClipIndex(nextIndex);
  };

  return (
    <section
      id="cinematic-experience"
      ref={sectionRef}
      aria-label="Cinematic Media Experience"
      className="cinematic-video-section w-full select-none"
    >
      <div className="cinematic-video-frame">
        {!hasReducedMotion ? (
          CLIPS.map((clip, index) => {
            const isActive = activeClipIndex === index;
            return (
              <video
                key={clip.id}
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={clip.videoSrc}
                poster={clip.posterSrc}
                muted
                playsInline
                preload="auto"
                autoPlay={index === 0}
                onEnded={() => handleClipEnded(index)}
                onError={(e) => {
                  console.warn(`Video playback notice for ${clip.id}`, e);
                }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
                title={clip.title}
                aria-hidden={!isActive}
                tabIndex={-1}
              />
            );
          })
        ) : (
          <img
            src={CLIPS[0].posterSrc}
            alt={CLIPS[0].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
    </section>
  );
};
