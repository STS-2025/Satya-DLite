import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const TRADITION_MEDIA_CONFIG = {
  videoSrc: '/assets/Sathyam_Dlitevid.mp4',
  sources: [],
  posterSrc: '/assets/tradition_heritage_dance.jpg',
  fallbackImageSrc: '/assets/tradition_heritage_dance.jpg'
};

export const TraditionStory = () => {
  const { language, t } = useLanguage();
  const tradition = t.tradition || {};
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const isInSectionRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [failedVideoKey, setFailedVideoKey] = useState(null);

  const configuredVideoSrc =
    tradition.media?.videoSrc || TRADITION_MEDIA_CONFIG.videoSrc || '';
  const configuredSources =
    tradition.media?.sources || TRADITION_MEDIA_CONFIG.sources || [];
  const posterSrc =
    tradition.media?.posterSrc ||
    TRADITION_MEDIA_CONFIG.posterSrc ||
    '/assets/tradition_heritage_dance.jpg';
  const fallbackImageSrc =
    tradition.media?.fallbackImageSrc ||
    TRADITION_MEDIA_CONFIG.fallbackImageSrc ||
    '/assets/tradition_heritage_dance.jpg';
  const mediaAlt =
    tradition.media?.videoAlt ||
    'Sacred Light of Pancha Deepam - Traditional Brass Lamp Prayer';

  const currentVideoKey =
    configuredVideoSrc || configuredSources.map((s) => s.src).join('|') || 'none';
  const hasVideoSource =
    Boolean(configuredVideoSrc.trim()) || configuredSources.length > 0;
  const showVideoPlayer = hasVideoSource && failedVideoKey !== currentVideoKey;

  const handleVideoError = () => {
    setFailedVideoKey((prev) => (prev === currentVideoKey ? prev : currentVideoKey));
    setIsPlaying(false);
  };

  const stopAndResetVideo = useCallback(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.pause();
    setIsPlaying(false);
    try {
      if (videoEl.readyState >= 1 || videoEl.currentTime > 0) {
        videoEl.currentTime = 0;
      }
    } catch {
      // Ignore seek reset errors if media is not ready
    }
  }, []);

  const playFromBeginning = useCallback(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.defaultMuted = true;
    videoEl.muted = isMuted;
    videoEl.loop = true;

    try {
      if (videoEl.readyState >= 1 || videoEl.currentTime > 0) {
        videoEl.currentTime = 0;
      }
    } catch {
      // Ignore seek errors before metadata is loaded
    }

    const playPromise = videoEl.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => {
          if (!isInSectionRef.current) {
            stopAndResetVideo();
          } else {
            setIsPlaying(true);
          }
        })
        .catch(() => {
          // Gracefully ignore rejected play() promises (e.g., AbortError or browser policy)
          setIsPlaying(false);
        });
    }
  }, [isMuted, stopAndResetVideo]);

  const togglePlayPause = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (videoEl.paused) {
      videoEl
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      videoEl.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const videoEl = videoRef.current;
    if (!videoEl) return;
    const nextMuted = !videoEl.muted;
    videoEl.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const videoEl = videoRef.current;
    if (!sectionEl || !videoEl || !showVideoPlayer) return;

    videoEl.defaultMuted = true;
    videoEl.muted = isMuted;
    videoEl.loop = true;
    stopAndResetVideo();

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        const isSectionActive = entry.isIntersecting && entry.intersectionRatio >= 0.15;

        if (isSectionActive) {
          if (!isInSectionRef.current) {
            isInSectionRef.current = true;
            playFromBeginning();
          }
        } else {
          if (isInSectionRef.current || !videoEl.paused || videoEl.currentTime > 0) {
            isInSectionRef.current = false;
            stopAndResetVideo();
          }
        }
      },
      {
        rootMargin: '-30px 0px -10% 0px',
        threshold: [0, 0.1, 0.15, 0.25, 0.5]
      }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      isInSectionRef.current = false;
      stopAndResetVideo();
    };
  }, [showVideoPlayer, currentVideoKey, isMuted, playFromBeginning, stopAndResetVideo]);

  const highlights = tradition.highlights || [
    {
      title: language === 'en' ? 'Pancha Deepa Formulation' : 'பஞ்ச தீப கூட்டு முறை',
      desc:
        language === 'en'
          ? 'Carefully prepared oil formulation honoring traditional temple rituals and auspicious daily worship.'
          : 'ஆகம சாஸ்திர முறைப்படி புனித பூஜைகளுக்காக 5 தூய எண்ணெய்களால் கவனமாக தயாரிக்கப்படுகிறது.'
    },
    {
      title: language === 'en' ? 'Steady Radiant Flame' : 'நிலையான பிரகாச சுடர்',
      desc:
        language === 'en'
          ? 'Refined to sustain an even wick burn with minimal smoke, keeping sacred home altars clean.'
          : 'சுடரில் கருமை படியாமல், புகையற்ற தூய ஒளியை நீண்ட நேரம் வழங்கும் தன்மை கொண்டது.'
    },
    {
      title: language === 'en' ? 'Temple Trust Supplies' : 'திருக்கோயில் தேவைகளுக்கான விநியோகம்',
      desc:
        language === 'en'
          ? 'Supplied directly for domestic puja mandirs, temple trust donations, and festive deepotsavam celebrations.'
          : 'பூஜை அறைகள், திருக்கோவில் அறக்கட்டளைகள் மற்றும் தீப திருவிழாக்களுக்காக நேரடியாக விநியோகிக்கப்படுகிறது.'
    }
  ];

  return (
    <section
      id="tradition"
      ref={sectionRef}
      className="tradition-section scroll-mt-16 sm:scroll-mt-20 py-10 sm:py-14 lg:py-16 bg-[#FFF8E8] border-b border-[#F5D58A]/40 overflow-hidden"
    >
      <div className="w-[92vw] sm:w-[92vw] lg:w-[93vw] xl:w-[94vw] max-w-[1440px] mx-auto">
        {/* Tradition content layout over the full-section heritage background */}
        <div className="tradition-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 xl:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
            {/* Left Column: Tradition Video Player (~50% width on desktop) */}
            <div className="lg:col-span-6 w-full flex flex-col justify-center">
              <div className="tradition-video-frame w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#35251B] relative group">
                <div className="relative w-full aspect-video overflow-hidden">
                  {showVideoPlayer ? (
                    <video
                      ref={videoRef}
                      key={currentVideoKey}
                      className="tradition-video-element w-full h-full object-cover object-center block"
                      poster={posterSrc}
                      preload="none"
                      loop
                      muted={isMuted}
                      playsInline
                      disablePictureInPicture
                      src={configuredVideoSrc || undefined}
                      aria-label={mediaAlt}
                      onError={handleVideoError}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onClick={togglePlayPause}
                    >
                      {configuredSources.map((source, idx) => (
                        <source
                          key={source.src || idx}
                          src={source.src}
                          type={source.type}
                          onError={
                            idx === configuredSources.length - 1
                              ? handleVideoError
                              : undefined
                          }
                        />
                      ))}
                    </video>
                  ) : (
                    <img
                      src={fallbackImageSrc}
                      alt={mediaAlt}
                      className="w-full h-full object-cover object-center block opacity-85"
                      loading="lazy"
                      decoding="async"
                    />
                  )}

                  {/* Gradient Overlays for Video Frame */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-[#35251B]/95 via-[#35251B]/45 to-transparent pointer-events-none transition-opacity duration-300 ${
                      isPlaying ? 'opacity-30 group-hover:opacity-80' : 'opacity-85'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Center Controls & Brand Presentation Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                    {/* Play / Pause Toggle Button */}
                    <button
                      type="button"
                      onClick={togglePlayPause}
                      aria-label={isPlaying ? 'Pause Tradition Video' : 'Play Tradition Video'}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D99B26] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#B87516] cursor-pointer pointer-events-auto mb-2 sm:mb-2.5 ${
                        isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100 scale-100'
                      }`}
                    >
                      {isPlaying ? (
                        <Pause size={22} className="text-white" />
                      ) : (
                        <Play size={22} className="text-white ml-0.5 fill-white" />
                      )}
                    </button>

                    {/* Presentation Badge */}
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded bg-[#35251B]/90 border border-[#D99B26]/50 text-[#F5D58A] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-1.5 transition-opacity duration-300 ${
                        isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                      }`}
                    >
                      {tradition.videoBadge ||
                        (language === 'en' ? 'Brand Story Presentation' : 'தயாரிப்பு ஆவணப் படம்')}
                    </span>

                    {/* Title & Desc */}
                    <p
                      className={`text-sm sm:text-base font-bold text-white tracking-wide transition-opacity duration-300 line-clamp-1 ${
                        language === 'ta' ? 'font-tamil' : 'font-sans'
                      } ${
                        isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                      }`}
                    >
                      {tradition.videoTitle ||
                        (language === 'en'
                          ? 'Dayan Enterprises Heritage & Milling Process Film'
                          : 'தயான் என்டர்பிரைசஸ் ஆலை மரபு & தயாரிப்பு முறை')}
                    </p>
                    <p
                      className={`text-[11px] sm:text-xs text-[#FFF8E8] mt-1 max-w-sm transition-opacity duration-300 line-clamp-2 ${
                        language === 'ta' ? 'font-tamil' : 'font-sans'
                      } ${
                        isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                      }`}
                    >
                      {tradition.videoDesc ||
                        (language === 'en'
                          ? 'Documenting copra inspection, cold extraction, hygienic bottling, and sacred diya lamp traditions in Thoothukudi.'
                          : 'தூத்துக்குடியில் கொப்பரை ஆய்வு, மரபு பிழிதல், சுகாதாரமான பாட்டிலிங் மற்றும் தீப பாரம்பரியத்தை விளக்கும் ஆவணக் காட்சி.')}
                    </p>
                  </div>

                  {/* Bottom Right Mute/Unmute Toggle */}
                  {showVideoPlayer && (
                    <div className="absolute bottom-3 right-3 sm:bottom-3.5 sm:right-3.5 z-20">
                      <button
                        type="button"
                        onClick={toggleMute}
                        aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                        className="p-1.5 sm:p-2 rounded-full bg-[#35251B]/90 hover:bg-[#35251B] border border-[#D99B26]/60 text-[#F5D58A] hover:text-white transition-colors cursor-pointer shadow-md"
                      >
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Headings, Subtitle, Description & Feature Cards (~50% width on desktop) */}
            <div className="lg:col-span-6 w-full flex flex-col justify-center text-left">
              <div className="tradition-copy">
              {/* Eyebrow */}
              <span className="text-xs font-bold uppercase tracking-widest text-[#D99B26] block mb-1.5">
                {tradition.eyebrow ||
                  (language === 'en'
                    ? 'Devotional Heritage & Home Harmony'
                    : 'ஆன்மீக பாரம்பரியம் & இல்ல அமைதி')}
              </span>

              {/* Main Heading */}
              <h2
                className={`text-2xl sm:text-3xl lg:text-[2rem] xl:text-[2.25rem] text-white leading-tight ${
                  language === 'ta' ? 'font-tamil font-bold' : 'font-editorial font-normal'
                }`}
              >
                {tradition.heading ||
                  (language === 'en'
                    ? 'Lighting Up Homes, Nurturing Lives'
                    : 'இல்லங்களில் மங்கல ஒளி, வாழ்வில் நலம்')}
              </h2>

              {/* Subtitle / Sacred Quote (Language-Exclusive) */}
              <p
                className={`text-xs sm:text-sm mt-2 font-medium leading-relaxed ${
                  language === 'ta' ? 'font-tamil text-[#F5D58A]' : 'font-sans text-[#F5D58A]'
                }`}
              >
                {language === 'ta'
                  ? tradition.tamilQuote ||
                    tradition.subtitle ||
                    '"தீபம் ஜோதி பரப்பிரம்மம் — மங்கல வாழ்வு தரும் சத்யம் பஞ்ச தீப எண்ணெய்"'
                  : tradition.subtitle ||
                    tradition.quote ||
                    '"Deepam Jyothi Parabrahma — Sacred Light for Auspicious Living"'}
              </p>

              {/* Subtext Description in Readable Body Text Color */}
              <p
                className={`text-xs sm:text-[13px] text-[#FFF8E8] mt-2.5 leading-relaxed ${
                  language === 'ta' ? 'font-tamil' : 'font-sans'
                }`}
              >
                {tradition.subtext ||
                  (language === 'en'
                    ? 'In South Indian tradition, lighting the Kuthu Vilakku invokes calmness, positive auspicious energy, and spiritual focus. Sathyam Pancha Deepam oil is crafted with reverence for sanctified lamps.'
                    : 'தென் இந்திய மரபில் குத்துவிளக்கேற்றுவது இல்லத்தில் அமைதியையும், நேர்மறை ஆற்றலையும், தெய்வீக அருளையும் கொண்டு சேர்க்கிறது. சத்யம் பஞ்ச தீப எண்ணெய் பக்தி சிரத்தையுடன் தயாரிக்கப்படுகிறது.')}
              </p>
              </div>

              {/* 3 Devotional Tradition Feature Cards - Restyled with subtle tonal variations and luminous hover/focus */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-left">
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    tabIndex={0}
                    role="region"
                    aria-label={item.title}
                    className={`tradition-feature-card tradition-card-tone-${idx + 1} relative p-3 sm:p-3.5 cursor-default flex flex-col justify-start select-none overflow-hidden`}
                  >
                    {/* Antique-Gold Top Accent Edge (matching About pillar cards with luminous glow on hover/focus) */}
                    <div className="tradition-transition tradition-card-accent-bar absolute top-0 inset-x-0 h-[3px] pointer-events-none" />

                    <p
                      className={`tradition-transition tradition-card-title font-bold text-xs uppercase tracking-wider leading-snug pt-0.5 ${
                        language === 'ta' ? 'font-tamil' : 'font-sans'
                      }`}
                    >
                      {item.title}
                    </p>
                    <p
                      className={`tradition-transition tradition-card-desc text-[11px] sm:text-[11.5px] mt-1.5 leading-relaxed ${
                        language === 'ta' ? 'font-tamil' : 'font-sans'
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
